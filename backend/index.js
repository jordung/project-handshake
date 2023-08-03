const cors = require("cors");
const express = require("express");
const auth = require("./middlewares/auth");
require("dotenv").config();

// importing Routers
// const UsersRouter = require("./routers/usersRouter");

// importing Controllers
// const UsersController = require("./controllers/usersController");

// TODO: update the following to include organiser model
// importing DB
// const db = require("./db/models/index");
// const {
//   user,
//   usertype,
//   volunteer,
//   target_comm,
//   project,
//   saved_project,
//   volunteer_project,
//   status,
//   role,
//   communication,
//   comment,
// } = db;

// TODO: same as above
// initializing Controllers -> note the lowercase for the first word
// const usersController = new UsersController({
//   user,
//   usertype,
//   volunteer,
//   target_comm,
//   project,
//   saved_project,
//   volunteer_project,
//   status,
//   role,
//   communication,
//   comment,
// });

// inittializing Routers
// const userRouter = new UsersRouter(usersController).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// using the routers
// app.use("/users", userRouter);
app.use("/", auth);

// ? route handler for testing auth0
app.get("/", (req, res) => {
  // only authenticated users will reach this point
  console.log("user has been authenticated!!!");
  res.send("user has been authenticated!!!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
