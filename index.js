/* global hasBoughtClothes, gameStates, gameStatesstr, princesshankerchief, princesshandmirror, princessnecklace, princessroomkey, dialogue, hasMetNurse */

//variable to show the debug
var showDebug = false;
var password = "";

//for games that require text display with decisions, a message bar comes in handy
var messagebar = document.createElement("div");

//a simple variable to display confirmation of receiving an item
var gotitembar = document.createElement("div");
//image variable to display item obtained
var gotitemimg = document.createElement("img");
//div to display text of item confirmation
var gotitemtxt = document.createElement("div");

//to display text from dialogue
var showText = false;
var dialogueText = "";
var iterText = 0;
var incrementText = "";
var charName = "";

//variables to assign specific characters to HTML tags
var quoteTagChar = "#";
var quoteExists = false;
var breakTagChar = "/";

//Used to display inventory
var itembox = document.createElement("div");
var items = new Array(new Array(7), new Array(7), new Array(7));
var itemDescription = document.createElement("div");

//to display inventory (not for the GIVE action)
var showInventory = false;

//variable to hide arrows while activating inventory (not through GIVE action)
var arrowsVisible = 0;

//button to leave the display of dialogue or inventory
var backButton = document.createElement("img");

//button to purchase stuff
var buyButton = document.createElement("img");

//buttons necessary to get info from Royal Bannerett
var selectchar = document.createElement("img");
var backchar = document.createElement("img");

//arrows necessary for character info selection when asking the Royal Bannerett
var nextchar = document.createElement("img");
var prevchar = document.createElement("img");

//divs necessary for category as well as character name display when asking the Royal Bannerett
var catchar = document.createElement("div");
var namchar = document.createElement("div");

//boolean necessary to be able to select either a category for characters or a character name when asking the Royal Bannerett
var categorySelected = false;

//int to determine categories of characters when asking the Royal Bannerett. 1 for town characters, 2 for castle characters, 3 for outside characters, 4 for mysterious characters
var availableCategories = 2; //set to 4 for testing purposes. Original value is 2

//arrays to cycle through categories and characters when asking the Royal Bannerett
var currentCategories = [];
var currentCharacters = [];

//ints to use as index when cycling through arrays above
var catSelector = 0;
var namSelector = 0;

//The Kingdom name
var kingdomName = "Crimsonia";

//as a help to players, a small info bar is nice
var dispinfobar = document.createElement("div");
var separatorbar = document.createElement("div");
var infobar = document.createElement("div");
var infoLocation = "";

//Elements to display inventory on screen (img, arrays)
var bag = document.createElement("img");

//variable to display the armor on screen
var armor = document.createElement("img");

//Elements to display money on screen (img, div, int)
var coins = document.createElement("img");
var dispmoney = document.createElement("div");
var money = 0;

//Variable to hold favor numbers
var favors = 0;

//Element to display favors on screen
var dispfavors = document.createElement("div");

//Array to specify Location names to implement into infobar
var locations = new Array(new Array("Cliff Top", "Cliff East Descent", "Cliff East Slope", kingdomName + "'s North Entrance", "Cliff East Incline", "Cliff East Ascent", "North East Border", "Triground North Vista", "Seaside North Decline", "Northern Seaside Woods Entrance", "LonePalm Beach"),
						  new Array("Cliff South Descent", "Graveyard", "Chapel", kingdomName + "'s North Gates", "Commerce Venue", "Barter Corner", "Forest North Entrance", "Forest NorthWest Corner", "Forswear Cottage", "Forest NorthEast Corner", "Trance Reef"),
						  new Array( kingdomName + "'s West Entrance", kingdomName + "'s West Gates", "Redin Palace", kingdomName + "'s SkyGround Square", "Horsefoot Venue", kingdomName + "'s East Gates", kingdomName + "'s East Entrance", "Forest SouthWest Corner", "Forest PineWall", "Forest SouthEast Corner", "East Seaside Woods Entrance"),
						  new Array("Cliff South Armrock", "Duke's Manor", "Workshop Venue", kingdomName + "'s South Gates", "Chocolate Venue", "Strawberry Venue", "Meadow Forking", "Forest Main Entrance", "Forest Entrance Barricade", "Mountain Pass", "Mountain Seaside Rest Stop"),
						  new Array("Cliff South Forking", "Treeway Ascent", "Treeway West Walk", kingdomName + "'s South Entrance", kingdomName + "'s Southern Walls", "Farm Parcels", "South East Border", "Mountain Floor Esplanade", "Mountain Kingdom Vista", "Mountain Top", "Mountainside"),
						  new Array("Cornerstop Ship Vista", "Cave Back", "Cave Dwellings", kingdomName + "'s Border Trail", "Evergreen Meadows", "West Farm Parcel", "East Farm Parcel", "Chamomile Flower Meadows", "GrassView Heights", "Crimson Cave", "SoleWood Peak"));

//variable to show characters
var character = document.createElement("img");

//character offset with respect to canvas and its border
var charOffset = 11;

//prepare array that will hold all images of background (outside)
var backgrounds = new Array(6);
for (var i = 0; i < backgrounds.length; i++) {
	backgrounds[i] = new Array(11);
}

//prepare array that will hold all images of background (rooms) and an array with the names of the rooms
var roomimages = new Array(29);
var rooms = new Array("alehouse", "annehouse", "brucehouse", "castle-kitchen", "castle-princessdoor", "castle-princessroom", "castle-stairs",
					  "castle-throneroom", "church", "dragonlair", "dukehouse-bedroom", "dukehouse-foyer", "farmerhouse", "francishouse",
					  "gravekeeperhouse", "hospital", "howardhouse", "magicianhouse", "marketshop", "minstrelhouse", "playerhouse",
					  "pottershop", "sallyhouse", "serfhouse", "smithhouse", "tailorhouse", "thatcherhouse", "tradehouse", "witchhouse");

//prepare array that will hold the images of characters, plus another array for character names
var charimages = new Array(36);
var characters = new Array("anne", "bandit", "dragon", "duchess", "duke", "farmer", "fisherman", "francis", "gravekeeper", "howard", "jester",
						   "journeyman", "lucille", "magician", "minstrel", "nurse", "peddler", "priest", "royalbannerett", "royalcook",
						   "royalsentry", "sally", "sarelle", "sentry", "serf", "shepherd", "siren", "smith", "spiritfox", "spiritfoxeating",
						   "spiritfoxsmall", "spiritfoxsurprised1", "spiritfoxsurprised2", "tailor", "thatcher", "witch");

//prepare array that will hold the images of the characters whose facial expression will change
var faceimages = new Array(17);
var faces = new Array("annehappy", "annehappytears", "brucesleeping", "dragonsnoutfire", "duchesshappy", "dukesad", "francishappy", "gravekeeperscared",
					  "howardhappy", "jestersad", "magiciandrunkblush", "royalsentryok", "sallyhappy", "sallysad", "sarelledistress", "sarellehappy", "witchmad");

var itemimages = new Array(55);
var itemnames = new Array("annesknife", "annesletter", "armor", "bag", "bagmouseover", "blanket", "brokenhammer", "castilecross", "charmstone", "cherries",
					  "cherriesontable", "cherrypie", "circesvial", "cleansespell", "clothes", "coins", "dogbone", "dragontusk", "emeraldbrace",
					  "fish", "fishontable", "flourbag", "flourbagmarket", "francisletter", "hammer", "harp", "heirloom", "item", "jesterletter", "maidenstear", "medicine",
					  "merlinspell", "money", "moneybag", "necklace", "petbrush", "princesshankerchief", "princesskey", "princessmirror", "princessnecklace", "ricepot", "royalcrest",
					  "samurai", "shovel", "silkcloth", "sirenfin", "sorceressheirloom", "spiritfox", "strawberry", "strawberrycake",
					  "strawberryplants", "tiara", "wine", "zombieghostleft", "zombieghostright");

var sffimages = new Array(8);
var sff = new Array("spiritfoxfade1", "spiritfoxfade2", "spiritfoxfade3", "spiritfoxfade4", "spiritfoxfade5", "spiritfoxfade6", "spiritfoxfade7",
					"spiritfoxfade8");

var sfsfimages = new Array(8);
var sfsf = new Array("spiritfoxsmallfade1", "spiritfoxsmallfade2", "spiritfoxsmallfade3", "spiritfoxsmallfade4", "spiritfoxsmallfade5",
					 "spiritfoxsmallfade6", "spiritfoxsmallfade7", "spiritfoxsmallfade8");

var sfefimages = new Array(8);
var sfef = new Array("spiritfoxeatingfade1", "spiritfoxeatingfade2", "spiritfoxeatingfade3", "spiritfoxeatingfade4", "spiritfoxeatingfade5",
					 "spiritfoxeatingfade6", "spiritfoxeatingfade7", "spiritfoxeatingfade8");

var buttonimages = new Array(10);
var buttonhoverimages = new Array(10);
var bimgs = new Array("ask", "back", "buy", "continue", "credits", "exit", "give", "instructions", "start", "talk");

var arrowimages = new Array(16);
var arrowhoverimages = new Array(16);
var aimgs = new Array("E", "ENE", "ESE", "N", "NE", "NNE", "NNW", "NW", "S", "SE", "SSE", "SSW", "SW", "W", "WNW", "WSW");

//Variable to determine the character the player is going to talk to
var currentCharacter = "";

//enumerated variable to draw the characters on screen without using indices
var chars = { ANNE: 0, BANDIT: 1, DRAGON: 2, DUCHESS: 3, DUKE: 4, FARMER: 5, FISHERMAN: 6, FRANCIS: 7, GRAVEKEEPER: 8, HOWARD: 9, JESTER: 10,
			  JOURNEYMAN: 11, LUCILLE: 12, MAGICIAN: 13, MINSTREL: 14, NURSE: 15, PEDDLER: 16, PRIEST: 17, ROYALBANNERETT: 18, ROYALCOOK: 19,
			  ROYALSENTRY: 20, SALLY: 21, SARELLE: 22, SENTRY: 23, SERF: 24, SHEPHERD: 25, SIREN: 26, SMITH: 27, SPIRITFOX: 28, SPIRITFOXEATING: 29,
			  SPIRITFOXSMALL: 30, SPIRITFOXSURPRISED1: 31, SPIRITFOXSURPRISED2: 32, TAILOR: 33, THATCHER: 34, WITCH: 35
			};

//variables of game - change values depending on canvas width and height
var canvasWidth = 800;
var canvasHeight = 600;
var canvasTop = 0;
var canvasLeft = 0;//($(window).innerWidth() / 2) - 400;
var arrowWidth = 60;
var arrowHeight = 48;

//variable to fade screen
var fader = document.createElement("div");

//variables to control elapsed time
var counter = 0;
var seconds = 0;

//variables to control game states
var inMain = true;
var inIntroduction = false;
var inOptions = false;
var inGame = false;
var inIntro = false;

//for games which depend on location, horizontal and vertical variables are useful to draw coordinates
var x = 3;
var y = 2;

//for images (backgrounds, characters, logo, items) specific to game, an image root should be specified
var imageRoot = "./whereforetheheckartthou/";

//for games which use buttons, a location is needed to specify only the button, should this change
var buttonRoot = "./gamebuttons/";

//for games which require arrows, a location for the arrows must be specified, to avoid writing it several times
var arrowRoot = "./gamearrows/";

//for games which require dialogue only when characters are on screen (or when dialogue is initiated)
var isNotAlone = false;

//Array to store, initialize, and assign values for the arrows which control movement from place to place
var arrows = new Array(7);

//Array to store the four different types of button action: TALK, GIVE, ASK, EXIT
var actionButtons = new Array(4);

//variables to play sound!
var fx = document.createElement("audio");
var armorSound = document.createElement("audio");
var chewSound = document.createElement("audio");
var dragonfireSound = document.createElement("audio");
var fadeSound = document.createElement("audio");
var gameoverSound = document.createElement("audio");
var getitemSound = document.createElement("audio");
var harpSound = document.createElement("audio");
var hoverSound = document.createElement("audio");
var moveSound = document.createElement("audio");
var munchSound = document.createElement("audio");
var pushSound = document.createElement("audio");
var trumpetSound = document.createElement("audio");

var soundTrack = document.createElement("audio");
var BanditSoundTrack = document.createElement("audio");
var ChapelSoundTrack = document.createElement("audio");
var CrimsoniaSoundTrack = document.createElement("audio");
var DragonSoundTrack = document.createElement("audio");
var ForestSoundTrack = document.createElement("audio");
var IntroSoundTrack = document.createElement("audio");
var MountainSoundTrack = document.createElement("audio");
var OutsideSoundTrack = document.createElement("audio");
var SallySoundTrack = document.createElement("audio");
var SarelleSoundTrack = document.createElement("audio");
var WitchSoundTrack = document.createElement("audio");

//variable to avoid playing a sound after fading
var leavingHouse = false;

//specifies the root folder of sounds on website
var soundRoot = "./whereforetheheckartthou/sounds/";

//used to know when to change the soundtrack to play
var changeSoundTrack = true;

//to keep track of sound and avoid looping it
var currentTrack = "";

//Integer variables to be used for random locations
var randomThatcherLocation = 0;
var randomSpiritFoxLocation = 0;
var randomFishermanLocation = 0;
var randomShepherdLocation = 0;
var randomJourneymanLocation = 0;

var randomHankerchiefLocation = 0;
var randomHandMirrorLocation = 0;
var randomNecklaceLocation = 0;

var randomPrincessLastLocation = 0;
//these go specifically with the Princess's last location
var princessDialogue = [];
var princessIndex = 0;

//boolean variables to determine game states (to tell when to display certain dialogue, when to display certain characters, etc.)

var randomPrincessKidnapper = 0;
var princessKidnappers = new Array("Dragon", "Witch", "Bandit");
var princessDiaryEntries = new Array("I have attained the knowledge that there is a Dragon inhabiting our noble kingdom, deep in a cave in the Mountain. Lucille must not know I am going to see him. I must make sure, for the good of my people, that it does no harm to " + kingdomName + "...",
									 "The day of jester as I was wandering around the meadows, I noticed a purple gleam coming from inside the forest. I noticed Lucille had fallen asleep on the grass, so I ventured in. I saw a cottage from which the shine came. I returned here, but I think I'll investigate further tomorrow...",
									 "I insisted Father to help me build a Treehouse, but he refused. So I was wandering around the trail when I noticed a cave. Lucille was afraid to go in, but I entered and found no one. My own secret hideout! I'm coming back there tomorrow to see it better!!!");

//variable to use to recognize when player has taken money from home
var hasSavings = false;

//to differentiate from regular talking and asking
var isAsking = false;

//to be able to locate the items the princess drops
var canFindHankerchief = false;
var canFindHandMirror = false;
var canFindNecklace = false;
var canFindRoomKey = false;

//to determine when it is the end is near, and the player has to find the princess for the last time
var endGame = false;

//to determine when the game is truly over
var gameFinished = false;

//final array of messages and index
var finalMessages = ["And so, peace at " + kingdomName + " was rightfully restored...", "The Kingdom's Jester went back to Poitiers, with Sarelle's permission, and he took Anne and Francis with him...", "Sally started to domesticate the Spirit Fox, now affectionately named Foxie...", "And everyone resumed their regular lives.", "As for the princess...", "Let's just say... She's not ever going to be alone anymore...!!!"];
var finalIndex = 0;

//instructions and credits images
var instpic = document.createElement("img");
var credpic = document.createElement("img");

/********************Anne********************/
	var hasMetAnne = false;
	var hasFrancisLetter = false;
	var AnneIsHappy = false;
	var AnneGivesItems = true;
/********************Anne********************/


/*******************Bandit*******************/
	var banditOnCave = false;
	var hasMetBandit = false;
	var canAskBandit = false;
	var findBanditLoot = false;
	var findEmeraldBrace = false;
	var mustGiveCastileCross = false;
	var mustGiveCirceVial = false;
	var BanditIsHappy = false;
/*******************Bandit*******************/


/*****************Bartender******************/
	var canSellWine = false;
	var mustGiveWine = false;
	var hasBoughtWine = false;
/*****************Bartender******************/


/******************Barterer******************/
	var canTradeSilkCloth = false;
	var BartererGivesSilk = false;
	var canTradeMerlinSpell = false;
	var mustGiveMerlinSpell = false;
/******************Barterer******************/


/*******************Bruce********************/
	var mustGiveBlanket = false;
	var hasMetBruce = false;
	var canAskForHarp = false;
	var isSleeping = false;
/*******************Bruce********************/


/*******************Dragon*******************/
	var canVisitDragon = false;
	var hasArmor = false;
	var hasMetDragon = false;
	var canTalkToDragon = false;
	var canAskDragon = false;
	var findDragonJewels = false;
	var findMaidensTear = false;
	var mustGiveDragonTusk = false;
	var DragonIsHappy = false;
/*******************Dragon*******************/


/*******************Duchess******************/
	var hasMetDuchess = false;
	var mustGiveMoneyforRicePot = false;
	var hasGivenMoneyforRicePot = false;
	var hasRicePot = false;
	var DukeAtePie = false;
	var DuchessIsHappy = false;
/*******************Duchess******************/


/********************Duke********************/
	var hasPie = false;
	var isGrounded = false;
	var hasMetDukeAtHome = false;
	var mustGetCake = false;
	var DukeIsHappy = false;
	var mustGiveEmeraldBrace = false;
/********************Duke********************/


/*******************Farmer*******************/
	var canPickStrawberries = false;
/*******************Farmer*******************/


/******************Fisherman*****************/
	var hasFin = false;
/******************Fisherman*****************/


/*******************Francis******************/
	var hasMetFrancis = false;
	var hasAskedFrancis = false;
	var askedToGiveLetter = false;
	var hasAnnesLetter = false;
	var FrancisIsHappy = false;
	var hasMirror = false;
/*******************Francis******************/


/****************Grave keeper****************/
	var hasShovel = false;
	var hasGhosts = false;
	var needsGhosts = false;
	var hasMetGravekeeper = false;
	var ghostDisplacement = 0;
	var ghostFloatLeft = true;
	var hasExorcised = false;
	var mustGiveMaidensTear = false;
	//hasMetDragon must correlate with this guy to know when to start searching for the maiden's tear
/****************Grave keeper****************/


/*******************Howard*******************/
	var hasMetHoward = false;
	var mustGiveMoneyforMeds = false;
	var hasGivenMoneyforMeds = false;
	var isHealthy = false;
	var journeymanExists = false;
/*******************Howard*******************/


/*******************Jester*******************/
	var isNotJoking = false;
	var wasDuped = false;
	var jesterIsCrying = false;
/*******************Jester*******************/


/*****************Journeyman*****************/
	var hasSilkCloth = false;
	var willingToFix = false;
	var giveFixedHammer = false;
	var JourneymanIsHappy = false;
/*****************Journeyman*****************/


/*******************Lucille******************/
	var hasMetLucille = false;
	var canFindSarelle = false;
/*******************Lucille******************/


/******************Magician******************/
	//hasReadDiary must correlate with this guy to be able to give him alcohol
	//needsGhosts must correlate with this guy to know when to ask for spirit spell
	var hasMetMagician = false;
	var isDrunk = false;
/******************Magician******************/


/******************Merchant******************/
	var itemToBuy = "";
/******************Merchant******************/


/******************Minstrel******************/
	var DressforHarp = false;
	var mustGiveHarp = false;
	var MinstrelisHappy = false;
	var hasMetMinstrel = false;
/******************Minstrel******************/


/********************Nurse*******************/
	var hasMetNurse = false;
	var mustGiveMeds = false;
	var hasBoughtMeds = false;
/********************Nurse*******************/


/*******************Peddler******************/
	var hasMetPeddler = false;
	var mustGiveStatue = false;
	var PeddlerIsHappy = false;
/*******************Peddler******************/


/*******************Potter*******************/
	var mustGiveRicePot = false;
/*******************Potter*******************/


/*******************Priest*******************/
	var hasDonated = false;
	var PriestIsDone = false;
	var mustGiveLetter = false;
/*******************Priest*******************/


/***************Royal Bannerett**************/
	var hasMetRoyalBannerett = false;
	var askBannerett = false;
/***************Royal Bannerett**************/


/*****************Royal Cook*****************/
	var hasMetRoyalCook = false;
	var	canBuyCherries = false;
	var hasCherries = false;
	var mustGiveCherryPie = false;
	var askForStrawberries = false;
	var hasStrawberries = false;
	var mustGiveStrawberryCake = false;
/*****************Royal Cook*****************/


/****************Royal Sentry****************/
	var hasMetRoyalSentry = false;
	var mustGiveRoyalSeal = false;
/****************Royal Sentry****************/


/*******************Sally********************/
	var hasMetSally = false;
	var canBuyFlour = false;
	var hasFlour = false;
	var mustGiveBone = false;
	var hasGivenBone = false;
	var hasFox = false;
	var canAskforFur = false;
	var mustGivePetBrush = false;
	var hasFur = false;
/*******************Sally********************/


/******************Sarelle*******************/
	var hasHankerchief = false;
	var hasHandMirror = false;
	var hasNecklace = false;
	var hasRoomKey = false;
	var hasReadDiary = false;
	var savedPrincess = false;
	var executeDelay = true; //always true unless set to false
	var PrincessDelayAmount = 0;
	var princesstimerenabled = false;
	var princessFaceAdded = false;
/******************Sarelle*******************/


/******************Sentry********************/
	var hasRoyalSeal = false; //set as true for testing purposes. When done, change this to false
/******************Sentry********************/


/********************Serf********************/
	var hasMetSerf = false;
	var askedForBlanket = false;
	var mustGiveShovel = false;
	var SerfIsHappy = false;
/********************Serf********************/


/******************Shepherd******************/
	var hasMetShepherd = false;
/******************Shepherd******************/


/********************Siren*******************/
	var canBuyFish = false;
	var hasFish = false;
	var hasMetSiren = false;
	var hasNecklace = false;
	var hasKnife = false;
	var SirenIsHappy = false;
	var isGivingCharmStone = false;
/********************Siren*******************/


/********************Smith*******************/
	var hasMetSmith = false;
	var hasHammer = false;
	var giveBrokenHammer = false;
	var giveArmor = false;
	var SmithIsHappy = false;
/********************Smith*******************/


/*****************Spirit Fox*****************/
	var isLeaving = false;
	var iterFox = 0;
	var FoxHasFood = false;
	var FoxGoesToEat = false;
	var FoxIsSurprised = false;
	var FoxIsFull = false;
	var FoxIsTame = false;
	var FoxDelayAmount = 0;
	var timer1enabled = false;
	var timer2enabled = false;
	var timer3enabled = false;
	var showExitsOnForest = false;
	var FoxTagsAlong = false;
	var gotSpiritFox = false;
/*****************Spirit Fox*****************/


/*******************Tailor*******************/
	var mustGiveClothes = false;
	var hasBoughtClothes = false;
/*******************Tailor*******************/


/******************Thatcher******************/
	var mustGetPie = false;
	var atePie = false;
	var hasThatcherInfo = false;
/******************Thatcher******************/


/********************Witch*******************/
	var canVisitWitch = false;
	var canAskWitch = false;
	var findWitchArtifacts = false;
	var findMerlinsSpell = false;
	var mustGiveSorcerersHeirloom = false;
	var needsCleanseSpell = false;
	var canAskForCleanseSpell = false;
	var hasCleanseSpell = false;
	var mustGiveCleanseSpell = false;
	var WitchIsHappy = false;
/********************Witch*******************/

var gameOverImage = document.createElement("img");

var hasHeirloom = false;
var canEnterForest = false;
var ransomCounter = 0;

//determines whether the games is being from a mobile device
var onMobile = false;

$(() => {
  var canvasLeft = ($(window).innerWidth() / 2) - 400;
  if ($('#whereforetheheckartthoucontainer').length) {
    document.getElementById("canvas").setAttribute("style", "position: absolute; top: 0px; left: " + canvasLeft + "px; width: 800px; height: 600px; border: solid black 3px; background-color: #408fdb;");
    $('#whereforetheheckartthoucontainer').css({background: 'url(./gamesbackground2.png)', backgroundSize: '100vw 100vh'});

    getStarted();
  }
})

/*KEY PRESS*/
document.onkeypress = function (e) {
  if (inMain) {
  // if (window.location.href.includes("/games/whereforetheheckartthou/whereforetheheckartthou")) {
    if (e.keyCode >= 97 && e.keyCode <= 122) { //to detect letters from a to z
      password += String.fromCharCode(e.keyCode);
    }
    else if (e.keyCode == 13) { //user pressed ENTER
      if (password == "") alert("Non-recognized entry...");
      else {
        if (password == "gfcfa") {
          alert("Recognized: Creator. Time skip 1 enabled");
          TimeSkip1();
        }
        else if (password == "gfcfb") {
          alert("Recognized: Creator. Time skip 2 enabled");
          TimeSkip2();
        }
        else if (password == "gfcfc") {
          alert("Recognized: Creator. Time skip 3 enabled");
          TimeSkip3();
        }
        else if (password == "ric") {
          if (!showDebug) {
            alert("Recognized: Enrique. Debug enabled");
            showDebug = true;
          }
          else {
            alert("Recognized: Enrique. Debug disabled");
            showDebug = false;
          }
        }
        else if (password == "sab") {
          if (!showDebug) {
            alert("Recognized: Sabrina. Debug enabled");
            showDebug = true;
          }
          else {
            alert("Recognized: Sabrina. Debug disabled");
            showDebug = false;
          }
        }
        else if (password == "p") { //to pause sound when needed
          if (soundTrack.paused) soundTrack.play();
          else soundTrack.pause();
        }
        else alert("Non-recognized entry...");
      }
      password = "";
    }
  }
};

//function to skip favor gathering. Comment out as soon as done testing
function TimeSkip1() {
	hasSavings = true;
	favors = 10;
	hasMetSally = true;
	hasFlour = true;
	AnneIsHappy = true;
	AnneGivesItems = false;
	items[0][1].src = itemimages[0].src;
	items[0][1].style.cursor = "pointer";
	items[0][1].onmouseover = function() { itemDescription.innerHTML = "Anne's Knife";};
	items[0][1].onmouseout = function() { itemDescription.innerHTML = "Select an item to use or give";};
	items[0][1].onclick = function() {
		if (currentCharacter == characters[chars.SIREN]) {
			SirenIsHappy = true;
			showTextOnGivingItem("Siren");
			dialogueText = "Oh, thank you so much! Here... this is my family's heirloom. I want you to have it!";
			canBuyFish = true;
			hideElementsOnGivingItem(0, 1);
		}
		else ShowWrongItemMessage();
	};
	FrancisIsHappy = true;
	hasMetFrancis = true;
	isSleeping = true;
	MinstrelisHappy = true;
	hasBoughtClothes = true;
	SerfIsHappy = true;
	hasShovel = true;
	hasBoughtMeds = true;
	isHealthy = true;
	hasDonated = true;
	isNotJoking = true;
	hasRicePot = true;
	DuchessIsHappy = true;
	hasCherries = true;
	DukeAtePie = true;
	isGrounded = true;
	atePie = true;
	money = 400;
	hasMetMagician = true;
	hasMetLucille = true;
}

function TimeSkip2() {
	TimeSkip1();

	availableCategories = 3;
	hasFin = true;
	items[0][1].src = itemimages[27].src;
	items[0][1].style.cursor = "default";
	items[0][1].onmouseover = undefined;
	items[0][1].onclick = undefined;

	hasRoyalSeal = true;
	items[2][6].src = itemimages[41].src;
	items[2][6].style.cursor = "pointer";
	items[2][6].onmouseover = function() { itemDescription.innerHTML = "Royal Seal";};
	items[2][6].onmouseout = function() { itemDescription.innerHTML = "Select an item to use or give";};

	hasHankerchief = true;
	items[2][0].src = itemimages[36].src;
	items[2][0].style.cursor = "pointer";
	items[2][0].onmouseover = function() { itemDescription.innerHTML = "Princess's Handkerchief";};
	items[2][0].onmouseout = function() { itemDescription.innerHTML = "Select an item to use or give";};

	hasHandMirror = true;
	items[2][1].src = itemimages[38].src;
	items[2][1].style.cursor = "pointer";
	items[2][1].onmouseover = function() { itemDescription.innerHTML = "Princess's Hand Mirror";};
	items[2][1].onmouseout = function() { itemDescription.innerHTML = "Select an item to use or give";};

	hasNecklace = true;
	items[2][2].src = itemimages[39].src;
	items[2][2].style.cursor = "pointer";
	items[2][2].onmouseover = function() { itemDescription.innerHTML = "Princess's Necklace";};
	items[2][2].onmouseout = function() { itemDescription.innerHTML = "Select an item to use or give";};

	hasRoomKey = true;
	items[2][3].src = itemimages[37].src;
	items[2][3].style.cursor = "pointer";
	items[2][3].onmouseover = function() { itemDescription.innerHTML = "Princess's Room Key";};
	items[2][3].onmouseout = function() { itemDescription.innerHTML = "Select an item to use or give";};

	hasMetDukeAtHome = true;
	hasMetRoyalCook = true;
	SirenIsHappy = true;
	PeddlerIsHappy = true;
	JourneymanIsHappy = true;
	SmithIsHappy = true;
	hasArmor = true;
}

function TimeSkip3() {
	TimeSkip2();

	canPickStrawberries = true;
	canVisitDragon = true;
	canVisitWitch = true;
	banditOnCave = true;
	canEnterForest = true;
	DukeIsHappy = true;
	isDrunk = true;
	hasBoughtWine = true;
	hasFox = true;
	gotSpiritFox = true;
	availableCategories = 4;
	money = 100;
	endGame = true;
}

//Executes upon finishing the page load - Works like a constructor of sorts
function getStarted() {
  $('body').css({opacity: 1});
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) onMobile = true;

	if (!onMobile) loadSounds();
	preloadGreenDream();
}
// $(document).ready(function (e) {
// 	$('body').css({opacity: 1});
// 	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) onMobile = true;

// 	if (!onMobile) loadSounds();
// 	preloadGreenDream();
// });

