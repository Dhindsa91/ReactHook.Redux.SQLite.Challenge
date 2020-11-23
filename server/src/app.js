
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('abc');

db.serialize(function(){
    db.run("DROP TABLE user");
    db.run("DROP TABLE todo");
    db.run("CREATE TABLE user (id INT, username TEXT, password TEXT)");
    db.run("CREATE TABLE todo (description TEXT, dueDate TEXT, status TEXT, owner TEXT)");


    let stmt = db.prepare("INSERT INTO user values(1, 'user01', 'superdupersecure01')");
    let stmt2 = db.prepare(`INSERT INTO todo values('Sample Todo', '11-11-2020', 'done', 'user01')`);

    stmt.run();
    stmt2.run();

    db.each("SELECT id, username, password FROM user", function(err, row){

        console.log("US11ER:", row);
    })

    stmt.finalize();

})

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(3001, () => {
    console.log("We're Online @ Port 3001!");
});

function verifyToken(req, res, next) {
    // Get Auth Header
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== "undefined" || bearerHeader !== null) {
    // Split at space get token
        const bearer = bearerHeader.split(" ");

        const bearerToken = bearer[1];

        req.token = bearerToken;
        next();
    } else {
    // Forbidden
        res.sendStatus(403);
    }
}


app.post("/login", function(req,res,next){
    const {username, password} = req.body;
 
    db.each(`SELECT id, username, password FROM user WHERE username = '${username}' AND password = '${password}'` , function(err, row){
        console.log("Row", row);
        if(!row){
            return res.send({ ok: false });
        }else{
            const token = jwt.sign({ username }, "asdfasdf", {
                audience: username});
            return res.send({ ok: true, username, token });
        }
    })
})

app.get("/get-posts/:username", verifyToken, function(req,res,next){

    const username = req.params.username;

    jwt.verify(
        req.token,
        "asdfasdf",
        { audience: username },
        (err, auth) => {
            if (err) {
                res.sendStatus(403);
            } else {
                db.each(`SELECT description, dueDate, status FROM todo WHERE owner = '${username}'` , function(err, row){
                    console.log("Row", row);
                    if(!row){
                        return res.send({ ok: false });
                    }else{
                        const token = jwt.sign({ username }, "asdfasdf", {
                            audience: username});
                        return res.send({ ok: true, row });
                    }
                });
            }
        }
    );
});

app.post("/create-post", verifyToken, function(req, res, next){
    const {description, dueDate, status, username} = req.body;
    jwt.verify(
        req.token,
        "asdfasdf",
        { audience: username },
        (err, auth) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let stmt = db.prepare(`INSERT INTO todo values('${description}', '${dueDate}', '${status}', '${username}')`);
                stmt.run();
                stmt.finalize();
                console.log("todo created...");
            }
        }
    );
});