game.module(
    'modules.concept.scenes'
)
.require(
    'engine.camera',
    'engine.core',
    'engine.loader',
    'engine.scene',
    'engine.renderer',
    'engine.particle',
    'engine.timer',
    'engine.tween',
    'engine.scene',
    'engine.system'
    
)
.body(function() {
    
    game.createScene(App.Concept.Intro, {

        backgroundColor: 0x143559,

        init: function(){
            // List of Levels
            App.LevelList = App.getLevelList();
            
            // Get level
            this.level = game.storage.get("CurrentLevel");
            
            var levelString = (1 + this.level);
            
            // Aquire game assets
            game.addAsset("font.fnt");
            game.addAsset("Roboto-export.png");
            game.addAsset("Roboto-export.fnt");
            game.addAsset("concept/level_"+levelString+"_background_tile_01.png");
            game.addAsset("concept/character_body.png");
            game.addAsset("concept/character_arms.png");
            game.addAsset("concept/character_legs.png");
            game.addAsset("concept/character_face_01_default.png");
            game.addAsset("concept/character_face_02_smile.png");
            game.addAsset("concept/character_face_03_wired.png");
            game.addAsset("concept/character_face_04_content.png");
            game.addAsset("concept/character_face_05_hypnotised.png");
            game.addAsset("concept/character_face_06_squint.png");
            game.addAsset("concept/character_face_07_asleep.png");
            game.addAsset("concept/glow_01.png");
            game.addAsset("concept/particle.png");
            game.addAsset("concept/level_"+levelString+"_distraction_cat_01.png");
            game.addAsset("concept/level_"+levelString+"_distraction_noodles_01.png");
            game.addAsset("concept/level_"+levelString+"_distraction_pillow_01.png");
            game.addAsset("concept/level_"+levelString+"_powerup_clock_01.png");
            game.addAsset("concept/level_"+levelString+"_powerup_coffee_01.png");
            game.addAsset("concept/level_"+levelString+"_powerup_drink_01.png");
            game.addAsset("concept/level_"+levelString+"_powerup_sushi_01.png");
            game.addAsset("concept/level_"+levelString+"_powerup_unicorn_01.png");
            game.addAsset("concept/level_"+levelString+"_collectable_atom_01.png");
            game.addAsset("concept/level_"+levelString+"_collectable_cog_01.png");
            game.addAsset("concept/level_"+levelString+"_collectable_star_01.png");
            game.addAsset("concept/level_"+levelString+"_collectable_star_tail_01.png");
            game.addAsset("concept/cat.png");
            game.addAsset("concept/unicorn.png");
            game.addAudio("audio/concept_bg_level_0"+levelString+".wav", "music"+levelString);
            game.addAudio("audio/concept_reverse_level_0"+levelString+".wav", "reverse"+levelString);
            game.addAudio("audio/concept_bg_end.wav", "end");
            game.addAudio("audio/concept_idea_spark_01.wav", "spark");
            game.addAudio("audio/concept_idea_nucleus_01.wav", "nucleus");
            game.addAudio("audio/concept_idea_cog_03.wav", "cog");
            game.addAudio("audio/concept_power_coffee_01.wav", "coffee");
            game.addAudio("audio/concept_power_unicorn_01.wav", "unicorn");
            game.addAudio("audio/concept_distract_cat_01.wav", "cat");
            game.addAudio("audio/concept_distract_sleep_01.wav", "sleep");
            game.addAudio("audio/concept_distract_noodle_01.wav", "noodle");
            game.addAsset("pause.png");
            game.addAsset("pause_sound.png");
            game.addAsset("pause_vibrate.png");
            game.addAsset("pause_quit.png");
            game.addAsset("pause_resume.png");
            game.addAsset("concept/icon.png");
            game.addAsset("concept/shape.png");
            game.addAsset("concept/level_"+levelString+"_intro_1.png");
            game.addAsset("concept/level_"+levelString+"_intro_2.png");
            
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
            
            // Container
            this.loading = new game.Container();
            this.loading.scale.set(App.deviceScale(), App.deviceScale());
        
            // Create loader
            this.loader = new game.Loader();

            // Set dynamic
            this.loader.dynamic = true;
            this.loadingText = new game.Text( "Loading...".toUpperCase(), { fill: "white", font: 'bold '+ App.pX(5) +'px sans-serif' } );
            this.loadingText.anchor.set(0.5, 0.5);
            this.loadingText.position.x = App.pX(50);
            this.loadingText.position.y = App.pY(50);

            // Objects
            this.bar = new game.Graphics();
            this.bar.beginFill(0xce5064); 
            this.bar.drawRect(0, 0, App.pX(100), App.pY(100));
            this.bar.position.y = 0;
            this.bar.position.x = -App.pX(100);
            this.bar.endFill();

            // Add to scene
            this.loading.addChild(this.bar);
            this.loading.addChild(this.loadingText);
            this.stage.addChild(this.loading);

            // Start loading
            this.loader.start();

        },

        loaded: function(){

            var text1, text2, text3, self = this;

            // Get level
            this.level = game.storage.get("CurrentLevel");

            App.sendPageView('Concept Challenge - Level ' + (this.level+1));

            // Set intro text
            switch (this.level) {
                case 0:
                    text1 = "Great apps begin with awesome ideas.";
                    text2 = "To unleash your genius, grab as many idea sparks as you can.";
                    text3 = "Just be sure to avoid the notorious distraction demons.";
                    break;
                case 1:
                    text1 = "Churning out ideas is hard work...";
                    text2 = "To unleash your genius, grab as many idea sparks as you can.";
                    text3 = "Just be sure to avoid the notorious distraction demons.";
                    break;
                case 2:
                    text1 = "It’s time to build the next big thing.";
                    text2 = "To unleash your genius, grab as many idea sparks as you can.";
                    text3 = "Just be sure to avoid the notorious distraction demons.";
                    break;
            }
            game.GameIntro.inject({
                init: function(){
                    this.icon = "media/concept/icon.png";
                    this.title = text1;
                    this.text1 = text2;
                    this.text2 = text3;
                    this.img1 = ["media/concept/level_1_intro_1.png", 600, 80];
                    this.img2 = ["media/concept/level_1_intro_2.png", 400, 80];
                    this.link = App.Concept.Game;
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
                    if(this.loader.percent < 100) {

                        // Move the bar
                        this.bar.position.x = -App.pX(100) + App.pX(this.loader.percent);

                    } else {

                        // Remove the loading screen
                        this.stage.removeChild(this.loading);

                        // Reset loader
                        this.loader.started = false;

                        // Fire callback
                        this.loaded();

                    }
                }
            }

        }
    });

    game.createScene(App.Concept.Game, {
        
        backgroundColor: 0x000000,

        init: function() {
            
            // Retrieve current level
            this.level = game.storage.get("CurrentLevel");
            var levelString = (1 + this.level);
            
            // Initialise game specific palette
            this.palette = new game.Palette();
            
            // Used to control simulation speed
            this.deltaMultiplier = 1;
            
            this.mousePos = new game.Vector();
            
            
            this.ending = false;
            
            // Containers used to ensure sprites sit in appropriate z-order
            this.gameLayer = new game.GameLayer();
            this.playerLayer = new game.PlayerLayer();
            this.reverseTimeLayer = new game.ReverseTimeLayer();
            
            this.background = new game.Background();
            
            switch(this.level){
                case 0:
                    // Seekers are penalties that will follow the player if he gets too near
                    this.seeker1Count = 1;//cat
                    this.seeker2Count = 1;//pillow
                    this.seeker3Count = 0;//noodles

                    // Evaders are the ideas the player is trying to collect
                    this.evader1Count = 6;//spark
                    this.evader2Count = 5;//nucleus
                    this.evader3Count = 8;//cog

                    // Power-ups provide various bonuses
                    this.powerUp1Count = 1;//unicorn
                    this.powerUp2Count = 1;//clock
                    this.powerUp3Count = 0;//coffee
                    break;
                    
                case 1:
                    this.seeker1Count = 1;//cat
                    this.seeker2Count = 2;//pillow
                    this.seeker3Count = 1;//noodles
                    
                    this.evader1Count = 10;//spark
                    this.evader2Count = 5;//nucleus
                    this.evader3Count = 6;//cog

                    this.powerUp1Count = 0;//unicorn
                    this.powerUp2Count = 1;//clock
                    this.powerUp3Count = 1;//coffee
                    break;
                    
                case 2:
                    this.seeker1Count = 2;//cat
                    this.seeker2Count = 2;//pillow
                    this.seeker3Count = 2;//noodles

                    this.evader1Count = 14;//spark
                    this.evader2Count = 5;//nucleus
                    this.evader3Count = 4;//cog

                    this.powerUp1Count = 1;//unicorn
                    this.powerUp2Count = 0;//clock
                    this.powerUp3Count = 1;//coffee
                    break;
            }

            this.catCount = 9;//cat sprites that appear during penalty
            
            this.seekers1 = [];
            this.seekers2 = [];
            this.seekers3 = [];
            
            this.evaders1 = [];
            this.evaders2 = [];
            this.evaders3 = [];
            
            this.powerUps1 = [];
            this.powerUps2 = [];
            this.powerUps3 = [];
            
            this.cats = [];
            

            //Seekers
            for (var i=0; i< this.seeker1Count; i++){
                this.seekers1[i] = new game.Distraction1();
            }
            
            for (var i=0; i< this.seeker2Count; i++){
                this.seekers2[i] = new game.Distraction2();
            }
            
            for (var i=0; i< this.seeker3Count; i++){
                this.seekers3[i] = new game.Distraction3();
            }
            
            //Evaders
            for (var i=0; i< this.evader1Count; i++){
                this.evaders1[i] = new game.Spark();
            }
            
            for (var i=0; i< this.evader2Count; i++){
                this.evaders2[i] = new game.Nucleus();
            }
            
            for (var i=0; i< this.evader3Count; i++){
                this.evaders3[i] = new game.Cog();
            }
            
            //PowerUps
            for (var i=0; i< this.powerUp1Count; i++){
                this.powerUps1[i] = new game.PowerUp1();
            }
            
            for (var i=0; i< this.powerUp2Count; i++){
                this.powerUps2[i] = new game.PowerUp2();
            }
            
            for (var i=0; i< this.powerUp3Count; i++){
                this.powerUps3[i] = new game.PowerUp3();
            }  
            
            //Cats
            for (var i=0; i< this.catCount; i++){
                this.cats[i] = new game.Cat();
            }  
            
            this.player = new game.Player();
            
            //Cameras
            this.gameCamera = new game.GameCamera();
            this.playerCamera = new game.PlayerCamera();
            
            //HUD elements
            this.hud = new game.HUD();
            this.inputControl = new game.InputControl();
            this.pause = new game.PauseButton();
            this.energyBar1 = new game.EnergyBar1();
            this.energyBar2 = new game.EnergyBar2();
            this.energyBar3 = new game.EnergyBar3();
            this.countdown = new game.G1Countdown();
            
            //Post-processing shader effects
            this.grayFilter = new game.PIXI.GrayFilter();
            this.blurFilter = new game.PIXI.BlurFilter();
            this.noiseFilter = new App.NoiseFilter();
            this.colorFilter = new game.PIXI.ColorMatrixFilter();
            this.colorCycle = new game.ColorCycle();
            this.timeReverse = new game.TimeReverse();
            
            App.playMusic("music"+levelString, 1);
        },
        
        
        update: function(){
            
            if(App.developer) {
                App.stats.begin();
            }
            
            if(!App.paused){
                // Increment the noise shader seed
                game.scene.noiseFilter.seed += 0.1;

                // Iterate through all game objects applying their behaviours
                var i=this.seekers1.length;
                while (i--){
                    this.seekers1[i].applyBehaviours(this.seekers1);
                }

                var i=this.seekers2.length;
                while (i--){
                    this.seekers2[i].applyBehaviours(this.seekers2);
                }

                var i=this.seekers3.length;
                while (i--){
                    this.seekers3[i].applyBehaviours(this.seekers3);
                }


                var i=this.evaders1.length;
                while (i--){
                    this.evaders1[i].applyBehaviours(this.evaders1);
                }

                var i=this.evaders2.length;
                while (i--){
                    this.evaders2[i].applyBehaviours(this.evaders2);
                }

                var i=this.evaders3.length;
                while (i--){
                    this.evaders3[i].applyBehaviours(this.evaders3);   
                }


                var i=this.powerUps1.length;
                while (i--){
                    this.powerUps1[i].applyBehaviours(this.powerUps1);
                }

                var i=this.powerUps2.length;
                while (i--){
                    this.powerUps2[i].applyBehaviours(this.powerUps2);
                }

                var i=this.powerUps3.length;
                while (i--){
                    this.powerUps3[i].applyBehaviours(this.powerUps3);   
                }

                this.player.applyBehaviours();

                // Call the update function of any objects registered in the scene
                this._super();

                // Check to see if the game has finished
                if (this.countdown.ended()){
                    if(!this.ending){
                        this.ending = true;
                        this.endGameTween = new game.Tween(this.stage);
                        this.endGameTween.to({alpha:0}, 2000);
                        this.endGameTween.onComplete(this.endLevel.bind(this));
                        this.endGameTween.start();

                        game.audio.stopMusic();
                        App.playSound("end", false, 0.5);
                    }
                }
            }
            
            if(App.developer) {
                App.stats.end();
            }
            
        },
        
        mousedown: function(event_) {
            // Store the mouse position and initialise the steering control
            var tMousePos = event_.getLocalPosition(this.stage);
            this.mousePos = new game.Vector(tMousePos.x, tMousePos.y);
            
            this.inputControl.steering = true;
            this.inputControl.origin.set(this.mousePos.x, this.mousePos.y);
        },
        
        mouseup: function(event_) {
            // Pause the steering control
            this.inputControl.steering = false;
        },
        
        mousemove: function(event_){
            var tMousePos = event_.getLocalPosition(this.stage);
            this.mousePos.set(tMousePos.x, tMousePos.y);
        },

        endLevel: function(){
            // Sum the energy levels of the 3 bars and combine to calculate the score for the level
            var score = (this.energyBar1.getScore() + this.energyBar2.getScore() + this.energyBar3.getScore())/3;
            game.storage.set("game_1_score", score);
            game.system.setScene(App.Concept.Outro); 
        }
    });

    game.createScene(App.Concept.Outro, {

        backgroundColor: 0x000000,

        init: function(){
            var self = this;
            // set app name
            game.storage.set("CurrentAppName", App.generateName());
            
            // Get score
            this.score = Math.floor(game.storage.get("game_1_score")) || 0;

            // Create level object
            game.GameOutro.inject({
                init: function(){
                    this.icon = "media/concept/icon.png";
                    this.title = "You called your app";
                    this.shape = "media/concept/shape.png";
                    this.score = self.score + "%";
                    this.load();
                }
            });

            // Create
            this.gameOutro = new game.GameOutro();

        }
    });

});

