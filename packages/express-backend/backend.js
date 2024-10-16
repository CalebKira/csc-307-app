// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserByJob = (job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job
  );
};

const findUserByNandJ = (name, job) => {
  return users["users_list"].filter(
    (user) => ((user["name"] === name) && (user["job"] === job))
  );
};

  
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if ((name != undefined) && (job != undefined)){
      // console.log("yes?");
      let result = findUserByNandJ(name, job);
      result = { users_list: result };
      res.send(result);
    }
    else if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } 
    else if (job != undefined) {
      let result = findUserByJob(job);
      result = { users_list: result };
      res.send(result);
    } 
    else {
      res.send(users);
    }
});

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
  
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } 
    else {
      res.send(result);
    }
});


const uniqID = () => {
  return String(Math.floor(Math.random() * (999 - 100) + 100));
}

const addUser = (user) => {
  users["users_list"].push(user);
  users["users_list"][users["users_list"].length - 1].id = uniqID();
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const temp = addUser(userToAdd);
  res.status(201).send(temp);
  //res.send();
});


const deleteUser = (id) => {
  let result = findUserById(id);
  if (result === undefined) {
      id = undefined;
      return id;
    }
  
  for (let index = 0; index < users["users_list"].length; index++) {
    if (users["users_list"][index].id === id){
      users["users_list"].splice(index, 1);
      return id;
    }
  } 
  return id;
  
};

app.delete("/users/:id", (req, res) => {
  const userToDel = req.params["id"];
  // res.send(userToDel);
  let result = deleteUser(userToDel);
    if (result === undefined) {
      res.status(404).send("User not found.");
    } 
    else {
      res.status(204).send(result);
    }
});


/* app.get("/users/:name", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } 
  else {
    res.send(result);
  }
}); */


const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };