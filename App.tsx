
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, ShotResult, Cannonball, Obstacle } from './types.ts';
import { GAME_WIDTH, GAME_HEIGHT, GROUND_Y, HILL_TOP_X, HILL_TOP_Y, CANNON_LENGTH, INITIAL_VELOCITY, GRAVITY, HIT_TOLERANCE } from './constants.ts';
import * as aiService from './services/aiService.ts';
import GameScene from './components/GameScene.tsx';
import Controls from './components/Controls.tsx';
import Scoreboard from './components/Scoreboard.tsx';
import AICommentaryBox from './components/AICommentaryBox.tsx';

const App: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [angle, setAngle] = useState<number>(45);
  const [predictionX, setPredictionX] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [cannonball, setCannonball] = useState<Cannonball>({ x: 0, y: 0, visible: false });
  const [shotResult, setShotResult] = useState<ShotResult | null>(null);
  const [commentary, setCommentary] = useState<string>('');
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const animationFrameId = useRef<number | null>(null);

  const fetchCommentary = useCallback(async (prompt: string) => {
    setIsAIThinking(true);
    setCommentary('');
    try {
      const stream = aiService.getCommentaryStream(prompt);
      for await (const chunk of stream) {
        setCommentary(prev => prev + chunk);
      }
    } catch (error) {
      console.error("AI commentary error:", error);
      setCommentary("Canny the commentator is taking a quick break...");
    } finally {
      setIsAIThinking(false);
    }
  }, []);

  const generateObstacles = useCallback(() => {
    const newObstacles: Obstacle[] = [];
    const obstacleCount = 3;
    const minGap = 50;
    const validSpawnArea = {
        start: HILL_TOP_X + 150,
        end: GAME_WIDTH - 100,
    };

    let currentX = validSpawnArea.start;

    for (let i = 0; i < obstacleCount; i++) {
        if (currentX > validSpawnArea.end) break;

        const x = currentX + Math.random() * 100;
        const type = Math.random() > 0.5 ? 'rock' : 'bush';
        const width = type === 'rock' ? 40 + Math.random() * 30 : 50 + Math.random() * 40;
        const height = type === 'rock' ? 30 + Math.random() * 20 : 40 + Math.random() * 30;
        
        newObstacles.push({
            id: i,
            x,
            y: GROUND_Y - height,
            width,
            height,
            type,
        });

        currentX = x + width + minGap;
    }
    setObstacles(newObstacles);
  }, []);

  useEffect(() => {
    fetchCommentary("The player is ready to play. Give an opening line of commentary.");
    generateObstacles();
  }, [fetchCommentary, generateObstacles]);

  const resetForNewShot = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    setGameState('ready');
    setCannonball({ x: 0, y: 0, visible: false });
    setShotResult(null);
    setPredictionX(null);
    generateObstacles();
  }, [generateObstacles]);

  useEffect(() => {
    if (gameState === 'result' && shotResult) {
      let prompt = '';
      if (shotResult.hitObstacle) {
        prompt = "Clang! Right into an obstacle. That's a 5 point penalty! Unlucky!";
      } else {
        const distance = Math.abs(shotResult.landX - shotResult.predictionX);
        if (distance <= HIT_TOLERANCE) {
          prompt = "It's a direct hit! The prediction was perfect! Celebrate this amazing shot!";
        } else if (distance < 100) {
          prompt = `The shot missed, but it was very close, only ${Math.round(distance)} units away from the prediction. Comment on this near-miss.`;
        } else {
          prompt = `The shot was a big miss, ${Math.round(distance)} units away from the prediction. Be dramatic about how far off it was.`;
        }
      }
      fetchCommentary(prompt);

      const timer = setTimeout(() => {
        resetForNewShot();
        fetchCommentary("The cannon is reset and ready for another glorious attempt!");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [gameState, shotResult, fetchCommentary, resetForNewShot]);

  const handleFire = () => {
    if (gameState !== 'ready' || predictionX === null) return;

    fetchCommentary(`The player has fired the cannon at an angle of ${angle} degrees! Describe the glorious launch!`);
    setGameState('fired');

    const theta = angle * (Math.PI / 180);
    const cannonMuzzleX = HILL_TOP_X + CANNON_LENGTH * Math.cos(theta);
    const cannonMuzzleY = HILL_TOP_Y - CANNON_LENGTH * Math.sin(theta);

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const t = (currentTime - startTime) / 600; // Slow down time by 50% for dramatic effect
      const newX = cannonMuzzleX + INITIAL_VELOCITY * Math.cos(theta) * t;
      const verticalDisplacement = INITIAL_VELOCITY * Math.sin(theta) * t - 0.5 * GRAVITY * t * t;
      const newY = cannonMuzzleY - verticalDisplacement;

      // Obstacle collision check
      for (const obstacle of obstacles) {
        if (
            newX >= obstacle.x &&
            newX <= obstacle.x + obstacle.width &&
            newY >= obstacle.y &&
            newY <= obstacle.y + obstacle.height
        ) {
            setCannonball({ x: newX, y: newY, visible: true });
            setShotResult({ landX: newX, landY: newY, predictionX, hitObstacle: true });
            setScore(prev => prev - 5); // Hitting an obstacle is a 5 point penalty
            setGameState('result');
            animationFrameId.current = null;
            return;
        }
      }

      if (newY > GROUND_Y) {
        const v0y = INITIAL_VELOCITY * Math.sin(theta);
        const timeToGround = (v0y + Math.sqrt(v0y * v0y + 2 * GRAVITY * (GROUND_Y - cannonMuzzleY))) / GRAVITY;
        const finalX = cannonMuzzleX + INITIAL_VELOCITY * Math.cos(theta) * timeToGround;

        setCannonball({ x: finalX, y: GROUND_Y, visible: true });
        setShotResult({ landX: finalX, predictionX, hitObstacle: false });
        
        const isHit = Math.abs(finalX - predictionX) <= HIT_TOLERANCE;
        setScore(prev => prev + (isHit ? 1 : -1));
        
        setGameState('result');
        animationFrameId.current = null;
        return;
      }

      setCannonball({ x: newX, y: newY, visible: true });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <header className="w-full max-w-5xl mb-4 flex justify-between items-center">
        <h1 className="text-3xl text-yellow-400">Cannonball!</h1>
        <Scoreboard score={score} />
      </header>
      
      <main className="w-full max-w-5xl bg-gray-800 border-4 border-gray-700 rounded-lg shadow-2xl overflow-hidden">
        <GameScene
          angle={angle}
          cannonball={cannonball}
          predictionX={predictionX}
          onPredictionSet={setPredictionX}
          gameState={gameState}
          shotResult={shotResult}
          obstacles={obstacles}
        />
      </main>

      <footer className="w-full max-w-5xl mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controls
          angle={angle}
          onAngleChange={setAngle}
          onFire={handleFire}
          gameState={gameState}
          predictionMade={predictionX !== null}
        />
        <AICommentaryBox commentary={commentary} isThinking={isAIThinking} />
      </footer>
    </div>
  );
};

export default App;
