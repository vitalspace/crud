import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  @Get()
  async getAllTask() {
    return this.TaskService.getAllTasks();
  }

  @Post()
  async createTask(@Body() data: Task) {
    return this.TaskService.createTask(data);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.TaskService.getTaskById(Number(id));
    if (!taskFound) throw new NotFoundException('Task does not exist');
    return taskFound;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.TaskService.deleteTask(Number(id));
    } catch (error) {
      throw new NotFoundException('Task does not exist');
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    try {
      return await this.TaskService.updateTask(Number(id), data);
    } catch (error) {
      throw new NotFoundException('Task does not exist');
    }
  }
}
