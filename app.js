require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

app.use(cors());
app.use(express.json());

app.get("/user/list", async (req, res) => {
    const [result] = await db.query("select * from crud");
    console.log(result);
    res.json(result);
});
app.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const [result] = await db.query(`select * from crud where id = ${id}`);
    res.json(result);
});
app.post("/user/add", async (req, res) => {
    const { name, age } = req.body;
    const [result] = await db.execute(
        "insert into crud (name,age) values (?,?)",
        [name, age]
    );
    res.json(result.insertId);
});
app.delete("/user/delete/:id", async (req, res) => {
    const { id } = req.params;
    const [result] = await db.execute(`delete from crud where id=${id}`);
    res.json(result);
});
app.put("/user/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    console.log(name, age, id);
    const [result] = await db.execute("update crud set name=?,age=? where id=?", [
        name,
        age,
        id,
    ]);
    res.json(result);
});

app.listen(process.env.PORT, () => {
    console.log("server started");
});
