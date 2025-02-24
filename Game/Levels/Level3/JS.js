// Debugging stuff
//console.log(localStorage);
console.info(localStorage.sound);

let color_text = 'gray';
let delay_text = '100';
let random
let countdown
let correct = 0;
let time = 5
const list_words = ["Computer", "Virus", "Life", "Component", "Firewall", "Control", "Who", "Purpose", "Human", "Brain", "Intelligence", "Happiness", "Work", "Fun", "Scared", "Enjoy", "Panic", "Alone", "Leave"]
let choosen_word
function sleep(ms) {        //Command that allow the sleep command
    return new Promise(resolve => setTimeout(resolve, ms));
}

function skippable_sleep(ms) {
    return new Promise(resolve => {
        function skip(event){
            console.log("skipping");
            console.log(event);
            switch(event.key) {
            case "Enter":
            case " ":
            case "Space":
            case "Escape":
                end();
            defualt:
                break;
            }
        }
        function end(){
            console.log("end");
            document.removeEventListener("keydown", skip);
            resolve();
        }
        document.addEventListener("keydown", skip);
        setTimeout(end, ms);
    });
}

//Code responsible for audio
async function audio() {
    if (localStorage.sound === "off"){
        //console.log("if audio: "+localStorage.sound);
        //console.info("No audio");
    }
    else {
        //Defines the audio for the typing sound, and audio.
        var sound = {
            music: new Howl({
                src: ['../../../Media/Music/Come-Play-with-Me.mp3'],
                html5: true,
                volume: 0,
                loop : true,
            }),
            typing_sound: new Howl({
                src: ['../../../Media/Sound/Computer typing.mp3']
            })
        };

        var music = sound.music.play();
        sound.music.fade(0,0.5,5000,music);
        var typing_sound = sound.typing_sound.play()
    }
}

// Code for the typing animation
function create_element_typer(text_to_print) {
    const paragraph = document.createElement("span");
    paragraph.classList.add("typer");
    paragraph.setAttribute('data-colors',color_text);
    paragraph.setAttribute('data-words',text_to_print);
    paragraph.setAttribute('data-delay',delay_text);
    //paragraph.setAttribute('id','creationEl');
    paragraph.setAttribute('data-loop',"1");
    return paragraph;
}

function proceed_to_typer_element(text_to_print) {
    const div = document.createElement("div");
    const my_element = create_element_typer(text_to_print);
    div.appendChild(my_element);
    const cursor = document.querySelector('.cursor');
    div.appendChild(cursor);
    document.querySelector('h2').appendChild(div);
    return new Typer(my_element);
}

async function skippable_typer_element(text_to_print, delay) {
    let typer = proceed_to_typer_element(text_to_print);
    await skippable_sleep(delay);
    typer.delay = 0;
}

// "Main" code, where you can input text, colour, and delay.
async function typing() {
    //start()
    color_text = "yellow"
    
    await skippable_sleep(100)
    await skippable_typer_element("Computer: What... who was he?!",5000);
    //console.log("Debug function")
    color_text = "gray"
    await skippable_typer_element("Computer: Anyway! We need to fix this as soon as possible!", 8500);
    //var typing_sound = sound.typing_sound.play()
    //await sleep(8500);
    //sound.stop()

    color_text = "red"
    await skippable_typer_element("?????: Hello again!", 3500)
    await skippable_typer_element("?????: Here's your next puzzle.", 4000)
    await skippable_typer_element("?????: Words will appear on your screen and you'll need to copy them... fast enough.", 9500)
    await skippable_typer_element("?????: Easy enough right?", 3500)

    color_text = "gray"
    //console.log("Name: "+localStorage.name);
    username = localStorage.name
    if (username == "" || username == null || username == undefined) {
        skippable_typer_element("Computer: I count on you!", 5000)
    }

    else {
        skippable_typer_element("Computer: I count on you " +username+"!", 5000)
    }

    color_text = "red"
    ask_ready()
    async function ask_ready(params) {
        proceed_to_typer_element("?????: Are you ready?")
        await sleep (3000)
        let choice_ready = "";
            do{
                choice_ready = prompt("Are you ready? (Yes or No)");
            }while(choice_ready == "" || choice_ready == null || choice_ready == undefined);

        if (choice_ready == "Yes") {
            await skippable_sleep(1000);
            await skippable_typer_element("?????: Okay! Let's do this.", 5000);
            input.classList.toggle("show");
            start()
            return true
        }

        else if (choice_ready === "No"){
            await sleep(1000)
            proceed_to_typer_element("?????: Oh really?")
            await sleep(3000)
            proceed_to_typer_element("?????: Well I'm not going to waste any more time.")
            await sleep(6000)
            window.open("../../GameOver/HTML.html","_self")
        }

        else {
            ask_ready()
        }
    }
        
}

typing()

function start() {
    countdown = window.setInterval( timer , 1000);
    console.log("List of words: "+list_words);
    random = Math.floor(Math.random()*15) //Chooses a random word
    //random = 7 //Define the choosen word manually
    choosen_word = list_words[random]
    console.log("Choosen word: "+choosen_word);
    document.getElementById("word_display").innerHTML = choosen_word


    //timer()
    /*async function timer(userInput) {
        await sleep(5000)
        userInput = "TimeOut"
        console.log(userInput);
        check_answer(userInput)
    }*/
}
let can_check = true

function timer(){
    time -= 1
    console.log('Time:'+time)
    if (time <= 0) {

        if (check_answer()){return}
        //input.classList.toggle("show")
        can_check = false
        proceed_to_typer_element("?????: Well I'm not going to waste any more time.")
        sleep(6000)
        window.open("../../GameOver/HTML.html","_self")

    }
    else if (time <= 1){
        document.getElementById("word_display").style = "color: crimson;"
    }
    else if (time <= 3) {
        document.getElementById("word_display").style="color: indianred;"
    }
}

//Runs the "check_answer" function when you press enter.
function clickPress(event) {
    if (event.keyCode == 13 && can_check) {
        check_answer()
    }
}


function check_answer() {
    let userInput = document.getElementById("input").value
    console.log("Random: "+random);
    console.log("Choosen word: "+choosen_word);
    console.log("User input: "+userInput);
    if (userInput === choosen_word) {
        console.log("Correct!");
        window.clearInterval(countdown);
        document.getElementById("word_display").style="color: white;"
        if (correct >= 10) {
            window.open("../../Story/Story2/HTML.html","_self")
        }
        else {
            correct++
            console.log("Correct: "+correct);
            time = 5
            document.getElementById("input").value = ""
            start()
        }
    }
    else {
        console.log("Wrong!");
        window.open("../../GameOver/HTML.html","_self")
        return false;
    }
    return true;
}
