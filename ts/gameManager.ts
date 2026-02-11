import { canvasManager } from "./canvasManager.js";
import { bindListeners, inputState } from "./input/inputState.js";
import { GAMEHEIGHT, GAMEWIDTH } from "./global.js";
import type { Action } from "./action.js";
import { timerManager } from "./timer/timerManager.js";
import { loadMap, mapMatrix } from "./map/map.js";
import Position from "./gameElements/position.js";
import { Sprite, sprites } from "./sprites.js";
import { gameState } from "./gameState.js";
import { tileSheetPosFromRelPos } from "./map/textureSheetMapping.js";

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
      gameState.playerPos = gameState.playerPos.add(0, -1);
      return;
    }
    if (inputState.keyboard.a == "pressed") {
      inputState.keyboard.a = "read";
      gameState.playerPos = gameState.playerPos.add(-1, 0);
      return;
    }
    if (inputState.keyboard.s == "pressed") {
      inputState.keyboard.s = "read";
      gameState.playerPos = gameState.playerPos.add(0, 1);
      return;
    }
    if (inputState.keyboard.d == "pressed") {
      inputState.keyboard.d = "read";
      gameState.playerPos = gameState.playerPos.add(1, 0);
      return;
    }
  }

  get tileView() {
    const startingTile = gameState.playerPos.subtract(2, 4);
    const tiles: { relPos: Position; texture: string }[] = [];
    let relPosList: Position[] = [];
    for (let y = 0; y < 5; y++) {
      relPosList.push(
        new Position(0, y),
        new Position(4, y),
        new Position(1, y),
        new Position(3, y),
        new Position(2, y),
      );
    }
    relPosList.forEach((p) => {
      const col = mapMatrix[startingTile.y + p.y];
      if (!col) {
        return;
      }
      const texture = col[startingTile.x + p.x];
      if (!texture) {
        return;
      }
      tiles.push({
        texture: texture,
        relPos: new Position(p.x, p.y),
      });
    });

    return tiles;
  }

  renderTileView(tiles: { relPos: Position; texture: string }[]) {
    tiles.forEach((tile) => {
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
      }
      const sheetPos = tileSheetPosFromRelPos(tile.relPos);
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
