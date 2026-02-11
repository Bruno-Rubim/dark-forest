import Position from "../gameElements/position";

export function tileSheetPosFromRelPos(relPos: Position) {
  let str = "" + relPos.x + relPos.y;
  if (str == "00") {
    return new Position(0, 2);
  }
  if (str == "10") {
    return new Position(1, 2);
  }
  if (str == "20") {
    return new Position(2, 2);
  }
  if (str == "30") {
    return new Position(3, 2);
  }
  if (str == "40") {
    return new Position(4, 2);
  }
  if (str == "01") {
    return new Position(3, 1);
  }
  if (str == "11") {
    return new Position(4, 1);
  }
  if (str == "21") {
    return new Position(5, 1);
  }
  if (str == "31") {
    return new Position(6, 1);
  }
  if (str == "41") {
    return new Position(7, 1);
  }
  if (str == "02") {
    return new Position(6, 0);
  }
  if (str == "12") {
    return new Position(7, 0);
  }
  if (str == "22") {
    return new Position(0, 1);
  }
  if (str == "32") {
    return new Position(1, 1);
  }
  if (str == "42") {
    return new Position(2, 1);
  }
  if (str == "13") {
    return new Position(3, 0);
  }
  if (str == "23") {
    return new Position(4, 0);
  }
  if (str == "33") {
    return new Position(5, 0);
  }
  if (str == "14") {
    return new Position(0, 0);
  }
  if (str == "24") {
    return new Position(1, 0);
  }
  if (str == "34") {
    return new Position(2, 0);
  }
}
