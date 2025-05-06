
cc.Class({
    extends: cc.Component,

    properties: {
        btnAtk          : cc.Button,
        lblHP           : cc.Label,
        lblScore        : cc.Label,
        lblName         : cc.Label,

        name2           : "Name: ",
        HP              : 100,
        score2          : 0,
        valueHPUp       : 1,
        valueScorceUp   : 10,
        
    },


    
    onLoad () {
        this.scoreOld = 0;
    },

    start () {
        this.lblScore.string    = "Score: " + this.score2;
        this.lblHP.string       = "HP: "+ this.HP;
        this.lblName.string     = "Name: "+ this.name2;
    },

    onBtnAtkClick(){
        this.score2++;
        this.lblScore.string = "Score: " + this.score2;
        
        if(this.score2 - this.scoreOld >= this.valueScorceUp){
           this.scoreOld += this.valueScorceUp;
           this.HP       += this.valueHPUp;

           this.lblHP.string = "HP: "+ this.HP;

        }
    }

    // update (dt) {},
});
