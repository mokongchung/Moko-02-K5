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
        
        this.lazyMan = this.lazyManNode.getComponent("Bai6_7");

        this.callTest_cau7();

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);


    },

    async callTest_cau7(){
        
        if (this.lazyMan) {
            //lazyMan.eat("rice");
            //lazyMan.mySleep(500);
            //lazyMan.eat("apple");
            this.lazyMan.eat("rice").sleep(5000).eat("apple");

            this.lazyMan.runTasks();
            //await lazyMan.mySleep();

            console.log("Jack has finished sleeping!");
        }
    },

    addMove( direction) {
        // Lấy vị trí hiện tại
        const currentPos = this.lazyManNode.getPosition();
        let newPos = currentPos;
        console.log(direction);
        // Tính toán vị trí mới dựa vào hướng
        this.lazyMan.moveTo(  direction  )
       
    },

    onKeyDown(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                this.addMove( "left");
                break;
            case cc.macro.KEY.right:
                this.addMove("right");
                break;
            case cc.macro.KEY.up:
                this.addMove( "up");
                break;
            case cc.macro.KEY.down:
                this.addMove( "down");
                break;
            case cc.macro.KEY.space:
                this.lazyMan.runTasks();
                break;
        }
    },

    onDestroy() {
        // Hủy đăng ký sự kiện khi node bị destroy
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }



    
});
