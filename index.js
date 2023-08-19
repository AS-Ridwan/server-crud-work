const express = require("express");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// added middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// crudprac1
// RbXtUul1umI9crPP

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://crudprac1:RbXtUul1umI9crPP@cluster0.usaeouj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_data");
    const users = database.collection("users");

    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = users.find(query);
      const allUsers = await cursor.toArray();
      console.log("my all users", allUsers);
      res.send(allUsers);
    });

    app.post("/user", async (req, res) => {
      const user = req.body;
      console.log("my user", user);
      const result = await users.insertOne(user);

      console.log("my result", result);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
