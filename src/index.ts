
import { Game } from './Game';
import { Scene } from './Scene';
import { Map } from './Map';
//import { Bag } from '../lib/entitas/utils/Bag';

// export interface TestInterface<E> {
//     size(): number
// }

// export class TestArrayEX<E> extends Array implements TestInterface<E> {
//     public size_: number = 0
//     constructor(capacity: number) {
//         super();
//         this.length = capacity
//     }
//     add(e: E) {
//         console.log("e = " + e);
//     }

//     size() {
//         return 0;
//     }
// }
// (function () {
//     let testArrayEX = new TestArrayEX(100);
//     testArrayEX.add(1);
// })();











let running = false;  // 用于控制循环是否运行的标志
let lastTime = 0;     // 上一帧的时间
let game = new Game("Entitas Game");

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




