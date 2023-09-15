import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from '../review/dto/create-review.dto';
import { Review } from '../review/entities/review.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAllBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findBookById(id: number): Promise<Book> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const book = await this.bookRepository.findOneBy({ id: id });
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    } catch (error) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {

    const book = await this.bookRepository.findOneBy({ id: id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async deleteBook(id: number): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const book = await this.bookRepository.findOne(id);
    await this.bookRepository.delete(book);
  }

  async addReviewToBook(
    id: number,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const book = await this.bookRepository.findOneBy({ id: id });
    if (!book) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    const review = new Review();
    review.content = createReviewDto.content;
    review.rating = createReviewDto.rating;
    review.book = book; // Associez la review au jeu

    return this.reviewRepository.save(review);
  }
}
