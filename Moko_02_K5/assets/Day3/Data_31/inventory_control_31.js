
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

        spriteFramesArray: {
            default: [],
            type: [cc.SpriteFrame]
        }

    },
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.selectSlot = -1 ;

    },

    start () {

        
        let itemData = [
            { id: 1, nameItem: "speed point", quantityItem: 4 , typeItem: "consumable", effect: "speed +10", equipSlot: -1, slot: 0,sprite:0},
            { id: 2, nameItem: "atk point", quantityItem: 5 , typeItem: "consumable", effect: "atk +10", equipSlot: -1, slot: 1,sprite:1},
            { id: 3, nameItem: "HP point", quantityItem: 5 , typeItem: "consumable", effect: "HP +10", equipSlot: -1, slot: 2,sprite:2},
            { id: 4, nameItem: "swold", quantityItem: 1 , typeItem: "equipment", effect: "ayk +10", equipSlot: -1, slot: 3,sprite:3},
            { id: 5, nameItem: "speed point", quantityItem: 4 , typeItem: "consumable", effect: "speed +10", equipSlot: -1, slot: 4,sprite:1},
            { id: 6, nameItem: "atk point", quantityItem: 5 , typeItem: "consumable", effect: "atk +10", equipSlot: -1, slot: 5,sprite:2},
            { id: 7, nameItem: "HP point", quantityItem: 5 , typeItem: "consumable", effect: "HP +10", equipSlot: -1, slot: 6,sprite:0},
            { id: 8, nameItem: "swold +2", quantityItem: 1 , typeItem: "equipment", effect: "atk +30", equipSlot: -1, slot: 7,sprite:3},
            { id: 9, nameItem: "speed point", quantityItem: 4 , typeItem: "consumable", effect: "speed +10", equipSlot: -1, slot: 8,sprite:0},
            { id: 10, nameItem: "atk point", quantityItem: 5 , typeItem: "consumable", effect: "atk +10", equipSlot: -1, slot: 9,sprite:2},
            { id: 11, nameItem: "HP point", quantityItem: 5 , typeItem: "consumable", effect: "HP +10", equipSlot: -1, slot: 10,sprite:1},
            { id: 12, nameItem: "swold +1", quantityItem: 1 , typeItem: "equipment", effect: "atk +20", equipSlot: -1, slot: 11,sprite:0},
            { id: 13, nameItem: "speed point", quantityItem: 4 , typeItem: "consumable", effect: "speed +10", equipSlot: -1, slot: 12,sprite:1},
            { id: 14, nameItem: "atk point", quantityItem: 5 , typeItem: "consumable", effect: "atk +10", equipSlot: -1, slot: 13,sprite:2},
            { id: 15, nameItem: "HP point", quantityItem: 5 , typeItem: "consumable", effect: "HP +10", equipSlot: -1, slot: 14,sprite:0},
            { id: 16, nameItem: "swold", quantityItem: 1 , typeItem: "equipment", effect: "atk +10", equipSlot: -1, slot: 15,sprite:3},

            
            
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

            
                   
            let spriteNode = newItem.getChildByName("sprite_item");
            let sprite2 = spriteNode.getComponent(cc.Sprite);
            console.log( "sprite2" + sprite2);
            sprite2.spriteFrame = this.spriteFramesArray[data.sprite]; 

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
                if( item.quantityItem >= 2 ){
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
        
});
