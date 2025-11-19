
export type GameState = 'ready' | 'fired' | 'result';

export interface Cannonball {
  x: number;
  y: number;
  visible: boolean;
}

export interface ShotResult {
  landX: number;
  predictionX: number;
  hitObstacle?: boolean;
  landY?: number;
}

export type ObstacleType = 'rock' | 'bush';

export interface Obstacle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObstacleType;
}
