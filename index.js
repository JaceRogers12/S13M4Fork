require("dotenv").config();
const express = require("express")

const server = express();

server.use(express.json());

let users = [
    {username: "Tyro", password: "Whisperwood"},
    {username: "Aleta", password: "Rengoku"},
    {username: "Takenoko", password: "Bamboo"}
]

function newUser(user) {
    return users.push(user)
}

function loginUser(user) {
    return users.find(peeps => {
        return  (peeps.username == user.username 
            && peeps.password == user.password
        )})
}

server.get("/api/users", (req, res) => {
    res.status(200).send(users)
});

server.post("/api/register", (req, res) => {
    newUser(req.body);
    res.status(201).send(req.body);
});

server.post("/api/login", (req, res) => {
    if (loginUser(req.body)) {
        res.status(200).send("Welcome!")
    } else {
        res.status(400).send("Your username or password are incorrect")
    }

});

server.get("*", (req, res) => {
    res.status(200).json("Hey, something's working right!")
});

let port = process.env.PORT || 9000;

server.listen(port, console.log(`Server is running at port ${port}`));
