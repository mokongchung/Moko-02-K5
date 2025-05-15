// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        lblNoti : cc.Label,
    },



    start () {
        this.callcheck();
    },

    async callcheck(){
        let getTimeLimited = await this.circuitBreaker(this.getLocalTime, 2000);
        lblNoti.string = getTimeLimited;
    },


    circuitBreaker(func, timeout) {
        let promisifyfunc = this.promisify(func);
            return new Promise((resolve, reject) => {
                let isTimeout = false;
    
                const timer = setTimeout(() => {
                    isTimeout = true;
                    reject(new Error("Function call timed out"));
                }, timeout);

                promisifyfunc()
                .then((result) => {
                    if (!isTimeout) {
                        clearTimeout(timer);
                        resolve(result);
                    }
                })
                .catch((err) => {
                    if (!isTimeout) {
                        clearTimeout(timer);
                        reject(err);
                    }
                });

            });
    },

    promisify(func) {
        return function () {
            return new Promise((resolve, reject) => {
                let resultreturn =  func();
                resolve(resultreturn);
            });
        };
    },


    async getLocalTime() {
        console.log("calllll localll timeee");
        await new Promise(resolve => setTimeout(resolve, 3000));
        return new Date().getTime()
    },

    // update (dt) {},
});
