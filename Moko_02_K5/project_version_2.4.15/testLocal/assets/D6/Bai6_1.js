
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.xmlHttp;
        console.log("1234");
    },

    start () {
        console.log("1111");
        this.test();
        console.log("1222");
        
    },

    async myGetServerTime(){
        
        return new Promise(async (resolve) => {

                

           let xml_2;
            try {
                xml_2 = await new Promise((resolve_1, reject) => {
                    try {
                        //FF, Opera, Safari, Chrome
                        let a = new XMLHttpRequest();
                        resolve_1(a);
                    } catch (error) {
                        reject();
                    }
                });
            } catch (err) {
                console.log("false 1 ");
                new Promise((resolve_2, reject_1) => {
                    //IE
                    try {
                        resolve_2(new ActiveXObject('Msxml2.XMLHTTP'));
                    }
                    catch (error_1) {
                        reject_1();
                    }
                })
                    .catch(function (err_1) {
                        console.log("false 2 ");
                        new Promise((resolve_3, reject_2) => {
                            //IE
                            try {
                                resolve_3(new ActiveXObject('Microsoft.XMLHTTP'));
                            }
                            catch (error_2) {
                                reject_2();
                            }
                        })
                            .catch(function (err_2) {
                                console.log("false 3 ");
                                alert("AJAX not supported");
                            })
                            .then(function (xml) {
                                this.xmlHttp = xml;
                                console.log("true 3 ");
                                resolve(xml);
                            });


                    })
                    .then(function (xml_1) {
                        this.xmlHttp = xml_1;
                        console.log("true 2");
                    });
                const xml_2 = undefined;
            }
            this.xmlHttp = xml_2;
            //this.runGetTime(xml);
            console.log("true 1 " + this.xmlHttp);
            resolve(xml_2);
        });
    },
    async test(){
        console.log("1234");
         await this.myGetServerTime().then((data) => { this.xmlHttp = data});
        console.log("567");
        
        try{
            console.log("eee "+this.xmlHttp)
            this.xmlHttp.open('HEAD'
                ,window.location.href.toString(),false);
                this.xmlHttp.setRequestHeader("Content-Type"
                ,
                "text/html");
            this.xmlHttp.send('');
            console.log(new Date(this.xmlHttp.getResponseHeader("Date")).getTime() )
            //return new Date(this.xmlHttp.getResponseHeader("Date")).getTime();
            
        
        } catch (error) {
            console.error('Error fetching server time:', error);
            return null;
        }
    },


    // update (dt) {},
});