const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user-route");
const registerRouter = require("./routes/register-route");
const loginRouter = require("./routes/login-route");
const postRouter = require("./routes/post-route");

const app = express();

app.use(cors());

app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/post", postRouter);

module.exports = app;
