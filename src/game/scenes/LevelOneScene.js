import Phaser from 'phaser'

class LevelOneScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelOneScene' })
    
    // Game objects
    this.player = null
    this.voldy = null
    this.platforms = null
    this.cursors = null
    this.goldeneggs = null
    this.brooms = null
    this.portkeys = null
    this.dementors_one = null
    this.dementors_two = null
    
    // Spells
    this.patronus = null
    this.expelliarmus = null
    this.avadakedavra = null
    this.protegos = null
    this.enemyshields = null
    this.explosions = null
    
    // Keys
    this.protegoKey = null
    this.expectopatronusKey = null
    this.expelliarmusKey = null
    
    // Timers
    this.spellTime = 0
    this.firingTimer = 0
    this.isShieldDisable = true
    this.isEnemyArmed = true
    
    // Scores
    this.gameStats = {
      score: 0,
      healthscore: 100,
      shieldscore: 5
    }
    
    this.enemyscore = {
      enemyshieldscore: 5,
      enemylifescore: 100
    }
  }

  preload() {
    // Load all game assets
    this.load.image('sky', '/assets/space.png')
    this.load.image('ground', '/assets/platform.png')
    this.load.image('goldenegg', '/assets/egg_chineseFireball.png')
    this.load.image('portkey', '/assets/goldensnitch.png')
    this.load.image('broom', '/assets/broom.png')
    this.load.image('dementor', '/assets/dementor-right.png')
    this.load.image('patronus', '/assets/spells/patronus.png')
    this.load.image('expelliarmus', '/assets/spells/expelliarmus.png')
    this.load.image('sectumsempra', '/assets/spells/sectumsempra.png')
    this.load.image('avadakedavra', '/assets/spells/avadakedavra.png')
    this.load.image('protego', '/assets/spells/protego.png')
    this.load.image('enemyshield', '/assets/spells/enemyshield.png')
    this.load.image('voldy', '/assets/characters/voldemort.png')
    this.load.spritesheet('harry', '/assets/characters/harry_potter.png', {
      frameWidth: 32,
      frameHeight: 48
    })
    this.load.spritesheet('kaboom', '/assets/explode.png', {
      frameWidth: 128,
      frameHeight: 128
    })
  }

  create() {
    // Background
    this.add.image(0, 0, 'sky').setOrigin(0, 0)
    
    // Create platforms
    this.createPlatforms()
    
    // Create game objects
    this.createPlayer()
    this.createEnemies()
    this.createCollectibles()
    this.createSpells()
    this.createExplosions()
    
    // Setup controls
    this.setupControls()
    
    // Setup physics collisions
    this.setupCollisions()
    
    // Get the updateStats function from registry
    this.updateStats = this.registry.get('updateStats')
    this.updateGameStats()
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup()
    
    // Ground
    const ground = this.platforms.create(0, this.sys.game.config.height - 64, 'ground')
    ground.setScale(4, 4).refreshBody()
    
    // Ledges
    this.platforms.create(400, 400, 'ground').setAlpha(0)
    this.platforms.create(-150, 250, 'ground')
    this.platforms.create(100, 300, 'ground')
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'harry')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)
    
    // Player animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('harry', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
    
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'harry', frame: 8 }],
      frameRate: 20
    })
    
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('harry', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })
  }

  createEnemies() {
    // Voldemort
    this.voldy = this.physics.add.sprite(800, 450, 'voldy')
    this.voldy.setBounce(0.2)
    this.voldy.setCollideWorldBounds(true)
    
    // Dementors
    this.dementors_one = this.physics.add.sprite(250, 150, 'dementor')
    this.dementors_one.setBounce(0.2)
    this.dementors_one.setCollideWorldBounds(true)
    
    this.dementors_two = this.physics.add.sprite(100, 350, 'dementor')
    this.dementors_two.setBounce(0.2)
    this.dementors_two.setCollideWorldBounds(true)
  }

  createCollectibles() {
    // Golden eggs
    this.goldeneggs = this.physics.add.group({
      key: 'goldenegg',
      repeat: 4,
      setXY: { x: 12, y: 0, stepX: 150 }
    })
    
    this.goldeneggs.children.entries.forEach(child => {
      child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3))
    })
    
    // Brooms
    this.brooms = this.physics.add.group()
    const broom = this.brooms.create(400, 150, 'broom')
    broom.setBounce(0.2)
    
    // Portkeys
    this.portkeys = this.physics.add.group()
    const portkey = this.portkeys.create(this.sys.game.config.width - 50, this.sys.game.config.height - 120, 'portkey')
    portkey.body.setImmovable(true)
    portkey.setAlpha(0)
  }

  createSpells() {
    // Player spells
    this.patronus = this.physics.add.group({
      defaultKey: 'patronus',
      maxSize: 10
    })
    
    this.expelliarmus = this.physics.add.group({
      defaultKey: 'expelliarmus',
      maxSize: 10
    })
    
    // Enemy spells
    this.avadakedavra = this.physics.add.group({
      defaultKey: 'avadakedavra',
      maxSize: 10
    })
    
    // Shields
    this.protegos = this.physics.add.group({
      defaultKey: 'protego',
      maxSize: 5
    })
    
    this.enemyshields = this.physics.add.group({
      defaultKey: 'enemyshield',
      maxSize: 5
    })
  }

  createExplosions() {
    this.explosions = this.physics.add.group({
      defaultKey: 'kaboom',
      maxSize: 30
    })
    
    // Create explosion animation
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('kaboom'),
      frameRate: 30,
      hideOnComplete: true
    })
  }

  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.protegoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.expectopatronusKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    this.expelliarmusKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
  }

  setupCollisions() {
    // Platform collisions
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.voldy, this.platforms)
    this.physics.add.collider(this.goldeneggs, this.platforms)
    this.physics.add.collider(this.brooms, this.platforms)
    this.physics.add.collider(this.dementors_one, this.platforms)
    this.physics.add.collider(this.dementors_two, this.platforms)
    
    // Collectible overlaps
    this.physics.add.overlap(this.player, this.goldeneggs, this.collectGoldenEgg, null, this)
    this.physics.add.overlap(this.player, this.brooms, this.collectBroomstick, null, this)
    this.physics.add.overlap(this.player, this.portkeys, this.getPortkey, null, this)
    
    // Combat overlaps
    this.physics.add.overlap(this.player, this.dementors_one, this.hitDementor, null, this)
    this.physics.add.overlap(this.player, this.dementors_two, this.hitDementor, null, this)
    this.physics.add.overlap(this.player, this.avadakedavra, this.avadakedavraHitsHarry, null, this)
    
    // Spell interactions
    this.physics.add.overlap(this.patronus, this.dementors_one, this.patronusHitsDementors, null, this)
    this.physics.add.overlap(this.patronus, this.dementors_two, this.patronusHitsDementors, null, this)
    this.physics.add.overlap(this.patronus, this.avadakedavra, this.spellCollision, null, this)
    this.physics.add.overlap(this.expelliarmus, this.avadakedavra, this.spellCollision, null, this)
    this.physics.add.overlap(this.expelliarmus, this.voldy, this.disarmVoldy, null, this)
    
    // Shield interactions
    this.physics.add.collider(this.protegos, this.avadakedavra, this.protegoShieldsAvadaKedavra, null, this)
    this.physics.add.collider(this.enemyshields, this.expelliarmus, this.enemyShieldsHit, null, this)
  }

  update() {
    // Player movement
    this.handlePlayerMovement()
    
    // Spell casting
    this.handleSpellCasting()
    
    // Enemy AI
    this.handleEnemyAI()
  }

  handlePlayerMovement() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn')
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }

  handleSpellCasting() {
    if (this.protegoKey.isDown && this.gameStats.shieldscore > 0) {
      this.castProtego()
    }

    if (this.expectopatronusKey.isDown) {
      this.castPatronus()
    }

    if (this.expelliarmusKey.isDown) {
      this.castExpelliarmus()
    }
  }

  handleEnemyAI() {
    if (this.time.now > this.firingTimer && this.isEnemyArmed) {
      this.enemyFires()
    }

    if (this.isShieldDisable) {
      this.enemyShield()
    }
  }

  // Spell casting methods
  castProtego() {
    if (this.time.now > this.spellTime) {
      const protego = this.protegos.get(this.player.x, this.player.y - 50, 'protego')
      if (protego) {
        protego.setActive(true).setVisible(true)
        protego.body.setImmovable(true)
        this.spellTime = this.time.now + 400
      }
    }
  }

  castPatronus() {
    if (this.time.now > this.spellTime) {
      const patronus = this.patronus.get(this.player.x, this.player.y + 8, 'patronus')
      if (patronus) {
        patronus.setActive(true).setVisible(true)
        patronus.setVelocityX(400)
        this.spellTime = this.time.now + 400
      }
    }
  }

  castExpelliarmus() {
    if (this.time.now > this.spellTime) {
      const expelliarmus = this.expelliarmus.get(this.player.x, this.player.y + 8, 'expelliarmus')
      if (expelliarmus) {
        expelliarmus.setActive(true).setVisible(true)
        expelliarmus.setVelocityX(400)
        this.spellTime = this.time.now + 600
      }
    }
  }

  enemyFires() {
    const avadakedavra = this.avadakedavra.get(this.voldy.x, this.voldy.y, 'avadakedavra')
    if (avadakedavra) {
      avadakedavra.setActive(true).setVisible(true)
      this.physics.moveToObject(avadakedavra, this.player, 120)
      this.firingTimer = this.time.now + 2000
    }
  }

  enemyShield() {
    this.enemyscore.enemyshieldscore = 5
    this.isShieldDisable = false
    const enemyshield = this.enemyshields.get(this.voldy.x - 50, this.voldy.y - 50, 'enemyshield')
    if (enemyshield) {
      enemyshield.setActive(true).setVisible(true)
      enemyshield.body.setImmovable(true)
    }
  }

  // Collision handlers
  collectGoldenEgg(player, goldenegg) {
    goldenegg.disableBody(true, true)
    this.gameStats.score += 1
    this.updateGameStats()
    
    if (this.gameStats.score >= 5) {
      this.portkeys.children.entries.forEach(portkey => {
        portkey.setAlpha(1)
      })
    }
  }

  collectBroomstick(player, broom) {
    broom.disableBody(true, true)
    this.gameStats.healthscore += 10
    if (this.gameStats.healthscore > 100) this.gameStats.healthscore = 100
    this.updateGameStats()
  }

  getPortkey(player, portkey) {
    if (this.gameStats.score >= 5) {
      portkey.disableBody(true, true)
      // Level complete logic here
      console.log('Level Complete!')
    }
  }

  hitDementor(player, dementor) {
    if (this.time.now > this.spellTime) {
      this.gameStats.healthscore -= 10
      if (this.gameStats.healthscore <= 0) {
        this.gameStats.healthscore = 0
        player.setTint(0xff0000)
        // Game over logic
      }
      this.updateGameStats()
      this.spellTime = this.time.now + 1000
    }
  }

  patronusHitsDementors(patronus, dementor) {
    patronus.disableBody(true, true)
    dementor.alpha -= 0.2
    if (dementor.alpha <= 0.4) {
      dementor.body.setCollideWorldBounds(false)
    }
  }

  avadakedavraHitsHarry(player, avadakedavra) {
    avadakedavra.disableBody(true, true)
    if (this.time.now > this.spellTime) {
      this.gameStats.healthscore -= 5
      if (this.gameStats.healthscore <= 0) {
        this.gameStats.healthscore = 0
        player.disableBody(true, true)
      }
      this.updateGameStats()
      this.spellTime = this.time.now + 100
    }
  }

  protegoShieldsAvadaKedavra(protego, avadakedavra) {
    if (this.time.now > this.spellTime) {
      protego.disableBody(true, true)
      avadakedavra.disableBody(true, true)
      
      if (this.gameStats.shieldscore > 0) {
        this.gameStats.shieldscore -= 1
      }
      
      this.createExplosion(avadakedavra.x, avadakedavra.y)
      this.updateGameStats()
      this.spellTime = this.time.now + 400
    }
  }

  enemyShieldsHit(enemyshield, spell) {
    spell.disableBody(true, true)
    this.enemyscore.enemyshieldscore -= 1
    
    this.createExplosion(spell.x, spell.y)
    
    if (this.enemyscore.enemyshieldscore <= 0) {
      enemyshield.disableBody(true, true)
      this.gameStats.healthscore += 5
      this.isShieldDisable = true
    }
    
    this.updateGameStats()
  }

  disarmVoldy(expelliarmus, voldy) {
    expelliarmus.disableBody(true, true)
    this.isEnemyArmed = false
    this.tweens.add({
      targets: voldy,
      alpha: 0,
      duration: 600,
      ease: 'Linear',
      yoyo: true,
      repeat: 6
    })
  }

  spellCollision(spellA, spellB) {
    spellA.disableBody(true, true)
    spellB.disableBody(true, true)
    this.gameStats.shieldscore += 2
    this.updateGameStats()
    this.createExplosion(spellA.x, spellA.y)
  }

  createExplosion(x, y) {
    const explosion = this.explosions.get(x, y, 'kaboom')
    if (explosion) {
      explosion.setActive(true).setVisible(true)
      explosion.play('explode')
    }
  }

  updateGameStats() {
    if (this.updateStats) {
      this.updateStats(this.gameStats)
    }
  }
}

export default LevelOneScene