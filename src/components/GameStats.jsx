import React from 'react'

const GameStats = ({ stats }) => {
  return (
    <div className="game-stats">
      <div className="stat eggs">
        Dragon Eggs: {stats.score}
      </div>
      <div className="stat shield">
        Shield: {stats.shieldscore}
      </div>
      <div className="stat health">
        Health: {stats.healthscore}
      </div>
    </div>
  )
}

export default GameStats