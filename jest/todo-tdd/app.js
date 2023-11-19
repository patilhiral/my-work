const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const app = express();
const mongodb = require("./mongodb/mongodb.connect");

mongodb.connect();

app.use(express.json());


app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.json("Hello world!");
});
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
  });
app.listen(3000,(req,res)=>{
console.log('server listening to port 3000')
})
module.exports = app;