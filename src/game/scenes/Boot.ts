import { GameObjects, Scene } from 'phaser';
import Data from './Data';

export class Boot extends Scene
{
    background: GameObjects.Image;
    
    dbName: string = 'phaser3-example-db';
    dbVersion: number = 1;
    count: number = 0;
    db: IDBDatabase | null = null;
    constructor ()
    {
        super('Boot');
    }


    async initIndexedDB(): Promise<void> {
        console.log("Initializing IndexedDB...");
        if (!window.indexedDB) {
            console.log("Your browser doesn't support IndexedDB. Using network loading instead.");
            return;
        }
        const data = Data.getInstance();

        data.db = this.db;
        data.dbName = this.dbName;
        data.dbVersion = this.dbVersion;

        return new Promise<void>((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = (event) => {
                console.error("IndexedDB error:", request.error);
                reject(request.error);
            };
            
            request.onupgradeneeded = (event) => {
                const db = request.result;
                if (!db.objectStoreNames.contains('images')) {
                    db.createObjectStore('images', { keyPath: 'key' });
                }
            };
            
            request.onsuccess = (event) => {
                this.db = request.result;
                data.db = this.db;
                console.log("IndexedDB initialized successfully!");
                resolve();
            };
        });
    }
    
    async saveImageToIndexedDB(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log("Saving image to IndexedDB...", key);
            if (!this.db) {
                console.error("Database not initialized.");
                reject(new Error("Database not initialized."));
                return;
            }
            
            const transaction = this.db.transaction('images', 'readwrite');
            const store = transaction.objectStore('images');
            const request = store.put({ key: key, value: this.cache.binary.get(key) });
            
            request.onsuccess = () => {
                console.log("Image saved to IndexedDB successfully!",  key);
                resolve();
            };
            
            request.onerror = (event) => {
                console.error("Error saving image to IndexedDB:", event);
                reject(event);
            };
        });
    }

    async loadImageFromIndexedDB(key: string): Promise<any> {
        console.log("Loading image from IndexedDB...", key);
        return new Promise((resolve, reject) => {
            if (!this.db) {
                console.error("Database not initialized.");
                reject("Database not initialized");
                return;
            }
            const transaction = this.db.transaction('images', 'readonly');
            const store = transaction.objectStore('images');
            const request = store.get(key);
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = (event) => {
                console.error("Error loading image from IndexedDB:", event);
                reject(event);
            };
        });
    }

        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    async preload ()
    {
        await this.initIndexedDB();





        const images = [
            { key: 'logo', file: 'assets/logo.png' },
            { key: 'star', file: 'assets/star.png' },
            { key: 'background', file: 'assets/bg_menu.png' },
            { key: 'map_paper', file: 'assets/map/paper.png' },
            { key: 'map_0', file: 'assets/map/1.png' },
            { key: 'map_1', file: 'assets/map/2.png' },
            { key: 'map_2', file: 'assets/map/3.png' },
            { key: 'map_3', file: 'assets/map/4.png' },
        ];

        for(let i = 1; i <= 20; i++){
            images.push({ key: `agent_${i}`, file: `assets/agent/${i}.png` });
        }

        const monster = ["lon", "soi", "tho", "ho"];
        for(const mons of monster){
            for(let i = 0; i <= 3; i++){
                images.push({ key: `monster_${mons}_${i}`, file: `assets/monster/${mons}_${i}.png` });
            }
        }

        const building = ["main", "book", "tien", "long"]
        for(const build of building){
            for(let i = 0; i <= 3; i++){
                images.push({ key: `building_${build}_${i}`, file: `assets/building/${build}_${i}.png` });
            }
        }
        for(let i = 1; i <= 100; i++){
            images.push({ key: `item_${i}`, file: `assets/item/Item (${i}).png` });
        }
        //console.log("Images to load", images);
        //let imagesToLoad: any[] = [];
        let maxCount = images.length;
        let count = 0;
        for(const img of images) {
            const savedImage = await this.loadImageFromIndexedDB(img.key);
            if(!savedImage){
                this.load.binary(img.key, img.file, Uint8Array);
                this.load.image(img.key, img.file);

                //imagesToLoad.push(img);

                this.load.on(`filecomplete-binary-${img.key}`,  async () => {
                    await this.saveImageToIndexedDB(img.key);
                    count++;
                    if(count >= maxCount){
                        this.scene.start('MainMenu');
                    }
                });
            }
            else{
                //console.log("Image loaded from IndexedDB", img.key);
                const buffer = new Uint8Array(savedImage.value);
                const blob = new Blob([buffer], { type: "image/png" });
                
                createImageBitmap(blob).then(imageBitmap => {
                    // Create a canvas to draw the imageBitmap
                    const canvas = document.createElement('canvas');
                    canvas.width = imageBitmap.width;
                    canvas.height = imageBitmap.height;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(imageBitmap, 0, 0);
                    }
                    
                    // Use the canvas as the texture source
                    this.textures.addCanvas(img.key, canvas);
                    imageBitmap.close(); // Release the bitmap
                    
                    count++;
                    if(count >= maxCount){
                        this.scene.start('BigMap');
                    }
                });
            }
        }
        this.load.start();
        //console.log("imagesToLoad", imagesToLoad);

        
        
        

        
        //this.scene.start('Preloader');

        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    
    }
    create (){
        
        //console.log('Boot scene created');
         
        //this.scene.start('Preloader');
    }

}
