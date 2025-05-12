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


        nameItem: "name item",
        quantityItem: 1,
        typeItem: "consumable",//"consumable" hoặc "equipment"
        effect: "effect", //mô tả (ví dụ: "Hồi 20 máu" hoặc "Tăng 10 sức mạnh")
        equipSlot: -1,
        slot: 0,

        inventory_control : cc.Component,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let clickEvent = new cc.Component.EventHandler();
        clickEvent.target = this.node;               
        clickEvent.component = "Item_31";           
        clickEvent.handler = "onButtonClick";      
        this.node.getComponent(cc.Button).clickEvents.push(clickEvent);
        
    },

    onButtonClick(){
        this.inventory_control.onItemSelectClick(this.slot,this.equipSlot);
    },


    showQuantity(){

        
    }

    // update (dt) {},
});
