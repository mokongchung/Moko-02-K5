
cc.Class({
    extends: cc.Component,

    properties: { 
        
        lblPower    :cc.Label,
        inputHP     :cc.EditBox,
        inputMP     :cc.EditBox,
        
    },


    
    onLoad () {
        
    },

    start () {
        
    },

    onBtnPowerClick(){
        this.lblPower.string = "Power: "+ ( Number(this.inputHP.string)  *  Number(this.inputMP.string) );
    }

    // update (dt) {},
});
