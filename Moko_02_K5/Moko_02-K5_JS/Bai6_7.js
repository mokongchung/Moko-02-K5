// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const lazyMan = cc.Class({
    extends: cc.Component,
    properties: {
        myName: "",
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.taskQueue = []
    },

    start () {

    },

     

    async runTasks() {
        for (const task of this.taskQueue) {
            await task();
          }
    },

    
    eat(food) {
        this.taskQueue.push(() => {
          return new Promise((resolve) => {
            console.log( this.myName +` Eat ${food}`);
            resolve();
          });
        });
        return this;
    },
    
    sleep(ms) {
        this.taskQueue.push(() => {
          return new Promise((resolve) => {
            console.log(this.myName + ` Sleep for ${ms}ms`);
            setTimeout(resolve, ms);
          });
        });
        return this;
    }



});

module.exports = lazyMan;

