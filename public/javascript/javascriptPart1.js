// Knappar för de olika uppgifterna
let buttonSquares = document.createElement("button");
buttonSquares.innerHTML = "1. Kvadrattal <br>";
document.querySelector('#contentButtons').appendChild(buttonSquares);

let buttonMultiplication = document.createElement("button");
buttonMultiplication.innerHTML = "2. Multiplikationstabell";
document.querySelector('#contentButtons').appendChild(buttonMultiplication);

let buttonGuess = document.createElement("button");
buttonGuess.innerHTML = "3. Gissningslek";
document.querySelector('#contentButtons').appendChild(buttonGuess);

let buttonRobber = document.createElement("button");
buttonRobber.innerHTML = "4. Rövarspråk";
document.querySelector('#contentButtons').appendChild(buttonRobber);

let buttonAncestry = document.createElement("button");
buttonAncestry.innerHTML = "5. Arvshierarki";
document.querySelector('#contentButtons').appendChild(buttonAncestry);

let buttonForms = document.createElement("button");
buttonForms.innerHTML = "6. Formulär";
document.querySelector('#contentButtons').appendChild(buttonForms);

let buttonBooking = document.createElement("button");
buttonBooking.innerHTML = "7. Resebokning";
document.querySelector('#contentButtons').appendChild(buttonBooking);

let buttonInteractive = document.createElement("button");
buttonInteractive.innerHTML = "8. Interaktivitet";
document.querySelector('#contentButtons').appendChild(buttonInteractive);

// Uppgift 1 kvadrattal
buttonSquares.onclick =function () {
    document.querySelector('#content').innerHTML = "";
    document.querySelector('#content').innerHTML += "<br><br><p>1. De tio första kvadrattalen är:</p>";
    for(i=1; i<11;i++){
        document.querySelector('#content').innerHTML += "<p>"+i+" * "+i+" = "+i*i+ "</p>";
    }
    document.querySelector('#content').innerHTML += "<br>";
}

// Uppgift 2 nästlad loop
buttonMultiplication.onclick =function () {
    document.querySelector('#content').innerHTML = "";
    document.querySelector('#content').innerHTML += "<br><br><p>2. Multiplikationstabellen:</p>";
    let result = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
    for (i = 0; i < 11; i++) {
        for (j = 0; j < 11; j++) {
            if(i == 0 && j > 0){
                if(j.toString().length ==1){
                    result += "[" + j + "]&nbsp&nbsp";      
                }
                else {
                    result += "[" + j + "]";
                }
            } 
            else if(j == 0 && i>0){
                if(i.toString().length ==1){
                    result += "[" + i + "]&nbsp&nbsp&nbsp";      
                }
                else {
                    result += "[" + i + "]&nbsp";
                }
            } 
            else if(i>0 && j>0){
                if ((i*j).toString().length == 1)
                {
                    result += (i*j)+"&nbsp&nbsp&nbsp&nbsp";
                }
                else if ((i*j).toString().length == 2){
                    result += (i*j)+"&nbsp&nbsp";
                }
                else if ((i*j).toString().length == 3){
                    result += (i*j);
                }
            }
        }
        result += "<br>"
    }
    document.querySelector('#content').innerHTML += "<p>"+result+"<br></p>";
}

