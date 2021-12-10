const doAsyncStuff = async () => {
    let data = await fetch('../javascript/messages.json');
    data = await data.json();

    // Hämtar och skriver ut innehållet i "messages.json"
    data.forEach((item) => {
        const allMessages = document.querySelector(".guestbookContent");

        const postContainer = document.createElement("div");
        postContainer.className= "postContainer";

        const postMessage = document.createElement("p");
        postMessage.className=  "postMessage";
        postMessage.innerHTML = item.message;

        const infoContainer = document.createElement("div");
        infoContainer.className= "infoContainer";

        const postName = document.createElement("p");
        postName.className= "postName";
        postName.innerHTML = "Skrivet av: "+item.name;

        const postEmail = document.createElement("p");
        postEmail.className=  "postEmail";
        postEmail.innerHTML = "E-post: "+item.email;

        const likes = document.createElement("p");
        likes.className=  "likes";
        likes.innerHTML = "Likes: "+item.likes;
        
        // Funktion för att skicka förändring i meddelande (endast antal Likes som kan ändras, +/- 1)
        function editLike(){
            fetch("/editLike", {
                method: "POST",
                body: JSON.stringify({
                    index: item.index,
                    message: item.message,
                    name: item.name,
                    email: item.email,
                    likes: item.likes, 
                }),
                headers: {
                    'Content-Type': 'application/json',
                },                  
            });
        };

        // Funktion för att animera +/- knapp när man redan tryckt på den en gång under en session
        function wiggle(button){
            button.animate([
                { transform: 'translateX(30px)' },
                { transform: 'translateX(-30px)' },
                { transform: 'translateX(15px)' },
                { transform: 'translateX(-15px)' }
            ], {
                duration: 1000
            }
        )};

        // Knappar i ett meddelande för +/-            
        let liked = 0; 
        let disliked = 0;

        const plusButton = document.createElement("button");
        plusButton.className=  "guestbookButtons";
        plusButton.setAttribute("id", "plusButton");
        plusButton.innerHTML ="+";    
        plusButton.onclick = function() {
            if (liked == 0){
                liked++;
                item.likes++;
                editLike();
                likes.innerHTML = "Likes: "+item.likes;
            }
            else{
                wiggle(plusButton);
            }
        };

        const minusButton = document.createElement("button");
        minusButton.setAttribute("class", "guestbookButtons");
        plusButton.setAttribute("id", "minusButton");
        minusButton.innerHTML ="-";
        minusButton.onclick = function() {
            if (disliked == 0){
                disliked++;
                item.likes--;
                editLike();
                likes.innerHTML = "Likes: "+item.likes;
            }
            else{
                wiggle(minusButton);
            }
        };

        // Appends
        const lb = document.createElement("br");
        lb.textContent = "<br>";

        infoContainer.appendChild(postName);
        infoContainer.appendChild(plusButton);
        infoContainer.appendChild(lb);
        infoContainer.appendChild(postEmail);
        infoContainer.appendChild(minusButton);
        postContainer.appendChild(postMessage);
        postContainer.appendChild(likes);
        postContainer.appendChild(infoContainer);
        allMessages.appendChild(postContainer);
    });
};
doAsyncStuff();