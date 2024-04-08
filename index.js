const express = require("express");
const dotenv = require ("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors")
const app = express()
app.use(express.json());
const url = process.env.DB;


app.use(cors({
  origin: "http://localhost:3000"
}))

app.post("/users", async (req, res) => {
  try {
    const connection = await MongoClient.connect(url);
    const db = connection.db("demo");
    await db.collection("user").insertOne(req.body);
    await connection.close();
    res.json({ message: "data posted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });

  }
});

app.get("/users", async (req, res) => {
  try {
    const connection = await MongoClient.connect(url);
    const db = connection.db("demo");
    const store = await db.collection("user").find().toArray();
    await connection.close();
    res.json(store);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" })

  }
})

app.get("/users/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(url);
    const db = connection.db("demo");
    const objId = new ObjectId(req.params.id);
    const store = await db.collection("user").findOne({ _id: objId });
    res.json(store);
    await connection.close();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " Something went wrong" });
  }
})

app.put("/users/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(url);
    const db = connection.db("demo");
    const objId = new ObjectId(req.params.id);
    await db.collection("user").findOneAndUpdate({ _id: objId }, { $set: req.body });
    await connection.close();
    res.json({ message: "user updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" })

  }
})

app.delete("/users/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(url);
    const db = connection.db("demo");
    const objId = new ObjectId(req.params.id);
    console.log(objId);
    const store = await db.collection("user").deleteOne({ _id: objId });
    console.log(store)
    await connection.close();
    res.json({ message: "User deleted" })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" })
  }

})

// const array = [];

// app.post("/users", (req, res) => {
//   console.log("hi");
//   req.body.id = array.length + 1;
//   array.push(req.body);
//   res.json({ message: "data posted" });
// })
// app.get("/users", (req, res) => {
//   res.json(array)
// })
// app.get("/users/:id", (req, res) => {
//   let user = array.find((ele) => ele.id == req.params.id)
//   if (user) {
//     res.json(user)
//   }
//   else {
//     res.status(404).json({ mesaage: "user not found" })
//   }
// })
// app.put("/users/:id", (req, res) => {
//   req.body.id = parseInt(req.params.id);
//   let index = array.findIndex((user) => user.id == req.params.id); // Changed this line
//   array[index] = req.body;
//   res.json({ message: "user edited successfully" });
// });

// app.delete("/users/:id", (req, res) => {
//   let index = array.findIndex((user) => user.id == req.params.id );
//   array.splice(index, 1)
//   res.json({ message: "user deleted successfully" })

// })

app.listen(3005)

//jananiselva2618
//ivtX8MSyUV1hQVIu
//mongodb+srv://jananiselva2618:ivtX8MSyUV1hQVIu@cluster0.awrpvod.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0