// Uppgift 3 Gissa talet
let attemptNumber = 0;
let numberOfAttempts =10; // Antal gissningar
function getRandomInt(max){
    return Math.floor(Math.random()*max);
}
function buttonGuessOnClick() {
    document.querySelector('#content').innerHTML = "";
    if (attemptNumber < numberOfAttempts)
    {
        let guessedNumber = prompt("Skriv en siffra mellan 1 och 100.\nDu har "+(numberOfAttempts-attemptNumber) + " försök.")
        attemptNumber++;
        
            if (guessedNumber == randomNumber)
            {
                alert("Rätt gissat! Det tog dig " + attemptNumber + " försök att gissa talet " +randomNumber + "!\n\nSpelet omstartat, du får nu "+numberOfAttempts+" nya försök att gissa ett nytt tal.\n\nLycka till!");
                document.querySelector('#content').innerHTML += "<br><br><p>Rätt gissat!<br><br>Det tog dig " + attemptNumber + " försök att gissa talet " +randomNumber + "!<br><br>Spelet omstartat, du får nu "+numberOfAttempts+" nya försök att gissa ett nytt tal.<br><br>Lycka till!</p>";
                attemptNumber = 0;
                randomNumber = getRandomInt(100)+1;
            }
            else if (guessedNumber < randomNumber)
            {
                alert("För lågt! \nDu gissade " + guessedNumber +" och har " +(numberOfAttempts-attemptNumber) + " försök kvar");
                document.querySelector('#content').innerHTML += "<br><br><p>För lågt! \nDu gissade " + guessedNumber +" och har " +(numberOfAttempts-attemptNumber) + " försök kvar</p>";
                // console.log(randomNumber) // skriver ut rätt tal i konsolen i felsökningssyfte
            }
            else if (guessedNumber > randomNumber && guessedNumber < 101)
            {
                alert("För högt! \nDu gissade " + guessedNumber +" och har " +(numberOfAttempts-attemptNumber) + " försök kvar");
                document.querySelector('#content').innerHTML += "<br><br><p>För högt! \nDu gissade " + guessedNumber +" och har " +(numberOfAttempts-attemptNumber) + " försök kvar</p>";
                // console.log(randomNumber) // skriver ut rätt tal i konsolen i felsökningssyfte
            }
            else if (guessedNumber > 100)
            {
                attemptNumber--;
                alert("Där vart det fel, skriv en siffra mellan 1 och 100");
                document.querySelector('#content').innerHTML += "<br><br><p>Där vart det fel, skriv en siffra mellan 1 och 100</p>";
            }
            else
            {
                attemptNumber--;
                alert("Där vart det fel, skriv en siffra istället!");
                document.querySelector('#content').innerHTML += "<br><br><p>Där vart det fel, skriv en siffra istället!</p>";
            }
    }
    else {
        alert("Du har slut på gissningar! Rätt nummer var "+randomNumber+".\n\nStartar om med ett nytt nummer och "+numberOfAttempts+" nya försök.\n\nLycka till!")
        document.querySelector('#content').innerHTML += "<br><br><p>Du har slut på gissningar! Rätt nummer var "+randomNumber+".\n\nStartar om med ett nytt nummer och "+numberOfAttempts+" nya försök.\n\nLycka till!</p>";
        attemptNumber = 0;
        randomNumber = getRandomInt(100)+1;
    }
}
let randomNumber = getRandomInt(100)+1;
buttonGuess.setAttribute("onclick","buttonGuessOnClick()")
    
// Uppgift 4 Rövarspråk
function isConsonant(sign){
    let consonants = {b:true,c:true,d:true,f:true,g:true,h:true,j:true,k:true,l:true,m:true,n:true,p:true,q:true,r:true,s:true,t:true,v:true,w:true,x:true,z:true};
    return consonants[sign.toLowerCase()];
}
function translateRobber(inputRobber){
    let outputRobber ="";
    for (i=0; i<inputRobber.length ; i++){
        if (isConsonant(inputRobber[i])){
            outputRobber += inputRobber[i]+"o"+inputRobber[i].toLowerCase();
        }
        else {
            outputRobber += inputRobber[i];
        }
    }
    return outputRobber;
}
buttonRobber.onclick =function () {
    document.querySelector('#content').innerHTML = "";
    let inputRobber = prompt("Skriv något som ska översättas till rövarspråket!");
    alert("En riktig rövare hade sagt:\n\n"+translateRobber(inputRobber));
    document.querySelector('#content').innerHTML += "<br><br><p>En riktig rövare hade sagt:<br><br>"+translateRobber(inputRobber)+"</p>";
}

