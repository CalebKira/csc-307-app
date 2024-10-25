// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .catch((error) => console.log(error));


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

// const findUserByName = (name) => {
//     return users["users_list"].filter(
//       (user) => user["name"] === name
//     );
//   };

// const findUserByJob = (job) => {
//   return users["users_list"].filter(
//     (user) => user["job"] === job
//   );
// };

// const findUserByNandJ = (name, job) => {
//   return users["users_list"].filter(
//     (user) => ((user["name"] === name) && (user["job"] === job))
//   );
// };

  
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    userService.getUsers(name, job)
    .then(result => {
      if (result) {
        res.send(result);
      }
      // don't check status, check if array is not empty. 
    })
    .catch(error => {
      console.log(error)
    });
    
    /* if ((name != undefined) && (job != undefined)){
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
    } */
});

  
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    userService.findUserById(id)
    .then(result => {
      if (result === undefined) {
        res.status(404).send("Resource not found.");
      } 
      else {
        res.send(result);
      }
    });
});


const uniqID = () => {
  return String(Math.floor(Math.random() * (999 - 100) + 100));
}


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.addUser(userToAdd)
  .then(result => {
    if (result == undefined){
      res.status(400).send("Unable to add user");
    }
    else {
      res.status(201).send(result);
    }
  });
  // change this one to be from userservices


  //res.send();
});



app.delete("/users/:id", (req, res) => {
  const userToDel = req.params["id"];
  // res.send(userToDel);
  userService.IDdelete(userToDel)
  .then(result => {
    if (result === undefined) {
      res.status(404).send("User not found.");
    } 
    else {
      res.status(204).send(result);
    }
  })
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

