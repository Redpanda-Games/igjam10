var intro = function (game) {
};

intro.prototype = {
    create: function () {
        console.log('intro.preload');
        this.game.state.clearCurrentState();
        this.game.state.start('Level', true, false, 'config-1');
    }
};