function prepareGame() {
	if(!onMobile) playSoundTrack("Intro");

	//create variable to define debug variable
	var debug = document.createElement("div");
	debug.id = "debug";
	debug.setAttribute("style", "position: absolute; font-size: 10px; z-index: 0; visibility: hidden");

	character.id = "character";

	//create image of logo
	var logo = document.createElement("img");
	logo.id = "logo";
	logo.setAttribute("style", "width: 379px; height: 321px; position: absolute; top: 0px; left: " + (canvasLeft + (canvasWidth / 2) - 190) + "px;");
	logo.src = imageRoot + "logo.png";
	logo.alt = "logo";

	//set up fader
	fader.id = "fader";
	fader.setAttribute("style", "width: 800px; height: 600px; display: block; background: #000000; opacity: 0.0; -webkit-transition: opacity 1s ease-in-out; transition: opacity 1s ease-in-out; visibility: hidden; position: absolute; left: " + canvasLeft + "px; z-index: 3;");

	//sets up game over image
	gameOverImage.id = "gameoverimage";
	gameOverImage.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - 105) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 303) + "px; z-index: -99; opacity: 0.0; -webkit-transition: opacity 1s ease-in-out; transition: opacity 1s ease-in-out; visibility: hidden;");
	gameOverImage.src = imageRoot + "gameover.png";

	//create elements to show in introduction
	var intromessage = document.createElement("div");
	intromessage.id = "intromessage";
	intromessage.setAttribute("style", "width: 500px; height: 250px; position: absolute; top: " + (50 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 250) + "px; color: #ffffff; z-index: 2; visibility: hidden;");
	intromessage.innerHTML = "One day, at the town square...<br><q>Attention townspeople!<br>Our princess is missing!<br>Anyone who has knowledge of her whereabouts,<br>scort her back to the castle!</q>, the royal guard said.<br><br>Where could she be? I'm going to save you, princess...!!<br>";

	//create images of buttons
	var start = document.createElement("img");
	start.id = "start";
	start.setAttribute("style", "width: 150px; height: 50px; position: absolute; top: 300px; left: " + (canvasLeft + (canvasWidth / 2) - 75) + "px; cursor: pointer");
	start.src = buttonimages[8].src;
	start.alt = "button";
	start.onmouseover = function() { this.src = buttonRoot + "mouseover/" + "start.png";};
	start.onmouseout = function() {this.src = buttonimages[8].src;};
	start.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	start.onclick = function() {
		if(!onMobile) playSoundEffect("push");
		$('#soundTrack').animate({volume: 0.0}, 250); //fades out the volume of the soundTrack object
		fader.style.visibility = "visible";
		fader.style.opacity = "1.0";
		$('#fader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
		function(e) {
			if (inMain) {
				if(!onMobile) {
					soundTrack.pause();
					soundTrack.currentTime = 0;
				}
				fader.style.zIndex = 2;
				startIntro();
			}
		});
	};

	var instructions = document.createElement("img");
	instructions.id = "instructions";
	instructions.setAttribute("style", "width: 150px; height: 50px; position: absolute; top: 360px; left: " + (canvasLeft + (canvasWidth / 2) - 75) + "px; cursor: pointer");
	instructions.src = buttonimages[7].src;
	instructions.alt = "button";
	instructions.onmouseover = function() { this.src = buttonRoot + "mouseover/" + "instructions.png";};
	instructions.onmouseout = function() {this.src = buttonimages[7].src;};
	instructions.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	instructions.onclick = function() {
		if(!onMobile) playSoundEffect("push");
		document.getElementById("logo").style.visibility = "hidden";
		document.getElementById("start").style.visibility = "hidden";
		document.getElementById("instructions").style.visibility = "hidden";
		document.getElementById("credits").style.visibility = "hidden";
		inIntroduction = true;
		inIntro = false;
		backButton.setAttribute("style", "width: 150px, height: 50px; position: absolute; top: " + (canvasHeight - 50) + "px; left: " + (canvasLeft + canvasWidth - 150) + "px; cursor: pointer; visibility: visible; z-index: 99;");
		instpic.style.visibility = "visible";
	};

	var credits = document.createElement("img");
	credits.id = "credits";
	credits.setAttribute("style", "width: 150px; height: 50px; position: absolute; top: 420px; left: " + (canvasLeft + (canvasWidth / 2) - 75) + "px; cursor: pointer");
	credits.src = buttonRoot + "credits.png";
	credits.alt = "button";
	credits.onmouseover = function() { this.src = buttonRoot + "mouseover/" + "credits.png";};
	credits.onmouseout = function() {this.src = buttonRoot + "credits.png";};
	credits.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	credits.onclick = function() {
		if(!onMobile) playSoundEffect("push");
		document.getElementById("logo").style.visibility = "hidden";
		document.getElementById("start").style.visibility = "hidden";
		document.getElementById("instructions").style.visibility = "hidden";
		document.getElementById("credits").style.visibility = "hidden";
		inIntroduction = true;
		inIntro = false;
		backButton.setAttribute("style", "width: 150px, height: 50px; position: absolute; top: " + (canvasHeight - 50) + "px; left: " + (canvasLeft + canvasWidth - 150) + "px; cursor: pointer; visibility: visible; z-index: 99;");
		credpic.style.visibility = "visible";
	};

	var continueb = document.createElement("img");
	continueb.id = "continue";
	continueb.setAttribute("style", "width: 150px; height: 50px; position: absolute; top: 360px; left: " + (canvasLeft + (canvasWidth / 2) - 75) + "px; cursor: pointer; z-index: 2; visibility: hidden;");
	continueb.src = buttonimages[3].src;
	continueb.alt = "button";
	continueb.onmouseover = function() { this.src = buttonRoot + "mouseover/" + "continue.png";};
	continueb.onmouseout = function() {this.src = buttonimages[3].src;};
	continueb.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	continueb.onclick = function() {
		if(!onMobile) playSoundEffect("push");
		if (inGame) {
			if (gameFinished) {
				finalIndex++;
				if (finalIndex == finalMessages.length) {
					continueb.style.visibility = "hidden";
					document.getElementById("intromessage").style.visibility = "hidden";

					fader.style.visibility = "visible";
					fader.style.opacity = "0.0";
					$('#fader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
					function(e) {
						//nothing. Game is finally over!
					});
				}
				else document.getElementById("intromessage").innerHTML = finalMessages[finalIndex];
			}
			else {
				if (FoxTagsAlong) {
					showExitsOnForest = true;
					gotSpiritFox = true;
					FoxTagsAlong = false;
				}

				if (AnneIsHappy && AnneGivesItems) {
					showItemConfirmation(0, "Anne's Knife", 0, 1);
					items[0][1].onclick = function() {
						if (currentCharacter == characters[chars.SIREN]) {
							SirenIsHappy = true;
							showTextOnGivingItem("Siren");
							dialogueText = "Oh, thank you so much! Here... this is my family's heirloom. I want you to have it!";
							canBuyFish = true;
							hideElementsOnGivingItem(0, 1);
						}
						else ShowWrongItemMessage();
					};

					AnneGivesItems = false;
					return;
				}

				if (isNotAlone) {
					for(var i = 0; i < actionButtons.length; i++) {
						actionButtons[i].style.visibility = "visible";
					}
				}

				for (var i = 0; i < arrowsVisible; i++) {
					arrows[i].style.visibility = "visible";
				}
				arrowsVisible = 0;

				document.getElementById("gotitembar").style.visibility = "hidden";
				document.getElementById("gotitemimg").style.visibility = "hidden";
				document.getElementById("gotitemtxt").style.visibility = "hidden";
				document.getElementById("continue").style.visibility = "hidden";

				document.getElementById("gotitembar").style.zIndex = -1;
				document.getElementById("gotitemimg").style.zIndex = -1;
				document.getElementById("gotitemtxt").style.zIndex = -1;
				document.getElementById("continue").style.zIndex = -1;

				dispinfobar.style.visibility = "visible";
				separatorbar.style.visibility = "visible";
				infobar.style.visibility = "visible";
				bag.style.visibility = "visible";
				coins.style.visibility = "visible";
				dispmoney.style.visibility = "visible";
				dispfavors.style.visibility = "visible";
				if (hasArmor) armor.style.visibility = "visible";

				if (itemToBuy != "") {
					showElements();
					itemToBuy = "";
				}

				dialogueText = "";
			}
		}
		else {
			startGame();
			fader.style.opacity = "0.0";
			$('#fader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
			function(e) {
				fader.style.visibility = "hidden";
				if(!onMobile) playSoundTrack("Crimsonia");
			});
		}
	};

	buyButton.id = "buybutton";
	buyButton.setAttribute("style", "width: 150px, height: 50px; position: absolute; top: " + (canvasHeight - 120) + "px; left: " + (canvasLeft + canvasWidth - 170) + "px; cursor: pointer; visibility: hidden;");
	buyButton.src = buttonimages[2].src;
	buyButton.alt = "buy";
	buyButton.onmouseover = function() { this.src = buttonRoot + "mouseover/buy.png";};
	buyButton.onmouseout = function() { this.src = buttonimages[2].src;};
	buyButton.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};

	backButton.id = "backbutton";
	backButton.setAttribute("style", "width: 150px, height: 50px; position: absolute; top: " + (canvasHeight - 60) + "px; left: " + (canvasLeft + canvasWidth - 170) + "px; cursor: pointer; visibility: hidden;");
	backButton.src = buttonimages[1].src;
	backButton.alt = "button";
	backButton.onmouseover = function() { this.src = buttonRoot + "mouseover/back.png";};
	backButton.onmouseout = function() { this.src = buttonimages[1].src;};
	backButton.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	backButton.onclick = function() {
		if(!onMobile) playSoundEffect("push");
		if (inIntroduction) {
			document.getElementById("logo").style.visibility = "visible";
			document.getElementById("start").style.visibility = "visible";
			document.getElementById("instructions").style.visibility = "visible";
			document.getElementById("credits").style.visibility = "visible";
			inIntroduction = false;
			inIntro = true;
			backButton.setAttribute("style", "width: 150px, height: 50px; position: absolute; top: " + (canvasHeight - 60) + "px; left: " + (canvasLeft + canvasWidth - 170) + "px; cursor: pointer; visibility: hidden;");
			instpic.style.visibility = "hidden";
			credpic.style.visibility = "hidden";
		}
		else {
			if (askBannerett) {
				backButton.style.visibility = "hidden";
				messagebar.innerHTML = "";

				selectchar.style.visibility = "visible";
				backchar.style.visibility = "visible";
				nextchar.style.visibility = "visible";
				prevchar.style.visibility = "visible";
				catchar.style.visibility = "visible";

				if (availableCategories >= 2) {
					currentCategories.push("Town Characters");
					currentCategories.push("Castle Characters");
				}
				if (availableCategories >= 3) currentCategories.push("Outside Characters");
				if (availableCategories == 4) currentCategories.push("Mysterious Characters");

				catchar.innerHTML = currentCategories[0];
			}
			else {
				if (buyButton.style.visibility == "visible") buyButton.style.visibility = "hidden";

				backButton.style.visibility = "hidden";
				messagebar.innerHTML = "";
				messagebar.style.visibility = "hidden";
				itembox.style.visibility = "hidden";

				if (itemToBuy != "") itemToBuy = "";

				for (var i = 0; i < items.length; i++) {
					for (var j = 0; j < 7; j++) {
						items[i][j].style.visibility = "hidden";
						items[i][j].style.zIndex = "-1";
					}
				}

				itemDescription.style.visibility = "hidden";
				itemDescription.style.zIndex = -1;

				backButton.style.zIndex = -1;

				if (currentCharacter == characters[chars.SENTRY]) {
					character.style.visibility = "hidden";
					dispinfobar.style.visibility = "visible";
					separatorbar.style.visibility = "visible";
					infobar.style.visibility = "visible";
					bag.style.visibility = "visible";
					coins.style.visibility = "visible";
					dispmoney.style.visibility = "visible";
					dispfavors.style.visibility = "visible";
					for (var i = 0; i < arrowsVisible; i++) {
						arrows[i].style.visibility = "visible";
					}
					arrowsVisible = 0;
					prepareBackground("", 0, 0);
				}
				else {
					if (currentCharacter == characters[chars.DRAGON]) {
						if (ransomCounter == 3) savedPrincess = true;
						else if (!hasMetDragon) {
							if (!onMobile) {
								soundTrack.pause();
								soundTrack.currentTime = 0;
							}
							if(!onMobile) playSoundEffect("dragonfire");
							var dragonsnout = document.createElement("img");
							dragonsnout.id = "dragonsnout";
							dragonsnout.src = faceimages[3].src;
							dragonsnout.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + 9 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[3].width / 2)) + "px; visibility: visible;");
							document.getElementById("canvas").appendChild(dragonsnout);

							fader.style.backgroundColor = "#ff0000";
							fader.style.visibility = "visible";
							fader.style.opacity = "1.0";
							$('#fader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
							function(e) {
								if (fader.style.opacity == 1) {
									if (hasArmor) {
										if(!onMobile) playSoundTrack("Dragon");
										hasMetDragon = true;
										document.getElementById("canvas").removeChild(dragonsnout);
										fader.style.opacity = 0.0;
										$('#fader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
										function(e) {
											fader.style.backgroundColor = "#000000";
											fader.style.visibility = "hidden";
											showElements();
										});
									}
									else { //Game over :.(
										if(!onMobile) gameoverSound.play();
										gameOverImage.style.visibility = "visible";
										gameOverImage.style.zIndex = "99";
										gameOverImage.style.opacity = "1.0";
									}
								}
							});

							showElements();
						}
						else if (mustGiveDragonTusk) {
							hideElementsOnGettingItem();
							showItemConfirmation(17, "Dragon Tusk", 1, 4);
							items[1][4].onclick = function() {
								if (currentCharacter == characters[chars.WITCH]) {
									if (randomPrincessKidnapper == 1) {
										hideElementsOnGivingItem(1, 4);
										showTextOnGivingItem("Witch");

										ransomCounter++;
										if (ransomCounter != 3) dialogueText = "Why, thank you! But you still have items left to bring me!";
										else {
											dialogueText = "Amazing... You found all I asked for. Fine, fine, just... take the princess...";
										}
									}
									else ShowWrongItemMessage();
								}
								else if (currentCharacter == characters[chars.BANDIT]) {
									if (randomPrincessKidnapper == 2) {
										hideElementsOnGivingItem(1, 4);
										showTextOnGivingItem("Bandit");

										ransomCounter++;
										if (ransomCounter != 3) dialogueText = "That's it boy! Keep'em comin'!!";
										else {
											dialogueText = "You... actually brought all I asked for... I should make you my second in command! Anyways, here's your gal...";
										}
									}
									else ShowWrongItemMessage();
								}
								else ShowWrongItemMessage();
							}
							mustGiveDragonTusk = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.ANNE]) {
						if (AnneIsHappy && AnneGivesItems) {
							showItemConfirmation(1, "Anne's Letter", 0, 0);
							items[0][0].onclick = function() {
								if (currentCharacter == characters[chars.FRANCIS]) {
									FrancisIsHappy = true;
									var francishappy = document.createElement("img");
									francishappy.id = "francishappy";
									francishappy.src = faceimages[6].src;
									francishappy.setAttribute("style", "position: absolute; top: " + (51 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[6].width / 2)) + "px; visibility: visible;");
									document.getElementById("canvas").appendChild(francishappy);
									showTextOnGivingItem("Francis");
									dialogueText = "Did she like it? I knew she would! A letter? Let me see:" + quoteTagChar + "MY DEAR FRANCIS, MY HEART FLUTTERS WITH JOY AS THY FEELINGS I RETURN! MAY WE ELOPE ON THE DAY OF THE MORROW?" + quoteTagChar + " Okay dude, I got 'til tomorrow to get outta here! I'll see if I have heard of the princess, so come see me before then!";
									favors++;
									hideElementsOnGivingItem(0, 0);
								}
								else ShowWrongItemMessage();
							};
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.FRANCIS]) {
						if (hasMetFrancis && hasAskedFrancis && !askedToGiveLetter) {
							hideElementsOnGettingItem();
							showItemConfirmation(23, "Francis's Letter", 0, 0);
							items[0][0].onclick = function() {
								if (currentCharacter == characters[chars.ANNE]) {
									var annehappy = document.createElement("img");
									annehappy.id = "annehappy";
									annehappy.src = faceimages[1].src;
									annehappy.setAttribute("style", "position: absolute; top: " + (123 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[1].width / 2)) + "px; visibility: visible;");
									document.getElementById("canvas").appendChild(annehappy);
									showTextOnGivingItem("Anne");
									dialogueText = quoteTagChar + "DEAREST ANNE, I DO SO LOVE THEE. YOU NEED BUT TO SAY A WORD AND I SHALL CARRY THEE AWAY FROM HERE..." + quoteTagChar + " Oh, Francis does love me! Thank you so much! Please, give him this letter, and for you... I don't have much, but maybe this will suffice?";
									AnneIsHappy = true;
									favors++;
									hideElementsOnGivingItem(0, 0);
								}
								else ShowWrongItemMessage();
							};

							askedToGiveLetter = true;
						}
						else {
							showElements();
						}
					}
					else if (currentCharacter == characters[chars.SIREN]) {
						if (SirenIsHappy && !hasKnife) {
							hideElementsOnGettingItem();
							showItemConfirmation(45, "Siren Fin", 0, 1);
							items[0][1].onclick = function() {
								if (currentCharacter == characters[chars.FISHERMAN]) {
									hasFin = true;
									showTextOnGivingItem("Fisherman");
									dialogueText = "A siren scale! Thanks, man! You don't know how valuable this is to me!";
									hideElementsOnGivingItem(0, 1);
								}
								else ShowWrongItemMessage();
							};
							hasKnife = true;
						}
						else if (isGivingCharmStone) {
							hideElementsOnGettingItem();
							showItemConfirmation(8, "Charm Stone", 0, 2);
							items[0][2].onclick = function() {
								if (currentCharacter == characters[chars.PEDDLER]) {
									showTextOnGivingItem("Peddler");
									dialogueText = "The charm stone! That's it! Here, I'll give you this statue";
									mustGiveStatue = true;
									hideElementsOnGivingItem(0, 2);
								}
								else ShowWrongItemMessage();
							};
							isGivingCharmStone = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.PRIEST]) {
						if (!PriestIsDone && mustGiveLetter) {
							hideElementsOnGettingItem();
							showItemConfirmation(28, "Jester's Letter", 0, 2);
							items[0][2].onclick = function() {
								if (currentCharacter == characters[chars.JESTER]) {
									jesterIsCrying = true;
									var jestersad = document.createElement("img");
									jestersad.id = "jestersad";
									jestersad.src = faceimages[9].src;
									jestersad.setAttribute("style", "position: absolute; top: " + (138 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[9].width / 2)) + "px; visibility: visible;");
									document.getElementById("canvas").appendChild(jestersad);
									showTextOnGivingItem("Jester");
									dialogueText = "Oh... Beatrice... Beatrice! I... I never knew she forgave me! I'm sorry, kid. I was a minstrel on Poitiers before, and I had a fight with my girlfriend... I told her I'd rather be a jester than stay with her! I need to go back and apologize! Here, thank you for giving me this. If you ever need help, come back and ask me anything...";
									favors++;
									hideElementsOnGivingItem(0, 2);
								}
								else ShowWrongItemMessage();
							};
							PriestIsDone = true;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.JESTER]) {
						if (!isNotJoking && jesterIsCrying) {
							hideElementsOnGettingItem();
							getMoney(32, 250);
							isNotJoking = true;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.PEDDLER]) {
						if (mustGiveStatue) {
							hideElementsOnGettingItem();
							showItemConfirmation(42, "Samurai Statue", 0, 2);
							items[0][2].onclick = function() {
								if (currentCharacter == "barterer") {
									if (canTradeSilkCloth) {
										showTextOnGivingItem("Barterer");
										dialogueText = "A samurai statue. Here, I'll give you the Silk for it";
										BartererGivesSilk = true;
										hideElementsOnGivingItem(0, 2);
									}
									else {
										hideElementsForDialogue();
										showTextOnGivingItem("Barterer");
										dialogueText = "Sorry, I don't think I have anything in exchange for that.";
									}
								}
								else ShowWrongItemMessage();
							};
							mustGiveStatue = false;
							PeddlerIsHappy = true;
						}
						else showElements();
					}
					else if (currentCharacter == "barterer") {
						//ifs for items to be exchanged
						if (BartererGivesSilk) {
							document.getElementById("canvas").removeChild(document.getElementById("silkcloth"));
							canTradeSilkCloth = false;
							hideElementsOnGettingItem();
							showItemConfirmation(44, "Silk Cloth", 0, 2);
							items[0][2].onclick = function() {
								if (currentCharacter == characters[chars.JOURNEYMAN]) {
									showTextOnGivingItem("Journeyman");
									dialogueText = "This silk cloth should do just fine. Many thanks! If you have anything that needs fixing, I'll do it for free!";
									willingToFix = true;
									hideElementsOnGivingItem(0, 2);
									JourneymanIsHappy = true;
								}
								else ShowWrongItemMessage();
							};
							BartererGivesSilk = false;
						}
						else if (mustGiveMerlinSpell) {
							document.getElementById("canvas").removeChild(document.getElementById("merlinspell"));
							canTradeMerlinSpell = false;
							hideElementsOnGettingItem();
							showItemConfirmation(31, "Merlin's Spell", 1, 5);
							items[1][5].onclick = function() {
								if (currentCharacter == characters[chars.WITCH]) {
									hideElementsOnGivingItem(1, 5);
									showTextOnGivingItem("Witch");

									if (randomPrincessKidnapper == 1) {
										ransomCounter++;
										if (ransomCounter != 3) dialogueText = "Why, thank you! But you still have items left to bring me!";
										else {
											dialogueText = "Amazing... You found all I asked for. Fine, fine, just... take the princess...";
										}
									}
									else {
										dialogueText = "Merlin's Spell! Ooh I've been looking for it my whole life!!... Shut your mouth, I'm only 233 years young! Anyways, here's what I promised you...";
										mustGiveSorcerersHeirloom = true;
										WitchIsHappy = true;
									}
								}
								else ShowWrongItemMessage();
							};
							mustGiveMerlinSpell = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.SMITH]) {
						if (giveBrokenHammer) {
							hideElementsOnGettingItem();
							showItemConfirmation(6, "Broken Hammer", 0, 3);
							items[0][3].onclick = function() {
								if (currentCharacter == characters[chars.JOURNEYMAN]) {
									if (willingToFix) {
										showTextOnGivingItem("Journeyman");
										dialogueText = "Broken hammer, huh? No sweat. Here you go!";
										giveFixedHammer = true;
										hideElementsOnGivingItem(0, 3);
									}
									else {
										hideElementsForDialogue();
										showTextOnGivingItem("Journeyman");
										dialogueText = "You need this hammer fixed? Well, why don't you find me a gift for the master craftsman? I'll fix it for you in exchange for that";
									}
								}
								else ShowWrongItemMessage();
							};
							hasHammer = true;
							giveBrokenHammer = false;
						}
						else if (giveArmor) {
							SmithIsHappy = true;
							armor.style.visibility = "visible";
							hasArmor = true;
							if(!onMobile) playSoundEffect("armor");
							giveArmor = false;
							showElements();
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.JOURNEYMAN]) {
						if (giveFixedHammer) {
							hideElementsOnGettingItem();
							showItemConfirmation(24, "Fixed Hammer", 0, 3);
							items[0][3].onclick = function() {
								if (currentCharacter == characters[chars.SMITH]) {
									hideElementsOnGivingItem(0, 3);
									showTextOnGivingItem("Smith");
									dialogueText = "My hammer is fixed! Thanks boy! As a reward, I have this for you. My little cousin who lives in Normandy wants an armor, but I figured I could do another one for him in the meantime. Go ahead, it's yours now!";
									giveArmor = true;
								}
								else ShowWrongItemMessage();
							};
							giveFixedHammer = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.NURSE]) {
						if (mustGiveMeds) {
							hideElementsOnGettingItem();
							showItemConfirmation(30, "Medicine", 0, 4);
							items[0][4].onclick = function() {
								if (currentCharacter == characters[chars.HOWARD]) {
									hideElementsOnGivingItem(0, 4);
									showTextOnGivingItem("Howard");
									dialogueText = "Thank you! I can finally be healthy again!!";
									favors++;
									var howardhappy = document.createElement("img");
									howardhappy.id = "howardhappy";
									howardhappy.src = faceimages[8].src;
									howardhappy.setAttribute("style", "position: absolute; top: " + (50 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[8].width / 2)) + "px; visibility: visible;");
									document.getElementById("canvas").appendChild(howardhappy);
									isHealthy = true;
								}
								else ShowWrongItemMessage();
							};
							mustGiveMeds = false;
							hasBoughtMeds = true;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.HOWARD]) {
						if (mustGiveMoneyforMeds) {
							hideElementsOnGettingItem();
							getMoney(32, 350);
							mustGiveMoneyforMeds = false;
							hasGivenMoneyforMeds = true;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.TAILOR]) {
						if (mustGiveClothes) {
							hideElementsOnGettingItem();
							showItemConfirmation(14, "Dress", 0, 5);
							items[0][5].onclick = function() {
								if (currentCharacter == characters[chars.MINSTREL]) {
									hideElementsOnGivingItem(0, 5);
									showTextOnGivingItem("Minstrel");
									dialogueText = "Huzzah! New Dress! Thanks!! I'll wear this on a special occasion! As promised, I'll give you a harp!";
									mustGiveHarp = true;
									favors++;
								}
								else ShowWrongItemMessage();
							};
							mustGiveClothes = false;
							hasBoughtClothes = true;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.MINSTREL]) {
						if (mustGiveHarp) {
							hideElementsOnGettingItem();
							showItemConfirmation(25, "Harp", 0, 5);
							items[0][5].onclick = function() {
								if (currentCharacter == "bruce") {
									hideElementsOnGivingItem(0, 5);
									if (!onMobile) harpSound.play();
									showTextOnGivingItem("Bruce");
									dialogueText = "Thank you... Suddenly I feel so sleepy... I'll turn in now, but as a reward, feel free to take the blanket on my dresser...";
									mustGiveBlanket = true;
									favors++;
								}
								else ShowWrongItemMessage();
							};
							mustGiveHarp = false;
							MinstrelisHappy = true;
						}
						else showElements();
					}
					else if (currentCharacter == "bruce") {
						if (mustGiveBlanket) {
							var bruceasleep = document.createElement("img");
							bruceasleep.id = "bruceasleep";
							bruceasleep.src = faceimages[2].src;
							bruceasleep.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - 68 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) + 39) + "px;");
							document.getElementById("canvas").appendChild(bruceasleep);

							hideElementsOnGettingItem();
							showItemConfirmation(5, "Blanket", 0, 6);
							items[0][6].onclick = function() {
								if (currentCharacter == characters[chars.SERF]) {
									hideElementsOnGivingItem(0, 6);
									showTextOnGivingItem("Serf");
									if (askedForBlanket) dialogueText = "A new blanket! Thanks. Here, I've got this shovel for you";
									else dialogueText = "You're giving me a new blanket? Just what I needed! Here, why don't you take this shovel?";
									mustGiveShovel = true;
									favors++;
								}
								else ShowWrongItemMessage();
							};

							mustGiveBlanket = false;
							isSleeping = true;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.SERF]) {
						if (mustGiveShovel) {
							hideElementsOnGettingItem();
							showItemConfirmation(43, "Shovel", 0, 6);
							items[0][6].onclick = function() {
								if (currentCharacter == characters[chars.GRAVEKEEPER]) {
									hideElementsOnGivingItem(0, 6);
									showTextOnGivingItem("Grave Keeper");
									dialogueText = "A shovel! Yeah, thanks...";
									hasShovel = true;
									favors++;
								}
								else ShowWrongItemMessage();
							};
							SerfIsHappy = true;
							mustGiveShovel = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.ROYALCOOK]) {
						if (mustGiveCherryPie) {
							hasPie = true;
							hideElementsOnGettingItem();
							showItemConfirmation(11, "Cherry Pie", 0, 5);
							items[0][5].onclick = function() {
								if (currentCharacter == characters[chars.THATCHER]) {
									hideElementsOnGivingItem(0, 5);
									showTextOnGivingItem("Thatcher");
									dialogueText = "Mmm... thank you so much!";
									atePie = true;
								}
								else ShowWrongItemMessage();
							};
							mustGiveCherryPie = false;
						}
						else if (mustGiveStrawberryCake) {
							hasPie = true;
							hideElementsOnGettingItem();
							showItemConfirmation(49, "Strawberry Cake", 0, 5);
							items[0][5].onclick = function() {
								if (currentCharacter == characters[chars.DUKE]) {
									document.getElementById("canvas").removeChild(document.getElementById("dukesad"));
									hideElementsOnGivingItem(0, 5);
									showTextOnGivingItem("Duke");
									dialogueText = "Mmm... thank you so much, boy! I've been rubbing my stomach this whole time that I haven't found anything to give you... wait, I'm sure they won't miss this at the treasury!";
									DukeIsHappy = true;
									mustGiveEmeraldBrace = true;
									mustGetCake = false;
									mustGetPie = false;
								}
								else ShowWrongItemMessage();
							};
							mustGiveStrawberryCake = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.DUKE]) {
						if (hasPie && infoLocation != "Duke's Manor - Foyer") {
							if (!onMobile) munchSound.play();
							items[0][5].src = itemimages[27].src;
							items[0][5].style.cursor = "default";
							items[0][5].onmouseover = undefined;
							items[0][5].onclick = undefined;
							hasPie = false;
							hasCherries = false;
							showElements();
						}
						else if (mustGiveEmeraldBrace) {
							hideElementsOnGettingItem();
							showItemConfirmation(18, "Emerald Brace", 1, 2);
							items[1][2].onclick = function() {
								if (currentCharacter == characters[chars.BANDIT]) {
									hideElementsOnGivingItem(1, 2);
									showTextOnGivingItem("Bandit");

									if (randomPrincessKidnapper == 2) {
										ransomCounter++;
										if (ransomCounter != 3) dialogueText = "That's it boy! Keep'em comin'!!";
										else {
											dialogueText = "You... actually brought all I asked for... I should make you my second in command! Anyways, here's your gal...";
										}
									}
									else {
										var foundit = "You actually found the Emerald Brace? Fine, I'll give you ";
										if (randomPrincessKidnapper == 0) {
											dialogueText = foundit + "the Castile Cross";
											mustGiveCastileCross = true;
										}
										else if (randomPrincessKidnapper == 1) {
											dialogueText = foundit + "Circe's vial";
											mustGiveCirceVial = true;
										}
										BanditIsHappy = true;
									}
								}
								else ShowWrongItemMessage();
							};
							mustGiveEmeraldBrace = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.DUCHESS]) {
						if (mustGiveMoneyforRicePot) {
							hideElementsOnGettingItem();
							getMoney(32, 200);
							mustGiveMoneyforRicePot = false;
							hasGivenMoneyforRicePot = true;
						}
						else showElements();
					}
					else if (currentCharacter == "potter") {
						if (mustGiveRicePot) {
							hasRicePot = true;
							hideElementsOnGettingItem();
							showItemConfirmation(40, "Rice Pot", 2, 5);
							items[2][5].onclick = function() {
								if (currentCharacter == characters[chars.DUCHESS]) {
									var duchesshappy = document.createElement("img");
									duchesshappy.id = "duchesshappy";
									duchesshappy.src = faceimages[4].src;
									duchesshappy.setAttribute("style", "position: absolute; top: " + (117 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[4].width / 2)) + "px; visibility: visible;");
									document.getElementById("canvas").appendChild(duchesshappy);

									hideElementsOnGivingItem(2, 5);
									showTextOnGivingItem("Duchess");
									dialogueText = "Thank you so much! This is just what I needed!";
									DuchessIsHappy = true;
									favors++;
								}
								else ShowWrongItemMessage();
							}
							mustGiveRicePot = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.ROYALSENTRY]) {
						if (mustGiveRoyalSeal) {
							hideElementsOnGettingItem();
							showItemConfirmation(41, "Royal Seal", 2, 6);
							mustGiveRoyalSeal = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.SALLY]) {
						if (mustGiveBone) {
							hideElementsOnGettingItem();
							showItemConfirmation(16, "Milk Bone", 2, 4);
							items[2][4].onclick = function() {
								if (currentCharacter == characters[chars.SPIRITFOX]) {
									var bone = document.createElement("img");
									bone.id = "bone";
									bone.src = itemimages[16].src;
									bone.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - 35) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 175) + "px;");
									document.getElementById("canvas").appendChild(bone);
									hideElementsOnGivingItem(2, 4);
									FoxHasFood = true;
									if(!onMobile) playSoundEffect("fade");
								}
								else ShowWrongItemMessage();
							}
							hasGivenBone = true;
							mustGiveBone = false;
						}
						else if (mustGivePetBrush) {
							hideElementsOnGettingItem();
							showItemConfirmation(35, "Pet Brush", 2, 4);
							items[2][4].onclick = function() {
								if (currentCharacter == characters[chars.WITCH]) {
									hideElementsOnGivingItem(2, 4);
									showTextOnGivingItem("Witch");
									dialogueText = "Ah, the scent of the Spirit Fox! I can make a powerful cleanse spell with this! Here you go...";
									mustGiveCleanseSpell = true;
								}
								else ShowWrongItemMessage();
							}
							hasFur = true;
							mustGivePetBrush = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.SPIRITFOX]) {
						if (FoxTagsAlong) {
							hideElementsOnGettingItem();
							showItemConfirmation(47, "Spirit Fox", 2, 4);
							items[2][4].onclick = function() {
								if (currentCharacter == characters[chars.SALLY]) {
									var foxie = document.createElement("img");
									foxie.id = "foxie";
									foxie.src = charimages[chars.SPIRITFOXSMALL].src;
									foxie.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - 50) + "px; left: " + (canvasLeft + (canvasWidth / 4) - 15) + "px;");
									document.getElementById("canvas").appendChild(foxie);

									hasFox = true;
									document.getElementById("sallysad").src = faceimages[12].src;
									hideElementsOnGivingItem(2, 4);
									showTextOnGivingItem("Sally");
									dialogueText = "A... fox? He is so cute! Thank you, thank you soo much!!!";
								}
								else ShowWrongItemMessage();
							}
							hasGivenBone = true;
							mustGiveBone = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.BANDIT]) {
						if (ransomCounter == 3) savedPrincess = true;
						else if (mustGiveCastileCross) {
							hideElementsOnGettingItem();
							showItemConfirmation(7, "Castille Cross", 1, 3);
							items[1][3].onclick = function() {
								if (currentCharacter == characters[chars.DRAGON]) {
									if (randomPrincessKidnapper == 0) {
										hideElementsOnGivingItem(1, 3);
										showTextOnGivingItem("Dragon");

										ransomCounter++;
										if (ransomCounter != 3) dialogueText = "Magnificent... But you still must bring me more...";
										else {
											dialogueText = "You kept your promise. It is only fair that I oblige. Take your woman and leave. Do not ever return...";
										}
									}
									else ShowWrongItemMessage();
								}
								else ShowWrongItemMessage();
							};
							mustGiveCastileCross = false;
						}
						else if (mustGiveCirceVial) {
							hideElementsOnGettingItem();
							showItemConfirmation(30, "Circe's Vial", 1, 6);
							items[1][6].onclick = function() {
								if (currentCharacter == characters[chars.WITCH]) {
									if (randomPrincessKidnapper == 1) {
										hideElementsOnGivingItem(1, 6);
										showTextOnGivingItem("Witch");

										ransomCounter++;
										if (ransomCounter != 3) dialogueText = "Why, thank you! But you still have items left to bring me!";
										else {
											dialogueText = "Amazing... You found all I asked for. Fine, fine, just... take the princess...";
										}
									}
									else ShowWrongItemMessage();
								}
								else ShowWrongItemMessage();
							};
							mustGiveCirceVial = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.WITCH]) {
						if (ransomCounter == 3) savedPrincess = true;
						else if (mustGiveSorcerersHeirloom) {
							hideElementsOnGettingItem();
							showItemConfirmation(46, "Sorcerers' Heirloom", 1, 1);
							items[1][1].onclick = function() {
								if (currentCharacter == characters[chars.DRAGON]) {
									if (randomPrincessKidnapper == 0) {
										hideElementsOnGivingItem(1, 1);
										showTextOnGivingItem("Dragon");

										ransomCounter++;
										if (ransomCounter != 3) dialogueText = "Magnificent... But you still must bring me more...";
										else {
											dialogueText = "You kept your promise. It is only fair that I oblige. Take your woman and leave. Do not ever return...";
										}
									}
									else ShowWrongItemMessage();
								}
								else if (currentCharacter == characters[chars.BANDIT]) {
									if (randomPrincessKidnapper == 2) {
										hideElementsOnGivingItem(1, 1);
										showTextOnGivingItem("Bandit");

										ransomCounter++;
										if (ransomCounter != 3) dialogueText = "That's it boy! Keep'em comin'!!";
										else {
											dialogueText = "You... actually brought all I asked for... I should make you my second in command! Anyways, here's your gal...";
										}
									}
									else ShowWrongItemMessage();
								}
								else ShowWrongItemMessage();
							}
							mustGiveSorcerersHeirloom = false;
						}
						else if (mustGiveCleanseSpell) {
							hideElementsOnGettingItem();
							showItemConfirmation(13, "Cleanse Spell", 0, 6);
							items[0][6].onclick = function() {
								if (currentCharacter == characters[chars.GRAVEKEEPER]) {
									hideElementsOnGivingItem(0, 6);
									showTextOnGivingItem("Grave Keeper");
									document.getElementById("canvas").removeChild(document.getElementById("gravekeeperscared"));
									hasGhosts = false;
									dialogueText = "You have a cleanse spell? I'm saved... You want my gem? No! I won't give it, I... No, don't go! Ok, just take it!";
									mustGiveMaidensTear = true;
								}
							}
							mustGiveCleanseSpell = false;
						}
						else showElements();
					}
					else if (currentCharacter == "bartender") {
						if (mustGiveWine) {
							hideElementsOnGettingItem();
							showItemConfirmation(52, "Wine", 0, 6);
							items[0][6].onclick = function() {
								if (currentCharacter == characters[chars.MAGICIAN]) {
									isDrunk = true;

									var magiciandrunk = document.createElement("img");
									magiciandrunk.id = "magiciandrunk";
									magiciandrunk.src = faceimages[10].src;
									magiciandrunk.setAttribute("style", "position: absolute; top: " + (104 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[10].width / 2) - 27) + "px; visibility: visible;");
									document.getElementById("canvas").appendChild(magiciandrunk);

									hideElementsOnGivingItem(0, 6);
									showTextOnGivingItem("Magician");
									dialogueText = "Thatss the stuff! Hic! 'Scuse mee... I haven't drunk anything dis gud seence I stole my master's spirit... Who? It's the oollld witch from the fuh-fuh-forest...";
									needsCleanseSpell = true;
								}
								else ShowWrongItemMessage();
							}
							mustGiveWine = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.GRAVEKEEPER]) {
						if (mustGiveMaidensTear) {
							hideElementsOnGettingItem();
							showItemConfirmation(29, "Maiden's Tear", 1, 0);
							items[1][0].onclick = function() {
								if (currentCharacter == characters[chars.DRAGON]) {
									hideElementsOnGivingItem(1, 0);
									showTextOnGivingItem("Dragon");

									if (randomPrincessKidnapper == 0) {


										ransomCounter++;
										if (ransomCounter != 3) dialogueText = "Magnificent... But you still must bring me more...";
										else {
											dialogueText = "You kept your promise. It is only fair that I oblige. Take your woman and leave. Do not ever return...";
										}
									}
									else {
										dialogueText = "Finally, I can attain the gem of legend... As promised, I will give you my tusk...";
										DragonIsHappy = true;
										mustGiveDragonTusk = true;
									}
								}
								else ShowWrongItemMessage();
							}
							hasExorcised = true;
							mustGiveMaidensTear = false;
						}
						else showElements();
					}
					else if (currentCharacter == characters[chars.SARELLE]) {
						if (gameFinished) {

						}
						else {
							x = 0;
							y = 0;
							fadeIntoRoom("", 2, 3);
						}
					}
					else {
						showElements();
					}
				}
			}
		}
	};

	selectchar.id = "selectchar";
	selectchar.setAttribute("style", "width: 150px; height: 50px; position: absolute; top: " + (canvasHeight - 120) + "px; left: " + (canvasLeft + canvasWidth - 170) + "px; cursor: pointer; z-index: 2; visibility: hidden;");
	selectchar.src = buttonimages[3].src;
	selectchar.alt = "button";
	selectchar.onmouseover = function() { this.src = buttonRoot + "mouseover/" + "continue.png";};
	selectchar.onmouseout = function() {this.src = buttonimages[3].src;};
	selectchar.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	selectchar.onclick = function() {
		if(!onMobile) playSoundEffect("push");
		if (currentCharacter == characters[chars.SARELLE]) {
			princessIndex++;

			if (princessIndex == princessDialogue.length) {
				$('#soundTrack').animate({volume: 0.0}, 250);
				document.getElementById("PrincessTiara").style.zIndex = "1";
				document.getElementById("PrincessNecklace").style.zIndex = "1";
				selectchar.style.visibility = "hidden";

				fader.style.visibility = "visible";
				fader.style.opacity = "1.0";
				$('#fader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
				function(e) {
					if (!onMobile) {
						soundTrack.pause();
						soundTrack.currentTime = 0;
					}
					document.getElementById("canvas").removeChild(document.getElementById("PrincessTiara"));
					document.getElementById("canvas").removeChild(document.getElementById("PrincessNecklace"));
					character.style.visibility = "hidden";
					document.getElementById("canvas").style.backgroundImage = "url(" + imageRoot + "theend.png)";
					gameFinished = true;
					messagebar.style.visibility = "hidden";
					continueb.setAttribute("style", "width: 150px; height: 50px; position: absolute; top: 360px; left: " + (canvasLeft + (canvasWidth / 2) - 75) + "px; cursor: pointer; z-index: 2; visibility: hidden;");
					document.getElementById("continue").style.visibility = "visible";
					document.getElementById("intromessage").innerHTML = finalMessages[finalIndex];
					document.getElementById("intromessage").style.visibility = "visible";
					if(!onMobile) playSoundTrack("Intro");
				});
			}
			else {
				showText = true;
				dialogueText = princessDialogue[princessIndex];
				if (princessIndex == 3) charName = "You";
				else if (princessIndex == 4) {
					charName = "Princess";
					var princessface = document.createElement("img");
					princessface.id = "princessface";
					princessface.src = faceimages[15].src;
					princessface.setAttribute("style", "position: absolute; top: " + (86 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[15].width / 2)) + "px; visibility: visible;");
					document.getElementById("canvas").appendChild(princessface);
				}
				else if (princessIndex == 6) {
					charName = "Sarelle";
					document.getElementById("canvas").removeChild(document.getElementById("princessface"));
				}
			}
		}
		else {
			if (categorySelected) {
				categorySelected = false;
				catSelector = 0;
				namSelector = 0;
				currentCategories = [];
				currentCharacters = [];
				selectchar.style.visibility = "hidden";
				backchar.style.visibility = "hidden";
				nextchar.style.visibility = "hidden";
				prevchar.style.visibility = "hidden";
				catchar.style.visibility = "hidden";
				namchar.style.visibility = "hidden";
				nextchar.style.top = (480 - charOffset) + "px";
				prevchar.style.top = (480 - charOffset) + "px";

				backButton.src = buttonimages[1].src;
				backButton.onmouseover = function() { this.src = buttonRoot + "mouseover/back.png";};
				backButton.onmouseout = function() { this.src = buttonimages[1].src;};

				giveInfo(namchar.innerHTML);
			}
			else {
				categorySelected = true;
				nextchar.style.top = (530 - charOffset) + "px";
				prevchar.style.top = (530 - charOffset) + "px";
				namchar.style.visibility = "visible";
				if (currentCategories[catSelector] == "Town Characters") {
					currentCharacters.push("Anne");
					currentCharacters.push("The Bartender");
					currentCharacters.push("Bruce");
					currentCharacters.push("The Duchess");
					currentCharacters.push("The Duke");
					currentCharacters.push("Francis");
					currentCharacters.push("The Grave Keeper");
					currentCharacters.push("Howard");
					currentCharacters.push("The Magician");
					currentCharacters.push("The Merchant");
					currentCharacters.push("The Minstrel");
					currentCharacters.push("The Nurse");
					currentCharacters.push("The Peddler");
					currentCharacters.push("The Potter");
					currentCharacters.push("The Priest");
					currentCharacters.push("Sally");
					currentCharacters.push("The Sentry");
					currentCharacters.push("The Serf");
					currentCharacters.push("The Smith");
					currentCharacters.push("The Tailor");
					currentCharacters.push("The Thatcher");
				}
				else if (currentCategories[catSelector] == "Castle Characters") {
					currentCharacters.push("The Jester");
					currentCharacters.push("Lucille");
					currentCharacters.push("The Royal Cook");
					currentCharacters.push("The Royal Sentry");
				}
				else if (currentCategories[catSelector] == "Outside Characters") {
					currentCharacters.push("The Farmer");
					currentCharacters.push("The Fisherman");
					currentCharacters.push("The Journeyman");
					currentCharacters.push("The Shepherd");
					currentCharacters.push("The Siren");
				}
				else if (currentCategories[catSelector] == "Mysterious Characters") {
					currentCharacters.push("The Bandit");
					currentCharacters.push("The Dragon");
					currentCharacters.push("The Spirit Fox");
					currentCharacters.push("The Witch");
				}

				namchar.innerHTML = currentCharacters[0];
			}
		}
	};

	backchar.id = "backchar";
	backchar.setAttribute("style", "width: 150px; height: 50px; position: absolute; top: " + (canvasHeight - 60) + "px; left: " + (canvasLeft + canvasWidth - 170) + "px; cursor: pointer; z-index: 2; visibility: hidden;");
	backchar.src = buttonimages[1].src;
	backchar.alt = "button";
	backchar.onmouseover = function() { this.src = buttonRoot + "mouseover/" + "back.png";};
	backchar.onmouseout = function() {this.src = buttonimages[1].src;};
	backchar.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	backchar.onclick = function() {
		if(!onMobile) playSoundEffect("push");
		if (categorySelected) {
			categorySelected = false;
			nextchar.style.top = (480 - charOffset) + "px";
			prevchar.style.top = (480 - charOffset) + "px";
			namchar.style.visibility = "hidden";
			currentCharacters = [];
			namSelector = 0;
		}
		else {
			catSelector = 0;
			namSelector = 0;
			currentCategories = [];
			currentCharacters = [];
			selectchar.style.visibility = "hidden";
			backchar.style.visibility = "hidden";
			nextchar.style.visibility = "hidden";
			prevchar.style.visibility = "hidden";
			catchar.style.visibility = "hidden";

			backButton.src = buttonimages[1].src;
			backButton.onmouseover = function() { this.src = buttonRoot + "mouseover/back.png";};
			backButton.onmouseout = function() { this.src = buttonimages[1].src;};

			charName = "Royal Bannerett";
			dialogueText = "Come back if you need any more information";
			showText = true;
			askBannerett = false;
		}
	};

	catchar.id = "catchar";
	catchar.setAttribute("style", "display: block; color: #ffffff; text-align: center; position: absolute; top: " + (480 - charOffset) + "px; left: 110px; width: 400px; height: 30px; visibility: hidden;");

	namchar.id = "namchar";
	namchar.setAttribute("style", "display: block; color: #ffffff; text-align: center; position: absolute; top: " + (530 - charOffset) + "px; left: 110px; width: 400px; height: 30px; visibility: hidden;");

	nextchar.id = "nextchar";
	nextchar.setAttribute("style", "position: absolute; top: " + (480 - charOffset) + "px; left: " + (canvasLeft + canvasWidth - 260) + "px; cursor: pointer; visibility: hidden;");
	nextchar.src = arrowimages[0].src;
	nextchar.onmouseover = function() { this.src = arrowhoverimages[0].src; };
	nextchar.onmouseout = function() { this.src = arrowimages[0].src; };
	nextchar.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	nextchar.onclick = function() {
		if(!onMobile) playSoundEffect("push");
		if (categorySelected) {
			namSelector++;
			if (namSelector == currentCharacters.length) namSelector = 0;
			namchar.innerHTML = currentCharacters[namSelector];
		}
		else {
			catSelector++;
			if (catSelector == currentCategories.length) catSelector = 0;
			catchar.innerHTML = currentCategories[catSelector];
		}
	};

	prevchar.id = "prevchar";
	prevchar.setAttribute("style", "position: absolute; top: " + (480 - charOffset) + "px; left: 20px; cursor: pointer; visibility: hidden;");
	prevchar.src = arrowimages[13].src;
	prevchar.onmouseover = function() { this.src = arrowhoverimages[13].src; };
	prevchar.onmouseout = function() { this.src = arrowimages[13].src; };
	prevchar.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	prevchar.onclick = function() {
		if(!onMobile) playSoundEffect("push");
		if (categorySelected) {
			namSelector--;
			if (namSelector == -1) namSelector = currentCharacters.length - 1;
			namchar.innerHTML = currentCharacters[namSelector];
		}
		else {
			catSelector--;
			if (catSelector == -1) catSelector = currentCategories.length - 1;
			catchar.innerHTML = currentCategories[catSelector];
		}
	};

	//initialize the message bar and assign a location
	messagebar.id = "messagebar";
	messagebar.setAttribute("style", "display: block; border: solid white 5px; background-color: rgba(0, 100, 0, 0.5); color: #ffffff; position: absolute; top: " + (460 - charOffset) + "px; width: 790px; height: 140px; visibility: hidden; line-height: 100%;");

	itembox.id = "itembox";
	itembox.setAttribute("style", "display: block; border: solid white 5px; background-color: rgba(0, 100, 0, 0.5); position: absolute; top: " + (100 - charOffset) + "px; left: " + (canvasLeft + 100) + "px; width: 590px; height: 340px; visibility: hidden;");

	//initialize the display info bar
	dispinfobar.id = "dispinfobar";
	dispinfobar.setAttribute("style", "display: block; border: solid white 2px; background-color: rgba(0, 100, 0, 0.5); position: absolute; top: " + (577 - charOffset) + "px; width: 796px; height: 30px; visibility: hidden;");

	separatorbar.id = "separatorbar";
	separatorbar.setAttribute("style", "display: block; border: solid white 2px; position: absolute; top: " + (577 - charOffset) + "px; width: 471px; height: 30px; visibility: hidden;");

	//initialize the info bar
	infobar.id = "infobar";
	infobar.setAttribute("style", "display: block; color: #ffffff; position: absolute; top: " + (581 - charOffset) + "px; width: 465px; height: 30px; visibility: hidden; text-align: center;");
	infobar.innerHTML = "";

	//initialize the item confirmation bar
	gotitembar.id = "gotitembar";
	gotitembar.setAttribute("style", "display: block; border: solid white 5px; background-color: rgba(0, 100, 0, 0.5); color: #ffffff; position: absolute; top: " + (100) + "px; left: " + (canvasLeft + 200) + "px; width: 390px; height: 320px; visibility: hidden;")

	//initialize the image for item confirmation
	gotitemimg.id = "gotitemimg";
	gotitemimg.setAttribute("style", "position: absolute; top: 130px; left: " + (canvasLeft + (canvasWidth / 2) - 35) + "px; width: 70px; height: 70px; visibility: hidden;");

	//initialize the text for item confirmation
	gotitemtxt.id = "gotitemtxt";
	gotitemtxt.setAttribute("style", "display: block; color: #ffffff; position: absolute; top: 270px; left: " + (canvasLeft + 200) + "px; width: 400px; height: 50px; text-align: center; visibility: hidden;");

	//initialize the inventory image
	bag.id = "bag";
	bag.setAttribute("style", "position: absolute; top: " + (579 - charOffset) + "px; left: " + (canvasLeft + 630) + "px; width: 30px; height: 30px; cursor: pointer; visibility: hidden;");
	bag.src = itemimages[3].src
	bag.onmouseover = function() {
		this.src = itemimages[4].src;
		infobar.innerHTML = "View Inventory";
	};
	bag.onmouseout = function() {
		this.src = itemimages[3].src;
		infobar.innerHTML = infoLocation;
	};
	bag.onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	bag.onclick = function() {
		if(!onMobile) playSoundEffect("push");
		showInventory = true;
		prepareInventory();
	};

	//initialize the armor image
	armor.id = "armor";
	armor.setAttribute("style", "position: absolute; top: " + (579 - charOffset) + "px; left: " + (canvasLeft + 590) + "px; width: 30px; height: 30px; visibility: hidden;");
	armor.src = itemimages[2].src

	populateInventoryBox();

	itemDescription.id = "itemdescription";
	itemDescription.setAttribute("style", "color: #ffffff; position: absolute; top: " + (canvasHeight - 212 - charOffset) + "px; left: " + (canvasLeft + 125) + "px; visibility: hidden;");
	itemDescription.innerHTML = "Select an item to use or give";

	//initialize the money image
	coins.id = "coins";
	coins.setAttribute("style", "position: absolute; top: " + (579 - charOffset) + "px; left: " + (canvasLeft + 670) + "px; width: 30px; height: 30px; visibility: hidden;");
	coins.src = itemimages[15].src;

	//initialize the money display
	dispmoney.id = "dispmoney";
	dispmoney.setAttribute("style", "display: block; position: absolute; top: " + (581 - charOffset) + "px; left: " + (canvasLeft + 710) + "px; width: 90px; height: 30px; visibility: hidden; text-align: left; color: #ffffff;");
	dispmoney.innerHTML = "$ " + money;

	//initialize the favor display
	dispfavors.id = "dispfavors";
	dispfavors.setAttribute("style", "display: block; position: absolute; top: " + (581 - charOffset) + "px; left: " + (canvasLeft + 485) + "px; width: 100px; height: 30px; visibility: hidden; text-align: left; color: #ffffff;");
	dispfavors.innerHTML = "Favors: " + favors;

	instpic.id = "instpic";
	instpic.setAttribute("style", "position: absolute; top: " + (canvasTop) + "px; left: " + (canvasLeft) + "px; visibility: hidden;");
	instpic.src = imageRoot + "instructions.png";

	credpic.id = "credpic";
	credpic.setAttribute("style", "position: absolute; top: " + (canvasTop) + "px; left: " + (canvasLeft) + "px; visibility: hidden;");
	credpic.src = imageRoot + "credits.png";

	//Before starting game loop, append all created elements to the canvas
	document.getElementById("canvas").appendChild(fader);
	document.getElementById("canvas").appendChild(gameOverImage);

	document.getElementById("canvas").appendChild(debug);

	document.getElementById("canvas").appendChild(character);
	document.getElementById("canvas").appendChild(messagebar);
	document.getElementById("canvas").appendChild(itembox);
	document.getElementById("canvas").appendChild(backButton);
	document.getElementById("canvas").appendChild(selectchar);
	document.getElementById("canvas").appendChild(backchar);
	document.getElementById("canvas").appendChild(nextchar);
	document.getElementById("canvas").appendChild(prevchar);
	document.getElementById("canvas").appendChild(catchar);
	document.getElementById("canvas").appendChild(namchar);
	document.getElementById("canvas").appendChild(buyButton);
	document.getElementById("canvas").appendChild(dispinfobar);
	document.getElementById("canvas").appendChild(separatorbar);
	document.getElementById("canvas").appendChild(infobar);
	document.getElementById("canvas").appendChild(gotitembar);
	document.getElementById("canvas").appendChild(gotitemimg);
	document.getElementById("canvas").appendChild(gotitemtxt);
	document.getElementById("canvas").appendChild(bag);
	document.getElementById("canvas").appendChild(armor);
	document.getElementById("canvas").appendChild(coins);
	document.getElementById("canvas").appendChild(dispmoney);
	document.getElementById("canvas").appendChild(dispfavors);
	document.getElementById("canvas").appendChild(logo);
	document.getElementById("canvas").appendChild(start);
	document.getElementById("canvas").appendChild(instructions);
	document.getElementById("canvas").appendChild(credits);
	document.getElementById("canvas").appendChild(intromessage);
	document.getElementById("canvas").appendChild(continueb);
	document.getElementById("canvas").appendChild(itemDescription);
	document.getElementById("canvas").appendChild(instpic);
	document.getElementById("canvas").appendChild(credpic);

	//Create arrows and add them to the canvas
	for (var i = 0; i < arrows.length; i++) {
		arrows[i] = document.createElement("img");
		arrows[i].style.visibility = "hidden";
		document.getElementById("canvas").appendChild(arrows[i]);
	}

	//Create buttons to add them to the canvas
	for (var i = 0; i < actionButtons.length; i++) {
		actionButtons[i] = document.createElement("img");
		actionButtons[i].style.visibility = "hidden";
		document.getElementById("canvas").appendChild(actionButtons[i]);
	}

	//Specify the random numbers to be used in game
	randomThatcherLocation = Math.floor(Math.random() * 4) + 1; //random number between 1 to 4
	randomFishermanLocation = Math.floor(Math.random() * 2) + 1;
	randomShepherdLocation = Math.floor(Math.random() * 3) + 1;
	randomJourneymanLocation = Math.floor(Math.random() * 5) + 1;
	randomPrincessLastLocation = Math.floor(Math.random() * 5) + 1;

	princessDialogue.push("... Oh, hi! I guess you found me...");
	if (randomPrincessLastLocation == 1) princessDialogue.push("I always come sit down here when I want to relax...");
	else if (randomPrincessLastLocation == 2) princessDialogue.push("I've always loved the beach, so I come here to look at the waves and play with the sand...");
	else if (randomPrincessLastLocation == 3) princessDialogue.push("I'm always fascinated by this tree, growing all alone, so I come whenever I can to see it...");
	else if (randomPrincessLastLocation == 4) princessDialogue.push("I love flowers, so I spend as much time as I can in this field...");
	else if (randomPrincessLastLocation == 5) princessDialogue.push("I always loved ships, so this is the perfect place for me...");

	princessDialogue.push("I mean, it's been a long day, right? Anyone would be entitled to relax");
	princessDialogue.push("You're right, your majesty...");
	princessDialogue.push("Tee hee hee! You don't have to be so formal with me!!");
	princessDialogue.push("Call me Sarelle, okay?");
	princessDialogue.push("You saved me... No one's cared so much for me before...");
	princessDialogue.push("I wanted to ask you... Would you... keep me company here?");
	princessDialogue.push("You have no idea how grateful I am for all you've done...");

	randomHankerchiefLocation = Math.floor(Math.random() * 4) + 1;
	randomHandMirrorLocation = Math.floor(Math.random() * 3) + 1;
	randomNecklaceLocation = Math.floor(Math.random() * 2) + 1;

	randomPrincessKidnapper = Math.floor(Math.random() * 3); //0-2

	//Actions that should run continuously during game execution occur here
	function gameActions() {
		if (showDebug) document.getElementById("debug").style.visibility = "visible";
		else document.getElementById("debug").style.visibility = "hidden";
		//only execute block if debug is visible
		if (document.getElementById("debug").style.visibility == "visible") 	{
			//variable to insert actions performed internally to debug correctly
			var actionList = "";

			//display time elapsed since execution
			actionList = "Elapsed time since execution: " + seconds;
			if (seconds == 1) actionList += " second";
			else actionList += " seconds";
			actionList += "<br>";

			//display game state
			var gameStates = new Array(inMain, inIntroduction, inOptions, inGame, inIntro);
			var gameStatesstr = new Array("Main Menu", "Instructions", "Options", "Game", "Introduction");
			for (var i = 0; i < gameStates.length; i++) {
				if (gameStates[i]) {
					actionList += "Current game state: " + gameStatesstr[i] + "<br>";
					break;
				}
			}

			actionList += "Thatcher location: " + randomThatcherLocation;
			if (randomThatcherLocation == 1) actionList += " (room 1-5)";
			else if (randomThatcherLocation == 2) actionList += " (room 3-4)";
			else if (randomThatcherLocation == 3) actionList += " (room 3-5)";
			else if (randomThatcherLocation == 4) actionList += " (room 3-1)";

			actionList += "<br>";

			actionList += "Handkerchief location: " + randomHankerchiefLocation;
			if (randomHankerchiefLocation == 1) actionList += " (room 0-3)";
			else if (randomHankerchiefLocation == 2) actionList += " (room 5-3)";
			else if (randomHankerchiefLocation == 3) actionList += " (room 2-6)";
			else if (randomHankerchiefLocation == 4) actionList += " (room 2-0)";

			actionList += "<br>";

			actionList += "Hand Mirror location: " + randomHandMirrorLocation;
			if (randomHandMirrorLocation == 1) actionList += " (room 4-4)";
			else if (randomHandMirrorLocation == 2) actionList += " (room 0-6)";
			else if (randomHandMirrorLocation == 3) actionList += " (room 3-8)";

			actionList += "<br>";

			actionList += "Necklace location: " + randomNecklaceLocation;
			if (randomNecklaceLocation == 1) actionList += " (room 0-7)";
			else if (randomNecklaceLocation == 2) actionList += " (room 3-9)";

			actionList += "<br>";

			actionList += "Room Key location: (room 3-10)<br>";

			actionList += "Fisherman location: " + randomFishermanLocation;
			if (randomFishermanLocation == 1) actionList += " (room 0-9)";
			else if (randomFishermanLocation == 2) actionList += " (room 2-10)";

			actionList += "<br>";

			actionList += "Shepherd location: " + randomShepherdLocation;
			if (randomShepherdLocation == 1) actionList += " (room 5-4)";
			else if (randomShepherdLocation == 2) actionList += " (room 4-6)";
			else if (randomShepherdLocation == 3) actionList += " (room 4-7)";

			actionList += "<br>";

			actionList += "Journey man location: " + randomJourneymanLocation;
			if (randomJourneymanLocation == 1) actionList += " (room 4-0)";
			else if (randomJourneymanLocation == 2) actionList += " (room 1-0)";
			else if (randomJourneymanLocation == 3) actionList += " (room 0-1)";
			else if (randomJourneymanLocation == 4) actionList += " (room 0-5)";
			else if (randomJourneymanLocation == 5) actionList += " (room 0-8)";

			actionList += "<br>";

			actionList += "Spirit fox location: " + randomSpiritFoxLocation;
			if (randomSpiritFoxLocation == 1) actionList += " (room 1-9)";
			else if (randomSpiritFoxLocation == 2) actionList += " (room 2-9)";
			else if (randomSpiritFoxLocation == 3) actionList += " (room 2-8)";
			else if (randomSpiritFoxLocation == 4) actionList += " (room 1-7)";
			else if (randomSpiritFoxLocation == 5) actionList += " (room 2-7)";

			actionList += "<br>";

			actionList += "Princess's Kidnapper: " + princessKidnappers[randomPrincessKidnapper];
			actionList += "<br>";

			actionList += "Princess's last location: " + randomPrincessLastLocation;
			if (randomPrincessLastLocation == 1) actionList += " (room 0-0)";
			else if (randomPrincessLastLocation == 2) actionList += " (room 0-10)";
			else if (randomPrincessLastLocation == 3) actionList += " (room 5-10)";
			else if (randomPrincessLastLocation == 4) actionList += " (room 5-7)";
			else if (randomPrincessLastLocation == 5) actionList += " (room 5-0)";

			actionList += "<br>";

			//display coordinates for games that depend on rooms
			actionList += "Location: y: " + y + ", x: " + x + "<br>";


			//Change debug variable and add actionList string to display
			document.getElementById("debug").innerHTML = actionList;

			//increase counter to account for seconds
			counter++;
		}

		//if counter is a multiple of 50 (0, 1000, 2000, 3000, etc.) then increase the second count
		if(counter % 50 == 0) {
			seconds++;
		}

		if (inGame) {
			dispmoney.innerHTML = "$ " + money;
			dispfavors.innerHTML = "Favors: " + favors;

			if (FoxIsFull) {
				if (iterFox >= 0) {
					character.src = sfefimages[iterFox].src;
					iterFox--;
				}
				else {
					character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOX].width / 2)) + "px; visibility: visible;");
					character.src = charimages[chars.SPIRITFOX].src;
					FoxIsFull = false;
					FoxIsTame = true;
					showElements();
				}
			}

			if (timer3enabled) {
				if (FoxDelayAmount <= 50) FoxDelayAmount++;
				else {
					FoxDelayAmount = 0;
					timer3enabled = false;
					FoxIsFull = true;
					character.src = charimages[chars.SPIRITFOXEATING].src;
					if(!onMobile) playSoundEffect("fade");
				}
			}

			if (FoxIsSurprised) {
				if (iterFox < 3) {
					if (iterFox == 0) character.src = charimages[chars.SPIRITFOXEATING].src;
					else if (iterFox == 1) character.src = charimages[chars.SPIRITFOXSURPRISED1].src;
					else if (iterFox == 2) character.src = charimages[chars.SPIRITFOXSURPRISED2].src;

					iterFox++;
				}
				else {
					iterFox = 7;
					FoxIsSurprised = false;
					timer3enabled = true;
					//if(!onMobile) playSoundEffect("fade");
				}
			}

			if (timer2enabled) {
				if (FoxDelayAmount <= 150) FoxDelayAmount++;
				else {
					FoxDelayAmount = 0;
					timer2enabled = false;
					document.getElementById("canvas").removeChild(document.getElementById("bone"));
					FoxIsSurprised = true;
				}
			}

			if (FoxGoesToEat) {
				character.style.visibility = "visible";
				if (iterFox < 8) {
					character.src = sfefimages[iterFox].src;
					iterFox++;
				}
				else {
					character.src = charimages[chars.SPIRITFOXEATING].src;
					if(!onMobile) playSoundEffect("chew");
					iterFox = 0;
					FoxGoesToEat = false;
					timer2enabled = true;
				}
			}

			if (timer1enabled) {
				if (FoxDelayAmount <= 150) FoxDelayAmount++;
				else {
					FoxDelayAmount = 0;
					timer1enabled = false;
					FoxGoesToEat = true;
					if(!onMobile) playSoundEffect("fade");
				}
			}

			if (FoxHasFood) {
				if (iterFox < 8) {
					character.src = sfsfimages[iterFox].src;
					iterFox++;
				}
				else {
					iterFox = 0;
					character.style.visibility = "hidden";
					character.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - 125) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 145) + "px; visibility: hidden;");
					FoxHasFood = false;
					timer1enabled = true;
				}
			}

			//to execute when the fox hasn't eaten but the player tries to talk, ask, or exit
			if (isLeaving) {
				if (iterFox < 8) {
					character.src = sfsfimages[iterFox].src;
					iterFox++;
				}
				else {
					if(!onMobile) playSoundEffect("fade");
					iterFox = 0;
					isLeaving = false;
					showExitsOnForest = true;
				}
			}

			if (showExitsOnForest) {
				character.style.visibility = "hidden";
				isNotAlone = false;
				if (!showInventory) {
						for(var i = 0; i < actionButtons.length; i++) {
						actionButtons[i].style.visibility = "hidden";
					}
				}
				showInventory = true;
				showElements();
				showInventory = false;

				if (infoLocation == "Forest NorthWest Corner") {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("", -1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[13].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { fadeIntoRoom("", 0, -1);};
				}
				else if (infoLocation == "Forest NorthEast Corner") {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4)  - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("", -1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[0].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { fadeIntoRoom("", 0, 1);};

					if (canVisitWitch) {
						arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
						arrows[3].src = arrowimages[13].src;
						arrows[3].onmouseover = function() {
							this.src = arrowhoverimages[13].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[3].onmouseout = function() {
							this.src = arrowimages[13].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[3].onclick = function() { prepareBackground("", 0, -1);};
					}
				}
				else if (infoLocation == "Forest SouthWest Corner") {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { fadeIntoRoom("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", -1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[0].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 0, 1);};

					arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[13].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { fadeIntoRoom("", 0, -1);};
				}
				else if (infoLocation == "Forest PineWall") {
					for (var i = 0; i < actionButtons.length; i++) {
						actionButtons[i].style.visibility = "hidden";
					}

					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { fadeIntoRoom("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[0].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 0, 1);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[13].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x -1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 0, -1);};
				}
				else if (infoLocation == "Forest SouthEast Corner") {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { fadeIntoRoom("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", -1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[0].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { fadeIntoRoom("", 0, 1);};

					arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[13].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { prepareBackground("", 0, -1);};
				}

				showExitsOnForest = false;
			}

			if (infoLocation == "Graveyard" && hasGhosts) {
				if (ghostFloatLeft) {
					if (ghostDisplacement <= 150) {
						var ghostLeft = parseInt(document.getElementById("theghost").style.left, 10);
						document.getElementById("theghost").style.left = (ghostLeft + 1) + "px";
						ghostDisplacement++;
					}
					else {
						document.getElementById("theghost").src = itemimages[53].src;
						ghostFloatLeft = false;
					}
				}
				else {
					if (ghostDisplacement >= 0) {
						var ghostLeft = parseInt(document.getElementById("theghost").style.left, 10);
						document.getElementById("theghost").style.left = (ghostLeft - 1) + "px";
						ghostDisplacement--;
					}
					else {
						document.getElementById("theghost").src = itemimages[54].src;
						ghostFloatLeft = true;
					}
				}
			}

			if (savedPrincess && !endGame) {
				$('#soundTrack').animate({volume: 0.0}, 250);
				character.style.setProperty("-webkit-transition", "opacity 1s ease-in-out");
				character.style.setProperty("transition", "opacity 1s ease-in-out");
				character.style.opacity = "0.0";
				$('#character').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
				function(e) {
					if (!onMobile) {
						soundTrack.pause();
						soundTrack.currentTime = 0;
					}
					changeSoundTrack = true;
					endGame = true;
					var princessface = document.createElement("img");
					princessface.id = "princessface";
					princessface.src = faceimages[14].src;
					princessface.setAttribute("style", "position: absolute; top: " + (86 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[15].width / 2)) + "px; visibility: visible;");
					if (infoLocation != "Crimsonia's SkyGround Square" && !princessFaceAdded) {
						document.getElementById("canvas").appendChild(princessface);
						princessFaceAdded = true;
					}

					character.src = charimages[chars.SARELLE].src;
					character.style.removeProperty("-webkit-transition");
					character.style.removeProperty("transition");
					character.style.opacity = "1.0";
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.SARELLE].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SARELLE].width / 2)) + "px; visibility: visible;");

					currentCharacter = characters[chars.SARELLE];
					charName = "Princess";
					dialogueText = "T-Thank you! Thank you for saving me!!";
					messagebar.style.visibility = "visible";
					showText = true;
				});
			}

			if (princesstimerenabled) {
				if (PrincessDelayAmount <= 150) PrincessDelayAmount++;
				else {
					gameFinished = true;
					hideElements();
					PrincessDelayAmount = 0;
					princesstimerenabled = false;
					messagebar.style.visibility = "visible";
					showText = true;
					charName = "Princess";
					dialogueText = princessDialogue[princessIndex];
				}
			}

			if (currentCharacter == characters[chars.SARELLE] && canFindSarelle && executeDelay) {
				if(!onMobile) playSoundTrack("Sarelle");
				princesstimerenabled = true;
				executeDelay = false;
			}

			if (showText) {
				if (iterText <= dialogueText.length) {
					if (counter % 2 == 0) {
						if (iterText >= 1) {
							var c = dialogueText.substring(iterText - 1, iterText);
							if (c == quoteTagChar) {
								if (quoteExists) {
									incrementText += "</q>";
									quoteExists = false;
								}
								else {
									incrementText += "<q>";
									quoteExists = true;
								}
							}
							else incrementText += c;
						}
						messagebar.innerHTML = charName + ":<br>" + incrementText;
						iterText++;
					}
				}
				else {
					incrementText = "";
					iterText = 0;

					if (currentCharacter == characters[chars.SARELLE] && canFindSarelle) {
						selectchar.setAttribute("style", "position: absolute; cursor: pointer; top: " + (canvasHeight - 60) + "px; left: " + (canvasLeft + canvasWidth - 170) + "px;");
						selectchar.style.zIndex = 3;
						selectchar.style.visibility = "visible";
					}
					else {
						backButton.setAttribute("style", "position: absolute; cursor: pointer; top: " + (canvasHeight - 60) + "px; left: " + (canvasLeft + canvasWidth - 170) + "px;");
						backButton.style.zIndex = 3;
						backButton.style.visibility = "visible";
					}

					if (currentCharacter == characters[chars.ROYALBANNERETT]) {
						if (askBannerett) {
							backButton.src = buttonimages[3].src;
							backButton.onmouseover = function() { this.src = buttonRoot + "mouseover/" + "continue.png";};
							backButton.onmouseout = function() {this.src = buttonimages[3].src;};
						}
					}

					if (itemToBuy != "" && itemToBuy != "notenough") {
						buyButton.style.zIndex = 3;
						buyButton.style.visibility = "visible";
						buyButton.onclick = function() {
							if(!onMobile) playSoundEffect("push");
							buyButton.style.zIndex = -1;
							buyButton.style.visibility = "hidden";

							if (itemToBuy == "flourbag") {
								if (money >= 50) {
									money -= 50;
									messagebar.style.visibility = "hidden";
									backButton.style.visibility = "hidden";
									document.getElementById("canvas").removeChild(document.getElementById("flourbag"));
									showItemConfirmation(21, "Flour Bag", 2, 4);
									hasFlour = true;
									items[2][4].onclick = function() {
										if (currentCharacter == characters[chars.SALLY]) {
											showTextOnGivingItem("Sally");
											dialogueText = "Thank you, sir! I can now make a milk bone for my puppy";
											favors++;
											hideElementsOnGivingItem(2, 4);
										}
										else ShowWrongItemMessage();
									};
								}
								else {
									itemToBuy = "notenough";
									prepareText("merchant");
								}
							}
							if (itemToBuy == "fish") {
								if (money >= 100) {
									money -= 100;
									messagebar.style.visibility = "hidden";
									backButton.style.visibility = "hidden";
									document.getElementById("canvas").removeChild(document.getElementById("thefish"));
									showItemConfirmation(19, "Fish", 0, 2);
									hasFish = true;
									items[0][2].onclick = function() {
										if (currentCharacter == characters[chars.SIREN]) {
											showTextOnGivingItem("Siren");
											dialogueText = "Oh, it's him! Let's see... yes! He had my necklace in his gut! Thank you so much, this is for you...";
											isGivingCharmStone = true;
											hideElementsOnGivingItem(0, 2);
										}
										else ShowWrongItemMessage();
									};
								}
								else {
									itemToBuy = "notenough";
									prepareText("merchant");
								}
							}
							if (itemToBuy == "cherries") {
								if (money >= 25) {
									money -= 25;
									messagebar.style.visibility = "hidden";
									backButton.style.visibility = "hidden";
									document.getElementById("canvas").removeChild(document.getElementById("cherries"));
									showItemConfirmation(9, "Cherries", 0, 5);
									hasCherries = true;
									items[0][5].onclick = function() {
										if (currentCharacter == characters[chars.ROYALCOOK]) {
											showTextOnGivingItem("Royal Cook");
											dialogueText = "Thank you. I'll make a cherry pie right now... There!";
											mustGiveCherryPie = true;
											hideElementsOnGivingItem(0, 5);
										}
										else ShowWrongItemMessage();
									};
								}
								else {
									itemToBuy = "notenough";
									prepareText("merchant");
								}
							}
						};
					}

					showText = false;
				}
			}
		}
	}

	//repeat function gameActions every 20 milliseconds
	setInterval(gameActions, 20);
}

