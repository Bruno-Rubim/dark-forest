import Position from "./gameElements/position.js";
import { Player } from "./player.js";

// Holds the current state of the game at any given time
export default class GameState {
  player = new Player(new Position());
}

// const baseState = new GameState();

export const gameState = new GameState();

export function resetGameState() {}
