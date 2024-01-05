
import { Game } from './Game';
import { Scene } from './Scene';
import { Map } from './Map';
import { MSDeltaTiming } from "./MSDeltaTiming";

/**
 * 
 */
var w: any;
function startWorker() {
    if (typeof (Worker) !== "undefined") {
        if (typeof (w) == "undefined") {
            w = new Worker("demo_workers.js");
        }
        w.onmessage = function (event: any) {
            //document.getElementById("result").innerHTML = event.data;
            console.log("event.data = " + event.data);
        };
    } else {
        console.log("Sorry! No Web Worker support.");
    }
}
function stopWorker() {
    w.terminate();
    w = undefined;
}

/**
 * 
 */
let requestAnimId = 0;
let game: Game | null = null;
const _MSDeltaTiming = new MSDeltaTiming(1000 / 60, 1000);

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
        const dt = _MSDeltaTiming.calculate(false) / 1000;
        game.update(dt);
        requestAnimId = requestAnimationFrame(gameLoop);
    }
    requestAnimId = requestAnimationFrame(gameLoop);

    //
    //startWorker();

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

    //
    //stopWorker();
});
document.body.appendChild(buttonStop);












