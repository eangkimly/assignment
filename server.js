const express = require("express");
const dotenv = require("dotenv");

dotenv.config()

const userRoutes = require("./routers/userRoutes");
const articleRoutes = require("./routers/articleRoutes");
const app = express();
// app.use("/assets", express.static("public"))
// app.use(morgan("common"))
app.use(express.json())
app.use("/", userRoutes)
app.use("/", articleRoutes)

app.listen(8080, ()=> {
  console.log("Server is running on http://localhost");
  console.log(process.env.PORT);
})