import Position from "./gameElements/position";
import { NORTH, type Cardinals } from "./global";

// Holds the current state of the game at any given time
export default class GameState {
  playerPos: Position = new Position();
  facing: Cardinals = NORTH;
}

// const baseState = new GameState();

export const gameState = new GameState();

export function resetGameState() {}
