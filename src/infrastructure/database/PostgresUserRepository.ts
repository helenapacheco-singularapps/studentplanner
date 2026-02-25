import { pool } from "../database/connection";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/user/User";
import { CreateUserDTO, UpdateUserDTO } from "../../application/user/dtos";

export class PostgresUserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    const result = await pool.query(
      `
      INSERT INTO users (name, nickname, course, college, semester, country)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        data.name,
        data.nickname,
        data.course,
        data.college,
        data.semester,
        data.country,
      ]
    );

    return result.rows[0];
  }

  async findFirst(): Promise<User | null> {
    const result = await pool.query(
      `SELECT * FROM users LIMIT 1`
    );

    return result.rows[0] ?? null;
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const result = await pool.query(
      `
      UPDATE users
      SET name = COALESCE($1, name),
          nickname = COALESCE($2, nickname),
          course = COALESCE($3, course),
          college = COALESCE($4, college),
          semester = COALESCE($5, semester),
          country = COALESCE($6, country)
      WHERE id = $7
      RETURNING *
      `,
      [
        data.name ?? null,
        data.nickname ?? null,
        data.course ?? null,
        data.college ?? null,
        data.semester ?? null,
        data.country ?? null,
        id,
      ]
    );

    return result.rows[0];
  }
}