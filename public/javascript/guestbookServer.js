const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);   // lyssnar på port 3000
console.log("Kör servern på localhost:3000");

let str = __dirname;
str = str.replace("\\javascript", '');

app.use(express.static(str));
let messagesLocation = __dirname + "\\messages.json";
const data = JSON.parse(fs.readFileSync(messagesLocation));
str = str+"\\html\\";

app.get("/formInput", (req, res) => {
    res.sendFile(str+"guestbook.html")
});

app.post("/formInput", (req, res) => {
    let newMessage = {
        message: req.body.guestbookMessage.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"),
        name: req.body.guestbookName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"),        
        email: req.body.guestbookEmail.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
    };
    
    data.push(newMessage);
    fs.writeFileSync(messagesLocation, JSON.stringify(data, null, 4), err => {
        if (err) throw err;
    });
    res.redirect('/html/guestbook.html');
});    