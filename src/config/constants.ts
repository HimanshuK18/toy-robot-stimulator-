export interface BoardDimension {
  x: number
  y: number
}

export const BOARD_DIMENSION: BoardDimension = {
  x: 5,
  y: 5
}
export interface RobotPosition {
  XPosition: number
  YPosition: number
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}
