
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        inventoryView: cc.Node,

        lblInfoItemName: cc.Label,
        lblInfoItemQuantity: cc.Label,
        lblInfoItemType: cc.Label,
        lblInfoItemEff: cc.Label,

        lblNoti: cc.Label,

        spriteFrame1: cc.SpriteFrame,
        spriteFrame2: cc.SpriteFrame,
        spriteFrame3: cc.SpriteFrame,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.selectSlot = -1 ;

    },

    start () {

        let itemData = [
            { id: 1, nameItem: "speed point", quantityItem: 4 , typeItem: "consumable", effect: "speed +10", equipSlot: -1, slot: 0},
            { id: 2, nameItem: "atk point", quantityItem: 5 , typeItem: "consumable", effect: "atk +10", equipSlot: -1, slot: 1},
            { id: 3, nameItem: "HP point", quantityItem: 5 , typeItem: "consumable", effect: "HP +10", equipSlot: -1, slot: 2},
            { id: 4, nameItem: "def point", quantityItem: 1 , typeItem: "consumable", effect: "def +10", equipSlot: -1, slot: 3},
            { id: 5, nameItem: "speed point", quantityItem: 4 , typeItem: "consumable", effect: "speed +10", equipSlot: -1, slot: 4},
            { id: 6, nameItem: "atk point", quantityItem: 5 , typeItem: "consumable", effect: "atk +10", equipSlot: -1, slot: 5},
            { id: 7, nameItem: "HP point", quantityItem: 5 , typeItem: "consumable", effect: "HP +10", equipSlot: -1, slot: 6},
            { id: 8, nameItem: "def point", quantityItem: 1 , typeItem: "consumable", effect: "def +10", equipSlot: -1, slot: 7},
            { id: 9, nameItem: "speed point", quantityItem: 4 , typeItem: "consumable", effect: "speed +10", equipSlot: -1, slot: 8},
            { id: 10, nameItem: "atk point", quantityItem: 5 , typeItem: "consumable", effect: "atk +10", equipSlot: -1, slot: 9},
            { id: 11, nameItem: "HP point", quantityItem: 5 , typeItem: "consumable", effect: "HP +10", equipSlot: -1, slot: 10},
            { id: 12, nameItem: "def point", quantityItem: 1 , typeItem: "consumable", effect: "def +10", equipSlot: -1, slot: 11},
            { id: 13, nameItem: "speed point", quantityItem: 4 , typeItem: "consumable", effect: "speed +10", equipSlot: -1, slot: 12},
            { id: 14, nameItem: "atk point", quantityItem: 5 , typeItem: "consumable", effect: "atk +10", equipSlot: -1, slot: 13},
            { id: 15, nameItem: "HP point", quantityItem: 5 , typeItem: "consumable", effect: "HP +10", equipSlot: -1, slot: 14},
            { id: 16, nameItem: "def point", quantityItem: 1 , typeItem: "consumable", effect: "def +10", equipSlot: -1, slot: 15},

            
            
        ];


        
        for ( let data of itemData) {
            let newItem = cc.instantiate(this.itemPrefab);
    

            let itemInfo = newItem.getComponent("Item_31");
            console.log(itemInfo.nameItem)
            itemInfo.nameItem = data.nameItem;
            itemInfo.quantityItem = data.quantityItem;
            itemInfo.typeItem = data.typeItem;
            itemInfo.effect = data.effect;
            itemInfo.equipSlot = data.equipSlot;
            itemInfo.slot = data.slot;
            itemInfo.inventory_control = this;
            console.log(itemInfo.nameItem)

            
                   
            
            //quick add icon item
            let sprite = newItem.getChildByName("sprite_item");
            
            if (sprite) {
                console.log("add icon");
                sprite.spriteFrame = this.spriteFrame2;  
            }
            let button = newItem.getComponent("button");
            if (button) {
                button.pressed = this.spriteFrame1;  
            }
            
            this.inventoryView.addChild(newItem, data.slot); 
        }
        
        
    },


    onItemSelectClick(slot){
        console.log(slot);
        
        this.selectSlot = slot;
        console.log(slot);
        this.showInfoItem();
    },

    showInfoItem(){
        
        let item = this.inventoryView.children[this.selectSlot].getComponent("Item_31");
        
        this.lblInfoItemName.string =  "Name: " + item.nameItem;
        this.lblInfoItemQuantity.string = "Quantity: " + item.quantityItem;
        this.lblInfoItemType.string = "Type: "+ item.typeItem;
        this.lblInfoItemEff.string = "Effect: "+ item.effect;
        
    },
    
    deleteItem(){
        if(this.selectSlot < 0){
            this.lblNoti.string = "Select item to delete! "
        }
        this.inventoryView.removeChild(this.inventoryView.children[this.selectSlot]);
    },

    useItem(){
        if(this.selectSlot < 0){
            this.lblNoti.string = "Select item to use! "
        }

        let item = this.inventoryView.children[this.selectSlot].getComponent("Item_31");
        switch(item.typeItem){
            case "consumable":
                if( item.quantityItem > 2 ){
                    item.quantityItem -=1;
                    this.lblNoti.string = "Use "+ item.nameItem +", quantity left: " + item.quantityItem;
                    this.lblInfoItemQuantity.string = "Quantity: " + item.quantityItem;
                    
                }else{
                    
                    this.lblNoti.string = "Use "+ item.nameItem +", quantity left: 0" ;
                    this.deleteItem();
                }
            break;

            case "equipment":
                this.lblNoti.string = "equip "+ item.nameItem ;

                this.deleteItem();


            break;
        }
    }

    // update (dt) {},
});
