var levelpicker = function (game) {
};

levelpicker.prototype = {
    keys: {},
    levels: [],
    init: function () {
        console.log('levelpicker.init');
        this.keys = {};
        this.levels = [];
    },
    create: function () {
        console.log('levelpicker.create');

        this.levels = this.game.cache.getJSON('levels');

        this.game.add.image(0, 0, 'bg_level_picker');

        var col = 4;
        var p = 40;
        var w = ((game.world.width - (p * 2)) / col) - p;
        var h = ((game.world.height - (p * 2)) / Math.max(Math.ceil(this.levels.length / col), 4)) - p;
        this.levels.forEach(function(level, index) {
            var unlocked = localStorage.getItem(level.config+'-unlocked');
            var finished = localStorage.getItem(level.config+'-finished');

            var xi = index % col;
            var yi = Math.floor(index / col);
            var x = p + ((w + p) * xi);
            var y = p + ((h + p) * yi);

            var box = game.add.graphics();
            box.beginFill(0x000000, 0.1);
            if(unlocked) {
                box.beginFill(0x000000, 0.75);
                if(finished) {
                    box.beginFill(0x63ce0d, 0.75);
                }
                box.inputEnabled = true;
                box.input.useHandCursor = true;
                box.events.onInputDown.add(function() {
                    console.log('clicked', level);
                    game.state.clearCurrentState();
                    game.state.start('Intro', true, false, level.config);
                });
            }
            box.drawRect(x, y, w, h);

            var style = {
                font: "bold 32px Arial",
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };

            var text = game.add.text(0, 0, level.name, style);
            text.setTextBounds(x, y, w, h);
        });

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
        this.keys.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },
    update: function() {
        //console.log('levelpicker.update');
        if (this.keys.esc.isDown) {
            this.game.state.clearCurrentState();
            this.game.state.start('Menu');
            return true;
        }
    }
};
