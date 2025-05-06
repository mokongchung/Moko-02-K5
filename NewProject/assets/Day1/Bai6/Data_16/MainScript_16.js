
cc.Class({
    extends: cc.Component,

    properties: {

        lblStart        : cc.Label,
        lblExit         : cc.Label,
        btnStart        : cc.Button,
    
        strExit         : "GoodBye!",
        strStart        : "Game is starting...",

    },


    
    onLoad () {

    },

    start () {

    },

    onBtnStartClick(){
        this.lblStart.string = this.strStart;
    },

    onBtnExitClick(){
        this.lblExit.string = this.strExit;
    }

    // update (dt) {},
});
