export const GAMEWIDTH = 256;
export const GAMEHEIGHT = 256;

export const RIGHT = "right";
export const LEFT = "left";
export const CENTER = "center";

export const CLICKRIGHT = "right";
export const CLICKLEFT = "left";

export type cursorClick = typeof CLICKRIGHT | typeof CLICKLEFT;

export const NORTH = "north";
export const SOUTH = "south";
export const EAST = "east";
export const WEST = "west";

export type Cardinals = typeof NORTH | typeof SOUTH | typeof EAST | typeof WEST;

export const DEV = localStorage.getItem("is_dev") == "true";
// Run one of the next lines to turn dev settings on or off
// localStorage.setItem("is_dev", "true");
// localStorage.setItem("is_dev", "false");