// Uppgift 5 Arvshierarki
buttonAncestry.onclick =function() {
    // Rensar sidan först så att man inte kan trycka på knappen två gånger
    document.querySelector('#content').innerHTML = "<br><br><p>5. Arvshierarki<br><br></p>";
    class Person {
        constructor(name, employed, happy){
            this.name = name;
            this.employed = employed;
            this.happy = happy;
        }
        getJob = function(employed){
            if (employed == "Yes"){
                document.querySelector('#content').innerHTML += "<p>"+this.name +" är redan anställd och behöver inte hitta ett jobb.</p>";
                console.log(this.name + " är redan anställd och behöver inte hitta ett jobb.")
            }
            else if (employed == "No"){
                this.employed = "Yes";
                document.querySelector('#content').innerHTML += "<p>"+this.name +" skaffade sig ett jobb!</p>";
                console.log(this.name + " skaffade sig ett jobb!")
            }
        }
        teach = function(employed){
            if (employed == "Yes"){
                document.querySelector('#content').innerHTML += "<p>"+this.name +" kan sina grejer och börjar att lära ut till andra!</p>";
                console.log(this.name + " kan sina grejer och börjar att lära ut till andra!")
            }
            else if (employed == "No"){
                document.querySelector('#content').innerHTML += "<p>"+this.name +" har inte tillräckligt med erfarenhet och får dessvärre inte lära ut.</p>";
                console.log(this.name + " har inte tillräckligt med erfarenhet och får dessvärre inte lära ut.")
            }
        }
    }
    let h = new Person("Holger", "Yes", "Yes");
    let l = new Person("Lisa", "No", "No");
    console.log(h)
    console.log(l)
    h.getJob(h.employed);
    h.teach(h.employed);
    l.teach(l.employed);
    l.getJob(l.employed);
    l.teach(l.employed);
    
    class Student extends Person {
        constructor(name, employed, happy, grade, csn, experienced){
            super(name, employed, happy);
            this.grade = grade;
            this.csn = csn;
            this.experienced = experienced; 
        }
        study = function() {
            document.querySelector('#content').innerHTML += "<p>"+this.name +" sitter och pluggar.</p>";
            console.log(this.name + " sitter och pluggar.")
        }
        getCsn = function(employed, csn) {
            if (employed == "No" && csn == "No"){ 
                this.csn = "Yes"
                document.querySelector('#content').innerHTML += "<p>"+this.name +" är i behov av pengar ordnade fram ett CSN-lån!</p>";
                console.log(this.name +" är i behov av pengar ordnade fram ett CSN-lån!")
            }
            else if (employed == "Yes" || csn == "Yes"){
                document.querySelector('#content').innerHTML += "<p>"+this.name +" behöver inte ta ett CSN-lån.</p>";
                console.log(this.name +" behöver inte ta ett CSN-lån.")
            }
        }
        beHappy = function(happy, grade, experienced){
            if (happy == "No" && grade == "A" && experienced == "No"){
                this.happy = "Yes";
                document.querySelector('#content').innerHTML += "<p>"+this.name +" har gjort bra ifrån sig och blev glad för det!</p>";
                console.log(this.name + " har gjort bra ifrån sig och blev glad för det!")
            }
            else if (happy == "No" && grade == "A" && experienced == "Yes"){
                document.querySelector('#content').innerHTML += "<p>"+this.name +" har gjort bra ifrån sig men vet att det kommer bli mycket svårare.</p>";
                console.log(this.name + " har gjort bra ifrån sig men vet att det kommer bli mycket svårare.")
            }
            else if (happy == "Yes" && grade != "A"){
                this.happy = "No";
                document.querySelector('#content').innerHTML += "<p>"+this.name +" har gjort sådär ifrån sig och är inte längre glad.</p>";
                console.log(this.name +" har gjort sådär ifrån sig och är inte längre glad.");
            }
            else if (happy == "No" && grade != "A"){
                document.querySelector('#content').innerHTML += "<p>"+this.name +" har inga skäl till att vara glad.</p>";
                console.log(this.name +" har inga skäl till att vara glad.")
            }
        } 
    }
    let c = new Student("Christofer", "No", "No", "A", "Yes", "Yes");
    let e = new Student("Erik", "No", "Yes", "C", "No", "No");
    console.log(c);
    console.log(e);
    c.study(); 
    c.getCsn(c.employed, c.csn);
    e.getCsn(e.employed, e.csn);
    c.beHappy(c.happy, c.grade, c.experienced);
    e.beHappy(e.happy, e.grade, e.experienced);

    // Skriver ut keys + values för alla personer (efter ändringar)
    let people = [h,l,c,e]
    document.querySelector('#content').innerHTML += "<br><br><br>";
    for (i = 0; i < people.length; i++){
        let json = JSON.stringify(people[i]);
        document.querySelector('#content').innerHTML += "<p>"+json+"</p>";
    }
}

