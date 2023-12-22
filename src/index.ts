
import { Game } from './Game';
import { Scene } from './Scene';
import { Map } from './Map';
import { DeltaTiming } from "./DeltaTiming";

let requestAnimId = 0;
let game: Game | null = null;
let deltaTiming = new DeltaTiming(1000 / 60, 1.0);

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

    //
    function gameLoop(timestamp: number) {
        if (game === null) {
            return;
        }
        const dt = deltaTiming.calculate(false);
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




