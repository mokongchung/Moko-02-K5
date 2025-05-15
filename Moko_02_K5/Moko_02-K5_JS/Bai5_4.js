function day5_cau4(start = 1 , end =10){
    const loopId = setInterval(() => {
        console.log(start);
        if( (start+=1) > end){
            console.log("stop interval")
            clearInterval(loopId);
        }
    }, 1000);
}