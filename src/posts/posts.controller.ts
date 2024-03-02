import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { PostsService, PostsRo } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags("Posts")
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  /**
     * 创建文章
     * @param post
     */
  @ApiOperation({ summary: 'Create Post' })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post)
  }

  /**
   * 获取所有文章
   */
  @ApiOperation({ summary: 'Get All posts' })
  @Get()
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query)
  }

  /**
   * 获取指定文章
   * @param id 
   */
  @ApiOperation({ summary: 'Get Post by ID' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postsService.findById(id)
  }

  /**
   * 更新文章
   * @param id 
   * @param post 
   */
  @Put(":id")
  async update(@Param("id") id, @Body() post) {
    return await this.postsService.updateById(id, post)
  }

  /**
   * 删除
   * @param id 
   */
  @Delete("id")
  async remove(@Param("id") id) {
    return await this.postsService.remove(id)
  }
}
