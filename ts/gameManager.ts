import { canvasManager } from "./canvasManager.js";
import { bindListeners, inputState } from "./input/inputState.js";
import { DEV } from "./global.js";
import type { Action } from "./action.js";
import { timerManager } from "./timer/timerManager.js";

// Says if the cursor has changed or if there's an item description to show TO-DO: change this
export default class GameManager {
  cursorChanged = false;
  hoverItemDesc = false;

  constructor() {
    bindListeners(canvasManager.canvasElement);
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

    // Functions avaliable for devs. Check the global.ts
    if (DEV) {
      if (inputState.keyboard.q == "pressed") {
        inputState.keyboard.q = "read";
      }
      if (inputState.keyboard.w == "pressed") {
        inputState.keyboard.w = "read";
      }
    }
  }

  /**
   * Checks for actions with current input state and game state and handles them
   */
  updateGame() {
    this.cursorChanged = false;
    this.hoverItemDesc = false;

    this.checkTimers();

    const actions: Action[] | void = this.handleKeyInput();

    this.handleAction(actions);
  }

  renderGame() {
    canvasManager.clearCanvas();
  }
}
