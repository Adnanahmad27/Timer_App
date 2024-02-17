const main = document.querySelector(".main");
const form = document.getElementById("form");
const timerContainer = {};
let timerId = 1;
form.addEventListener("submit" , (e) => {
    e.preventDefault();
    let hour = form.hh.value;
    let min = form.mm.value;
    let sec = form.ss.value;
    console.log(hour +" " + min + " "+ sec);
    const container = document.createElement("div");
    container.className = "container";
    container.id = timerId++;
    container.innerHTML = `<div class="set-timer">
        <div>TimeLeft :</div>
        <div class="time">
            <input type="text" name="hh" class="hh" value=${hour} readonly><span>:</span>
            <input type="text" name="mm" class="mm" value=${min} readonly><span>:</span> 
            <input type="text" name="ss" class="ss" value=${sec} readonly>
        </div>
        <button class="btn" onClick="deleteTimer(event)" >delete</button>
    </div>`;
    main.appendChild(container);
    form.reset();
    setTimer(hour , min , sec , container.id);
})

function setTimer(hour , min , sec , id){
    let hours = parseInt(hour);
    let minutes = parseInt(min);
    let seconds = parseInt(sec);
    const node = document.getElementById(id).children[0].children[1];
    // console.log(node);
    const interval = setInterval( () => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            // alertSound.play();
            clearInterval(interval);
            setTimeout(() => {
            //   hourDisplay.parentNode.parentNode.remove();
            }, 4000);
            return;
        }
        if(seconds === 0) {
            if (minutes === 0) {
              if (hours !== 0) {
                hours--;
                minutes = 59;
                seconds = 59;
              }
            } else {
              minutes--;
              seconds = 59;
            }
          }else{
            seconds--;
        }
        node.children[0].value = addTrailingZero(hours);
        node.children[2].value = addTrailingZero(minutes);
        node.children[4].value = addTrailingZero(seconds);
    },1000);
}
function addTrailingZero(num){
    return num < 10 ? `0${num}` : num ;
}

function deleteTimer(e){
    e.target.parentNode.parentNode.remove();
}