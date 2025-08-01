import Phaser from 'phaser'
import LevelOneScene from './scenes/LevelOneScene'

class PhaserGame {
  constructor(containerId, updateStats) {
    this.updateStats = updateStats
    
    const config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 600,
      parent: containerId,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: [LevelOneScene]
    }

    this.game = new Phaser.Game(config)
    
    // Pass the updateStats function to the scene
    this.game.registry.set('updateStats', updateStats)
  }

  destroy() {
    if (this.game) {
      this.game.destroy(true)
    }
  }
}

export default PhaserGame