import { gameState } from "../gameState.js";
import { tileContentFactory } from "../tile/tileContentFactory.js";
import { tileFactory } from "../tile/tileFactory.js";
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
function handleTile(x, y, r, g, b, map) {
    if (!map[y]) {
        map[y] = [];
    }
    const colorValue = "" + r + g + b;
    const alt = x % 2 == y % 2;
    map[y][x] = tileFactory.createTile(colorValue, alt);
}
function handleTileContent(x, y, r, g, b, map) {
    if (!map[y]?.[x]) {
        return;
    }
    const colorValue = "" + r + g + b;
    const alt = x % 2 == y % 2;
    const content = tileContentFactory.createTileContent(colorValue, alt);
    if (content) {
        map[y][x].content = content;
    }
}
export async function loadMapTiles(map, name) {
    await loadMapFromImage("./images/map_" + name + ".png", (data, width, height) => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                handleTile(x, y, r, g, b, map);
            }
        }
    });
    gameState.player.pos.update(Math.floor(map[0].length / 2), Math.floor(map.length / 2));
}
export async function loadMapContent(map, name) {
    await loadMapFromImage("./images/map_" + name + "_content.png", (data, width, height) => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                handleTileContent(x, y, r, g, b, map);
            }
        }
    });
}
export async function loadMap(map, name) {
    await loadMapTiles(map, name);
    await loadMapContent(map, name);
}
