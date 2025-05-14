// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html






cc.Class({
    extends: cc.Component,

    properties: {
        lazyManNode: cc.Node,  // kéo node có Jack component từ Editor vào đây
    },



    start () {
        console.log("create lazt man ");
        this.callTest_cau7();
    },

    async callTest_cau7(){
        let lazyMan = this.lazyManNode.getComponent("Bai6_7");
        if (lazyMan) {
            //lazyMan.eat("rice");
            //lazyMan.mySleep(500);
            //lazyMan.eat("apple");
            lazyMan.eat("rice").sleep(5000).eat("apple");

            lazyMan.runTasks();
            //await lazyMan.mySleep();

            //console.log("Jack has finished sleeping!");
        }
    }
});
