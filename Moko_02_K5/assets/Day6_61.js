// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.myGetServerTime().then(function(time) {
            //this.xmlHttp = xml;
            console.log(time);
        })
        let xmlHttp;
    },

    myGetServerTime(){
        new Promise ( (resolve, reject) => {   

            new Promise((resolve, reject) => {
                try{
                    //FF, Opera, Safari, Chrome
                    let a = new XMLHttpRequest();
                    resolve (  a);
                }catch (error){
                    reject()
                }
            })
            .catch(function(err) {
                console.log("false 1 ")
                new Promise((resolve, reject) => {
                    //IE
                    try {
                        resolve ( new ActiveXObject('Msxml2.XMLHTTP'));
                    }
                    catch (error){
                        reject();
                    }
                })
                .catch(function(err) {
                    console.log("false 2 ")
                    new Promise((resolve, reject) => {
                        //IE
                        try {
                            resolve ( new ActiveXObject('Microsoft.XMLHTTP'));
                        }
                        catch (error){
                            reject();
                        }
                    })
                    .catch(function(err) {
                        console.log("false 3 ")
                        alert("AJAX not supported");
                    })
                    .then(function(xml) {
                        //this.xmlHttp = xml;
                        console.log("true 3 ")
                    })
    
    
                })
                .then(function(xml) {
                    //this.xmlHttp = xml;
                    console.log("true 2")
                })
    
            })
            .then(function(xml) {
                //this.runGetTime(xml);

    
            });
            
    
            console.log("true 1 "+xml);
            console.log("eee "+xml)
            xml.open('HEAD'
                ,window.location.href.toString(),false);
                xml.setRequestHeader("Content-Type"
                ,
                "text/html");
                xml.send('');
            resolve ( new Date(xml.getResponseHeader("Date")).getTime());
            reject ( " AJAX not supported");



        } )



    },
    test(){
        console.log("1234");
    },

    runGetTime(xmlHttp){
        try {
            console.log("eee "+xmlHttp)
            xmlHttp.open('HEAD'
                ,window.location.href.toString(),false);
                xmlHttp.setRequestHeader("Content-Type"
                ,
                "text/html");
            xmlHttp.send('');
            return new Date(xmlHttp.getResponseHeader("Date")).getTime();
            
            
        } catch (error) {
            console.error('Error fetching server time:', error);
            return null;
        }
    },


    getServerTime(){
        
        try {
        
        }
        catch (err1) {
            //IE
            try {
                xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (err2) {
                try {
                    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                }
                catch (eerr3) {
                    //AJAX not supported, use CPU time.
                    alert("AJAX not supported");
                }
            }
        }
        xmlHttp.open('HEAD'
        ,window.location.href.toString(),false);
        xmlHttp.setRequestHeader("Content-Type"
        ,
        "text/html");
        xmlHttp.send('');
        return new Date(xmlHttp.getResponseHeader("Date")).getTime
        ();
    }
    // update (dt) {},
});
