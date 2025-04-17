import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { PreloaderNext } from './scenes/PreloaderNext';
import { BigMap } from './scenes/BigMap';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    fps: {
        limit: 60
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
        min: {
            width: 960,
            height: 540
        },
        
    },
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver,
        PreloaderNext,
        BigMap
    ]
};
const config2: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    fps: {
        limit: 60
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 1920,
        min: {
            width: 540,
            height: 960
        },
        
    },
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver,
        PreloaderNext,
        BigMap
    ]
};
const StartGame = (parent: string) => {

    // simple mobile detection (UA sniff)
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    console.log('isMobile', isMobile);
    // choose config based on device
    const gameConfig = isMobile ? config2 : config;

    return new Game({ ...gameConfig, parent });
}

export default StartGame;
