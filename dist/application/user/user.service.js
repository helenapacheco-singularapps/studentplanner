"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(data) {
        const existingUser = await this.userRepository.findFirst();
        if (existingUser) {
            throw new Error("Já existe um usuário cadastrado.");
        }
        return this.userRepository.create(data);
    }
    async get() {
        const user = await this.userRepository.findFirst();
        if (!user) {
            throw new Error("Usuário ainda não cadastrado.");
        }
        return user;
    }
    async update(data) {
        const user = await this.userRepository.findFirst();
        if (!user) {
            throw new Error("Usuário ainda não cadastrado.");
        }
        return this.userRepository.update(user.id, data);
    }
}
exports.UserService = UserService;
