import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UpdateUserPermissionsDto } from './dto';

const usersService = new UsersService();

export class UsersController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserDto = req.body as CreateUserDto;
      const creadorId = req.user!.userId; // Asumimos que authenticate ya validó
      const newUser = await usersService.create(createUserDto, creadorId);
      res.status(201).json({ status: 'success', data: newUser });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await usersService.findAll();
      res.status(200).json({ status: 'success', data: users });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await usersService.findOne(userId);
      res.status(200).json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  }
  
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            const updateUserDto = req.body as UpdateUserDto;
            const updatedUser = await usersService.update(userId, updateUserDto);
            res.status(200).json({ status: 'success', data: updatedUser });
        } catch (error) {
            next(error);
        }
    }


  async updatePermissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const dto = req.body as UpdateUserPermissionsDto;
      const modificadorId = req.user!.userId;
      const updatedUser = await usersService.updatePermissions(userId, dto, modificadorId);
      res.status(200).json({ status: 'success', data: updatedUser });
    } catch (error) {
      next(error);
    }
  }
  
    async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            await usersService.remove(userId);
            res.status(204).send(); // No content
        } catch (error) {
            next(error);
        }
    }

    async restore(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
          const userId = req.params.id;
          const restoredUser = await usersService.restore(userId);
          res.status(200).json({ status: 'success', data: restoredUser });
      } catch (error) {
          next(error);
      }
  }
}