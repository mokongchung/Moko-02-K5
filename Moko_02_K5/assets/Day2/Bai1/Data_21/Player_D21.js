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
        HP      : 100,
        atkMin      : 10,
        atkMax      : 20,
        defenseMin  : 5,
        defenseMax  : 15,
        energy  : 50,
        isDead  : false, 

        skillEnergy         : 30,
        skillDmgRate        : 2,
        recoverEnergyValue  : 20,

        lblPlayerHP         : cc.Label,
        lblPlayerAtk        : cc.Label,
        lblPlayerDef        : cc.Label,
        lblPlayerEnergy     : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.atk = 1;
        this.def = 1;
    },

    start () {

        this.atk = this.getRandomInt(this.atkMin, this.atkMax);
        this.def = this.getRandomInt(this.defenseMin, this.defenseMax);
        

        this.lblPlayerHP.string     = "HP: "+this.HP;
        this.lblPlayerAtk.string    = "Atk: "+this.atk;
        this.lblPlayerDef.string    = "Def: "+this.def;
        this.lblPlayerEnergy.string = "Energy:"+this.energy;
    },
    attack() {
        return this.atk;       
    },

    takeDmg( atk = 0 ){
        let dmg = atk - this.def;
        console.log( "atk " + atk + "dmg "+ dmg)
        if (dmg <= 0 )
            return;
        this.HP -= dmg;
        this.lblPlayerHP.string     = "HP: "+this.HP;
        if( this.HP <= 0 )
            this.isDead = true;
    },

    skillAttack(){
        if( this.energy < this.skillEnergy) 
            return -1;

        this.energy -= this.skillEnergy;
        this.lblPlayerEnergy.string = "Energy:"+this.energy;
        return this.atk * this.skillDmgRate;
    },

    recoverEnergy(){
        this.energy += this.recoverEnergyValue;
        this.lblPlayerEnergy.string = "Energy:"+this.energy;
    },

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    // update (dt) {},
});
