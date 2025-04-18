import { GameObjects, Scene } from "phaser";
import Data from "./Data";

export class Map extends Scene 
{
    background: GameObjects.Image | null;

    gameData: Data = Data.getInstance();
    w: number = 1920;
    h: number = 1080;
    map: number;

    thisMap: GameObjects.Image;
    constructor ()
    {
        super('Map');
    }
    init(){
        console.log('init Map scene');
        console.log(this.gameData.currentMap);
    }
    preload(){
        console.log('preload Map scene');
    }
    create(){
        
        console.log('create Map scene');
        this.drawBackground();
        this.add.image(this.w/2, this.h/2, 'map_paper').setDisplaySize(this.w, this.h).setAlpha(1);
        this.map = this.gameData.currentMap;

        this.thisMap = this.add.image(this.w/2, this.h/2, `map_${this.map}`).setScale(1.2   );

    }

    drawBackground(){
        this.background = this.add.image(this.w/2, this.h/2, 'map_paper').setDisplaySize(this.w, this.h).setAlpha(1);
        
    }

}