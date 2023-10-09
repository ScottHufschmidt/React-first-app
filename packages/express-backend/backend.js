import express from "express";
import cors from "cors";
const app = express();
const port = 8000;

const users = { 
   users_list : [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
		
const findUserByNameAndJob = (name, job) => {
	return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job);
}
		
const addUser = (user) => {
	user['id'] = Math.random().toString();
    users['users_list'].push(user);
    return user;
}

const removeUser = (user) => {
	console.log(user['id']);
	const index = users['users_list'].map(id => id.id).indexOf(user['id']);
	users['users_list'].splice(index, 1);
	return user;
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
	const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
	else if(name != undefined){
		let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
	}
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.post('/users', (req, res) => {
	console.log(req.body);
    const userToAdd = req.body;
    let result = addUser(userToAdd);
	if (result === undefined) {
        res.status(404).send('Resource not found.');
    } 
	else {
		console.log(result);
        res.status(201).send(result);
    }
});

app.delete('/users/:id', (req, res) => {
	console.log(req.params);
	const userToRemove = req.params;
	let result = removeUser(userToRemove);
	if (result === undefined) {
        res.status(404).send('Resource not found.');
    } 
	else {
		console.log(result);
        res.status(204).send(result);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  