// Uppgift 6 Formulär för gissningslek och rövarspråk
function formGuessFunc(){
    if (attemptNumber < numberOfAttempts)
    {
        let guessedNumber = document.getElementById("formGuess")[0].value;
        attemptNumber++;
            if (guessedNumber == randomNumber)
            {
                document.getElementById("formGuess")[2].value = "Rätt gissat! Det tog dig " + attemptNumber + " försök att gissa talet " +randomNumber + "! Spelet omstartat, du får nu "+numberOfAttempts+" nya försök att gissa ett nytt tal. Lycka till!";
                attemptNumber = 0;
                randomNumber = getRandomInt(100)+1;
            }
            else if (guessedNumber < randomNumber)
            {
                document.getElementById("formGuess")[2].value = "För lågt! Du gissade " + guessedNumber +" och har " +(numberOfAttempts-attemptNumber) + " försök kvar";
                // console.log(randomNumber) // skriver ut rätt tal i konsolen i felsökningssyfte
            }
            else if (guessedNumber > randomNumber && guessedNumber < 101)
            {
                document.getElementById("formGuess")[2].value ="För högt! Du gissade " + guessedNumber +" och har " +(numberOfAttempts-attemptNumber) + " försök kvar";
                // console.log(randomNumber) // skriver ut rätt tal i konsolen i felsökningssyfte
            }
            else if (guessedNumber > 100)
            {
                attemptNumber--;
                document.getElementById("formGuess")[2].value = "Där vart det fel, skriv en siffra mellan 1 och 100";
            }
            else
            {
                attemptNumber--;
                document.getElementById("formGuess")[2].value ="Där vart det fel, skriv en siffra istället!";
            }
    }
    else {
        document.getElementById("formGuess")[2].value = "Du har slut på gissningar! Rätt nummer var "+randomNumber+". Startar om med ett nytt nummer och "+numberOfAttempts+" nya försök. Lycka till!";
        attemptNumber = 0;
        randomNumber = getRandomInt(100)+1;
    } 
}

function formRobberFunc(){
    document.getElementById("formRobber")[1].value = translateRobber(document.getElementById("formRobber")[0].value);
}

buttonForms.onclick =function () {
    document.querySelector('#content').innerHTML = "<br><br><p>6. Formulär för gissningslek och rövarspråk</p><br>";

    // Formulär för gissningslek
    let formGuess = document.createElement("form");
    formGuess.setAttribute("id", "formGuess");

    // Input
    let guessFormInput = document.createElement("input");
    guessFormInput.setAttribute("class", "textField");
    guessFormInput.setAttribute("type", "text");
    guessFormInput.setAttribute("name", "originalGuess");
    guessFormInput.setAttribute("placeholder", "Skriv din gissning mellan 1-100");
    guessFormInput.setAttribute("size", "93");
    

    // Output
    let guessFormOutput = document.createElement("input");
    guessFormOutput.setAttribute("class", "textField");
    guessFormOutput.setAttribute("type", "text");
    guessFormOutput.setAttribute("name", "guess");
    guessFormOutput.setAttribute("disabled", "true");
    guessFormOutput.setAttribute("size", "100");

    // Knapp för att gissa
    let guessFormButton = document.createElement("button");
    guessFormButton.setAttribute("type","button");
    guessFormButton.setAttribute("name","guessFormButton");
    guessFormButton.textContent ="Gissa";
    guessFormButton.setAttribute("onclick","formGuessFunc()") 

    // Append
    formGuess.append(guessFormInput); 
    formGuess.append(guessFormButton);
    formGuess.append(guessFormOutput);
    document.querySelector('#content').innerHTML += "<p>Gissningslek: </p>";
    document.querySelector('#content')
    .appendChild(formGuess);

    // Formulär för rövarspråk
    let formRobber = document.createElement("form");
    formRobber.setAttribute("id", "formRobber");

    // Input
    let robberFormInput = document.createElement("input");
    robberFormInput.setAttribute("class", "textField");
    robberFormInput.setAttribute("type", "text");
    robberFormInput.setAttribute("name", "originalText");
    robberFormInput.setAttribute("placeholder", "Skriv det som ska översättas");
    robberFormInput.setAttribute("onkeyup", "formRobberFunc();");
    robberFormInput.setAttribute("size", "100");

    // Output
    let robberFormOutput = document.createElement("input");
    robberFormOutput.setAttribute("class", "textField");
    robberFormOutput.setAttribute("type", "text");
    robberFormOutput.setAttribute("name", "robber");
    robberFormOutput.setAttribute("disabled", "true");
    robberFormOutput.setAttribute("size", "100");

    // Append
    formRobber.append(robberFormInput); 
    formRobber.append(robberFormOutput);    
    document.querySelector('#content').innerHTML += "<p>Rövarspråk: </p>";
    document.querySelector('#content')
    .appendChild(formRobber);
}