//One of the most important functions, used to set background when game starts or to redefine it after pressing arrows
function prepareBackground(room, dy, dx) {

	//strictly for testing. Delete once princess face appearances have been implemented on dialogue
	if (document.getElementById("princessface")) document.getElementById("canvas").removeChild(document.getElementById("princessface"));

	isNotAlone = false;

	y += dy;
	x += dx;

	randomSpiritFoxLocation = Math.floor(Math.random() * 5) + 1;

	for (var i = 0; i < arrows.length; i++) {
		arrows[i].style.visibility = "hidden";
		arrows[i].onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	}

	for (var i = 0; i < actionButtons.length; i++) {
		actionButtons[i].style.visibility = "hidden";
		actionButtons[i].onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
	}

	if (room === "") {
		//set background to game canvas
		document.getElementById("canvas").style.backgroundImage = "url(" + backgrounds[y][x].src + ")";
		//document.getElementById("canvas").style.backgroundImage = "url(" + backgroundRoot + y + x + ".png)";

		infoLocation = locations[y][x];
		infobar.innerHTML = infoLocation;

		if (!leavingHouse) if(!onMobile) playSoundEffect("move");
		else leavingHouse = false;

		if (y == 0) {
			if (x == 0) {
				if (canFindSarelle && randomPrincessLastLocation == 1) preparePrincess();
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() {
						character.style.visibility = "hidden";
						prepareBackground("", 1, 0);
					};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[0].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() {
						character.style.visibility = "hidden";
						prepareBackground("", 0, 1);
					};
				}
			}
			else if (x == 1) {
				if (randomJourneymanLocation == 3) {
					isNotAlone = true;

					character.src = charimages[chars.JOURNEYMAN].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.JOURNEYMAN].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.JOURNEYMAN].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.JOURNEYMAN];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";

						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[8].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[8].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[8].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", 0, -1);};

						arrows[1].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowHeight / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[3].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[3].src;
							infobar.innerHTML = "To " + locations[y][x + 1];
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[3].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("", 0, 1);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 0, -1);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowHeight / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 0, 1);};
				}
			}
			else if (x == 2) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[10].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[10].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[10].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, -1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[6].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[6].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[6].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, 1);};
			}
			else if (x == 3) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				if (hasThatcherInfo && randomHankerchiefLocation == 1 && canFindHankerchief && !hasHankerchief) {
					showHankerchief();
					princesshankerchief.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (itemimages[36].height * 0.75)) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (itemimages[36].width / 2)) + "px; cursor: pointer; visibility: visible;");
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + ((arrowHeight * 3) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[7].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[7].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[7].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (hasThatcherInfo && randomHankerchiefLocation == 1 && canFindHankerchief && !hasHankerchief) document.getElementById("canvas").removeChild(document.getElementById("princesshankerchief"));
					prepareBackground("", 0, 1);
				};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[1].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[1].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[1].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { fadeIntoRoom("", 1, 0);};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[9].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[9].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[9].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() {
					if (hasThatcherInfo && randomHankerchiefLocation == 1 && canFindHankerchief && !hasHankerchief) document.getElementById("canvas").removeChild(document.getElementById("princesshankerchief"));
					prepareBackground("", 0, -1);
				};
			}
			else if (x == 4) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[3].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, 1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[8].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, -1);};
			}
			else if (x == 5) {
				if (randomJourneymanLocation == 4) {
					isNotAlone = true;

					character.src = charimages[chars.JOURNEYMAN].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.JOURNEYMAN].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.JOURNEYMAN].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.JOURNEYMAN];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[3].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[3].src;
							infobar.innerHTML = "To " + locations[y][x + 1];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[3].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", 0, 1);};

						arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[8].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[8].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[8].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("", 0, -1);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[3].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 0, 1);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[8].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 0, -1);};
				}
			}
			else if (x == 6) {
				if (randomHandMirrorLocation == 2 && canFindHandMirror && !hasHandMirror) {
					showHandMirror();
					princesshandmirror.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (itemimages[36].height * 0.75)) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (itemimages[36].width / 2)) + "px; cursor: pointer; visibility: visible;");
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 2.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (randomHandMirrorLocation == 2 && canFindHandMirror && !hasHandMirror) document.getElementById("canvas").removeChild(document.getElementById("princesshandmirror"));
					prepareBackground("", 0, -1);
				};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((arrowHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[5].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[5].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[5].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() {
					if (randomHandMirrorLocation == 2 && canFindHandMirror && !hasHandMirror) document.getElementById("canvas").removeChild(document.getElementById("princesshandmirror"));
					prepareBackground("", 0, 1);
				};

				arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (arrowWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() {
					if (randomHandMirrorLocation == 2 && canFindHandMirror && !hasHandMirror) document.getElementById("canvas").removeChild(document.getElementById("princesshandmirror"));
					prepareBackground("", 1, 0);
				};
			}
			else if (x == 7) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				if (randomNecklaceLocation == 1 && canFindNecklace && !hasNecklace) {
					showNecklace();
					princessnecklace.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (itemimages[36].height * 1.5)) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (itemimages[36].width * 1.5)) + "px; cursor: pointer; visibility: visible;");
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[11].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[11].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[11].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (randomNecklaceLocation == 1 && canFindNecklace && !hasNecklace) document.getElementById("canvas").removeChild(document.getElementById("princessnecklace"));
					prepareBackground("", 0, -1);
				};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((arrowHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[5].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[5].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[5].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() {
					if (randomNecklaceLocation == 1 && canFindNecklace && !hasNecklace) document.getElementById("canvas").removeChild(document.getElementById("princessnecklace"));
					prepareBackground("", 0, 1);
				};

				if (canEnterForest) {
					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[0].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { fadeIntoRoom("", 1, 0);};
				}
			}
			else if (x == 8) {
				if (randomJourneymanLocation == 5) {
					isNotAlone = true;

					character.src = charimages[chars.JOURNEYMAN].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.JOURNEYMAN].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.JOURNEYMAN].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.JOURNEYMAN];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[3].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[3].src;
							infobar.innerHTML = "To " + locations[y][x + 1];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[3].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", 0, 1);};

						arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[8].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[8].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[8].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("", 0, -1);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[3].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 0, 1);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[8].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 0, -1);};
				}
			}
			else if (x == 9) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				if (randomFishermanLocation == 1) {
					isNotAlone = true;

					character.src = charimages[chars.FISHERMAN].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.FISHERMAN].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.FISHERMAN].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.FISHERMAN];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[9].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[9].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[9].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", 0, -1);};

						arrows[1].setAttribute("style", "position: absolute; top: " + (canvasTop + arrowHeight - charOffset) + "px; left: " + (canvasLeft + arrowWidth) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[7].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[7].src;
							infobar.innerHTML = "To " + locations[y][x + 1];
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[7].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("", 0, 1);};

						if (canEnterForest) {
							arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
							arrows[2].src = arrowimages[1].src;
							arrows[2].onmouseover = function() {
								this.src = arrowhoverimages[1].src;
								infobar.innerHTML = "To " + locations[y + 1][x];
							};
							arrows[2].onmouseout = function() {
								this.src = arrowimages[1].src;
								infobar.innerHTML = infoLocation;
							};
							arrows[2].onclick = function() { fadeIntoRoom("", 1, 0);};
						}
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[9].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[9].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[9].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 0, -1);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasTop + arrowHeight - charOffset) + "px; left: " + (canvasLeft + arrowWidth) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[7].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[7].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[7].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 0, 1);};

					if (canEnterForest) {
						arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[1].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[1].src;
							infobar.innerHTML = "To " + locations[y + 1][x];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[1].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { fadeIntoRoom("", 1, 0);};
					}
				}
			}
			else if (x == 10) {
				if (canFindSarelle && randomPrincessLastLocation == 2) preparePrincess();
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[2].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[2].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[2].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() {
						character.style.visibility = "hidden";
						prepareBackground("", 1, 0);
					};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[15].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[15].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[15].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() {
						character.style.visibility = "hidden";
						prepareBackground("", 0, -1);
					};
				}
			}
		}
		else if (y == 1) {
			if (x == 0) {
				if (randomJourneymanLocation == 2) {
					isNotAlone = true;

					character.src = charimages[chars.JOURNEYMAN].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.JOURNEYMAN].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.JOURNEYMAN].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.JOURNEYMAN];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[3].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[3].src;
							infobar.innerHTML = "To " + locations[y - 1][x];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[3].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", -1, 0);};

						arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[8].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[8].src;
							infobar.innerHTML = "To " + locations[y + 1][x];
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[8].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("", 1, 0);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[3].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", -1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[8].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 1, 0);};
				}
			}
			else if (x == 1) {
				if (hasGhosts) {
					var theghost = document.createElement("img");
					theghost.id = "theghost";
					theghost.src = itemimages[54].src;
					theghost.setAttribute("style", "position: absolute; top: " + (canvasTop + 100) + "px; left: " + (canvasLeft + 100) + "px;");
					document.getElementById("canvas").appendChild(theghost);
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 3)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[3].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "Enter Gravekeeper's House";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { fadeIntoRoom("gravekeeperhouse", 0, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[0].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() {
					if (hasGhosts) {
						document.getElementById("canvas").removeChild(document.getElementById("theghost"));
						ghostDisplacement = 0;
						ghostFloatLeft = true;
					}
					prepareBackground("", 0, 1);
				};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[8].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() {
					if (hasGhosts) {
						document.getElementById("canvas").removeChild(document.getElementById("theghost"));
						ghostDisplacement = 0;
						ghostFloatLeft = true;
					}
					prepareBackground("", 1, 0);
				};
			}
			else if (x == 2) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Crimsonia") playSoundTrack("Crimsonia");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[3].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "Enter Chapel";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { fadeIntoRoom("church", 0, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[0].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, 1);};

				arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[13].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 0, -1);};
			}
			else if (x == 3) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (hasRoyalSeal) {
						fadeIntoRoom("", -1, 0);
					}
					else {
						sentryHalt();
					}
				};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[3].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 1, 0);};

				arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - (arrowHeight / 4) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 0, -1);};

				arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - (arrowHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[3].src = arrowimages[13].src;
				arrows[3].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[3].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[3].onclick = function() { prepareBackground("", 0, 1);};

				arrows[4].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[4].src = arrowimages[3].src;
				arrows[4].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "Enter Minstrel's house";
				};
				arrows[4].onmouseout = function() { this.src = arrowimages[3].src;};
				arrows[4].onclick = function() {
					fadeIntoRoom("minstrelhouse", 0, 0);
					infobar.innerHTML = infoLocation;
				};

				arrows[5].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 2.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[5].src = arrowimages[3].src;
				arrows[5].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "Enter Magician's house";
				};
				arrows[5].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[5].onclick = function() { fadeIntoRoom("magicianhouse", 0, 0);};
			}
			else if (x == 4) {
				//location of the peddler
				isNotAlone = true;

				character.src = charimages[chars.PEDDLER].src;
				character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.PEDDLER].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.PEDDLER].width / 2)) + "px; visibility: visible;");
				currentCharacter = characters[chars.PEDDLER];

				showActionButtons();

				actionButtons[3].onclick = function() {
					isNotAlone = false;
					character.style.visibility = "hidden";
					hideActionButtons();

					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 0, 1);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 0, -1);};

					arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[13].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 1, 0);};

					arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + arrowWidth) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[13].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "Enter the Pottery";
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { prepareBackground("pottershop", 0, 0);};

					arrows[4].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
					arrows[4].src = arrowimages[0].src;
					arrows[4].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "Enter the Market";
					};
					arrows[4].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[4].onclick = function() { prepareBackground("marketshop", 0, 0);};

					arrows[5].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[5].src = arrowimages[0].src;
					arrows[5].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "Enter the Alehouse";
					};
					arrows[5].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[5].onclick = function() { fadeIntoRoom("alehouse", 0, 0);};
				};
			}
			else if (x == 5) {
				//first random location of the thatcher
				if (randomThatcherLocation == 1) {
					isNotAlone = true;

					character.src = charimages[chars.THATCHER].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.THATCHER].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.THATCHER].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.THATCHER];

					if (hasPie && !isGrounded) {
						character.src = charimages[chars.DUKE].src;
						character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.DUKE].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.DUKE].width / 2)) + "px; visibility: visible;");
						currentCharacter = characters[chars.DUKE];

						showText = true;
						messagebar.style.visibility = "visible";
						hideElements();
						charName = "Duke";
						dialogueText = "Is that the royal cook's pie I smell? She makes the best in the kingdom! Here, I'll take it off your hands!";
						DukeAtePie = true;
					}
					else showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[14].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[14].src;
							infobar.innerHTML = "Enter the Trade House";
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[14].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { fadeIntoRoom("tradehouse", 0, 0);};

						arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[3].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[3].src;
							infobar.innerHTML = "Enter the Tailor Shop";
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[3].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { fadeIntoRoom("tailorhouse", 0, 0);};

						arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight / 4) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[0].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[0].src;
							infobar.innerHTML = "To " + locations[y + 1][x];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[0].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { prepareBackground("", 1, 0);};

						arrows[3].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[3].src = arrowimages[12].src;
						arrows[3].onmouseover = function() {
							this.src = arrowhoverimages[12].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[3].onmouseout = function() {
							this.src = arrowimages[12].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[3].onclick = function() { prepareBackground("", 0, -1);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[14].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[14].src;
						infobar.innerHTML = "Enter the Trade House";
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[14].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { fadeIntoRoom("tradehouse", 0, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "Enter the Tailor Shop";
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("tailorhouse", 0, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight / 4) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[0].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 1, 0);};

					arrows[3].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[12].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[12].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[12].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { prepareBackground("", 0, -1);};
				}
			}
			else if (x == 6) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[7].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[7].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[7].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 1, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[9].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[9].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[9].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", -1, 0);};

				if (canEnterForest) {
					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[12].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[12].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[12].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { fadeIntoRoom("", 0, 1);};
				}
			}
			else if (x == 7) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Forest") playSoundTrack("Forest");
					changeSoundTrack = false;
				}

				//fourth random location of the spirit fox
				if (randomSpiritFoxLocation == 4 && !gotSpiritFox) {
					isNotAlone = true;
					if (FoxIsTame) {
						character.src = charimages[chars.SPIRITFOX].src;
						character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOX].width / 2)) + "px; visibility: visible;");
					}
					else {
						character.src = charimages[chars.SPIRITFOXSMALL].src;
						character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOXSMALL].width / 2)) + "px; visibility: visible;");
					}
					currentCharacter = characters[chars.SPIRITFOX];

					showActionButtons();

					actionButtons[3].onclick = function() {
						if(!onMobile) playSoundEffect("push");
						isNotAlone = false;
						hideElements();
						if (FoxIsTame) showExitsOnForest = true;
						else isLeaving = true;
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4)  - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("", -1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[13].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { fadeIntoRoom("", 0, -1);};
				}
			}
			else if (x == 8) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Forest") playSoundTrack("Forest");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[13].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "Enter the Witch's Cottage";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { fadeIntoRoom("witchhouse", 0, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[0].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, 1);};
			}
			else if (x == 9) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Forest") playSoundTrack("Forest");
					changeSoundTrack = false;
				}

				//first random location of the spirit fox
				if (randomSpiritFoxLocation == 1 && !gotSpiritFox) {
					isNotAlone = true;
					if (FoxIsTame) {
						character.src = charimages[chars.SPIRITFOX].src;
						character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOX].width / 2)) + "px; visibility: visible;");
					}
					else {
						character.src = charimages[chars.SPIRITFOXSMALL].src;
						character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOXSMALL].width / 2)) + "px; visibility: visible;");
					}
					currentCharacter = characters[chars.SPIRITFOX];

					showActionButtons();

					actionButtons[3].onclick = function() {
						if(!onMobile) playSoundEffect("push");
						isNotAlone = false;
						hideElements();
						if (FoxIsTame) showExitsOnForest = true;
						else isLeaving = true;
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4)  - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("", -1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[0].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { fadeIntoRoom("", 0, 1);};

					if (canVisitWitch) {
						arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
						arrows[3].src = arrowimages[13].src;
						arrows[3].onmouseover = function() {
							this.src = arrowhoverimages[13].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[3].onmouseout = function() {
							this.src = arrowimages[13].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[3].onclick = function() { prepareBackground("", 0, -1);};
					}
				}
			}
			else if (x == 10) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				//location of the siren
				isNotAlone = true;

				character.src = charimages[chars.SIREN].src;
				character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.SIREN].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SIREN].width / 2)) + "px; visibility: visible;");
				currentCharacter = characters[chars.SIREN];

				showActionButtons();

				actionButtons[3].onclick = function() {
					isNotAlone = false;
					character.style.visibility = "hidden";
					hideActionButtons();

					arrows[0].setAttribute("style", "position: absolute; top: " + ((arrowHeight * 0.75) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[7].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[7].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[7].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", -1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 2.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[9].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[9].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[9].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 1, 0);};

					if (canEnterForest) {
						arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + arrowWidth) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[12].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[12].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[12].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { fadeIntoRoom("", 0, -1);};
					}
				};
			}
		}
		else if (y == 2) {
			if (x == 0) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				if (hasThatcherInfo && randomHankerchiefLocation == 4 && canFindHankerchief && !hasHankerchief) {
					showHankerchief();
					princesshankerchief.setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - (itemimages[36].height * 0.75)) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) + (itemimages[36].width * 0)) + "px; cursor: pointer; visibility: visible;");
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { fadeIntoRoom("", 0, 1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[0].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() {
					if (hasThatcherInfo && randomHankerchiefLocation == 4 && canFindHankerchief && !hasHankerchief) document.getElementById("canvas").removeChild(document.getElementById("princesshankerchief"));
					prepareBackground("", -1, 0);
				};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[13].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() {
					if (hasThatcherInfo && randomHankerchiefLocation == 4 && canFindHankerchief && !hasHankerchief) document.getElementById("canvas").removeChild(document.getElementById("princesshankerchief"));
					prepareBackground("", 1, 0);
				};
			}
			else if (x == 1) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Crimsonia") playSoundTrack("Crimsonia");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2)  - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[5].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[5].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[5].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", -1, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - (arrowHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[5].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[5].src;
					infobar.innerHTML = "Enter the Hospital";
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[5].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { fadeIntoRoom("hospital", 0, 0);};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[11].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[11].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[11].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 1, 0);};

				arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[3].src = arrowimages[0].src;
				arrows[3].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[3].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[3].onclick = function() { prepareBackground("", 0, 1);};

				arrows[4].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[4].src = arrowimages[13].src;
				arrows[4].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[4].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[4].onclick = function() {
					if (hasRoyalSeal) {
						fadeIntoRoom("", 0, -1);
					}
					else {
						sentryHalt();
					}
				};
			}
			else if (x == 2) {
				//location of the royal bannerett
				isNotAlone = true;

				character.src = charimages[chars.ROYALBANNERETT].src;
				character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.ROYALBANNERETT].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.ROYALBANNERETT].width / 2)) + "px; visibility: visible;");
				currentCharacter = characters[chars.ROYALBANNERETT];

				showActionButtons();

				actionButtons[3].onclick = function() {
					isNotAlone = false;
					character.style.visibility = "hidden";
					hideActionButtons();

					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "Enter Redin Palace";
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("castle-throneroom", 0, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[0].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 0, 1);};

					arrows[3].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[13].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { prepareBackground("", 0, -1);};
				};
			}
			else if (x == 3) {
				if (endGame && changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Crimsonia") playSoundTrack("Crimsonia");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 1, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[3].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", -1, 0);};

				arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 0, 1);};

				arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[3].src = arrowimages[13].src;
				arrows[3].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[3].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[3].onclick = function() { prepareBackground("", 0, -1);};

			}
			else if (x == 4) {
				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowWidth / 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[7].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[7].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[7].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, -1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight / 2) - charOffset) + "px; left: " + ((canvasWidth / 2) + canvasLeft - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[1].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[1].src;
					infobar.innerHTML = "Enter Serf's House";
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[1].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { fadeIntoRoom("serfhouse", 0, 0);};

				arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + ((canvasWidth / 2) + canvasLeft) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[1].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[1].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[1].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", -1, 0);};

				arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[3].src = arrowimages[1].src;
				arrows[3].onmouseover = function() {
					this.src = arrowhoverimages[1].src;
					infobar.innerHTML = "Enter your House";
				};
				arrows[3].onmouseout = function() {
					this.src = arrowimages[1].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[3].onclick = function() { fadeIntoRoom("playerhouse", 0, 0);};

				arrows[4].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft) + "px; cursor: pointer; visibility: visible;");
				arrows[4].src = arrowimages[15].src;
				arrows[4].onmouseover = function() {
					this.src = arrowhoverimages[15].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[4].onmouseout = function() {
					this.src = arrowimages[15].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[4].onclick = function() { prepareBackground("", 1, 0);};

				arrows[5].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[5].src = arrowimages[9].src;
				arrows[5].onmouseover = function() {
					this.src = arrowhoverimages[9].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[5].onmouseout = function() {
					this.src = arrowimages[9].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[5].onclick = function() { prepareBackground("", 0, 1);};
			}
			else if (x == 5) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Crimsonia") playSoundTrack("Crimsonia");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[13].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "Enter Sally's house";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { fadeIntoRoom("sallyhouse", 0, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - arrowHeight - charOffset) + "px; left: " + (canvasLeft) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[13].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, -1);};

				arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() {
					if (hasRoyalSeal) {
						fadeIntoRoom("", 0, 1);
					}
					else {
						sentryHalt();
					}
				};

				arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight * 0.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[3].src = arrowimages[6].src;
				arrows[3].onmouseover = function() {
					this.src = arrowhoverimages[6].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[3].onmouseout = function() {
					this.src = arrowimages[6].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[3].onclick = function() { prepareBackground("", -1, 0);};

				arrows[4].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[4].src = arrowimages[10].src;
				arrows[4].onmouseover = function() {
					this.src = arrowhoverimages[10].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[4].onmouseout = function() {
					this.src = arrowimages[10].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[4].onclick = function() { prepareBackground("", 1, 0);};
			}
			else if (x == 6) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				if (hasThatcherInfo && randomHankerchiefLocation == 3 && canFindHankerchief && !hasHankerchief) {
					showHankerchief();
					princesshankerchief.setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - (itemimages[36].height * 0.75)) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) + (itemimages[36].width * 0)) + "px; cursor: pointer; visibility: visible;");
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[13].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (hasThatcherInfo && randomHankerchiefLocation == 3 && canFindHankerchief && !hasHankerchief) document.getElementById("canvas").removeChild(document.getElementById("princesshankerchief"));
					prepareBackground("", 1, 0);
				};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[3].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { fadeIntoRoom("", 0, -1);};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() {
					if (hasThatcherInfo && randomHankerchiefLocation == 3 && canFindHankerchief && !hasHankerchief) document.getElementById("canvas").removeChild(document.getElementById("princesshankerchief"));
					prepareBackground("", -1, 0);
				};

				if (canEnterForest) {
					arrows[3].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[8].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { fadeIntoRoom("", 0, 1);};
				}
			}
			else if (x == 7) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Forest") playSoundTrack("Forest");
					changeSoundTrack = false;
				}

				//fifth random location of the spirit fox

				if (randomSpiritFoxLocation == 5 && !gotSpiritFox) {
					isNotAlone = true;
					if (FoxIsTame) {
						character.src = charimages[chars.SPIRITFOX].src;
						character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOX].width / 2)) + "px; visibility: visible;");
					}
					else {
						character.src = charimages[chars.SPIRITFOXSMALL].src;
						character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOXSMALL].width / 2)) + "px; visibility: visible;");
					}
					currentCharacter = characters[chars.SPIRITFOX];

					showActionButtons();

					actionButtons[3].onclick = function() {
						if(!onMobile) playSoundEffect("push");
						isNotAlone = false;
						hideElements();
						if (FoxIsTame) showExitsOnForest = true;
						else isLeaving = true;
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { fadeIntoRoom("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", -1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[0].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 0, 1);};

					arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[13].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { fadeIntoRoom("", 0, -1);};
				}
			}
			else if (x == 8) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Forest") playSoundTrack("Forest");
					changeSoundTrack = false;
				}

				//third random location of the spirit fox
				if (randomSpiritFoxLocation == 3 && !gotSpiritFox) {
					isNotAlone = true;
					if (FoxIsTame) {
						character.src = charimages[chars.SPIRITFOX].src;
						character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOX].width / 2)) + "px; visibility: visible;");
					}
					else {
						character.src = charimages[chars.SPIRITFOXSMALL].src;
						character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOXSMALL].width / 2)) + "px; visibility: visible;");
					}
					currentCharacter = characters[chars.SPIRITFOX];

					showActionButtons();

					actionButtons[3].onclick = function() {
						if(!onMobile) playSoundEffect("push");
						isNotAlone = false;
						hideElements();
						if (FoxIsTame) showExitsOnForest = true;
						else isLeaving = true;
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { fadeIntoRoom("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[0].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 0, 1);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[13].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x -1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 0, -1);};
				}
			}
			else if (x == 9) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Forest") playSoundTrack("Forest");
					changeSoundTrack = false;
				}

				//second random location of the spirit fox
				if (randomSpiritFoxLocation == 2 && !gotSpiritFox) {
					isNotAlone = true;
					if (FoxIsTame) {
						character.src = charimages[chars.SPIRITFOX].src;
						character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOX].width / 2)) + "px; visibility: visible;");
					}
					else {
						character.src = charimages[chars.SPIRITFOXSMALL].src;
						character.setAttribute("style", "position: absolute; top: 84px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SPIRITFOXSMALL].width / 2)) + "px; visibility: visible;");
					}
					currentCharacter = characters[chars.SPIRITFOX];

					showActionButtons();

					actionButtons[3].onclick = function() {
						if(!onMobile) playSoundEffect("push");
						isNotAlone = false;
						hideElements();
						if (FoxIsTame) showExitsOnForest = true;
						else isLeaving = true;
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { fadeIntoRoom("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", -1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[0].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { fadeIntoRoom("", 0, 1);};

					arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 0.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[13].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { prepareBackground("", 0, -1);};
				}
			}
			else if (x == 10) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				if (randomFishermanLocation == 2) {
					isNotAlone = true;

					character.src = charimages[chars.FISHERMAN].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.FISHERMAN].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.FISHERMAN].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.FISHERMAN];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + ((arrowHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[3].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[3].src;
							infobar.innerHTML = "To " + locations[y - 1][x];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[3].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", -1, 0);};

						arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[8].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[8].src;
							infobar.innerHTML = "To " + locations[y + 1][x];
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[8].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("", 1, 0);};

						if (canEnterForest) {
							arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
							arrows[2].src = arrowimages[13].src;
							arrows[2].onmouseover = function() {
								this.src = arrowhoverimages[13].src;
								infobar.innerHTML = "To " + locations[y][x - 1];
							};
							arrows[2].onmouseout = function() {
								this.src = arrowimages[13].src;
								infobar.innerHTML = infoLocation;
							};
							arrows[2].onclick = function() { fadeIntoRoom("", 0, -1);};
						}
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((arrowHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[3].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", -1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[8].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 1, 0);};

					if (canEnterForest) {
						arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[13].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[13].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[13].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { fadeIntoRoom("", 0, -1);};
					}
				}
			}
		}
		else if (y == 3) {
			if (x == 0) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[3].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 1, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[8].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", -1, 0);};
			}
			else if (x == 1) {
				//fourth random location of the thatcher
				if (randomThatcherLocation == 4) {
					isNotAlone = true;

					character.src = charimages[chars.THATCHER].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.THATCHER].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.THATCHER].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.THATCHER];

					if (hasPie && !isGrounded) {
						character.src = charimages[chars.DUKE].src;
						character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.DUKE].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.DUKE].width / 2)) + "px; visibility: visible;");
						currentCharacter = characters[chars.DUKE];

						showText = true;
						messagebar.style.visibility = "visible";
						hideElements();
						charName = "Duke";
						dialogueText = "Is that the royal cook's pie I smell? She makes the best in the kingdom! Here, I'll take it off your hands!";
						DukeAtePie = true;
					}
					else showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[8].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[8].src;
							infobar.innerHTML = "To " + locations[y][x + 1];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[8].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", 0, 1);};

						arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[3].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[3].src;
							infobar.innerHTML = "Enter the Duke's Manor";
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[3].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { fadeIntoRoom("dukehouse-foyer", 0, 0);};

						arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 3)) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[0].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[0].src;
							infobar.innerHTML = "To " + locations[y - 1][x];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[0].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { prepareBackground("", -1, 0);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 0, 1);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[3].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "Enter the Duke's Manor";
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("dukehouse-foyer", 0, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 3)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[0].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", -1, 0);};
				}
			}
			else if (x == 2) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 2.25) - charOffset) + "px; left: " + (canvasLeft) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[13].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, 1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 3.25) - charOffset) + "px; left: " + (canvasLeft +  canvasWidth - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[0].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, -1);};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[10].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[10].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[10].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", -1, 0);};

				arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[3].src = arrowimages[6].src;
				arrows[3].onmouseover = function() {
					this.src = arrowhoverimages[6].src;
					infobar.innerHTML = "Enter the Smithy";
				};
				arrows[3].onmouseout = function() {
					this.src = arrowimages[6].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[3].onclick = function() { fadeIntoRoom("smithhouse", 0, 0);};
			}
			else if (x == 3) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Crimsonia") playSoundTrack("Crimsonia");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
				};
				arrows[0].onclick = function() {
					if (hasRoyalSeal) {
						fadeIntoRoom("", 1, 0);
					}
					else {
						sentryHalt();
					}
				};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[3].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", -1, 0);};

				arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 0, 1);};

				arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[3].src = arrowimages[13].src;
				arrows[3].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[3].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[3].onclick = function() { prepareBackground("", 0, -1);};

				arrows[4].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[4].src = arrowimages[3].src;
				arrows[4].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "Enter Howard's House";
				};
				arrows[4].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[4].onclick = function() { fadeIntoRoom("howardhouse", 0, 0);};

				arrows[5].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 2.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[5].src = arrowimages[3].src;
				arrows[5].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "Enter Bruce's House";
				};
				arrows[5].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[5].onclick = function() { fadeIntoRoom("brucehouse", 0, 0);};
			}
			else if (x == 4) {
				//second random location of the thatcher
				if (randomThatcherLocation == 2) {
					isNotAlone = true;

					character.src = charimages[chars.THATCHER].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.THATCHER].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.THATCHER].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.THATCHER];

					if (hasPie && !isGrounded) {
						character.src = charimages[chars.DUKE].src;
						character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.DUKE].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.DUKE].width / 2)) + "px; visibility: visible;");
						currentCharacter = characters[chars.DUKE];

						showText = true;
						messagebar.style.visibility = "visible";
						hideElements();
						charName = "Duke";
						dialogueText = "Is that the royal cook's pie I smell? She makes the best in the kingdom! Here, I'll take it off your hands!";
						DukeAtePie = true;
					}
					else showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[14].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[14].src;
							infobar.innerHTML = "To " + locations[y - 1][x];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[14].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", -1, 0);};

						arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight / 2) - charOffset) + "px; left: " + ((canvasWidth / 2) + canvasLeft + (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[14].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[14].src;
							infobar.innerHTML = "Enter Francis's House";
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[14].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { fadeIntoRoom("francishouse", 0, 0);};

						arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4)) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[12].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[12].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[12].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { prepareBackground("", 0, -1);};

						arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight/ 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[3].src = arrowimages[4].src;
						arrows[3].onmouseover = function() {
							this.src = arrowhoverimages[4].src;
							infobar.innerHTML = "To " + locations[y][x + 1];
						};
						arrows[3].onmouseout = function() {
							this.src = arrowimages[4].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[3].onclick = function() { prepareBackground("", 0, 1);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[14].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[14].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[14].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", -1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight / 2) - charOffset) + "px; left: " + ((canvasWidth / 2) + canvasLeft + (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[14].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[14].src;
						infobar.innerHTML = "Enter Francis's House";
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[14].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("francishouse", 0, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[12].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[12].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[12].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 0, -1);};

					arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight/ 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[4].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[4].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[4].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { prepareBackground("", 0, 1);};
				}
			}
			else if (x == 5) {
				//third random location of the thatcher
				if (randomThatcherLocation == 3) {
					isNotAlone = true;

					character.src = charimages[chars.THATCHER].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.THATCHER].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.THATCHER].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.THATCHER];

					if (hasPie && !isGrounded) {
						character.src = charimages[chars.DUKE].src;
						character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.DUKE].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.DUKE].width / 2)) + "px; visibility: visible;");
						currentCharacter = characters[chars.DUKE];

						showText = true;
						messagebar.style.visibility = "visible";
						hideElements();
						charName = "Duke";
						dialogueText = "Is that the royal cook's pie I smell? She makes the best in the kingdom! Here, I'll take it off your hands!";
						DukeAtePie = true;
					}
					else showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[14].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[14].src;
							infobar.innerHTML = "To " + locations[y - 1][x];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[14].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", -1, 0);};

						arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[14].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[14].src;
							infobar.innerHTML = "Enter Anne's House";
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[14].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { fadeIntoRoom("annehouse", 0, 0);};

						arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4)) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[12].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[12].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[12].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { prepareBackground("", 0, -1);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth * 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[14].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[14].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[14].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", -1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[14].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[14].src;
						infobar.innerHTML = "Enter Anne's House";
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[14].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("annehouse", 0, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[12].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[12].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[12].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 0, -1);};
				}
			}
			else if (x == 6) {
				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) + (arrowHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[5].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[5].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[5].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", -1, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[11].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[11].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[11].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 1, 0);};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[2].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[2].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[2].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 0, 1);};
			}
			else if (x == 7) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 1, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[13].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, -1);};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 0, 1);};

				if (canEnterForest) {
					arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[3].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { fadeIntoRoom("", -1, 0);};
				}
			}
			else if (x == 8) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				if (randomHandMirrorLocation == 3 && canFindHandMirror && !hasHandMirror) {
					showHandMirror();
					princesshandmirror.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (itemimages[36].height * 0.75)) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (itemimages[36].width / 2)) + "px; cursor: pointer; visibility: visible;");
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[0].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (randomHandMirrorLocation == 3 && canFindHandMirror && !hasHandMirror) document.getElementById("canvas").removeChild(document.getElementById("princesshandmirror"));
					prepareBackground("", 0, -1);
				};

				if (canEnterForest) {
					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[8].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("", -1, 0);};
				}
			}
			else if (x == 9) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Mountain") playSoundTrack("Mountain");
					changeSoundTrack = false;
				}

				if (randomNecklaceLocation == 2 && canFindNecklace && !hasNecklace) {
					showNecklace();
					princessnecklace.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - itemimages[36].height) + "px; left: " + (canvasLeft + (canvasWidth * 0.75)) + "px; cursor: pointer; visibility: visible;");
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { fadeIntoRoom("", -1, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[3].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() {
					if (randomNecklaceLocation == 2 && canFindNecklace && !hasNecklace) document.getElementById("canvas").removeChild(document.getElementById("princessnecklace"));
					prepareBackground("", 1, 0);
				};
			}
			else if (x == 10) {
				if (canFindRoomKey && !hasRoomKey) {
					showRoomKey();
					princessroomkey.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (itemimages[36].height * 0.75) + 70) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (itemimages[36].width / 2) + 70) + "px; cursor: pointer; visibility: visible;");
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (canFindRoomKey && !hasRoomKey) document.getElementById("canvas").removeChild(document.getElementById("princessroomkey"));
					prepareBackground("", -1, 0);
				};
			}
		}
		else if (y == 4) {
			if (x == 0) {
				if (randomJourneymanLocation == 1) {
					isNotAlone = true;

					character.src = charimages[chars.JOURNEYMAN].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.JOURNEYMAN].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.JOURNEYMAN].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.JOURNEYMAN];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[3].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[3].src;
							infobar.innerHTML = "To " + locations[y + 1][x];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[3].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", 1, 0);};

						arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[8].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[8].src;
							infobar.innerHTML = "To " + locations[y - 1][x];
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[8].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("", -1, 0);};

						arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[13].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[13].src;
							infobar.innerHTML = "To " + locations[y][x + 1];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[13].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { prepareBackground("", 0, 1);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[3].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[3].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[3].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[8].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", -1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[13].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 0, 1);};
				}
			}
			else if (x == 1) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[3].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, 1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[8].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, -1);};
			}
			else if (x == 2) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[12].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[12].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[12].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, -1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[4].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[4].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[4].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, 1);};
			}
			else if (x == 3) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 1, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[3].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { fadeIntoRoom("", -1, 0);};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 0, 1);};

				arrows[3].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[3].src = arrowimages[13].src;
				arrows[3].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[3].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[3].onclick = function() { prepareBackground("", 0, -1);};
			}
			else if (x == 4) {
				if (randomHandMirrorLocation == 1 && canFindHandMirror && !hasHandMirror) {
					showHandMirror();
					princesshandmirror.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (itemimages[36].height * 0.75) + 70) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (itemimages[36].width / 2) + 70) + "px; cursor: pointer; visibility: visible;");
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[12].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[12].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[12].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (randomHandMirrorLocation == 1 && canFindHandMirror && !hasHandMirror) document.getElementById("canvas").removeChild(document.getElementById("princesshandmirror"));
					prepareBackground("", 0, -1);
				};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[4].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[4].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[4].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() {
					if (randomHandMirrorLocation == 1 && canFindHandMirror && !hasHandMirror) document.getElementById("canvas").removeChild(document.getElementById("princesshandmirror"));
					prepareBackground("", 0, 1);
				};

				arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[9].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[9].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[9].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() {
					if (randomHandMirrorLocation == 1 && canFindHandMirror && !hasHandMirror) document.getElementById("canvas").removeChild(document.getElementById("princesshandmirror"));
					prepareBackground("", 1, 0);
				};
			}
			else if (x == 5) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, -1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[3].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, 1);};

				arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 1, 0);};

				arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[3].src = arrowimages[0].src;
				arrows[3].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "Enter the Farmer's House";
				};
				arrows[3].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[3].onclick = function() { fadeIntoRoom("farmerhouse", 0, 0);};
			}
			else if (x == 6) {
				if (randomShepherdLocation == 2) {
					isNotAlone = true;

					character.src = charimages[chars.SHEPHERD].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.SHEPHERD].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 117) + "px; visibility: visible;");
					currentCharacter = characters[chars.SHEPHERD];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[4].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[4].src;
							infobar.innerHTML = "To " + locations[y][x + 1];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[4].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", 0, 1);};

						arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[9].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[9].src;
							infobar.innerHTML = "To " + locations[y + 1][x];
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[9].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("", 1, 0);};

						arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[12].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[12].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[12].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { prepareBackground("", 0, -1);};

						arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[3].src = arrowimages[7].src;
						arrows[3].onmouseover = function() {
							this.src = arrowhoverimages[7].src;
							infobar.innerHTML = "To " + locations[y - 1][x];
						};
						arrows[3].onmouseout = function() {
							this.src = arrowimages[7].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[3].onclick = function() { prepareBackground("", -1, 0);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[4].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[4].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[4].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 0, 1);};

					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[9].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[9].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[9].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[12].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[12].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[12].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 0, -1);};

					arrows[3].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[3].src = arrowimages[7].src;
					arrows[3].onmouseover = function() {
						this.src = arrowhoverimages[7].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[3].onmouseout = function() {
						this.src = arrowimages[7].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[3].onclick = function() { prepareBackground("", -1, 0);};
				}
			}
			else if (x == 7) {
				if (randomShepherdLocation == 3) {
					isNotAlone = true;

					character.src = charimages[chars.SHEPHERD].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.SHEPHERD].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 117) + "px; visibility: visible;");
					currentCharacter = characters[chars.SHEPHERD];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[8].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[8].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[8].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", 0, -1);};

						arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[0].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[0].src;
							infobar.innerHTML = "To " + locations[y + 1][x];
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[0].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("", 1, 0);};

						arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[13].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[13].src;
							infobar.innerHTML = "To " + locations[y - 1][x];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[13].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { prepareBackground("", -1, 0);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", 0, -1);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[0].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y + 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 1, 0);};

					arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[13].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", -1, 0);};
				}
			}
			else if (x == 8) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, 1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[13].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 1, 0);};
			}
			else if (x == 9) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", -1, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[3].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 1, 0);};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 0, -1);};

				arrows[3].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[3].src = arrowimages[13].src;
				arrows[3].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[3].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[3].onclick = function() { prepareBackground("", 0, 1);};

				arrows[4].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[4].src = arrowimages[3].src;
				arrows[4].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "Read sign";
				};
				arrows[4].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[4].onclick = function() {
					charName = "Sign"
					dialogueText = "All who wish to remain alive must wear a suit of armor as protection from this point on...";
					showText = true;
					hideElements();
					showInventory = true;
					messagebar.style.visibility = "visible";
				};
			}
			else if (x == 10) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, -1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[0].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y + 1][x];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 1, 0);};
			}
		}
		else if (y == 5) {
			if (x == 0) {
				if (canFindSarelle && randomPrincessLastLocation == 5) preparePrincess();
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() {
						character.style.visibility = "hidden";
						prepareBackground("", -1, 0);
					};
				}
			}
			else if (x == 1) {
				//location of the bandit
				if (banditOnCave) {
					isNotAlone = true;

					character.src = charimages[chars.BANDIT].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.BANDIT].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.BANDIT].width / 2)) + "px; visibility: visible;");
					currentCharacter = characters[chars.BANDIT];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						hideActionButtons();
						arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[8].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[8].src;
							infobar.innerHTML = "To " + locations[y][x + 1];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[8].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() {
							character.style.visibility = "hidden";
							prepareBackground("", 0, 1);
						};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() {
						character.style.visibility = "hidden";
						prepareBackground("", 0, 1);
					};
				}
			}
			else if (x == 2) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Bandit") playSoundTrack("Bandit");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[3].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, -1);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[8].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { fadeIntoRoom("", 0, 1);};
			}
			else if (x == 3) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Outside") playSoundTrack("Outside");
					changeSoundTrack = false;
				}

				if (hasThatcherInfo && randomHankerchiefLocation == 2 && canFindHankerchief && !hasHankerchief) {
					showHankerchief();
					princesshankerchief.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (itemimages[36].height * 0.75)) + "px; left: " + (canvasLeft + (canvasWidth / 2) + (itemimages[36].width / 2)) + "px; cursor: pointer; visibility: visible;");
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (hasThatcherInfo && randomHankerchiefLocation == 2 && canFindHankerchief && !hasHankerchief) document.getElementById("canvas").removeChild(document.getElementById("princesshankerchief"));
					prepareBackground("", -1, 0);
				};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 2.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[0].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { fadeIntoRoom("", 0, -1);};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[13].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() {
					if (hasThatcherInfo && randomHankerchiefLocation == 2 && canFindHankerchief && !hasHankerchief) document.getElementById("canvas").removeChild(document.getElementById("princesshankerchief"));
					prepareBackground("", 0, 1);
				};
			}
			else if (x == 4) {
				if (randomShepherdLocation == 1) {
					isNotAlone = true;

					character.src = charimages[chars.SHEPHERD].src;
					character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.SHEPHERD].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 117) + "px; visibility: visible;");
					currentCharacter = characters[chars.SHEPHERD];

					showActionButtons();

					actionButtons[3].onclick = function() {
						isNotAlone = false;
						character.style.visibility = "hidden";
						hideActionButtons();

						arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
						arrows[0].src = arrowimages[8].src;
						arrows[0].onmouseover = function() {
							this.src = arrowhoverimages[8].src;
							infobar.innerHTML = "To " + locations[y - 1][x];
						};
						arrows[0].onmouseout = function() {
							this.src = arrowimages[8].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[0].onclick = function() { prepareBackground("", -1, 0);};

						arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[0].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[0].src;
							infobar.innerHTML = "To " + locations[y][x - 1];
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[0].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("", 0, -1);};

						arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
						arrows[2].src = arrowimages[13].src;
						arrows[2].onmouseover = function() {
							this.src = arrowhoverimages[13].src;
							infobar.innerHTML = "To " + locations[y][x + 1];
						};
						arrows[2].onmouseout = function() {
							this.src = arrowimages[13].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[2].onclick = function() { prepareBackground("", 0, 1);};
					};
				}
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("", -1, 0);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[0].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[0].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[0].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { prepareBackground("", 0, -1);};

					arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[2].src = arrowimages[13].src;
					arrows[2].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y][x + 1];
					};
					arrows[2].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[2].onclick = function() { prepareBackground("", 0, 1);};
				}
			}
			else if (x == 5) {
				if (canPickStrawberries) {
					var strawberries = document.createElement("img");
					strawberries.id = "strawberries";
					strawberries.src = itemimages[50].src;
					strawberries.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + 50) + "px; left: " + (canvasLeft + (canvasWidth / 4) - 15) + "px; visibility: visible;");
					if (!hasStrawberries) {
						strawberries.style.cursor = "pointer";
						strawberries.onclick = function() {
							hideElementsOnGettingItem();
							showItemConfirmation(48, "Strawberries", 0, 5);
							hasStrawberries = true;
							items[0][5].onclick = function() {
								if (currentCharacter == characters[chars.ROYALCOOK]) {
									showTextOnGivingItem("Royal Cook");
									dialogueText = "Thank you. I'll make a strawberry cake right now... There!";
									mustGiveStrawberryCake = true;
									hideElementsOnGivingItem(0, 5);
								}
							};
						}
					}
					document.getElementById("canvas").appendChild(strawberries);
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (canPickStrawberries) document.getElementById("canvas").removeChild(document.getElementById("strawberries"));
					prepareBackground("", -1, 0);
				};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[0].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() {
					if (canPickStrawberries) document.getElementById("canvas").removeChild(document.getElementById("strawberries"));
					prepareBackground("", 0, -1);
				};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[13].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() {
					if (canPickStrawberries) document.getElementById("canvas").removeChild(document.getElementById("strawberries"));
					prepareBackground("", 0, 1);
				};
			}
			else if (x == 6) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", -1, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.25)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[0].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "To " + locations[y][x - 1];
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("", 0, -1);};

				arrows[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[13].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "To " + locations[y][x + 1];
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("", 0, 1);};
			}
			else if (x == 7) {
				if (canFindSarelle && randomPrincessLastLocation == 4) preparePrincess();
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasTop + canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y][x - 1];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() {
						character.style.visibility = "hidden";
						prepareBackground("", 0, -1);
					};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (arrowWidth / 4)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[13].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[13].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[13].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() {
						character.style.visibility = "hidden";
						prepareBackground("", -1, 0);
					};
				}
			}
			else if (x == 8) {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", -1, 0);};
			}
			else if (x == 9) {
				if (changeSoundTrack) {
					if(!onMobile) if (currentTrack != "Mountain") playSoundTrack("Mountain");
					changeSoundTrack = false;
				}

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To " + locations[y - 1][x];
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", -1, 0);};

				if (canVisitDragon) {
					arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[8].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "Enter the Dragon's Lair";
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() { fadeIntoRoom("dragonlair", 0, 0);};
				}
			}
			else if (x == 10) {
				if (canFindSarelle && randomPrincessLastLocation == 3) preparePrincess();
				else {
					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "To " + locations[y - 1][x];
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() {
						character.style.visibility = "hidden";
						prepareBackground("", -1, 0);
					};
				}
			}
		}
	}
	else {
		isNotAlone = true;

		for (var i = 0; i < rooms.length; i++) {
			if (room === rooms[i]) {
				document.getElementById("canvas").style.backgroundImage = "url(" + imageRoot + "backgrounds/rooms/" + rooms[i] + ".png)";
				break;
			}
		}

		if (room === "alehouse") {
			infoLocation = "Ale House";
			infobar.innerHTML = infoLocation;

			isNotAlone = true;
			currentCharacter = "bartender";
			showActionButtons();

			actionButtons[3].onclick = function() {
				isNotAlone = false;
				hideActionButtons();

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "Leave " + infoLocation;
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { fadeOutofRoom(room);};
			}
		}
		else if (room === "annehouse") {
			infoLocation = "Anne's House";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.ANNE].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.ANNE].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.ANNE].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.ANNE];

			if (AnneIsHappy) {
				var annehappy = document.createElement("img");
				annehappy.id = "annehappy";
				annehappy.src = faceimages[0].src;
				annehappy.setAttribute("style", "position: absolute; top: " + (123 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[0].width / 2)) + "px; visibility: visible;");
				document.getElementById("canvas").appendChild(annehappy);
			}

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "brucehouse") {
			infoLocation = "Bruce's House";
			infobar.innerHTML = infoLocation;
			currentCharacter = "bruce";

			if (isSleeping) {
				var bruceasleep = document.createElement("img");
				bruceasleep.id = "bruceasleep";
				bruceasleep.src = faceimages[2].src;
				bruceasleep.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - 68 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) + 39) + "px;");
				document.getElementById("canvas").appendChild(bruceasleep);
			}

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "castle-kitchen") {
			infoLocation = "Redin Palace - Kitchen";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.ROYALCOOK].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.ROYALCOOK].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.ROYALCOOK].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.ROYALCOOK];

			showActionButtons();

			actionButtons[3].onclick = function() {
				isNotAlone = false;
				hideActionButtons();

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "To the Throneroom";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					character.style.visibility = "hidden";
					prepareBackground("castle-throneroom", 0, 0);
				};
			};
		}
		else if (room === "castle-princessdoor") {
			infoLocation = "Redin Palace - 2F Stairs";
			infobar.innerHTML = infoLocation;

			if (endGame) { //Lucille won't appear by the princess door when the game is at end
				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75)) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[9].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[9].src;
					infobar.innerHTML = "Go downstairs";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[9].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("castle-stairs", 0, 0);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[3].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[3].src;
					infobar.innerHTML = "To the Princess's Room";
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[3].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("castle-princessroom", 0, 0);};
			}
			else {
				character.src = charimages[chars.LUCILLE].src;
				character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.LUCILLE].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.LUCILLE].width / 2)) + "px; visibility: visible;");
				currentCharacter = characters[chars.LUCILLE];

				showActionButtons();

				actionButtons[3].onclick = function() {
					isNotAlone = false;
					hideActionButtons();
					character.style.visibility = "hidden";

					arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75)) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[9].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[9].src;
						infobar.innerHTML = "Go downstairs";
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[9].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("castle-stairs", 0, 0);};

					if (hasRoomKey) {
						arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - arrowWidth) + "px; cursor: pointer; visibility: visible;");
						arrows[1].src = arrowimages[3].src;
						arrows[1].onmouseover = function() {
							this.src = arrowhoverimages[3].src;
							infobar.innerHTML = "To the Princess's Room";
						};
						arrows[1].onmouseout = function() {
							this.src = arrowimages[3].src;
							infobar.innerHTML = infoLocation;
						};
						arrows[1].onclick = function() { prepareBackground("castle-princessroom", 0, 0);};
					}
				};
			}
		}
		else if (room === "castle-princessroom") {
			infoLocation = "Redin Palace - Princess's Room";
			infobar.innerHTML = infoLocation;

			if (endGame) { //Lucille will only appear in Sarelle's room if the game is at end
				character.src = charimages[chars.LUCILLE].src;
				character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.LUCILLE].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.LUCILLE].width / 2)) + "px; visibility: visible;");
				currentCharacter = characters[chars.LUCILLE];

				showActionButtons();

				actionButtons[3].onclick = function() {
					isNotAlone = false;
					hideActionButtons();
					character.style.visibility = "hidden";

					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "Leave the Princess's Room";
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { prepareBackground("castle-princessdoor", 0, 0);};
				};
			}
			else {
				isNotAlone = false;

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "Leave the Princess's Room";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("castle-princessdoor", 0, 0);};

				//code for the arrow to read diary
				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + arrowHeight - charOffset) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[0].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "Read The Princess's Diary";
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() {
					charName = "Princess's Diary"
					dialogueText = princessDiaryEntries[randomPrincessKidnapper];
					showText = true;
					hideElements();
					showInventory = true;
					messagebar.style.visibility = "visible";

					if (randomPrincessKidnapper == 0) canVisitDragon = true;
					else if (randomPrincessKidnapper == 1) canVisitWitch = true;
					else if (randomPrincessKidnapper == 2) banditOnCave = true;
				};
			}
		}
		else if (room === "castle-stairs") {
			infoLocation = "Redin Palace - 1F Stairs";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.JESTER].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.JESTER].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.JESTER].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.JESTER];

			showActionButtons();

			actionButtons[3].onclick = function() {
				isNotAlone = false;
				hideActionButtons();

				if (jesterIsCrying) {
					document.getElementById("canvas").removeChild(document.getElementById("jestersad"));
					jesterIsCrying = false;
				}

				character.style.visibility = "hidden";

				arrows[0].setAttribute("style", "position: absolute; top: " + ((canvasHeight * 0.75) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[14].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[14].src;
					infobar.innerHTML = "To the Throne Room";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[14].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {prepareBackground("castle-throneroom", 0, 0)};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 2) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) + arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[5].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[5].src;
					infobar.innerHTML = "Go upstairs";
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[5].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("castle-princessdoor", 0, 0);};
			};
		}
		else if (room === "castle-throneroom") {
			infoLocation = "Redin Palace - Throne Room";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.ROYALSENTRY].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.ROYALSENTRY].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.ROYALSENTRY].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.ROYALSENTRY];

			if (hasRoyalSeal) {
				var royalsentryok = document.createElement("img");
				royalsentryok.id = "royalsentryok";
				royalsentryok.src = faceimages[11].src;
				royalsentryok.setAttribute("style", "position: absolute; top: " + (75 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[11].width / 2) - 18) + "px; visibility: visible;");
				document.getElementById("canvas").appendChild(royalsentryok);
			}

			showActionButtons();

			actionButtons[3].onclick = function() {
				isNotAlone = false;
				hideActionButtons();
				character.style.visibility = "hidden";
				if (hasRoyalSeal) document.getElementById("canvas").removeChild(document.getElementById("royalsentryok"));

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "Leave Redin Palace";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { fadeOutofRoom(room);};

				arrows[1].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[13].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[13].src;
					infobar.innerHTML = "Go to the Kitchen";
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[13].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() { prepareBackground("castle-kitchen", 0, 0);};

				arrows[2].setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) + (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + canvasWidth - arrowWidth) + "px; cursor: pointer; visibility: visible;");
				arrows[2].src = arrowimages[0].src;
				arrows[2].onmouseover = function() {
					this.src = arrowhoverimages[0].src;
					infobar.innerHTML = "Go to the Stairs";
				};
				arrows[2].onmouseout = function() {
					this.src = arrowimages[0].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[2].onclick = function() { prepareBackground("castle-stairs", 0, 0);};
			};
		}
		else if (room === "church") {
			if (changeSoundTrack) {
				if(!onMobile) if (currentTrack != "Chapel") playSoundTrack("Chapel");
				changeSoundTrack = false;
			}

			infoLocation = "The Chapel";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.PRIEST].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.PRIEST].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.PRIEST].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.PRIEST];

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "dragonlair") {
			if (changeSoundTrack) {
				if(!onMobile) if (currentTrack != "Dragon") playSoundTrack("Dragon");
				changeSoundTrack = false;
			}

			infoLocation = "Dragon's Lair";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.DRAGON].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.DRAGON].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.DRAGON].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.DRAGON];

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "dukehouse-bedroom") {
			infoLocation = "Duke's Manor - 2F";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.DUCHESS].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.DUCHESS].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.DUCHESS].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.DUCHESS];

			if (DuchessIsHappy) {
				var duchesshappy = document.createElement("img");
				duchesshappy.id = "duchesshappy";
				duchesshappy.src = faceimages[4].src;
				duchesshappy.setAttribute("style", "position: absolute; top: " + (117 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[4].width / 2)) + "px; visibility: visible;");
				document.getElementById("canvas").appendChild(duchesshappy);
			}

			showActionButtons();
			actionButtons[3].onclick = function() {
				isNotAlone = false;
				hideActionButtons();

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "Go to the Foyer";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (DuchessIsHappy) document.getElementById("canvas").removeChild(document.getElementById("duchesshappy"));
					character.style.visibility = "hidden";
					prepareBackground("dukehouse-foyer", 0, 0);
				};
			};
		}
		else if (room === "dukehouse-foyer") {
			infoLocation = "Duke's Manor - Foyer";
			infobar.innerHTML = infoLocation;

			if (isGrounded) {
				character.src = charimages[chars.DUKE].src;
				character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.DUKE].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.DUKE].width / 2)) + "px; visibility: visible;");
				currentCharacter = characters[chars.DUKE];

				if (!DukeIsHappy) {
					var dukesad = document.createElement("img");
					dukesad.id = "dukesad";
					dukesad.src = faceimages[5].src;
					dukesad.setAttribute("style", "position: absolute; top: " + (144 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[5].width / 2)) + "px; visibility: visible;");
					document.getElementById("canvas").appendChild(dukesad);
				}

				showActionButtons();
				actionButtons[3].onclick = function() {
					isNotAlone = false;
					hideActionButtons();

					arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[0].src = arrowimages[8].src;
					arrows[0].onmouseover = function() {
						this.src = arrowhoverimages[8].src;
						infobar.innerHTML = "Leave Duke's Manor";
					};
					arrows[0].onmouseout = function() {
						this.src = arrowimages[8].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[0].onclick = function() { fadeOutofRoom(room);};

					arrows[1].setAttribute("style", "position: absolute; top: " + (canvasTop + (arrowHeight * 0.75) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
					arrows[1].src = arrowimages[12].src;
					arrows[1].onmouseover = function() {
						this.src = arrowhoverimages[12].src;
						infobar.innerHTML = "Go Upstairs";
					};
					arrows[1].onmouseout = function() {
						this.src = arrowimages[12].src;
						infobar.innerHTML = infoLocation;
					};
					arrows[1].onclick = function() {
						if (!DukeIsHappy) document.getElementById("canvas").removeChild(document.getElementById("dukesad"));
						character.style.visibility = "hidden";
						prepareBackground("dukehouse-bedroom", 0, 0);
					};
				};
			}
			else {
				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "Leave Duke's Manor";
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { fadeOutofRoom(room);};

				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasTop + (arrowHeight * 0.75) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 4) + (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[12].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[12].src;
					infobar.innerHTML = "Go Upstairs";
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[12].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() {
					character.style.visibility = "hidden";
					prepareBackground("dukehouse-bedroom", 0, 0);
				};
			}
		}
		else if (room === "farmerhouse") {
			infoLocation = "Farmer's House";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.FARMER].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.FARMER].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.FARMER].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.FARMER];

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "francishouse") {
			infoLocation = "Francis's House";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.FRANCIS].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.FRANCIS].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.FRANCIS].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.FRANCIS];

			if (FrancisIsHappy) {
				var francishappy = document.createElement("img");
				francishappy.id = "francishappy";
				francishappy.src = faceimages[6].src;
				francishappy.setAttribute("style", "position: absolute; top: " + (51 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[6].width / 2)) + "px; visibility: visible;");
				document.getElementById("canvas").appendChild(francishappy);
			}

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "gravekeeperhouse") {
			infoLocation = "Grave Keeper's House";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.GRAVEKEEPER].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.GRAVEKEEPER].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.GRAVEKEEPER].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.GRAVEKEEPER];

			if (hasGhosts) {
				var gravekeeperscared = document.createElement("img");
				gravekeeperscared.id = "gravekeeperscared";
				gravekeeperscared.src = faceimages[7].src;
				gravekeeperscared.setAttribute("style", "position: absolute; top: " + (98 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[7].width / 2)) + "px; visibility: visible;");
				document.getElementById("canvas").appendChild(gravekeeperscared);
			}

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "hospital") {
			infoLocation = "Hospital";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.NURSE].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.NURSE].height) +"px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.NURSE].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.NURSE];

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "howardhouse") {
			infoLocation = "Howard's House";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.HOWARD].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.HOWARD].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.HOWARD].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.HOWARD];

			if (isHealthy) {
				var howardhappy = document.createElement("img");
				howardhappy.id = "howardhappy";
				howardhappy.src = faceimages[8].src;
				howardhappy.setAttribute("style", "position: absolute; top: " + (50 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[8].width / 2)) + "px; visibility: visible;");
				document.getElementById("canvas").appendChild(howardhappy);
			}

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "magicianhouse") {
			infoLocation = "Magician's House";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.MAGICIAN].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.MAGICIAN].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.MAGICIAN].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.MAGICIAN];

			if (isDrunk) {
				var magiciandrunk = document.createElement("img");
				magiciandrunk.id = "magiciandrunk";
				magiciandrunk.src = faceimages[10].src;
				magiciandrunk.setAttribute("style", "position: absolute; top: " + (104 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[10].width / 2) - 27) + "px; visibility: visible;");
				document.getElementById("canvas").appendChild(magiciandrunk);
			}

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "marketshop") {
			infoLocation = "Market Shop";
			infobar.innerHTML = infoLocation;

			currentCharacter = "merchant";

			if (canBuyFlour && !hasFlour) {
				var flourbag = document.createElement("img");
				flourbag.id = "flourbag";
				flourbag.src = itemimages[22].src
				flourbag.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - 20) + "px; left: " + (canvasLeft + (canvasWidth * 0.75) + 20) + "px; cursor: pointer;");
				flourbag.onclick = function() {
					itemToBuy = "flourbag";
					messagebar.style.visibility = "visible";
					prepareText("merchant");
				};
				document.getElementById("canvas").appendChild(flourbag);
			}

			if (canBuyFish && !hasFish) {
				var thefish = document.createElement("img");
				thefish.id = "thefish";
				thefish.src = itemimages[20].src;
				thefish.setAttribute("style", "position: absolute; top: " + ((canvasHeight /2) + 60) + "px; left: " + (canvasLeft + (canvasWidth / 4) - 40) + "px; cursor: pointer;");
				thefish.onclick = function() {
					itemToBuy = "fish";
					messagebar.style.visibility = "visible";
					prepareText("merchant");
				};
				document.getElementById("canvas").appendChild(thefish);
			}

			if (canBuyCherries && !hasCherries) {
				var cherries = document.createElement("img");
				cherries.id = "cherries";
				cherries.src = itemimages[10].src;
				cherries.setAttribute("style", "position: absolute; top: " + ((canvasHeight /2) + 60) + "px; left: " + (canvasLeft + (canvasWidth / 4) + 320) + "px; cursor: pointer;");
				cherries.onclick = function() {
					itemToBuy = "cherries";
					messagebar.style.visibility = "visible";
					prepareText("merchant");
				};
				document.getElementById("canvas").appendChild(cherries);
			}

			showActionButtons();
			actionButtons[3].onclick = function() {
				isNotAlone = false;
				hideActionButtons();

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "Leave " + infoLocation;
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() {
					if (canBuyFlour && !hasFlour) document.getElementById("canvas").removeChild(document.getElementById("flourbag"));
					if (canBuyFish && !hasFish) document.getElementById("canvas").removeChild(document.getElementById("thefish"));
					if (canBuyCherries && !hasCherries) document.getElementById("canvas").removeChild(document.getElementById("cherries"));
					prepareBackground("", 0, 0);
				};
			};
		}
		else if (room === "minstrelhouse") {
			infoLocation = "Minstrel's House";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.MINSTREL].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.MINSTREL].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.MINSTREL].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.MINSTREL];

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "playerhouse") {
			isNotAlone = false;

			infoLocation = "Your House";
			infobar.innerHTML = infoLocation;

			if (!hasSavings) {
				var moneybag = document.createElement("img");
				moneybag.id = "moneybag";
				moneybag.src = itemimages[33].src;
				moneybag.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 4) + (itemimages[31].height * 0.75)) + "px; left: " + (canvasLeft + (itemimages[31].width / 2)) + "px; cursor: pointer; visibility: visible;");
				moneybag.onclick = function() {
					hasSavings = true;
					document.getElementById("canvas").removeChild(moneybag);
					//call function to show item confirmation
					hideElementsOnGettingItem();

					getMoney(32, 500);
				};
				document.getElementById("canvas").appendChild(moneybag);
			}

			arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
			arrows[0].src = arrowimages[8].src;
			arrows[0].onmouseover = function() {
				this.src = arrowhoverimages[8].src;
				infobar.innerHTML = "Leave " + infoLocation;
			};
			arrows[0].onmouseout = function() {
				this.src = arrowimages[8].src;
				infobar.innerHTML = infoLocation;
			};
			arrows[0].onclick = function() { fadeOutofRoom(room);};

			if(!hasHeirloom && (findWitchArtifacts || findMerlinsSpell)) {
				arrows[1].setAttribute("style", "position: absolute; top: " + (canvasHeight / 2 - charOffset) + "px; left: " + (canvasLeft + canvasWidth - (arrowWidth * 1.5)) + "px; cursor: pointer; visibility: visible;");
				arrows[1].src = arrowimages[8].src;
				arrows[1].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "Check chest";
				};
				arrows[1].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[1].onclick = function() {
					hideElementsOnGettingItem();
					arrows[1].style.visibility = "hidden";
					arrowsVisible = 1;
					showItemConfirmation(26, "Family Heirloom", 1, 5);
					hasHeirloom = true;
					items[1][5].onclick = function() {
						if (currentCharacter == "barterer") {
							hideElementsOnGivingItem(1, 5);
							showTextOnGivingItem("Barterer");
							dialogueText = "That is perfect! I'll give you this ancient spell for it!";
							mustGiveMerlinSpell = true;
						}
					};
				};
			}
		}
		else if (room === "pottershop") {
			infoLocation = "Pottery Shop";
			infobar.innerHTML = infoLocation;

			currentCharacter = "potter";

			showActionButtons();
			actionButtons[3].onclick = function() {
				isNotAlone = false;
				hideActionButtons();

				arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
				arrows[0].src = arrowimages[8].src;
				arrows[0].onmouseover = function() {
					this.src = arrowhoverimages[8].src;
					infobar.innerHTML = "Leave " + infoLocation;
				};
				arrows[0].onmouseout = function() {
					this.src = arrowimages[8].src;
					infobar.innerHTML = infoLocation;
				};
				arrows[0].onclick = function() { prepareBackground("", 0, 0);};
			};
		}
		else if (room === "sallyhouse") {
			if (changeSoundTrack) {
				if(!onMobile) if (currentTrack != "Sally") playSoundTrack("Sally");
				changeSoundTrack = false;
			}

			infoLocation = "Sally's House";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.SALLY].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.SALLY].height) +"px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SALLY].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.SALLY];

			if (!hasFox) {
				var sallysad = document.createElement("img");
				sallysad.id = "sallysad";
				sallysad.src = faceimages[13].src;
				sallysad.setAttribute("style", "position: absolute; top: " + (161 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[13].width / 2)) + "px; visibility: visible;");
				document.getElementById("canvas").appendChild(sallysad);
			}
			else {
				var foxie = document.createElement("img");
				foxie.id = "foxie";
				foxie.src = charimages[chars.SPIRITFOXSMALL].src;
				foxie.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - 50) + "px; left: " + (canvasLeft + (canvasWidth / 4) - 15) + "px;");
				document.getElementById("canvas").appendChild(foxie);
			}

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "serfhouse") {
			infoLocation = "Serf's House";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.SERF].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.SERF].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SERF].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.SERF];

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "smithhouse") {
			infoLocation = "Smithy";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.SMITH].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.SMITH].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SMITH].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.SMITH];

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "tailorhouse") {
			infoLocation = "Tailor Shop";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.TAILOR].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.TAILOR].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.TAILOR].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.TAILOR];

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "tradehouse") {
			currentCharacter = "barterer";
			infoLocation = "Trade House";
			infobar.innerHTML = infoLocation;

			if (canTradeSilkCloth) {
				var silkcloth = document.createElement("img");
				silkcloth.id = "silkcloth";
				silkcloth.src = itemimages[44].src;
				silkcloth.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - 70) + "px; left: " + (canvasLeft + (canvasWidth / 2) + 35) + "px;");
				document.getElementById("canvas").appendChild(silkcloth);
			}

			if (canTradeMerlinSpell) {
				var merlinspell = document.createElement("img");
				merlinspell.id = "merlinspell";
				merlinspell.src = itemimages[31].src;
				merlinspell.setAttribute("style", "position: absolute; top: " + ((canvasHeight / 2) - 70) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 105) + "px;");
				document.getElementById("canvas").appendChild(merlinspell);
			}

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
		else if (room === "witchhouse") {
			if (changeSoundTrack) {
				if(!onMobile) if (currentTrack != "Witch") playSoundTrack("Witch");
				changeSoundTrack = false;
			}

			infoLocation = "Witch's Cottage";
			infobar.innerHTML = infoLocation;

			character.src = charimages[chars.WITCH].src;
			character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.WITCH].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.WITCH].width / 2)) + "px; visibility: visible;");
			currentCharacter = characters[chars.WITCH];

			showActionButtons();
			prepareActiontoLeaveRoom(room);
		}
	}
}

