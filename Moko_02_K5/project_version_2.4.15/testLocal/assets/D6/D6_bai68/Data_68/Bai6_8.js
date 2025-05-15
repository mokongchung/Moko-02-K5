// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },



    // onLoad () {},

    start () {
        this.checkTime();
    },

    async checkTime(){
        console.log("start check time");
        const localTime = await this.promisify(this.getLocalTime)();
        console.log(" local "+ localTime);
        const serverTime = await this.promisify(this.getServerTime)();
        console.log(" serverTime "+ serverTime);
        const latancy = serverTime - localTime;
        console.log("Độ trễ : " + latancy);
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
        return new Date().getTime()
    },
    async  sleep(timeSleep) {
        return new Promise(resolve => setTimeout(resolve, timeSleep));
    },


    async  getServerTime() {
        return new Promise((resolve, reject) => {
            let xmlHttp;
    
            try {
                xmlHttp = new XMLHttpRequest();
            } catch (err1) {
                try {
                    xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (err2) {
                    try {
                        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (err3) {
                        reject("AJAX not supported");
                        return;
                    }
                }
            }
            
            
            xmlHttp.open('HEAD'
                ,window.location.href.toString(),false);
                xmlHttp.setRequestHeader("Content-Type"
                ,
                "text/html");
                xmlHttp.send('');
                resolve( new Date(xmlHttp.getResponseHeader("Date")).getTime());
                
        });
    }
    // update (dt) {},
});
