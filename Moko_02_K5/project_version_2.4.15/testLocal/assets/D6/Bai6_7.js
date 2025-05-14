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
        this.taskQueue = [],
        this.runing = false;
    },

    start () {

    },

     

    async runTasks() {
        if(this.runing)
          return;
        console.log("start run");
        this.runing = true;
        while (this.taskQueue.length > 0) {
            console.log("start run func");
            const task = this.taskQueue[0];  
            await task();                    
            this.taskQueue.shift();
            console.log("end run func");     
        }
        this.runing = false;
    },

    
    eat(food) {
        this.taskQueue.push(() => {
          return new Promise((resolve) => {
            console.log( this.myName +` Eat ${food}`);
            resolve();
          });
        });
        console.log( "add eay "+ food);
        return this;
    },
    
    sleep(ms) {
        this.taskQueue.push(() => {
          return new Promise((resolve) => {
            console.log(this.myName + ` Sleep for ${ms}ms`);
            setTimeout(resolve, ms);
          });
        });
        console.log( "add sleep "+ ms);
        return this;
    },

    moveTo( action,step = 50, duration = 1) {

      this.taskQueue.push(() => {
        return new Promise((resolve) => {
          
          const currentPos = this.node.getPosition();
          let endPos = currentPos;
          switch (action) {
              case "left":
                  endPos = cc.v2(currentPos.x - step, currentPos.y);
                  break;
              case "right":
                  endPos = cc.v2(currentPos.x + step, currentPos.y);
                  break;
              case "up":
                  endPos = cc.v2(currentPos.x, currentPos.y + step);
                  break;
              case "down":
                  endPos = cc.v2(currentPos.x, currentPos.y - step);
                  break;
              default:
                  
                  return;
          }



          cc.tween(this.node)
            .to(duration, { position: endPos })
            .call(() => {
                resolve(); // hoàn tất
            })
            .start();
        });
      });
      console.log( "add Move to new location " + this.taskQueue);
      return this;
    }





});

module.exports = lazyMan;