function startIntro() {
	//Set all game states to false except for in order to debug correctly
	inMain = false;
	inIntroduction = false;
	inOptions = false;
	inGame = false;
	inIntro = true;

	currentTrack = "Crimsonia";

	document.getElementById("debug").style.zIndex = "3";
	document.getElementById("debug").style.color = "rgb(255, 255, 255)";

	trumpetSound.play();
	document.getElementById("continue").style.visibility = "visible";
	document.getElementById("intromessage").style.visibility = "visible";

	document.getElementById("logo").style.visibility = "hidden";
	document.getElementById("start").style.visibility = "hidden";
	document.getElementById("instructions").style.visibility = "hidden";
	document.getElementById("credits").style.visibility = "hidden";
}

function startGame() {
	//Set all game states to false except for in order to debug correctly
	inMain = false;
	inIntroduction = false;
	inOptions = false;
	inGame = true;
	inIntro = false;

	document.getElementById("debug").style.zIndex = "0";
	document.getElementById("debug").style.color = "rgb(0, 0, 0)";

	document.getElementById("continue").style.top = "340px";
	document.getElementById("continue").style.visibility = "hidden";
	document.getElementById("intromessage").style.visibility = "hidden";

	prepareBackground("", 0, 0);

	dispinfobar.style.visibility = "visible";
	separatorbar.style.visibility = "visible";
	infobar.style.visibility = "visible";
	bag.style.visibility = "visible";
	if (hasArmor) armor.style.visibility = "visible";
	coins.style.visibility = "visible";
	dispmoney.style.visibility = "visible";
	dispfavors.style.visibility = "visible";
	//document.getElementById("messagebar").style.visibility = "visible";
}

