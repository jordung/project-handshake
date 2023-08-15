const cors = require("cors");
const express = require("express");

require("dotenv").config();
const auth = require("./middlewares/auth");

// importing routers
const UsersRouter = require("./routers/usersRouter");
const ProjectsRouter = require("./routers/projectsRouter");
const ProjectsLikedRouter = require("./routers/projectsLikedRouter");
const ProjectsRegistrationRouter = require("./routers/projectsRegistrationRouter");
const VolunteersRouter = require("./routers/volunteersRouters");
const OrganisersRouter = require("./routers/organisersRouter");
const PostRegistrationRouter = require("./routers/postRegistrationRouter");
const CommunicationsRouter = require("./routers/communicationsRouter");
const CommentsRouter = require("./routers/commentsRouter");

// importing Controllers
const UsersController = require("./controllers/usersController");
const ProjectsController = require("./controllers/projectsController");
const ProjectsLikedController = require("./controllers/projectsLikedController");
const ProjectsRegistrationController = require("./controllers/projectsRegistrationController");
const VolunteersController = require("./controllers/volunteersController");
const OrganisersController = require("./controllers/organisersController");
const PostRegistrationController = require("./controllers/postRegistrationController");
const CommunicationsController = require("./controllers/communicationsController");
const CommentsController = require("./controllers/commentsController");

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
  status,
  role,
  communication,
  comment,
} = db;

// initialising controllers -> note the lowercase for the first word
const usersController = new UsersController({
  user,
  usertype,
  target_comm,
  volunteer,
  organiser,
  project,
  liked_project,
  volunteer_project,
  communication,
  comment,
});

const projectsController = new ProjectsController({
  user,
  target_comm,
  project,
  volunteer_project,
  liked_project,
  status,
  role,
  communication,
  comment,
});

const projectsLikedController = new ProjectsLikedController({
  user,
  project,
  liked_project,
});

const projectsRegistrationController = new ProjectsRegistrationController({
  user,
  target_comm,
  project,
  volunteer_project,
  liked_project,
  status,
  role,
});

const volunteersController = new VolunteersController({
  user,
  project,
  volunteer_project,
});

const organisersController = new OrganisersController({
  user,
  project,
  volunteer_project,
  liked_project,
});

const postRegistrationController = new PostRegistrationController({
  user,
  volunteer_project,
  status,
  role,
});

const communicationsController = new CommunicationsController({
  user,
  project,
  communication,
  comment,
});

const commentsController = new CommentsController({
  user,
  project,
  volunteer_project,
  communication,
  comment,
});

// initialising routers
const userRouter = new UsersRouter(usersController, auth).routes();
const projectRouter = new ProjectsRouter(projectsController, auth).routes();
const projectLikedRouter = new ProjectsLikedRouter(
  projectsLikedController,
  auth
).routes();
const projectRegistrationRouter = new ProjectsRegistrationRouter(
  projectsRegistrationController,
  auth
).routes();
const volunteerRouter = new VolunteersRouter(volunteersController).routes();
const organiserRouter = new OrganisersRouter(organisersController).routes();
const postRegistrationRouter = new PostRegistrationRouter(
  postRegistrationController,
  auth
).routes();
const communicationRouter = new CommunicationsRouter(
  communicationsController,
  auth
).routes();
const commentRouter = new CommentsRouter(commentsController, auth).routes();

const PORT = process.env.PORT;
const app = express();

// enable CORS access to this server
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// using the routers
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/likes", projectLikedRouter);
app.use("/register", projectRegistrationRouter);
app.use("/admin", postRegistrationRouter);
app.use("/volunteers", volunteerRouter);
app.use("/organisers", organiserRouter);
app.use("/communications", communicationRouter);
app.use("/comments", commentRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
