require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const mealRouter = require("./routes/mealRoutes");
const commentRouter = require("./routes/commentRoutes");
const cartRouter = require("./routes/cartRoutes");
const placingOrderRouter = require("./routes/placingOrderRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/meals", mealRouter);
app.use("/comments", commentRouter);
app.use("/cart", cartRouter);
app.use("/order", placingOrderRouter);
app.use("/images", express.static(path.join(__dirname, "./images")));

mongoose
  .connect(process.env.MONGO_CONNECT2)
  .then(() => console.log("db connected"))
  .catch((er) => console.log(er));

app.listen(process.env.PORT, () => {
  console.log("server runs");
});
