
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
        edboxItemFind : cc.EditBox,

        lblNoti: cc.Label,

        btnCreate : cc.Button,
        btnSave : cc.Button,

        canavasMain : cc.Canvas,
        cameraMain : cc.Camera,

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


        this.isDragging = false;
        this.itemDragingA;
        this.itemDragingB;
        
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        
 
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, () => {
            this.isDragging = false;
            this.itemDragingA = null;
            this.itemDragingB = null;
        }, this);
        


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
            newItem.getComponent("Item_31").slot = i;
            newItem.getComponent("Item_31").inventory_control = this;
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
        
        if(item.quantityItem < 0){
            return;
        }

        this.lblInfoItemName.string =  "Name: " + item.nameItem;
        this.lblInfoItemQuantity.string = "Quantity: " + item.quantityItem;
        this.lblInfoItemType.string = "Type: "+ item.typeItem;
        this.lblInfoItemEff.string = "Effect: "+ item.effect;
        
    },
    
    deleteItem(){
        if(this.selectSlot < 0){
            this.lblNoti.string = "Select item to delete! "
        }
        let newChild = cc.instantiate( this.listItem.itemEmpty);
        newChild.getComponent("Item_31").slot = this.selectSlot;
        newChild.getComponent("Item_31").inventory_control = this;
        let oldChild = this.inventoryView.children[this.selectSlot];

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

        this.edboxItemName.node.active = true;
        this.edboxItemQuantity.node.active = true;
        this.edboxItemType.node.active = true;
        this.edboxItemEff.node.active = true;

        this.edboxItemName.sting = "";
        this.edboxItemQuantity.string = "";
        this.edboxItemType.string = "";
        this.edboxItemEff.string = "";

        this.btnCreate.interactable = false;
        this.btnSave.interactable = true;

        this.edboxItemName.e
    },
    buttonSaveOnClick(){
        console.log("call save")

        let newItem = cc.instantiate( this.listItem.itemEmpty);

        let itemInfo = newItem.getComponent("Item_31");
          
        itemInfo.nameItem = this.edboxItemName.string;
        itemInfo.effect = this.edboxItemEff.string;
        itemInfo.typeItem = this.edboxItemType.string;
        itemInfo.quantityItem = this.edboxItemQuantity.string;
        itemInfo.equipSlot = -1;
        console.log("new item name " + itemInfo.nameItem);
        //itemInfo.slot = data.slot;
        itemInfo.inventory_control = this;
        this.showQuantity(newItem,itemInfo.quantityItem);

        let [oldChild , index] = this.findEmptySlot();
        itemInfo.slot = index;
        console.log("find "+ index)
        if(index >= 0 ){
            this.lblNoti.string = "new Item add to slot: " + index;
            this.swapChild(oldChild , newItem, index);
        }
        


        this.btnCreate.interactable = true;
        this.btnSave.interactable = false;

        this.edboxItemName.node.active = false;
        this.edboxItemQuantity.node.active = false;
        this.edboxItemType.node.active = false;
        this.edboxItemEff.node.active = false;
    },
    findEmptySlot(){
        for (let i = 0; i < this.maxSlot; i++) {
            let childItem = this.inventoryView.children[i];
            console.log("run find " + childItem.getComponent("Item_31").quantityItem );
            if ( childItem.getComponent("Item_31").quantityItem == "-1" ){
                console.log("find out "+ i)
                return [childItem,i];
            }
                
        };
        return [null,-1];
    },
    findItemByName(){
        let nameFind  = this.edboxItemFind.string;
        for (let i = 0; i < this.maxSlot; i++) {
            let childItem = this.inventoryView.children[i];
            console.log("run find " + childItem.getComponent("Item_31").nameItem );
            if ( childItem.getComponent("Item_31").nameItem == nameFind ){
                console.log("find out "+ i)
                this.lblNoti.string = "Item "+ nameFind+" in slot "+i;
                this.onItemSelectClick(i);
                return [childItem,i];
            }
                
        };
        this.lblNoti.string = "Item not found "+ nameFind;
        return [null,-1];
    },

    getNodeUnderDrag(event){
        //let positionMouse =  this.canavasMain.node.convertToNodeSpaceAR(event.getLocation());
        let positionMouse = this.cameraMain.getCameraToWorldPoint(event.getLocation())
        for(let item of this.inventoryView.children ){
            
            let itemBody =  item.getBoundingBoxToWorld();
            console.log("check itemBody"+ itemBody);
            console.log("check position mouse "+ positionMouse);
            if (itemBody.contains(positionMouse)) {
                return item;
            }
        }
        return null;
    },
    onMouseDown(event){
        let itemDraging =  this.getNodeUnderDrag(event);
        if(itemDraging){
            this.isDragging = true; //dragg a item not empty
            this.itemDragingA = itemDraging;
            console.log("drang trueeee trueee " + itemDraging.getComponent("Item_31").slot);
        }
        else{
            this.itemDragingA = null;
            console.log("notthing drag here");
        }
        
    },

    swap2item(itemA, itemB){
        if( !itemA || !itemB)
            return;
        let indexA = itemA.getComponent("Item_31").slot;
        let indexB = itemB.getComponent("Item_31").slot;
        itemA.getComponent("Item_31").slot = indexB;
        itemB.getComponent("Item_31").slot = indexA;

        itemA.setSiblingIndex(indexB);
        itemB.setSiblingIndex(indexA);
    }, 
    onMouseUp(event){
        let itemDraging = this.getNodeUnderDrag(event);
        if(itemDraging && this.isDragging){
            
            this.itemDragingB = itemDraging;
            this.swap2item(this.itemDragingA,this.itemDragingB);
            this.isDragging = false;
            this.itemDragingA = null;
            this.itemDragingB = null;
            console.log("drang trueeee trueee " + itemDraging.getComponent("Item_31").slot);
        }
        else{
            this.itemDragingA = null;
            this.itemDragingB = null;
            his.isDragging = false;
            console.log("notthing drag here");
        }
    },


        
});
