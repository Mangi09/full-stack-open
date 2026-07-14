const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");

morgan.token("body", (req, res) => {
  if (req.method == "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//
app.post("/api/persons", (request, response) => {
  const Id = Math.random().toString(36).slice(2);

  const body = request.body;
  console.log(body);
  if (!body.name) {
    return response.status(404).json({
      error: "content missing",
    });
  }
  if (!(body.name in persons)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Id,
  };

  persons = persons.concat(person);
  console.log(person);

  response.status(200).json({
    message: "person created successfully",
  });
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.filter((p) => p.id === id);
  if (person.length === 0) {
    response.status(404).json({
      error: "id not found",
    });
  }
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  if (!(id in persons)) {
    return response.status(404).json({
      error: "id not found",
    });
  }
  persons = persons.filter((p) => p.id !== id);

  response.status(200).json({
    message: "person deleted successfully",
  });
});

app.get("/info", (request, response) => {
  const size = persons.length;

  response.send(`Phonebook has info for ${size} people <br> ${Date()}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
