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
        listBlocker: {
        default: [],
        type: [cc.Node]
      }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.taskQueue = [],
        this.runing = false;
        this.moving = false;
        this.newForAvoidBlock = false;

        this.controller = new AbortController();
        this.controller.signal;
    },

    start () {

    },

     

    async runTasks() {
        if(this.runing)
          return;
        //console.log("start run");
        this.runing = true;
        while ( this.runing &&(this.taskQueue.length > 0)) {
            //console.log("start run func");
            const task = this.taskQueue[0];  
            try{
                await task();   
            }catch(err){
              console.log("xu ly bi chan");
              this.runing = false;
              return this;
            }
                   

            this.taskQueue.shift();
            //console.log("end run func");     
        }
        this.runing = false;

        return this;
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
      if (this.newForAvoidBlock) {
        console.log( "add first Move to new location " );
          this.taskQueue.unshift(() => {
            return new Promise((resolve , reject) => {
              
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
            console.log(action);
            this.controller.signal.addEventListener('abort', () => {
              console.log("abort");
              this.node.setPosition(currentPos);
              reject(new DOMException('Aborted', 'AbortError'));
            });
              this.moving =true;
              cc.tween(this.node)
                .to(duration, { position: endPos })
                .call(() => {
                    this.moving =false;
                    resolve(); // hoàn tất
                })
                .start();
            });
          });
      }else{
        console.log( "add last Move to new location " );
          this.taskQueue.push(() => {
            return new Promise((resolve , reject) => {
              
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
            console.log(action);
            this.controller.signal.addEventListener('abort', () => {
              console.log("abort");
              this.node.setPosition(currentPos);
              reject(new DOMException('Aborted', 'AbortError'));
            });
              this.moving =true;
              cc.tween(this.node)
                .to(duration, { position: endPos })
                .call(() => {
                    this.moving =false;
                    resolve(); // hoàn tất
                })
                .start();
            });
          });
      }

      
      return this;
    },


  update(dt) {
    if(!this.moving) return;

    
    for (let i = 0; i < this.listBlocker.length; i++) {


      if (this.checkCollision(this.node, this.listBlocker[i])) {
        console.log('Block');
        this.controller.abort();
        this.moving = false;
        this.newForAvoidBlock = true;
        // Dừng tween (nếu cần)
        cc.Tween.stopAllByTarget(this.node);
      }
    }
  },

  checkCollision(nodeA, nodeB) {
    let boxA = nodeA.getBoundingBoxToWorld();
    let boxB = nodeB.getBoundingBoxToWorld();
    return boxA.intersects(boxB);
  },


});

module.exports = lazyMan;

