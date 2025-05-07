
cc.Class({
    extends: cc.Component,

    properties: {
        HP          : 100,
        atkMin      : 10,
        atkMax      : 20,
        defenseMin  : 5,
        defenseMax  : 15,
        isDead      : false, 

        lblEnemyHP  : cc.Label,
        lblEnemyAtk : cc.Label,
        lblEnemyDef : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    onLoad () {
        this.atk = 1;
        this.def = 1;
    },

    start () {

        this.atk = this.getRandomInt( 10,20);
        this.def = this.getRandomInt( 5, 15);
        
        this.lblEnemyHP.string  = "HP: "+this.HP;
        this.lblEnemyAtk.string = "Atk: "+this.atk;
        this.lblEnemyDef.string = "Def: "+this.def;

    },
    attack() {
        
        return this.atk;       
    },

    takeDmg(  atk = 0 ){
        let dmg = atk - this.def;
        console.log( "atk " + atk + "dmg "+ dmg)
        if (dmg <= 0 )
            return;
        this.HP -= dmg;
        console.log( "Hp" + this.HP )
        this.lblEnemyHP.string  = "HP: "+this.HP;
        if( this.HP <= 0 )
            this.isDead = true;
    },


    // update (dt) {},
});
