(function () {
    angular
        .module('hpApp')
        .service('SceneRenderer', sceneRenderer);


    function sceneRenderer() {

        /** Renders Platforms 
         * @param {game}  
         * @return {platforms} 
        */
        this.renderPlatform = function (game) {
            //  The platforms group contains the ground and the 2 ledges we can jump on
            var platforms = game.add.group();
            //  We will enable physics for any object that is created in this group
            platforms.enableBody = true;

            return platforms;
        };


        /** Renders Ground 
         * @param {game, platforms}  
         * @return {ground} 
        */
        this.renderGround = function (game, platforms) {
            // Here we create the ground.
            var ground = platforms.create(0, game.world.height - 64, 'ground');
            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            ground.scale.setTo(4,4);
            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;

            return ground;
        }


        /** Renders Ledges 
         * @param {game, platforms}  
         * @return {ledge} 
        */
        this.renderLedge = function (game, platforms) {
            //  Now let's create three ledges
            var ledge = platforms.create(400, 400, 'ground');
            ledge.body.immovable = true;
            ledge.alpha=0;

            ledge = platforms.create(-150, 250, 'ground');
            ledge.body.immovable = true;

            ledge = platforms.create(100, 300, 'ground');
            ledge.body.immovable = true;

            return ledge;
        }


        /** Renders Golden Eggs 
         * @param {game}  
         * @return {goldeneggs} 
        */
        this.renderGoldenEggs = function (game) {
            //  Finally some goldeneggs to collect
            goldeneggs = game.add.group();
            //  We will enable physics for any goldenegg that is created in this group
            goldeneggs.enableBody = true;

            //  Here we'll create 12 of them evenly spaced apart
            for (var i = 0; i < 5; i++) {
                //  Create a goldenegg inside of the 'goldeneggs' group
                var goldenegg = goldeneggs.create(i * 150, 0, 'goldenegg');
                //  Let gravity do its thing
                goldenegg.body.gravity.y = 300;
                //  This just gives each goldenegg a slightly random bounce value
                goldenegg.body.bounce.y = 0.1 + Math.random() * 0.2;
            }

            return goldeneggs;
        }


        /** Renders Broomstick 
         * @param {game}  
         * @return {brooms} 
        */
        this.renderBroomsticks = function (game) {
            //Here we'll have a broomstick that might help harry to fly
            brooms = game.add.group();
            brooms.enableBody = true;
            broom = brooms.create(400, 150, 'broom');
            broom.body.gravity.y = 300;

            return brooms;
        }


        /** Renders Portkey 
         * @param {game}  
         * @return {portkey} 
        */
        this.renderPortkey = function (game) {
            portkeys = game.add.group();
            //  We will enable physics for any goldenegg that is created in this group
            portkeys.enableBody = true;
            game.physics.arcade.enable(portkeys);
            portkeys.alpha = 0;
           
           var portkey = portkeys.create(game.world.width-50, game.world.height - 120, 'portkey');
            //  This stops it from falling away when you jump on it
            portkey.body.immovable = true;

            return portkeys;
        }

        /** Renders Protego 
         * @param {game}  
         * @return {protegos} 
        */
        this.renderProtego = function(game){
            protegos = game.add.group();
            //  We will enable physics for any goldenegg that is created in this group
            protegos.enableBody = true;
            game.physics.arcade.enable(protegos);
            return protegos;
        }

         /** Renders EnemyShield 
         * @param {game}  
         * @return {protegos} 
        */
        this.renderEnemyshield = function(game){
            enemyshields = game.add.group();
            //  We will enable physics for any goldenegg that is created in this group
            enemyshields.enableBody = true;
            game.physics.arcade.enable(enemyshields);
            return enemyshields;
        }



    }

    /*End Of LocalSpace*/
} ());
