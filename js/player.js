import { EAST, LEFT, NORTH, RIGHT, SOUTH, WEST, } from "./global.js";
import { mapMatrix } from "./map/map.js";
export class Player {
    pos;
    facing = 0;
    constructor(pos) {
        this.pos = pos;
    }
    get frontCard() {
        return [NORTH, EAST, SOUTH, WEST][this.facing];
    }
    get backCard() {
        return [SOUTH, WEST, NORTH, EAST][this.facing];
    }
    get leftCard() {
        return [WEST, NORTH, EAST, SOUTH][this.facing];
    }
    get rightCard() {
        return [EAST, SOUTH, WEST, NORTH][this.facing];
    }
    getBlockAdj(dir) {
        let tile = null;
        switch (dir) {
            case NORTH:
                tile = mapMatrix[this.pos.y - 1]?.[this.pos.x] ?? null;
                break;
            case SOUTH:
                tile = mapMatrix[this.pos.y + 1]?.[this.pos.x] ?? null;
                break;
            case EAST:
                tile = mapMatrix[this.pos.y]?.[this.pos.x + 1] ?? null;
                break;
            case WEST:
                tile = mapMatrix[this.pos.y]?.[this.pos.x - 1] ?? null;
                break;
        }
        return tile;
    }
    turn(side) {
        this.facing += side == RIGHT ? 1 : -1;
        if (this.facing < 0) {
            this.facing = 3;
        }
        else if (this.facing > 3) {
            this.facing = 0;
        }
    }
    move(dir) {
        switch (dir) {
            case NORTH:
                if (this.getBlockAdj(NORTH)?.colision != true) {
                    this.pos = this.pos.add(0, -1);
                }
                break;
            case SOUTH:
                if (this.getBlockAdj(SOUTH)?.colision != true) {
                    this.pos = this.pos.add(0, 1);
                }
                break;
            case EAST:
                if (this.getBlockAdj(EAST)?.colision != true) {
                    this.pos = this.pos.add(1, 0);
                }
                break;
            case WEST:
                if (this.getBlockAdj(WEST)?.colision != true) {
                    this.pos = this.pos.add(-1, 0);
                }
                break;
        }
    }
}
