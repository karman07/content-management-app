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
  @UseGuards(JwtAuthGuard)  // Apply JWT guard to all routes in this controller
  export class ContentController {
    constructor(private readonly contentService: ContentService) {}
  
    // Create a new content
    @Post()
    async create(
      @GetUser() user: any, // Fetch user information from the JWT
      @Body() createContentDto: CreateContentDto, // Fetch content details from the request body
    ) {
      console.log('User from JWT:', user);  // Log user details for debugging
      console.log('Content DTO:', createContentDto);  // Log the content DTO for debugging
  
      let userId = user.userId;
      let username = user.username;
  
      // If userId or username is not found in JWT, fallback to the request body
      if (!userId || !username) {
        userId = createContentDto.userId; // Assume userId comes from the request body
        username = createContentDto.username; // Assume username comes from the request body
      }
  
      // If userId or username is still not found, throw an error
      if (!userId || !username) {
        throw new Error('User ID or username not found in JWT and request body');
      }
  
      return this.contentService.create(
        userId,  // Pass user ID
        username,  // Pass username
        createContentDto,  // Pass content DTO
      );
    }
  
    // Retrieve all content for the authenticated user
    @Get()
    async findAll(@GetUser() user: any) {
      return this.contentService.findAll(user.userId);  // Fetch all content for the user
    }
  
    // Retrieve specific content by ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.contentService.findOne(id);  // Fetch content by ID
    }
  
    // Update specific content by ID
    @Put(':id')
    async update(
      @Param('id') id: string,  // Get the ID from the URL parameters
      @GetUser() user: any,  // Fetch user information from the JWT token
      @Body() updateContentDto: UpdateContentDto,  // Fetch updated content details from the request body
    ) {
      return this.contentService.update(id, user.username, updateContentDto);  // Update content
    }
  
    // Delete specific content by ID
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.contentService.remove(id);  // Delete content by ID
    }
  }
  