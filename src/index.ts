// console.log("hello world!");
// import { Systems } from "./entitas/Systems";
// let syss = new Systems;
// syss.initialize();

/**
 * 
 */
console.log("!!! index.ts !!!");

import { Game } from './Game';
import { Context } from './Context';
import { Scene } from './Scene';
import { Map } from './Map';

let running = false;  // 用于控制循环是否运行的标志
let lastTime = 0;     // 上一帧的时间
let game = new Game("Entitas Game", new Context());

// 游戏循环函数
function gameLoop(timestamp: number) {
    if (!running) return;

    // 计算时间差（间隔时间）, 并将其转换为秒
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    game.update(dt);
    requestAnimationFrame(gameLoop);
}

document.body.innerHTML += '<p>Hello, this is a message from main.ts!</p>';

const buttonStart = document.createElement('button');
buttonStart.innerText = 'start game';
buttonStart.addEventListener('click', () => {
    if (!running) {
        running = true;
        lastTime = performance.now(); // 初始化 lastTime
        //启动
        game.start(new Scene("Scene", new Map("Map")));
        requestAnimationFrame(gameLoop);
    }
});
document.body.appendChild(buttonStart);

const buttonStop = document.createElement('button');
buttonStop.innerText = 'stop game';
buttonStop.addEventListener('click', () => {
    if (running) {
        game.stop();
        running = false;
    }
});
document.body.appendChild(buttonStop);




