function asyncParallel( arrayFunc = [] , endCallBack){

    let finalResult = [];
    callFunc(0,finalResult);
  
    function callFunc(index , finalResult ){
            if(index >= 0 && index < arrayFunc.length ){
              let func = arrayFunc[index];
              doAsync(func).then(result => {
                    try{
                        console.log(result); 
                        finalResult[index] = result;
                    }catch(error) {
                        console.log(error);
                    }
                    
                    callFunc(index+1,finalResult)
                }).catch(error => {
                    console.log("Lỗi:", error);
                });
            }else{
              endCallBack(finalResult);
            }
    }
  
  
    function doAsync(func) {
        return new Promise((resolve, reject) => {
            try {
                func( (value) =>{
                    resolve( value);
                });
            } catch (error) {
                reject(error);            
              }
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
  