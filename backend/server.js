const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/snippets", require("./routes/snippetsRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`));
