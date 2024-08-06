const userData = require("../models/users.json")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  const {query} = req;
  console.log({ query });
  if(query.username) {
    res.send(await prisma.user.findMany({ where: {username: query.username}, include: { articles: true }}))
  } else{
    const foundUsers = await prisma.user.findMany({ include: { articles: true }});
    res.send(foundUsers);
  }
}


const createNewUser = async (request, response) => {
  console.log({ body: request.body });
  const body = request.body;
  // console.log({ body })
  const { username, password } = body;
  // const salt = bcrypt.genSaltSync(Math.random() * 10);
  const newUsers = { username: username, password: password}
  const createdUser = await prisma.user.create({ 
    data: newUsers
  })
  response.status(201).send({
    message: "Success Created",
    result: createdUser,
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = userData.find((user) => user.id === id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    return res.json(user);
  }
};

const updatePassword = async (req, res) => {
  const {body, params} = req;
  console.log({params})
  const id = parseInt(params.id)
  const {password} = body;
  await prisma.user.update({ data: { password }, where: { id: id}})
  res.status(204).send();
}

const deleteUserById = async (req, res) => {
  const {body, params} = req;
  console.log({params})
  const id = parseInt(params.id)
  await prisma.user.delete({ where: { id } })
  res.status(204).send();
}

module.exports = {
  getAllUser,
  createNewUser,
  getUserById,
  updatePassword,
  deleteUserById,
}