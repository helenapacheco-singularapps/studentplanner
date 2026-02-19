import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserDTO, UpdateUserDTO } from "../../application/user/dtos";

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findFirst(): Promise<User | null> {
    return prisma.user.findFirst();
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}
