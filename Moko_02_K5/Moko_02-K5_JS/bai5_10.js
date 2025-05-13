async function asyncParallel( arrayFunc = [] , endCallBack){
    let fnresult = [];
    for(let i = 0; i < arrayFunc.length; i ++){
        let callFunc = arrayFunc[i];
        if (typeof callFunc === 'function'){
            await doAsync(arrayFunc[i]).then(result => {
                console.log(result); 
                fnresult[i] = result;
            });
        }
    }
    endCallBack(fnresult);

    function doAsync(func) {
        return new Promise((resolve) => {
            func( (value) =>{
                resolve( value);
            });
        });
      }
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
let a = await asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], (result) => {
    console.log(result);
    // 1, 2, 3 (prints results of each asynchronous function in order)
});