import Position from "./gameElements/position.js";
import { Player } from "./player.js";
export default class GameState {
    currentMap;
    player = new Player(new Position());
}
export const gameState = new GameState();
export function resetGameState() { }
