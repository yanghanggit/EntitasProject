
import { Game } from './Game';
import { Scene } from './Scene';
import { Map } from './Map';

let lastTime = 0;
let game = null;
let requestAnimId = 0;

//
document.body.innerHTML += '<p>Entitas Test</p>';

const buttonStart = document.createElement('button');
buttonStart.innerText = 'START';
buttonStart.addEventListener('click', () => {
    if (game !== null) {
        return;
    }
    game = new Game("Entitas Game");
    game.start(new Scene("Scene", new Map("Map")));

    ///
    lastTime = performance.now(); // 初始化 lastTime
    function gameLoop(timestamp: number) {
        if (game === null) {
            return;
        }
        const dt = (timestamp - lastTime) / 1000; // 计算时间差（间隔时间）, 并将其转换为秒
        lastTime = timestamp;
        game.update(dt);
        requestAnimId = requestAnimationFrame(gameLoop);
    }
    requestAnimId = requestAnimationFrame(gameLoop);
});
document.body.appendChild(buttonStart);

const buttonStop = document.createElement('button');
buttonStop.innerText = 'STOP';
buttonStop.addEventListener('click', () => {
    if (game === null) {
        return;
    }
    game.stop();
    game = null;
    cancelAnimationFrame(requestAnimId);
});
document.body.appendChild(buttonStop);




