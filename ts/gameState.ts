import Position from "./gameElements/position.js";
import { DOWN, UP } from "./global.js";
import { Player } from "./player.js";
import type { Tile } from "./tile/tile.js";
import type { TileContent } from "./tileContent/tileContent.js";
import type Trapdoor from "./tileContent/trapdoor.js";

// Holds the current state of the game at any given time
export default class GameState {
  currentMap!: (Tile | null)[][];
  player = new Player(new Position());
  well: {
    bucket: boolean;
    height: number;
    ready: boolean;
    dir: typeof DOWN | typeof UP;
    holding: TileContent | null;
  } = {
    bucket: false,
    height: 0,
    ready: true,
    dir: DOWN,
    holding: null,
  };
  trapdoors: Record<string, { open: boolean }> = {};
}

// const baseState = new GameState();

export const gameState = new GameState();

export function resetGameState() {}
