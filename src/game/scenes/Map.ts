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

    building: GameObjects.Image[] = [];

    pointerText: GameObjects.Text | null = null;
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

        if(this.gameData.currentMap == 0){
            this.drawMap0();
            this.drawBuildingMap0();
        }
        this.drawPointerLocation();
        this.drawUI();
                
    }
    
    drawBackground(){
        this.background = this.add.image(this.w/2, this.h/2, 'map_paper').setDisplaySize(this.w, this.h).setAlpha(1);
    }
    drawMap0(){
        this.thisMap = this.add.image(this.w/2, this.h/2, `map_map_${this.gameData.currentMap}`).setDisplaySize(this.w, this.h).setAlpha(1);
        //this.add.text(this.w/2, this.h/2, 'Hello World', { fontFamily: 'Roboto', fontSize: '32px', color: '#ffffff' });
    }
    drawBuildingMap0(){
        //destroy all building
        this.building.forEach((building) => {
            building.destroy();
        });
        this.building = [];
        this.building.push(this.add.image(380, 290, 'building_map0_0').setScale(0.4));
        this.building.push(this.add.image(1200, 500, 'building_map1_2').setScale(0.4));
        this.building.push(this.add.image(1500, 800, 'building_map3_0').setScale(0.4));
        this.addHoverEffect(this.building[0]);
        this.addHoverEffect(this.building[1]);
        this.addHoverEffect(this.building[2]);
    }
    drawPointerLocation(){
        this.pointerText = this.add.text(100, 100, 'Hello World', { fontFamily: 'Roboto', fontSize: '32px', color: '#ffffff' });  
        this.input.on('pointermove', (pointer: { x: number | undefined; y: number | undefined; }) => {
            this.pointerText?.setText(`X: ${pointer.x}, Y: ${pointer.y}`);
        });
    }
    addHoverEffect(target: GameObjects.Image) {
        // Add tween tint hover effect
        target.setInteractive({ pixelPerfect: true });
        target.on('pointerover', () => {
            target.setTint(0xffff33);
        });
        target.on('pointerout', () => {
            target.clearTint();
        });
    }
}