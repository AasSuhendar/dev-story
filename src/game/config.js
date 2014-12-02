pandaConfig = {
    sourceFolder: 'src',
    outputFile: 'game.min.js',
    ignoreModules: [
        'engine.keyboard'
    ],
    system: {
        antialias: false,
        bgColor: 0x0074bb,
        height: "window",
        width: "window",
        hires: 1,
        retina: 1,
        pauseOnHide: false,
        resize: true,
        resizeToFill: true,
        scaleToFit: true,
        startScene: "Splash",
        transparent: false,
        webGL: true
    },
    loader: {
        timeout:0,
        bgColor: 0x143559,
        barColor: 0x143559,
        barBg: 0x143559,
        barHeight: 0,
        barMargin: 0,
        barWidth: 0
    },
    debug: {
        enabled: false,
        color: 'cyan',
        frequency: 1000,
        position: { x: 5, y: 50 }
    },
    storage: {
        id: 'xdk.memory'
    }
};

var App = {
    GameIntro: "GameIntro",
    GameOutro: "GameOutro"
};
// Sections
App.Home = {
    // Scenes
    Splash: "Splash",
    Main: "Main",
    Levels: "Levels",
    About: "About",
    OverallGameIntro: "OverallGameIntro",
    GameCredits: "GameCredits",
    GetInvolved: "GetInvolved",
    LevelIntro: "LevelIntro",
    LevelOutro: "LevelOutro",
    // Classes
    HomeButton: "HomeButton",
    Stages: "Stages",
    StageButton: "StageButton"
}; 

App.Pause = {
    // Classes
    PauseButton: "PauseButton"
}; 

/** 
    XDK_CHALLENGE 
    This section sepcifies namespaces and id's for the mini challenges.
    Further down the file you will find specific level related configurations.
    To create a new game you must specify a namespace and unique ID and add it to a level inside App.getLevelList.
    Create the module folder and module files that correspond with the mini challenge name.
    The new files must be required below with the others.
*/

// Mini Games 
App.Concept = { 
    id: 1,
    // Scenes
    Intro: "G1Intro",
    Game: "G1Game",
    Outro: "G1Outro",
    // Classes
    GameLayer: "GameLayer",
    PlayerLayer: "PlayerLayer",
    ReverseTimeLayer: "ReverseTimeLayer",
    Palette: "Palette",
    Background: "Background",
    Mover: "Mover",
    Cat: "Cat",
    Camera: "G1Camera",
    HUD: "HUD",
    InputControl: "InputControl",
    EnergyBar: "EnergyBar",
    Countdown: "G1Countdown",
    ColorCycle: "ColorCycle",
    TimeReverse: "TimeReverse",
    Distraction1: "Distraction1",
    Distraction2: "Distraction2",
    Distraction3: "Distraction3",
    Distraction4: "Distraction4",
    Spark: "Spark",
    Nucleus: "Nucleus",
    Cog: "Cog",
    PowerUp1: "PowerUp1",
    PowerUp2: "PowerUp2",
    PowerUp3: "PowerUp3",
    Player: "Player",
    GameCamera: "GameCamera",
    PlayerCamera: "PlayerCamera",
    EnergyBar1: "EnergyBar1",
    EnergyBar2: "EnergyBar2",
    EnergyBar3: "EnergyBar3"
};
App.Coding = { 
    id: 2,
    // Scenes
    Intro: "G2Intro",
    Game: "G2Game",
    Outro: "G2Outro",
    // Classes
    Row: "Row",
    Countdown: "G2Countdown",
    Controls: "Controls"
}; 
App.Release = { 
    id: 3,
    // Scenes
    Intro: "G3Intro",
    Game: "G3Game",
    Outro: "G3Outro",
    // Classes
    Hype: "Hype",
    Countdown: "G3Countdown"
};
//App.YourGame = { id: 4 }; 

App.developer = true;
