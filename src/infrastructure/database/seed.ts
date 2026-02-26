import { pool } from "./init";

async function seed() {
try{
    //limpa a tabela
    await pool.query("TRUNCATE disciplines RESTART IDENTITY CASCADE;");

    await pool.query(`
    INSERT INTO disciplines (name, status) VALUES
    ('Sistemas Operacionais', 'CURSANDO'),
    ('POO', 'CONCLUIDA'),
    ('Logica para Computacao', 'CONCLUIDA'),
    ('Banco de Dados', 'CONLCUIDA'),
    ('Administracao da Informacao', 'PLANEJADA');
  `);

  await pool.query(`
    INSERT INTO grades (value, discipline_id) VALUES
    (8.5, 1),
    (9.0, 2),
    (6.8, 3),
    (7.8, 4),
    (0, 5);
  `);
console.log("Seed executado com sucesso");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

seed();