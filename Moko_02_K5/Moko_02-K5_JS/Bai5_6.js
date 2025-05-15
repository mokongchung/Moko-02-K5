
function timer(start =100,step =10, timeLoop = 1000){
    let loopId;
    const arrayCallback = [];
    const timeTriger = [];
    function startTimer(){
        console.log("start timer")
        loopId = setInterval( () =>{
            console.log(start);
            // check call func callback
            if(timeTriger.length > 0){
                let index = timeTriger.indexOf(start);
                if (index >= 0){
                    let func = arrayCallback[index];
                    func("run func at "+ start);

                    arrayCallback.splice(index, 1)
                    timeTriger.splice(index, 1)
                }
            }
            //
            start += step;
        },timeLoop)
    }
    function stopTimer(){
        console.log("stop timer")
        loopId && clearInterval(loopId);
    }

    function addFunc(func , timeTrigerinput = 0){
        if ( typeof func === 'function'){
            arrayCallback.push(func);
            timeTriger.push(timeTrigerinput);
            console.log(timeTriger);
        }
        else{
            console.log("callback input not afunc");
        }

    }

    return {
        startTimer: startTimer,
        stopTimer: stopTimer,
        add: addFunc,
      };
}

// add func , if log 

const timerInstance = timer(100, 10, 200);


timerInstance.add(  asyncFunc1 , 120);
timerInstance.add(  asyncFunc1 , 140);
timerInstance.add(  asyncFunc1 , 150);
timerInstance.add(  300  , 190);    //input error
timerInstance.add(  asyncFunc1 , 200);
timerInstance.startTimer();
setTimeout(() => {
timerInstance.stopTimer();
}, 10000);





function asyncFunc1(input) {
    console.log(input)
}