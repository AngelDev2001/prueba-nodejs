import express from "express";
import movies from "./movies.json" assert { type: "json" };

const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
  res.json({ message: "Hola Mundo" });
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
