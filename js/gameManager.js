import { canvasManager } from "./canvasManager.js";
import { bindListeners, inputState } from "./input/inputState.js";
import { EAST, GAMEHEIGHT, GAMEWIDTH, LEFT, NORTH, RIGHT, SOUTH, WEST, } from "./global.js";
import { timerManager } from "./timer/timerManager.js";
import { loadMap, mapMatrix } from "./map/map.js";
import Position from "./gameElements/position.js";
import { gameState } from "./gameState.js";
import { sprites } from "./sprites.js";
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
    handleAction(action) {
        if (!action) {
            return;
        }
        console.warn("unhandled action", action);
    }
    checkTimers() {
        timerManager.queue.forEach((timer) => {
            let action = null;
            if (timer.ticsRemaining <= 0 && !timer.ended) {
                action = timer.reachGoal();
                if (timer.loop) {
                    timer.start();
                }
                else {
                    timer.ended = true;
                    if (timer.deleteAtEnd) {
                        timerManager.deleteTimer(timer);
                    }
                }
                this.handleAction(action);
            }
        });
    }
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
        const tiles = [];
        let relPosList = [];
        let startingTile;
        switch (gameState.player.facingCard) {
            case NORTH:
                startingTile = gameState.player.pos.subtract(2, 4);
                for (let y = 0; y < 5; y++) {
                    relPosList.push(new Position(0, y), new Position(4, y), new Position(1, y), new Position(3, y), new Position(2, y));
                }
                break;
            case SOUTH:
                startingTile = gameState.player.pos.add(2, 4);
                for (let y = 0; y > -5; y--) {
                    relPosList.push(new Position(0, y), new Position(-4, y), new Position(-1, y), new Position(-3, y), new Position(-2, y));
                }
                break;
            case EAST:
                startingTile = gameState.player.pos.add(4, -2);
                for (let x = 0; x > -5; x--) {
                    relPosList.push(new Position(x, 0), new Position(x, 4), new Position(x, 1), new Position(x, 3), new Position(x, 2));
                }
                break;
            case WEST:
                startingTile = gameState.player.pos.add(-4, -2);
                for (let x = 0; x < 5; x++) {
                    relPosList.push(new Position(x, 4), new Position(x, 0), new Position(x, 3), new Position(x, 1), new Position(x, 2));
                }
                break;
        }
        relPosList.forEach((p, i) => {
            let tile = mapMatrix[startingTile.y + p.y]?.[startingTile.x + p.x] ?? null;
            tiles.push({ tile: tile, id: i });
        });
        const ground = [];
        const blocks = [];
        ground.push(...tiles.filter((x) => !x.tile?.colision));
        blocks.push(...tiles.filter((x) => x.tile?.colision));
        return { ground: ground, blocks: blocks };
    }
    renderTiles(tiles) {
        tiles.forEach((x) => {
            x.tile?.render(x.id, gameState.player.facing % 2 == 1);
        });
    }
    renderTileView() {
        this.renderTiles(this.tileView.ground);
        canvasManager.renderSprite(sprites.ground_shadow, new Position(), GAMEWIDTH, GAMEHEIGHT);
        this.renderTiles(this.tileView.blocks);
    }
    updateGame() {
        if (!this.mapLoaded) {
            return;
        }
        this.cursorChanged = false;
        this.hoverItemDesc = false;
        this.checkTimers();
        const actions = this.handleKeyInput();
        this.handleAction(actions);
    }
    renderGame() {
        canvasManager.clearCanvas();
        if (!this.mapLoaded) {
            return;
        }
        this.renderTileView();
    }
}
