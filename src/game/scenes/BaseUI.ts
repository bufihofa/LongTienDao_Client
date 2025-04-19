import { GameObjects, Scene } from "phaser";
import Data from "./Data";

export class BaseUI extends Scene 
{

    gameData: Data = Data.getInstance();
    w: number = 1920;
    h: number = 1080;

    ui_ink: GameObjects.Image | null = null;
    ui_button: GameObjects.Image[] = [];

    
    init(){
        console.log('init Map scene');
        console.log(this.gameData.currentMap);
    }
    preload(){
        console.log('preload Map scene');
    }
    create(){
        
        
    }
    drawUI(){
        this.ui_button = [];
        //this.drawBackground();
        this.drawPanel();
        console.log("drawUI");
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