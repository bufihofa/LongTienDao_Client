import { GameObjects, Scene } from "phaser";
import Data from "./Data";
import { BaseUI } from "./BaseUI";

export class Map extends BaseUI 
{

    gameData: Data = Data.getInstance();
    w: number = 1920;
    h: number = 1080;
    map: number;
    

    thisMap: GameObjects.Image;
    background: GameObjects.Image;

    
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
        

        //this.background_music = this.sound.add('bg1_login');
        //this.sound.pauseOnBlur = false;
        //this.background_music?.play({
        //    loop: true,
        //    volume: 0.5
        //});
        
        console.log('create Map scene');
        this.drawBackground();

        if(this.gameData.currentMap == 0){
            this.drawMap0();
        }

        this.drawUI();
        
    }
    drawBackground(){
        this.background = this.add.image(this.w/2, this.h/2, 'map_paper').setDisplaySize(this.w, this.h).setAlpha(1);
    }
    drawMap0(){
        this.thisMap = this.add.image(this.w/2, this.h/2, `map_map_${this.gameData.currentMap}`).setDisplaySize(this.w, this.h).setAlpha(1);
        this.add.text(this.w/2, this.h/2, 'Hello World', { fontFamily: 'Roboto', fontSize: '32px', color: '#ffffff' });
    }
    
}