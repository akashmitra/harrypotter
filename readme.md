# Harry Potter Game - React + Vite

A 2D Harry Potter game built with React, Vite, and Phaser 3. This is a modernized version of the original AngularJS game.

**Original Creator**: Akash

## Features

- **Modern Tech Stack**: React 18 + Vite for fast development
- **Phaser 3**: Latest version of the popular 2D game framework
- **Game Mechanics**:
  - Collect dragon eggs
  - Cast spells (Protego, Expecto Patronum, Expelliarmus)
  - Fight Dementors and Voldemort
  - Health and shield system
  - Multiple levels

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the game.

## Build

```bash
npm run build
```

## Game Controls

- **Arrow Keys**: Move Harry Potter
- **Up Arrow**: Jump
- **Spacebar**: Cast Protego (shield spell)
- **P**: Cast Expecto Patronum (against Dementors)
- **E**: Cast Expelliarmus (disarm enemies)

## Game Objectives

1. Collect 5 dragon eggs to unlock the portkey
2. Avoid or defeat Dementors
3. Use spells strategically to survive
4. Reach the portkey to complete the level

## Project Structure

```
src/
├── components/          # React components
├── game/               # Phaser game logic
│   ├── scenes/         # Game scenes
│   └── PhaserGame.js   # Main game wrapper
├── App.jsx             # Main React component
└── main.jsx           # Entry point
```

## Migration Notes

This project has been migrated from:
- **AngularJS** → **React 18**
- **Express Server** → **Vite Dev Server**
- **Phaser 2** → **Phaser 3**
- **ES5** → **Modern ES6+ with modules**

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).