//In charge of pre-loading main logo presentation
function preloadGreenDream() {

	//Always show the logo to try to ensure ownership!
	var greendream = document.createElement("img");
	greendream.src = "./dream.png";
	greendream.id = "greendream";
	greendream.setAttribute("style", "position: absolute; top:" + ((canvasHeight / 2) - 120) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 188) + "px;");

	//courtesy LOADING!!! text
	var loadtext = document.createElement("div");
	loadtext.id = "loadtext";
	loadtext.innerHTML = "LOADING!!!";
	loadtext.setAttribute("style", "font-size: 40px; color: #ffffff; margin: " + ((canvasHeight / 2) - 30) + "px 0px 0px 0px; text-align: center; -webkit-text-stroke: 2px black;");

	//the container of the loading progress bar-thing
	var statusloadbottom = document.createElement("div");
	statusloadbottom.id = "statusloadbottom";
	statusloadbottom.setAttribute("style", "width: 400px; height: 40px; background-color: #000000; border-radius: 40px; position: absolute; top: " + ((canvasHeight / 2) + 35) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 200) + "px;");

	//statusloadtop is the progress bar-thing. Set to 31 at first but must progress to 390
	var statusloadtop = document.createElement("div");
	statusloadtop.id = "statusloadtop";
	statusloadtop.setAttribute("style", "width: 31px; height: 30px; background: linear-gradient(#008000, #00cc00, #008000); background: -webkit-linear-gradient(#008000, #00cc00, #008000); background: -moz-linear-gradient(#008000, #00cc00, #008000); background: -o-linear-gradient(#008000, #00cc00, #008000); border-radius: 30px; position: absolute; top: " + ((canvasHeight / 2) + 40) + "px; left: " + (canvasLeft + (canvasWidth / 2) - 195) + "px;");

	document.getElementById("canvas").appendChild(greendream);
	document.getElementById("canvas").appendChild(loadtext);
	document.getElementById("canvas").appendChild(statusloadbottom);
	document.getElementById("canvas").appendChild(statusloadtop);

	preloadBackgrounds();
}

