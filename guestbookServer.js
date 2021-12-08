const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);   // lyssnar på port 3000
console.log("Kör servern på localhost:3000");

// Publik folder = "public"
app.use(express.static("public"));
const messagesLocation = __dirname + "\\public\\javascript\\messages.json";
const data = JSON.parse(fs.readFileSync(messagesLocation));


app.get("/formInput", (req, res) => {
    res.sendFile(__dirname+"/public/html/guestbook.html");
});

// Hantering av ondskefullt input
checkInput = function(str){
    str = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    return str;
}

app.post("/formInput", (req, res) => {
    let newMessage = {
        index: data.length+1,
        message: checkInput(req.body.guestbookMessage),
        name: checkInput(req.body.guestbookName),
        email: checkInput(req.body.guestbookEmail),
        likes: 0
    };
    
    data.push(newMessage);
    fs.writeFileSync(messagesLocation, JSON.stringify(data, null, 4), err => {
        if (err) throw err;
    });
    res.redirect('/html/guestbook.html');
});    

app.post("/editLike", (req, res) => {
    let data = JSON.parse(fs.readFileSync(messagesLocation));
    data.splice(req.body.index,1,req.body);
   
    fs.writeFileSync(messagesLocation, JSON.stringify(data, null, 4), err => {
        if (err) throw err;
    });    
});



