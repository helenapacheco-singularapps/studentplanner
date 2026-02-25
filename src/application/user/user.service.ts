import { User } from "../../domain/entities/user/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserDTO, UpdateUserDTO } from "./dtos";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async create(data: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findFirst();

    if (existingUser) {
      throw new Error("Já existe um usuário cadastrado.");
    }

    return this.userRepository.create(data);
  }

  async get(): Promise<User> {
    const user = await this.userRepository.findFirst();

    if (!user) {
      throw new Error("Usuário ainda não cadastrado.");
    }

    return user;
  }

  async update(data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findFirst();

    if (!user) {
      throw new Error("Usuário ainda não cadastrado.");
    }

    return this.userRepository.update(user.id, data);
  }
}