// Uppgift 7 Resebokning
buttonBooking.onclick =function () {

    // Formulär för resebokning
    let bookForm = document.createElement("form");
    bookForm.setAttribute("id", "bookForm");

    //För och efternamn
    let bookFormName = document.createElement("input");
    bookFormName.setAttribute("class", "textField");
    bookFormName.setAttribute("id", "name");
    bookFormName.setAttribute("name", "name");
    bookFormName.setAttribute("placeholder", "Namn");

    //epostadress
    let bookFormEmail = document.createElement("input");
    bookFormEmail.setAttribute("class", "textField");
    bookFormEmail.setAttribute("id", "email");
    bookFormEmail.setAttribute("name", "email");
    bookFormEmail.setAttribute("placeholder", "E-postadress");

    //adress
    let bookFormAddress = document.createElement("input");
    bookFormAddress.setAttribute("class", "textField");
    bookFormAddress.setAttribute("id", "address");
    bookFormAddress.setAttribute("name", "address");
    bookFormAddress.setAttribute("placeholder", "Gatuadress");

    //postnummer
    let bookFormZipcode = document.createElement("input");
    bookFormZipcode.setAttribute("class", "textField");
    bookFormZipcode.setAttribute("id", "zipcode");
    bookFormZipcode.setAttribute("name", "zipcode");
    bookFormZipcode.setAttribute("placeholder", "Postnummer");

    //ort
    let bookFormMunicipality = document.createElement("input");
    bookFormMunicipality.setAttribute("class", "textField");
    bookFormMunicipality.setAttribute("id", "municipality");
    bookFormMunicipality.setAttribute("name", "municipality");
    bookFormMunicipality.setAttribute("placeholder", "Ort");

    //avresedatum
    let bookFormTravelDate = document.createElement("input");
    bookFormTravelDate.setAttribute("class", "textField");
    bookFormTravelDate.setAttribute("type", "date");
    bookFormTravelDate.setAttribute("name", "bookFormTravelDate");
    bookFormTravelDate.setAttribute("id", "bookFormTravelDate");
    bookFormTravelDate.setAttribute("placeholder", "mm/dd/yy");

    //hemresedatum
    let bookFormReturnDate = document.createElement("input");
    bookFormReturnDate.setAttribute("class", "textField");
    bookFormReturnDate.setAttribute("type", "date");
    bookFormReturnDate.setAttribute("name", "bookFormReturnDate");
    bookFormReturnDate.setAttribute("id", "bookFormReturnDate");

    //submit-knapp
    let bookFormButton = document.createElement("button");
    bookFormButton.setAttribute("type","button");
    bookFormButton.setAttribute("name","bookFormButton");
    bookFormButton.setAttribute("id", "bookFormButton")
    bookFormButton.textContent ="Skicka in";
    bookFormButton.setAttribute("disabled","true");

    //labels
    const travelLabel = document.createElement("p");
    travelLabel.setAttribute("class","label");
    travelLabel.setAttribute("id","travelLabel");
    travelLabel.textContent = "Avresedatum: ";
    const returnLabel = document.createElement("p");
    returnLabel.setAttribute("class","label");
    returnLabel.setAttribute("id","returnLabel");
    returnLabel.textContent = "Hemresedatum: ";

    //Felmeddelanden
    const errorMessages = document.createElement("ul");
    errorMessages.setAttribute("id","errorMessages");

    const errorName = document.createElement("li");
    errorName.setAttribute("id", "errorName");
    errorName.textContent = 'För- och efternamn i formatet "förnamn efternamn".';

    const errorEmail = document.createElement("li");
    errorEmail.setAttribute("id", "errorEmail");
    errorEmail.textContent = 'E-postadress i formatet "namn@domän.toppdomän".';

    const errorAddress = document.createElement("li");
    errorAddress.setAttribute("id", "errorAddress");
    errorAddress.textContent = 'Adress i formatet "text".';

    const errorZipcode = document.createElement("li");
    errorZipcode.setAttribute("id", "errorZipcode");
    errorZipcode.textContent = 'Postnummer i formatet "12345".';

    const errorArea = document.createElement("li");
    errorArea.setAttribute("id", "errorArea");
    errorArea.textContent = 'Ort i formatet "text".';

    const errorDate = document.createElement("li");
    errorDate.setAttribute("id","errorDate");
    errorDate.textContent = 'Avresedatum får inte vara senare än hemresedatum.';


    const lb = document.createElement("br");
    lb.textContent = "<br>";

    // Append
    bookForm.append(bookFormName, lb.cloneNode(), bookFormEmail, lb.cloneNode(), bookFormAddress, lb.cloneNode(), 
        bookFormZipcode, lb.cloneNode(),  bookFormMunicipality,lb.cloneNode(), lb.cloneNode(), travelLabel, bookFormTravelDate, lb.cloneNode(), returnLabel, bookFormReturnDate, 
        lb.cloneNode(), lb.cloneNode(), bookFormButton, errorMessages); 
    errorMessages.append(lb.cloneNode(), errorName, errorEmail, errorAddress, errorZipcode, errorArea, errorDate);

    document.querySelector('#content').innerHTML = "<br><br><p>7. Reseformulär: </p>";
    document.querySelector('#content').appendChild(bookForm);

    bookForm.querySelector("#travelLabel").style.margin = "0";
    bookForm.querySelector("#travelLabel").style.marginRight = "21px";
    bookForm.querySelector("#travelLabel").style.display ="inline"
    bookForm.querySelector("#returnLabel").style.margin = "0";
    bookForm.querySelector("#returnLabel").style.display ="inline"

    let inputCheck = [0,0,0,0,0,0,0];
    // Validera innehåll och lås upp submit-knapp
    function enableButton(){
        if (inputCheck == "1,1,1,1,1,1,1")
        {
            bookFormButton.disabled = false;
        }
        else {
            bookFormButton.disabled = true;
        }  
    }

    // Funktionalitet för submit-knapp
    document.querySelector("#bookFormButton").addEventListener("click", function () {
        alert("Formuläret är nu inskickat (på låtsas) med uppgifterna:\n\nNamn: "+document.querySelector("#name").value+"\nE-postadress: "+document.querySelector("#email").value+"\nGatuadress: "+ document.querySelector("#address").value+"\nPostnummer: "+document.querySelector("#zipcode").value+"\nOrt: "+document.querySelector("#municipality").value +"\nAvresedatum: "+document.querySelector("#bookFormTravelDate").value+"\nHemresedatum: "+document.querySelector("#bookFormReturnDate").value);
        bookForm.submit();
    }); 

    function checkInput()
    {
        const nameRegex = /[a-zA-Z]+\s[a-zA-Z]+/;
        document.querySelector("#name").addEventListener("change", function(event)
        {
            const check = nameRegex.exec(event.target.value);
            if (!check)
            {
                document.querySelector("#errorName").style.color = "red";
                inputCheck[0] = 0;
            }
            else
            {
                document.querySelector("#errorName").style.color = "green";
                inputCheck[0] = 1;
            }
            enableButton();
        });

        const emailRegex = /\S+\@\S+\.\S+/;
        document.querySelector("#email").addEventListener("change", function(event)
        {
            const check = emailRegex.exec(event.target.value);
            if (!check)
            {
                document.querySelector("#errorEmail").style.color = "red";
                inputCheck[1] = 0;
            }
            else
            {
                document.querySelector("#errorEmail").style.color = "green";
                inputCheck[1] = 1;
            }
            enableButton();
        });

        const addressRegex = /[a-zA-Z]+/;
        document.querySelector("#address").addEventListener("change", function(event)
        {
            const check = addressRegex.exec(event.target.value);
            if (!check)
            {
                document.querySelector("#errorAddress").style.color = "red";
                inputCheck[2] = 0;
            }
            else
            {
                document.querySelector("#errorAddress").style.color = "green";
                inputCheck[2] = 1;
            }
            enableButton();
        });

        const postRegex = /\d{5}/;
        document.querySelector("#zipcode").addEventListener("change", function(event)
        {
            const check = postRegex.exec(event.target.value);
            if (!check)
            {
                document.querySelector("#errorZipcode").style.color = "red";
                inputCheck[3] = 0;
            }
            else
            {
                document.querySelector("#errorZipcode").style.color = "green";
                inputCheck[3] = 1;
            }
            enableButton();
            
        });

        const areaRegex = /[a-zA-Z]+/;
        document.querySelector("#municipality").addEventListener("change", function(event)
        {
            const check = areaRegex.exec(event.target.value);
            if (!check)
            {
                document.querySelector("#errorArea").style.color = "red";
                inputCheck[4] = 0;
            }
            else
            {
                document.querySelector("#errorArea").style.color = "green";
                inputCheck[4] = 1;
            }
            enableButton();
        });

        document.querySelector("#bookFormTravelDate").addEventListener("change", function()
        {
            const travelDate = new Date(bookForm.bookFormTravelDate.value);
            const returnDate = new Date(bookForm.bookFormReturnDate.value);
            
            if (travelDate != "Invalid Date" && returnDate == "Invalid Date"){
                document.querySelector("#errorDate").style.color = "red";
                inputCheck[5] = 1;
            } 
            else if (travelDate > returnDate || travelDate == "Invalid Date" || returnDate == "Invalid Date")
            {
                document.querySelector("#errorDate").style.color = "red";
                inputCheck[5] = 0;
            }
            else if (travelDate < returnDate && returnDate != "Invalid Date"){
                inputCheck[5] = 1;
                inputCheck[6] = 1;
                document.querySelector("#errorDate").style.color = "green";
            }
            enableButton();
        });

        document.querySelector("#bookFormReturnDate").addEventListener("change", function()
        {
            const travelDate = new Date(bookForm.bookFormTravelDate.value);
            const returnDate = new Date(bookForm.bookFormReturnDate.value);
            if (travelDate > returnDate)
            {
                document.querySelector("#errorDate").style.color = "red";
                inputCheck[6] = 0;
            }
            else if (travelDate < returnDate && travelDate!= "Invalid Date")
            {
                inputCheck[6] = 1;
                if (inputCheck[5] == 1 && inputCheck[6] == 1){
                    document.querySelector("#errorDate").style.color = "green";
                }
                else {
                    document.querySelector("#errorDate").style.color = "red";
                    inputCheck [6] = 0;
                }
            }    
            enableButton();
        });
    }
    checkInput();
}

