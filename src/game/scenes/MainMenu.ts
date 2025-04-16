import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    character: GameObjects.Image[] = [];
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;
    w: number = 1920;
    h: number = 1080;

    map: GameObjects.Image[] = [];

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        console.log('MainMenu scene created');
        this.character = [];
        this.logoTween = null;
        this.map = [];
        this.createBackground();
        this.createLogo();
        //this.createTitle();

        EventBus.emit('current-scene-ready', this);
    }

    createBackground()
    {
        this.background = this.add.image(this.w/2, this.h/2, 'background').setDisplaySize(this.w, this.h).setAlpha(0);
        this.add.image(this.w/2, this.h/2, 'map_paper').setDisplaySize(this.w, this.h);
        this.map.push(this.add.image(1500, 300, 'map_1').setScale(0.55));
        this.map.push(this.add.image(960, 500, 'map_2').setScale(0.55).setAlpha(0.4));
        this.map.push(this.add.image(1450, 800, 'map_3').setScale(0.55).setAlpha(0.4));
        this.map.push(this.add.image(380, 400, 'map_4').setScale(0.55).setAlpha(0.4));

        this.map[0].setInteractive({ pixelPerfect: true });
        this.map[0].setData('baseScale', 0.55); // Initialize recoil state
        this.setupLogoInteractions(this.map[0]);
        // Fade in animation
        const fadeInDuration = 1000;
        this.tweens.add({
            targets: this.background,
            alpha: 0.7,
            duration: fadeInDuration,
            ease: 'Linear',
        });
    }

    createLogo()
    {   
        console.log("RENDER");
        // Create characters on the left
        for(let i = 0; i < 5; i++){
            const charX = 200 + 200 * (i % 3);
            const charY = 200 + 400 * Math.floor(i / 3)// Adjust Y positioning
            const char = this.add.image(charX, charY, `agent_${i+1}`).setDepth(100).setScale(0.4);
            char.setInteractive({ pixelPerfect: true });
            this.setupLogoInteractions(char); // Pass the created character
            this.createLogoFloatingEffect(char); // Pass the created character
            this.character.push(char); // Add to the array
        }

        // Create characters on the right
        for(let i = 0; i < 4; i++){
            const charX = 1200 + 300 * (i % 3);
            const charY = 200 + 300 * Math.floor(i / 3) ; // Adjust Y positioning
            const char = this.add.image(charX, charY, `monster_ho_${i}`).setDepth(100).setScale(0.7);
            char.setInteractive({ pixelPerfect: true });
            this.setupLogoInteractions(char); // Pass the created character
            this.createLogoFloatingEffect(char); // Pass the created character
            this.character.push(char); // Add to the array
        }

        // Removed old logo code as characters seem to replace it
        // this.logo = this.add.image(this.w/2, this.h/2, 'character_1_1').setDepth(100).setScale(0.3);
        // this.logo.setInteractive({ pixelPerfect: true });
        // this.setupLogoInteractions(this.logo);
        // this.createLogoFloatingEffect(this.logo); // Assuming you might want the floating effect on the logo too if it existed
    }
    setupLogoInteractions(character: GameObjects.Image)
    {
        character.on('pointerover', () => {
            this.tweens.add({
            targets: character,
            scale: character.getData('baseScale') * 1.05, // Slight scale up
            duration: 150,
            ease: 'Sine.easeOut',
            onStart: () => {
                // Set a white tint to simulate glow
                character.setTint(0xffff33);
                
            }
            });
        });

        character.on('pointerout', () => {
            this.tweens.add({
                targets: character,
                scale: character.getData('baseScale') || 0.55, // Return to original scale
                duration: 150,
                ease: 'Sine.easeIn',
                onStart: () => {
                    // Clear the tint
                    character.clearTint();
                }
            });
        });

        character.on('pointerout', () => {
             // Only scale back if currently scaled up by hover
            this.tweens.add({
                targets: character,
                scale: character.scale / 1.1, // Return to original scale
                duration: 150,
                ease: 'Sine.easeIn'
            });
            
        });

        // Click effect (Recoil)
        character.on('pointerdown', () => {
            this.scene.start('BigMap');
            // Check if already recoiling to prevent overlapping tweens
            if (character.getData('isRecoiling')) {
                return;
            }
            character.setData('isRecoiling', true);
            
            const originalX = character.x;
            const recoilAmount = character.flipX ? 30 : -30; // Adjust recoil distance

            this.tweens.add({
                targets: character,
                x: originalX + recoilAmount,
                duration: 210, // Quick recoil out
                ease: 'Sine.easeIn',
                yoyo: true, // Automatically returns to originalX
                onComplete: () => {
                    character.setData('isRecoiling', false); // Reset recoil flag
                    
                }
            });
        });
    }

    // Modified to accept character and manage its own tween
    createLogoFloatingEffect(character: GameObjects.Image)
    {
        // Store the tween on the character itself using setData
        character.setData('floatTween', this.tweens.add({
            targets: character,
            y: character.y - 15, // Float up
            duration: 1000 + Math.random() * 500, // Randomize duration slightly
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1, // Loop forever
        }));
    }

    createTitle()
    {
        this.title = this.add.text(this.w/2, 950, 'Select Your Character', { // Adjusted Y position
            fontFamily: 'Arial Black',
            fontSize: 60, // Larger font size
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
    }

    changeScene()
    {
        // Stop floating tweens for all characters
        this.character.forEach(char => {
            const floatTween = char.getData('floatTween') as Phaser.Tweens.Tween;
            if (floatTween) {
                floatTween.stop();
            }
        });

        // Stop potential logo tween if it exists
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('Game');
    }

    // This function seems related to a different logo object, keeping it for now
    moveLogo(vueCallback: ({ x, y }: { x: number, y: number }) => void)
    {
        // ... (Keep existing moveLogo code if it's used elsewhere for a specific logo)
        // If this.logo is no longer used, this function might need removal or adaptation
         if (this.logo && this.logoTween) // Check if logo exists
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        }
        else if (this.logo) // Check if logo exists
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (vueCallback && this.logo) // Check if logo exists
                    {
                        vueCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}