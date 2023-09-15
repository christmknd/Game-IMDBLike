import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
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
    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async deleteBook(id: number): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const book = await this.bookRepository.findOne(id);
    await this.bookRepository.delete(book);
  }
}
