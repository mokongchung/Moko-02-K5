
function timer(start ,step , timeLoop = 1000){
    let loopId;
    function startTimer(){
        console.log("start timer")
        loopId = setInterval( () =>{
            console.log(start);
            start += step;
        },timeLoop)
    }
    function stopTimer(){
        console.log("stop timer")
        loopId && clearInterval(loopId);
    }

    return {
        startTimer: startTimer,
        stopTimer: stopTimer
      };
}

const timerInstance = timer(100, 10);
timerInstance.startTimer();
setTimeout(() => {
timerInstance.stopTimer();
}, 5000);
