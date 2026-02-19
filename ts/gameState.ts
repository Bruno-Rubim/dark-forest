import Position from "./gameElements/position.js";
import { Player } from "./player.js";
import type { Tile } from "./tile/tile.js";

// Holds the current state of the game at any given time
export default class GameState {
  currentMap!: (Tile | null)[][];
  player = new Player(new Position());
}

// const baseState = new GameState();

export const gameState = new GameState();

export function resetGameState() {}
