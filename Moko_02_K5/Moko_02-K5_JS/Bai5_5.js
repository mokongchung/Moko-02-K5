function day5_cau5( start = 10 , end = 1){
    console.log(start)
    if( (start -=1 ) >= end){
        setTimeout(  
            day5_cau5
            , 1000 , start , end)
    }


}