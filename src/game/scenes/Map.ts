import { GameObjects, Scene } from "phaser";
import Data from "./Data";

export class Map extends Scene 
{
    background: GameObjects.Image | null;

    gameData: Data = Data.getInstance();
    w: number = 1920;
    h: number = 1080;
    map: number;
    sfx: Phaser.Sound.BaseSound | null = null;
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
        this.sfx = this.sound.add('bg2_maincity');
        // Enable sound to play when not in active tab
        this.sound.pauseOnBlur = false;
        // Loop sfx
        this.sfx?.play({
            loop: true,
            volume: 0.5
        });
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