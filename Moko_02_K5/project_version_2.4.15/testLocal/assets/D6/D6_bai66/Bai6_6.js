// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        listSprite: {
            default: [],
            type: [cc.Sprite]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        url = 'https://fastly.picsum.photos/id/3/5000/3333.jpg?hmac=GDjZ2uNWE3V59PkdDaOzTOuV3tPWWxJSf4fNcxu4S2g';
        this.fetchDataWithTimeout(url , 3000);


    },

    async  fetchDataWithTimeout(url, timeout) {
        const controller = new AbortController();
        const signal = controller.signal;
    
        // Tạo timeout để hủy request nếu quá thời gian
        const timer = setTimeout(() => {
            controller.abort(); 
        }, timeout);
    
        try {
            //const response = await fetch(url, { signal });
            const response = await fetch(url , { signal });
            
      
            if (!response.ok) {
              throw new Error(`Failed to load: ${url}, status: ${response.status}`);
            }
      
            
            const data = await response.blob();
            
            const imageBitmap = await createImageBitmap(data);

            const texture = new cc.Texture2D();
            texture.initWithElement(imageBitmap);
            texture.handleLoadedTexture();
            
            // set sprite
            const spriteFrame = new cc.SpriteFrame(texture);
            this.listSprite[0].spriteFrame = spriteFrame; 
            clearTimeout(timer); 
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
           
    
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error("Request timeout");
            } else {
                throw error;
            }
        }
    },

    // update (dt) {},
});
