(function () {
    'use strict';

    angular
        .module('hpApp')
        .service('Spells', spells);


    function spells() {

        /** Create Patronous
          * @param {object}  
          * @return {player} 
         */
        this.createPatronus = function (game) {

            var patronus;
            //  Our patronus group
            patronus = game.add.group();
            patronus.enableBody = true;
            patronus.physicsBodyType = Phaser.Physics.ARCADE;
            patronus.createMultiple(30, 'patronus');
            patronus.setAll('anchor.x', 0.5);
            patronus.setAll('anchor.y', 1);
            patronus.setAll('outOfBoundsKill', true);
            patronus.setAll('checkWorldBounds', true);

            return patronus;
        };

        /** Create Spell from Snape
         * @param 
         * @return
         */
        this.createSectumsempra = function (game) {
            var sectumsempra;
            //sectumsempra groups
            sectumsempra = game.add.group();
            sectumsempra.enableBody = true;
            sectumsempra.physicsBodyType = Phaser.Physics.ARCADE;
            sectumsempra.createMultiple(30, 'sectumsempra');
            sectumsempra.setAll('anchor.x', 0.5);
            sectumsempra.setAll('anchor.y', 1);
            sectumsempra.setAll('outOfBoundsKill', true);
            sectumsempra.setAll('checkWorldBounds', true);

            return sectumsempra;
        }

        /** Create Avada Kedavra
         * @param 
         * @return
         */
        this.createAvadakedavra = function (game) {
            var avadakedavra;
            //avadakedavra groups
            avadakedavra = game.add.group();
            avadakedavra.enableBody = true;
            avadakedavra.physicsBodyType = Phaser.Physics.ARCADE;
            avadakedavra.createMultiple(30, 'avadakedavra');
            avadakedavra.setAll('anchor.x', 0.5);
            avadakedavra.setAll('anchor.y', 1);
            avadakedavra.setAll('outOfBoundsKill', true);
            avadakedavra.setAll('checkWorldBounds', true);

            return avadakedavra;
        }


        /** Cast Protego Shield
         * @param {object}  
         * @return {player} 
        */
        this.createProtego = function (game, player) {

            var protegototalum = game.add.spritesheet(player.body.x, player.body.y, 'protego');

            game.physics.arcade.enable(protegototalum);
            protegototalum.body.bounce.y = 0.2;
            protegototalum.body.gravity.y = 400;
            protegototalum.body.collideWorldBounds = true;

            return protegototalum;
        };


        /** Cast Flippindo
         * @param {object}  
         * @return {player} 
        */
        this.castFlippindo = function (game) {
        };


        /** Cast Expelliarmus
         * @param {object}  
         * @return {player} 
        */
        this.createExpelliarmus = function (game) {
            var expelliarmus;
            //expelliarmus groups
            expelliarmus = game.add.group();
            expelliarmus.enableBody = true;
            expelliarmus.physicsBodyType = Phaser.Physics.ARCADE;
            expelliarmus.createMultiple(30, 'expelliarmus');
            expelliarmus.setAll('anchor.x', 0.5);
            expelliarmus.setAll('anchor.y', 1);
            expelliarmus.setAll('outOfBoundsKill', true);
            expelliarmus.setAll('checkWorldBounds', true);

            return expelliarmus;
        };


    }
    /*End Of LocalSpace*/
}());
