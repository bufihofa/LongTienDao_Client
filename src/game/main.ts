import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { PreloaderNext } from './scenes/PreloaderNext';
import { BigMap } from './scenes/BigMap';
import { Map } from './scenes/Map';
import { BaseUI } from './scenes/BaseUI';
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
            width: 192,
            height: 108
        },
    },
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver,
        PreloaderNext,
        BigMap,
        Map,
        BaseUI
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
