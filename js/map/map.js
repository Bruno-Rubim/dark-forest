import { gameState } from "../gameState.js";
import { tileFactory } from "./tile.js";
export const mapMatrix = [];
async function loadMapFromImage(imageSrc, onLoaded) {
    const img = new Image();
    img.src = imageSrc;
    await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
    });
    const canvas = document.getElementById("map-canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    onLoaded(imageData.data, canvas.width, canvas.height);
}
function handleTile(x, y, r, g, b) {
    if (!mapMatrix[y]) {
        mapMatrix[y] = [];
    }
    const colorValue = "" + r + g + b;
    const alt = x % 2 == y % 2;
    mapMatrix[y][x] = tileFactory.createTile(colorValue, alt);
}
export async function loadMap() {
    await loadMapFromImage("./images/map-test.png", (data, width, height) => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                handleTile(x, y, r, g, b);
            }
        }
    });
    gameState.player.pos.update(Math.floor(mapMatrix[0].length / 2), Math.floor(mapMatrix.length / 2));
}
