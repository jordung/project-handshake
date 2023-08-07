const cors = require("cors");
const express = require("express");

require("dotenv").config();
const auth = require("./middlewares/auth");

// importing Routers
const UsersRouter = require("./routers/usersRouter");
const ProjectsRouter = require("./routers/projectsRouter");
const ProjectsLikedRouter = require("./routers/projectsLikedRouter");

// importing Controllers
const UsersController = require("./controllers/usersController");
const ProjectsController = require("./controllers/projectsController");
const ProjectsLikedController = require("./controllers/projectsLikedController");

// TODO: update the following to include organiser model
// importing DB
const db = require("./db/models/index");
const {
  user,
  usertype,
  volunteer,
  organiser,
  target_comm,
  project,
  liked_project,
  volunteer_project,
  // status,
  // role,
  // communication,
  // comment,
} = db;

// initializing Controllers -> note the lowercase for the first word
const usersController = new UsersController({
  user,
  usertype,
  volunteer,
  organiser,
});

const projectsController = new ProjectsController({
  user,
  project,
  liked_project,
});

const projectsLikedController = new ProjectsLikedController({
  user,
  project,
  liked_project,
});

// const projectsLikedController = new ProjectsLikedController({
//   user,
//   usertype,
//   target_comm,
//   volunteer,
//   organiser,
//   project,
//   liked_project,
//   volunteer_project,
//   status,
//   role,
//   communication,
//   comment,
// });

// TODO: Figure out where to insert 'auth'
// inittializing Routers
const userRouter = new UsersRouter(usersController, auth).routes();
const projectRouter = new ProjectsRouter(projectsController).routes();
const projectLikedRouter = new ProjectsLikedRouter(
  projectsLikedController
).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// using the routers
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/likes", projectLikedRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
