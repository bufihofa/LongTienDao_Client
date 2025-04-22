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

    cardPick: GameObjects.Image[] = [];
    cardPicked: GameObjects.Image[] = [];

    isDrawing: boolean = false;
    numberPicked: number = 0;
    maxNumberPicked: number = 0;

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
        
        this.isDrawing = false;
        this.numberPicked = 0;
        this.maxNumberPicked = 0;

        console.log('create Map scene');
        this.drawBackground();

       
        this.drawUI();
        this.button = this.add.image(200, 700, 'ui_bando').setDisplaySize(100, 100).setAlpha(1);
        this.button.setInteractive({ pixelPerfect: true });
        this.button.on('pointerdown', async () => {
            this.getCardPick(5);
        });
    }
    drawBackground(){
        this.background = this.add.image(this.w/2, this.h/2, 'map_paper').setDisplaySize(this.w, this.h).setAlpha(1);
    }
    drawMap0(){
        this.thisMap = this.add.image(this.w/2, this.h/2, `map_map_${this.gameData.currentMap}`).setDisplaySize(this.w, this.h).setAlpha(1);
        this.add.text(this.w/2, this.h/2, 'Hello World', { fontFamily: 'Roboto', fontSize: '32px', color: '#ffffff' });
    }
    getCardPick(soluong: number){
        if(this.isDrawing) {
            return;
        }
        this.button.setAlpha(0);

        this.isDrawing = true;
        this.numberPicked = 0;
        this.maxNumberPicked = soluong;

        this.randCard = [0, 0, 1, 1, 2, 3, 4, 5, 6];
        
        this.drawCardPick(soluong);
    }

    private clearAllCards() {
        this.cardPick.forEach(c => c?.destroy());
        this.cardPick = [];
        this.cardPicked.forEach(c => c?.destroy());
        this.cardPicked = new Array<GameObjects.Image>(9);
    }

    private hoverEffect(target: GameObjects.Image, scale: number, duration: number) {
        this.tweens.add({ targets: target, scale, duration, ease: 'Sine.easeOut' });
    }

    private setupCardPickAnimation(card: GameObjects.Image, idx: number, total: number) {
        const x = 1060 + idx * 200 - total * 100;
        this.tweens.add({
            targets: card,
            alpha: 1, x, y: 300, scale: 0.7,
            duration: 120, delay: 100 + 100 * idx, ease: 'Power2',
            onComplete: () => this.enableCardInteraction(card, idx)
        });
    }

    private enableCardInteraction(card: GameObjects.Image, idx: number) {
        card.setInteractive();
        card.on('pointerover',  () => this.hoverEffect(card, 0.75, 250));
        card.on('pointerout',   () => this.hoverEffect(card, 0.7,  350));
        
        card.once('pointerdown', () => this.pickingCard(idx));
    }

    private createPickCard(idx: number, total: number): GameObjects.Image {
        const card = this.add.image(200, 700, 'card_pick')
            .setDisplaySize(100, 150)
            .setAlpha(0);
        this.setupCardPickAnimation(card, idx, total);
        return card;
    }

    drawCardPick(soluong: number) {
        this.clearAllCards();
        for (let i = 0; i < soluong; i++) {
            this.cardPick.push(this.createPickCard(i, soluong));
        }
    }

    pickingCard(id: number){
        if(!this.cardPick[id]) return;


        this.cardPick[id].disableInteractive();

        // fade out
        this.tweens.add({
            targets: this.cardPick[id],
            alpha: 0,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                this.drawCardPicked(this.cardPick[id].x, this.cardPick[id].y, id);
                if(this.cardPick[id]) this.cardPick[id].destroy();
            }
        });

        // shrink slightly
        this.tweens.add({
            targets: this.cardPick[id],
            scale: 0.8,
            duration: 300,
            ease: 'Power2'
        });
    }
    drawCardPicked(x: number, y: number, id: number){
        if(this.textures.exists(`combined_${id}`)){
            this.textures.remove(`combined_${id}`);
        }
        // create a render texture with the card dimensions
        const agent = Math.floor(Math.random() * 40);
        const temp = this.add.renderTexture(0, 0, 200, 300);
        const agentSprite = this.add.image(0, 0, `agent_${agent}`)
            .setOrigin(0)
            .setCrop(175, 0, 290, 400)
            .setScale(0.6, 0.6)
            ;
        temp.draw(agentSprite, -90, 40);
        agentSprite.destroy();

        const cardSprite = this.add.image(0, 0, `card_1`)
            .setOrigin(0)
            .setDisplaySize(200, 300);
        temp.draw(cardSprite, 0, 0);
        cardSprite.destroy();

        temp.saveTexture(`combined_${id}`);
        temp.destroy(); // remove the temporary render texture

        this.cardPicked[id]= this.add.image(x, y, `combined_${id}`).setDisplaySize(200, 300);
    
        this.cardPicked[id].setAlpha(0);
        this.cardPicked[id].setScale(1.2);
        
        this.tweens.add({
            targets: this.cardPicked[id],
            alpha: 1,
            scale: 1,
            duration: 600,
            ease: 'Power3',
            yoyo: false,
            repeat: 0,
            onComplete: () => {
                this.numberPicked++;
                console.log("numberPicked: ", this.numberPicked, "maxNumberPicked: ", this.maxNumberPicked);
                if(this.numberPicked == this.maxNumberPicked){
                    this.isDrawing = false;
                    this.numberPicked = 0;
                    this.maxNumberPicked = 0;
                    this.button.setAlpha(1);
                }
            }
        });

    }
    
}