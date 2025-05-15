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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        console.log(' start check '  )
        this.checkTime();

    },

    async checkTime(){
        console.log(' start check '  )
        let startTime = await this.getServerTime();
        for (let i = 0 ; i< 10 ; i++){
            console.log(' new check ' +startTime );
            const currentTime = await this.getServerTime();
            const latancy = currentTime - startTime;
            startTime = currentTime ;
            this.lblNoti.string += 'Độ trễ: ' + latancy +"\n";
            console.log('Độ trễ: ' + latancy )

            await this.sleep(2000);
        }
    },



    getLocalTime() {
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
