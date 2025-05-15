
cc.Class({
    extends: cc.Component,

    properties: {
        lblNoti : cc.Label,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.funcRetry("https://www.google.com.vn/" , 3 , 1000);
    },

    async  funcRetry(url, maxTimeTry = 3, delayEachTime = 1000) {
        let timeTry = 0;
      
        while (timeTry <= maxTimeTry) {
          try {
             response = await fetch(url);
      
            // Nếu không phải HTTP 2xx thì coi là lỗi
            this.simulateAPICall()
            .then(function (string) {
                this.lblNoti.string += string+` after timeTry ${timeTry} failed. \n`
            })
            .catch(function (err_3) {
                console.log("false  ");
                
                throw new Error(` error! `);
            });

      
            
            return ; 
          } catch (error) {
            timeTry++;
      
            if (timeTry > maxTimeTry) {
                this.lblNoti.string += `Failed after ${maxTimeTry} retries: ${error.message} \n`;
                throw new Error(`Failed after ${maxTimeTry} retries: ${error.message}`);
            }
      
            console.warn(`timeTry ${timeTry} failed. Retrying in ${delayEachTime}...`);
            this.lblNoti.string += `timeTry ${timeTry} failed. Retrying in ${delayEachTime}... \n`;
            // Đợi delay trước khi retry
            await new Promise(resolve => setTimeout(resolve, delayEachTime));
          }
        }
      },
    
     simulateAPICall() {
        return new Promise((resolve, reject) => {
        // Simulate a 50% chance of failure
        if (Math.random() < 0.5) {
        reject(new Error('API call failed'));
        } else {
        resolve('API call succeeded');
        }
        });
    }

    // update (dt) {},
});
