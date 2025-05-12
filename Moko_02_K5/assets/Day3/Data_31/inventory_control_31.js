
cc.Class({
    extends: cc.Component,
    
    properties: {
        itemPrefab: cc.Prefab,
        itemEmptyPrefab: cc.Prefab,
        inventoryView: cc.Node,

        listItemPrefab: cc.Prefab,

        lblInfoItemName: cc.Label,
        lblInfoItemQuantity: cc.Label,
        lblInfoItemType: cc.Label,
        lblInfoItemEff: cc.Label,

        edboxItemName : cc.EditBox,
        edboxItemQuantity : cc.EditBox,
        edboxItemType : cc.EditBox,
        edboxItemEff : cc.EditBox,

        lblNoti: cc.Label,

        btnCreate : cc.Button,
        btnSave : cc.Button,

        spriteFramesArray: {
            default: [],
            type: [cc.SpriteFrame]
        },

        maxSlot: 20,
    },
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.selectSlot = -1 ;
        this.listItem;

    },

    start () {

        // itemData load form backend
        let itemData = [
            { id: 5, quantityItem: 1, equipSlot: -1, slot: 18 },
            { id: 5, quantityItem: 1, equipSlot: -1, slot: 6 },
            { id: 2, quantityItem: 3, equipSlot: -1, slot: 10 },
            { id: 5, quantityItem: 1, equipSlot: -1, slot: 17 },
            
            { id: 2, quantityItem: 3, equipSlot: -1, slot: 19 },
            { id: 1, quantityItem: 1, equipSlot: -1, slot: 0 },
            { id: 2, quantityItem: 4, equipSlot: -1, slot: 8 },
            { id: 4, quantityItem: 1, equipSlot: -1, slot: 16 },
            { id: 1, quantityItem: 5, equipSlot: -1, slot: 12 },
            { id: 5, quantityItem: 1, equipSlot: -1, slot: 1 },
            { id: 1, quantityItem: 2, equipSlot: -1, slot: 9 },
            { id: 4, quantityItem: 1, equipSlot: -1, slot: 4 },
            { id: 3, quantityItem: 4, equipSlot: -1, slot: 15 },
            { id: 4, quantityItem: 3, equipSlot: -1, slot: 14 },
            { id: 3, quantityItem: 2, equipSlot: -1, slot: 3 }
             

            
            
        ];
        
        this.listItem = cc.instantiate(this.listItemPrefab).getComponent("listItemPrefab_31");

        let newEmpty = cc.instantiate( this.listItem.itemEmpty);
        console.log("test "+ newEmpty);
        
        for (let i = 0; i < this.maxSlot; i++){
            let newItem = cc.instantiate( this.listItem.itemEmpty);
            this.inventoryView.addChild(newItem); 
        }
        
        for ( let data of itemData) {
            let newItem = cc.instantiate(this.listItem.listItemPrefab[data.id -1]);
    

            let itemInfo = newItem.getComponent("Item_31");
            
            itemInfo.quantityItem = data.quantityItem;
            itemInfo.equipSlot = data.equipSlot;
            itemInfo.slot = data.slot;
            itemInfo.inventory_control = this;
            this.showQuantity(newItem,itemInfo.quantityItem);
            
                        
            let oldChild = this.inventoryView.children[data.slot];


            this.swapChild(oldChild , newItem, data.slot);
            //this.inventoryView.setSiblingIndex(data.slot);
            
            //this.inventoryView.addChild(newItem, data.slot); 
        }
        
        
    },

    swapChild( oldChild , newChild, index){
        this.inventoryView.removeChild(oldChild);
        this.inventoryView.insertChild(newChild, index);
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
        let newChild = cc.instantiate( this.listItem.itemEmpty);;
        let oldChild = this.inventoryView.children[this.selectSlot]

        this.swapChild(oldChild , newChild, this.selectSlot);
        //this.inventoryView.removeChild(this.inventoryView.children[this.selectSlot]);
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
                    this.showQuantity(this.inventoryView.children[this.selectSlot], item.quantityItem);
                }else if ( item.quantityItem == 1 ) {
                    
                    this.lblNoti.string = "Use "+ item.nameItem +", quantity left: 0" ;
                    this.deleteItem();
                }
            break;

            case "equipment":
                this.lblNoti.string = "equip "+ item.nameItem ;

                this.deleteItem();


            break;
        }
    },
    showQuantity(item, quantityItem){
        let lblQuantity = item.getComponentInChildren(cc.Label);
        if(quantityItem > 1){
            lblQuantity.string = "x"+quantityItem
        }else{
            lblQuantity.string = "";
        }
    },
    buttonCreateOnClick(){
        this.lblInfoItemName.string =  "Name: " ;
        this.lblInfoItemQuantity.string = "Quantity: " ;
        this.lblInfoItemType.string = "Type: ";
        this.lblInfoItemEff.string = "Effect: ";

        this.btnCreate.interactable = false;
        this.btnSave.interactable = true;
    },
    buttonSaveOnClick(){

    }
        
});
