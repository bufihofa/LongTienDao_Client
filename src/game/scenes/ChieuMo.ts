import { GameObjects, Scene } from "phaser";
import Data from "./Data";
import { BaseUI } from "./BaseUI";

export class ChieuMo extends BaseUI 
{

    gameData: Data = Data.getInstance();
    w: number = 1920;
    h: number = 1080;
    map: number;
    

    thisMap: GameObjects.Image;
    background: GameObjects.Image;

    randCard: number[] = [];
    drawCard: GameObjects.Image[] = [];
    button: GameObjects.Image;
    constructor ()
    {
        super('ChieuMo');
    }
    init(){
        console.log('init ChieuMo scene');
        
    }
    preload(){
        console.log('preload ChieuMo scene');
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

        //if(this.gameData.currentMap == 0){
        //    this.drawMap0();
        //}
        this.drawUI();
        this.button = this.add.image(200, 700, 'ui_bando').setDisplaySize(100, 100).setAlpha(1);
        this.button.setInteractive({ pixelPerfect: true });
        this.button.on('pointerdown', async () => {
            this.drawTestCard();
        });
    }
    drawBackground(){
        this.background = this.add.image(this.w/2, this.h/2, 'map_paper').setDisplaySize(this.w, this.h).setAlpha(1);
    }
    drawMap0(){
        this.thisMap = this.add.image(this.w/2, this.h/2, `map_map_${this.gameData.currentMap}`).setDisplaySize(this.w, this.h).setAlpha(1);
        this.add.text(this.w/2, this.h/2, 'Hello World', { fontFamily: 'Roboto', fontSize: '32px', color: '#ffffff' });
    }
    
    drawTestCard(){
        this.randCard = [2, 1, 1, 2, 4, 6, 3, 2, 5, 1];
        //delete all old card
        for(let i = 0; i < this.drawCard.length; i++){
            this.drawCard[i].destroy();
        }
        this.drawCard = [];
        const randY = Math.floor(300);
        
        



        for(let i = 0; i < 9; i++){
            //remove old combined texture if exists
            if(this.textures.exists(`combined_${i}`)){
                this.textures.remove(`combined_${i}`);
            }
            // create a render texture with the card dimensions
            const agent = Math.floor(Math.random() * 20)+1;
            const temp = this.add.renderTexture(0, 0, 200, 300);
            const agentSprite = this.add.image(0, 0, `agent_${agent}`)
                .setOrigin(0)
                .setCrop(165, 0, 290, 400)
                .setScale(0.6, 0.6)
                
                ;
            temp.draw(agentSprite, -80, 40);
            agentSprite.destroy();

            const cardSprite = this.add.image(0, 0, `card_${this.randCard[i]}`)
                .setOrigin(0)
                .setDisplaySize(200, 300);
            temp.draw(cardSprite, 0, 0);
            cardSprite.destroy();

            temp.saveTexture(`combined_${i}`);
            temp.destroy(); // remove the temporary render texture

            this.drawCard.push(
                this.add
                    .image(150 + i * 200, randY, `combined_${i}`)
                    .setDisplaySize(200, 300)
            );
        }

        //thêm hiệu ứng khi các card xuất hiện lần đầu

        for(let i = 0; i < this.drawCard.length; i++){
            this.drawCard[i].setAlpha(0);
            this.tweens.add({
                targets: this.drawCard[i],
                alpha: 1,
                duration: 500,
                delay: 100,
                ease: 'Power',
                yoyo: false,
                repeat: 0
            });
        }


        

        
        
        
        
        
            
        
        
        
    }
    drawOneCard(){

    }
}