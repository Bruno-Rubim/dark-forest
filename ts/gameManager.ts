import { canvasManager } from "./canvasManager.js";
import { bindListeners, inputState } from "./input/inputState.js";
import {
  EAST,
  GAMEHEIGHT,
  GAMEWIDTH,
  LEFT,
  NORTH,
  RIGHT,
  SOUTH,
  WEST,
} from "./global.js";
import type { Action } from "./action.js";
import { timerManager } from "./timer/timerManager.js";
import { loadMap, mapMatrix } from "./map/map.js";
import Position from "./gameElements/position.js";
import { Sprite, sprites } from "./sprites.js";
import { gameState } from "./gameState.js";
import { tileSheetPosList } from "./map/textureSheetMapping.js";

// Says if the cursor has changed or if there's an item description to show TO-DO: change this
export default class GameManager {
  cursorChanged = false;
  hoverItemDesc = false;
  mapLoaded = false;

  constructor() {
    bindListeners(canvasManager.canvasElement);
    loadMap().then(() => {
      this.mapLoaded = true;
    });
  }

  /**
   * Routes an action to its handeling function
   * @param action
   * @returns
   */
  handleAction(action: Action | void | null) {
    if (!action) {
      return;
    }
    console.warn("unhandled action", action);
  }

  /**
   * Loops through all timers in game, triggering their functions if ready and handling their actions
   */
  checkTimers() {
    timerManager.queue.forEach((timer) => {
      // Possible action in result of timer reaching goal
      let action: Action | void | null = null;
      if (timer.ticsRemaining <= 0 && !timer.ended) {
        action = timer.reachGoal();
        if (timer.loop) {
          timer.start();
        } else {
          timer.ended = true;
          if (timer.deleteAtEnd) {
            // Deletes timer
            timerManager.deleteTimer(timer);
          }
        }
        this.handleAction(action);
      }
    });
  }

  /**
   * Checks if specific keys are held and
   * @returns
   */
  handleKeyInput() {
    if (inputState.keyboard.Escape == "pressed") {
      inputState.keyboard.Escape = "read";
      return;
    }
    if (inputState.keyboard.w == "pressed") {
      inputState.keyboard.w = "read";
      gameState.player.move("forawrds");
      return;
    }
    if (inputState.keyboard.s == "pressed") {
      inputState.keyboard.s = "read";
      gameState.player.move("backwards");
      return;
    }
    if (inputState.keyboard.a == "pressed") {
      inputState.keyboard.a = "read";
      gameState.player.turn(LEFT);
      return;
    }
    if (inputState.keyboard.d == "pressed") {
      inputState.keyboard.d = "read";
      gameState.player.turn(RIGHT);
      return;
    }
  }

  get tileView() {
    const tiles: { texture: string }[] = [];
    let relPosList: Position[] = [];
    let startingTile: Position;
    switch (gameState.player.facingCard) {
      case NORTH:
        startingTile = gameState.player.pos.subtract(2, 4);
        for (let y = 0; y < 5; y++) {
          relPosList.push(
            new Position(0, y),
            new Position(4, y),
            new Position(1, y),
            new Position(3, y),
            new Position(2, y),
          );
        }
        break;
      case SOUTH:
        startingTile = gameState.player.pos.add(2, 4);
        for (let y = 0; y > -5; y--) {
          relPosList.push(
            new Position(0, y),
            new Position(-4, y),
            new Position(-1, y),
            new Position(-3, y),
            new Position(-2, y),
          );
        }
        break;
      case EAST:
        startingTile = gameState.player.pos.add(4, -2);
        for (let x = 0; x > -5; x--) {
          relPosList.push(
            new Position(x, 0),
            new Position(x, 4),
            new Position(x, 1),
            new Position(x, 3),
            new Position(x, 2),
          );
        }
        break;
      case WEST:
        startingTile = gameState.player.pos.add(-4, -2);
        for (let x = 0; x < 5; x++) {
          relPosList.push(
            new Position(x, 4),
            new Position(x, 0),
            new Position(x, 3),
            new Position(x, 1),
            new Position(x, 2),
          );
        }
        break;
    }
    relPosList.forEach((p) => {
      let texture = "black";
      const col = mapMatrix[startingTile.y + p.y];
      if (col && col[startingTile.x + p.x]) {
        texture = col[startingTile.x + p.x];
      }
      tiles.push({
        texture: texture,
      });
    });
    return tiles;
  }

  renderTileView(tiles: { texture: string }[]) {
    tiles.forEach((tile, i) => {
      let sprite: Sprite | null = null;
      switch (tile.texture) {
        case "black":
          return;
        case "white":
          sprite = sprites.texture_white;
          break;
        case "red":
          sprite = sprites.texture_red;
          break;
        case "blue":
          sprite = sprites.texture_blue;
          break;
        case "green":
          sprite = sprites.texture_green;
          break;
        case "orange":
          sprite = sprites.texture_orange;
          break;
        case "grass":
          sprite = sprites.texture_grass;
          break;
      }
      const sheetPos = tileSheetPosList[i];
      if (!sprite || !sheetPos) {
        return;
      }
      canvasManager.renderSpriteFromSheet(
        sprite,
        new Position(),
        GAMEWIDTH,
        GAMEHEIGHT,
        sheetPos,
        128,
        128,
      );
    });
  }

  /**
   * Checks for actions with current input state and game state and handles them
   */
  updateGame() {
    if (!this.mapLoaded) {
      return;
    }

    this.cursorChanged = false;
    this.hoverItemDesc = false;

    this.checkTimers();

    const actions: Action[] | void = this.handleKeyInput();

    this.handleAction(actions);
  }

  renderGame() {
    canvasManager.clearCanvas();
    if (!this.mapLoaded) {
      return;
    }
    this.renderTileView(this.tileView);
  }
}
