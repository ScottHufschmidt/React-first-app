import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
    
useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );
	
    function removeOneCharacter (loc, index) {
		const updated = characters.filter((characters, i) => {return i !== loc;});
		const promise = fetch("http://localhost:8000/users/" + index, {
		method: "DELETE",
		body: index,
		})
		.then(function(response) {
		if (response.status !== 204) {
			throw new Error("HTTP status " + response.status);
		}
		})
		.catch((error) => {
        console.log(error)});
		setCharacters(updated);
		return promise;
	}

	function updateList(person) { 
		postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      })
}

	function fetchUsers() {
		const promise = fetch("http://localhost:8000/users");
		return promise;
	}

	function postUser(person) {
		const promise = fetch("Http://localhost:8000/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(person),
        })
	    .then((response) => {
		if (response.status !== 201){
			throw new Error("HTTP status " + response.status);
		}
		})
		.then((response) => response.json)
		.catch((error) => {
        console.log(error)});
    return promise;
  }
  
return(
  <div className="container">
    <Table characterData={characters} 
	    removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />
  </div>
);
	}
export default MyApp;