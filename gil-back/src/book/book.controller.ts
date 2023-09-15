import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Book } from './entities/book.entity';
import { CreateReviewDto } from "../review/dto/create-review.dto";

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({
    status: 201,
    description: 'Book created successfully',
    type: Book,
  })
  @ApiBadRequestResponse({ description: 'Book cannot be registrated' })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    try {
      return this.bookService.createBook(createBookDto);
    } catch {
      throw new BadRequestException('Book cannot be registrated');
    }
  }

  @ApiOperation({ summary: 'Get all books' })
  @ApiNotFoundResponse({ description: 'No books found' })
  @Get()
  findAll() {
    try {
      return this.bookService.findAllBooks();
    } catch {
      throw new NotFoundException('No books found')
    }
  }


  @ApiOperation({ summary: 'Get book by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return book by ID',
    type: Book,
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @Get(':id')
  findBookById(@Param('id') id: number) {
    console.log('ID reçu:', id);
    try {
      return this.bookService.findBookById(id);
    } catch {
      throw new NotFoundException('Book not found');
    }
  }

  @ApiOperation({ summary: 'Update book by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({
    status: 200,
    description: 'Book updated successfully',
    type: Book,
  })
  @ApiNotFoundResponse({ description: 'Books not found : cannot be updated' })

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(+id, updateBookDto);
  }

  @ApiOperation({ summary: 'Delete book by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  @ApiNotFoundResponse({ description: 'Book not found : cannot be deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.bookService.deleteBook(+id);
    } catch {
      throw new NotFoundException('Book not found : cannot be deleted')
    }
  }

  @Post(':id/reviews')
  addReviewToBook(@Param('id') gameId: number, @Body() createReviewDto: CreateReviewDto) {
    try {
      return this.bookService.addReviewToBook(gameId, createReviewDto);
    } catch {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }
  }
}
