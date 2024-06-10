import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteReplySpecDecorator(summary: string, description: string) {
  return applyDecorators(
    ApiOperation({ summary, description }),
    ApiParam({
      name: 'replyId',
      required: true,
      description: 'reply id',
      schema: {
        type: 'number',
        example: 100001,
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      schema: {
        type: 'object',
        properties: {
          replyId: { type: 'number', example: 100001 },
          comment: { type: 'string', example: 'test' },
          createdAt: { type: 'string', example: '2021-01-01T00:00:00Z' },
          updatedAt: { type: 'string', example: '2021-01-01T00:00:00Z' },
          email: { type: 'string', example: 'test' },
          nickname: { type: 'string', example: 'test' },
          userId: { type: 'number', example: 100001 },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'string', example: 'Bad Request' },
          error: { type: 'string', example: 'Bad Request' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Unauthorized' },
          error: { type: 'string', example: 'Unauthorized' },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 500 },
          message: { type: 'string', example: 'Internal Server Error' },
          error: { type: 'string', example: 'Internal Server Error' },
        },
      },
    }),
  );
}
