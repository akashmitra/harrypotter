(function () {
    'use strict';

    angular
        .module('hpApp')
        .service('LevelOne', levelOne);

    function levelOne(SharedDataService, CharacterRenderer, SceneRenderer, CollectBrownie, Spells) {

        this.startlevelone = function () {

            /**
             * Main Control of Level 1 :
             * @author Akash
             * @desc function that initiates the game
             */

            var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'hp-game', { preload: preload, create: create, update: update });

            /**Scene Variable*/
            var player;
            var points;
            
            var voldy;
            var platforms;
            var ground;
            var ledge;
            var cursors;
            var goldeneggs;
            var patronus;
            var explosions;
            var dementors_one, dementors_two;

            /** Spells */
            var protegototalum;
            var enemyshield;
            var avadakedavra, expelliarmus, sectumsempra;
            var protegoKey = [];
            var expectopatronusKey = [];
            var expelliarmusKey = [];
            var patronus_0 = [];

            /** Timers */
            var spellTime = 0;
            var firingTimer = 0;
            var isShieldDisable = true;
            var isEnemyArmed = true;

            /** Scoring Parameters */
            var eggscore = 0;
            var healthscore = 100;
            var shieldscore = 5;
            var score = {
                eggscore: eggscore,
                healthscore: healthscore,
                shieldscore: shieldscore
            };
            var enemyshieldscore = 5;
            var enemylifescore = 100;
            var enemyscore = {
                enemyshieldscore: enemyshieldscore,
                enemylifescore: enemylifescore
            };



            /**
             * Image Loader
             * @author Akash 
             * @desc Loads the images for the scene
             */
            function preload() {

                game.load.image('sky', '../assets/space.png');
                game.load.image('ground', '../assets/platform.png');
                game.load.image('goldenegg', '../assets/egg_chineseFireball.png');
                game.load.image('portkey', '../assets/goldensnitch.png');
                game.load.image('broom', '../assets/broom.png');
                game.load.image('dementor', '../assets/dementor-right.png');
                game.load.image('patronus', '../assets/spells/patronus.png');
                game.load.image('expelliarmus', '../assets/spells/expelliarmus.png');
                game.load.image('sectumsempra', '../assets/spells/sectumsempra.png');
                game.load.image('avadakedavra', '../assets/spells/avadakedavra.png');
                game.load.image('protego', '../assets/spells/protego.png');
                game.load.image('enemyshield', '../assets/spells/enemyshield.png');
                game.load.image('voldy', '../assets/characters/voldemort.png');
                game.load.spritesheet('harry', '../assets/characters/harry_potter.png', 32, 48, 16);
                game.load.spritesheet('kaboom', '../assets/explode.png', 128, 128);

            }//End of preload fn


            /**
             * Renderer
             * @author Akash 
             * @desc Renders the Scene
             */
            function create() {

                //  We're going to be using physics, so enable the Arcade Physics system
                game.physics.startSystem(Phaser.Physics.ARCADE);

                //  A simple background for our game
                game.add.sprite(0, 0, 'sky');


                /** Rendering Scenes */
                platforms = SceneRenderer.renderPlatform(game);  // Renders Platform
                ground = SceneRenderer.renderGround(game, platforms); // Renders Ground
                ledge = SceneRenderer.renderLedge(game, platforms); // Renders Ledge
                goldeneggs = SceneRenderer.renderGoldenEggs(game);  // Renders Golden Eggs
                brooms = SceneRenderer.renderBroomsticks(game); // Renders Brooms
                portkeys = SceneRenderer.renderPortkey(game); // Renders Portkey
                protegototalum = SceneRenderer.renderProtego(game); // Render Portego
                enemyshield = SceneRenderer.renderEnemyshield(game); // Render Enemy Portego

                /** Rendering Characters */
                player = CharacterRenderer.renderHarry(game); //Render harry
                dementors_one = CharacterRenderer.renderDementor(game, 250, 150); // Renders Dementors
                dementors_two = CharacterRenderer.renderDementor(game, 100, 350); // Renders Dementors
                voldy = CharacterRenderer.renderVoldemort(game); // Renders Voldy


                /** Rendering Spells */
                patronus = Spells.createPatronus(game); // Create Patronus
                expelliarmus = Spells.createExpelliarmus(game); // Create Expelliarmus
                avadakedavra = Spells.createAvadakedavra(game); // Create AvadaKedavra
                sectumsempra = Spells.createSectumsempra(game); // Create SectumSempra


                //  Texts
                // scoreText = game.add.text(game.world.width - 300, game.world.height - 500, 'Dragon Eggs: 0', { fontSize: '8px', fill: '#fff' });
                // shieldstatus = game.add.text(game.world.width - 300, game.world.height - 300, 'Shield : 100%', { fontSize: '5px', fill: '#fff' });
                // healthstatus = game.add.text(game.world.width - 300, game.world.height - 100, 'Health : 100%', { fontSize: '5px', fill: '#fff' });

                /** Explosion pool */
                explosions = game.add.group();
                explosions.createMultiple(30, 'kaboom');

                // explosions.forEach(setupDementor, this);
                explosions.forEach(setupSpells, this);
                explosions.forEach(setupdeathcurse, this);


                /** Controls */
                cursors = game.input.keyboard.createCursorKeys();
                protegoKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                expectopatronusKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
                expelliarmusKey = game.input.keyboard.addKey(Phaser.Keyboard.E);

            }//End of create fn


            function update() {

                /** Basic Collisions in the Game */
                game.physics.arcade.collide(player, platforms);
                game.physics.arcade.collide(voldy, platforms);
                game.physics.arcade.collide(goldeneggs, platforms);
                game.physics.arcade.collide(brooms, platforms);
                game.physics.arcade.collide(dementors_one, ground);


                game.physics.arcade.overlap(player, goldeneggs, collectgoldenegg, null, this);
                game.physics.arcade.overlap(player, brooms, collectbroomstick, null, this);
                game.physics.arcade.overlap(player, portkeys, getPortkey, null, this);
                game.physics.arcade.collide(player, dementors_one, hitdementor, null, this);
                game.physics.arcade.collide(player, dementors_two, hitdementor, null, this);


                game.physics.arcade.overlap(patronus, dementors_one, patronusHitsDementors, null, this);
                game.physics.arcade.overlap(patronus, dementors_two, patronusHitsDementors, null, this);

                game.physics.arcade.overlap(patronus, avadakedavra, spellCollision, null, this);
                game.physics.arcade.overlap(expelliarmus, avadakedavra, spellCollision, null, this);

                game.physics.arcade.overlap(player, avadakedavra, avadakedavraHitsHarry, null, this);
                game.physics.arcade.overlap(expelliarmus, voldy, disarmVoldy, null, this);

                game.physics.arcade.collide(protegos, avadakedavra, protegoShieldsAvadaKedavra, null, this);
                game.physics.arcade.collide(enemyshields, expelliarmus, enemyShieldsHit, null, this);



                /** Movement Logic */
                player.body.velocity.x = 0;

                if (cursors.left.isDown) {
                    //  Move to the left
                    player.body.velocity.x = -150;
                    player.animations.play('left');
                }
                else if (cursors.right.isDown) {
                    //  Move to the right
                    player.body.velocity.x = 150;
                    player.animations.play('right');
                }
                else {
                    //  Stand still
                    player.animations.stop();
                    player.frame = 8;
                }

                //  Allow the player to jump if they are touching the ground.
                if (cursors.up.isDown && player.body.touching.down) {
                    player.body.velocity.y = -350;
                }

                if (protegoKey.isDown) {
                    if (score.shieldscore > 0) {
                        ProtegoTotalum();
                    }
                }

                //  Expecto Patronus Key is Down
                if (expectopatronusKey.isDown) {
                    ExpectoPatronuns();
                }

                //  Expelliarmus Key is Down?
                if (expelliarmusKey.isDown) {
                    Expelliarmus();
                }

                //Enemy fires spells
                if (game.time.now > firingTimer) {

                    if (isEnemyArmed) {
                        if (game.time.now > spellTime) {
                            EnemyFires();
                        }
                        if (isShieldDisable) {
                            EnemyShield();
                        }
                    }
                }


            } //End of update fn




            /**
             * Collect goldeneggs 
             * @author Akash
             */
            function collectgoldenegg(player, goldenegg) {
                points = CollectBrownie.collectGoldenegg(game, portkeys, goldenegg, score.eggscore);
                score.eggscore = points.eggscore;
                SharedDataService.prepForBroadcast(score);
            }


            /**
             * Collect getBroomstick 
             * @author Akash
             */
            function collectbroomstick(player, broom) {
                var temp = CollectBrownie.collectBroomstick(player, broom, score);
                player = temp.player;
                SharedDataService.prepForBroadcast(temp.score);
            }


            /**
             * Hit Dementor 
             * @author Akash
             */
            function hitdementor(player, dementors) {
                if (game.time.now > spellTime) {
                    var temp = CollectBrownie.hitDementor(game, player, dementors, score);
                    dementors = temp.dementors;
                    SharedDataService.prepForBroadcast(temp.score);
                    spellTime = game.time.now + 100; //200 is the time interval
                }
            }


            /**
             * collect Portkey 
             * @author Akash
             */
            function getPortkey(player, portkeys) {
                if (score.eggscore >= 5) {
                    var temp = CollectBrownie.collectPortkey(game, player, portkeys, score);
                    SharedDataService.prepForBroadcast(temp.score);
                }
                else { return 0; }
            }


            /**
             * Cast Protego 
             * @author Akash
             */
            function ProtegoTotalum() {
                if (game.time.now > spellTime) {
                    // Shield pool
                    var protego = protegos.create(player.body.x, player.body.y - 50, 'protego');
                    protego.body.immovable = true;
                    spellTime = game.time.now + 400; //200 is the time interval
                }
            }


            /**
             * Cast Protego 
             * @author Akash
             */
            function EnemyShield() {
                enemyscore.enemyshieldscore = 5;
                isShieldDisable = false;
                // Shield pool
                var enemyshield = enemyshields.create(voldy.body.x - 50, voldy.body.y - 50, 'enemyshield');
                enemyshield.body.immovable = true;
            }


            /**
             * Cast Patronus 
             * @author Akash
             */
            function ExpectoPatronuns() {
                //  To avoid them being allowed to fire too fast we set a time limit
                if (game.time.now > spellTime) {
                    //  Grab the first patronus we can from the pool
                    patronus_0 = patronus.getFirstExists(false);

                    if (patronus_0) {
                        //  And fire it
                        patronus_0.reset(player.x, player.y + 8);
                        patronus_0.body.velocity.x = 400;
                        spellTime = game.time.now + 400; //200 is the time interval
                    }
                }
            }


            /**
             * Cast Expelliarmus
             * @author Akash
             */
            function Expelliarmus() {
                //  To avoid them being allowed to fire too fast we set a time limit
                if (game.time.now > spellTime) {
                    //  Grab the first patronus we can from the pool
                    var expelliarmus_0 = expelliarmus.getFirstExists(false);

                    if (expelliarmus_0) {
                        //  And fire it
                        expelliarmus_0.reset(player.x, player.y + 8);
                        expelliarmus_0.body.velocity.x = 400;
                        spellTime = game.time.now + 600; //200 is the time interval
                    }
                }
            }



            /**
             * Cast Enemy Spells
             * @author Akash
             */
            function EnemyFires() {
                //  Grab the first bullet we can from the pool
                var avadakedavra_0 = avadakedavra.getFirstExists(false);

                if (avadakedavra_0) {
                    avadakedavra_0.reset(voldy.body.x, voldy.body.y);

                    game.physics.arcade.moveToObject(avadakedavra_0, player, 120);
                    firingTimer = game.time.now + 2000;
                }
            }


            /**
            * Patronus hits Dementors 
            * @author Akash
            */
            function patronusHitsDementors(patronus, dementor) {
                patronus_0.kill();
                dementor.alpha = dementor.alpha - 0.2;

                if (dementor.alpha <= 0.4) {
                    dementor.body.collideWorldBounds = false;
                }
            }


            /**
            * DeathCurse hits Harry 
            * @author Akash
            */
            function avadakedavraHitsHarry(player, avadakedavra) {
                avadakedavra.kill();
                if (game.time.now > spellTime) {

                    score.healthscore = score.healthscore - 5;

                    if (score.healthscore <= 0) {
                        score.healthscore = 0;
                        player.kill();
                        avadakedavra.kill();
                    }
                    SharedDataService.prepForBroadcast(score);
                    spellTime = game.time.now + 100; //400 is the time interval
                }
            }

            /**
            * Avada Kedavra Hits Protego Shields
            * @author Akash
            */
            function protegoShieldsAvadaKedavra(protegos, avadakedavra) {

                if (game.time.now > spellTime) {
                    protegos.kill();
                    avadakedavra.kill();

                    if (score.shieldscore > 0) {
                        score.shieldscore -= 1;
                    }

                    spellTime = game.time.now + 400; //400 is the time interval

                    //  And create an explosion :)
                    var explosion = explosions.getFirstExists(false);
                    explosion.reset(avadakedavra.body.x, avadakedavra.body.y);
                    explosion.play('kaboom', 30, false, true);

                    SharedDataService.prepForBroadcast(score);
                }

            }

            /**
            * Enemy Shields 
            * @author Akash
            */
            function enemyShieldsHit(enemyshield, spell) {
                spell.kill();
                enemyscore.enemyshieldscore -= 1;

                //  And create an explosion :)
                var explosion = explosions.getFirstExists(false);
                explosion.reset(spell.body.x, spell.body.y);
                explosion.play('kaboom', 30, false, true);

                if (enemyscore.enemyshieldscore <= 0) {
                    enemyshield.kill();
                    score.healthscore += 5;
                    isShieldDisable = true;
                }

                SharedDataService.prepForBroadcast(score);
            }


            /**
            * Disarm Voldy 
            * @author Akash
            */
            function disarmVoldy(expelliarmus, voldy) {
                expelliarmus.kill();
                isEnemyArmed = false;
                game.add.tween(voldy).to({ alpha: 0 }, 600, Phaser.Easing.Linear.None, true, 0, 6, true);
            }

            /**
            * Two Spells Collide 
            * @author Akash
            */
            function spellCollision(spell_a, spell_b) {
                spell_a.kill();
                spell_b.kill();
                score.shieldscore += 2;
                SharedDataService.prepForBroadcast(score);

                //  And create an explosion :)
                var explosion = explosions.getFirstExists(false);
                explosion.reset(spell_a.body.x, spell_a.body.y);
                explosion.play('kaboom', 30, false, true);
            }


            // function setupDementor(dementors) {
            //     dementors.anchor.x = 0.5;
            //     dementors.anchor.y = 0.5;
            //     dementors.animations.add('kaboom');
            // }

            function setupSpells(spells) {
                spells.anchor.x = 0.5;
                spells.anchor.y = 0.5;
                spells.animations.add('kaboom');
            }


            function setupdeathcurse(avadakedavra) {
                avadakedavra.anchor.x = 0.5;
                avadakedavra.anchor.y = 0.5;
                avadakedavra.animations.add('kaboom');
            }



        } // End of StartOne Function


    } //End of levelOne Service
    /*End Of LocalSpace*/
}());