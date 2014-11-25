game.module(
    'modules.home.scenes'
)
.require(
    'engine.scene'
)
.body(function() {

    game.createScene(App.Home.Splash, {
        backgroundColor: 0x0074c5,
        init: function(){

            // Container
            this.container = new game.Container();
            //this.container.scale.set(App.deviceScale(), App.deviceScale());

            this.bg = new game.Sprite.fromImage('media/splash/splash_en.png', 1280, 720);
            this.bg.ratio = 1280/720;
            this.bg.height = (App.pY(100) > 720) ? 720 : App.pY(100);
            this.bg.width = (App.pY(100) * this.bg.ratio > 1280) ? 1280 : App.pY(100) * this.bg.ratio;
            this.bg.anchor.set(0.5, 0.5);
            this.bg.position.x = App.pX(50);
            this.bg.position.y = App.pY(50);

            this.fold = new game.Sprite.fromImage('media/splash/arrow_forward.png', 48, 48);
            this.fold.position.x = App.pX(100) - 60;
            this.fold.position.y = App.pY(100) - 60;

            this.arrow = new game.Sprite.fromImage('media/splash/page.png', 115, 115);
            this.arrow.anchor.set(1, 0);
            this.arrow.position.x = App.pX(100);
            this.arrow.position.y = 0

            this.action = new game.Graphics();
            this.action.width = App.pX(100);
            this.action.height = App.pY(100);
            this.action.interactive = true;
            this.action.hitArea = new game.PIXI.Rectangle(
                0, 0,
                App.pX(100), 
                App.pY(100)
            );
            this.action.tap = this.action.click = function(){
                App.init();
            };
            
            this.container.addChild(this.bg);
            this.container.addChild(this.arrow);
            this.container.addChild(this.fold);
            this.container.addChild(this.action);
            this.stage.addChild(this.container);

        }
    });


    game.createScene(App.Home.Main, {

        backgroundColor: 0x143559,
        buttons: [],

        init: function(){

            // Aquire game assets
            game.addAsset("pause.png");
            game.addAsset("pause_sound.png");
            game.addAsset("pause_vibrate.png");
            game.addAsset("pause_quit.png");
            game.addAsset("pause_resume.png");

            // Home
            game.addAsset("home/code.png");
            game.addAsset("home/hero.png");
            game.addAsset("home/title.png");

            // About
            game.addAsset("home/facebook.png");
            game.addAsset("home/twitter.png");
            game.addAsset("home/about_hero.png");
            game.addAsset("home/arrow_right.png");
            game.addAsset("home/arrow_left.png");
            game.addAsset("home/level_4_hero.png");

            // Credits
            game.addAsset("home/ant_b.png");
            game.addAsset("home/matt_g.png");
            game.addAsset("home/jon_w.png");

            // Levels
            game.addAsset("home/star_0.png");
            game.addAsset("home/star_1.png");
            game.addAsset("home/star_2.png");
            game.addAsset("home/star_3.png");
            game.addAsset("home/levels_level_1.png");
            game.addAsset("home/levels_level_2.png");
            game.addAsset("home/levels_level_3.png");
            game.addAsset("home/levels_level_4.png");

            // Level Intro
            game.addAsset("home/level_1_hero_fg.png");
            game.addAsset("home/level_2_hero_fg.png");
            game.addAsset("home/level_3_hero_fg.png");
            game.addAsset("home/level_1_hero_bg.png");
            game.addAsset("home/level_2_hero_bg.png");
            game.addAsset("home/level_3_hero_bg.png");
            game.addAsset("home/level_1_games.png");
            game.addAsset("home/level_2_games.png");
            game.addAsset("home/level_3_games.png");

             // Level Outro
            game.addAsset("home/level_1_outro.png");
            game.addAsset("home/level_2_outro.png");
            game.addAsset("home/level_3_outro.png");
            game.addAsset("home/quote.png");
            game.addAsset("home/stars_0.png");
            game.addAsset("home/stars_1.png");
            game.addAsset("home/stars_2.png");
            game.addAsset("home/stars_3.png");

            // Create loader
            this.loader = new game.Loader();

            // Set dynamic
            this.loader.dynamic = true;
            
            // Start loading
            this.loader.start();
           
        },

        loaded: function(){

            var titleTween, wipeTween, heroTween, 
                i, menuItems = [
                    "Play", 
                    "Get involved", 
                    "About", 
                    "Credits"
                ], NewButton = [];

            // Analytics event
            App.sendPageView('Home Screen');

            // Container
            this.container = new game.Container();
            //this.container.scale.set(App.deviceScale(), App.deviceScale());

            // Objects
            this.code = new game.Sprite('home/code.png');
            this.code.ratio = this.code.width / this.code.height;
            this.code.height = App.pY(100);
            this.code.width = this.code.height * this.code.ratio;
            this.code.position.x = 0;
            this.code.position.y = 0;

            this.title = new game.Sprite('home/title.png');
            this.title.ratio = this.title.height / this.title.width;
            this.title.width = App.pX(60);
            this.title.height = this.title.width * this.title.ratio;
            this.title.anchor.set(0.5, 0.5);
            this.title.position.x = App.pX(40);
            this.title.position.y = App.pY(30);
            this.title.oScale = this.title.scale;
            this.title.scale = { x:0, y: 0 };

            titleTween = new game.Tween(this.title.scale)
                .to({ x: this.title.oScale.x, y: this.title.oScale.y }, 250)
                .easing(game.Tween.Easing.Back.Out);

            this.hero = new game.Sprite('media/home/hero.png');
            this.hero.height = App.pY(80);
            this.hero.width = App.pY(80);
            this.hero.anchor.set(0.5, 0.5);
            this.hero.position.x = game.system.width - App.pY(40);
            this.hero.position.y = game.system.height - App.pY(40);
            this.hero.oScale = this.hero.scale;
            this.hero.scale = { x:0, y: 0 };

            heroTween = new game.Tween(this.hero.scale)
                .to({ x: this.hero.oScale.x, y: this.hero.oScale.y}, 500)
                .delay(125)
                .easing(game.Tween.Easing.Back.Out);


            // Loop through levels
            for(i = 0; i < menuItems.length; i += 1) {
                // Store
                game.HomeButton.inject({
                    init: function(){
                        this.id = i;
                        this.name = menuItems[i];
                        this.load();
                    }
                });
                NewButton = new game.HomeButton();
            }


            this.wipe = new game.Graphics();
            this.wipe.beginFill(0xce5064); 
            this.wipe.drawRect(0, 0, App.pX(100), App.pX(500));
            this.wipe.position.x = 0;
            this.wipe.position.y = 0;
            wipeTween = new game.Tween(this.wipe).to({ alpha: 0 }, 500);

            this.container.addChild(this.code);
            this.container.addChild(this.hero);
            this.container.addChild(this.title);
            this.container.addChild(this.wipe);

            this.stage.addChild(this.container);
            heroTween.start();
            titleTween.start();
            wipeTween.start();

        },

        update: function() {

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

    game.createScene(App.Home.Levels, {

        backgroundColor: 0x143559,
        targetPosition: 0,
        buttons: [],

        init: function(){

            var i, k = 0, NewButton, wipeTween;

            // Analytics event
            App.sendPageView('Level Select');

            // Container
            this.container = new game.Container();
            //this.container.scale.set(App.deviceScale(), App.deviceScale());

            // Swipes
            this.swipeDist = App.pX(10);

            // List of Levels
            App.LevelList = App.getLevelList();

            // Create buttons
            this.stages = new game.Stages();

            // Loop through levels
            for(i = 0; i < App.LevelList.length; i += 1) {

                
                // Create level object
                game.StageButton.inject({
                    init: function(){
                        this.id = i;
                        this.idx = k;
                        this.name = App.LevelList[i].name;
                        this.title = App.LevelList[i].title;
                        this.games = App.LevelList[i].games;
                        this.rating = App.LevelList[i].rating;
                        this.unlocked = App.LevelList[i].unlocked;
                        this.load();
                    }
                });
                // Store
                NewButton = new game.StageButton();
                // New column
                k += 1;

            }

            this.back = new game.PIXI.Sprite.fromImage("media/home/back.png");
            this.back.width = 48;
            this.back.height = 48;
            this.back.position.x = 24;
            this.back.position.y = 24;
            this.back.interactive = true;
            this.back.hitArea = new game.PIXI.Rectangle(0,0,96,96);
            this.back.tap = this.back.click = function(){
                App.buttonClick(game.scene.wipe, "wipe", "goHome");
            };

            this.wipe = new game.Graphics();
            this.wipe.beginFill(0xce5064); 
            this.wipe.drawRect(0, 0, App.pX(100), App.pY(500));
            this.wipe.position.x = 0;
            this.wipe.position.y = 0;
            wipeTween = new game.Tween(this.wipe)
                .to({ alpha: 0 }, 500);

            this.container.addChild(this.back);
            this.container.addChild(this.wipe);
            this.stage.addChild(this.container);
            wipeTween.start();

        },

        update: function() {

            this._super();

        },

        swipe: function(direction){

            // Check for movement
            if(!this.movement) {

                // Set direction
                this.direction = direction;

            }

        }
    });

    game.createScene(App.Home.About, {

        backgroundColor: 0x143559,
        startPosition:0,

        init: function(){

            // Analytics event
            App.sendPageView('About');

            // Container
            this.container = new game.Container();
            //this.container.scale.set(App.deviceScale(), App.deviceScale());

            this.back = new game.PIXI.Sprite.fromImage("media/home/back.png");
            this.back.width = 48;
            this.back.height = 48;
            this.back.position.x = 24;
            this.back.position.y = 24;
            this.back.interactive = true;
            this.back.hitArea = new game.PIXI.Rectangle(0,0,96,96);
            this.back.tint = 0xFFFFFF;
            this.back.tap = this.back.click = function(){
                App.buttonClick(game.scene.wipe, "wipe", "setScene", App.Home.Main);
            };

            this.text1 = new game.Text("About the app".toUpperCase(), { fill: "white", font: 'bold '+App.pX(5)+'px sans-serif' } );
            this.text1.anchor.set(0.5, 0.5);
            this.text1.position.x = App.pX(50);
            this.text1.position.y = App.pY(15);

            this.carousel_position = 0;

            this.text2 = new game.Text("Intel challenged a small team of developers to build an open source app. They created Dev Story/*HACK THE CODE*/, a set of mini-challenges about the development cycle of an app. But it’s not finished yet.\n\nYou’ve downloaded the app. Now it’s over to you...\n\nWe’re bringing developers together from around the world to build something special and unique. So whether you’re honing your skills or flexing your coding muscles, you can modify and shape the open source code however you choose.\n\nIf your code makes the cut, you’ll see it in the next update. And you’ll take the credit.\n\nTo get involved, head to the Intel® Developer Zone where the code is available to download. You’ll also find free tools, tutorials and support from a network of Android developers.\n\nWe can’t wait to see what you create.", { fill: "white", font: App.pX(2.5)+'px sans-serif', wordWrap: true, wordWrapWidth: App.pX(75) } );
            this.text2.position.x = App.pX(50) - (this.text2.width / 2);
            this.text2.position.y = this.text1.position.y + this.text1.height + App.pY(5);

            this.text3 = new game.Text( "Let’s go".toUpperCase(), { fill: "white", font: 'bold '+App.pX(5)+'px sans-serif' } );
            this.text3.tint = 0xce5064;
            this.text3.position.x = App.pX(50) - (this.text3.width / 2);
            this.text3.position.y = this.text2.position.y + this.text2.height + App.pY(5);
       
            this.button = new game.Graphics();
            this.button.beginFill(this.colour4); 
            this.button.drawRect(0, 0, this.text3.width + 48, this.text3.height + 24);
            this.button.position.x = this.text3.position.x - 24;
            this.button.position.y = this.text3.position.y - 16;
            this.button.interactive = true;
            this.button.hitArea = new game.PIXI.Rectangle(0, 0, this.text3.width + 48, this.text3.height + 24);
            this.button.tap = this.button.click = function() {
                // Play level
                App.transition(game.scene.wipe, "setScene", App.Home.Levels);
                
            };
            this.button.alpha = 0;           

            this.facebook = new game.PIXI.Sprite.fromImage("media/home/facebook.png");
            this.facebook.anchor.set(0.5,0.5);
            this.facebook.width = App.pX(5);
            this.facebook.height = App.pX(5);
            this.facebook.position.x = App.pX(90);
            this.facebook.position.y = this.text2.position.y + this.text2.height + App.pY(8);
            this.facebook.interactive = true;
            this.facebook.hitArea = new game.PIXI.Rectangle(-40, -40, 80, 80);
            this.facebook.tap = this.facebook.click = this.share_facebook.bind(this);

            this.twitter = new game.PIXI.Sprite.fromImage("media/home/twitter.png");
            this.twitter.anchor.set(0.5,0.5);
            this.twitter.width = App.pX(5);
            this.twitter.height = App.pX(5);
            this.twitter.position.x = this.facebook.position.x - this.twitter.width - App.pX(2);
            this.twitter.position.y = this.text2.position.y + this.text2.height + App.pY(8);
            this.twitter.interactive = true;
            this.twitter.hitArea = new game.PIXI.Rectangle(-40, -40, 80, 80);
            this.twitter.tap = this.twitter.click = this.share_twitter.bind(this);

            this.scrollbar = new game.Graphics();
            this.scrollbar.beginFill(0xFFFFFF);
            this.scrollbar.drawRect(0, 0, App.pX(1), App.pY(20));
            this.scrollbar.endFill();
            this.scrollbar.position.x = App.pX(99);
            this.scrollbar.position.y = 0;
            this.scrollbar.alpha = 0.5;

            this.wipe = new game.Graphics();
            this.wipe.beginFill(0xce5064); 
            this.wipe.drawRect(0, 0, App.pX(100), App.pY(500));
            this.wipe.position.x = 0;
            this.wipe.position.y = 0;
            var wipeTween = new game.Tween(this.wipe).to({ alpha: 0 }, 500);

            this.container.addChild(this.text1);
            this.container.addChild(this.text2);
            this.container.addChild(this.text3);

            this.container.addChild(this.facebook);
            this.container.addChild(this.twitter);

            this.container.addChild(this.scrollbar);
            this.container.addChild(this.button);
            this.container.addChild(this.back);
            this.container.addChild(this.wipe);
            this.stage.addChild(this.container);

            this.stageHeight = this.text2.position.y + this.text2.height + App.pY(20);

            // Recaclculate stage height
            if(this.stageHeight >= App.pY(100)) {
                this.stageHeight -= App.pY(100);
            }

            this.remainingHeight = App.pY(100) - this.scrollbar.height;

            wipeTween.start();

        },

        share_twitter: function(){
            
            var shareUrl = "https://twitter.com/share?";
                shareUrl += "url=http://intel.ly/1pRAKWA";
                shareUrl += "&text="+encodeURIComponent("I'm playing Dev Story/*HACK THE CODE*/, it's open source! Play it, hack it, help build v2! #IntelAndroid");

            window.open(shareUrl, '_system');

        },

        share_facebook: function(){

            // Get involved
            var shareUrl = "https://www.facebook.com/dialog/feed?";
                shareUrl += "app_id=692903567464031";
                shareUrl += "&display=popup";
                shareUrl += "&picture=http://int-android.mrmpweb.co.uk/share.png";
                shareUrl += "&actions={ name: 'Dev Story/*HACK THE CODE*/', link: 'http://www.google.com' }";
                shareUrl += "&link=https://software.intel.com/";
                shareUrl += "&description="+ encodeURIComponent("I’ve just been playing Dev Story/*HACK THE CODE*/ the open-source app led by the dev community! To get involved, head to the Intel® Developer Zone, download the code and start building your own levels and mini-challenges! #IntelAndroid");
                shareUrl += "&redirect_uri=https://software.intel.com/";

            // Open share
            window.open(shareUrl, '_system');

        },

        update: function(){

            this._super();

            // Check for movement
            if(this.movement) {

                // Move container
                this.container.position.y = -this.movementY;
                this.scrollbar.position.y = this.movementY + (this.remainingHeight * (this.movementY / this.stageHeight));

            }

        },

        mousedown: function(data){

            // Set movement flag
            this.movement = true;

            // Save initial position
            this.initialY = this.startPosition + data.global.y;

            // Set movement flag position
            this.movementY = this.startPosition;

        },

        mousemove: function(data){

            // Update movement flag
            this.movementY = this.initialY - data.global.y;

            // Prevent movment up
            if(this.movementY < 0) {
                this.movementY = 0;
            }

            // Prevemtn movement down
            if(this.movementY > this.stageHeight) {
                this.movementY = this.stageHeight;
            }

        },

        mouseup: function(data){

            // Set movement to false
            this.movement = false;

            // Save start position
            this.startPosition = this.movementY;

        }

    });

    game.createScene(App.Home.OverallGameIntro, {

        backgroundColor: 0x143559,

        init: function(){

            var self = this, heroTween, wipeTween;
            
            // Get current level
            this.level = game.storage.get("CurrentLevel");

            // Analytics event
            App.sendPageView('Overall Intro Screen');

            // Container
            this.container = new game.Container();
            //this.container.scale.set(App.deviceScale(), App.deviceScale());

            this.games = App.LevelList[this.level].games;

            // Set colours
            this.colour1 = App.LevelList[this.level].palette[0]; // Dark
            this.colour2 = App.LevelList[this.level].palette[1]; // Med
            this.colour3 = App.LevelList[this.level].palette[2]; // Primary
            this.colour4 = App.LevelList[this.level].palette[3]; // Text

            // Set bg colour
            game.system.stage.setBackgroundColor(this.colour1);
            
            this.back = new game.PIXI.Sprite.fromImage("media/home/back.png");
            this.back.width = 48;
            this.back.height = 48;
            this.back.position.x = 24;
            this.back.position.y = 24;
            this.back.interactive = true;
            this.back.hitArea = new game.PIXI.Rectangle(0,0,96,96);
            this.back.tint = 0xFFFFFF;
            this.back.tap = this.back.click = function(){
                App.buttonClick(game.scene.wipe, "wipe", "setScene", App.Home.Main);
            };

            this.text2 = new game.Text("You’re a kick ass developer. The rest of the world just doesn’t know it yet. It’s time to get your killer app out there. But you’ve got to build it from scratch and that’s easier said than done. Have you got what it takes to make it a worldwide success? It’s all down to you.", { fill: "white", font: App.pX(3)+'px sans-serif', align: "center", wordWrap: true, wordWrapWidth: App.pX(66) } );
            this.text2.position.x = App.pX(50) - (this.text2.width / 2);
            this.text2.position.y = App.pY(35) - (this.text2.height / 2);

            this.text3 = new game.Text( "Continue".toUpperCase(), { fill: "white", font: 'bold '+App.pX(5)+'px sans-serif' } );
            this.text3.tint = 0xce5064;
            this.text3.position.x = App.pX(50) - (this.text3.width / 2);
            this.text3.position.y = this.text2.position.y + this.text2.height + App.pY(5);
       
            this.button = new game.Graphics();
            this.button.beginFill(this.colour4); 
            this.button.drawRect(0, 0, this.text3.width + 48, this.text3.height + 24);
            this.button.position.x = this.text3.position.x - 24;
            this.button.position.y = this.text3.position.y - 16;
            this.button.interactive = true;
            this.button.hitArea = new game.PIXI.Rectangle(0, 0, this.text3.width + 48, this.text3.height + 24);
            this.button.tap = this.button.click = function() {
                
                // Analytics event
                App.sendEvent('Game Intro', 'click', 'Continue');

                // Play level
                App.playGame(self.games[0]);

            };
            this.button.alpha = 0;

            this.hero = new game.Sprite("home/about_hero.png");
            this.hero.width = App.pX(25);
            this.hero.height = App.pX(25);
            this.hero.anchor.set(0.5, 1);
            this.hero.oScale = this.hero.scale;
            this.hero.position.x = App.pX(50);
            this.hero.position.y = App.pY(100);
            this.hero.scale = { x: 0, y: 0 };
            heroTween = new game.Tween(this.hero.scale)
                .to({ x: this.hero.oScale.x, y: this.hero.oScale.y }, 250)
                .easing(game.Tween.Easing.Back.Out);

            this.wipe = new game.Graphics();
            this.wipe.beginFill(0xce5064); 
            this.wipe.drawRect(0, 0, App.pX(100), App.pY(500));
            this.wipe.position.x = 0;
            this.wipe.position.y = 0;
            wipeTween = new game.Tween(this.wipe).to({ alpha: 0 }, 500);

            this.container.addChild(this.text2);
            this.container.addChild(this.text3);
            this.container.addChild(this.button);
            this.container.addChild(this.hero);
            this.container.addChild(this.back);
            this.container.addChild(this.wipe);
            this.stage.addChild(this.container);
            wipeTween.chain(heroTween).start();
        }
    });

    game.createScene(App.Home.GameCredits, {

        backgroundColor: 0xf5f3e4,
        startPosition:0,
        stageHeight: 0,

        init: function(){

            var wipeTween, i, j, superstars = [
                ["Levels 1-3", [
                    ["Anthony Brooks", "Developer", "ant_b"],
                    ["Matthew Greenhalgh", "Developer", "matt_g"],
                    ["Jon Wells", "Art Director", "jon_w"]
                ]]/*,
                ["Level 4", [
                    ["Anthony Brooks", "Developer", "ant_b"],
                    ["Matthew Greenhalgh", "Developer", "matt_g"],
                    ["Jonny Wells", "Art Director", "ant_b"],
                    ["Oliver Easthope", "Copywriter", "ant_b"]
                ]],
                ["Level 4", [
                    ["Anthony Brooks", "Developer", "ant_b"],
                    ["Matthew Greenhalgh", "Developer", "matt_g"],
                    ["Jonny Wells", "Art Director", "ant_b"],
                    ["Oliver Easthope", "Copywriter", "ant_b"]
                ]]*/
            ];

            // Analytics event
            App.sendPageView('Credits');

            // Container
            this.container = new game.Container();
            //this.container.scale.set(App.deviceScale(), App.deviceScale());

            this.back = new game.PIXI.Sprite.fromImage("media/home/back.png");
            this.back.width = 48;
            this.back.height = 48;
            this.back.position.x = 24;
            this.back.position.y = 24;
            this.back.interactive = true;
            this.back.hitArea = new game.PIXI.Rectangle(0,0,96,96);
            this.back.tint = 0x143559;
            this.back.tap = this.back.click = function(){
                App.buttonClick(game.scene.wipe, "wipe", "setScene", App.Home.Main);
            };

            this.text1 = new game.Text("Meet the team".toUpperCase(), { fill: "white", font: 'bold '+App.pX(5)+'px sans-serif', align: "center", wordWrap: true, wordWrapWidth: ((game.system.width / App.deviceScale()) / 1.2) } );
            this.text1.anchor.set(0.5, 0.5);
            this.text1.position.x = App.pX(50);
            this.text1.position.y = App.pY(15);
            this.text1.tint = 0xce5064;

            var person, name, role, row = 0, section_title, section_keyline;

            // Loop through credits
            for(j = 0; j < superstars.length; j += 1) {
                
                row = 0;

                // Set name
                section_title = new game.Text(superstars[j][0], { fill: "white", font: 'bold '+App.pX(3)+'px sans-serif' } );
                section_title.position.x = App.pX(5);
                section_title.position.y = this.text1.position.y + this.text1.height + App.pX(5) + this.stageHeight;
                section_title.tint = 0x143559;

                // Set line
                section_keyline = new game.Graphics();
                section_keyline.beginFill(0x143559);
                section_keyline.drawRect(0, 0, App.pX(90), App.pY(1));
                section_keyline.endFill();
                section_keyline.position.x = App.pX(5);
                section_keyline.position.y = section_title.position.y + section_title.height +  App.pY(3);
                
                // Add to container
                this.container.addChild(section_title);
                this.container.addChild(section_keyline);

                // Loop through names
                for(i = 0; i < superstars[j][1].length; i += 1) {

                    // Set row number
                    if(i % 2 === 0) {
                        row += 1;
                    }

                    // Set person avatar
                    person = new game.Sprite("home/"+ superstars[j][1][i][2] +".png");
                    person.anchor.set(0, 0);
                    person.width = App.pX(16);
                    person.height = App.pX(16);
                    person.position.x = App.pX(5) + (App.pX(45) * (i % 2));
                    person.position.y = section_keyline.position.y + (row * App.pX(3)) + ((person.height) * (row-1));

                    // Set person name
                    name = new game.Text(superstars[j][1][i][0], { align: "left", fill: "white", font: '24px sans-serif' });
                    name.position.x = 140;
                    name.position.y = 48;
                    name.tint = 0x143559;

                    // Set person role
                    role = new game.Text(superstars[j][1][i][1], { align: "left", fill: "white", font: '24px sans-serif' });
                    role.position.x = 140;
                    role.position.y = name.position.y + name.height + 5;
                    role.tint = 0xce5064;
            
                    // Calculate stage height for later
                    this.stageHeight = person.position.y + person.height + App.pY(10);

                    // Add person
                    person.addChild(name);
                    person.addChild(role);

                    // Add to stage
                    this.container.addChild(person);

                }


            }

            // Create scrollbar
            this.scrollbar = new game.Graphics();
            this.scrollbar.beginFill(0x143559);
            this.scrollbar.drawRect(0, 0, App.pX(1), App.pY(20));
            this.scrollbar.endFill();
            this.scrollbar.position.x = App.pX(99);
            this.scrollbar.position.y = 0;

            // Create screen wipe
            this.wipe = new game.Graphics();
            this.wipe.beginFill(0xce5064); 
            this.wipe.drawRect(0, 0, App.pX(100), App.pY(500));
            this.wipe.position.x = 0;
            this.wipe.position.y = 0;
            wipeTween = new game.Tween(this.wipe).to({ alpha: 0 }, 500);

            // Add to stage
            this.container.addChild(this.text1);
            this.container.addChild(this.back);
            this.container.addChild(this.scrollbar);
            this.container.addChild(this.wipe);
            this.stage.addChild(this.container);

            // Recaclculate stage height
            if(this.stageHeight >= App.pY(100)) {
                this.stageHeight -= App.pY(100);
            }

            // Calculate remaining height
            this.remainingHeight = App.pY(100) - this.scrollbar.height;

            // Start wipe animation
            wipeTween.start();

        },

        update: function(){

            this._super();

            // Check for movement
            if(this.movement) {

                // Move stage container
                this.container.position.y = -this.movementY;
                this.scrollbar.position.y = this.movementY + (this.remainingHeight * (this.movementY / this.stageHeight));

            }

        },

        mousedown: function(data){

            // Flag movement
            this.movement = true;

            // Save initial position
            this.initialY = this.startPosition + data.global.y;

            // Set movement flag
            this.movementY = this.startPosition;

        },

        mousemove: function(data){

            // Update movement flag
            this.movementY = this.initialY - data.global.y;

            // Stop movement up
            if(this.movementY < 0) {
                this.movementY = 0;
            }

            // Stop movement down
            if(this.movementY > this.stageHeight) {
                this.movementY = this.stageHeight;
            }

        },

        mouseup: function(data){

            // Flag movement
            this.movement = false;

            // Set initial start position
            this.startPosition = this.movementY;

        }

    });

    game.createScene(App.Home.GetInvolved, {

        backgroundColor: 0x143559,

        init: function(){

            var heroTween, wipeTween;

            // Analytics event
            App.sendPageView('Get Involved');

            // Container
            this.container = new game.Container();
            //this.container.scale.set(App.deviceScale(), App.deviceScale());

            // Set colours
            this.colour1 = 0x143559; // Dark
            this.colour2 = 0x143559; // Med
            this.colour3 = 0xce5064; // Primary
            this.colour4 = 0xFFFFFF; // Text

            // Set bg colour
            game.system.stage.setBackgroundColor(this.colour1);

            this.text1 = new game.Text("It's your turn".toUpperCase(), { fill: "white", font: 'bold '+App.pX(5)+'px sans-serif' } );
            this.text1.anchor.set(0.5, 0.5);
            this.text1.position.x = App.pX(50);
            this.text1.position.y = App.pY(15);
            this.text1.tint = this.colour4;

            this.text2 = new game.Text("Want to be part of Dev Story/*HACK THE CODE*/? We want you to take the reins (and the credit). Here's how.", { fill: "white", font: App.pX(2.5)+'px sans-serif', align: "center", wordWrap: true, wordWrapWidth: App.pX(50) } );
            this.text2.position.x = App.pX(33) - (this.text2.width / 2);
            this.text2.position.y = this.text1.position.y + this.text1.height + 48;
            this.text2.tint = this.colour4;

            this.hero = new game.Sprite("media/home/level_4_hero.png");
            this.hero.width = App.pY(80);
            this.hero.height = App.pY(80);
            this.hero.oScale = this.hero.scale;
            this.hero.anchor.set(0.5, 1);
            this.hero.position.x = App.pX(75);
            this.hero.position.y = App.pY(100);
            this.hero.scale = { x: 0, y: 0 };

            heroTween = new game.Tween(this.hero.scale)
                .to({ x: this.hero.oScale.x, y: this.hero.oScale.y }, 250)
                .easing(game.Tween.Easing.Back.Out);

            this.back = new game.PIXI.Sprite.fromImage("media/home/back.png");
            this.back.width = 48;
            this.back.height = 48;
            this.back.position.x = 24;
            this.back.position.y = 24;
            this.back.interactive = true;
            this.back.hitArea = new game.PIXI.Rectangle(0,0,96,96);
            this.back.tint = this.colour4;
            this.back.tap = this.back.click = function(){
                App.buttonClick(game.scene.wipe, "wipe", "setScene", App.Home.Main);
            };

            /* Carousel */
            this.carousel_position = 0;

            this.step1 = new game.Text("Visit the Intel® Developer Zone and download the code.", { 
                fill: "white",  font: App.pX(2.5)+'px sans-serif',  align: "center", wordWrap: true, 
                wordWrapWidth: App.pX(33) 
            });
            this.step1.position.x = App.pX(33) - (this.step1.width / 2);
            this.step1.position.y = this.text2.position.y + this.text2.height + App.pY(15) - (this.step1.height / 2);

            this.step2 = new game.Text("Build your new levels, mini challenges and mods.", { 
                fill: "white",  font: App.pX(2.5)+'px sans-serif',  align: "center", wordWrap: true, 
                wordWrapWidth: App.pX(33) 
            });
            this.step2.position.x = App.pX(33) - (this.step2.width / 2);
            this.step2.position.y = this.text2.position.y + this.text2.height + App.pY(15) - (this.step2.height / 2);
            this.step2.alpha = 0;

            this.step3 = new game.Text("Share your ideas with us. If any of them make it into version 2.0, you’ll get the credit!", { 
                fill: "white",  font: App.pX(2.5)+'px sans-serif',  align: "center", wordWrap: true, 
                wordWrapWidth: App.pX(33) 
            });
            this.step3.position.x = App.pX(33) - (this.step3.width / 2);
            this.step3.position.y = this.text2.position.y + this.text2.height + App.pY(15) - (this.step3.height / 2);
            this.step3.alpha = 0;

            this.pip1 = new game.PIXI.Graphics();
            this.pip1.beginFill(this.colour4); 
            this.pip1.drawCircle(0, 0, App.pX(0.75));
            this.pip1.endFill();
            this.pip1.position.x = App.pX(30);
            this.pip1.position.y = this.step3.position.y + this.step3.height + App.pY(5);

            this.pip2 = new game.PIXI.Graphics();
            this.pip2.beginFill(this.colour4); 
            this.pip2.drawCircle(0, 0, App.pX(0.75));
            this.pip2.endFill();
            this.pip2.position.x = App.pX(33);
            this.pip2.position.y = this.step3.position.y + this.step3.height + App.pY(5);
            this.pip2.alpha = 0.25;

            this.pip3 = new game.PIXI.Graphics();
            this.pip3.beginFill(this.colour4); 
            this.pip3.drawCircle(0, 0, App.pX(0.75));
            this.pip3.endFill();
            this.pip3.position.x = App.pX(36);
            this.pip3.position.y = this.step3.position.y + this.step3.height + App.pY(5);
            this.pip3.alpha = 0.25;

            this.arrow_right = new game.PIXI.Sprite.fromImage("media/home/arrow_right.png");
            this.arrow_right.anchor.set(0.5,0.5);
            this.arrow_right.width = App.pX(5);
            this.arrow_right.height = App.pX(5);
            this.arrow_right.position.x = App.pX(55);
            this.arrow_right.position.y = this.step2.position.y + (this.step2.height / 2);
            this.arrow_right.interactive = true;
            this.arrow_right.alpha = 1;
            this.arrow_right.hitArea = new game.PIXI.Rectangle(-30,-30,60,60);
            this.arrow_right.tap = this.arrow_right.click = this.carousel_right.bind(this);

            this.arrow_left = new game.PIXI.Sprite.fromImage("media/home/arrow_left.png");
            this.arrow_left.anchor.set(0.5,0.5);
            this.arrow_left.width = App.pX(5);
            this.arrow_left.height = App.pX(5);
            this.arrow_left.position.x = App.pX(11);
            this.arrow_left.position.y = this.step2.position.y + (this.step2.height / 2);
            this.arrow_left.interactive = true;
            this.arrow_left.alpha = 0.25;
            this.arrow_left.hitArea = new game.PIXI.Rectangle(-30,-30,60,60);
            this.arrow_left.tap = this.arrow_left.click = this.carousel_left.bind(this);

            this.text3 = new game.Text( "Let’s go".toUpperCase(), { fill: "white", font: 'bold '+App.pX(5)+'px sans-serif' } );
            this.text3.tint = this.colour3;
            this.text3.position.x = App.pX(33) - (this.text3.width / 2);
            this.text3.position.y = this.pip1.position.y + this.pip1.height + App.pY(5);

            this.button = new game.Graphics();
            this.button.beginFill(this.colour4); 
            App.roundRect(this.button, 0, 0, this.text3.width + 64, this.text3.height + 24, 24, 24, 24, 24);
            this.button.position.x = this.text3.position.x - 32;
            this.button.position.y = this.text3.position.y - 16;
            this.button.interactive = true;
            this.button.hitArea = new game.PIXI.Rectangle(0, 0, this.text3.width + 48, this.text3.height + 24);
            this.button.tap = this.button.click = function() {

                // Play level
                App.sendEvent('Get Involved', 'click', 'Lets go');
                App.buttonClick(this, "flash", "goTo", "http://intel.ly/1pRAKWA");
                
            };
            this.button.alpha = 0;

            this.wipe = new game.Graphics();
            this.wipe.beginFill(0xce5064); 
            this.wipe.drawRect(0, 0, App.pX(100), App.pY(500));
            this.wipe.position.x = 0;
            this.wipe.position.y = 0;
            wipeTween = new game.Tween(this.wipe).to({ alpha: 0 }, 500);

            this.container.addChild(this.hero);
            this.container.addChild(this.text1);
            this.container.addChild(this.text2);
            this.container.addChild(this.button);
            this.container.addChild(this.text3);
            this.container.addChild(this.back);
            this.container.addChild(this.step1);
            this.container.addChild(this.step2);
            this.container.addChild(this.step3);
            this.container.addChild(this.pip1);
            this.container.addChild(this.pip2);
            this.container.addChild(this.pip3);
            this.container.addChild(this.arrow_right);
            this.container.addChild(this.arrow_left);
            this.container.addChild(this.wipe);

            this.stage.addChild(this.container);
            wipeTween.chain(heroTween).start();

        },

        carousel_left: function(){

            // If there is a place to move to
            if(this.carousel_position > 0) {

                // set carousel position
                this.carousel_position -= 1;
            }

            // If position 0
            if(this.carousel_position === 0) {

                // Set visibility settings
                this.arrow_left.alpha = 0.25;
                this.arrow_right.alpha = 1;
                this.step1.alpha = 1;
                this.step2.alpha = 0;
                this.step3.alpha = 0;
                this.pip1.alpha = 1;
                this.pip2.alpha = 0.25;
                this.pip3.alpha = 0.25;

            } 

            // If position 1
            if(this.carousel_position === 1) {
               
                // Set visibility settings
                this.arrow_left.alpha = 1;
                this.arrow_right.alpha = 1;
                this.step1.alpha = 0;
                this.step2.alpha = 1;
                this.step3.alpha = 0;
                this.pip1.alpha = 0.25;
                this.pip2.alpha = 1;
                this.pip3.alpha = 0.25;

            }

        },

        carousel_right: function(){

            // If there is room to move into
            if(this.carousel_position < 2) {

                // Add to carousel position
                this.carousel_position += 1;

            }

            // If position 1
            if(this.carousel_position === 1) {

                // Set visibility settings
                this.arrow_left.alpha = 1;
                this.arrow_right.alpha = 1;
                this.step1.alpha = 0;
                this.step2.alpha = 1;
                this.step3.alpha = 0;
                this.pip1.alpha = 0.25;
                this.pip2.alpha = 1;
                this.pip3.alpha = 0.25;
            }

            // If position 2
            if(this.carousel_position === 2) {

                // Set position settings
                this.arrow_right.alpha = 0.25;
                this.arrow_left.alpha = 1;
                this.step1.alpha = 0;
                this.step2.alpha = 0;
                this.step3.alpha = 1;
                this.pip1.alpha = 0.25;
                this.pip2.alpha = 0.25;
                this.pip3.alpha = 1;

            }

        },

        swipe: function(direction){

            // If there isnt any movement
            if(!this.movement) {

                // Flag movement
                this.movement = true;

                // Set direction
                this.direction = direction;

            }

        },

        update: function(){

            this._super();

            // Check for movement
            if(this.movement) {

                // Check direction
                if(this.direction === "right") {

                    // move carousel
                    this.carousel_left();
                }

                // Check direction
                if(this.direction === "left") {

                    // move carousel
                    this.carousel_right();
                }

                // unflag movement
                this.movement = false;

            }
        }

    });

    game.createScene(App.Home.LevelIntro, {

        backgroundColor: 0x143559,

        init: function(){

            var self = this, heroBgTween, heroFgTween, wipeTween;

            // Get level list
            App.LevelList = App.getLevelList();

            // Container
            this.container = new game.Container();
            //this.container.scale.set(App.deviceScale(), App.deviceScale());

            // Get Data
            this.level = game.storage.get("CurrentLevel");
            this.games = App.LevelList[this.level].games;
            this.name = App.LevelList[this.level].name;
            this.rating = App.LevelList[this.level].rating;
            this.title = App.LevelList[this.level].title;
            this.description = App.LevelList[this.level].description;

            // Analytics event
            App.sendPageView('Level '+ (this.level+1) +' Intro Screen');

            // Set colours
            this.colour1 = App.LevelList[this.level].palette[0]; // Dark
            this.colour2 = App.LevelList[this.level].palette[1]; // Med
            this.colour3 = App.LevelList[this.level].palette[2]; // Primary
            this.colour4 = App.LevelList[this.level].palette[3]; // Text

            // Set bg colour
            game.system.stage.setBackgroundColor(this.colour1);

            this.bottom = new game.Graphics();
            this.bottom.beginFill(this.colour2); 
            this.bottom.drawRect(0, App.pY(95), App.pX(100), App.pY(5));
            this.bottom.endFill();

            this.text4 = new game.Text( "High Score: " + this.rating + "%", { fill: "white", font: App.pX(3)+'px sans-serif' } );
            this.text4.position.x = App.pX(97) - this.text4.width;
            this.text4.position.y = App.pY(5);
            this.text4.tint = this.colour4;

            if(this.rating > 70) {
                this.wreath = new game.Sprite("home/star_3.png");
            } else if(this.rating > 60) {
                this.wreath = new game.Sprite("home/star_2.png");
            } else if(this.rating > 50) {
                this.wreath = new game.Sprite("home/star_1.png");
            } else {
                this.wreath = new game.Sprite("home/star_0.png");
            }

            this.wreath.width = App.pX(10);
            this.wreath.height = App.pX(10);
            this.wreath.position.x = App.pX(25) - (this.wreath.width / 2);
            this.wreath.position.y = App.pY(5);
            this.wreath.tint = this.colour4;

            this.text1 = new game.Text( this.name, { fill: "white", font: 'bold '+App.pX(3)+'px sans-serif' } );
            this.text1.position.x = App.pX(25) - (this.text1.width / 2);
            this.text1.position.y = this.wreath.position.y + this.wreath.height + App.pY(2);
            this.text1.tint = this.colour4;

            this.text2 = new game.Text( this.title, { fill: "white", font: App.pX(3)+'px sans-serif' } );
            this.text2.position.x = App.pX(25) - (this.text2.width / 2);
            this.text2.position.y = this.text1.position.y + this.text1.height + App.pY(2);
            this.text2.tint = this.colour4;

            this.text5 = new game.Text( this.description, { fill: "white", align: "center", font: App.pX(2.5)+'px sans-serif', wordWrap: true, wordWrapWidth: App.pX(40) } );
            this.text5.position.x = App.pX(25) - (this.text5.width / 2);
            this.text5.position.y = this.text2.position.y + this.text2.height + App.pY(10);
            this.text5.tint = this.colour4;

            this.keyline = new game.Graphics();
            this.keyline.beginFill(this.colour4); 
            this.keyline.drawRect(
                App.pX(25) - (this.text5.width / 2), 
                this.text2.position.y + this.text2.height  + App.pY(5), 
                this.text5.width, 
                App.pY(0.25)
            );

            this.keyline.endFill();

            this.icons = new game.Sprite("home/level_"+(this.level+1)+"_games.png");
            this.icons.width = App.pX(30);
            this.icons.height = App.pX(30);
            this.icons.position.x = App.pX(25) - (this.icons.width / 2);
            this.icons.position.y = this.text5.position.y + this.text5.height + App.pY(10) - (this.icons.height / 2);

            this.text3 = new game.Text( "Play".toUpperCase(), { fill: "white", font: 'bold '+App.pX(5)+'px sans-serif' } );
            this.text3.tint = this.colour3;
            this.text3.position.x = App.pX(25) - (this.text3.width / 2);
            this.text3.position.y = this.icons.position.y + (this.icons.height / 2) + App.pY(15);

            this.button = new game.Graphics();
            this.button.beginFill(this.colour2); 
            this.button.drawRect(0, 0, this.text3.width + 48, this.text3.height + 24);
            this.button.position.x = this.text3.position.x - 24;
            this.button.position.y = this.text3.position.y - 16;
            this.button.interactive = true;
            this.button.hitArea = new game.PIXI.Rectangle(0, 0, this.text3.width + 48, this.text3.height + 24);
            this.button.tap = this.button.click = function() {

                // Play level
                App.sendEvent('Level '+ (self.level + 1) +' Intro', 'click', 'Play');

                if(self.level === 0) {
                    App.buttonClick(game.scene.wipe, "wipe", "setScene", App.Home.OverallGameIntro);
                } else {
                    App.playGame(self.games[0]);
                }

            };

            this.button.alpha = 0;

            this.heroBg = new game.Sprite("media/home/level_"+(this.level+1)+"_hero_bg.png");
            this.heroBg.anchor.set(0,1);
            this.heroBg.width = App.pX(60);
            this.heroBg.height = App.pX(60);
            this.heroBg.position.x = App.pX(100);
            this.heroBg.position.y = App.pY(100);

            heroBgTween = new game.Tween(this.heroBg.position);
            heroBgTween.to({ x: App.pX(45) }, 1500).easing(game.Tween.Easing.Quartic.Out);

            this.heroFg = new game.Sprite("home/level_"+(this.level+1)+"_hero_fg.png");
            this.heroFg.anchor.set(0,1);
            this.heroFg.height = App.pX(60);
            this.heroFg.width = App.pX(60);
            this.heroFg.position.x = App.pX(130);
            this.heroFg.position.y = App.pY(100);

            heroFgTween = new game.Tween(this.heroFg.position);
            heroFgTween.to({ x: App.pX(45) }, 1500).easing(game.Tween.Easing.Quartic.Out);

            this.back = new game.PIXI.Sprite.fromImage("media/home/back.png");
            this.back.width = 48;
            this.back.height = 48;
            this.back.position.x = 24;
            this.back.position.y = 24;
            this.back.interactive = true;
            this.back.hitArea = new game.PIXI.Rectangle(0,0,96,96);
            this.back.tint = this.colour4;
            this.back.tap = this.back.click = function(){
                App.buttonClick(game.scene.wipe, "wipe", "setScene", App.Home.Levels);
            };

            this.wipe = new game.Graphics();
            this.wipe.beginFill(0xce5064); 
            this.wipe.drawRect(0, 0, App.pX(100), App.pY(500));
            this.wipe.position.x = 0;
            this.wipe.position.y = 0;
            wipeTween = new game.Tween(this.wipe).to({ alpha: 0 }, 500);

            this.container.addChild(this.bottom);
            this.container.addChild(this.wreath);
            this.container.addChild(this.text1);
            this.container.addChild(this.icons);
            this.container.addChild(this.text2);
            this.container.addChild(this.button);
            this.container.addChild(this.text3);
            this.container.addChild(this.text4);
            this.container.addChild(this.text5);
            this.container.addChild(this.keyline);
            this.container.addChild(this.heroBg);
            this.container.addChild(this.heroFg);
            this.container.addChild(this.back);
            this.container.addChild(this.wipe);

            this.stage.addChild(this.container);
            wipeTween.start();
            heroBgTween.start();
            heroFgTween.start();

        }

    });
    
    game.createScene(App.Home.LevelOutro, {

        backgroundColor: 0x143559,

        init: function(){

            var score = 0, i, feedback, rand, wipeTween, self = this;
            
            // Get level list
            App.LevelList = App.getLevelList();

            // Container
            this.container = new game.Container();
            //this.container.scale.set(App.deviceScale(), App.deviceScale());

            // Get Data
            this.level = game.storage.get("CurrentLevel");

            // Analytics event
            App.sendPageView('Level '+ (this.level+1) +' Outro Screen');

            this.games = App.LevelList[this.level].games;
            for(i = 0; i < this.games.length; i += 1) {
                score += game.storage.get("game_"+this.games[i]+"_score") || 0;
            }

            // Get percentage score
            this.overallScore = Math.ceil((score/300) * 100);
            //this.overallScore = 100;

            // Save score
            game.storage.set("level_"+ (this.level+1) +"_rating", this.overallScore);

            // Unlock level
            if(this.overallScore > 50) {

                // Unlock next level
                game.storage.set("level_"+ (this.level+1) +"_complete", true);

            }

            // Get feedback
            if(this.overallScore > 70) {

                // 3 stars
                rand = Math.floor(Math.random() * App.LevelList[this.level].feedback[2].length);
                feedback = App.LevelList[this.level].feedback[2][rand];

            } else if(this.overallScore > 60) {

                // 2 stars
                rand = Math.floor(Math.random() * App.LevelList[this.level].feedback[2].length);
                feedback = App.LevelList[this.level].feedback[1][rand];

            } else {

                // 1 star
                rand = Math.floor(Math.random() * App.LevelList[this.level].feedback[2].length);
                feedback = App.LevelList[this.level].feedback[0][rand];

            }

            this.name = App.LevelList[this.level].name;
            this.title = App.LevelList[this.level].title;
            this.description = App.LevelList[this.level].description;

            // Set colours
            this.colour1 = App.LevelList[this.level].palette[0]; // Dark
            this.colour2 = App.LevelList[this.level].palette[1]; // Med
            this.colour3 = App.LevelList[this.level].palette[2]; // Primary
            this.colour4 = App.LevelList[this.level].palette[3]; // Text

            // Set bg colour
            game.system.stage.setBackgroundColor(this.colour1);

            this.bottom = new game.Graphics();
            this.bottom.beginFill(this.colour2); 
            this.bottom.drawRect(0, App.pY(95), App.pX(100), App.pY(5));
            this.bottom.endFill();

            this.hero = new game.Sprite.fromImage("media/home/level_"+(this.level+1)+"_outro.png");
            this.hero.anchor.set(0,1);
            this.hero.width = App.pX(60);
            this.hero.height = App.pX(60);
            this.hero.position.x = App.pX(40);
            this.hero.position.y = App.pY(102);

            this.appName = new game.Text(game.storage.get("CurrentAppName"), { fill: "white", font: App.pX(4)+'px sans-serif' } );
            this.appName.position.x = App.pX(50) - (this.appName.width / 2);
            this.appName.position.y = App.pY(10);
            this.appName.tint = this.colour3;

            this.nextText = new game.Text( "Next".toUpperCase(), { fill: "white", font: 'bold '+App.pX(5)+'px sans-serif' } );
            this.nextText.tint = this.colour3;
            this.nextText.position.x = App.pX(95) - this.nextText.width;
            this.nextText.position.y = App.pY(85);

            if(this.overallScore > 70) {
                this.stars = new game.Sprite.fromImage("media/home/stars_3.png");
            } else if(this.overallScore > 60) {
                this.stars = new game.Sprite.fromImage("media/home/stars_2.png");
            } else if(this.overallScore > 50) {
                this.stars = new game.Sprite.fromImage("media/home/stars_1.png");
            } else {
                this.stars = new game.Sprite.fromImage("media/home/stars_0.png");
            }

            this.stars.width = App.pX(20);
            this.stars.height = App.pX(20);
            this.stars.anchor.set(0.5,0.5);
            this.stars.position.x = App.pX(50);
            this.stars.position.y = App.pY(30);
            this.stars.tint = this.colour4;

            this.scoreText = new game.Text(this.overallScore + "%", { fill: "white", align: "center", font: 'bold '+App.pX(5)+'px sans-serif' } );
            this.scoreText.position.x = App.pX(50) - (this.scoreText.width / 2);
            this.scoreText.position.y = this.stars.position.y + App.pY(10);
            this.scoreText.tint = this.colour4;
        
            if(this.overallScore > 50) {
                
                this.wreath = new game.PIXI.Sprite.fromImage("media/home/quote.png");
                this.wreath.anchor.set(0.5,0.5);
                this.wreath.ratio = 168/915;
                this.wreath.width = App.pX(75);
                this.wreath.height = App.pX(75) * this.wreath.ratio;
                this.wreath.position.x = App.pX(50);
                this.wreath.position.y = this.scoreText.position.y + this.scoreText.height + App.pY(15);
                this.wreath.tint = this.colour4;

                this.feedback = new game.Text("\"" + feedback[0] + "\"", { fill: "white", align: "center", font: 'bold 40px sans-serif', wordWrap: true, wordWrapWidth: App.pX(50) } );
                this.feedback.position.x = -(this.feedback.width / 2);
                this.feedback.position.y = -72;
                this.feedback.tint = this.colour4;

                this.author = new game.Text("- " + feedback[1], { fill: "white", align: "center", font: '32px sans-serif', wordWrap: true, wordWrapWidth: ((game.system.width / App.deviceScale()) / 2) } );
                this.author.position.x = -(this.author.width / 2);
                this.author.position.y = -64 + this.feedback.height + 16;
                this.author.tint = this.colour4;

                this.wreath.addChild(this.feedback);
                this.wreath.addChild(this.author);
                this.container.addChild(this.wreath);
            } else {
                this.feedback1 = new game.Text("Wow this app sucks!", { fill: "white", align: "center", font: 'bold '+App.pX(4)+'px sans-serif' } );
                this.feedback1.position.x = App.pX(50) - (this.feedback1.width / 2);
                this.feedback1.position.y = this.scoreText.position.y + this.scoreText.height + App.pY(10);
                this.feedback1.tint = this.colour4;

                this.feedback2 = new game.Text("You need at least 1 star to progress to the next level", { fill: "white", align: "center", font: App.pX(2.5)+'px sans-serif' } );
                this.feedback2.position.x = App.pX(50) - (this.feedback2.width / 2);
                this.feedback2.position.y = this.feedback1.position.y + this.feedback1.height + App.pY(5);
                this.feedback2.tint = this.colour4;

                this.container.addChild(this.feedback1);
                this.container.addChild(this.feedback2);
            }

            this.button = new game.Graphics();
            this.button.beginFill(this.colour2); 
            this.button.drawRect(0, 0, this.nextText.width + 48, this.nextText.height + 24);
            this.button.position.x = this.nextText.position.x - 24;
            this.button.position.y = this.nextText.position.y - 16;
            this.button.interactive = true;
            this.button.hitArea = new game.PIXI.Rectangle(0, 0, this.nextText.width + 24, this.nextText.height + 24);
            this.button.tap = this.button.click = function() {

                // Play level
                App.sendEvent('Level '+ (self.level + 1) +' Outro', 'click', 'Next');
                App.buttonClick(game.scene.wipe, "wipe", "setScene", App.Home.Main, true);

            };
            this.button.alpha = 0;

            this.facebook = new game.PIXI.Sprite.fromImage("media/home/facebook.png");
            this.facebook.anchor.set(0.5,0.5);
            this.facebook.tint = this.colour3;
            this.facebook.width = App.pX(5);
            this.facebook.height = App.pX(5);
            this.facebook.position.x = App.pX(5);
            this.facebook.position.y = App.pY(88);
            this.facebook.interactive = true;
            this.facebook.hitArea = new game.PIXI.Rectangle(-40, -40, 80, 80);
            this.facebook.tap = this.facebook.click = this.share_facebook.bind(this);

            this.twitter = new game.PIXI.Sprite.fromImage("media/home/twitter.png");
            this.twitter.anchor.set(0.5,0.5);
            this.twitter.tint = this.colour3;
            this.twitter.width = App.pX(5);
            this.twitter.height = App.pX(5);
            this.twitter.position.x = this.facebook.position.x + this.facebook.width + App.pX(2);
            this.twitter.position.y = App.pY(88);
            this.twitter.interactive = true;
            this.twitter.hitArea = new game.PIXI.Rectangle(-40, -40, 80, 80);
            this.twitter.tap = this.twitter.click = this.share_twitter.bind(this);

            this.container.addChild(this.bottom);
            this.container.addChild(this.hero);
            this.container.addChild(this.appName);
            this.container.addChild(this.stars);
            this.container.addChild(this.scoreText);
            this.container.addChild(this.button);
            this.container.addChild(this.facebook);
            this.container.addChild(this.twitter);
            this.container.addChild(this.nextText);
           
            this.wipe = new game.Graphics();
            this.wipe.beginFill(0xce5064); 
            this.wipe.drawRect(0, 0, (game.system.width / App.deviceScale()), (game.system.height / App.deviceScale()) * 5);
            this.wipe.position.x = 0;
            this.wipe.position.y = 0;
            wipeTween = new game.Tween(this.wipe)
                .to({ alpha: 0 }, 500);

            this.stage.addChild(this.container);

            if(this.level === 2 && !game.storage.get("PopupClosed")) {

                // Container
                this.pop = new game.Container();
                this.pop.scale.set(App.deviceScale(), App.deviceScale());

                this.popupFade = new game.Graphics();
                this.popupFade.beginFill(this.colour1); 
                this.popupFade.drawRect(0, 0, (game.system.width / App.deviceScale()), (game.system.height / App.deviceScale()));
                this.popupFade.endFill();
                this.popupFade.alpha = 0.75;

                this.popup = new game.Graphics();
                this.popup.beginFill(this.colour3); 
                App.roundRect(this.popup, (game.system.width / App.deviceScale()) / 4, 48, (game.system.width / App.deviceScale()) / 2, (game.system.height / App.deviceScale()) - 96, 24, 24, 24, 24);
                this.popup.beginFill(this.colour4);
                App.roundRect(this.popup, (game.system.width / App.deviceScale()) / 4, 48, (game.system.width / App.deviceScale()) / 2, 144, 24, 24, 0, 0);
                this.popup.endFill();

                this.popupTitleText = new game.Text("Get Involved", { fill: "white", font: 'bold 48px sans-serif' } );
                this.popupTitleText.position.x = ((game.system.width / App.deviceScale()) / 2) - (this.popupTitleText.width / 2);
                this.popupTitleText.position.y = 87.6;

                this.popupText = new game.Text("You’ll find the open source code for all these challenges at the Intel® Developer Zone.", { fill: "white", font: '32px sans-serif', wordWrap: true, wordWrapWidth: ((game.system.width / App.deviceScale()) / 2) - 128 } );
                this.popupText.position.x = ((game.system.width / App.deviceScale()) / 2) - (this.popupText.width / 2);
                this.popupText.position.y = this.popupTitleText.position.y + this.popupTitleText.height + 96;
                this.popupText.tint = this.colour4;

                this.popupGo = new game.Text("Let’s go", { fill: "white", font: 'bold 32px sans-serif' } );
                this.popupGo.tint = this.colour4;
                this.popupGo.position.x = (game.system.width / App.deviceScale()) / 4 + 96;
                this.popupGo.position.y = (game.system.height / App.deviceScale()) - 128;

                this.popupClose = new game.Text("Maybe later", { fill: "white", font: '32px sans-serif' } );
                this.popupClose.tint = this.colour4;
                this.popupClose.position.x = ((game.system.width / App.deviceScale()) * 3/4) - this.popupClose.width - 96;
                this.popupClose.position.y = (game.system.height / App.deviceScale()) - 128;
    
                this.popupCloseButton = new game.Graphics();
                this.popupCloseButton.beginFill(this.colour2); 
                this.popupCloseButton.drawRect(0, 0, this.popupClose.width + 48, this.popupClose.height + 24);
                this.popupCloseButton.position.x = this.popupClose.position.x - 24;
                this.popupCloseButton.position.y = this.popupClose.position.y - 12;
                this.popupCloseButton.interactive = true;
                this.popupCloseButton.hitArea = new game.PIXI.Rectangle(0, 0, this.popupClose.width + 24, this.popupClose.height + 24);
                this.popupCloseButton.tap = this.popupCloseButton.click = this.closePopup.bind(this);
                this.popupCloseButton.alpha = 0;

                this.pop.addChild(this.popupFade);
                this.pop.addChild(this.popup);
                this.pop.addChild(this.popupTitleText);
                this.pop.addChild(this.popupText);
                this.pop.addChild(this.popupClose);
                this.pop.addChild(this.popupGo);
                this.pop.addChild(this.popupCloseButton);
                this.stage.addChild(this.pop);
            }

            this.container.addChild(this.wipe);
            wipeTween.start();
            
        },

        share_twitter: function(){

            var text = "I got {score}% with ‘{appname}’ on Dev Story/*HACK THE CODE*/! #IntelAndroid";

            text = text.replace("{score}", this.overallScore);
            text = text.replace("{appname}", game.storage.get("CurrentAppName"));

            // Analytics event
            App.sendEvent('Level '+ (this.level + 1) +' Intro', 'click', 'Share Twitter');

            var shareUrl = "https://twitter.com/share?";
                shareUrl += "url=http://intel.ly/1pRAKWA";
                shareUrl += "&text="+encodeURIComponent(text);

            window.open(shareUrl, '_system');

        },

        share_facebook: function(){
            
            var text = "I just scored {score}% with ‘{appname}’ on Dev Story/*HACK THE CODE*/! Head over to the Intel® Developer Zone to download the open-source app and go from bedroom developer to tech superstar. #IntelAndroid";

            text = text.replace("{score}", this.overallScore);
            text = text.replace("{appname}", game.storage.get("CurrentAppName"));
            
            // Analytics event
            App.sendEvent('Level '+ (this.level + 1) +' Intro', 'click', 'Share Facebook');

            // Level outro
            var shareUrl = "https://www.facebook.com/dialog/feed?";
                shareUrl += "app_id=692903567464031";
                //shareUrl += "app_id=755674014474493";
                shareUrl += "&display=popup";
                shareUrl += "&picture=http://int-android.mrmpweb.co.uk/share.png";
                shareUrl += "&actions={ name: 'Dev Story/*HACK THE CODE*/', link: 'http://www.google.com' }";
                shareUrl += "&link=https://software.intel.com/";
                shareUrl += "&description="+ encodeURIComponent(text);
                shareUrl += "&redirect_uri=https://software.intel.com/";

            // Open share
            window.open(shareUrl, '_system');

        },

        closePopup: function(){

            // Analytics event
            App.sendEvent('Level '+ (this.level + 1) +' Intro', 'click', 'Close Popup');

            // Save popup cookie
            game.storage.set("PopupClosed", true);

            // Remove popup
            this.stage.removeChild(this.pop);

        }

    });
});
