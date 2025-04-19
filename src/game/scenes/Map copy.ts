import { GameObjects, Scene } from "phaser";
import Data from "./Data";

export class Map2 extends Scene 
{
    background: GameObjects.Image | null;

    gameData: Data = Data.getInstance();
    w: number = 1920;
    h: number = 1080;
    map: number;
    sfx: Phaser.Sound.BaseSound | null = null;
    thisMap: GameObjects.Image;

    ui_ink: GameObjects.Image | null = null;
    ui_button: GameObjects.Image[] = [];

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
        this.ui_button = [];

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

        this.thisMap = this.add.image(this.w/2, this.h/2, `map_map_${this.map}`).setDisplaySize(this.w, this.h).setAlpha(1);

        this.drawPanel();
    }

    drawBackground(){
        this.background = this.add.image(this.w/2, this.h/2, 'map_paper').setDisplaySize(this.w, this.h).setAlpha(1);
    }
    drawPanel(){
        const w = 1050;
        const h = 60;


        this.ui_ink = this.add.image(this.w-w/2.1, this.h-h/1.5, 'ui_ink').setDisplaySize(w, h*1.1).setAlpha(0.7);
        
        const buttons = [
            //0
            'ui_tree',

            //1
            'ui_bando',

            //2
            'ui_chieumo',

            //3
            'ui_congphap',

            //4
            'ui_tuluyen',

            //5
            'ui_tongmon',

            //6
            'ui_sukien',

            //7
            'ui_nhiemvu',

            //8
            'ui_phanthuong',

            //9
            'ui_thanhtich',
            
        ];
        let i = 0;
        for(const button of buttons){
            i++;
            this.ui_button.push(this.add.image(this.w-h*1.5*i, this.h-h/1.3, button).setScale(0.35));
        }
        
        for(const button of this.ui_button){
            button.setInteractive();
            button.on('pointerover', () => {
                this.tweens.add({
                    targets: button,
                    scale: 0.42,
                    duration: 150,
                    ease: 'Sine.easeOut'
                });
            });
            button.on('pointerout', () => {
                this.tweens.add({
                    targets: button,
                    scale: 0.35,
                    duration: 150,
                    ease: 'Sine.easeOut'
                });
            });
        }

    }
}