// Uppgift 8 Interaktivitet
buttonInteractive.onclick =function () {
    const pTagInvis = document.createElement("p");
    pTagInvis.setAttribute("id","invisTag");
    pTagInvis.textContent = "1. Klicka på mig och se mig försvinna";

    const pTagToggler = document.createElement("p");
    pTagToggler.setAttribute("id","togglerTag");
    pTagToggler.textContent = "2. Klicka på mig och göm eller visa nedan stycke (#3)";

    const pTagToggle = document.createElement("p");
    pTagToggle.setAttribute("id","toggleTag");
    pTagToggle.textContent = "3. Jag kan försvinna och komma åter mha av #2!";

    const pTagFader = document.createElement("p");
    pTagFader.setAttribute("id","faderTag");
    pTagFader.textContent = "4. Jag får #2 att blekna (fade).";

    const pTagSlider = document.createElement("p");
    pTagSlider.setAttribute("id","sliderTag");
    pTagSlider.textContent = "5. Jag öppnas för att visa mer innehåll.";
    pTagSlider.style.backgroundColor = "green";
    pTagSlider.style.marginBottom = "0";

    const pTagSliderContent = document.createElement("p");
    pTagSliderContent.setAttribute("id","sliderContent");
    pTagSliderContent.textContent = "Jag är gömd från början!";
    pTagSliderContent.style.display = "none";
    pTagSliderContent.style.backgroundColor = "green";
    pTagSliderContent.style.paddingTop = "20px";
    pTagSliderContent.style.marginTop = "0";

    const pTagColorChanger = document.createElement("p");
    pTagColorChanger.setAttribute("id","colorChanger");
    pTagColorChanger.textContent = "6. Jag ändrar färg på #5 när jag blir klickad på, men är också lite av en kameleont.";

    const dropMenu = document.createElement("nav");
    dropMenu.setAttribute("id","dropMenu");
    dropMenu.textContent ="Drop-down meny";
    dropMenu.style.backgroundColor = "green";
    dropMenu.style.width = "200px";
    dropMenu.style.position = "relative";

    const list = document.createElement("ul");
    list.setAttribute("id","menuList");
    list.style.display = "none";

    const li1 = document.createElement("li");
    li1.setAttribute("class","underli");
    li1.textContent = "Första valet";

    const li2 = document.createElement("li");
    li2.setAttribute("class","underli");
    li2.textContent = "Andra valet";

    const box = document.createElement("div");
    box.setAttribute("id","box");
    box.textContent = "Klicka på mig!";
    box.style.position = "relative";
    box.style.textAlign = "center";
    box.style.backgroundColor = "green";
    box.style.height = "100px";
    box.style.width = "100px"; 
    box.style.marginTop ="50px";
  
    // Append
    document.querySelector('#content').innerHTML = "<br><br><p>8. jQuery: </p><br>";
    document.querySelector('#content').append(pTagInvis);
    document.querySelector('#content').append(pTagToggler);
    document.querySelector('#content').append(pTagToggle);
    document.querySelector('#content').append(pTagFader);
    document.querySelector('#content').append(pTagSlider);
    document.querySelector('#content').append(pTagSliderContent);
    document.querySelector('#content').append(pTagColorChanger);
    document.querySelector('#content').append(dropMenu);
    dropMenu.appendChild(list);
    list.appendChild(li1);
    list.appendChild(li2);
    document.querySelector('#content').append(box);

    $(function(){
        $( "#invisTag" ).click(function(){
            $(this).hide("slow");
        });
       
        $( "#togglerTag" ).click(function(){
            $("#toggleTag").toggle("slow");
        });

        $( "#faderTag" ).click(function(){
            $("#togglerTag").fadeToggle("slow");
        });

        $( "#sliderTag" ).click(function(){
            $("#sliderContent").slideToggle("slow");
        });
        
        $( "#colorChanger" ).click(function(){
            var color = $("#sliderTag").css("backgroundColor");
            if (color == "rgb(0, 128, 0)")
            {
                $("#sliderTag").css("backgroundColor","red");
                $("#sliderContent").css("backgroundColor","red");    
            }
            else {
                $("#sliderTag").css("backgroundColor","green");
                $("#sliderContent").css("backgroundColor","green");
            }
        });

        $("#colorChanger").on({
            mouseenter: function(){
                $(this).css("color","rgb(150, 137, 137)");
            },
            mouseleave: function(){
                $(this).css("color","white");
            }
        });

        $("#dropMenu").hover(function(){
            $("#menuList").slideToggle();
        });

        $("#box").click(function(){
            $("#box").animate({
                left: '800px',
                opacity: '0.5',
                height: '150px',
                width: '150px'
            });
            $("#box").animate({
                top: '200px',
                opacity: '1',
                height: '100px',
                width: '100px'
            });
            $("#box").animate({
                left: '-=800px',
                opacity: '0.5',
                height: '150px',
                width: '150px'
            });
            $("#box").animate({
                top: '-=200px',
                opacity: '1',
                height: '100px',
                width: '100px'
            });
        });
    });
}