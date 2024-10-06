import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './schema/content.schema';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<ContentDocument>
  ) {}

  async create(userId: string, username: string, createContentDto: CreateContentDto): Promise<Content> {
    const content = new this.contentModel({
      ...createContentDto,
      userId,
      username,
    });
    return content.save();
  }

  async findAll(userId: string): Promise<Content[]> {
    return this.contentModel.find({ userId }).exec();
  }

  async findOne(id: string): Promise<Content> {
    return this.contentModel.findById(id).exec();
  }

  async update(id: string, username: string, updateContentDto: UpdateContentDto): Promise<Content> {
    return this.contentModel.findByIdAndUpdate(id, { ...updateContentDto, username }, { new: true }).exec();
  }

  async remove(id: string): Promise<Content> {
    return this.contentModel.findByIdAndDelete(id).exec();
  }
}
