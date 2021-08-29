const generateUsers = require("../model/user");
let users;

function homeController(req, reply) {
  reply.send("Welcome to Fake REST API with Fastify :) ");
}

function getAllUsersController(req, reply) {
  users = generateUsers(10);
  reply.send(users);
}

function getUserDetailsController(req, reply) {
  const { id } = req.params;
  const userDetails = users.find((user) => user.id === parseInt(id));
  if (userDetails) {
    reply.send(userDetails);
  } else {
    reply
      .code(404)
      .send({ message: `The ID given ${id} is not found in records` });
  }
}

function createUserController(req, reply) {
  const body = req.body;
  body.id = users.length + 1;
  users = [...users, body];
  reply.code(201).send(users);
}

function deleteUserController(req, reply) {
  const { username } = req.params;
  const user = users.filter((user) => user.username !== username);
  reply.send({ message: `User: ${username} has been deleted` });
}

function updateUserController(req, reply) {
  const { username } = req.params;
  const body = req.body;
  const userDetails = users.find((user) => user.username === username);
  if (userDetails) {
    const keys = Object.keys(body);

    for (const key of keys) {
      userDetails[key] = body[key];
    }
    reply.send(userDetails);
  } else {
    reply
      .code(404)
      .send({ message: `The Username: ${username} is not found in records` });
  }
}

module.exports = {
  homeController,
  getAllUsersController,
  getUserDetailsController,
  createUserController,
  deleteUserController,
  updateUserController,
};
