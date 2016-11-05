(function () {
    angular
        .module('hpApp')
        .service('CharacterRenderer', characterRenderer);


    function characterRenderer() {

        /** Renders Harry Potter 
         * @param {object}  
         * @return {player} 
        */
        this.renderHarry = function (game) {
            // The player and its settings
            player = game.add.sprite(32, game.world.height - 150, 'harry');

            //  We need to enable physics on the player
            game.physics.arcade.enable(player);

            //  Player physics properties. Give the little guy a slight bounce.
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 400;
            player.body.collideWorldBounds = true;

            //  Our four animations, walking left and right.
            player.animations.add('right', [8, 9, 10, 11], 10, true);
            player.animations.add('left', [4, 5, 6, 7], 10, true);
            player.animations.add('down', [0, 1, 2, 3], 10, true);
            player.animations.add('up', [12, 13, 14, 15], 10, true);

            return player;
        };


        /** Renders Dementor 
         * @param {game,a,b} a=intial length x axis, b=initial length y axis  
         * @return {dementors} 
        */
        this.renderDementor = function (game,a,b) {
            dementors = game.add.group();
            var dementor = dementors.create(a, b, 'dementor');
            game.physics.arcade.enable(dementor);
            dementor.alpha = 0.8;

            //  This gets it moving
            dementor.body.velocity.setTo(200, 0);
            //  This makes the game world bounce-able
            dementor.body.collideWorldBounds = true;
            //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
            dementor.body.bounce.set(1);
            dementor.body.gravity.set(0);


            return dementors;
        };


        /**
         * Renders Severus Snape
         * @param {game} 
         * @return {snape}
         */
        this.renderSnape = function(game){
            
            var snape = game.add.sprite(game.world.width-60, game.world.height - 150,'snape');

            //  We need to enable physics on the player
            game.physics.arcade.enable(snape);
            snape.body.bounce.y = 0.2;
            snape.body.gravity.y = 400;
            snape.body.collideWorldBounds = true;

            return snape;
        }



         /**
         * Renders Severus Snape
         * @param {game} 
         * @return {snape}
         */
        this.renderVoldemort = function(game){
            
            var voldy = game.add.sprite(game.world.width-60, game.world.height - 150,'voldy');

            //  We need to enable physics on the player
            game.physics.arcade.enable(voldy);
            voldy.body.bounce.y = 0.2;
            voldy.body.gravity.y = 400;
            voldy.body.collideWorldBounds = true;

            return voldy;
        }


    }


    /*End Of LocalSpace*/
} ());
