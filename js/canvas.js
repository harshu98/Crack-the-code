////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW = 0;
var canvasH = 0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
async function initGameCanvas(w, h) {
    canvasW = w;
    canvasH = h;
    stage = new createjs.Stage("gameCanvas");

    createjs.Touch.enable(stage);
    stage.enableMouseOver(20);
    stage.mouseMoveOutside = true;

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tick);
}

var canvasContainer, mainContainer, gameContainer, inputContainer, inputHistoryContainer, resultContainer, resultContainer1;
var digitTop, logo, btnStart, creditspanel, wallet,
    //  btn1, btn2, btn3,
    screenDefault, screenReflect, screenAccessGranted, buttonsubmit, bettxt, betslot, scoreBar1, timerpng, scoreBar2, scoreBar3, screenTimer, screenTimerAlert, screenTimerMask, screenTimerAlertMask, screenScoreText,
    textEnter, textInstruction, screenTriedText, buttonReplay, btnFacebook, btnTwitter, btnWhatsapp, textFinalScore, textShare, winpopup, scoreslot, bg, textFinalScoreDisplay;
$.buttons = {};
$.input = {};
$.inputHistory = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    inputContainer = new createjs.Container();
    inputHistoryContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    resultContainer1 = new createjs.Container();
    confirmContainer = new createjs.Container();
    optionsContainer = new createjs.Container();

    digitTop = new createjs.Bitmap(loader.getResult('digitTiles'));


    logo = new createjs.Bitmap(loader.getResult('logo'));
    centerReg(logo);
    logo.x = canvasW / 2;
    logo.y = canvasH / 100 * 50;

    btnStart = new createjs.Bitmap(loader.getResult('btnStart'));
    centerReg(btnStart);
    btnStart.x = canvasW / 1.3;
    btnStart.y = canvasH / 100 * 80;

    // btn1 = new createjs.Bitmap(loader.getResult('btn1'));
    // centerReg(btn1);
    // btn1.x = canvasW / 1.3;
    // btn1.y = canvasH / 100 * 80;

    // btn2 = new createjs.Bitmap(loader.getResult('btn2'));
    // centerReg(btn2);
    // btn2.x = canvasW / 2;
    // btn2.y = canvasH / 100 * 80;

    // btn3 = new createjs.Bitmap(loader.getResult('btn3'));
    // centerReg(btn3);
    // btn3.x = canvasW / 4.5;
    // btn3.y = canvasH / 100 * 80;

    var buttonStartX = 140;
    var buttonX = buttonStartX;
    var buttonY = 450;
    var buttonSpace = 145;
    for (n = 0; n < numbers_arr.length; n++) {
        $.buttons['button' + n] = new createjs.Bitmap(loader.getResult('buttonNumber'));
        $.buttons['button' + n].name = numbers_arr[n];
        createHitarea($.buttons['button' + n]);
        centerReg($.buttons['button' + n]);

        $.buttons['button' + n].x = buttonX;
        $.buttons['button' + n].y = buttonY;
        $.buttons['button' + n].scale = 1.2;
        buttonX += ($.buttons['button' + n].image.naturalWidth / 2) + buttonSpace;
        if (n == 4) {
            buttonX = buttonStartX;
            buttonY += 180;
        }

        $.buttons['text' + n] = new createjs.Text();
        $.buttons['text' + n].font = "80px chinese_rocksregular";
        $.buttons['text' + n].color = "#000";
        $.buttons['text' + n].text = numbers_arr[n];
        $.buttons['text' + n].textAlign = "center";
        $.buttons['text' + n].textBaseline = 'alphabetic';
        $.buttons['text' + n].x = $.buttons['button' + n].x;
        $.buttons['text' + n].y = $.buttons['button' + n].y + 25;

        gameContainer.addChild($.buttons['button' + n], $.buttons['text' + n]);
    }

    textEnter = new createjs.Bitmap(loader.getResult('textEnter'));
    centerReg(textEnter);
    textEnter.x = canvasW / 100 * 48;
    textEnter.y = canvasH / 100 * 25;

    textInstruction = new createjs.Bitmap(loader.getResult('textInstruction'));
    centerReg(textInstruction);
    textInstruction.x = canvasW / 100 * 46;
    textInstruction.y = canvasH / 100 * 25;

    screenDefault = new createjs.Bitmap(loader.getResult('screenDefault'));
    centerReg(screenDefault);
    screenDefault.x = canvasW / 2;
    screenDefault.y = canvasH / 2;

    screenReflect = new createjs.Bitmap(loader.getResult('screenReflect'));
    centerReg(screenReflect);
    screenReflect.x = canvasW / 2.2;
    screenReflect.y = canvasH / 100 * 20;

    screenAccessGranted = new createjs.Bitmap(loader.getResult('screenAccessGranted'));
    centerReg(screenAccessGranted);
    screenAccessGranted.x = canvasW / 100 * 46;
    screenAccessGranted.y = canvasH / 100 * 24;

    screenScoreText = new createjs.Text();
    screenScoreText.font = "60px hackedregular";
    screenScoreText.color = scoreTextColour;
    screenScoreText.text = '000';
    screenScoreText.textAlign = "center";
    screenScoreText.textBaseline = 'alphabetic';
    screenScoreText.x = canvasW / 100 * 9;
    screenScoreText.y = canvasH / 100 * 40;

    screenTriedText = new createjs.Text();
    screenTriedText.font = "30px hackedregular";
    screenTriedText.color = scoreTextColour;
    screenTriedText.text = inputTriedText;
    screenTriedText.textAlign = "left";
    screenTriedText.textBaseline = 'alphabetic';
    screenTriedText.x = canvasW / 100 * 76;
    screenTriedText.y = canvasH / 100 * 40;

    timtxt = new createjs.Text();
    timtxt.font = "50px hackedregular";
    timtxt.color = "black";
    timtxt.text = "0:00";
    timtxt.textAlign = "left";
    timtxt.textBaseline = 'alphabetic';
    timtxt.x = canvasW / 100 * 36;
    timtxt.y = canvasH / 17;

    creditspanel = new createjs.Bitmap(loader.getResult('creditspanel'));
    centerReg(creditspanel);
    creditspanel.x = canvasW / 100 * 13;
    creditspanel.y = canvasH / 25;

    wallet = new createjs.Bitmap(loader.getResult('wallet'));
    centerReg(wallet);
    wallet.x = canvasW / 100 * 65.5;
    wallet.y = canvasH / 25;

    timerpng = new createjs.Bitmap(loader.getResult('timerpng'));
    centerReg(timerpng);
    timerpng.x = canvasW / 100 * 33.5;
    timerpng.y = canvasH / 25;

    buttonsubmit = new createjs.Bitmap(loader.getResult('buttonsubmit'));
    centerReg(buttonsubmit);
    buttonsubmit.x = canvasW / 100 * 87;
    buttonsubmit.y = canvasH / 100 * 82;
    bettxt = new createjs.Bitmap(loader.getResult('bettxt'));
    centerReg(bettxt);
    bettxt.x = canvasW / 100 * 87;
    bettxt.y = canvasH / 100 * 55;
    betslot = new createjs.Bitmap(loader.getResult('betslot'));
    centerReg(betslot);
    betslot.x = canvasW / 100 * 87;
    betslot.y = canvasH / 100 * 70;

    scoreBar1 = new createjs.Bitmap(loader.getResult('screenScoreBar'));
    scoreBar2 = new createjs.Bitmap(loader.getResult('screenScoreBar'));
    scoreBar3 = new createjs.Bitmap(loader.getResult('screenScoreBar'));
    centerReg(scoreBar1);
    centerReg(scoreBar2);
    centerReg(scoreBar3);
    scoreBar1.x = canvasW / 100 * 5;
    scoreBar2.x = canvasW / 100 * 9;
    scoreBar3.x = canvasW / 100 * 13;
    scoreBar1.y = scoreBar2.y = scoreBar3.y = canvasW / 100 * 20;

    screenTimer = new createjs.Bitmap(loader.getResult('screenTimer'));
    screenTimer.regX = screenTimer.naturalWidth / 2;
    screenTimer.regY = screenTimer.naturalHeight;
    screenTimer.x = canvasW / 100 * 89.2;
    screenTimer.y = canvasH / 100 * 20.5;

    screenTimerAlert = new createjs.Bitmap(loader.getResult('screenTimerAlert'));
    screenTimerAlert.regX = screenTimerAlert.naturalWidth / 2;
    screenTimerAlert.regY = screenTimerAlert.naturalHeight;
    screenTimerAlert.x = canvasW / 100 * 89.2;
    screenTimerAlert.y = canvasH / 100 * 20.5;

    screenTimerMask = new createjs.Shape();
    screenTimer.mask = screenTimerMask;

    screenTimerAlertMask = new createjs.Shape();
    screenTimerAlert.mask = screenTimerAlertMask;

    var totalWidth = (inputWidth * totalInputs) + (inputSpace * (totalInputs - 1));
    var startX = (canvasW / 100 * 43) - (totalWidth / 2);

    for (n = 0; n < totalInputs; n++) {
        $.input['number' + n] = new createjs.Text();
        $.input['number' + n].font = "bold 250px Nexa";
        $.input['number' + n].color = "white";
        $.input['number' + n].text = '8';
        $.input['number' + n].textAlign = "center";
        $.input['number' + n].textBaseline = 'alphabetic';
        $.input['number' + n].x = startX
        $.input['number' + n].y = canvasH / 100 * 35;
        startX += inputWidth + inputSpace + 70;

        $.input['barDefault' + n] = new createjs.Bitmap(loader.getResult('barDefault'));
        $.input['barWrong' + n] = new createjs.Bitmap(loader.getResult('barWrong'));
        $.input['barRemove' + n] = new createjs.Bitmap(loader.getResult('barRemove'));
        $.input['barCorrect' + n] = new createjs.Bitmap(loader.getResult('barCorrect'));
        $.input['barDefault' + n].name = 'default';
        $.input['barWrong' + n].name = 'wrong';
        $.input['barRemove' + n].name = 'remove';
        $.input['barCorrect' + n].name = 'correct';
        centerReg($.input['barDefault' + n]);
        centerReg($.input['barWrong' + n]);
        centerReg($.input['barRemove' + n]);
        centerReg($.input['barCorrect' + n]);
        $.input['barDefault' + n].x = $.input['barWrong' + n].x = $.input['barRemove' + n].x = $.input['barCorrect' + n].x = $.input['number' + n].x;
        $.input['barDefault' + n].y = $.input['barWrong' + n].y = $.input['barRemove' + n].y = $.input['barCorrect' + n].y = canvasH / 100 * 38;
        $.input['barWrong' + n].alpha = $.input['barRemove' + n].alpha = $.input['barCorrect' + n].alpha = 0;

        inputContainer.addChild($.input['number' + n], $.input['barDefault' + n], $.input['barWrong' + n], $.input['barRemove' + n], $.input['barCorrect' + n]);
    }

    inputHistoryContainer.x = canvasW / 100 * 79.8;
    inputHistoryContainer.y = canvasH / 100 * 10.5;

    buttonReplay = new createjs.Bitmap(loader.getResult('btnReplay'));
    btnFacebook = new createjs.Bitmap(loader.getResult('btnFacebook'));
    btnTwitter = new createjs.Bitmap(loader.getResult('btnTwitter'));
    btnWhatsapp = new createjs.Bitmap(loader.getResult('btnWhatsapp'));
    centerReg(buttonReplay);
    centerReg(btnFacebook);
    centerReg(btnTwitter);
    centerReg(btnWhatsapp);

    buttonReplay1 = new createjs.Bitmap(loader.getResult('btnReplay1'));
    centerReg(buttonReplay1);
    buttonReplay1.x = canvasW / 2;
    buttonReplay1.y = canvasH / 100 * 67;

    btnFacebook.x = canvasW / 100 * 35;
    btnTwitter.x = canvasW / 2;
    btnWhatsapp.x = canvasW / 100 * 65;
    btnFacebook.y = btnTwitter.y = btnWhatsapp.y = canvasH / 100 * 70;

    buttonReplay.x = canvasW / 2;
    buttonReplay.y = canvasH / 100 * 67;

    textFinalScore = new createjs.Bitmap(loader.getResult('textFinalScore'));
    textShare = new createjs.Bitmap(loader.getResult('textShare'));
    centerReg(textFinalScore);
    centerReg(textShare);

    textFinalScore.x = canvasW / 2;
    textFinalScore.y = canvasH / 100 * 25;
    textShare.x = canvasW / 2;
    textShare.y = canvasH / 100 * 60;


    walletId = new createjs.Text();
    walletId.font = "bold 30px Helvetica";
    walletId.color = "#e6e3e3";
    walletId.textAlign = "left";
    walletId.textBaseline = 'alphabetic';

    walletId.x = canvasW / 100 * 60;
    walletId.y = canvasH / 100 * 5.5;

    txtCredit = new createjs.Text();
    txtCredit.font = "bold 30px Helvetica";
    txtCredit.color = "#e6e3e3";
    txtCredit.text = "00000000000";
    txtCredit.textAlign = "left";
    txtCredit.textBaseline = 'alphabetic';
    txtCredit.x = canvasW / 100 * 7.5;
    txtCredit.y = canvasH / 100 * 5.5;

    instructionsTxt = new createjs.Text();
    instructionsTxt.font = "bold 35px Helvetica";
    instructionsTxt.color = "#000";
    instructionsTxt.text = "1 -    10X 2 -      3X 3 -   1.5X 4 - 1.25X 5 -   0.8X 6 -   0.5X";
    instructionsTxt.textAlign = "left";
    instructionsTxt.textBaseline = 'alphabetic';
    instructionsTxt.lineWidth = 150;
    instructionsTxt.x = canvasW / 100 * 4;
    instructionsTxt.y = canvasH / 100 * 20;

    textFinalScoreDisplay = new createjs.Text();
    textFinalScoreDisplay.font = "bold 60px chinese_rocksregular";
    textFinalScoreDisplay.color = "#000";
    textFinalScoreDisplay.text = '100';
    textFinalScoreDisplay.textAlign = "center";
    textFinalScoreDisplay.textBaseline = 'alphabetic';
    textFinalScoreDisplay.x = canvasW / 1.9;
    textFinalScoreDisplay.y = canvasH / 100 * 55;

    bg = new createjs.Bitmap(loader.getResult('bg'));


    bg1 = new createjs.Bitmap(loader.getResult('bg1'));
    scoreslot = new createjs.Bitmap(loader.getResult('scoreslot'));
    centerReg(scoreslot);
    scoreslot.x = canvasW / 100 * 52;
    scoreslot.y = canvasH / 100 * 53;
    winpopup = new createjs.Bitmap(loader.getResult('winpopup'));
    centerReg(winpopup);
    winpopup.x = canvasW / 100 * 50;
    winpopup.y = canvasH / 100 * 50;
    losspopup = new createjs.Bitmap(loader.getResult('losspopup'));
    centerReg(losspopup);
    losspopup.x = canvasW / 100 * 50;
    losspopup.y = canvasH / 100 * 50;


    //option
    buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
    centerReg(buttonFullscreen);
    buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
    centerReg(buttonSoundOff);
    buttonSoundOn.visible = false;
    buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
    centerReg(buttonExit);
    buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
    centerReg(buttonSettings);

    createHitarea(buttonFullscreen);
    createHitarea(buttonSoundOn);
    createHitarea(buttonSoundOff);
    createHitarea(buttonExit);
    createHitarea(buttonSettings);
    optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
    optionsContainer.visible = false;

    //exit
    itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
    centerReg(itemExit);
    itemExit.x = canvasW / 2;
    itemExit.y = canvasH / 2;

    buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
    centerReg(buttonConfirm);
    buttonConfirm.x = canvasW / 100 * 35;
    buttonConfirm.y = canvasH / 100 * 73;

    buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
    centerReg(buttonCancel);
    buttonCancel.x = canvasW / 100 * 65;
    buttonCancel.y = canvasH / 100 * 73;

    confirmMessageTxt = new createjs.Text();
    confirmMessageTxt.font = "50px hackedregular";
    confirmMessageTxt.color = "#fff";
    confirmMessageTxt.textAlign = "center";
    confirmMessageTxt.textBaseline = 'alphabetic';
    confirmMessageTxt.text = exitMessage;
    confirmMessageTxt.x = canvasW / 2;
    confirmMessageTxt.y = canvasH / 100 * 44;

    confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel);
    confirmContainer.visible = false;

    mainContainer.addChild(
        digitTop, logo, btnStart);
    // this.addbtn();
    gameContainer.addChild(textEnter, textInstruction, creditspanel, wallet, walletId, txtCredit, timerpng, timtxt, buttonsubmit, bettxt, betslot,
        // scoreBar1, scoreBar2, scoreBar3,  screenTimer, screenTimerAlert,screenScoreText,screenTriedText, 
        instructionsTxt, inputContainer, inputHistoryContainer, screenAccessGranted, screenReflect);
    resultContainer.addChild(bg, winpopup, scoreslot, buttonReplay,
        // textFinalScore, 
        textFinalScoreDisplay);
    resultContainer1.addChild(bg1, losspopup, buttonReplay1);
    if (shareEnable) {
        resultContainer.addChild(btnFacebook, btnTwitter, btnWhatsapp, textShare);
    }
    canvasContainer.addChild(screenDefault,
        mainContainer, gameContainer, resultContainer, resultContainer1, confirmContainer, optionsContainer, buttonSettings);
    stage.addChild(canvasContainer);

    resizeCanvas();
}

