
cc.Class({
    extends: cc.Component,

    properties: {

        lblStart        : cc.Label,
        lblExit         : cc.Label,
        nodeBtnStart    : cc.Node,
    
        strExit         : "GoodBye!",
        strStart        : "Game is starting...",

    },


    
    onLoad () {

    },

    start () {
		
		this.lblStart.enabled = false;
		this.lblExit.enabled  = false;
    },

    onBtnStartClick(){
    this.lblStart.string 		    = this.strStart;
		this.nodeBtnStart.active   	= false;
		this.lblStart.enabled  		  = true;
    },

    onBtnExitClick(){
    this.lblExit.string 		    = this.strExit;
		this.nodeBtnStart.active   	= false;
		this.lblExit.enabled  		  = true;
		this.lblStart.enabled 		  = false;
    }

    // update (dt) {},
});
