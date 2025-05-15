function day5_cau3( start = 1 , end = 10 ){
    console.log(start);
    if((start+= 1) > end)
        return;
    setTimeout( () => {
        day5_cau3(start , end);
    }

    ,1000)
}