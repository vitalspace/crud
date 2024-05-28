// Importa las dependencias necesarias
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '@prisma/client';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    // Crea un módulo de prueba que incluya el servicio y el controlador
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getAllTasks: jest.fn(),
            getTaskById: jest.fn(),
            deleteTask: jest.fn(),
            updateTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  describe('getAllTask', () => {
    it('should return all tasks', async () => {
      jest.spyOn(service, 'getAllTasks').mockResolvedValue([]);
      expect(await controller.getAllTask()).toEqual([]);
    });
  });

  describe('getTaskById', () => {
    it('should return a task when it exists', async () => {
      const mockId = '1';
      const mockTask: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Task',
      };
      jest.spyOn(service, 'getTaskById').mockResolvedValue(mockTask);

      expect(await controller.getTaskById(mockId)).toBe(mockTask);
    });

    it('should throw NotFoundException when task does not exist', async () => {
      const mockId = '999';
      jest.spyOn(service, 'getTaskById').mockResolvedValue(null);

      await expect(controller.getTaskById(mockId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      const mockId = '1';
      const mockTask: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Task',
      };

      jest.spyOn(service, 'deleteTask').mockResolvedValue(mockTask);

      expect(await controller.deleteTask(mockId)).toBe(mockTask);
    });

    it('should trow NotFoundExeption when task does not exist', async () => {
      const mockId = '999';
      jest
        .spyOn(service, 'deleteTask')
        .mockRejectedValue(new Error('Not Found'));

      await expect(controller.deleteTask(mockId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTask', () => {
    it('should update a task succesfully', async () => {
      const mockId = '1';
      const updateData = {
        title: 'Updated Tile',
        description: 'Updated Description',
      };
      const mockTask = { id: Number(mockId), ...updateData };
      jest.spyOn(service, 'updateTask').mockResolvedValue(mockTask);

      await expect(controller.updateTask(mockId, mockTask)).resolves.toEqual(
        mockTask,
      );
    });

    it('should throw notFoundException when task does not exist', async () => {
      const mockId = '999';
      const updateData = {
        id: 1,
        title: 'Updated Tile',
        description: 'Updated Description',
      };

      jest
        .spyOn(service, 'updateTask')
        .mockRejectedValue(new Error('Not Found'));
      await expect(controller.updateTask(mockId, updateData)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
