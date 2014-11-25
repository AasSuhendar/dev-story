game.module(
    'modules.release.scenes'
)
.require(
    'engine.scene'
)
.body(function() {

    game.createScene(App.Release.Intro, {

        backgroundColor: 0x143559,

        init: function(){

            // List of Levels
            App.LevelList = App.getLevelList();
            
            // Get level
            this.level = game.storage.get("CurrentLevel");
            
            var i;

            // Aquire game assets
            game.addAsset("Roboto-export.png");
            game.addAsset("Roboto-export.fnt");
            game.addAsset("pause.png");
            game.addAsset("pause_sound.png");
            game.addAsset("pause_vibrate.png");
            game.addAsset("pause_quit.png");
            game.addAsset("pause_resume.png");
            game.addAsset("release/icon.png");
            game.addAsset("release/shape.png");
            game.addAsset("release/level_3_intro_1.png");
            game.addAudio("audio/launch_fire.wav", "launch_fire");
            game.addAudio("audio/launch_bg.wav", "launch_bg");

            // Add icon assets
            for(i = 1; i <= 25; i += 1) {
                game.addAsset("release/"+i+".png");
            }

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

            App.sendPageView('Release Challenge - Level ' + (this.level+1));

            // Set intro text
            switch (this.level) {
                case 0:
                    text1 = "Launch while the hype is hot.";
                    text2 = "Tap “Launch” when your hype is at its highest.";
                    text3 = "For the best launch, hit it when your rivals’ hype is low.";
                    break;
                case 1:
                    text1 = "Time to release your app into the wild.";
                    text2 = "Tap “Launch” when your hype is at its highest.";
                    text3 = "For the best launch, hit it when your rivals’ hype is low.";
                    break;
                case 2:
                    text1 = "It’s time for app lift off!";
                    text2 = "Tap “Launch” when your hype is at its highest.";
                    text3 = "For the best launch, hit it when your rivals’ hype is low.";
                    break;
            }

            game.GameIntro.inject({
                init: function(){
                    this.icon = "media/release/icon.png";
                    this.title = text1;
                    this.text1 = text2;
                    this.text2 = text3;
                    this.img1 = ["media/release/level_3_intro_1.png", 568, 160];
                    this.img2 = [""];
                    this.link = App.Release.Game;
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

    game.createScene(App.Release.Game, {

        backgroundColor: 0xaee8d0,
        meters: [],
        score:0,

        init: function(){

            var i, Hype, self = this;

            // Set bg colour
            game.system.stage.setBackgroundColor(App.currentPalette[3]);

            // Get level
            this.level = game.storage.get("CurrentLevel");

            // Container
            this.container = new game.Container();
            this.container.scale.set(App.deviceScale(), App.deviceScale());

            // Screenfill
            this.screenFill = new game.Graphics();
            this.screenFill.beginFill(App.currentPalette[1]);
            this.screenFill.drawCircle(0, 0, game.system.width * 1.5);
            this.screenFill.endFill();
            this.screenFill.position.x = (game.system.width / App.deviceScale()) / 2;
            this.screenFill.position.y = (game.system.height / App.deviceScale()) / 1.7;
            this.screenFill.scale = { x: 0, y: 0 };

            // Capture position
            this.positions = [];

            // Check level 1
            if(this.level === 0) {

                // Set hypmeter position
                this.positions[0] = ((game.system.width / App.deviceScale()) / 12) * 3;
                this.positions[1] = ((game.system.width / App.deviceScale()) / 12) * 9;

                // Set player id
                this.playerId = 0;

                // Difficulty
                this.difficulty = 1;

            }
            
            // Check level 2
            if(this.level === 1) {

                // Set hypmeter position
                this.positions[0] = ((game.system.width / App.deviceScale()) / 12) * 3;
                this.positions[1] = ((game.system.width / App.deviceScale()) / 12) * 9;

                // Set player id
                this.playerId = 0;

                // Difficulty
                this.difficulty = 2;

            }
            
            // Check level 3
            if(this.level === 2) {

                // Set hypmeter position
                this.positions[0] = ((game.system.width / App.deviceScale()) / 12) * 2;
                this.positions[1] = ((game.system.width / App.deviceScale()) / 12) * 6;
                this.positions[2] = ((game.system.width / App.deviceScale()) / 12) * 10;

                // Set player id
                this.playerId = 1;

                // Difficulty
                this.difficulty = 2;

            }

            // Hype-o-meter
            for(i = 0; i < this.positions.length; i += 1) {

                game.Hype.inject({
                    init: function(){
                        this.id = i;
                        this.difficulty = self.difficulty;
                        this.isPlayer = (self.playerId === i) ? true : false;
                        this.load();
                    }
                });

                // Store hype meter
                this.meters.push(new game.Hype());

            }           

            // Countdown
            this.deltaMultiplier = 1;
            this.countdown = new game.G3Countdown();

            // Sounds
            App.playMusic("launch_bg", 0.5);

            // Pause
            this.stage.addChild(this.container);
            this.pauseButton = new game.PauseButton();

        },

        update: function() {

            if(App.developer) {
                App.stats.begin();
            }

            if(!App.paused) {
                this._super();
            }

            if(App.developer) {
                App.stats.end();
            }

        },

        endGame: function(){

            var self = this, i, fillTween;

            // Reset score
            this.score = 0;

            // Loop through hypometers
            for(i = 0; i < this.positions.length; i += 1) {

                // Check if the item is player
                if(this.meters[i].isPlayer) {

                    // Add player score
                    this.score += this.meters[i].score;
                } else {

                    // subtract other scores
                    this.score += (100 - this.meters[i].score);
                }

            }

            // Play sound
            App.playSound("launch_fire");

            // Calculate overall score
            this.overallScore = Math.floor(this.score/this.positions.length);

            // Add screenfill outro graphic
            this.container.addChild(this.screenFill);

            // Create tweens
            fillTween = new game.Tween(this.screenFill.scale);
            fillTween.to({ x: 1, y: 1 }, 1500);
            fillTween.onComplete(function(){
                game.audio.stopMusic();
                game.storage.set("game_3_score", self.overallScore);
                game.system.setScene(App.Release.Outro);
            });

            // Start tweens
            fillTween.start();

        }

    });

    game.createScene(App.Release.Outro, {

        backgroundColor: 0xaee8d0,

        init: function(){
            
            var self = this;

            // Get/Set app name
            if(!game.storage.get("CurrentAppName")) {
                game.storage.set("CurrentAppName", App.generateName());
            }

            // Get score
            this.score = Math.floor(game.storage.get("game_3_score")) || 0;

            // Create level object
            game.GameOutro.inject({
                init: function(){
                    this.icon = "media/release/icon.png";
                    this.title = "You launched";
                    this.shape = "media/release/shape.png";
                    this.score = self.score + "%";
                    this.load();
                }
            });

            // Create
            this.gameOutro = new game.GameOutro();

        }

    });

});
