game.module(
    'modules.coding.scenes'
)
.require(
    'engine.scene'
)
.body(function() {

    game.createScene(App.Coding.Intro, {

        backgroundColor: 0x143559,

        init: function(){

            // List of Levels
            App.LevelList = App.getLevelList();
            
            // Get level
            this.level = game.storage.get("CurrentLevel");
            
            // Aquire generic assets
            game.addAsset("Roboto-export.png");
            game.addAsset("Roboto-export.fnt");
            game.addAsset("pause.png");
            game.addAsset("pause_sound.png");
            game.addAsset("pause_vibrate.png");
            game.addAsset("pause_quit.png");
            game.addAsset("pause_resume.png");

            // Aquire game assets
            game.addAsset("coding/icon.png");
            game.addAsset("coding/shape.png");
            game.addAsset("coding/code.png");
            game.addAsset("coding/cord.png");
            game.addAsset("coding/squish.png");
            game.addAsset("coding/mouse_"+(this.level+1)+".png");
            game.addAsset("coding/bug.png");
            game.addAsset("coding/keyboard.png");
            game.addAsset("coding/level_2_intro_1.png");
            game.addAsset("coding/level_2_intro_2.png");

            // Sound
            game.addAudio("audio/coding_click.wav", "coding_click"); 
            game.addAudio("audio/coding_bg.wav", "coding_bg");
            game.addAudio("audio/coding_debug.wav", "coding_debug");

            // Colours
            switch (this.level) {

                //sequence is: spark, nucleus, cog, background
                case 0:
                    App.currentPalette = [0xf5c908, 0x52b6b0, 0xe59828, 0x394551];
                    break;
                case 1:
                    App.currentPalette = [0xfddc8a, 0x87c666, 0x37ced1, 0x2e5a39];
                    break;
                case 2:
                    App.currentPalette = [0xffde8b, 0xcb257d, 0xff8f57, 0x511844];
                    break;

            }

            // Set bg colour
            game.system.stage.setBackgroundColor(App.currentPalette[3]);

            // Create loader
            this.loader = new game.Loader();

            // Set dynamic
            this.loader.dynamic = true;

            // Start loading
            this.loader.start();
           
        },

        loaded: function(){

            var text1, text2, text3, GameIntro;

            // Get level
            this.level = game.storage.get("CurrentLevel");

            // Analytics 
            App.sendPageView('Coding Challenge - Level ' + (this.level+1));

            // Set intro text
            switch (this.level) {
                case 0:
                    text1 = "Demo your sweet coding skills.";
                    text2 = "Tap the symbols as they hit the mouse to avoid creating bugs.";
                    text3 = "Fix the bugs by tapping on them as fast as you can.";
                    break;
                case 1:
                    text1 = "Let’s get coding.";
                    text2 = "Tap the symbols as they hit the mouse to avoid creating bugs.";
                    text3 = "Fix the bugs by tapping on them as fast as you can.";
                    break;
                case 2:
                    text1 = "Let the coding begin!";
                    text2 = "Tap the symbols as they hit the mouse to avoid creating bugs.";
                    text3 = "Fix the bugs by tapping on them as fast as you can.";
                    break;
            }

            game.GameIntro.inject({
                init: function(){
                    this.icon = "media/coding/icon.png";
                    this.title = text1;
                    this.text1 = text2;
                    this.text2 = text3;
                    this.img1 = ["media/coding/level_2_intro_1.png", 320, 80];
                    this.img2 = ["media/coding/level_2_intro_2.png", 320, 80];
                    this.link = App.Coding.Game;
                    this.load();
                }
            });
            // Create level object
            this.gameIntro = new game.GameIntro();

        },

        update: function(){

            this._super();

            // Check loader is available
            if(this.loader) {

                // Check loader started
                if(this.loader.started) {

                    // If bar is finished
                    if(this.loader.percent === 100) {

                        // Reset loader
                        this.loader.started = false;

                        // Fire callback
                        this.loaded();

                    }
                }
            }

        }
    });

    game.createScene(App.Coding.Game, {

        backgroundColor: 0x3c495b,
        score: 0,
        rows: [],
        counter:0,
        timeleft:30,
        positions: [],
        difficulty: [
            ["e", 5],
            ["m", 5],
            ["h", 5],
            ["h", 5],
            ["h", 5],
            ["h", 5]
        ],

        init: function(){

            // Set bg colour
            game.system.stage.setBackgroundColor(App.currentPalette[3]);

            // Get level
            this.level = game.storage.get("CurrentLevel") || 0;

            // Start the music
            App.playMusic("coding_bg", 0.5);

            // Container
            this.container = new game.Container();

            // Screenflash
            this.flash = new game.Graphics();
            this.flash.beginFill(0xFFFFFF);
            this.flash.drawRect(0, 0, App.pX(100), App.pY(100));
            this.flash.endFill();
            this.flash.alpha = 0;

            // Death field
            this.deathField = new game.Graphics();
            this.deathField.beginFill(0xFFFFFF);
            this.deathField.drawRect(0, 0, App.pX(100), App.pY(100));
            this.deathField.endFill();
            this.deathField.position.x = App.pX(100);
            this.deathField.position.y = 0;
            this.deathField.alpha = 0.5;
            this.deathField.tint = 0xFF0000;

            // Capture position
            this.positions[0] = App.pY(35);
            this.positions[1] = App.pY(55);
            this.positions[2] = App.pY(75);

            // Movement guides
            this.guides = new game.Graphics();
            this.guides.beginFill(App.currentPalette[1]); // GREEN
            this.guides.drawRect(0, App.pY(25), App.pX(100), App.pY(20));
            this.guides.beginFill(App.currentPalette[2]); // RED
            this.guides.drawRect(0, App.pY(45), App.pX(100), App.pY(20));
            this.guides.beginFill(App.currentPalette[0]); // BLUE
            this.guides.drawRect(0, App.pY(65), App.pX(100), App.pY(20));
            this.guides.endFill();
            this.guides.alpha = 0.25;

            this.mouse = new game.Sprite('coding/mouse_'+ (this.level+1) +'.png');
            this.mouse.ratio = 224/488;
            this.mouse.height = App.pY(60);
            this.mouse.width = this.mouse.height * this.mouse.ratio;
            this.mouse.position.x = App.pX(100) - this.mouse.width;
            this.mouse.position.y = this.positions[1] - (this.mouse.height / 2);

            this.cord = new game.Sprite('coding/cord.png');
            this.cord.ratio = 1500/592;
            this.cord.height = App.pY(80);
            this.cord.width = this.cord.height * this.cord.ratio;
            this.cord.position.x = App.pX(50) - (this.cord.width / 2) - (this.mouse.width / 2);
            this.cord.position.y = this.positions[1] - (this.cord.height / 2);

            this.keyboard = new game.Sprite('coding/keyboard.png');
            this.keyboard.ratio = 130/544;
            this.keyboard.height = App.pY(75);
            this.keyboard.width = this.keyboard.height * this.keyboard.ratio;
            this.keyboard.position.x = 0;
            this.keyboard.position.y = this.positions[1] - (this.keyboard.height / 2);

            // Set the point where the items can start scoring
            this.mouseZone1 = App.pX(100) - this.mouse.width;
            this.mouseZone2 = App.pX(100) - this.mouse.width + (this.mouse.width / 3);
            this.mouseZone3 = App.pX(100) - this.mouse.width + (this.mouse.width / 1.2);

            this.zones = new game.Graphics();
            this.zones.beginFill(0x0000FF); // GREEN
            this.zones.drawRect(this.mouseZone1, 0, App.pX(0.2), App.pY(100));
            this.zones.drawRect(this.mouseZone2, 0, App.pX(0.2), App.pY(100));
            this.zones.drawRect(this.mouseZone3, 0, App.pX(0.2), App.pY(100));

            // Text box
            this.textBox = new game.Text("Text Box!", { fill: "white", font: 'bold '+App.pX(5)+'px sans-serif' } );
            this.textBox.position.y = App.pY(5);
            this.textBox.alpha = 0;

            this.difficulty = App.shuffleArray(this.difficulty);

            // Speed difficulty
            this.speed = 100 + ((this.level+1) * 100);

            // Bugs mode
            if(this.level === 0) {
                this.bugsCount = 3;
                this.total = 78;
            }
            if(this.level === 1) {
                this.bugsCount = 4;
                this.total = 92;
            }
            if(this.level === 2) {
                this.bugsCount = 5;
                this.total = 104;
            } 

            // Create container
            this.codeLayer = new game.Container();
            this.container.addChild(this.guides);
            this.container.addChild(this.deathField);
            this.container.addChild(this.cord);
            this.container.addChild(this.mouse);
            this.container.addChild(this.codeLayer);
            this.container.addChild(this.keyboard);
            this.container.addChild(this.textBox);

            // Controls layer
            this.controlsLayer = new game.Controls();

            this.deltaMultiplier = 1;
            this.countdown = new game.G2Countdown();
            this.timeIndex = 0;

            // Pause
            this.pauseButton = new game.PauseButton();
            
            this.container.addChild(this.flash);
            this.container.addChild(this.zones);
            this.stage.addChild(this.container);

        },

        update: function() {

            if(App.developer) {
                App.stats.begin();
            }


            if(!App.paused) {

                // Add to time index
                this.timeIndex += game.system.delta;

                /** 
                    XDK_PARAMS
                    This section deals with the game difficulty
                    It checks the current difficulty then checks the time index before firing a code row
                    What changes could you make to improve the gameplay here?
                */

                // Get the difficulty
                switch (this.getDifficulty()) {
                    case "h":

                        // Check time
                        if(this.timeIndex >= 0.5) {

                            // Reset time index
                            this.timeIndex = 0;

                            // Fire code
                            this.addCodeRow();

                        }

                        break;

                    case "m":

                        // Check time
                        if(this.timeIndex >= 0.75) {

                            // Reset time index
                            this.timeIndex = 0;

                            // Fire code
                            this.addCodeRow();

                        }

                        break;

                    case "e":

                        // Check time
                        if(this.timeIndex >= 1) {

                            // Reset time index
                            this.timeIndex = 0;

                            // Fire code
                            this.addCodeRow();

                        }

                        break;

                }
                
                this._super();

            }

            if(App.developer) {
                App.stats.end();
            }

        },

        getDifficulty: function(){

            var i, j = 0;

            // Loop through the list
            for(i = 0; i < this.difficulty.length; i += 1) {

                // Add to index
                j += this.difficulty[i][1];

                // Check index
                if(this.timeleft-5 <= j) {

                    // Return difficulty
                    return this.difficulty[i][0];

                }
            }

        },

        addCodeRow: function(){

            // Add code
            if(!this.pauseObjects && this.timeleft >= 0) {
                
                // Create row
                var new_row = new game.Row();

                // Add to scene
                this.addObject(new_row);

                // Add to rows array
                this.rows.push(new_row);

            }

        },

        addGoodScore: function() {

            // Add score
            this.score += 1;

            // Screenflash
            this.screenFlash(0x0000FF, "Great!");

        },

        addPerfectScore: function() {

            // Add score
            this.score += 2;

            // Screenflash
            this.screenFlash(0x00FF00, "Perfect!");

        },

        resetCombo: function(){

            // vibration
            App.vibrate(250);

            // Screen wobble
            this.rgbFilter(30, 500);

        },

        enterBugsMode: function(){

            var mouseTween, cordTween, keyboardTween, i, count = 0;

            // vibration
            App.vibrate(250);
            
            // Play music
            App.playMusic("coding_debug", 0.2);

            // loop through the code items
            for(i = 0; i < this.codeLayer.children.length; i += 1) {

                // If this is a code item
                if(this.codeLayer.children[i].hasOwnProperty("row")) {

                    //Check item has not failed or scored
                    if(!this.codeLayer.children[i].failed && !this.codeLayer.children[i].scored && !this.codeLayer.children[i].isBug) {

                        // Check this can be made a bug
                        if(count < this.bugsCount) {

                            // Make this item into a bug
                            this.codeLayer.children[i].isBug = true;

                            // Add to bug count
                            count += 1;

                        }
                    }
                }
            }

            // Pull deathfield into view
            this.deathField.position.x = 0;

            // Set the readout text
            this.textBox.setText("Debug!");

            // Set the textbox position
            this.textBox.position.x = App.pX(50) - (this.textBox.width / 2);

            // Set the readout text alpha
            this.textBox.alpha = 1;

            // Pause the game objects
            this.pauseObjects = true;

            // Move the mouse right
            mouseTween = new game.Tween(this.mouse.position);
            mouseTween.to({ x: App.pX(100) }, 500);
            mouseTween.start();

            // Move the cord right
            cordTween = new game.Tween(this.cord.position);
            cordTween.to({ x: this.cord.position.x + this.mouse.width }, 500);
            cordTween.start();

            // Move the keyboard left
            keyboardTween = new game.Tween(this.keyboard.position);
            keyboardTween.to({ x: -this.keyboard.width }, 500);
            keyboardTween.start();

            // Screen wobble
            this.rgbFilter(50, 500);

        },

        leaveBugsMode: function(){

            var mouseTween, cordTween, keyboardTween;

            // Move the deathfield out of view
            this.deathField.position.x = App.pX(100);

            // Screen flash
            this.screenFlash(0x00FF00, "");

            // If there is still time left
            if(!this.ended) {

                // Play the normal music
                App.playMusic("coding_bg", 0.5);

            } else {

                // Stop the music
                game.audio.stopMusic();

            }

            // Resume the game objects
            this.pauseObjects = false;

            // Move the mouse back in
            mouseTween = new game.Tween(this.mouse.position);
            mouseTween.to({ x: App.pX(100) - this.mouse.width }, 500);
            mouseTween.start();

            // move the cord back in
            cordTween = new game.Tween(this.cord.position);
            cordTween.to({ x: this.cord.position.x - this.mouse.width }, 500);
            cordTween.start();

            // Move the keyboard back in
            keyboardTween = new game.Tween(this.keyboard.position);
            keyboardTween.to({ x: 0 }, 500);
            keyboardTween.start();

        },

        rgbFilter: function(size, duration){

            // Create the filter
            this.blur = new game.PIXI.RGBSplitFilter();
            this.blur.uniforms.blue.value = { x: size * ((Math.random() < 0.5) ? -1 : 1), y: size * ((Math.random() < 0.5) ? -1 : 1) };
            this.blur.uniforms.green.value = { x: size * ((Math.random() < 0.5) ? -1 : 1), y: size * ((Math.random() < 0.5) ? -1 : 1) };
            this.blur.uniforms.red.value = { x: size * ((Math.random() < 0.5) ? -1 : 1), y: size * ((Math.random() < 0.5) ? -1 : 1) };

            // Set the container filter
            this.container.filters = [this.blur];
            
            // Create the blur tweens
            this.blurTween1 = new game.Tween(this.blur.uniforms.blue.value);
            this.blurTween2 = new game.Tween(this.blur.uniforms.green.value);
            this.blurTween3 = new game.Tween(this.blur.uniforms.red.value);

            // Set blur tween properties
            this.blurTween1.to({ x: 0, y: 0 }, duration);
            this.blurTween2.to({ x: 0, y: 0 }, duration);
            this.blurTween3.to({ x: 0, y: 0 }, duration);

            // Set thhe blur tween complete function
            this.blurTween1.onComplete(function(){
                game.scene.container.filters = null;
            });

            // Start the tween
            this.blurTween1.start();
            this.blurTween2.start();
            this.blurTween3.start();

        },

        endGame: function(){

            var self = this, flashTween;

            // Set the game ended flag
            this.ended = true;

            // If the game is in debug mode
            if(this.pauseObjects) {

                // Leave debug mode
                this.leaveBugsMode();
            }

            // Set the flash tint to green
            this.flash.tint = App.currentPalette[1];

            // Set the flash position
            this.flash.position.x = 0;

            // Set the flash alpha
            this.flash.alpha = 0;

            // Calculate the final score
            this.finalScore = Math.floor((this.score / this.total) * 100);

            // Create the flash tween
            flashTween = new game.Tween(this.flash);
            flashTween.to({ alpha: 1 }, 1000);
            flashTween.start();
            flashTween.onComplete(function(){
                game.storage.set("game_2_score", Math.min(self.finalScore, 100));
                game.system.setScene(App.Coding.Outro);
            });

        },

        screenFlash: function(colour, text){

            var textBoxTween, flashTween;

            // Set the flash colour
            this.flash.tint = colour;

            // Set the flash alpha
            this.flash.alpha = 0.25;

            // Set the textbox text
            this.textBox.setText(text);

            // Set the textbox alpha
            this.textBox.alpha = 1;

            // Set the textbox position
            this.textBox.position.x = App.pX(50) - (this.textBox.width / 2);

            // Create the tweens
            textBoxTween = new game.Tween(this.textBox);
            textBoxTween.to({ alpha:0 }, 500);
            flashTween = new game.Tween(this.flash);
            flashTween.to({ alpha:0 }, 500);

            // Start the tweens
            textBoxTween.start();
            flashTween.start();

        }
    });

    game.createScene(App.Coding.Outro, {

        backgroundColor: 0x3c495b,

        init: function(){

            var self = this;

            // Get/Set app name
            if(!game.storage.get("CurrentAppName")) {
                game.storage.set("CurrentAppName", App.generateName());
            }

            // Get score
            this.score = Math.floor(game.storage.get("game_2_score")) || 0;

            // Create level object
            game.GameOutro.inject({
                init: function(){
                    this.icon = "media/coding/icon.png";
                    this.title = "You built";
                    this.shape = "media/coding/shape.png";
                    this.score = self.score + "%";
                    this.load();
                }
            });

            // Create
            this.gameOutro = new game.GameOutro();
            
        }

    });

});
