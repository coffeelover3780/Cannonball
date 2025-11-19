
// Scene dimensions
export const GAME_WIDTH = 1000;
export const GAME_HEIGHT = 600;
export const GROUND_Y = 500;

// Hill and Cannon properties
export const HILL_TOP_X = 135; // This is now the cannon's pivot point
export const HILL_TOP_Y = 300;
export const CANNON_LENGTH = 60;
export const CANNON_WIDTH = 20;

// Physics constants
export const INITIAL_VELOCITY = 220; // Tuned for good range
export const GRAVITY = 200; // Scaled for game view, not realistic
export const HIT_TOLERANCE = 15; // Pixel tolerance for a successful hit
