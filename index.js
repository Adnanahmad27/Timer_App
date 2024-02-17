const main = document.querySelector(".main");
const form = document.getElementById("form");
const text = document.querySelector(".text");
const timerContainer = {};
let timerId = 1;
let itr = 0;
form.addEventListener("submit" , (e) => {
    e.preventDefault();
    let hour = form.hh.value;
    let min = form.mm.value;
    let sec = form.ss.value;
    if(Number(min) < 60 && Number(sec) < 60){
        // console.log(hour +" " + min + " "+ sec);
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
            <button class="btn" onClick="deleteTimer(event)">delete</button>
        </div>`;
        text.className = "text hide";
        itr++;
        main.appendChild(container);
        form.reset();
        setTimer(hour , min , sec , container.id);
    }else{
        alert("Invalid Time Format!");
        form.reset();
    }
})

function setTimer(hour , min , sec , id){
    let hours = parseInt(hour);
    let minutes = parseInt(min);
    let seconds = parseInt(sec);
    const nodeCont = document.getElementById(id);
    const node = nodeCont.children[0].children[1];
    const interval = setInterval( () => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            nodeCont.style.backgroundColor = '#F0F758';
            nodeCont.style.color = '#34344A';
            nodeCont.innerText ='Timer Is Up!';
            clearInterval(interval);
            setTimeout(() => {
                nodeCont.remove();
               itr--;
               if(itr===0){
                text.classList.remove("hide");
                }
            }, 3000);
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
    itr--;
    if(itr===0){
        text.classList.remove("hide");
    }
}