import { canvasManager } from "./canvasManager.js";
import { bindListeners, inputState } from "./input/inputState.js";
import { EAST, GAMEHEIGHT, GAMEWIDTH, LEFT, NORTH, RIGHT, SOUTH, WEST, } from "./global.js";
import { timerManager } from "./timer/timerManager.js";
import { loadMap, mapMatrix } from "./map/map.js";
import Position from "./gameElements/position.js";
import { gameState } from "./gameState.js";
import { sprites } from "./sprites.js";
export default class GameManager {
    mapLoaded = false;
    constructor() {
        bindListeners(canvasManager.canvasElement);
        loadMap().then(() => {
            this.mapLoaded = true;
        });
    }
    interaction() {
        const tilePos = gameState.player.frontCoords;
        const tile = mapMatrix[tilePos.y][tilePos.x];
        const held = gameState.player.holding;
        if ((tile.content && !tile.content?.canBeTaken) ||
            (held && !held.placedOn.includes(tile.type))) {
            return;
        }
        gameState.player.holding = tile.content;
        tile.content = held;
        gameState.player.holding;
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
            gameState.player.move(gameState.player.frontCard);
            return;
        }
        if (inputState.keyboard.s == "pressed") {
            inputState.keyboard.s = "read";
            gameState.player.move(gameState.player.backCard);
            return;
        }
        if (inputState.keyboard.q == "pressed") {
            inputState.keyboard.q = "read";
            gameState.player.move(gameState.player.leftCard);
            return;
        }
        if (inputState.keyboard.e == "pressed") {
            inputState.keyboard.e = "read";
            gameState.player.move(gameState.player.rightCard);
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
        if (inputState.keyboard[" "] == "pressed") {
            inputState.keyboard[" "] = "read";
            this.interaction();
            return;
        }
    }
    get tileView() {
        const ground = [];
        const blocks = [];
        let relPosList = [];
        let startingTile;
        switch (gameState.player.frontCard) {
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
            if (!tile) {
                return;
            }
            if (tile.isGround) {
                ground.push({ tile: tile, id: i });
            }
            else {
                blocks.push({ tile: tile, id: i });
            }
            if (tile.content) {
                blocks.push({ tile: tile.content, id: i });
            }
        });
        return { ground: ground, blocks: blocks };
    }
    renderTiles(tiles) {
        tiles.ground.forEach((x) => {
            x.tile?.render(x.id, gameState.player.facing % 2 == 1);
        });
        canvasManager.renderSprite(sprites.ground_shadow, new Position(), GAMEWIDTH, GAMEHEIGHT);
        tiles.blocks.forEach((x) => {
            x.tile?.render(x.id, gameState.player.facing % 2 == 1);
        });
    }
    renderTileView() {
        this.renderTiles(this.tileView);
    }
    updateGame() {
        if (!this.mapLoaded) {
            return;
        }
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
        gameState.player.holding?.render(25, false);
    }
}
