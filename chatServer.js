const express = require("express");
const app = express();
app.use(express.static("public"));

let htmlFileLocation = __dirname + "/public/html/chatroom.html";
app.get("/", (req, res) => {
    res.sendFile(htmlFileLocation);
});

const http = require("http");
const server = http.createServer(app);
server.listen(3000, () => {
    console.log("Kör servern på localhost:3000");
});

const { Server } = require("socket.io");
const io = new Server(server);

let count = 0;
let usersOnline = [];

io.on("connection", (socket) => {
    console.log("En klient anslöt sig till servern!");
    console.log("Klientens id: " + socket.id);
    
    // Funktion för att auto-generera 1/16 möjliga användarnamn
    function randomiseName() {
        let stringName = "en";
        // Ger ett nummer mellan 1-4 för switch
        let randomNumber = Math.floor(Math.random() * 4);
        console.log("randomNumber 1: " +randomNumber);
        switch (randomNumber){
            case 0:
                stringName +="Nyfiken";
                break;
            case 1:
                stringName += "Förtvivlad";
                break;
            case 2:
                stringName += "Proper";
                break;  
            case 3:
                stringName += "Fantastisk";
                break;
        };
        randomNumber = Math.floor(Math.random() * 4);
        console.log("randomNumber 2: " +randomNumber);
        switch (randomNumber){
            case 0:
                stringName += "Apa";
                break;
            case 1:
                stringName += "Orm";
                break;
            case 2:
                stringName += "Snigel";
                break;  
            case 3:
                stringName += "Tiger";
                break;
        };
        // Ser om användarnamnet som genererats redan används, om ja, generera ett nytt
        if (usersOnline.includes(stringName)){
            randomiseName();
        }
        else {
            socket.user= stringName;
        };
    };
    // Skapar ett auto-genererat namn åt användaren om det är färre än 16 anslutningar
    // annars väljer man själv efter att ha fått "rymdstofft" tilldelat
    if (count < 16){
        randomiseName();
    }
    else if(count >=16) {
        socket.user = "rymdstofft";
        socket.emit("force-name-change", socket.user);
    }

    // Skickar ut användarnamnet vid nyanländning
    io.emit("newUser", socket.user);
    console.log("Klientens användarnamn: " + socket.user);

    // Lägger till användarnamnet i lista för aktiva användare
    let currentUsername = socket.user;
    usersOnline[count] = currentUsername; 
    
    // Skickar ut listan med användare 
    io.emit("usersOnline", usersOnline);
    
    // Håller koll på antal anslutningar, skriver ut i serverns konsol
    count++;
    console.log("Antal anslutningar: "+count);
    console.log("Inloggade användare: "+ usersOnline);

    // händelse som triggas när en användare avslutar uppkopplingen
    socket.on("disconnect", (socket) => {
        console.log("En klient med användarnamn "+currentUsername+" har avslutat uppkopplingen till servern!");
        io.emit("server-message", (currentUsername+" har lämnat chatten."))
        count--;
        // Tar bort användaren från listan med anslutna användare
        usersOnline = usersOnline.filter(item => item !== currentUsername);
        io.emit("usersOnline", usersOnline);
        console.log("Antal anslutningar: "+count);
        console.log("Inloggade användare: "+ usersOnline);
    });

    // lyssna på händelsen "server-message"
    socket.on("server-message", (data) => {
        socket.emit("server-message", data);
    }); 

    // Lyssna på händelsen "chat-message"
    socket.on("chat-message", (data) => {
        let msgData = {
            user: socket.user,
            msg: data
            }; 
        socket.broadcast.emit("chat-message", msgData);
    });

    // Lyssna på händelsen "new-name" för att sätta nytt namn på användare
    socket.on("new-name", (newName) => {
        // Hantering av identiska namn
        if (usersOnline.includes(newName)){
            socket.emit("server-message", (socket.user+" försökte byta namn till "+newName+", men det var redan taget. Försök igen!"));
        }
        else {
            // Tar bort gamla namnet och lägger till nya i listan med anslutna användare
            usersOnline = usersOnline.filter(item => item !== socket.user);
            io.emit("server-message", (socket.user + " bytte namn till "+ newName));
            socket.user = newName;
            usersOnline.push(socket.user);
            io.emit("usersOnline", usersOnline);
            console.log("Inloggade användare: "+ usersOnline);
        }
    });
        
    // Lyssnar på om en användare skriver
    socket.on("userTyping", (data) =>{
        if(data.typing==true){
            data.user = socket.user;
            io.emit("displayTyping", data);
        }
        else{
            io.emit("displayTyping", data);
        }
    }); 
});