function preloadBackgrounds() {
	document.getElementById("loadtext").innerHTML = "Loading backgrounds...";
	var width = 7 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var backgroundImagelimit = 0;
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 11; j++) {
			backgrounds[i][j] = new Image();
			backgrounds[i][j].onload = function() {
				width += 1;
				document.getElementById("statusloadtop").style.width = width + "px";
				backgroundImagelimit++;
				if (backgroundImagelimit == 66) preloadRooms();
			};
			backgrounds[i][j].onerror = function() { };
			backgrounds[i][j].src = imageRoot + "backgrounds/" + i + j + ".png";
		}
	}
}

function preloadRooms() {
	document.getElementById("loadtext").innerHTML = "Loading rooms...";
	var width = 7 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var roomImagelimit = 0;
	for (var i = 0; i < roomimages.length; i++) {
		roomimages[i] = new Image();
		roomimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			roomImagelimit++;
			if (roomImagelimit == 29) preloadCharacters();
		};
		roomimages[i].onerror = function() { };
		roomimages[i].src = imageRoot + "backgrounds/rooms/" + rooms[i] + ".png";
	}
}

function preloadCharacters() {
	document.getElementById("loadtext").innerHTML = "Loading characters...";
	var width = 7 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var charImagelimit = 0;
	for (var i = 0; i < charimages.length; i++) {
		charimages[i] = new Image();
		charimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			charImagelimit++;
			if (charImagelimit == 36) preloadSpiritFoxFades();
		};
		charimages[i].onerror = function() { };
		charimages[i].src = imageRoot + "characters/" + characters[i] + ".png";
	}
}

function preloadSpiritFoxFades() {
	document.getElementById("loadtext").innerHTML = "Loading characters...";
	var width = 6 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var charImagelimit = 0;
	for (var i = 0; i < sffimages.length; i++) {
		sffimages[i] = new Image();
		sffimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			charImagelimit++;
			if (charImagelimit == 8) preloadSpiritFoxSmallFades();
		};
		sffimages[i].onerror = function() {	};
		sffimages[i].src = imageRoot + "characters/" + sff[i] + ".png";
	}
}

function preloadSpiritFoxSmallFades() {
	document.getElementById("loadtext").innerHTML = "Loading characters...";
	var width = 6 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var charImagelimit = 0;
	for (var i = 0; i < sfsfimages.length; i++) {
		sfsfimages[i] = new Image();
		sfsfimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			charImagelimit++;
			if (charImagelimit == 8) preloadSpiritFoxEatingFades();
		};
		sfsfimages[i].onerror = function() { };
		sfsfimages[i].src = imageRoot + "characters/" + sfsf[i] + ".png";
	}
}

function preloadSpiritFoxEatingFades() {
	document.getElementById("loadtext").innerHTML = "Loading characters...";
	var width = 6 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var charImagelimit = 0;
	for (var i = 0; i < sfefimages.length; i++) {
		sfefimages[i] = new Image();
		sfefimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			charImagelimit++;
			if (charImagelimit == 8) preloadFaces();
		};
		sfefimages[i].onerror = function() { };
		sfefimages[i].src = imageRoot + "characters/" + sfef[i] + ".png";
	}
}

function preloadFaces() {
	document.getElementById("loadtext").innerHTML = "Loading faces...";
	var width = 7 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var faceImagelimit = 0;
	for (var i = 0; i < faceimages.length; i++) {
		faceimages[i] = new Image();
		faceimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			faceImagelimit++;
			if (faceImagelimit == 17) preloadItems();
		};
		faceimages[i].onerror = function() { };
		faceimages[i].src = imageRoot + "faces/" + faces[i] + ".png";
	}
}

function preloadItems() {
	document.getElementById("loadtext").innerHTML = "Loading items...";
	var width = 7 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var itemImagelimit = 0;
	for (var i = 0; i < itemimages.length; i++) {
		itemimages[i] = new Image();
		itemimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			itemImagelimit++;
			if (itemImagelimit == 55) preloadArrows();
		};
		itemimages[i].onerror = function() { };
		itemimages[i].src = imageRoot + "items/" + itemnames[i] + ".png";
	}
}

function preloadArrows() {
	document.getElementById("loadtext").innerHTML = "Loading arrows...";
	var width = 7 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var itemImagelimit = 0;
	for (var i = 0; i < itemimages.length; i++) {
		arrowimages[i] = new Image();
		arrowimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			itemImagelimit++;
			if (itemImagelimit == 16) preloadMouseOverArrows();
		};
		arrowimages[i].onerror = function() { };
		arrowimages[i].src = arrowRoot + aimgs[i] + ".png";
	}
}

function preloadMouseOverArrows() {
	document.getElementById("loadtext").innerHTML = "Loading arrows...";
	var width = 7 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var itemImagelimit = 0;
	for (var i = 0; i < itemimages.length; i++) {
		arrowhoverimages[i] = new Image();
		arrowhoverimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			itemImagelimit++;
			if (itemImagelimit == 16) preloadButtons();
		};
		arrowhoverimages[i].onerror = function() { };
		arrowhoverimages[i].src = arrowRoot + "mouseover/" + aimgs[i] + ".png";
	}
}

function preloadButtons() {
	document.getElementById("loadtext").innerHTML = "Loading arrows...";
	var width = 6 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var itemImagelimit = 0;
	for (var i = 0; i < itemimages.length; i++) {
		buttonimages[i] = new Image();
		buttonimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			itemImagelimit++;
			if (itemImagelimit == 10) preloadMouseOverButtons();
		};
		buttonimages[i].onerror = function() { };
		buttonimages[i].src = buttonRoot + bimgs[i] + ".png";
	}
}

function preloadMouseOverButtons() {
	document.getElementById("loadtext").innerHTML = "Loading arrows...";
	var width = 7 + parseInt(document.getElementById("statusloadtop").style.width, 10);
	var itemImagelimit = 0;
	for (var i = 0; i < itemimages.length; i++) {
		buttonhoverimages[i] = new Image();
		buttonhoverimages[i].onload = function() {
			width += 1;
			document.getElementById("statusloadtop").style.width = width + "px";
			itemImagelimit++;
			if (itemImagelimit == 10) checkStatus();
		};
		buttonhoverimages[i].onerror = function() { };
		buttonhoverimages[i].src = buttonRoot + "mouseover/" + bimgs[i] + ".png";
	}
}

function checkStatus() {
	if (parseInt(document.getElementById("statusloadtop").style.width, 10) >= 390) {
		//If program made it here, all preloading should be finished. Remove the elements created at preloadGreenDream to load actual game
		document.getElementById("canvas").removeChild(document.getElementById("greendream"));
		document.getElementById("canvas").removeChild(document.getElementById("loadtext"));
		document.getElementById("canvas").removeChild(document.getElementById("statusloadbottom"));
		document.getElementById("canvas").removeChild(document.getElementById("statusloadtop"));

		document.getElementById("canvas").style.backgroundImage = "url(" + backgrounds[5][4].src + ")";

		prepareGame();
	}
}

function fadeIntoRoom(room, y, x) {
	leavingHouse = true;
	if(!onMobile) playSoundEffect("move");

	if (infoLocation == "Chapel" || infoLocation == "The Chapel" || infoLocation == "Crimsonia's East Gates" ||
		infoLocation == "Crimsonia's North Gates" || infoLocation == "Crimsonia's South Gates" || infoLocation == "Crimsonia's West Gates" ||
		infoLocation == "Crimsonia's North Entrance" || infoLocation == "Crimsonia's South Entrance" || infoLocation == "Crimsonia's East Entrance" ||
		infoLocation == "Crimsonia's West Entrance" || infoLocation == "Forest North Entrance" || infoLocation == "Forest North Entrance" ||
		infoLocation == "Forest Main Entrance" || infoLocation == "Forest Entrance Barricade" || infoLocation == "Crimsonia's Border Trail" ||
		infoLocation == "Cave Dwellings" || infoLocation == "Forest SouthWest Corner" || infoLocation == "Forest PineWall" ||
		infoLocation == "Forest SouthEast Corner" || infoLocation == "Forest NorthEast Corner" || infoLocation == "Forest NorthWest Corner" ||
		infoLocation == "Forswear Cottage" || infoLocation == "Witch's Cottage" || infoLocation == "Mountain Pass" || infoLocation == "Crimson Cave" ||
		infoLocation == "Dragon's Lair" || infoLocation == "Sally's House" || infoLocation == "East Seaside Woods Entrance" ||
		infoLocation == "Trance Reef" || infoLocation == "Northern Seaside Woods Entrance" || infoLocation == "Triground North Vista") {
			$('#soundTrack').animate({volume: 0.0}, 250);
			changeSoundTrack = true;
		}

	fader.style.visibility = "visible";
	fader.style.opacity = "1.0";
	$('#fader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
	function(e) {
		if (hasThatcherInfo && canFindHankerchief && !hasHankerchief) {
			if (document.getElementById("princesshankerchief")) document.getElementById("canvas").removeChild(document.getElementById("princesshankerchief"));
		}
		if (canFindHandMirror && !hasHandMirror) {
			if (document.getElementById("princesshandmirror")) document.getElementById("canvas").removeChild(document.getElementById("princesshandmirror"));
		}
		if (canFindNecklace && !hasNecklace) {
			if (document.getElementById("princessnecklace")) document.getElementById("canvas").removeChild(document.getElementById("princessnecklace"));
		}

		if (infoLocation == "Graveyard" && hasGhosts) {
			if (document.getElementById("theghost")) document.getElementById("canvas").removeChild(document.getElementById("theghost"));
			ghostDisplacement = 0;
			ghostFloatLeft = true;
		}

		if (fader.style.opacity == 1) {
			prepareBackground(room, y, x);
			fader.style.opacity = 0.0;
			$('#fader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
			function(e) {
				fader.style.visibility = "hidden";
			});
		}

		if (currentCharacter == characters[chars.SARELLE] && !gameFinished) {
			showElements();
			hideActionButtons();
			character.style.visibility = "hidden";
      // document.getElementById("canvas").removeChild(document.getElementById("princessface"));
      $('#princessface').remove();
		}
	});
}

function fadeOutofRoom(room) {
	leavingHouse = true;
	if(!onMobile) playSoundEffect("move");

	if (infoLocation == "Chapel" || infoLocation == "The Chapel" || infoLocation == "Crimsonia's East Gates" ||
		infoLocation == "Crimsonia's North Gates" || infoLocation == "Crimsonia's South Gates" || infoLocation == "Crimsonia's West Gates" ||
		infoLocation == "Crimsonia's North Entrance" || infoLocation == "Crimsonia's South Entrance" || infoLocation == "Crimsonia's East Entrance" ||
		infoLocation == "Crimsonia's West Entrance" || infoLocation == "Forest North Entrance" || infoLocation == "Forest North Entrance" ||
		infoLocation == "Forest Main Entrance" || infoLocation == "Forest Entrance Barricade" || infoLocation == "Crimsonia's Border Trail" ||
		infoLocation == "Cave Dwellings" || infoLocation == "Forest SouthWest Corner" || infoLocation == "Forest PineWall" ||
		infoLocation == "Forest SouthEast Corner" || infoLocation == "Forest NorthEast Corner" || infoLocation == "Forest NorthWest Corner" ||
		infoLocation == "Forswear Cottage" || infoLocation == "Witch's Cottage" || infoLocation == "Mountain Pass" || infoLocation == "Crimson Cave" ||
		infoLocation == "Dragon's Lair" || infoLocation == "Sally's House" || infoLocation == "East Seaside Woods Entrance" ||
		infoLocation == "Trance Reef" || infoLocation == "Northern Seaside Woods Entrance" || infoLocation == "Triground North Vista") {
			$('#soundTrack').animate({volume: 0.0}, 250);
			changeSoundTrack = true;
		}

	fader.style.visibility = "visible";
	fader.style.opacity = "1.0";
	$('#fader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
	function(e) {
		if (fader.style.opacity == 1) {
			if (room === "annehouse") {
				if(AnneIsHappy) document.getElementById("canvas").removeChild(document.getElementById("annehappy"));
			}
			else if (room === "brucehouse") {
				if (isSleeping) document.getElementById("canvas").removeChild(document.getElementById("bruceasleep"));
			}
			else if (room === "dukehouse-foyer") {
				if (isGrounded && !DukeIsHappy) document.getElementById("canvas").removeChild(document.getElementById("dukesad"));
			}
			else if (room === "francishouse") {
				if (FrancisIsHappy) document.getElementById("canvas").removeChild(document.getElementById("francishappy"));
			}
			else if (room === "gravekeeperhouse") {
				if (hasGhosts) document.getElementById("canvas").removeChild(document.getElementById("gravekeeperscared"));
			}
			else if (room === "howardhouse") {
				if (isHealthy) document.getElementById("canvas").removeChild(document.getElementById("howardhappy"));
			}
			else if (room === "magicianhouse") {
				if (isDrunk) document.getElementById("canvas").removeChild(document.getElementById("magiciandrunk"));
			}
			else if (room === "playerhouse") {
				if (!hasSavings) document.getElementById("canvas").removeChild(document.getElementById("moneybag"));
			}
			else if (room === "sallyhouse") {
				if (document.getElementById("sallysad")) document.getElementById("canvas").removeChild(document.getElementById("sallysad"));
				if (hasFox) document.getElementById("canvas").removeChild(document.getElementById("foxie"));
			}
			else if (room === "tradehouse") {
				if (canTradeSilkCloth) document.getElementById("canvas").removeChild(document.getElementById("silkcloth"));
				if (canTradeMerlinSpell) document.getElementById("canvas").removeChild(document.getElementById("merlinspell"));
			}
			else if (room === "witchhouse") {
				if (document.getElementById("witchmad")) document.getElementById("canvas").removeChild(document.getElementById("witchmad"));
			}

			room = "";
			character.style.visibility = "hidden";
			prepareBackground(room, 0, 0);

			fader.style.opacity = 0.0;
			$('#fader').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
			function(e) {
				fader.style.visibility = "hidden";
			});
		}

		if (currentCharacter == characters[chars.SARELLE] && !gameFinished) {
			showElements();
			hideActionButtons();
			character.style.visibility = "hidden";
			document.getElementById("canvas").removeChild(document.getElementById("princessface"));
		}
	});
}

function showActionButtons() {
	actionButtons[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - 125) + "px; left: " + (canvasLeft + 100) + "px; cursor: pointer; visibility: visible;");
	actionButtons[0].src = buttonimages[9].src;
	actionButtons[0].onmouseover = function() {
		this.src = buttonRoot + "mouseover/talk.png";
		infobar.innerHTML = "Talk";
	};
	actionButtons[0].onmouseout = function() {
		this.src = buttonimages[9].src;
		infobar.innerHTML = infoLocation;
	};
	actionButtons[0].onclick = function() {
		if(!onMobile) playSoundEffect("push");
		if (currentCharacter == characters[chars.SPIRITFOX] && !FoxIsTame) {
			hideElements();
			isLeaving = true;
		}
		else {
			messagebar.style.visibility = "visible";
			prepareText(currentCharacter);
		}
	};

	actionButtons[1].setAttribute("style", "position: absolute; top: " + (canvasHeight - 125) + "px; left: " + (canvasLeft + 275) + "px; cursor: pointer; visibility: visible;");
	actionButtons[1].src = buttonimages[0].src;
	actionButtons[1].onmouseover = function() {
		this.src = buttonRoot + "mouseover/ask.png";
		infobar.innerHTML = "Ask";
	};
	actionButtons[1].onmouseout = function() {
		this.src = buttonimages[0].src;
		infobar.innerHTML = infoLocation;
	};
	actionButtons[1].onclick = function() {
		if(!onMobile) playSoundEffect("push");
		if (currentCharacter == characters[chars.SPIRITFOX] && !FoxIsTame) {
			hideElements();
			isLeaving = true;
		}
		else {
			messagebar.style.visibility = "visible";
			isAsking = true;
			prepareText(currentCharacter);
		}

	};

	actionButtons[2].setAttribute("style", "position: absolute; top: " + (canvasHeight - 125) + "px; left: " + (canvasLeft + 450) + "px; cursor: pointer; visibility: visible;");
	actionButtons[2].src = buttonimages[6].src;
	actionButtons[2].onmouseover = function() {
		this.src = buttonRoot + "mouseover/give.png";
		if (infoLocation == "The Chapel") infobar.innerHTML = "Donate $100";
		else if (infoLocation == "Tailor Shop") infobar.innerHTML = "Buy clothes for $200";
		else if (infoLocation == "Hospital") infobar.innerHTML = "Buy medicine for $300";
		else if (infoLocation == "Ale House") infobar.innerHTML = "Buy wine for $200";
		else if (infoLocation == "Pottery Shop") infobar.innerHTML = "Buy rice pot for $200";
		else infobar.innerHTML = "Give/Use";
	};
	actionButtons[2].onmouseout = function() {
		this.src = buttonimages[6].src;
		infobar.innerHTML = infoLocation;
	};
	actionButtons[2].onclick = function() {
		if(!onMobile) playSoundEffect("push");
		if (infoLocation == "The Chapel") {
			showText = true;
			messagebar.style.visibility = "visible";
			hideElements();
			charName = "Priest";

			if (money >= 100) {
				money -= 100;
				dialogueText = "God bless you my son, thank you for the donation...";
				hasDonated = true;
			}
			else dialogueText = "Thank you son... but save that money. You may need it.";
		}
		else if (infoLocation == "Tailor Shop") {
			showText = true;
			messagebar.style.visibility = "visible";
			hideElements();
			charName = "Tailor";

			if (DressforHarp) {
				if (hasBoughtClothes) dialogueText = "Sorry, I have no clothes ready right now. Come back later!";
				else {
					if (money >= 200) {
						money -= 200;
						dialogueText = "One maiden's dress. Thank you for the purchase";
						mustGiveClothes = true;
					}
					else dialogueText = "I'm sorry, but that's not enough to buy clothes";
				}
			}
			else dialogueText = "Sorry, I have no clothes ready right now. Come back later!";
		}
		else if (infoLocation == "Hospital") {
			showText = true;
			messagebar.style.visibility = "visible";
			hideElements();
			charName = "Nurse";

			if (hasBoughtMeds) {
				dialogueText = "Sorry! We're out of medicine! You'll have to come back later if you want more!";
			}
			else {
				if (money >= 300) {
					money -= 300;
					dialogueText = "Here're your meds!";
					mustGiveMeds = true;
				}
				else dialogueText = "Sorry, we're almost out, so I can't sell medicine that cheap. Try to find more money, will ya?";
			}
		}
		else if (infoLocation == "Ale House") {
			showText = true;
			messagebar.style.visibility = "visible";
			hideElements();
			charName = "Bartender";

			if (canSellWine) {
				if (hasBoughtWine) dialogue = "Sorry, I'm out of wine. Are you sure you don't want beer instead?";
				else {
					if (money >= 200) {
						money -= 200;
						dialogueText = "You should've mentioned the Magician wanted the wine! Ok, here you go";
						mustGiveWine = true;
					}
					else dialogueText = "You don't have enough money to buy the wine...";
				}
			}
			else dialogueText = "Sorry, I have very little wine, and I'm saving it for the Magician. He's a regular customer, you know?";
		}
		else if (infoLocation == "Pottery Shop") {
			showText = true;
			messagebar.style.visibility = "visible";
			hideElements();
			charName = "Potter";

			if (hasRicePot) dialogueText = "Didn't I just sell you a rice pot?";
			else {
				if (money >= 200) {
					money -= 200;
					dialogueText = "Thank you. Here's your rice pot";
					mustGiveRicePot = true;
				}
				else dialogueText = "You don't have enough money for a rice pot, kid!";
			}
		}
		else prepareInventory();
	};

	actionButtons[3].setAttribute("style", "position: absolute; top: " + (canvasHeight - 125) + "px; left: " + (canvasLeft + 625) + "px; cursor: pointer; visibility: visible;");
	actionButtons[3].src = buttonimages[5].src;
	actionButtons[3].onmouseover = function() {
		this.src = buttonRoot + "mouseover/exit.png";
		infobar.innerHTML = "Exit";
	};
	actionButtons[3].onmouseout = function() {
		this.src = buttonimages[5].src;
		infobar.innerHTML = infoLocation;
	};
}

function prepareActiontoLeaveRoom(room) {
	actionButtons[3].onclick = function() {
		if(!onMobile) playSoundEffect("push");
		isNotAlone = false;
		for (var i = 0; i < actionButtons.length; i++) {
			actionButtons[i].style.visibility = "hidden";
		}

		arrows[0].setAttribute("style", "position: absolute; top: " + (canvasHeight - (arrowHeight * 1.5) - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (arrowWidth / 2)) + "px; cursor: pointer; visibility: visible;");
		arrows[0].src = arrowimages[8].src;
		arrows[0].onmouseover = function() {
			this.src = arrowhoverimages[8].src;
			infobar.innerHTML = "Leave " + infoLocation;
		};
		arrows[0].onmouseout = function() {
			this.src = arrowimages[8].src;
			infobar.innerHTML = infoLocation;
		};
		arrows[0].onclick = function() {
			isNotAlone = false;
			leavingHouse = true;
			if(!onMobile) playSoundEffect("move");
			fadeOutofRoom(room);
		};
	};
}

