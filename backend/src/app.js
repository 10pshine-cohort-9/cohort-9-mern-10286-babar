const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const requestLogger = require('./middleware/logger.middleware');
const globalErrorHandler = require('./middleware/error.middleware');
const AppError = require('./utils/AppError');

const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(requestLogger); 

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Notes API is running",
  });
});

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;