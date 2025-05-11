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
        point: 0,
        pointMin : 1,
        pointMax : 10,
        HP: 1,
        HPMin :    1,
        HPMax:     5,
        timeLife: 0.5,
        timeLifeMin :  0.3,
        timeLifeMax :  0.8,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.point = this.getRandomInt(this.pointMin, this.pointMax);
        this.HP = this.getRandomInt(this.HPMin, this.HPMax);
        this.timeLife = this.getRandomInt(this.timeLifeMin*10, this.timeLifeMax*10)/10;
        this.isDead = false;
    },

    start () {
        this.scheduleOnce( ()=> {
            if(!this.isDead){
                this.node.destroy()
            }
        }, this.timeLife); 
        
    },

    onEnemyClick(){
        console.log("get hit");
        this.isDead = true;
        //this.node.destroy();
        let event = new cc.Event.EventCustom('hitEnemy', true); // bubbling = true
        event.detail = { node: this.node  , point: this.point };
        this.node.dispatchEvent(event);
    },
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // update (dt) {},
});
