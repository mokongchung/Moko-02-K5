
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.xmlHttp;
    },

    start () {
        this.test();
        
    },

    async myGetServerTime(){
          

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
            
    



        



    },
    async test(){
        console.log("1234");
        await myGetServerTime();
        try{
            console.log("eee "+this.xmlHttp)
            this.xmlHttp.open('HEAD'
                ,window.location.href.toString(),false);
                this.xmlHttp.setRequestHeader("Content-Type"
                ,
                "text/html");
            this.xmlHttp.send('');
            return new Date(this.xmlHttp.getResponseHeader("Date")).getTime();
            
        
        } catch (error) {
            console.error('Error fetching server time:', error);
            return null;
        }
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