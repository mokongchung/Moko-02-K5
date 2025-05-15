function asyncParallel( arrayFunc = [] , endCallBack){

    let result = [0,0,0];

    arrayFunc.forEach( (callFunc, index) => {
        if (typeof callFunc === 'function')
            callFunc( (valueReturn) => {
                result[index] = valueReturn;
                //console.log(result);
                endCallBack(result);
            });
        
    });
    return result;
}




function asyncFunc1(callback) {
    setTimeout(() => {
    callback(1);
    }, 3000);
}
function asyncFunc2(callback) {
    setTimeout(() => {
    callback(2);
    }, 2000);
}
function asyncFunc3(callback) {
    setTimeout(() => {
    callback(3);
    }, 1000);
}
let a = asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], (result) => {
    console.log(result);
    // 1, 2, 3 (prints results of each asynchronous function in order)
});
