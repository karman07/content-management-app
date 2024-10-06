import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { ContentService } from './content.service';
  import { CreateContentDto } from './dto/create-content.dto';
  import { UpdateContentDto } from './dto/update-content.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { GetUser } from '../auth/get-user.decorator';
  
  @Controller('content')
  @UseGuards(JwtAuthGuard)  
  export class ContentController {
    constructor(private readonly contentService: ContentService) {}
  

    @Post()
    async create(
      @GetUser() user: any, 
      @Body() createContentDto: CreateContentDto, 
    ) {
      console.log('User from JWT:', user); 
      console.log('Content DTO:', createContentDto); 
  
      let userId = user.userId;
      let username = user.username;
  
     
      if (!userId || !username) {
        userId = createContentDto.userId; 
        username = createContentDto.username; 
      }
  
  
      if (!userId || !username) {
        throw new Error('User ID or username not found in JWT and request body');
      }
  
      return this.contentService.create(
        userId, 
        username,  
        createContentDto,  
      );
    }
  

    @Get()
    async findAll(@GetUser() user: any) {
      return this.contentService.findAll(user.userId);  
    }
  

    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.contentService.findOne(id);  
    }
  

    @Put(':id')
    async update(
      @Param('id') id: string,  
      @GetUser() user: any, 
      @Body() updateContentDto: UpdateContentDto,  
    ) {
      return this.contentService.update(id, user.username, updateContentDto);  
    }
  

    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.contentService.remove(id); 
    }
  }
  