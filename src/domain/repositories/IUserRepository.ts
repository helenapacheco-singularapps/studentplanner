import { User } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "../../application/user/dtos";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  findFirst(): Promise<User | null>;
  update(id: string, data: UpdateUserDTO): Promise<User>;
}
