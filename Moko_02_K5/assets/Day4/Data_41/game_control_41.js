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

        timePlay : 60,
        timeSpam : 1,
        timeUpdateTimeBar : 0.1,

        camera : cc.Camera,
        listPrefabEnemy : cc.Prefab,
        canvasNode : cc.Canvas,
        nodeBtnStart    : cc.Node,
        lblShowpoint : cc.Label,
        lblShowEndGamePoint : cc.Label,
        proBarTimePlayBar  :cc.ProgressBar,
        
        nodeCrosshair : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.point = 0;
        this.timeLeft = 0;
        this.listEnemy;
        this.stopGame = false;
     },

    start () {
        this.node.on("hitEnemy", this.onEnemyHit, this)
        this.listEnemy =  cc.instantiate(this.listPrefabEnemy).getComponent("listEnemy_41").listEnemy;
        console.log( this.listEnemy  +"  "+this.listEnemy.length);
        //this.spawRandomEnemy();
        //this.startGame(1, 5);
        this.customCrosshair();

       
    },

    spawRandomEnemy(){
        
        let indexEnemy = this.getRandomInt(0 , this.listEnemy.length   -1);
        console.log("index enemy "+ indexEnemy);
        let newSpawEnemy =  cc.instantiate( this.listEnemy[indexEnemy] );
        this.node.addChild(newSpawEnemy);
        console.log( "new Enemy" +newSpawEnemy);

        do{
            let [randomWidth ,randomHeight ] = this.randomPosition();
            console.log( randomWidth +" "+ randomHeight);
            //newSpawEnemy.setPosition(randomWidth, randomHeight);
            newSpawEnemy.setPosition(randomWidth, randomHeight);
        }while(false);

        console.log( "new Enemy spawww" +newSpawEnemy);
    },

    randomPosition(){

       let randomWidth = this.getRandomInt( -1*this.canvasNode.node.width/2 , this.canvasNode.node.width/2);
       let randomHeight = this.getRandomInt( -1*this.canvasNode.node.height/2 , this.canvasNode.node.height/2);


       return [randomWidth , randomHeight]
    },

    checkNodeInCamera( checkNode){
        if (this.camera && this.checkNode && this.camera.containsNode(this.checkNode)) {
            console.log('Node is visible in camera!');
            return true;
        } else {
            console.log('Node is NOT visible in camera!');
            return false;
        }

    },

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    onEnemyHit(event){
        let nodeEnemy = event.detail.node;
        console.log("hit enemy "+ event.detail);
        cc.log(nodeEnemy);
        //nodeEnemy.stopPropagationImmediate();
        this.point += event.detail.point;
        this.lblShowpoint.string = "Point: "+ this.point;
        console.log("point = "+ this.point);
        this.node.removeChild(nodeEnemy);
        nodeEnemy.destroy();

    },
    onDestroy() {
        this.node.off("hitEnemy", this.onCustomEvent, this);
    },

    startGame( timeSpaw = 1, timePlay = 60) {
        console.log("game  start");

        this.point = 0;
        this.timeLeft = timePlay;
        this.lblShowpoint.string = "Point: "+ this.point;
        this.lblShowEndGamePoint.enabled = false;


        this.schedule(this.spawRandomEnemy, timeSpaw); 
        this.schedule(this.updateTimeBar, this.timeUpdateTimeBar);
        this.scheduleOnce(function () {
            this.unschedule(this.spawRandomEnemy); 
            console.log("game over");
            this.nodeBtnStart.active = true;
            this.lblShowEndGamePoint.enabled = true;
            this.lblShowEndGamePoint.string = " Your Point : "+ this.point;
        }, timePlay);
    },

    updateTimeBar(){
        this.timeLeft -= this.timeUpdateTimeBar;
        if(this.timeLeft <= 0)
            this.timeLeft = 0; 
        this.proBarTimePlayBar.progress = (this.timeLeft / this.timePlay);
    },

    customCrosshair(){
        this.canvasNode.node.on(cc.Node.EventType.MOUSE_MOVE, (event) =>{
            let pos = event.getLocation();
            console.log( "custome "+pos +" " + this.nodeCrosshair);
            this.nodeCrosshair.setPosition(this.canvasNode.node.convertToNodeSpaceAR(pos));
        });
    },

    buttonStartGameOnClick(){
        this.nodeBtnStart.active = false;
        this.startGame(this.timeSpam ,this.timePlay);
    },

    // update (dt) {},
});
