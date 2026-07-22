// =========================
// ELEMENTS
// =========================
emailjs.init({
    publicKey: "sOToDHPIf-otLYem7"
});

const openBouquet =
document.getElementById("openBouquet");

const envelope =
document.querySelector(".envelope");

const bouquetSection =
document.getElementById("bouquetSection");

const flowers =
document.querySelectorAll(".flower");

const calendarButton =
document.getElementById("calendarButton");

const calendarSection =
document.getElementById("calendarSection");

const submitButton =
document.getElementById("submitButton");

const celebration =
document.getElementById("celebration");

const timeButtons =
document.querySelectorAll(".time");



let selectedDates = [];


// =========================
// OPEN ENVELOPE
// =========================

openBouquet.addEventListener("click", function(){

    envelope.classList.add("open");

    setTimeout(function(){

        document.getElementById("envelope")
        .style.display = "none";

       bouquetSection.style.display="block";

document.body.style.background =
"linear-gradient(135deg,#ffe6ef,#fff7f2,#eee3ff)";

        createPetals();

    },1800);

});



// =========================
// FLOWER SELECTION
// =========================

flowers.forEach(function(flower){

    flower.addEventListener("click", function(event){


        flower.classList.toggle("selected");


        const name =
        flower.dataset.name;


        if(selectedDates.includes(name)){

            selectedDates =
            selectedDates.filter(
                item => item !== name
            );

        }
        else{

            selectedDates.push(name);

        }


        createSparkle(
            event.pageX,
            event.pageY
        );


    });

});



// =========================
// SHOW CALENDAR
// =========================

calendarButton.addEventListener("click",function(){

    calendarSection.style.display="block";

    calendarSection.scrollIntoView({
        behavior:"smooth"
    });

});



// =========================
// DATE PICKER
// =========================

flatpickr("#datePicker",{

    minDate:"today",

    dateFormat:"F j, Y"

});



// =========================
// TIME BUTTONS
// =========================

timeButtons.forEach(function(button){

    button.addEventListener("click",function(){

        timeButtons.forEach(function(btn){

            btn.classList.remove("active");

        });


        button.classList.add("active");

    });

});



// =========================
// SUBMIT
// =========================

submitButton.addEventListener("click", function(){


    const date =
    document.getElementById("datePicker").value;


    const time =
    document.querySelector(".time.active");


    const selectedTime =
    time ? time.innerText : "Anytime ❤️";


    const name =
    document.getElementById("guestName")
    ? document.getElementById("guestName").value
    : "Someone special";


    const message =
    document.getElementById("guestMessage")
    ? document.getElementById("guestMessage").value
    : "I can't wait ❤️";



    // Confirmation screen data

    if(document.getElementById("finalDate")){

        document.getElementById("finalDate").innerHTML =
        date || "Surprise Date ❤️";

    }


    if(document.getElementById("finalTime")){

        document.getElementById("finalTime").innerHTML =
        selectedTime;

    }


    if(document.getElementById("finalActivities")){

        document.getElementById("finalActivities").innerHTML =
        selectedDates.length > 0
        ?
        selectedDates.join(", ")
        :
        "Surprise Me 💐";

    }


    if(document.getElementById("finalMessage")){

        document.getElementById("finalMessage").innerHTML =
        message;

    }



    // Send email

    const templateParams = {

        name: name,

        activities:
        selectedDates.length > 0
        ?
        selectedDates.join(", ")
        :
        "Surprise Me 💐",

        date:
        date || "No date selected",

        time:
        selectedTime,

        message:
        message

    };



    emailjs.send(

        "service_8dj35cr",

        "template_bilpghh",

        templateParams

    )
    .then(function(){


        console.log("Email sent");


    })
    .catch(function(error){

        console.log(
        "Email error:",
        error
        );

    });



    // Show celebration

    bouquetSection.style.display="none";

    celebration.style.display="flex";

    createConfetti();


});



// =========================
// PETALS
// =========================

function createPetals(){

    const container =
    document.getElementById("petals");


    const items=[
        "🌸",
        "🌹",
        "🌷",
        "✨"
    ];


    for(let i=0;i<40;i++){


        let petal =
        document.createElement("div");


        petal.className="petal";


        petal.innerHTML =
        items[
            Math.floor(
                Math.random()*items.length
            )
        ];


        petal.style.left =
        Math.random()*100+"%";


        petal.style.animationDuration =
        5+
        Math.random()*5+"s";


        container.appendChild(petal);


    }

}



// =========================
// SPARKLES
// =========================

function createSparkle(x,y){

    const sparkle =
    document.createElement("div");


    sparkle.className="sparkle";

    sparkle.innerHTML="✨";


    sparkle.style.left=x+"px";

    sparkle.style.top=y+"px";


    document.body.appendChild(sparkle);


    setTimeout(()=>{

        sparkle.remove();

    },2000);

}



// =========================
// CONFETTI
// =========================

function createConfetti(){

    const items=[
        "❤️",
        "🌸",
        "✨",
        "💖"
    ];


    for(let i=0;i<100;i++){


        let piece =
        document.createElement("div");


        piece.className="petal";


        piece.innerHTML =
        items[
            Math.floor(
                Math.random()*items.length
            )
        ];


        piece.style.left =
        Math.random()*100+"%";


        piece.style.animationDuration =
        2+
        Math.random()*4+"s";


        document.body.appendChild(piece);


    }

}



// =========================
// CURSOR FLOWERS
// =========================

document.addEventListener("mousemove",function(e){


    if(Math.random()>.1)
    return;


    let flower =
    document.createElement("div");


    flower.className="cursor-flower";

    flower.innerHTML="🌸";


    flower.style.left=e.clientX+"px";

    flower.style.top=e.clientY+"px";


    document.body.appendChild(flower);


    setTimeout(()=>{

        flower.remove();

    },1000);


});
