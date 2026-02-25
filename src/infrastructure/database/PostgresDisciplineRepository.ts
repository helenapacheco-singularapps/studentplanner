import { pool } from "../database/connection";
import { IDisciplineRepository } from "../../domain/repositories/IDisciplineRepository";
import { Discipline } from "../../domain/entities/discipline/discipline";
import { DisciplineStatus } from "../../domain/enum/DisciplineStatus";

export class PostgresDisciplineRepository
  implements IDisciplineRepository
{
  async create(name: string, status: DisciplineStatus): Promise<Discipline> {
    const result = await pool.query(
      `INSERT INTO disciplines (name, status)
       VALUES ($1, $2)
       RETURNING *`,
      [name, status]
    );

    return result.rows[0];
  }

  async findAll(): Promise<Discipline[]> {
    const result = await pool.query(`
      SELECT d.*, 
             COALESCE(
               json_agg(g.*) FILTER (WHERE g.id IS NOT NULL), 
               '[]'
             ) AS grades
      FROM disciplines d
      LEFT JOIN grades g ON g.discipline_id = d.id
      GROUP BY d.id
    `);

    return result.rows;
  }

  async findById(id: string): Promise<Discipline | null> {
    const result = await pool.query(
      `
      SELECT d.*, 
             COALESCE(
               json_agg(g.*) FILTER (WHERE g.id IS NOT NULL), 
               '[]'
             ) AS grades
      FROM disciplines d
      LEFT JOIN grades g ON g.discipline_id = d.id
      WHERE d.id = $1
      GROUP BY d.id
      `,
      [id]
    );

    return result.rows[0] ?? null;
  }

  async update(
    id: string,
    data: { name?: string; status?: DisciplineStatus }
  ): Promise<Discipline> {
    const result = await pool.query(
      `
      UPDATE disciplines
      SET name = COALESCE($1, name),
          status = COALESCE($2, status)
      WHERE id = $3
      RETURNING *
      `,
      [data.name ?? null, data.status ?? null, id]
    );

    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    await pool.query(
      `DELETE FROM disciplines WHERE id = $1`,
      [id]
    );
  }

  async addGrade(id: string, grade: number): Promise<Discipline> {
    await pool.query(
      `
      INSERT INTO grades (value, discipline_id)
      VALUES ($1, $2)
      `,
      [grade, id]
    );

    const discipline = await this.findById(id);
    if (!discipline) throw new Error("Disciplina não encontrada");

    return discipline;
  }
}