import { sprites, type Sprite } from "../sprites";

export class Tile {
  spriteSheet: Sprite;
  name: string;
  colision: boolean;

  constructor(args: { spriteSheet: Sprite; name: string; colision: boolean }) {
    this.spriteSheet = args.spriteSheet;
    this.name = args.name;
    this.colision = args.colision;
  }
}

export const tileDict = {
  rock: new Tile({
    spriteSheet: sprites.texture_rock,
    name: "rock",
    colision: true,
  }),
  grass: new Tile({
    spriteSheet: sprites.texture_grass,
    name: "grass",
    colision: false,
  }),
  blue: new Tile({
    spriteSheet: sprites.texture_blue,
    name: "blue",
    colision: false,
  }),
  green: new Tile({
    spriteSheet: sprites.texture_green,
    name: "green",
    colision: true,
  }),
  red: new Tile({
    spriteSheet: sprites.texture_red,
    name: "red",
    colision: true,
  }),
  orange: new Tile({
    spriteSheet: sprites.texture_orange,
    name: "orange",
    colision: true,
  }),
  white: new Tile({
    spriteSheet: sprites.texture_white,
    name: "white",
    colision: true,
  }),
};
