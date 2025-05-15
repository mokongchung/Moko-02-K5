/*
    1. Quản lý hành vi nhân vật (Character Behavior)
    2. Hành vi của AI
    3. Xây dựng UI động (UI Builder)
    4. Cutscene hoặc hoạt cảnh (Cutscene Scripting)
    5. Xử lý animation sequence
    6. Tạo các lệnh test/gameplay script dễ đọc
    7. Xây dựng hệ thống cấu hình/setting
*/




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
            

            this.lazyMan.runTasks();
            //await lazyMan.mySleep();

            
        }
    },

    addMove( direction) {
        
        //const currentPos = this.lazyManNode.getPosition();
        //let newPos = currentPos;
        console.log(direction);

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
