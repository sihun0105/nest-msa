import { CreateReplyDto, UpdateReplyDto } from '@app/common/protobuf';
import { JwtAuthGuard } from '@app/common/guards/jwtauth/jwtauth.guard';
import { RateLimitGuard } from '@app/common/guards/rateLimit/rate-limit.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ReplyService } from './reply.service';
import { GetReplySpecDecorator } from './decorator/get-reply-srpc-decorator';
import { PostReplySpecDecorator } from './decorator/post-reply-srpc-decorator';
import { PatchReplySpecDecorator } from './decorator/patch-reply-srpc-decorator';
import { DeleteReplySpecDecorator } from './decorator/delete-reply-srpc-decorator';

@Controller('reply')
@UseGuards(JwtAuthGuard, RateLimitGuard)
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}
  @GetReplySpecDecorator('댓글 조회 API', '댓글 조회')
  @Get('/')
  async get(@Req() req, @Query('movieId') movieId: number) {
    try {
      const userNumber = req.user.userId;
      const getRepliesObservable = this.replyService.getReplies({
        movieId: movieId,
        userId: userNumber,
      });
      const data = await firstValueFrom(getRepliesObservable);
      return data;
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.details,
      });
    }
  }

  @PostReplySpecDecorator('댓글 생성 API', '댓글 생성')
  @Post('/')
  async create(@Req() req, @Body() createReplyDto: CreateReplyDto) {
    try {
      const userNumber = req.user.userId;
      const createReplyObservable = this.replyService.create({
        ...createReplyDto,
        userId: userNumber,
      });
      const data = await firstValueFrom(createReplyObservable);
      return data;
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.details,
      });
    }
  }
  @PatchReplySpecDecorator('댓글 수정 API', '댓글 수정')
  @Patch()
  async update(@Req() req, @Body() updateReplyDto: UpdateReplyDto) {
    try {
      const userNumber = req.user.id;
      const updateReplyObservable = this.replyService.update({
        ...updateReplyDto,
        userId: userNumber,
      });
      const data = await firstValueFrom(updateReplyObservable);
      return data;
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.details,
      });
    }
  }
  @DeleteReplySpecDecorator('댓글 삭제 API', '댓글 삭제')
  @Post('/:replyId')
  async delete(@Req() req, @Param() replyId: { replyId: number }) {
    try {
      const userNumber = req.user.id;
      const $replyId = replyId.replyId;
      const deleteReplyObservable = this.replyService.delete({
        commentId: $replyId,
        userId: userNumber,
      });
      const data = await firstValueFrom(deleteReplyObservable);
      return data;
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.details,
      });
    }
  }
}
