let socket = io();    // anropa socket.io:s konstruktor

window.onload = () => {
    let output = document.getElementById("output");

    // ta emot användarinput och skicka meddelande
    document.getElementById("chatForm").addEventListener("submit", (evt) => {
        evt.preventDefault();   // hindra att formuläret laddas om
        let message = document.getElementById("chatMessage").value;
        
        // Hantering av tomt meddelande
        if (message == ""){
            console.log("Försökte skicka tomt meddelande."); // skrivs endast ut i klientens konsol
        }
        else {
            message = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
            socket.emit("chat-message", message); // skicka händelse till server
            document.getElementById("chatMessage").value = "";   // rensa inmatningsfältet
            let tid = new Date().toISOString().substr(11, 8);   

            // Ens egna meddelande skrivs ut
            let html = `<p id=ownMessages>Du (${tid}): <br>${message}</p>`;
            output.innerHTML += html;
            message = "";
            // Tvinga scrollning till senaste inlägg  
            output.lastElementChild.scrollIntoView({ behavior: 'smooth' });
        };
    });

    // Välkomnar nya användare
    socket.on("newUser", (user) => {
        let tid = new Date().toISOString().substr(11, 8);   
        let html = `<p>${user} har anlänt. Välkommen! (${tid})</p>`
        output.innerHTML += html;
    });

    // Tvingar en användare att ändra namn om det är fler än 16 anslutna
    socket.on("force-name-change", (user) => {
        let newName = prompt("Vad vill du heta?");
        newName = newName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        socket.emit("new-name", newName);
    });

    // Ta emot meddelande från andra användare
    socket.on("chat-message", (msgData) => {
        let tid = new Date().toISOString().substr(11, 8);   
        let html = `<p>${msgData.user} (${tid}): <br>${msgData.msg}</p>`;
        output.innerHTML += html;
        // Tvinga scrollning till senaste inlägg  
        output.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    });

    // Ta emot meddelande från servern
    socket.on("server-message", (data) => {
        let tid = new Date().toISOString().substr(11, 8);   
        let html = `<p>${data} (${tid})</p>`;
        output.innerHTML += html;
        // Tvinga scrollning till senaste inlägg    
        output.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    });

    // Skicka meddelande med "Retur"
    document.querySelector("#chatMessage").addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.querySelector("#sendMessage").click();
        }
    });

    // Visa inloggade användare
    socket.on("usersOnline", (usersOnline) => {
        let usersOnlineDiv = document.querySelector("#usersOnline");
        usersOnlineDiv.innerHTML = `<p>Anslutna användare:</p>`;
        usersOnline.forEach((item) => {
            usersOnlineDiv.innerHTML += `<p>${item}</p>`;
        });
    });
    
    // Ändra namn med knapptryckning
    let changeNameButton = document.querySelector("#changeNickname");
    changeNameButton.onclick =function() {     
        let newName = prompt("Vad vill du heta?");
        newName = newName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        socket.emit("new-name", newName);
    };

    // Meddela att en användare håller på och skriver
    let typing = false;
    let timeout = setTimeout(function(){},0);
    
    document.querySelector("#chatMessage").addEventListener("keypress", function(event) {
        if (event.keyCode != 13) {
            clearTimeout(timeout);
            typing = true;
            socket.emit("userTyping",{user:"", typing: true});
            timeout = setTimeout(function(){
                typing = false;
                socket.emit("userTyping",{user:"", typing: false});    
            }, 1000) // 1000 ms = 1 sek
        }
        else {
            typing = false;
            socket.emit("userTyping",{user:"", typing: false});
        }
    });
    
    // Visa att någon skriver något i 1 sek
    socket.on("displayTyping", (data) => {
        if(data.typing==true){
            document.querySelector("#typing").innerHTML = "<br>"+data.user+" skriver något..."
        }
        else {
            document.querySelector("#typing").innerHTML = ""
        }
    });    
};