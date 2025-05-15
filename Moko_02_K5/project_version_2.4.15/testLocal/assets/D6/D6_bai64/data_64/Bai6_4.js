cc.Class({
    extends: cc.Component,

    properties: {
        lblStoreNoti : cc.Label,
    },

    onLoad() {
        this.dependencies = [];
        this.hasRun = false;
        
    },

    start(){


        const store1 = new Store('store_1', this.lblStoreNoti);
        const store2 = new Store('store_2', this.lblStoreNoti);
        const store3 = new Store('store_3', this.lblStoreNoti);
        const store4 = new Store('store_4', this.lblStoreNoti);
        const store5 = new Store('store_5', this.lblStoreNoti);

        store1.wait(store3);
        store3.wait(store2);
        store2.wait(store5);
        store5.wait(store4);

        this.contribute (3000, store1,store2,store3,store4,store5);
        this.contribute (3000, store1,store2);
        

    },

    async contribute(stepTime, ...stores) {
        for (let store of stores) {
            if (!store.isComplete) {
            await store.runTasks(stepTime); 
            }
        }
    },

});


class Store {
    constructor(nameStore, storeLabel) {
        this.storeLabel = storeLabel;
        this.name = nameStore;
        this.depends = []; 
        this.isDone = false;
      }
    
      wait(store) {
        this.depends.push(store);
      }
    
      async runTasks(timeSleep) {
        for (let item of this.depends) {
          if (!item.isDone) {
            await item.runTasks(timeSleep);
          }
        }
    
        this.storeLabel.string += this.name + ' is done \n';
        await new Promise(
            resolve => setTimeout(resolve, timeSleep )
        );
        this.isDone = true;
      }
}
