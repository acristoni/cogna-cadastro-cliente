import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const mockRepository = {
  save: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
  merge: jest.fn(),
  update: jest.fn(),
  insert: jest.fn(),
  findAndCount: jest.fn(),
  delete: jest.fn(),
  innerJoin: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  groupBy: jest.fn().mockReturnThis(),
  addGroupBy: jest.fn().mockReturnThis(),
  getRawMany: jest.fn(),
  getRawOne: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
  })),
};

export const mockRepositoryProvider = (type: EntityClassOrSchema) => ({
  provide: getRepositoryToken(type),
  useValue: mockRepository,
});
