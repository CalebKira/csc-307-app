// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // src/MyApp.js (a new block inside MyApp())

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // src/MyApp.js (a new inner function inside MyApp())

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });

    return promise;
  }

  function removeOneCharacter(index, id) {
    // need a way to get the ID of the user I want to delete. 

    let initial = "Http://localhost:8000/users/";
    const append = String(id);
    const myURL = initial.concat(append);
    

    fetch(myURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => {
        if (response.status === 204) {
          const updated = characters.filter((character, i) => {
            return i !== index;
          });
          setCharacters(updated);
        }
        else if (response.status === 404){
          console.log("resource not found")
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  function updateList(person) {
    postUser(person)
    .then(response => {
        if (response.status === 201) {
          // Do something if the status code is 200 (OK)
          // need to fix this person here. it's not updated with the id
          return response.json();
        }
      })
      .then(response => {setCharacters([...characters, response])})
      // need to return response in a json format, then used later
      .catch((error) => {
        console.log(error);
      });
    
  }


  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;