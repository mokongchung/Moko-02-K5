function asyncParallel( arrayFunc = [] , endCallBack){

    let finalResult = [];


    for(let i = 0; i < arrayFunc.length ; i ++){
        createNewPromise(arrayFunc[i], finalResult , i).then(result => {
            console.log("aaa" + result); 
          });
    }


    function createNewPromise(callback , finalResult, index) {
        return new Promise((resolve, reject) => {
          try {
            
            callback( (result) => {
                finalResult[index] = result;
            }); // Gọi hàm callback
            resolve(finalResult);           
          } catch (error) {
            reject(error);             
          }
        });
      }

    endCallBack(finalResult);
    return finalResult;
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
