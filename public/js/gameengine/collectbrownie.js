(function () {
    'use strict';

    angular
        .module('hpApp')
        .service('CollectBrownie', collectBrownie);


    function collectBrownie(SceneRenderer) {

        /** Collect golden Eggs 
         * @param {goldenegg, score, scoreText}  
         * @return {eggscore} 
        */
        this.collectGoldenegg = function (game, portkeys, goldenegg, score) {
            // Removes the goldenegg from the screen
            goldenegg.kill();
            //  Add and update the score
            score += 1;
            if (score >= 5) {
                portkeys.alpha = 1;
            }
            return { eggscore: score, portkeys: portkeys };
        };


        /** Collect Broomstick 
         * @param {goldenegg, score, scoreText}  
         * @return {player} 
        */
        this.collectBroomstick = function (player, broom, score) {
            broom.kill();
            player.body.gravity.y = 100;
            player.animations.play('up');

            score.shieldscore += 1;
            return { player: player, score: score };
        };


        /** Hit Dementor 
         * @param {game, player, dementors, score}  
         * @return {player} 
        */
        this.hitDementor = function (game, player, dementors, score) {
            // player.alpha -= .2;
            // game.add.tween(player).to({ alpha: 0.1 }, 200, Phaser.Easing.Linear.None, true, 0, 6, true);\
            score.healthscore = score.healthscore - 5;
            if (score.healthscore <= 0) { score.healthscore = 0; player.kill(); }
            return { dementors: dementors, score: score };
        };



        /** Collect Portkey 
         * @param {game, player, portkeys, score}  
         * @return {player} 
        */
        this.collectPortkey = function (game, player, portkeys, score) {
            game.add.tween(player).to({ alpha: 0.5 }, 200, Phaser.Easing.Linear.None, true, 0, 6, true);
            player.kill();
            portkeys.kill();

            return { score: score };
        };

    }
    /*End Of LocalSpace*/
}());
