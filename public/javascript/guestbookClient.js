window.onload =function() {
    let query = new XMLHttpRequest();
    query.open("GET", "../javascript/messages.json",true);
    query.onload = function() {
        let data = JSON.parse(this.response);
        
        for(let i = data.length-1; i >=0; i--) {
            const allMessages = document.querySelector(".guestbookContent");

            const postContainer = document.createElement("div");
            postContainer.setAttribute("class","postContainer");

            const postMessage = document.createElement("p");
            postMessage.setAttribute("class", "postMessage");
            postMessage.innerHTML = data[i].message;

            const infoContainer = document.createElement("div");
            infoContainer.setAttribute("class","infoContainer");

            const postName = document.createElement("p");
            postName.setAttribute("class","postName");
            postName.innerHTML = "Skrivet av: "+data[i].name;

            const postEmail = document.createElement("p");
            postEmail.setAttribute("class", "postEmail");
            postEmail.innerHTML = "E-post: "+data[i].email;

            infoContainer.appendChild(postName);
            infoContainer.appendChild(postEmail);
            postContainer.appendChild(postMessage);
            postContainer.appendChild(infoContainer);
            allMessages.appendChild(postContainer);
        };
    };
    query.send();    
};