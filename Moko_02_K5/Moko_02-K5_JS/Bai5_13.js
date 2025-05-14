async function asyncParallel( arrayFunc = [] , endCallBack){
    let fnresult = [];
    let arrayPromise = [];


    for(let i = 0; i < arrayFunc.length; i ++){
        arrayPromise[i] =  doAsync(arrayFunc[i]);
    }
    // dùng reduce của array  thực thi tuần tự promisse
    let value = arrayPromise.reduce((accumulator, currentValue, currentIndex) => {
        // xử lý và return giá trị tích lũy tiếp theo
        //let funcPromis = arrayPromise[currentIndex];
        
        return accumulator.then((data) => {
                currentValue.then((data) => {
                    fnresult[currentIndex] = data;
                    console.log(fnresult);
                })
        })
        
    }, Promise.resolve());


    endCallBack(value);

    function doAsync(func) {
        return new Promise((resolve, reject) => {
            try {
                func( (value) =>{
                    console.log(value);
                    resolve( value);
                });
            } catch (error) {
                reject(error);            
              }
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
    console.log( "finall calll "+result);
    // 1, 2, 3 (prints results of each asynchronous function in order)
});