
cc.Class({
    extends: cc.Component,

    properties: {
        enemy   : require("Enemy_D21"),
        player  : require("Player_D21"),

        btnPlayerAtk        : cc.Button,
        btnPlayerSkill      : cc.Button,
        btnPlayerRecovery   : cc.Button,

        lblControl          : cc.Label,



    },

 
    onLoad () {
        this.turnNumber = 1;
    },

    start () {
        this.turnAction();
    },

    checkWinner(){
        if( this.player.isDead )
            return 0; // player lost game
        else if( this.enemy.isDead )
            return 1; //player win game

        return -1;    // game WIP
    },

    turnAction(){
        if(this.turnNumber % 2 == 1){
            // turn player 
            this.btnPlayerAtk.enabled       = true;
            this.btnPlayerSkill.enabled     = true;
            this.btnPlayerRecovery.enabled  = true;
            this.lblControl.string = "Turn player!"
        }
        else{
            //turn enemy 
            this.btnPlayerAtk.enabled       = false;
            this.btnPlayerSkill.enabled     = false;
            this.btnPlayerRecovery.enabled  = false;
            this.lblControl.string = "Turn enemy!"

            
            this.scheduleOnce( ()=> {
                this.enemyAtk()
            }, 1); 
        }
        
    },

    newTurn(){
        switch ( this.checkWinner() ){
            case 1: //player wingame
                this.lblControl.string = "Player winnnnn"
                this.btnPlayerAtk.enabled       = false;
                this.btnPlayerSkill.enabled     = false;
                this.btnPlayerRecovery.enabled  = false;
                return 1;
            case 0: //player lostgame
                this.lblControl.string = "Player lost!!!"
                this.btnPlayerAtk.enabled       = false;
                this.btnPlayerSkill.enabled     = false;
                this.btnPlayerRecovery.enabled  = false;
                return 0;
        }

        // game WIP
        this.turnNumber+=1;
        this.turnAction();

    },

    btnPlayerAtkOnClick(){
        this.enemy.takeDmg( this.player.attack() );
        this.newTurn();
    },

    btnPlayerSkillOnClick(){
        let dmg = this.player.skillAttack();
        if( dmg < 0 ){
            this.lblControl.string = "Can't use skill!!!"
            return

            
        }else{
            this.enemy.takeDmg(dmg);
        }

        this.newTurn();
    },
    btnPlayerRecoveryOnClick(){
        this.player.recoverEnergy();

        this.newTurn()
    },

    enemyAtk(){
        this.player.takeDmg( this.enemy.attack() );

        this.newTurn();
    },
    


    // update (dt) {},
});
