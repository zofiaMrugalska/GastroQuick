require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const mealRouter = require("./routes/mealRoutes");

const app = express();

app.use(express.json()); //parsuje do jsona
app.use(cors()); //laczenie z recatem

//routy
app.use("/users", userRouter);
app.use("/meals", mealRouter);

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("db connected"))
  .catch((er) => console.log(er));

app.listen(process.env.PORT, () => {
  console.log("server runs");
});
