import Position from "./gameElements/position.js";
import { EAST, LEFT, NORTH, RIGHT, SOUTH, WEST, } from "./global.js";
import { mapMatrix } from "./map/map.js";
export class Player {
    pos;
    facing = 0;
    holding = null;
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
    get frontCoords() {
        switch (this.frontCard) {
            case NORTH:
                return this.pos.add(0, -1);
            case EAST:
                return this.pos.add(1, 0);
            case SOUTH:
                return this.pos.add(0, 1);
            case WEST:
                return this.pos.add(-1, 0);
        }
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
        let tile;
        switch (dir) {
            case NORTH:
                tile = this.getBlockAdj(NORTH);
                if (tile?.colision != true && tile?.content?.colision != true) {
                    this.pos = this.pos.add(0, -1);
                }
                break;
            case SOUTH:
                tile = this.getBlockAdj(SOUTH);
                if (tile?.colision != true && tile?.content?.colision != true) {
                    this.pos = this.pos.add(0, 1);
                }
                break;
            case EAST:
                tile = this.getBlockAdj(EAST);
                if (tile?.colision != true && tile?.content?.colision != true) {
                    this.pos = this.pos.add(1, 0);
                }
                break;
            case WEST:
                tile = this.getBlockAdj(WEST);
                if (tile?.colision != true && tile?.content?.colision != true) {
                    this.pos = this.pos.add(-1, 0);
                }
                break;
        }
    }
}
