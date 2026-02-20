import { canvasManager } from "./canvasManager.js";
import { bindListeners, inputState } from "./input/inputState.js";
import { EAST, GAMEHEIGHT, GAMEWIDTH, LEFT, NORTH, RIGHT, SOUTH, WEST, } from "./global.js";
import { timerManager } from "./timer/timerManager.js";
import Position from "./gameElements/position.js";
import { gameState } from "./gameState.js";
import { sprites } from "./sprites.js";
import { loadMap } from "./map/loadMap.js";
import { overworld, underground } from "./map/maps.js";
import Well from "./tileContent/well.js";
import Trapdoor from "./tileContent/trapdoor.js";
export default class GameManager {
    mapLoaded = false;
    constructor() {
        bindListeners(canvasManager.canvasElement);
        loadMap(overworld, "overworld").then(() => {
            this.mapLoaded = true;
        });
        loadMap(underground, "underground").then(() => { });
        gameState.currentMap = overworld;
    }
    interaction() {
        const tilePos = gameState.player.frontCoords;
        const tile = gameState.currentMap[tilePos.y][tilePos.x];
        const held = gameState.player.holding;
        if (tile.content?.type == "door" && held?.type == "key") {
            gameState.player.holding = null;
            tile.content = null;
            return;
        }
        if (tile.content instanceof Trapdoor) {
            if (held?.type == "key") {
                gameState.player.holding = null;
                gameState.trapdoors[tile.content.id].open = true;
            }
            if (held?.type == "ladder") {
                if (!tile.content.open) {
                    return;
                }
                if (gameState.currentMap == overworld) {
                    gameState.currentMap = underground;
                }
                else {
                    gameState.currentMap = overworld;
                }
                switch (tile.content.facing) {
                    case 0:
                        gameState.player.pos = gameState.player.pos.add(0, 2);
                        break;
                    case 1:
                        gameState.player.pos = gameState.player.pos.add(2, 0);
                        break;
                    case 2:
                        gameState.player.pos = gameState.player.pos.add(0, -2);
                        break;
                    case 3:
                        gameState.player.pos = gameState.player.pos.add(-2, 0);
                        break;
                }
            }
            return;
        }
        if (tile.content instanceof Well) {
            gameState.player.holding = tile.content.interact(held);
            return;
        }
        if ((tile.content && !tile.content?.canBeTaken) ||
            (held && !held.placedOn.includes(tile.type))) {
            return;
        }
        if (tile.type == "dirt_pit" && held?.type == "flower") {
            gameState.currentMap[22][28].content = null;
            gameState.currentMap[23][28].content = null;
            gameState.currentMap[24][28].content = null;
            gameState.currentMap[25][28].content = null;
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
        let movedTile = null;
        if (inputState.keyboard.w == "pressed") {
            inputState.keyboard.w = "read";
            movedTile = gameState.player.move(gameState.player.frontCard, gameState.currentMap);
        }
        if (inputState.keyboard.s == "pressed") {
            inputState.keyboard.s = "read";
            movedTile = gameState.player.move(gameState.player.backCard, gameState.currentMap);
        }
        if (inputState.keyboard.q == "pressed") {
            inputState.keyboard.q = "read";
            movedTile = gameState.player.move(gameState.player.leftCard, gameState.currentMap);
        }
        if (inputState.keyboard.e == "pressed") {
            inputState.keyboard.e = "read";
            movedTile = gameState.player.move(gameState.player.rightCard, gameState.currentMap);
        }
        if (inputState.keyboard.a == "pressed") {
            inputState.keyboard.a = "read";
            gameState.player.turn(LEFT);
        }
        if (inputState.keyboard.d == "pressed") {
            inputState.keyboard.d = "read";
            gameState.player.turn(RIGHT);
        }
        if (inputState.keyboard[" "] == "pressed") {
            inputState.keyboard[" "] = "read";
            this.interaction();
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
            let tile = gameState.currentMap[startingTile.y + p.y]?.[startingTile.x + p.x] ??
                null;
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