var x = document.createElement("INPUT");
x.setAttribute("type", "number");
x.setAttribute("id", "betbutton");
x.setAttribute("min", "0.001");
x.setAttribute("step", "0.001");
x.setAttribute("value", "0.00");
x.setAttribute("max", "2");
x.setAttribute("onKeyPress", "return false;");
x.style.position = "absolute";
x.style.left = "78vw";
x.style.top = "65vh";
x.style.textAlign = "center";
x.style.border = "none";
x.style.outline = "none";
x.style.background = "transparent";
x.style.width = "270px";
x.style.borderRight = "50px"
x.style.height = "60px";
x.style.fontSize = "50px";
x.style.display = "none";
x.style.caretColor = 'transparent';
document.body.appendChild(x);
/*!
 *        
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas() {
    if (canvasContainer != undefined) {
        buttonSettings.x = (canvasW - offset.x) - 60;
        buttonSettings.y = offset.y + 45;

        var distanceNum = 90;
        if (curPage != 'game') {
            buttonExit.visible = false;
            buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;
            buttonSoundOn.x = buttonSoundOff.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + (distanceNum);

            buttonFullscreen.x = buttonSettings.x;
            buttonFullscreen.y = buttonSettings.y + (distanceNum * 2);
        } else {
            buttonExit.visible = true;
            buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;
            buttonSoundOn.x = buttonSoundOff.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + (distanceNum);

            buttonFullscreen.x = buttonSettings.x;
            buttonFullscreen.y = buttonSettings.y + (distanceNum * 2);

            buttonExit.x = buttonSettings.x;
            buttonExit.y = buttonSettings.y + (distanceNum * 3);
        }
    }
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
function removeGameCanvas() {
    stage.autoClear = true;
    stage.removeAllChildren();
    stage.update();
    createjs.Ticker.removeEventListener("tick", tick);
    createjs.Ticker.removeEventListener("tick", stage);
}

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */
function tick(event) {
    updateGame();
    stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj) {
    obj.regX = obj.image.naturalWidth / 2;
    obj.regY = obj.image.naturalHeight / 2;
}

function createHitarea(obj) {
    obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}