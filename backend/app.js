const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");

app.use(cors());
app.use(express.json());
app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI);

const PORT = 3000;

app.use("/", (req, res) => {
  res.send("Hello Todo!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
