import Position from "./gameElements/position.js";
import { DOWN, UP } from "./global.js";
import { Player } from "./player.js";
export default class GameState {
    currentMap;
    player = new Player(new Position());
    well = {
        bucket: false,
        height: 0,
        ready: true,
        dir: DOWN,
        holding: null,
    };
    trapdoors = {};
}
export const gameState = new GameState();
export function resetGameState() { }
