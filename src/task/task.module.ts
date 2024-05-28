import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from '../prisma/prima.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [PrismaModule],
})
export class TaskModule {}
