import { 
  Controller, 
  Get, 
  Param, 
  Post, 
  Body, 
  Patch, 
  Delete, 
  NotFoundException, 
  UseGuards 
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ParseIntPipe } from '../pipes/parse-int.pipe';
import { UserService } from '../services/users.service';
import { CreateUserDto } from '../requests/create-user.request';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto.email, loginUserDto.password);
  }

  @Get('test')
  async test() {
    return { message: 'Test endpoint working', timestamp: new Date() };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userService.delete(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }
}