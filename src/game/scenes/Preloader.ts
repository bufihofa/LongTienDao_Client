import { Scene } from 'phaser';
import Data from './Data';

export class Preloader extends Scene
{
    dbName: string = 'phaser3-example-db';
    dbVersion: number = 1;
    db: IDBDatabase | null = null;
    
    constructor ()
    {
        super('Preloader');
        
    }

    init ()
    {
        const data = Data.getInstance();
        this.db = data.db;
        console.log("----------------------------Preloader Scene initialized");
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
    
    async preload ()
    {
        console.log(0);
        

    }

    create ()
    {
        console.log("Preloader Scene created");
        
        
    }
}
