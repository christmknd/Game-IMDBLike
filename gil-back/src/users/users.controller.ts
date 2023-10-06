import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { Role } from "./enums/role.enum";
import { Roles } from "../auth/decorators/roles.decorators";
import { JwtAuthGuard } from "../auth/jwt-auth.guards";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot be registrated' })
  @Roles(Role.Player)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(createUserDto);
    } catch {
      throw new BadRequestException('User cannot be registrated');
    }
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiNotFoundResponse({ description: 'No users found' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    try {
      return this.usersService.findAllUsers();
    } catch {
      throw new NotFoundException('No users found');
    }
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Return user by ID', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get(':id')
  findUserById(@Param('id') id: string) {
    try {
      return this.usersService.findUserById(+id);
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'User not found : cannot be updated' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Player)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUser(+id, updateUserDto);
    } catch {
      throw new NotFoundException('User not found : cannot be updated');
    }
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found : cannot be deleted' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.usersService.deleteUser(+id);
    } catch {
      throw new NotFoundException('User not found : cannot be deleted');
    }
  }

}