//Very important method that will show the dialogue from every character
function prepareText(c) {
	showText = true;
	hideElements();

	if (!isAsking) {
		if (c == characters[chars.ANNE]) {
			charName = characters[chars.ANNE].charAt(0).toUpperCase() + characters[chars.ANNE].substring(1, characters[chars.ANNE].length);

			if (endGame) dialogueText = "Thank you so much for helping Francis and I! I hear that you saved the princess... why don't you go see her? She might wish to thank you";
			else {
				if (!AnneIsHappy) {
					dialogueText = "Sigh...";
					hasMetAnne = true;
				}
				else dialogueText = "I am so happy!!!";
			}
		}
		else if (c == characters[chars.BANDIT]) {
			charName = characters[chars.BANDIT].charAt(0).toUpperCase() + characters[chars.BANDIT].substring(1, characters[chars.BANDIT].length);

			if (endGame) dialogueText = "Hey, anytime you wanna join the gang, you're welcome. You should see that chick of yours, maybe she's got some form of reward for ya";
			else {
				if (hasMetBandit) dialogueText = "You wanna join the gang? Bring the skull of a beast, like the one at the back!";
				else {
					dialogueText = "You got a death wish, wimp?";
					hasMetBandit = true;
				}
			}
		}
		else if (c == characters[chars.DRAGON]) {
			charName = characters[chars.DRAGON].charAt(0).toUpperCase() + characters[chars.DRAGON].substring(1, characters[chars.DRAGON].length);

			if (endGame) {
				var finalText = "";
				if (randomPrincessKidnapper == 0) finalText = "You already saved the princess";
				else finalText = "News of you saving the princess have reached this place";
				dialogueText = "What do you want human? " + finalText + ". You should leave and go to her, instead";
			}
			else {
				if (!hasMetDragon) dialogueText = "Who dares enter my lair? Begone, mortal!";
				else {
					if (randomPrincessKidnapper == 0) {
						if (canAskDragon) dialogueText = "You waste my time. Begone!";
						else {
							if (canTalkToDragon) {
								dialogueText = "This wench you're looking for came to me out of her own will. And now, she will be my dinner!";
								canAskDragon = true;
							}
							else {
								dialogueText = "The armour protects you... Very well. What brings you here?";
								canTalkToDragon = true;
							}
						}
					}
					else {
						if (canTalkToDragon) dialogueText = "You waste my time. Begone!";
						else {
							dialogueText = "The armour protects you... Very well. What brings you here?";
							canTalkToDragon = true;
						}
					}
				}
			}
		}
		else if (c == characters[chars.DUCHESS]) {
			charName = characters[chars.DUCHESS].charAt(0).toUpperCase() + characters[chars.DUCHESS].substring(1, characters[chars.DUCHESS].length);

			if (endGame) dialogueText = "Well, look who saved our princess! What are you standing there for? You should go see here at the castle!";
			else {
				if (DuchessIsHappy) {
					if (isGrounded) dialogueText = "Thank you. That good for nothing pie eater is now downstairs with a plate of celery at the table!";
					else dialogueText = "Thanks again. Now if only my husband could come and help me around the house...";
				}
				else {
					if (hasMetDuchess) dialogueText = "I'm the only one who works around here, while my stupid husband is out doing nothing! Why, if I catch him eating pastries again, he knows the Doctor forbade him to!!";
					else {
						dialogueText = "What do you want? I'm busy right now";
						hasMetDuchess = true;
					}
				}
			}
		}
		else if (c == characters[chars.DUKE]) {
			charName = characters[chars.DUKE].charAt(0).toUpperCase() + characters[chars.DUKE].substring(1, characters[chars.DUKE].length);

			if (endGame) dialogueText = "Hey! So you saved the princess huh? If I were her, I'd give you a reward! So maybe you should go see her";
			else {
				if (infoLocation != "Duke's Manor - Foyer") dialogueText = "Mmm, mhmm! That was an awesome pie!! Thanks, boy!";
				else {
					if (DukeIsHappy) dialogueText = "Thank you again!";
					else {
						if (hasMetDukeAtHome) dialogueText = "Oh man, am I hungry!!";
						else {
							dialogueText = "No, I don't resent you for what you did. After all, you were looking for the princess and I was in the way...";
							hasMetDukeAtHome = true;
						}
					}
				}
			}
		}
		else if (c == characters[chars.FARMER]) {
			charName = characters[chars.FARMER].charAt(0).toUpperCase() + characters[chars.FARMER].substring(1, characters[chars.FARMER].length);

			if (endGame) dialogueText = "I hear you saved the princess... Congrats! Maybe you should go and see her?";
			else {
				if (askForStrawberries) {
					dialogueText = "The strawberries are finally growing! I just planted some at the orchard";
					canPickStrawberries = true;
				}
				else dialogueText = "Hi, boy! I'm cultivating food for our people. If you need anything from here, let me know";
			}
		}
		else if (c == characters[chars.FISHERMAN]) {
			charName = characters[chars.FISHERMAN].charAt(0).toUpperCase() + characters[chars.FISHERMAN].substring(1, characters[chars.FISHERMAN].length);

			if (endGame) dialogueText = "You! You saved the princess, right? Congrats!... So, was she too impressed? Maybe you should go see her and see what happens!";
			else {
				if (hasFin) dialogueText = "If I see the princess around here I'll make sure to let you know!";
				else dialogueText = "Yo! I make a living out of fishing the sea creatures!";
			}
		}
		else if (c == characters[chars.FRANCIS]) {
			charName = characters[chars.FRANCIS].charAt(0).toUpperCase() + characters[chars.FRANCIS].substring(1, characters[chars.FRANCIS].length);

			if (endGame) dialogueText = "Thanks again for helping us, man! And congrats on saving the princess! Why don't you go see her? Maybe she'll want to talk to you...";
			else {
				if (!FrancisIsHappy) {
					dialogueText = "Sigh...";
					hasMetFrancis = true;
				}
				else dialogueText = "Thanks for all your help, man";
			}
		}
		else if (c == characters[chars.GRAVEKEEPER]) {
			charName = characters[chars.GRAVEKEEPER].charAt(0).toUpperCase() + characters[chars.GRAVEKEEPER].substring(1, 5) + " " + characters[chars.GRAVEKEEPER].charAt(5).toUpperCase() + characters[chars.GRAVEKEEPER].substring(6, characters[chars.GRAVEKEEPER].length);

			if (endGame) dialogueText = "So, you saved the princess... Big deal... She'll probably want to give you a medal, and yet you're wasting your time here...";
			else {
				if (hasExorcised) dialogueText = "It sucks being poor...";
				else {
					if (hasGhosts) dialogueText = "Help mee!!! There's a g-g-ghost outside on the grave ground! He's-He's come after me! Please, do something!!";
					else {
						if (findMaidensTear || findDragonJewels) dialogueText = "Soon, the peddler will come by and buy this jewel I found in one of the tombs... I'll be richer than the Duke!! ... What? I said nothing!";
						else {
							if (hasShovel) dialogueText = "Let's see now... which tombs look the most ancient...";
							else {
								if (hasMetGravekeeper) dialogueText = "If only I had a shovel...";
								else {
									dialogueText = "I'm the grave keeper. I'm confined here to live at the edge of the town to watch over our dead. Rumour has it people from way back to the time of the Romans are buried here. Now if only I had a shovel...";
									hasMetGravekeeper = true;
								}
							}
						}
					}
				}
			}
		}
		else if (c == characters[chars.HOWARD]) {
			charName = characters[chars.HOWARD].charAt(0).toUpperCase() + characters[chars.HOWARD].substring(1, characters[chars.HOWARD].length);

			if (endGame) dialogueText = "You saved the princess! Who would've thought it would be you and not any of the royal guards. Why don't you go see her?";
			else {
				if (isHealthy) dialogueText = "Thanks to you I can finally be healthy again!";
				else {
					if (hasMetHoward) dialogueText = "Cough, cough... at choo!";
					else {
						dialogueText = "H-Hello... cough, cough";
						hasMetHoward = true;
					}
				}
			}
		}
		else if (c == characters[chars.JESTER]) {
			charName = characters[chars.JESTER].charAt(0).toUpperCase() + characters[chars.JESTER].substring(1, characters[chars.JESTER].length);

			if (endGame) dialogueText = "You did it. You saved our princess! Go see her, she should be upstairs...";
			else {
				if (isNotJoking) dialogueText = "I'll let you know if I find anything about the princess";
				else {
					if (wasDuped) dialogueText = "What? Of course I'm telling the truth! If you didn't find her there she must have gone to the Alehouse. She loves that stuff!";
					else {
						dialogueText = "Ah ha! You're looking for the princess! Yeah, I saw her... She went to someone's house... It had a... green roof! Yeah!";
						wasDuped = true;
					}
				}
			}
		}
		else if (c == characters[chars.JOURNEYMAN]) {
			charName = characters[chars.JOURNEYMAN].charAt(0).toUpperCase() + characters[chars.JOURNEYMAN].substring(1, characters[chars.JOURNEYMAN].length);

			if (endGame) dialogueText = "I hear you saved " + kingdomName + "'s princess. Congrats! In my country, such merit is awarded with a condecoration. You should go to her";
			else {
				if (JourneymanIsHappy) dialogueText = "Thank you again! Now I can start working in " + kingdomName + "!!";
				else dialogueText = "You wouldn't happen to know where " + kingdomName + "'s master craftsman is, do you?";
			}
		}
		else if (c == characters[chars.LUCILLE]) {
			charName = characters[chars.LUCILLE].charAt(0).toUpperCase() + characters[chars.LUCILLE].substring(1, characters[chars.LUCILLE].length);

			if (hasMetLucille) {
				if (endGame) dialogueText = "Thank you so much! You actually found the princess!!";
				else {
					if (hasRoyalSeal) dialogueText = "You have been given permission to leave the town? That is wonderful! I wish you the best in searching for my cousin...";
					else dialogueText = "I'm sorry you cannot leave the town, but the guards are on high alert...";
				}
			}
			else {
				dialogueText = "Hello. Are you looking for my cousin? I am her lady in waiting";
				hasMetLucille = true;
			}
		}
		else if (c == characters[chars.MAGICIAN]) {
			charName = characters[chars.MAGICIAN].charAt(0).toUpperCase() + characters[chars.MAGICIAN].substring(1, characters[chars.MAGICIAN].length);

			if (endGame) dialogueText = "Ah... what? Youuu savet who? Ah, the pwincesssh... Go, claim yer reward...";
			else {
				if (isDrunk) dialogueText = "No, thazz mi waand!... You stay out of this, parrot!";
				else {
					if (hasMetMagician) dialogueText = "If you wanna learn some spells someday I could teach you some cool stuff!";
					else {
						dialogueText = "I am the court's magician. I am in charge of incantations, spells, and enchantments for our King.";
						hasMetMagician = true;
					}
				}
			}
		}
		else if (c == characters[chars.MINSTREL]) {
			charName = characters[chars.MINSTREL].charAt(0).toUpperCase() + characters[chars.MINSTREL].substring(1, characters[chars.MINSTREL].length);

			if (endGame) dialogueText = "You must feel so proud of yourself for saving the princess, don't you? I would! Have you gone seen here yet? Maybe she's waiting for you...";
			else {
				if (MinstrelisHappy) dialogueText = "Boy, I'm so excited to wear that new dress!";
				else {
					if (hasMetMinstrel) dialogueText = "I wonder if this note goes well for this new song I'm composing...";
					else {
						dialogueText = "I am the court's minstrel! I get to play music for the King and noblemen all day... Imagine! Do what you love and get paid for it. Isn't that great?!";
						hasMetMinstrel = true;
					}
				}
			}
		}
		else if (c == characters[chars.NURSE]) {
			charName = characters[chars.NURSE].charAt(0).toUpperCase() + characters[chars.NURSE].substring(1, characters[chars.NURSE].length);

			if (endGame) dialogueText = "Look at you! Saving the princess is such a feat... where have you been all my life? Just kidding. Maybe you should go see the girl... she might be... very grateful!";
			else {
				if (hasMetNurse) dialogueText = "What ails you today?";
				else {
					dialogueText = "Hi! I'm the nurse of this place. You want meds or anything, you ask me!";
					hasMetNurse = true;
				}
			}
		}
		else if (c == characters[chars.PEDDLER]) {
			charName = characters[chars.PEDDLER].charAt(0).toUpperCase() + characters[chars.PEDDLER].substring(1, characters[chars.PEDDLER].length);

			if (endGame) dialogueText = "You saved the princess? Great! Awesome work! Maybe you can convince her to buy my collection? She should be in the castle";
			else {
				if (PeddlerIsHappy) dialogueText = "Thank you again for finding my treasure!";
				else {
					if (hasMetPeddler) dialogueText = "I just know someday these rare items are going to be worth a fortune!";
					else {
						dialogueText = "Hi! I wander around the world collecting rare items...";
						hasMetPeddler = true;
					}
				}
			}
		}
		else if (c == characters[chars.PRIEST]) {
			charName = characters[chars.PRIEST].charAt(0).toUpperCase() + characters[chars.PRIEST].substring(1, characters[chars.PRIEST].length);

			if (endGame) dialogueText = "Congratulations, son. You saved our princess! Go see her, maybe she's waiting for you at the castle";
			else {
				if (PriestIsDone) dialogueText = "God will reward you for your hard work, son";
				else {
					if (hasDonated) {
						mustGiveLetter = true;
						dialogueText = "Son, someone left a letter here. It is addressed to the Castle Jester. Could you please deliver it to him?";
					}
					else dialogueText = "May God be with you today, my son...";
				}
			}
		}
		else if (c == characters[chars.ROYALBANNERETT]) {
			charName = characters[chars.ROYALBANNERETT].charAt(0).toUpperCase() + characters[chars.ROYALBANNERETT].substring(1, 5) + " " + characters[chars.ROYALBANNERETT].charAt(5).toUpperCase() + characters[chars.ROYALBANNERETT].substring(6, characters[chars.ROYALBANNERETT].length);

			if (endGame) dialogueText = "Congratulations, my boy... You saved our princess from an uncertain future. If you're looking for her, she should be in her chambers... I hope.";
			else {
				if (hasMetRoyalBannerett) dialogueText = "Remember, if you need information about anyone, just ask me...";
				else {
					dialogueText = "Thank you for trying to find the princess. Make sure to speak to anyone you find, they may know where she is";
					hasMetRoyalBannerett = true;
				}
			}
		}
		else if (c == characters[chars.ROYALCOOK]) {
			charName = characters[chars.ROYALCOOK].charAt(0).toUpperCase() + characters[chars.ROYALCOOK].substring(1, 5) + " " + characters[chars.ROYALCOOK].charAt(5).toUpperCase() + characters[chars.ROYALCOOK].substring(6, characters[chars.ROYALCOOK].length);

			if (endGame) dialogueText = "Congratulations, boy! You should go see the princess, maybe she's upstairs";
			else {
				if (hasMetRoyalCook) dialogueText = "I really take pride in my work as a cook!";
				else {
					dialogueText = "I am the court's royal cook. If you wish for me to cook anything, let me know";
					hasMetRoyalCook = true;
				}
			}
		}
		else if (c == characters[chars.ROYALSENTRY]) {
			charName = characters[chars.ROYALSENTRY].charAt(0).toUpperCase() + characters[chars.ROYALSENTRY].substring(1, 5) + " " + characters[chars.ROYALSENTRY].charAt(5).toUpperCase() + characters[chars.ROYALSENTRY].substring(6, characters[chars.ROYALSENTRY].length);

			if (endGame) dialogueText = "Congratulations, you actually found and saved our majesty. What are you waiting for? Go see if she's upstairs";
			else {
				if (hasRoyalSeal) dialogueText = "Have you had any luck finding the princess? We have not found her yet...";
				else {
					if (favors == 10) {
						hasRoyalSeal = true;
						availableCategories = 3;

						var royalsentryok = document.createElement("img");
						royalsentryok.id = "royalsentryok";
						royalsentryok.src = faceimages[11].src;
						royalsentryok.setAttribute("style", "position: absolute; top: " + (75 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[11].width / 2) - 18) + "px; visibility: visible;");
						document.getElementById("canvas").appendChild(royalsentryok);

						dialogueText = "I guess I was mistaken about you, sorry. Allow me to bestow upon you " + kingdomName + "'s royal seal. You will be able to exit the town with it! Now go, youngster. Find the princess's lady in waiting, maybe she has more information about her...";
						mustGiveRoyalSeal = true;
					}
					else {
						if (hasMetRoyalSentry) dialogueText = "Permission to leave town? Not even 10 people can vouch for you! And no, the Priest doesn't count, he likes everyone!!";
						else {
							dialogueText = "Who are you? Do you even have permission to enter the Redin Palace?";
							hasMetRoyalSentry = true;
						}
					}
				}
			}
		}
		else if (c == characters[chars.SALLY]) {
			charName = characters[chars.SALLY].charAt(0).toUpperCase() + characters[chars.SALLY].substring(1, characters[chars.SALLY].length);

			if (endGame) dialogueText = "Congratulations on saving the princess, Sir! Maybe you will really be a Sir now... Why don't you go see the princess at the castle?";
			else {
				if (hasFox) dialogueText = "Thank you so much for bringing me Foxie! He really likes it when I brush him, but he sheds a lot";
				else {
					if (hasRoyalSeal) {
						if (hasGivenBone) dialogueText = "... I'll be fine... Please don't worry about me...";
						else {
							dialogueText = "I'm sorry to put you through the trouble of getting me flour, Sir... I spoke to my father, and he told me what happened with my puppy... I... Please, keep this milk bone. If you find a hungry animal, at least he will be happy with it...";
							mustGiveBone = true;
						}
					}
					else {
						if (!hasMetSally) {
							dialogueText = "Have you perchance seen my puppy?";
							hasMetSally = true;
						}
						else dialogueText = "I wonder where my puppy is...";
					}
				}
			}
		}
		else if (c == characters[chars.SENTRY]) {
			charName = characters[chars.SENTRY].charAt(0).toUpperCase() + characters[chars.SENTRY].substring(1, characters[chars.SENTRY].length);

			dialogueText = "You do not have the royal seal. You may not leave these gates!";
		}
		else if (c == characters[chars.SERF]) {
			charName = characters[chars.SERF].charAt(0).toUpperCase() + characters[chars.SERF].substring(1, characters[chars.SERF].length);

			if (endGame) dialogueText = "Meh, I could've saved the princess, but I was busy rest-I mean, working. Go see her";
			else {
				if (SerfIsHappy) dialogueText = "It sure is nice to have a new blanket, you know?";
				else {
					if (hasMetSerf) dialogueText = "All work and no play makes a serf sad, right? So yeah, I'm entitled to this break...";
					else {
						dialogueText = "Hey there. I've been given this land to work it for the King";
						hasMetSerf = true;
					}
				}
			}
		}
		else if (c == characters[chars.SHEPHERD]) {
			charName = characters[chars.SHEPHERD].charAt(0).toUpperCase() + characters[chars.SHEPHERD].substring(1, characters[chars.SHEPHERD].length);

			if (endGame) dialogueText = "Congrats, boy! Go to the castle, maybe the princess will reward you for saving her";
			else {
				if (hasMetShepherd) {
					dialogueText = "Be careful if you enter the forest. I saw a ghost with the form of a ferocious beast... It looked hungry but, for some reason, it wasn't interested in attacking my sheep... or maybe he didn't because I didn't have any with me at the time...";
					canEnterForest = true;
				}
				else {
					dialogueText = "Hi. I've lost my sheep. Have you seen them? Oh wait, I left them all at the farm!";
					hasMetShepherd = true;
				}
			}
		}
		else if (c == characters[chars.SIREN]) {
			charName = characters[chars.SIREN].charAt(0).toUpperCase() + characters[chars.SIREN].substring(1, characters[chars.SIREN].length);

			if (endGame) dialogueText = "Congratulations!! You actually saved her! Maybe you should find her again, see if she wishes to reward you";
			else {
				if (SirenIsHappy) dialogueText = "Thank you for all your help!";
				else {
					if (hasMetSiren) dialogueText = "Oh, where is that fish?";
					else {
						dialogueText = "Oh, I've been spotted... Um, could you not tell other people I'm here? There's this kid fishing and he might mistake me for a tuna...";
						hasMetSiren = true;
					}
				}
			}
		}
		else if (c == characters[chars.SMITH]) {
			charName = characters[chars.SMITH].charAt(0).toUpperCase() + characters[chars.SMITH].substring(1, characters[chars.SMITH].length);

			if (endGame) dialogueText = "Congrats, boy. You saved the princess. What are you doing here? Maybe you should go see her";
			else {
				if (SmithIsHappy) dialogueText = "How's it going with that armor?";
				else {
					if (hasMetSmith) dialogueText = "I like my job. I get to work with heavy stuff!";
					else {
						dialogueText = "Hi. I'm the town blacksmith. I make weapons and armor for " + kingdomName;
						hasMetSmith = true;
					}
				}
			}
		}
		else if (c == characters[chars.SPIRITFOX]) {
			charName = characters[chars.SPIRITFOX].charAt(0).toUpperCase() + characters[chars.SPIRITFOX].substring(1, 6) + " " + characters[chars.SPIRITFOX].charAt(6).toUpperCase() + characters[chars.SPIRITFOX].substring(7, characters[chars.SPIRITFOX].length);

			dialogueText = "Do you have any more of that bone?";
		}
		else if (c == characters[chars.TAILOR]) {
			charName = characters[chars.TAILOR].charAt(0).toUpperCase() + characters[chars.TAILOR].substring(1, characters[chars.TAILOR].length);

			if (endGame) dialogueText = "Congratulations on saving the princess! Well done! If anything, you should see if she needs anything else. She should be at the castle";
			else dialogueText = "That shirt kind of clashes with your eyes... I'm the tailor! I know fashion!";
		}
		else if (c == characters[chars.THATCHER]) {
			charName = characters[chars.THATCHER].charAt(0).toUpperCase() + characters[chars.THATCHER].substring(1, characters[chars.THATCHER].length);

			if (endGame) dialogueText = "So you saved the princess? Remember who helped you first! Why don't you go see her?";
			else dialogueText = "This roof repairing job is torture, kid. But someone's got to do it, right?";
		}
		else if (c == characters[chars.WITCH]) {
			charName = characters[chars.WITCH].charAt(0).toUpperCase() + characters[chars.WITCH].substring(1, characters[chars.WITCH].length);

			if (endGame) dialogueText = "What do you want now, didn't you save the princess already? Get out of here and go see her!";
			else {
				if (hasCleanseSpell) dialogueText = "What else do you want? Did you get the essence of the spirit beast I asked?";
				else {
					if (canAskForCleanseSpell) {
						dialogueText = "I can prepare a cleanse spell for you, but to do that I'll need the essence of a spirit beast...";
						canAskforFur = true;
					}
					else {
						if (needsCleanseSpell) {
							dialogueText = "Yes, I taught your kingdom's magician a few tricks, but that's mere child play. I have other magic which could shake this very earth!";
							canAskForCleanseSpell = true;
						}
						else dialogueText = "Aren't you a healthy young man. What brings you to my humble home?";
					}
				}
			}
		}
		else if (c == "barterer") {
			charName = "Barterer";

			if (endGame) dialogueText = "You really want to exchange now? You saved the princess! You should go see her instead";
			else dialogueText = "Do you have anything to exchange? Just give me an item of yours and I'll give you what I have on the front counter";
		}
		else if (c == "bartender") {
			charName = "Bartender";

			if (endGame) dialogueText = "Congrats! You saved the princess! If I were you, I'd go see her at the castle";
			else dialogueText = "Hi! Help yourself to a drink!";
		}
		else if (c == "merchant") {
			charName = "Merchant";

			if (endGame) dialogueText = "Hey, hey, congrats! You saved the girl. Why don't you look for her at the castle?";
			else {
				if (itemToBuy === "") dialogueText = "Hello! Do you want to buy something?";
				else if (itemToBuy == "cherries") dialogueText = "Those cherries cost $25";
				else if (itemToBuy === "fish") dialogueText = "That fish costs $100";
				else if (itemToBuy === "flourbag") dialogueText = "That flour bag costs $50";
				else if	(itemToBuy === "notenough") dialogueText = "You do not have enough money!";
			}
		}
		else if (c == "potter") {
			charName = "Potter";

			if (endGame) dialogueText = "Congrats, buddy! You saved the princess! Forget about buying a pot, go see her at the castle!";
			else dialogueText = "Need a rice pot, son? I got the best!";
		}
		else if (c == "bruce") {
			charName = "Bruce";

			if (isSleeping) dialogueText = "Zzz...";
			else {
				if (hasMetBruce) dialogueText = "Boy, I wish I could sleep...";
				else {
					dialogueText = "Boy, I wish I could sleep...";
					hasMetBruce = true;
				}
			}
		}
	}
	else {
		if (c == characters[chars.ANNE]) {
			charName = characters[chars.ANNE].charAt(0).toUpperCase() + characters[chars.ANNE].substring(1, characters[chars.ANNE].length);

			if (endGame) dialogueText = "Thank you so much for helping Francis and I! I hear that you saved the princess... why don't you go see her? She might wish to thank you";
			else {
				if (AnneIsHappy) dialogueText = "Have you found the princess yet? Good luck!";
				else {
					if (!hasMetAnne) {
						dialogueText = "Sigh...";
						hasMetAnne = true;
					}
					else dialogueText = "What's wrong? My father hates Francis's family and forbade me to ever be with him! But I love him!";
				}
			}
		}
		else if (c == characters[chars.BANDIT]) {
			charName = characters[chars.BANDIT].charAt(0).toUpperCase() + characters[chars.BANDIT].substring(1, characters[chars.BANDIT].length);

			if (endGame) dialogueText = "Hey, anytime you wanna join the gang, you're welcome. You should see that chick of yours, maybe she's got some form of reward for ya";
			else {
				if (canAskBandit || randomPrincessKidnapper != 2) {
					if (randomPrincessKidnapper == 2) {
						if (findBanditLoot) dialogueText = "Bring me the green brace from the noblemen treasury, the old witch's gem, and the mountain dragon's tusk.";
						else {
							dialogueText = "You want the princess? It's gonna cost ya... Bring me the green brace from the noblemen treasury, the old witch's gem, and the mountain dragon's tusk.";
							availableCategories = 4;
							canVisitDragon = true;
							canVisitWitch = true;
							findBanditLoot = true;
						}
					}
					else {
						if (BanditIsHappy) dialogueText = "Why are you searching for rare items anyways?";
						else {
							if (randomPrincessKidnapper == 0) dialogueText = "You want the Castile Cross? I have it. How about we exchange it for the Green Brace from the noblemen treasury?";
							else if (randomPrincessKidnapper == 1) dialogueText = "You want Circe's Vial? I have it. How about we exchange it for the Green Brace from the noblemen treasury?";

							findEmeraldBrace = true;
						}
					}
				}
				else {
					if (hasMetBandit) {
						dialogueText = "I found this girl hanging around my gang's hideout... As it turns out, it's " + kingdomName + "'s Princess! The King will pay me a good ransom for her!";
						canAskBandit = true;
					}
					else {
						dialogueText = "You got a death wish, wimp?";
						hasMetBandit = true;
					}
				}
			}
		}
		else if (c == characters[chars.DRAGON]) {
			charName = characters[chars.DRAGON].charAt(0).toUpperCase() + characters[chars.DRAGON].substring(1, characters[chars.DRAGON].length);

			if (endGame) {
				var finalText = "";
				if (randomPrincessKidnapper == 0) finalText = "You already saved the princess";
				else finalText = "News of you saving the princess have reached this place";
				dialogueText = "What do you want human? " + finalText + ". You should leave and go to her, instead";
			}
			else {
				if (!hasMetDragon) dialogueText = "Who dares enter my lair? Begone, mortal!";
				else {
					if (canTalkToDragon) {
						if (randomPrincessKidnapper == 0) {
							if (canAskDragon) {
								if (findDragonJewels) dialogueText = "I will give her to you if you bring me three jewels: One was formed of the sorrow of a legendary maiden upon the fall of your Rome. One other represents the might of sorcery. The last one resides in the kingdom of Castile, heavily guarded.";
								else {
									dialogueText = "An exchange? You are most strange... I will give her to you if you bring me three jewels: One was formed of the sorrow of a legendary maiden upon the fall of your Rome. One other represents the might of sorcery. The last one resides in the kingdom of Castile, heavily guarded.";
									availableCategories = 4;
									findDragonJewels = true;
									canVisitWitch = true;
									banditOnCave = true;
								}
							}
							else {
								dialogueText = "Princess? This wench came to me out of her own accord, and now I will devour her!";
								canAskDragon = true;
							}
						}
						else {
							if (DragonIsHappy) dialogueText = "I already gave you a tusk, I will not give you another!";
							else {
								dialogueText = "A tusk? I will not give it to you... Unless you bring me a jewel. It was formed of the sorrow of a legendary maiden upon the fall of your Rome...";
								findMaidensTear = true;
							}
						}
					}
					else {
						dialogueText = "Your armor can protect you. Alright, what brings you here?";
						canTalkToDragon = true;
					}
				}
			}
		}
		else if (c == characters[chars.DUCHESS]) {
			charName = characters[chars.DUCHESS].charAt(0).toUpperCase() + characters[chars.DUCHESS].substring(1, characters[chars.DUCHESS].length);

			if (endGame) dialogueText = "Well, look who saved our princess! What are you standing there for? You should go see here at the castle!";
			else {
				if (DuchessIsHappy) {
					if (DukeAtePie) {
						dialogueText = "What?! My husband ate cherry pie! Ooh, he's gonna hear me now! Don't worry, kid. I'll make sure to drag him home and lock him up!";
						isGrounded = true;
						DukeAtePie = false;
					}
					else dialogueText = "You haven't found her yet? Look harder, maybe she dropped something and that could be a clue...";
				}
				else {
					if (hasMetDuchess) {
						if (hasGivenMoneyforRicePot) dialogueText = "Where is that rice pot I asked you to bring me??";
						else {
							dialogueText = "I'll listen to you after I finish my house work... Wait. Maybe you could help me. Take this money and go buy me a pot for rice";
							mustGiveMoneyforRicePot = true;
						}
					}
					else {
						dialogueText = "The princess is missing? Big whoop. The child's probably running around somewhere having fun!";
						hasMetDuchess = true;
					}
				}
			}
		}
		else if (c == characters[chars.DUKE]) {
			charName = characters[chars.DUKE].charAt(0).toUpperCase() + characters[chars.DUKE].substring(1, characters[chars.DUKE].length);

			if (endGame) dialogueText = "Hey! So you saved the princess huh? If I were her, I'd give you a reward! So maybe you should go see her";
			else {
				if (infoLocation != "Duke's Manor - Foyer") dialogueText = "Do you have any more pie??";
				else {
					if (DukeIsHappy) dialogueText = "Ah, thank you for all your help!";
					else {
						if (hasMetDukeAtHome) {
							if (mustGetCake) dialogueText = "Whatever happened to that strawberry cake I asked you, boy?";
							else {
								if (findBanditLoot || findEmeraldBrace) {
									dialogueText = "There you are! I'm... not allowed out. But I'm soo hungry! Please, I beseech you, can you go get me a strawberry cake? I promise to pay you handsomely!";
									mustGetCake = true;
								}
								else dialogueText = "Why must my wife be so mean to me, why???";
							}
						}
						else {
							dialogueText = "No, I don't resent you. Sorry, but I haven't seen the princess...";
							hasMetDukeAtHome = true;
						}
					}
				}
			}
		}
		else if (c == characters[chars.GRAVEKEEPER]) {
			charName = characters[chars.GRAVEKEEPER].charAt(0).toUpperCase() + characters[chars.GRAVEKEEPER].substring(1, 5) + " " + characters[chars.GRAVEKEEPER].charAt(5).toUpperCase() + characters[chars.GRAVEKEEPER].substring(6, characters[chars.GRAVEKEEPER].length);

			if (endGame) dialogueText = "So, you saved the princess... Big deal... She'll probably want to give you a medal, and yet you're wasting your time here...";
			else {
				if (hasExorcised) dialogueText = "... No. I haven't seen any ghosts... so much for being rich, huh?";
				else {
					if (hasGhosts) dialogueText = "Anything! I'll give you anything if you can get rid of this ghost!!";
					else {
						if (findMaidensTear || findDragonJewels) {
							dialogueText = "The dragon needs an ancient gem? I don't care! Not even ghosts will take away my... err, shovel...";
							needsGhosts = true;
						}
						else {
							if (hasShovel) dialogueText = "I'm kinda busy right now, so don't bother me!";
							else {
								if (hasMetGravekeeper) dialogueText = "For the last time, I haven't seen that brat...";
								else {
									dialogueText = "The princess? No, I haven't seen her. I never left this place...";
									hasMetGravekeeper = true;
								}
							}
						}
					}
				}
			}
		}
		else if (c == characters[chars.FARMER]) {
			charName = characters[chars.FARMER].charAt(0).toUpperCase() + characters[chars.FARMER].substring(1, characters[chars.FARMER].length);

			if (endGame) dialogueText = "I hear you saved the princess... Congrats! Maybe you should go and see her?";
			else {
				if (askForStrawberries) {
					dialogueText = "Sorry, I've been busy planting new strawberries at the orchard, I haven't seen the princess";
					canPickStrawberries = true;
				}
				else dialogueText = "No I haven't seen her, sorry. I'm busy trying to make some strawberries grow, which is why I have none planted out at the orchard...";
			}
		}
		else if (c == characters[chars.FISHERMAN]) {
			charName = characters[chars.FISHERMAN].charAt(0).toUpperCase() + characters[chars.FISHERMAN].substring(1, characters[chars.FISHERMAN].length);

			if (endGame) dialogueText = "You! You saved the princess, right? Congrats!... So, was she too impressed? Maybe you should go see her and see what happens!";
			else {
				if (hasFin) dialogueText = "Any news on the princess? Did she drop anything anywhere?";
				else dialogueText = "I think I did see the princess, but I've been too distracted... I've been thinking all day about this siren I saw... she had such pretty scales...";
			}
		}
		else if (c == characters[chars.FRANCIS]) {
			charName = characters[chars.FRANCIS].charAt(0).toUpperCase() + characters[chars.FRANCIS].substring(1, characters[chars.FRANCIS].length);

			if (endGame) dialogueText = "Thanks again for helping us, man! And congrats on saving the princess! Why don't you go see her? Maybe she'll want to talk to you...";
			else {
				if (!hasMetFrancis) {
					dialogueText = "Sigh...";
					hasMetFrancis = true;
				}
				else {
					if (FrancisIsHappy) dialogueText = "I haven't seen the princess... Maybe she's not in town?";
					else {
						if (!hasAskedFrancis) {
							dialogueText = "What's wrong? I love Anne, but her father hates my family. I can't be with her! I need to tell her how I feel and reassure her I won't give up on our love... Could you please give her this letter I wrote?";
							hasAskedFrancis = true;
						}
						else dialogueText = "Have you given my letter to Anne yet?";
					}
				}
			}
		}
		else if (c == characters[chars.HOWARD]) {
			charName = characters[chars.HOWARD].charAt(0).toUpperCase() + characters[chars.HOWARD].substring(1, characters[chars.HOWARD].length);

			if (endGame) dialogueText = "You saved the princess! Who would've thought it would be you and not any of the royal guards. Why don't you go see her?";
			else {
				if (isHealthy) dialogueText = "I haven't seen the princess, but if I see her I'll tell you!";
				else {
					if (hasMetHoward) {
						if (hasGivenMoneyforMeds) dialogueText = "At choo! Did you get my medicine yet?";
						else {
							dialogueText = "I've been sick for the past couple of days! Could you take this money and go buy me some medicine please?";
							mustGiveMoneyforMeds = true;
						}
					}
					else {
						dialogueText = "The princess? Sorry... ven't seen her... cough, cough";
						hasMetHoward = true;
					}
				}
			}
		}
		else if (c == characters[chars.JESTER]) {
			charName = characters[chars.JESTER].charAt(0).toUpperCase() + characters[chars.JESTER].substring(1, characters[chars.JESTER].length);

			if (endGame) dialogueText = "You did it. You saved our princess! Go see her, she should be upstairs...";
			else {
				if (isNotJoking) dialogueText = "Have you found anything about the princess? Or maybe anything that belongs to her?";
				else {
					if (wasDuped) dialogueText = "What? Of course I'm telling the truth! If you didn't find her there she must have gone to the Alehouse. She loves that stuff!";
					else {
						dialogueText = "Are you looking for the princess? Yeah, I saw her... She went to someone's house... It had a... green roof! Yeah!";
						wasDuped = true;
					}
				}
			}
		}
		else if (c == characters[chars.JOURNEYMAN]) {
			charName = characters[chars.JOURNEYMAN].charAt(0).toUpperCase() + characters[chars.JOURNEYMAN].substring(1, characters[chars.JOURNEYMAN].length);

			if (endGame) dialogueText = "I hear you saved " + kingdomName + "'s princess. Congrats! In my country, such merit is awarded with a condecoration. You should go to her";
			else {
				if (JourneymanIsHappy) dialogueText = "Sorry, she hasn't come by here. You'll find her soon, you'll see!!";
				else {
					dialogueText = "I'm sorry, I haven't seen your princess, I just arrived. I was hoping on working for " + kingdomName + "'s master craftsman to repair anything, but I need to present him a gift, and I don't know what could be appropriate...";
					canTradeSilkCloth = true;
				}
			}
		}
		else if (c == characters[chars.LUCILLE]) {
			charName = characters[chars.LUCILLE].charAt(0).toUpperCase() + characters[chars.LUCILLE].substring(1, characters[chars.LUCILLE].length);

			if (hasMetLucille) {
				if (endGame) {
					var princessLocation = "";
					if (randomPrincessLastLocation == 1) princessLocation = "She likes to look at the sea from the cliff to the North West. Why, she even placed one of the royal chairs there!";
					else if (randomPrincessLastLocation == 2) princessLocation = "To the far East, she has a towel. That child really likes the waves!";
					else if (randomPrincessLastLocation == 3) princessLocation = "There is a lone tree in the mountain that she loves to visit every now and then...";
					else if (randomPrincessLastLocation == 4) princessLocation = "You won't believe how many times I found her resting by the flower fields!";
					else if (randomPrincessLastLocation == 5) princessLocation = "My cousin finds much solace in looking at the waves at the lower corner of " + kingdomName + ". She gets so excited if a ship passes by!";

					dialogueText = "Where is the princess? You should try looking for her in her favorite place: " + princessLocation;
					canFindSarelle = true;
				}
				else {
					if (hasRoyalSeal) {
						dialogueText = "You can leave town now, right? Well, good luck! Check if just in case she didn't drop anything she usually takes with her, like her handkerchief...";
						canFindHankerchief = true;
					}
					else dialogueText = "Sorry, I don't know where she went. I don't think she even left a note for us to read...";
				}
			}
			else {
				dialogueText = "Hello. Are you looking for my cousin? I am her lady in waiting";
				hasMetLucille = true;
			}
		}
		else if (c == characters[chars.MAGICIAN]) {
			charName = characters[chars.MAGICIAN].charAt(0).toUpperCase() + characters[chars.MAGICIAN].substring(1, characters[chars.MAGICIAN].length);

			if (endGame) dialogueText = "Ah... what? Youuu savet who? Ah, the pwincesssh... Go, claim yer reward...";
			else {
				if (isDrunk) dialogueText = "Why woulda wanna summon an oli-phhhant herre?!";
				else {
					if (hasMetMagician) {
						if (hasGhosts) {
							dialogueText = "Sorry, I never learned the spell to get rid of ghosts... I could tell you who knows it, but my throat is dry...";
							canSellWine = true;
						}
						else {
							if (needsGhosts) {
								dialogueText = "You want a ghost in the graveyard? I don't get it, but sure! Vale anima immunda!";
								hasGhosts = true;
							}
							else dialogueText = "No, I have no clue where she could've gone off to...";
						}
					}
					else {
						dialogueText = "She's missing? Well, maybe she's the one who tore off the invisibility spell page from my grimoire...";
						hasMetMagician = true;
					}
				}
			}
		}
		else if (c == characters[chars.MINSTREL]) {
			charName = characters[chars.MINSTREL].charAt(0).toUpperCase() + characters[chars.MINSTREL].substring(1, characters[chars.MINSTREL].length);

			if (endGame) dialogueText = "You must feel so proud of yourself for saving the princess, don't you? I would! Have you gone seen here yet? Maybe she's waiting for you...";
			else {
				if (MinstrelisHappy) dialogueText = "I hope you find our princess soon!!";
				else {
					if (DressforHarp) dialogueText = "Remember, if you want a harp, you have to buy me a dress";
					else {
						if (canAskForHarp) {
							dialogueText = "You need a harp? Sure, I'll give you one if you buy me a dress!";
							DressforHarp = true;
						}
						else {
							if (hasMetMinstrel) dialogueText = "No, the princess hasn't come around here since the last time you asked me";
							else {
								dialogueText = "The princess? No, last I saw her was when I gave her flute lessons yesterday...";
								hasMetMinstrel = true;
							}
						}
					}
				}
			}
		}
		else if (c == characters[chars.NURSE]) {
			charName = characters[chars.NURSE].charAt(0).toUpperCase() + characters[chars.NURSE].substring(1, characters[chars.NURSE].length);

			if (endGame) dialogueText = "Look at you! Saving the princess is such a feat... where have you been all my life? Just kidding. Maybe you should go see the girl... she might be... very grateful!";
			else {
				if (hasMetNurse) dialogueText = "No, she hasn't come by. Let's just hope she's not sick...";
				else {
					dialogueText = "Looking for the princess, huh? I haven't seen her. I'm stuck here while the doc's gone help out at next door's Kingdom with some Black plague thing. Silly, huh?";
					hasMetNurse = true;
				}
			}
		}
		else if (c == characters[chars.PRIEST]) {
			charName = characters[chars.PRIEST].charAt(0).toUpperCase() + characters[chars.PRIEST].substring(1, characters[chars.PRIEST].length);

			if (endGame) dialogueText = "Congratulations, son. You saved our princess! Go see her, maybe she's waiting for you at the castle";
			else {
				if (PriestIsDone) dialogueText = "Have you found the princess yet? I know you soon will";
				else {
					if (hasDonated) {
						mustGiveLetter = true;
						dialogueText = "Son, someone left a letter here. It is addressed to the Castle Jester. Could you please deliver it to him?";
					}
					else dialogueText = "I fear I do not know where the princess is. I shall pray for you to be able to find her soon...";
				}
			}
		}
		else if (c == characters[chars.PEDDLER]) {
			charName = characters[chars.PEDDLER].charAt(0).toUpperCase() + characters[chars.PEDDLER].substring(1, characters[chars.PEDDLER].length);

			if (endGame) dialogueText = "You saved the princess? Great! Awesome work! Maybe you can convince her to buy my collection? She should be in the castle";
			else {
				if (PeddlerIsHappy) dialogueText = "No, I haven't seen her. I keep telling her to buy my collection, but she just smiles and leaves!";
				else {
					if (hasMetPeddler) dialogueText = "I haven't seen the princess. I've been so busy trying to find this legendary stone. I've heard it could be either at the beach or at the bottom of the sea...";
					else {
						dialogueText = "No, I've been here the whole time, and the princess hasn't passed by...";
						hasMetPeddler = true;
					}
				}
			}
		}
		else if (c == characters[chars.ROYALBANNERETT]) {
			charName = characters[chars.ROYALBANNERETT].charAt(0).toUpperCase() + characters[chars.ROYALBANNERETT].substring(1, 5) + " " + characters[chars.ROYALBANNERETT].charAt(5).toUpperCase() + characters[chars.ROYALBANNERETT].substring(6, characters[chars.ROYALBANNERETT].length);

			if (endGame) dialogueText = "Congratulations, my boy... You saved our princess from an uncertain future. If you're looking for her, she should be in her chambers... I hope.";
			else {
				if (hasMetRoyalBannerett) {
					dialogueText = "What can I help you with?";
					askBannerett = true;
				}
				else {
					dialogueText = "Thank you for trying to find the princess. If you need information about the people of " + kingdomName + ", just ask me";
					hasMetRoyalBannerett = true;
				}
			}
		}
		else if (c == characters[chars.ROYALCOOK]) {
			charName = characters[chars.ROYALCOOK].charAt(0).toUpperCase() + characters[chars.ROYALCOOK].substring(1, 5) + " " + characters[chars.ROYALCOOK].charAt(5).toUpperCase() + characters[chars.ROYALCOOK].substring(6, characters[chars.ROYALCOOK].length);

			if (endGame) dialogueText = "Congratulations, boy! You should go see the princess, maybe she's upstairs";
			else {
				if (hasMetRoyalCook) {
					if (mustGetCake) {
						dialogueText = "You want a strawberry cake? I'm sorry, but we also ran out of strawberries. Why don't you ask the farmer? Maybe he has some...";
						askForStrawberries = true;
					}
					else {
						if (mustGetPie) {
							dialogueText = "You need a cherry pie? Sorry, we're out of cherries. Maybe the merchant at the shop has some...";
							canBuyCherries = true;
						}
						else dialogueText = "I wish I could help you more but you should probably ask someone else...";
					}
				}
				else {
					dialogueText = "The princess is missing? Sorry, I've been busy here all day and I just found out through you!";
					hasMetRoyalCook = true;
				}
			}
		}
		else if (c == characters[chars.ROYALSENTRY]) {
			charName = characters[chars.ROYALSENTRY].charAt(0).toUpperCase() + characters[chars.ROYALSENTRY].substring(1, 5) + " " + characters[chars.ROYALSENTRY].charAt(5).toUpperCase() + characters[chars.ROYALSENTRY].substring(6, characters[chars.ROYALSENTRY].length);

			if (endGame) dialogueText = "Congratulations, you actually found and saved our majesty. What are you waiting for? Go see if she's upstairs";
			else {
				if (hasRoyalSeal) {
					if (canFindHankerchief) dialogueText = "Have you had any luck finding the princess? We have not found her yet...";
					else dialogueText = "Have you spoken to the princess's lady in waiting yet?";
				}
				else {
					if (favors == 10) {
						hasRoyalSeal = true;
						availableCategories = 3;

						var royalsentryok = document.createElement("img");
						royalsentryok.id = "royalsentryok";
						royalsentryok.src = faceimages[11].src;
						royalsentryok.setAttribute("style", "position: absolute; top: " + (75 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[11].width / 2) - 18) + "px; visibility: visible;");
						document.getElementById("canvas").appendChild(royalsentryok);

						dialogueText = "I guess I was mistaken about you, sorry. Allow me to bestow upon you " + kingdomName + "'s royal seal. You will be able to exit the town with it! Now go, youngster. Find the princess's lady in waiting, maybe she has more information about her...";
						mustGiveRoyalSeal = true;
					}
					else {
						if (hasMetRoyalSentry) dialogueText = "Permission to leave town? Not even 10 people can vouch for you! And no, the Priest doesn't count, he likes everyone!!";
						else {
							dialogueText = "Who are you? Do you even have permission to enter the Redin Palace?";
							hasMetRoyalSentry = true;
						}
					}
				}
			}
		}
		else if (c == characters[chars.SALLY]) {
			charName = characters[chars.SALLY].charAt(0).toUpperCase() + characters[chars.SALLY].substring(1, characters[chars.SALLY].length);

			if (endGame) dialogueText = "Congratulations on saving the princess, Sir! Maybe you will really be a Sir now... Why don't you go see the princess at the castle?";
			else {
				if (hasFox) {
					if (canAskforFur && !hasFur) {
						dialogueText = "You need Foxie's hair brush? Sure, you can have it!";
						mustGivePetBrush = true;
					}
					else dialogueText = "Did you know Foxie's spirit form cannot hide sounds?";
				}
				else {
					if (hasRoyalSeal) dialogueText = "No... The Princess hasn't passed by... I haven't left home... I'm so sorry...";
					else {
						if (!hasMetSally) {
							dialogueText = "Are you looking for the princess? I'm sorry, I have not seen her. Have you seen my puppy?";
							hasMetSally = true;
						}
						else {
							if (!hasFlour) {
								dialogueText = "Daddy says my puppy went to a big meadow far, far away. I asked him to let me give him his favorite milk bone, but I'm not allowed outside. Could you please bring me some flour?";
								canBuyFlour = true;
							}
							else dialogueText = "Do you think my puppy is doing well?";
						}
					}
				}
			}
		}
		else if (c == characters[chars.SERF]) {
			charName = characters[chars.SERF].charAt(0).toUpperCase() + characters[chars.SERF].substring(1, characters[chars.SERF].length);

			if (endGame) dialogueText = "Meh, I could've saved the princess, but I was busy rest-I mean, working. Go see her";
			else {
				if (SerfIsHappy) dialogueText = "Why I'm not working? I have to try out my new blanket!";
				else {
					if (hasMetSerf) {
						dialogueText = "You know? I'm not sleeping as much as I want-er, need to. My blanket's too old so I need a new one. Get me one";
						askedForBlanket = true;
					}
					else {
						dialogueText = "The princess? Nope, been hanging out here-I mean, I've been working too hard that I haven't seen where she went";
						hasMetSerf = true;
					}
				}
			}
		}
		else if (c == characters[chars.SHEPHERD]) {
			charName = characters[chars.SHEPHERD].charAt(0).toUpperCase() + characters[chars.SHEPHERD].substring(1, characters[chars.SHEPHERD].length);

			if (endGame) dialogueText = "Congrats, boy! Go to the castle, maybe the princess will reward you for saving her";
			else {
				if (hasMetShepherd) dialogueText = "You wouldn't happen to know where my farm is, would you?";
				else dialogueText = "Sorry, I haven't seen the princess, I'm a bit busy searching for my sheep...";
			}
		}
		else if (c == characters[chars.SIREN]) {
			charName = characters[chars.SIREN].charAt(0).toUpperCase() + characters[chars.SIREN].substring(1, characters[chars.SIREN].length);

			if (endGame) dialogueText = "Congratulations!! You actually saved her! Maybe you should find her again, see if she wishes to reward you";
			else {
				if (SirenIsHappy) dialogueText = "You haven't found her yet? I'll see if I can find her around the beach.";
				else {
					if (hasMetSiren) {
						dialogueText = "I'm sorry I can't help you. I'm looking for a fish that swallowed my necklace. And I need to find something to help my friends escape from the fishermen's nets...";
						canBuyFish = true;
					}
					else {
						dialogueText = "Sorry, I haven't seen the princess. I'm rarely out of water, anyways...";
						hasMetSiren = true;
					}
				}
			}
		}
		else if (c == characters[chars.SMITH]) {
			charName = characters[chars.SMITH].charAt(0).toUpperCase() + characters[chars.SMITH].substring(1, characters[chars.SMITH].length);

			if (endGame) dialogueText = "Congrats, boy. You saved the princess. What are you doing here? Maybe you should go see her";
			else {
				if (SmithIsHappy) dialogueText = "Sorry, I've been busy in here, although the princess hasn't come by anyways";
				else {
					if (hasMetSmith) {
						if (hasHammer) dialogueText = "Did you find anyone who could repair my hammer?";
						else {
							if (hasRoyalSeal) {
								dialogueText = "Can I ask you a favor? I need to forge three armor mails for the knights and my hammer just broke. Could you find someone to repair it?";
								giveBrokenHammer = true;
							}
							else dialogueText = "I'm very busy here, so no... I haven't seen our princess";
						}
					}
					else {
						dialogueText = "You're looking for the princess? I haven't seen her. Good luck!";
						hasMetSmith = true;
					}
				}
			}
		}
		else if (c == characters[chars.SPIRITFOX]) {
			charName = characters[chars.SPIRITFOX].charAt(0).toUpperCase() + characters[chars.SPIRITFOX].substring(1, 6) + " " + characters[chars.SPIRITFOX].charAt(6).toUpperCase() + characters[chars.SPIRITFOX].substring(7, characters[chars.SPIRITFOX].length);

			dialogueText = "A little girl in town has more milk bones? Can I come with you?";
			FoxTagsAlong = true;
		}
		else if (c == characters[chars.TAILOR]) {
			charName = characters[chars.TAILOR].charAt(0).toUpperCase() + characters[chars.TAILOR].substring(1, characters[chars.TAILOR].length);

			if (endGame) dialogueText = "Congratulations on saving the princess! Well done! If anything, you should see if she needs anything else. She should be at the castle";
			else dialogueText = "Sorry, I have a business to run, and I haven't been outside, so I haven't seen the princess...";
		}
		else if (c == characters[chars.THATCHER]) {
			charName = characters[chars.THATCHER].charAt(0).toUpperCase() + characters[chars.THATCHER].substring(1, characters[chars.THATCHER].length);

			if (endGame) dialogueText = "So you saved the princess? Remember who helped you first! Why don't you go see her?";
			else {
				if (atePie) {
					if (randomHankerchiefLocation == 1) dialogueText = "Here's what I know. She headed through the north entrance";
					else if (randomHankerchiefLocation == 2) dialogueText = "Here's what I know. She headed through the south entrance";
					else if (randomHankerchiefLocation == 3) dialogueText = "Here's what I know. She headed through the east entrance";
					else if (randomHankerchiefLocation == 4) dialogueText = "Here's what I know. She headed through the west entrance";
					hasThatcherInfo = true;
				}
				else {
					dialogueText = "Yeah, I saw the princess while I was fixing a house's roof. Why'd you want to know? Tell you what, bring me a cherry pie from the royal cook and I'll tell you which way she went!";
					mustGetPie = true;
				}
			}
		}
		else if (c == characters[chars.WITCH]) {
			charName = characters[chars.WITCH].charAt(0).toUpperCase() + characters[chars.WITCH].substring(1, characters[chars.WITCH].length);

			if (endGame) dialogueText = "What do you want now, didn't you save the princess already? Get out of here and go see her!";
			else {
				if (canAskWitch || randomPrincessKidnapper != 1) {
					if (randomPrincessKidnapper == 1) {
						if (findWitchArtifacts) dialogueText = "Bring me three artifacts: The essence of a mythical beast, a pure display of attack and beauty. You will also bring me the remaining potion of the nymph sorceress herself! Lastly, you will fetch me the oldest excerpt of magic known to man...";
						else {
							dialogueText = "Why are you interested in this princess? I cannot simply give her away. Bring me three artifacts: The essence of a mythical beast, a pure display of attack and beauty. You will also bring me the remaining potion of the nymph sorceress herself! Lastly, you will fetch me the oldest excerpt of magic known to man...";
							availableCategories = 4;
							canVisitDragon = true;
							banditOnCave = true;
							findWitchArtifacts = true;
						}
					}
					else {
						if (WitchIsHappy) dialogueText = "I sure hope the sorcerers' pride gem does not fall on the wrong hands...";
						else {
							dialogueText = "You are a greedy young man to take from a defenseless lady such as myself... But I could part with my family heirloom if you bring me the oldest excerpt of magic known to man...";
							findMerlinsSpell = true;
						}
					}
					canTradeMerlinSpell = true;
				}
				else {
					var witchmad = document.createElement("img");
					witchmad.id = "witchmad";
					witchmad.src = faceimages[16].src;
					witchmad.setAttribute("style", "position: absolute; top: " + (110 - charOffset) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (faceimages[16].width / 2) - 3) + "px; visibility: visible;");
					document.getElementById("canvas").appendChild(witchmad);

					dialogueText = "This child came and dropped one of my vases. She said it was an accident, but I don't believe her. So I placed a spell on her so she may never leave. She'll be my servant for the rest of her days!!!";
					canAskWitch = true;
				}
			}
		}
		else if (c == "barterer") {
			charName = "Barterer";

			if (endGame) dialogueText = "You really want to exchange now? You saved the princess! You should go see her instead";
			else dialogueText = "Boy, I've been here all day working. Do you think I could have seen the princess?";
		}
		else if (c == "bruce") {
			charName = "Bruce";

			if (isSleeping) dialogueText = "Zzz...";
			else {
				if (hasMetBruce) {
					dialogueText = "Sorry, I've been here, AWAKE all night trying to sleep. I've had insomnia over the last fortnight! I do remember once being able to sleep thanks to the sweet melody of the Harp. Will you bring me one and play for me?";
					canAskForHarp = true;
				}
				else {
					dialogueText = "Will I ever be able to sleep again?";
					hasMetBruce = true;
				}
			}
		}
		else if (c == "potter") {
			charName = "Potter";

			if (endGame) dialogueText = "Congrats, buddy! You saved the princess! Forget about buying a pot, go see her at the castle!";
			else dialogueText = "Sorry, the princess hasn't come by here...";
		}
		else if (c == "merchant") {
			charName = "Merchant";

			if (endGame) dialogueText = "Hey, hey, congrats! You saved the girl. Why don't you look for her at the castle?";
			else dialogueText = "I don't know where the princess went. She bought an apple for the road and then left...";
		}
		else if (c == "bartender") {
			charName = "Bartender";

			if (endGame) dialogueText = "Congrats! You saved the princess! If I were you, I'd go see her at the castle";
			else dialogueText = "No, the princess never comes around here";
		}

		isAsking = false;
	}
}

