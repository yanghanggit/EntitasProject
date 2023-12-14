
import { Game } from './Game';
import { Scene } from './Scene';
import { Map } from './Map';

let lastTime = 0;
let requestAnimId = 0;
let game = null;
//
document.body.innerHTML += '<p>Entitas Test</p>';
//
const buttonStart = document.createElement('button');
buttonStart.innerText = 'START';
buttonStart.addEventListener('click', () => {
    if (game !== null) {
        return;
    }
    game = new Game("[My D&D Game]");
    game.startWithScene(new Scene("[First dungon]", new Map("[Goblin's lair]")));

    ///
    lastTime = performance.now();
    function gameLoop(timestamp: number) {
        if (game === null) {
            return;
        }
        const dt = (timestamp - lastTime) / 1000; 
        lastTime = timestamp;
        game.update(dt);
        requestAnimId = requestAnimationFrame(gameLoop);
    }
    requestAnimId = requestAnimationFrame(gameLoop);
});
document.body.appendChild(buttonStart);
//
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




