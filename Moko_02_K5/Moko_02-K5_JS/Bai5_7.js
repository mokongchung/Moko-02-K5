//cau7
function callbackManager(arrayFunc){
    if(arrayFunc.length == 0)
        return;
    let start = -1 ;
    runNext();
    function runNext(){
        if(start >= arrayFunc.length)
            return;
        const callFunc = arrayFunc[start+=1];
        if (typeof callFunc === 'function')
            callFunc(runNext);
        
    }

}

function asyncFunc1(callback) {
    console.log("Started asyncFunc1");
    setTimeout(() => {
    console.log("Completed asyncFunc1");
    callback();
    }, 3000);
}
function asyncFunc2(callback) {
    console.log("Started asyncFunc2");
    setTimeout(() => {
    console.log("Completed asyncFunc2");
    callback();
    }, 2000);
}
function asyncFunc3(callback) {
    console.log("Started asyncFunc3");
    setTimeout(() => {
    console.log("Completed asyncFunc3");
    callback();
    }, 1000);
}
    // driver code
    