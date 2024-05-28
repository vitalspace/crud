import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task> {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async createTask(data: Task): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async updateTask(id: number, data: Task): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
