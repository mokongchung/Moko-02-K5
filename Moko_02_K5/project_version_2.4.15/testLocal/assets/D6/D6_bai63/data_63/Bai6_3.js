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
        const listUrl = [
            'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
            'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4',
            'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ',
            'https://fastly.picsum.photos/id/3/5000/3333.jpg?hmac=GDjZ2uNWE3V59PkdDaOzTOuV3tPWWxJSf4fNcxu4S2g'
          ];

          this.downloadAssets(listUrl);
    },
    async  sleep(timeSleep) {
        return new Promise(resolve => setTimeout(resolve, timeSleep));
    },
      
    async  downloadAssets(urls) {
        for (let i = 0; i < urls.length; i++) {
          const url = urls[i];
          try {
            console.log(`Downloading: ${url}`);
            const response = await fetch(url);
      
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
            this.listSprite[i].spriteFrame = spriteFrame; 
      
            console.log(`Downloaded: ${url}`);
          } catch (err) {
            console.error(`Error loading ${url}:`, err.message);
          }
      
          if (i < urls.length - 1) {
            
            await this.sleep(2000);
          }
        }
      
        console.log("✅ All downloads finished.");
    }
      

    // update (dt) {},
});
