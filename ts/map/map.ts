import { gameState } from "../gameState.js";
import { type Tile } from "../tile/tile.js";
import { tileContentFactory } from "../tile/tileContentFactory.js";
import { tileFactory } from "../tile/tileFactory.js";

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

  const colorValue = "" + r + g + b;

  const alt = x % 2 == y % 2;
  mapMatrix[y][x] = tileFactory.createTile(colorValue, alt);
}

function handleTileContent(
  x: number,
  y: number,
  r: number,
  g: number,
  b: number,
) {
  if (!mapMatrix[y]?.[x]) {
    return;
  }

  const colorValue = "" + r + g + b;

  const alt = x % 2 == y % 2;
  const content = tileContentFactory.createTileContent(colorValue, alt);
  if (content) {
    mapMatrix[y][x].content = content;
  }
}

export async function loadMap() {
  await loadMapFromImage("./images/map.png", (data, width, height) => {
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

export async function loadMapContent() {
  await loadMapFromImage("./images/map_content.png", (data, width, height) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        const r = data[index]!;
        const g = data[index + 1]!;
        const b = data[index + 2]!;

        handleTileContent(x, y, r, g, b);
      }
    }
  });
}
