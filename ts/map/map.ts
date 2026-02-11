import { gameState } from "../gameState.js";
import { tileFactory, type Tile } from "./tile.js";

export const mapMatrix: (Tile | null)[][] = [];

async function loadMapFromImage(
  imageSrc: string,
  onLoaded: (pixels: Uint8ClampedArray, width: number, height: number) => void,
) {
  const img = new Image();
  img.src = imageSrc;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
  });

  const canvas = document.getElementById("map-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  onLoaded(imageData.data, canvas.width, canvas.height);
}

function handleTile(x: number, y: number, r: number, g: number, b: number) {
  if (!mapMatrix[y]) {
    mapMatrix[y] = [];
  }

  const pixelValue = "" + r + g + b;

  let tile: Tile | null = null;
  const alt = x % 2 == y % 2;
  switch (pixelValue) {
    case "000":
      // tile = tileDict.black;
      break;
    case "255255255":
      tile = tileFactory.createTile("white", alt);
      break;
    case "2551190":
      tile = tileFactory.createTile("orange", alt);
      break;
    case "0255119":
      tile = tileFactory.createTile("green", alt);
      break;
    case "0119255":
      tile = tileFactory.createTile("blue", alt);
      break;
    case "2550119":
      tile = tileFactory.createTile("red", alt);
      break;
    case "3610936":
      tile = tileFactory.createTile("grass", alt);
      break;
    case "146146146":
      tile = tileFactory.createTile("rock", alt);
      break;
    default:
      console.log(pixelValue);
  }

  mapMatrix[y][x] = tile;
}

export async function loadMap() {
  await loadMapFromImage("./images/map-test.png", (data, width, height) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        const r = data[index]!;
        const g = data[index + 1]!;
        const b = data[index + 2]!;

        handleTile(x, y, r, g, b);
      }
    }
  });
  gameState.player.pos.update(
    Math.floor(mapMatrix[0]!.length / 2),
    Math.floor(mapMatrix.length / 2),
  );
}