//will show the inventory on screen
function prepareInventory() {
	itembox.style.visibility = "visible";
	itembox.style.zIndex = 3;

	hideElements();

	for (var i = 0; i < items.length; i++) {
		for (var j = 0; j < 7; j++) {
			items[i][j].style.visibility = "visible";
			items[i][j].style.zIndex = "4";
		}
	}

	backButton.setAttribute("style", "position: absolute; cursor: pointer; top: " + (canvasHeight - 222 - charOffset) + "px; left: " + (canvasLeft + canvasWidth - 275) + "px;");
	backButton.style.visibility = "visible";
	backButton.style.zIndex = 3;

	itemDescription.style.visibility = "visible";
	itemDescription.style.zIndex = 3;
}

function showElements() {
	if (!showInventory) {
			for(var i = 0; i < actionButtons.length; i++) {
			actionButtons[i].style.visibility = "visible";
		}
	}

	for (var i = 0; i < arrowsVisible; i++) {
		arrows[i].style.visibility = "visible";
	}
	arrowsVisible = 0;

	if (isNotAlone) {
		if (showInventory) {
			for(var i = 0; i < actionButtons.length; i++) {
				actionButtons[i].style.visibility = "visible";
			}
			showInventory = false;
		}
	}

	dispinfobar.style.visibility = "visible";
	separatorbar.style.visibility = "visible";
	infobar.style.visibility = "visible";
	bag.style.visibility = "visible";
	if(hasArmor) armor.style.visibility = "visible";
	coins.style.visibility = "visible";
	dispmoney.style.visibility = "visible";
	dispfavors.style.visibility = "visible";
}

function hideElements() {
	if (!showInventory) {
			for(var i = 0; i < actionButtons.length; i++) {
			actionButtons[i].style.visibility = "hidden";
		}
	}

	for (var i = 0; i < arrows.length; i++) {
		if (arrows[i].style.visibility == "visible") {
			arrows[i].style.visibility = "hidden";
			arrowsVisible++;
		}
	}

	if (isNotAlone) {
		for(var i = 0; i < actionButtons.length; i++) {
			actionButtons[i].style.visibility = "hidden";
		}
	}

	dispinfobar.style.visibility = "hidden";
	separatorbar.style.visibility = "hidden";
	infobar.style.visibility = "hidden";
	bag.style.visibility = "hidden";
	if(hasArmor) armor.style.visibility = "hidden";
	coins.style.visibility = "hidden";
	dispmoney.style.visibility = "hidden";
	dispfavors.style.visibility = "hidden";
}

function populateInventoryBox() {
	var itemSide = 70;
	var leftSeparator = 10;
	var topSeparator = 10;

	var itemLeft = canvasLeft + 115 + leftSeparator;
	var itemTop = 115 - charOffset + topSeparator;

	for (var i = 0; i < items.length; i++) {
		for (var j = 0; j < 7; j++) {
			items[i][j] = document.createElement("img");
			items[i][j].src = itemimages[27].src;
			items[i][j].setAttribute("style", "position: absolute; top: " + (itemTop) + "px; left: " + (itemLeft) + "px; visibility: hidden;");
			items[i][j].onmouseenter = function() { if(!onMobile) playSoundEffect("hover");};
			document.getElementById("canvas").appendChild(items[i][j]);

			itemLeft += itemSide + leftSeparator;
		}

		itemLeft = canvasLeft + 115 + leftSeparator;
		itemTop += itemSide + topSeparator;
	}
}

function sentryHalt() {
	character.src = charimages[chars.SENTRY].src;
	character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.SENTRY].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SENTRY].width / 2)) + "px; visibility: visible;");
	currentCharacter = characters[chars.SENTRY];
	messagebar.style.visibility = "visible";
	for (var i = 0; i < arrows.length; i++) {
		if (arrows[i].style.visibility == "visible") {
			arrows[i].style.visibility = "hidden";
			arrowsVisible++;
		}
	}
	prepareText(characters[chars.SENTRY]);
}

function showItemConfirmation(imagenum, name, y, x) {
	items[y][x].src = itemimages[imagenum].src;
	items[y][x].style.cursor = "pointer";
	items[y][x].onmouseover = function() { itemDescription.innerHTML = name;};
	items[y][x].onmouseout = function() { itemDescription.innerHTML = "Select an item to use or give";};

	showElementsOnGettingItem(imagenum);
	document.getElementById("gotitemtxt").innerHTML = "You got: " + name;
}

function showElementsOnGettingItem(imagenum) {
	if(!onMobile) getitemSound.play();

	document.getElementById("gotitembar").style.visibility = "visible";
	document.getElementById("gotitembar").style.zIndex = 3;

	document.getElementById("gotitemimg").style.visibility = "visible";
	document.getElementById("gotitemimg").src = itemimages[imagenum].src;
	document.getElementById("gotitemimg").style.zIndex = 3;

	document.getElementById("gotitemtxt").style.visibility = "visible";
	document.getElementById("gotitemtxt").style.zIndex = 3;

	document.getElementById("continue").style.visibility = "visible";
	document.getElementById("continue").style.zIndex = 3;
}

function getMoney(imagenum, amount) {
	showElementsOnGettingItem(imagenum);
	document.getElementById("gotitemtxt").innerHTML = "You got: $" + amount;
	money += amount;
}

function hideElementsOnGettingItem() {
	if (isNotAlone) {
		messagebar.style.visibility = "hidden";
		backButton.style.visibility = "hidden";
	}
	else {
		for (var i = 0; i < arrows.length; i++) {
			if (arrows[i].style.visibility == "visible") {
				arrows[i].style.visibility = "hidden";
				arrowsVisible++;
			}
		}

		dispinfobar.style.visibility = "hidden";
		separatorbar.style.visibility = "hidden";
		infobar.style.visibility = "hidden";
		bag.style.visibility = "hidden";
		if (hasArmor) armor.style.visibility = "hidden";
		coins.style.visibility = "hidden";
		dispmoney.style.visibility = "hidden";
		dispfavors.style.visibility = "hidden";
	}
}

function hideElementsOnGivingItem(y, x) {
	items[y][x].src = itemimages[27].src;
	items[y][x].style.cursor = "default";
	items[y][x].onmouseover = undefined;
	items[y][x].onclick = undefined;

	hideElementsForDialogue();
}

function hideElementsForDialogue() {
	for (var i = 0; i < items.length; i++) {
		for (var j = 0; j < 7; j++) {
			items[i][j].style.visibility = "hidden";
			items[i][j].style.zIndex = "-1";
		}
	}

	backButton.style.visibility = "hidden";
	itembox.style.visibility = "hidden";
	itembox.style.zIndex = -1;
	itemDescription.style.visibility = "hidden";
	itemDescription.style.zIndex = -1;
}

function showTextOnGivingItem(charactergivento) {
	showText = true;
	messagebar.style.visibility = "visible";
	charName = charactergivento;
}

function playSoundEffect(sound) {
	if (sound == "armor") fx.setAttribute("src", armorSound.src);
	else if (sound == "chew") fx.setAttribute("src", chewSound.src);
	else if (sound == "dragonfire") fx.setAttribute("src", dragonfireSound.src);
	else if (sound == "fade") fx.setAttribute("src", fadeSound.src);
	else if (sound == "gameover") fx.setAttribute("src", gameoverSound.src);
	else if (sound == "getitem") fx.setAttribute("src", getitemSound.src);
	else if (sound == "harp") fx.setAttribute("src", harpSound.src);
	else if (sound == "hover") fx.setAttribute("src", hoverSound.src);
	else if (sound == "move") fx.setAttribute("src", moveSound.src);
	else if (sound == "munch") fx.setAttribute("src", munchSound.src);
	else if (sound == "push") fx.setAttribute("src", pushSound.src);
	else if (sound == "trumpet") fx.setAttribute("src", trumpetSound.src);

	fx.play();
}

function playSoundTrack(sound) {
	if (sound == "Bandit") soundTrack.setAttribute("src", BanditSoundTrack.src);
	else if (sound == "Chapel") soundTrack.setAttribute("src", ChapelSoundTrack.src);
	else if (sound == "Crimsonia") soundTrack.setAttribute("src", CrimsoniaSoundTrack.src);
	else if (sound == "Dragon") soundTrack.setAttribute("src", DragonSoundTrack.src);
	else if (sound == "Forest") soundTrack.setAttribute("src", ForestSoundTrack.src);
	else if (sound == "Intro") soundTrack.setAttribute("src", IntroSoundTrack.src);
	else if (sound == "Mountain") soundTrack.setAttribute("src", MountainSoundTrack.src);
	else if (sound == "Outside") soundTrack.setAttribute("src", OutsideSoundTrack.src);
	else if (sound == "Sally") soundTrack.setAttribute("src", SallySoundTrack.src);
	else if (sound == "Sarelle") soundTrack.setAttribute("src", SarelleSoundTrack.src);
	else if (sound == "Witch") soundTrack.setAttribute("src", WitchSoundTrack.src);

	currentTrack = sound;
	soundTrack.play();
}

function loadSounds() {
	fx.setAttribute("autoplay:false", "autoplay");
	soundTrack.setAttribute("autoplay:false", "autoplay");
	soundTrack.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	soundTrack.id = "soundTrack";

	armorSound.setAttribute("src", soundRoot + "armor.wav");
	armorSound.setAttribute("autoplay:false", "autoplay");
	chewSound.setAttribute("src", soundRoot + "chew.wav");
	chewSound.setAttribute("autoplay:false", "autoplay");
	dragonfireSound.setAttribute("src", soundRoot + "dragonfire.wav");
	dragonfireSound.setAttribute("autoplay:false", "autoplay");
	fadeSound.setAttribute("src", soundRoot + "fade.wav");
	fadeSound.setAttribute("autoplay:false", "autoplay");
	gameoverSound.setAttribute("src", soundRoot + "gameover.wav");
	gameoverSound.setAttribute("autoplay:false", "autoplay");
	getitemSound.setAttribute("src", soundRoot + "getitem.wav");
	getitemSound.setAttribute("autoplay:false", "autoplay");
	harpSound.setAttribute("src", soundRoot + "harp.wav");
	harpSound.setAttribute("autoplay:false", "autoplay");
	hoverSound.setAttribute("src", soundRoot + "hover.wav");
	hoverSound.setAttribute("autoplay:false", "autoplay");
	moveSound.setAttribute("src", soundRoot + "move.wav");
	moveSound.setAttribute("autoplay:false", "autoplay");
	munchSound.setAttribute("src", soundRoot + "munch.wav");
	munchSound.setAttribute("autoplay:false", "autoplay");
	pushSound.setAttribute("src", soundRoot + "push.wav");
	pushSound.setAttribute("autoplay:false", "autoplay");
	trumpetSound.setAttribute("src", soundRoot + "trumpet.wav");
	trumpetSound.setAttribute("autoplay:false", "autoplay");

	BanditSoundTrack.setAttribute("src", soundRoot + "Bandit.mp3");
	ChapelSoundTrack.setAttribute("src", soundRoot + "Chapel.mp3");
	CrimsoniaSoundTrack.setAttribute("src", soundRoot + "Crimsonia.mp3");
	DragonSoundTrack.setAttribute("src", soundRoot + "Dragon.mp3");
	ForestSoundTrack.setAttribute("src", soundRoot + "Forest.mp3");
	IntroSoundTrack.setAttribute("src", soundRoot + "Intro.mp3");
	MountainSoundTrack.setAttribute("src", soundRoot + "Mountain.mp3");
	OutsideSoundTrack.setAttribute("src", soundRoot + "Outside.mp3");
	SallySoundTrack.setAttribute("src", soundRoot + "Sally.mp3");
	SarelleSoundTrack.setAttribute("src", soundRoot + "Sarelle.mp3");
	WitchSoundTrack.setAttribute("src", soundRoot + "Witch.mp3");
}

function showHankerchief() {
	var princesshankerchief = document.createElement("img");
	princesshankerchief.id = "princesshankerchief";
	princesshankerchief.src = itemimages[36].src;
	princesshankerchief.onclick = function() {
		document.getElementById("canvas").removeChild(princesshankerchief);
		hideElementsOnGettingItem();
		showItemConfirmation(36, "Princess's Handkerchief", 2, 0);
		hasHankerchief = true;
		items[2][0].onclick = function() {
			if (currentCharacter == characters[chars.JESTER]) {
				hideElementsForDialogue();

				var HandMirrorTextLocation = "";
				if (randomHandMirrorLocation == 1) HandMirrorTextLocation = " we went to visit the old farmer...";
				else if (randomHandMirrorLocation == 2) HandMirrorTextLocation = " we headed to the beach, walking downhill from the North entrance...";
				else if (randomHandMirrorLocation == 3) HandMirrorTextLocation = " we stopped where the mountains and forest meet...";

				showTextOnGivingItem("Jester");
				dialogueText = "That's... The Princess's handkerchief! She carries it around whenever she goes on long walks! One day, she asked me to accompany her and " + HandMirrorTextLocation;
				canFindHandMirror = true;
			}
			else ShowWrongItemMessage();
		};
	};
	document.getElementById("canvas").appendChild(princesshankerchief);
}

function showHandMirror() {
	var princesshandmirror = document.createElement("img");
	princesshandmirror.id = "princesshandmirror";
	princesshandmirror.src = itemimages[38].src;
	princesshandmirror.onclick = function() {
		document.getElementById("canvas").removeChild(princesshandmirror);
		hideElementsOnGettingItem();
		showItemConfirmation(38, "Princess's Hand Mirror", 2, 1);
		hasHandMirror = true;
		items[2][1].onclick = function() {
			if (currentCharacter == characters[chars.FRANCIS]) {
				hideElementsForDialogue();

				var NecklaceTextLocation = "";
				if (randomNecklaceLocation == 1) NecklaceTextLocation = "It was one day when I was exiting the forest to go to the beach... I think I first met Anne then...";
				else if (randomNecklaceLocation == 2) NecklaceTextLocation = "I was walking through the forest, and she was going to the mountains. I mean, who brings a mirror to the mountains?";

				showTextOnGivingItem("Francis");
				dialogueText = "A hand mirror? Hey, I remember seeing the princess with it! " + NecklaceTextLocation;
				canFindNecklace = true;
			}
			else ShowWrongItemMessage();
		};
	};
	document.getElementById("canvas").appendChild(princesshandmirror);
}

function showNecklace() {
	var princessnecklace = document.createElement("img");
	princessnecklace.id = "princessnecklace";
	princessnecklace.src = itemimages[39].src;
	princessnecklace.onclick = function() {
		document.getElementById("canvas").removeChild(princessnecklace);
		hideElementsOnGettingItem();
		showItemConfirmation(39, "Princess's Necklace", 2, 2);
		hasNecklace = true;
		items[2][2].onclick = function() {
			if (currentCharacter == characters[chars.FISHERMAN]) {
				hideElementsForDialogue();
				showTextOnGivingItem("Fisherman");
				if (hasFin) {
					dialogueText = "That necklace... Oh, I got it! It belongs to the princess! See, one time I saw her with her... lady in waiting? Anyways, she was walking around the beach to take a swim. She would remove it before getting in. Now, the water is cleaner towards the mountains... why don't you search there?";
					canFindRoomKey = true;
				}
				else dialogueText = "A necklace... I think I saw it before, but I can't seem to remember... I'm still thinking about that siren's scales...";
			}
			else ShowWrongItemMessage();
		};
	};
	document.getElementById("canvas").appendChild(princessnecklace);
}

function showRoomKey() {
	var princessroomkey = document.createElement("img");
	princessroomkey.id = "princessroomkey";
	princessroomkey.src = itemimages[37].src;
	princessroomkey.onclick = function() {
		document.getElementById("canvas").removeChild(princessroomkey);
		hideElementsOnGettingItem();
		showItemConfirmation(37, "Princess's Room Key", 2, 3);
		hasRoomKey = true;
	}
	document.getElementById("canvas").appendChild(princessroomkey);
}

function ShowWrongItemMessage() {
	hideElementsForDialogue();

	if (currentCharacter == characters[chars.ANNE]) {
		showTextOnGivingItem("Anne");
		dialogueText = "Thanks, but maybe you should keep it";
	}
	else if (currentCharacter == characters[chars.BANDIT]) {
		showTextOnGivingItem("Bandit");
		dialogueText = "Why the heck would I want that?";
	}
	else if (currentCharacter == characters[chars.DRAGON]) {
		showTextOnGivingItem("Dragon");
		dialogueText = "This is not useful to me!";
	}
	else if (currentCharacter == characters[chars.DUCHESS]) {
		showTextOnGivingItem("Duchess");
		dialogueText = "Yeah, that's cute. Why don't you go somewhere else?";
	}
	else if (currentCharacter == characters[chars.DUKE]) {
		showTextOnGivingItem("Duke");
		dialogueText = "What? Is there food in here? Sorry, I can't eat... um, take this";
	}
	else if (currentCharacter == characters[chars.FARMER]) {
		showTextOnGivingItem("Farmer");
		dialogueText = "Sorry, I cannot accept this. Please take it back";
	}
	else if (currentCharacter == characters[chars.FISHERMAN]) {
		showTextOnGivingItem("Fisherman");
		dialogueText = "What's that? Sorry, if I take it it will just go to waste at the ocean...";
	}
	else if (currentCharacter == characters[chars.FRANCIS]) {
		showTextOnGivingItem("Francis");
		dialogueText = "Thanks, but maybe you should keep it";
	}
	else if (currentCharacter == characters[chars.GRAVEKEEPER]) {
		showTextOnGivingItem("Grave Keeper");
		dialogueText = "Why should I accept this? Take it back...";
	}
	else if (currentCharacter == characters[chars.HOWARD]) {
		showTextOnGivingItem("Howard");
		dialogueText = "I don't think I need this, thanks though";
	}
	else if (currentCharacter == characters[chars.JESTER]) {
		showTextOnGivingItem("Jester");
		dialogueText = "I'll see if I can work on a rhyme for this, but you keep it!";
	}
	else if (currentCharacter == characters[chars.JOURNEYMAN]) {
		showTextOnGivingItem("Journeyman");
		dialogueText = "Sorry, you should not be giving this to me so freely, I cannot accept it";
	}
	else if (currentCharacter == characters[chars.LUCILLE]) {
		showTextOnGivingItem("Lucille");
		dialogueText = "Thank you! But I insist, you must keep this";
	}
	else if (currentCharacter == characters[chars.MAGICIAN]) {
		showTextOnGivingItem("Magician");
		dialogueText = "I don't think I can, nor want to drink this";
	}
	else if (currentCharacter == characters[chars.MINSTREL]) {
		showTextOnGivingItem("Minstrel");
		dialogueText = "I cannot... wear this...";
	}
	else if (currentCharacter == characters[chars.PEDDLER]) {
		showTextOnGivingItem("Peddler");
		dialogueText = "I already have several of these, I don't think I need it";
	}
	else if (currentCharacter == characters[chars.ROYALBANNERETT]) {
		showTextOnGivingItem("Royal Bannerett");
		dialogueText = "You should find someone else to give these items to...";
	}
	else if (currentCharacter == characters[chars.ROYALCOOK]) {
		showTextOnGivingItem("Royal Cook");
		dialogueText = "I don't think this can help me with my cooking...";
	}
	else if (currentCharacter == characters[chars.ROYALSENTRY]) {
		showTextOnGivingItem("Royal Sentry");
		dialogueText = "Why are you giving me this?";
	}
	else if (currentCharacter == characters[chars.SALLY]) {
		showTextOnGivingItem("Sally");
		dialogueText = "Sorry, I don't know what to use this for...";
	}
	else if (currentCharacter == characters[chars.SERF]) {
		showTextOnGivingItem("Serf");
		dialogueText = "I cannot sleep-err, work with this...";
	}
	else if (currentCharacter == characters[chars.SHEPHERD]) {
		showTextOnGivingItem("Shepherd");
		dialogueText = "A gift? Oh, thanks! Wait, why would I want this?";
	}
	else if (currentCharacter == characters[chars.SIREN]) {
		showTextOnGivingItem("Siren");
		dialogueText = "Thanks, but I don't think I need this...";
	}
	else if (currentCharacter == characters[chars.SMITH]) {
		showTextOnGivingItem("Smith");
		dialogueText = "I don't think I can do anything with this, boy";
	}
	else if (currentCharacter == characters[chars.SPIRITFOX]) {
		showTextOnGivingItem("Spirit Fox");
		dialogueText = "Umm... What's this?";
	}
	else if (currentCharacter == characters[chars.THATCHER]) {
		showTextOnGivingItem("Thatcher");
		dialogueText = "What should I do with this?";
	}
	else if (currentCharacter == characters[chars.WITCH]) {
		showTextOnGivingItem("Witch");
		dialogueText = "How is this supposed to be useful to me, boy?";
	}
	else if (currentCharacter == "barterer") {
		showTextOnGivingItem("Barterer");
		if (findWitchArtifacts || findMerlinsSpell) dialogueText = "I'm afraid I can't exchange what I have for that. Don't you have a family heirloom at your house?";
		else dialogueText = "Sorry, I don't think I have anything in exchange for that.";
	}
	else if (currentCharacter == "merchant") {
		showTextOnGivingItem("Merchant");
		dialogueText = "Are you trying to sell me this? I don't want it...";
	}
	else if (currentCharacter == "bruce") {
		showTextOnGivingItem("Bruce");
		if (isSleeping) dialogueText = "Zzz...";
		else dialogueText = "... You really think that can put me to sleep?";
	}
}

function giveInfo(info) {
	charName = "Royal Bannerett";

	if (info == "Anne") dialogueText = "Anne is the daughter of a merchant. She's very lively, and appears to have made friendship with Francis, the son of another merchant, whose father is a rival of hers";
	else if (info == "The Bartender") dialogueText = "The bartender is a blonde woman who tends to the Ale House. She will serve you anything, except the special wine for which the Magician pays a lot of money";
	else if (info == "Bruce") dialogueText = "Bruce is a young townsman. He's usually very active, but I have heard that lately he's been having trouble sleeping";
	else if (info == "The Duchess") dialogueText = "The Duchess is a busy woman. She prefers to maintain her manor herself, and as such she may need help. If you meet her, she may ask you to run errands for her";
	else if (info == "The Duke") dialogueText = "The Duke is a nice man, but he loves sweets and pastries above all else, specially if these were prepared by the Royal Cook. Only his wife has ever been able to keep him from eating";
	else if (info == "Francis") dialogueText = "Francis is the son of a merchant. He's a nice boy, and appears to have befriended Anne, the daughter of another merchant, who is an enemy of his own father. Francis has spoken to the princess on ocassion";
	else if (info == "The Grave Keeper") dialogueText = "The grave keeper is very quiet. Due to crimes in the past, he's only able to work in the graveyard by himself. He can be very greedy, but he is also afraid of ghosts and spirits";
	else if (info == "Howard") dialogueText = "Howard is a young townsman. Lately he's been very sick, and may need medicine";
	else if (info == "The Magician") dialogueText = "The magician is very crafty. He can cast powerful spells, even summoning ghosts... but he seems to have a weakness for alcoholic beverages";
	else if (info == "The Merchant") dialogueText = "The merchant works under the banter system. You must bring him an item to exchange with him";
	else if (info == "The Minstrel") dialogueText = "The minstrel teaches flute lessons to the princess. Her harp is very soothing, but she seems to have a weakness for clothes and garnments";
	else if (info == "The Nurse") dialogueText = "The nurse is the young helper of our Doctor, currently away on another Kingdom. She was left in charge of preparing and selling medicine";
	else if (info == "The Peddler") dialogueText = "The peddler is a collector of rare items. He seems to be focusing on a legendary stone he once saw, though. But rumor has it such a stone is owned by the mermen, creatures whose lower body is that of a fish";
	else if (info == "The Potter") dialogueText = "The potter prepares pots to hold food, and they're not really expensive";
	else if (info == "The Priest") dialogueText = "The priest of " + kingdomName + " lives at the northern part of town. He's always praying for all our well being";
	else if (info == "Sally") dialogueText = "Sally is the young daughter of the Thatcher. As a child, she loves every animal, and specially her young dog. I haven't seen or heard its bark these past couple of days though";
	else if (info == "The Sentry") dialogueText = "The Sentries of our town are stationed at each entrance. Because we are in emergency, no one will be able to leave the town without permission, by means of bearing the Royal Seal";
	else if (info == "The Serf") dialogueText = "The serf is a townsman who has been given land to work inside of town. He says he's a hard worker, but I can't be certain of that";
	else if (info == "The Smith") dialogueText = "The smith knows how to work with steel to create mails. Should you ever need an armor, you should ask him for one";
	else if (info == "The Tailor") dialogueText = "The tailor prepares clothes and garnments for the people of town. She may have something you could buy if you ask her";
	else if (info == "The Thatcher") dialogueText = "The thatcher is in charge of repairing roofs. Because he works alone, he's almost always out, and that's why he gave his young daughter Sally a pet for her to not be lonely";
	else if (info == "The Jester") dialogueText = "The Jester of the castle is very skillful and knows a lot of graces, so the princess almost always asks him to accompany her. If anyone could have information on her, it may be him";
	else if (info == "Lucille") dialogueText = "Lucille is the princess's lady in waiting, and her cousin. She could provide you with useful information regarding the princess";
	else if (info == "The Royal Cook") dialogueText = "The Royal Cook is a woman who was chosen for the job because of her skill and speed at cooking. She may cook anything you need should you help her by getting ingredients";
	else if (info == "The Royal Sentry") dialogueText = "The Royal Sentry is in charge of protecting the castle, as well as handling external affairs. He's at the throne room. If you ask him, he may grant you the Royal Seal with which you can leave town";
	else if (info == "The Farmer") dialogueText = "The farmer works in a small parcel of land outside of town. He can provide you with produce and food, should you need it";
	else if (info == "The Fisherman") dialogueText = "The fisherman is a young man who fishes on the outer edges of " + kingdomName + ". He has spoken to the princess on ocassion";
	else if (info == "The Journeyman") dialogueText = "The journeyman is a traveler from Cipango. Apparently, he wishes to work here, but is looking for a gift for the craftsman. Maybe the merchant has something of value to him";
	else if (info == "The Shepherd") dialogueText = "The shepherd is in charge of caring for the sheep, and lives with the Farmer. He can be a bit forgetful, but he does his job well. He seemed flustered the last time he exited the forest";
	else if (info == "The Siren") dialogueText = "There is a siren around the rocky sea side on the Eastern part of the kingdom. You may still be able to find her if you go there";
	else if (info == "The Bandit") dialogueText = kingdomName + " has been looking for an infamous thief that seems to wander the South-Western part of the kingdom. Let's hope the princess didn't find him";
	else if (info == "The Dragon") dialogueText = "Just between you and me, our noblemen keep the knowledge of the existence of a powerful Dragon in a cave at the mountains a secret. Let's hope the princess didn't find out about him";
	else if (info == "The Spirit Fox") dialogueText = "There appears to be sounds of the paws of an animal whenever someone enters the forest. Maybe that's what has scared the Shepherd?";
	else if (info == "The Witch") dialogueText = "There is a legend that there exists a powerful Witch living on a hidden cottage deep in the forest. Some even say our magician may have learned from her. Let's hope that if the princess found her, that she is not in danger";

	showText = true;
}

function preparePrincess() {
	currentCharacter = characters[chars.SARELLE];
	character.src = charimages[chars.SARELLE].src;
	character.setAttribute("style", "position: absolute; top: " + (canvasHeight - charimages[chars.SARELLE].height) + "px; left: " + (canvasLeft + (canvasWidth / 2) - (charimages[chars.SARELLE].width / 2)) + "px; visibility: visible;");

	var PrincessNecklace = document.createElement("img");
	PrincessNecklace.id = "PrincessNecklace";
	PrincessNecklace.src = itemimages[34].src;
	PrincessNecklace.setAttribute("style", "position: absolute; top: 240px; left: " + (canvasLeft + (canvasWidth / 2) - (itemimages[34].width / 2)) + "px; visibility: visible; z-index: 3;");
	document.getElementById("canvas").appendChild(PrincessNecklace);

	var PrincessTiara = document.createElement("img");
	PrincessTiara.id = "PrincessTiara";
	PrincessTiara.src = itemimages[51].src;
	PrincessTiara.setAttribute("style", "position: absolute; top: 70px; left: " + (canvasLeft + (canvasWidth / 2) - (itemimages[51].width / 2)) + "px; visibility: visible; z-index: 3;");
	document.getElementById("canvas").appendChild(PrincessTiara);
}

function hideActionButtons() {
	for (var i = 0; i < actionButtons.length; i++) {
		actionButtons[i].style.visibility = "hidden";
	}
	if (currentCharacter != characters[chars.SARELLE]) if(!onMobile) playSoundEffect("push");
}
