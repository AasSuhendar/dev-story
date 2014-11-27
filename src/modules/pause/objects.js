game.module(
    'modules.pause.objects'
)
.require(
    'engine.core'
)
.body(function() {
    
    game.createClass(App.Pause.PauseButton, {

        init: function(){ 

            // Container
            this.container = new game.Container();

            // Objects
            this.colour1 = App.currentPalette[0]; // Dark
            this.colour2 = App.currentPalette[1]; // Med
            this.colour3 = App.currentPalette[2]; // Primary
            this.colour4 = App.currentPalette[3]; // Text

            this.pauseButton = new game.Graphics();
            this.pauseButton.beginFill(this.colour2); 
            this.pauseButton.drawCircle(0, 0, App.pX(3));
            this.pauseButton.position.x = App.pX(5);
            this.pauseButton.position.y = App.pX(5);

            this.pauseIcon = new game.PIXI.Sprite.fromImage('media/pause.png');
            this.pauseIcon.anchor.set(0.5,0.5);
            this.pauseIcon.height = App.pX(6);
            this.pauseIcon.width = App.pX(6);
            this.pauseIcon.position.x = 0;
            this.pauseIcon.position.y = 0;

            this.pauseButton.interactive = true;
            this.pauseButton.hitArea = new game.PIXI.Circle(0, 0, App.pX(5));
            this.pauseButton.tap = this.pauseButton.click = this.togglePause.bind(this);

            this.pauseButton.addChild(this.pauseIcon);

            // Add objects to scene
            this.container.addChild(this.pauseButton);
            game.scene.stage.addChild(this.container);
        }, 

        togglePause: function(){

            // Check game is paused
            if(App.paused) {

                // If there is a pause screen
                if(this.pauseScreen) {

                    // Resume game
                    this.pauseScreen.resume();

                }

            } else {

                // Pause game
                App.paused = true;

                // Create pause screen
                this.pauseScreen = new App.Pause.PauseScreen();

            }
        }

    });

    App.Pause.PauseScreen = game.Class.extend({

        init: function(){

            // Container
            this.container = new game.Container();

            // Objects
            this.colour1 = App.currentPalette[0]; // Dark
            this.colour2 = App.currentPalette[1]; // Med
            this.colour3 = App.currentPalette[2]; // Primary
            this.colour4 = App.currentPalette[3]; // Text

            this.fade = new game.Graphics();
            this.fade.beginFill(this.colour4); 
            this.fade.drawRect(0, 0, App.pX(100), App.pY(100));
            this.fade.endFill();
            this.fade.alpha = 0.75;

            this.bg = new game.Graphics();
            this.bg.beginFill(0xFFFFFF); 
            App.roundRect(this.bg, App.pX(25), App.pY(5), App.pX(50), App.pY(90), App.pX(3), App.pX(3), App.pX(3), App.pX(3));
            this.bg.beginFill(this.colour2);
            App.roundRect(this.bg, App.pX(25), App.pY(5), App.pX(50), App.pY(16), App.pX(3), App.pX(3), 0, 0);
            this.bg.endFill();

            this.titleText = new game.Text( "Paused", { fill: "white", font: 'bold '+App.pX(4)+'px sans-serif' } );
            this.titleText.position.x = App.pX(50) - (this.titleText.width / 2);
            this.titleText.position.y = App.pY(10);

            this.soundsText = new game.Text( "Sounds", { fill: "white", font: App.pX(4)+'px sans-serif' } );
            this.soundsText.position.x = App.pX(35);
            this.soundsText.position.y = App.pY(28);
            this.soundsText.tint = 0x666666;

            this.soundsIcon = new game.PIXI.Sprite.fromImage('media/pause_sound.png');
            this.soundsIcon.height = App.pX(5);
            this.soundsIcon.width = App.pX(5);
            this.soundsIcon.position.x = App.pX(28);
            this.soundsIcon.position.y = this.soundsText.position.y - App.pY(1.5);
            this.soundsIcon.tint = 0x666666;

            this.vibrateText = new game.Text( "Vibrate", { fill: "white", font: App.pX(4)+'px sans-serif' } );
            this.vibrateText.position.x = App.pX(35);
            this.vibrateText.position.y = this.soundsText.position.y + App.pY(15);
            this.vibrateText.tint = 0x666666;

            this.vibrateIcon = new game.PIXI.Sprite.fromImage('media/pause_vibrate.png');
            this.vibrateIcon.height = App.pX(5);
            this.vibrateIcon.width = App.pX(5);
            this.vibrateIcon.position.x = App.pX(28);
            this.vibrateIcon.position.y = this.vibrateText.position.y - App.pY(1.5);
            this.vibrateIcon.tint = 0x666666;

            this.quitText = new game.Text( "Quit", { fill: "white", font: App.pX(4)+'px sans-serif' } );
            this.quitText.position.x = App.pX(35);
            this.quitText.position.y = this.vibrateText.position.y + App.pY(30);
            this.quitText.tint = 0x666666;

            this.quitIcon = new game.PIXI.Sprite.fromImage('media/pause_quit.png');
            this.quitIcon.height = App.pX(5);
            this.quitIcon.width = App.pX(5);
            this.quitIcon.position.x = App.pX(28);
            this.quitIcon.position.y = this.quitText.position.y - App.pY(1.5);
            this.quitIcon.tint = 0x666666;

            this.resumeText = new game.Text( "Resume".toUpperCase(), { fill: "white", font: 'bold '+App.pX(4)+'px sans-serif' } );
            this.resumeText.position.x = App.pX(35);
            this.resumeText.position.y = this.quitText.position.y + App.pY(10);
            this.resumeText.tint = this.colour2;

            this.resumeIcon = new game.PIXI.Sprite.fromImage('media/pause_resume.png');
            this.resumeIcon.height = App.pX(5);
            this.resumeIcon.width = App.pX(5);
            this.resumeIcon.position.x = App.pX(28);
            this.resumeIcon.position.y = this.resumeText.position.y - App.pY(1.5);
            this.resumeIcon.tint = this.colour2;

            this.quitButton = new game.Graphics();
            this.quitButton.beginFill(this.colour4); 
            App.roundRect(this.quitButton, 0, 0, App.pX(45), this.quitText.height + App.pY(3), App.pY(2), App.pY(2), App.pY(2), App.pY(2));
            this.quitButton.position.x = App.pX(27.5);
            this.quitButton.position.y = this.quitText.position.y - App.pY(2);
            this.quitButton.interactive = true;
            this.quitButton.hitArea = new game.PIXI.Rectangle(0, 0, App.pX(45), this.quitText.height + App.pY(2));
            this.quitButton.tap = this.quitButton.click = function(){

                // Analytics event
                App.sendEvent('Pause', 'click', 'Quit');

                // Quit
                App.paused = false;
                App.buttonClick(this, "flash", "goHome");

            };
            this.quitButton.alpha = 0;

            this.resumeButton = new game.Graphics();
            this.resumeButton.beginFill(this.colour2); 
            this.resumeButton.drawRect(0, 0, App.pX(45), this.resumeText.height + App.pY(3));
            this.resumeButton.position.x = App.pX(27.5);
            this.resumeButton.position.y = this.resumeText.position.y - App.pY(2);
            this.resumeButton.interactive = true;
            this.resumeButton.hitArea = new game.PIXI.Rectangle(0, 0, App.pX(45), this.resumeText.height +  App.pY(2));
            this.resumeButton.tap = this.resumeButton.click = this.resume.bind(this);
            this.resumeButton.alpha = 0;

            this.muteSlider = new game.Graphics();
            this.muteSlider.beginFill(this.colour2); 
            this.muteSlider.drawRect(0, 0, App.pX(12), App.pY(2));
            this.muteSlider.position.x = App.pX(55);
            this.muteSlider.position.y = this.soundsText.position.y + App.pY(2);
            this.muteSlider.alpha = 0.25;

            this.muteKnob = new game.Graphics();
            this.muteKnob.beginFill(this.colour2); 
            this.muteKnob.drawCircle(0, 0, App.pX(2.5));
            if(App.mute) {
                this.muteKnob.position.x = App.pX(57);
            } else {
                this.muteKnob.position.x = App.pX(65);
            }
            this.muteKnob.position.y = this.soundsText.position.y + App.pY(2.5);

            this.muteButton = new game.Graphics();
            //this.muteButton.beginFill(0xFF0000); 
            //this.muteButton.alpha = 0.1;
            this.muteButton.drawRect(0, 0, App.pX(20), App.pY(10));
            this.muteButton.position.x = this.muteSlider.position.x - App.pX(5);
            this.muteButton.position.y = this.soundsText.position.y - App.pY(2);
            this.muteButton.interactive = true;
            this.muteButton.hitArea = new game.PIXI.Rectangle(0, 0, App.pX(20), App.pY(10));
            this.muteButton.tap = this.muteButton.click = this.toggleMute.bind(this);

            this.vibrateSlider = new game.Graphics();
            this.vibrateSlider.beginFill(this.colour2); 
            this.vibrateSlider.drawRect(0, 0, App.pX(12), App.pY(2));
            this.vibrateSlider.position.x = App.pX(55);
            this.vibrateSlider.position.y = this.vibrateText.position.y + App.pY(2);
            this.vibrateSlider.alpha = 0.25;

            this.vibrateKnob = new game.Graphics();
            this.vibrateKnob.beginFill(this.colour2); 
            this.vibrateKnob.drawCircle(0, 0, App.pX(2.5));
            if(App.novibrations) {
                this.vibrateKnob.position.x = App.pX(57);
            } else {
                this.vibrateKnob.position.x = App.pX(65);
            }
            this.vibrateKnob.position.y = this.vibrateText.position.y + App.pY(2.5);

            this.vibrateButton = new game.Graphics();
            //this.vibrateButton.beginFill(0xFF0000); 
            //this.vibrateButton.alpha = 0.1;
            this.vibrateButton.drawRect(0, 0, App.pX(20), App.pY(10));
            this.vibrateButton.position.x = this.vibrateSlider.position.x - App.pX(5);
            this.vibrateButton.position.y = this.vibrateText.position.y - App.pY(2);
            this.vibrateButton.interactive = true;
            this.vibrateButton.hitArea = new game.PIXI.Rectangle(0, 0, App.pX(20), App.pY(10));
            this.vibrateButton.tap = this.vibrateButton.click = this.toggleVibrate.bind(this);

            this.container.addChild(this.fade);
            this.container.addChild(this.bg);
            this.container.addChild(this.titleText);
            this.container.addChild(this.soundsText);
            this.container.addChild(this.soundsIcon);
            this.container.addChild(this.vibrateText);
            this.container.addChild(this.vibrateIcon);
            this.container.addChild(this.quitText);
            this.container.addChild(this.quitIcon);
            this.container.addChild(this.resumeText);
            this.container.addChild(this.resumeIcon);
            this.container.addChild(this.quitButton);
            this.container.addChild(this.resumeButton);
            this.container.addChild(this.vibrateSlider);
            this.container.addChild(this.vibrateKnob);
            this.container.addChild(this.vibrateButton);
            this.container.addChild(this.muteSlider);
            this.container.addChild(this.muteKnob);
            this.container.addChild(this.muteButton);
            game.scene.stage.addChild(this.container);

        },

        toggleMute: function(){

            // If app is mute
            if(App.mute) {
                
                // Unmute
                App.mute = false;

                // Analytics event
                App.sendEvent('Pause', 'click', 'Unmute');

                // Save mute state
                game.storage.set("gameMuted", false);

                // resume music
                game.audio.resumeMusic();

                // Set graphical display
                this.muteKnob.position.x = App.pX(65);

            } else {

                // Mute
                App.mute = true;

                // Analytics event
                App.sendEvent('Pause', 'click', 'Mute');

                // Save mute state
                game.storage.set("gameMuted", true);

                // Stop music
                game.audio.pauseMusic();

                // Set graphical display
                this.muteKnob.position.x = App.pX(57);

            }
        },

        toggleVibrate: function(){

            // Check app has no vibrations
            if(App.novibrations) {

                // Unvibrations
                App.novibrations = false;

                // Analytics event
                App.sendEvent('Pause', 'click', 'VibrationsOn');

                // Save state
                game.storage.set("gameVibrations", false);

                // Set knob
                this.vibrateKnob.position.x = App.pX(65);

            } else {

                // Vibrations
                App.novibrations = true;

                // Analytics event
                App.sendEvent('Pause', 'click', 'VibrationsOff');

                // Set state
                game.storage.set("gameVibrations", true);

                // Set knob
                this.vibrateKnob.position.x = App.pX(57);
                
            }

        },

        resume: function(){

            // Analytics event
            App.sendEvent('Pause', 'click', 'Resume');

            // Unpause
            App.paused = false;

            // Remove pause screen
            game.scene.stage.removeChild(this.container);
            game.scene.removeObject(this);

        }

    });
});