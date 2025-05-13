function asyncParallel( arrayFunc = [] , endCallBack){

  let finalResult = [];
  callFunc(0,finalResult);

  function callFunc(index , finalResult ){
          if(index >= 0 && index < arrayFunc.length ){
            let func = arrayFunc[index];
            doAsync(func).then(result => {
              console.log(result); 
              finalResult[index] = result;
                callFunc(index+1,finalResult)
          });
          }else{
            endCallBack(finalResult);
          }
  }


  function doAsync(func) {
      return new Promise((resolve) => {
          func( (value) =>{
              resolve( value);
          });
      });
  }


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
