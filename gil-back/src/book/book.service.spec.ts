import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { NotFoundException } from '@nestjs/common';
import { Genre } from './enums/genre-enum';
import { Review } from '../review/entities/review.entity';
describe('BookService', () => {
  let bookService: BookService;
  let bookRepository: Repository<Book>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let reviewRepository: Repository<Review>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Review), // Ajoutez le repository de Review ici
          useClass: Repository,
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    reviewRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review),
    ); // Obtenez le repository de Review
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  describe('createBook', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Sample Book',
        author: 'Sample Author',
        genre: Genre.Roman,
        description: 'Sample Description',
      };

      const book = new Book();
      jest.spyOn(bookRepository, 'create').mockReturnValue(book);
      jest.spyOn(bookRepository, 'save').mockResolvedValue(book);

      const result = await bookService.createBook(createBookDto);

      expect(result).toBe(book);
    });
  });

  describe('findAllBooks', () => {
    it('should return an array of books', async () => {
      const books = [new Book(), new Book()];
      jest.spyOn(bookRepository, 'find').mockResolvedValue(books);

      const result = await bookService.findAllBooks();

      expect(result).toEqual(books);
    });
  });

  describe('findBookById', () => {
    it('should return a book by ID', async () => {
      const book = new Book();
      const bookId = 1;
      jest.spyOn(bookRepository, 'findOneBy').mockResolvedValue(book);

      const result = await bookService.findBookById(bookId);

      expect(result).toBe(book);
    });

    it('should throw NotFoundException :  book is not found', async () => {
      const bookId = 1;
      jest.spyOn(bookRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(bookService.findBookById(bookId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const bookId = 1;
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Title',
        author: 'Updated Author',
        genre: Genre.Comédie,
        description: 'Updated Description',
      };

      const existingBook = new Book();
      jest.spyOn(bookRepository, 'findOneBy').mockResolvedValue(existingBook);
      jest.spyOn(bookRepository, 'save').mockResolvedValue(existingBook);

      const result = await bookService.updateBook(bookId, updateBookDto);

      expect(result).toEqual(existingBook);
      expect(existingBook.title).toEqual(updateBookDto.title);
      expect(existingBook.author).toEqual(updateBookDto.author);
      expect(existingBook.genre).toEqual(updateBookDto.genre);
      expect(existingBook.description).toEqual(updateBookDto.description);
    });

    it('should throw NotFoundException when book is not found', async () => {
      const bookId = 1;
      jest.spyOn(bookRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(
        bookService.updateBook(bookId, {} as UpdateBookDto),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      const bookId = 1;
      const existingBook = new Book();
      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(existingBook);
      jest.spyOn(bookRepository, 'delete').mockResolvedValue({} as DeleteResult);

      await bookService.deleteBook(bookId);

      expect(bookRepository.delete).toHaveBeenCalledWith(expect.any(Number));
    });

    it('should throw NotFoundException when book is not found', async () => {
      const bookId = 1;
      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(undefined);

      await expect(bookService.deleteBook(bookId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

});
