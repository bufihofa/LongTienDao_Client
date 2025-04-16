import { Scene } from 'phaser';
import Data from './Data';

export class PreloaderNext extends Scene
{
    dbName: string = 'phaser3-example-db';
    dbVersion: number = 1;
    db: IDBDatabase | null = null;
    
    constructor ()
    {
        super('PreloaderNext');
        
    }

    init ()
    {
        const data = Data.getInstance();
        console.log(data);
        this.db = data.db;
        console.log("Preloader Scene initialized");
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }
    saveImageToIndexedDB(key: string) {
        console.log("Saving image to IndexedDB...", key);
        if (!this.db) {
            console.error("Database not initialized.");
            return;
        }
        const transaction = this.db.transaction('images', 'readwrite');
        const store = transaction.objectStore('images');
        const request = store.put({ key: key, value: this.cache.binary.get(key) });
        request.onsuccess = () => {
            console.log("Image saved to IndexedDB successfully!");
        }
        request.onerror = (event) => {
            console.error("Error saving image to IndexedDB:", event);
        }
    }
    loadImageFromIndexedDB(key: string): Promise<any> {
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
    async preload ()
    {
        console.log("Preloading assets...");
        //  Load the assets for the game - Replace with your own assets
        let img = {key: 'card2', path: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/card2.png'};
        console.log("666666666666");
        console.log(await this.loadImageFromIndexedDB(img.key));

        var buffer = new Uint8Array(this.cache.binary.get(img.key));
        var blob = new Blob([buffer], { type: "image/png" });
        var url = window.URL.createObjectURL(blob);
        this.load.image(img.key, url);
        this.load.once('filecomplete-image-card2',  () => {
            window.URL.revokeObjectURL(url);
        }, this);
        this.load.start();
        
    }

    create ()
    {
        console.log("PreloaderNext Scene created");
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        this.add.image(300, 300, 'card');    
        this.add.image(600, 300, 'card2'); 
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        //this.scene.start('MainMenu');
    }
}
