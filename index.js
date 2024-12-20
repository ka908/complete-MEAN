const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./router/user-routes");
const app = express();
const port = 3000;
app.use(express.json());
app.use(userRouter);
app.use(cors());

async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/", {
    dbName: "red",
  });
}
connectDB().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
