const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.listen(3000);   // lyssnar på port 3000

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

console.log("Kör servern på localhost:3000");

// Publik folder = "public"
app.use(express.static("public"));
const messagesLocation = __dirname + "\\public\\javascript\\messages.json";
const data = JSON.parse(fs.readFileSync(messagesLocation));

// Hämtar formuläret
app.get("/formInput", (req, res) => {
    res.sendFile(__dirname+"/public/html/guestbook.html");
});

// Funktion för hantering av ondskefull input
checkInput = function(str){
    str = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    return str;
}

// Skriver ett nytt inlägg och sparar i "messages.json"
app.post("/formInput", (req, res) => {
    // Om något av inmatningsfälten är tomt så skickas användaren vidare till en sida med en varning
    if(req.body.guestbookMessage == "" || req.body.guestbookName == "" || req.body.guestbookEmail == "")
    {
        res.send("Du kan inte skicka in ett svar med tomma fält, gå tillbaka och försök igen!");
    }
    else {
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
    }
});    

// Hanterar +/- Likes 
app.post("/editLike", (req, res) => {
    let data = JSON.parse(fs.readFileSync(messagesLocation));
    data.splice(req.body.index,1,req.body);
   
    fs.writeFileSync(messagesLocation, JSON.stringify(data, null, 4), err => {
        if (err) throw err;
    });    
});



