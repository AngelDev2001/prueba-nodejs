import express from "express";
import dittoJSON from "./pokemon/ditto.json" assert { type: "json" };

const app = express();

const PORT = process.env.PORT ?? 1234;

app.disable("x-powered-by");

app.use((req, res, next) => {
  if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json") return next();

  //   solo llegan request que son POST y que tienen el header Content-Type: application/json
  let body = "";

  //   escuchar el evento data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    // mutar la request y meter la información en el req.body
    req.body = data;
    next();
  });
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hola Mundo" });
});

app.get("/pokemon/ditto", (req, res) => {
  res.json(dittoJSON);
});

app.post("/pokemon", (req, res) => {
  res.status(291).json(req.body);
});

// la última a la que va a llegar
app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
