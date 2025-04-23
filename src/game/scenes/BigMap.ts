import { GameObjects, Scene } from "phaser";
import Data from "./Data";
import axios from "axios";
import { BaseUI } from "./BaseUI";

export class BigMap extends BaseUI
{
    background: GameObjects.Image | null;
    w: number = 1920;
    h: number = 1080;
    map: GameObjects.Image[] = [];
    
    hoving: number = -1;
    constructor ()
    {
        super('BigMap');
    }
    init(){
        console.log('init BigMap scene');
    }
    preload(){
        console.log('preload BigMap scene');
    }
    create(){
        
        
        
        console.log('create BigMap scene');
        this.background = null;
        this.map = [];
        this.hoving = -1;

        console.log('BigMap scene created');
        this.drawBackground();
        console.log("RENDER2");
        this.drawMap();
        this.drawUI();
        console.log("RENDER3");
    }

    drawBackground(){
        this.background = this.add.image(this.w/2, this.h/2, 'map_paper').setDisplaySize(this.w, this.h).setAlpha(1);
        
    }
    async callAPI(){
        //using axios to fetch https://catfact.ninja/fact
        const reponse = await axios.get('https://catfact.ninja/fact');
        console.log(reponse);
    }
    drawMap(){
        this.map.push(this.add.image(1500, 300, 'map_0').setScale(0.55));
        //this.map.push(this.add.image(960, 500, 'map_1').setScale(0.55).setAlpha(0.4));
        //this.map.push(this.add.image(1450, 800, 'map_2').setScale(0.55).setAlpha(0.4));
        //this.map.push(this.add.image(380, 400, 'map_3').setScale(0.55).setAlpha(0.4));

        this.map[0].setInteractive({ pixelPerfect: true });        
        //this.addHoverEffect(this.map[0], 0, 0.55);
        this.data.set('map2', 32);
        this.map[0].on('pointerdown', async () => {
            console.log("Map clicked ", 0);
            this.gameData.currentMap = 0;
            this.gameData.currentScene = 'Map';
            console.log("OK");
            //await this.callAPI();
            console.log("OK2");
            this.scene.start('Map');
        });
        this.addHoverEffect(this.map[0], 0, 0.55);
        //this.addHoverEffect(this.map[1], 1, 0.55);
        //this.addHoverEffect(this.map[2], 2, 0.55);
        //this.addHoverEffect(this.map[3], 3, 0.55);
        console.log(this.registry.get('map2'));
    }
    
    addHoverEffect(image: GameObjects.Image, mapType: number, baseScale: number) {
        image.setInteractive({ pixelPerfect: true });
        image.setData('baseScale', baseScale);
        


        image.on('pointerover', () => {
            this.tweens.add({
            targets: image,
            scale: baseScale * 1.02, // Slight scale up
            duration: 150,
            ease: 'Sine.easeOut',
            onStart: () => {    
                image.setTint(0xffff33);
                this.hoving = mapType;
            }
            });
        });

        image.on('pointerout', () => {
            this.tweens.add({
                targets: image,
                scale: baseScale, // Return to original scale
                duration: 150,
                ease: 'Sine.easeIn',
                onStart: () => {
                    image.clearTint();
                    this.hoving = -1;
                }
            });
        });
    }
    
}