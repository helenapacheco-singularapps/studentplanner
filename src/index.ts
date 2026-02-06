import "dotenv/config";
import express from "express";
import disciplineRoutes from "./routes/discipline.routes";


const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Student Academic Planner rodando 🚀");
});


app.use("/disciplines", disciplineRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
