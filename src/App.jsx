import React, { useState, useEffect, useRef } from 'react'
import GameStats from './components/GameStats'
import PhaserGame from './game/PhaserGame'

function App() {
  const gameRef = useRef(null)
  const [gameStats, setGameStats] = useState({
    score: 0,
    healthscore: 100,
    shieldscore: 5
  })

  useEffect(() => {
    // Initialize Phaser game
    const game = new PhaserGame('game-canvas', setGameStats)
    gameRef.current = game
    
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="game-container">
      <h1>Harry Potter and the Hacked ROM</h1>
      <GameStats stats={gameStats} />
      <div id="game-canvas"></div>
    </div>
  )
}

export default App