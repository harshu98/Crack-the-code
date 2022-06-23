////////////////////////////////////////////////////////////
// GAME v1.7
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */

var bgColour = "#0e1a2a"; //background colour
var scoreTextColour = '#00ffff'; //score text colour
var inputTextColour = '#00ffff'; //number text colour
var inputWidth = 120; //number width
var inputSpace = 20; //number space
var textCredit = "[NUMBER]"; //credit text display
var inputCorrectColour = '#16E733'; //correct number indicator colour
var inputWrongColour = '#ffff73'; //wrong number indicator colour
var inputRemoveColour = '#999999'; //remove number indicator colour
var inputTriedText = 'TRIED:[NUMBER]'; //pin number tried text
var timernumber = '0:[NUMBER]';
var instructionFadeTimer = 5000; //instruction display time, default is 5sec
var postData = {};
var timerSpeedDefault = 850; //default timer value, default is 1 sec 850
var timerSpeedIncrease = 150; //timer increase value each round
var timerBarDecreaseValue = 1; //timer bar decrease value
var bonusArray = [10, 3, 1.5, 1.25, 0.8, 0.5]; //User money calculation
var SOL;
var inputAlertDelaySpeed = 500; //number colour indicator display speed
var inputAlertFadeSpeed = 300; //number colour indicator fade speed
var alarmSoundEnable = true; //enable alarm sound
var alarmSoundInitValue = 40; //minimum timer bar value to play alarm sound, default 40 of 100 percent of timer bar
var alarmSoundTimer = 1000; //alarm sound speed, default 1 sec

var gameScore = 15; //access granted game score

var backgroundMusic = true; //play background music

var exitMessage = 'Are you sure you want\nto quit the game?'; //quit game message

//Social share, [SCORE] will replace with game score
var shareEnable = false; //toggle share
var shareText = 'SHARE IT NOW'; //text for share instruction
var shareTitle = 'Highscore on PIN Cracker is [SCORE]'; //social share score title
var shareMessage = '[SCORE] is mine new highscore on PIN Cracker! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
var gameValue = { timer: 0, score: 0, tried: 0, timerSpeed: 0, array: '', excludeArray: '', pin: '', history: [] };
var gamePaused = false;
var numbers_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var totalInputs = 4;
var inputDisable = false;
var paid;
/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
var buttonClickCon = true;

function Notify(text) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(text);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(text);
            }
        });
    }
}

function buildGameButton() {
    for (n = 0; n < numbers_arr.length; n++) {
        $.buttons['button' + n].cursor = "pointer";
        $.buttons['button' + n].addEventListener("mousedown", function(evt) {
            if (!inputDisable && paid)
                inputNumber(evt.currentTarget.name);
        });
    }
    btnStart.cursor = "pointer";
    btnStart.addEventListener("mousedown", function(evt) {
        const phantomWallet = cryptoUtils.phantomWallet;
        if (!phantomWallet.isConnected) {
            phantomWallet.connectWallet()
                .then(x => {
                    if (x) {
                        phantomWallet.getBalance().then(x => {
                            const balance = (x / solanaWeb3.LAMPORTS_PER_SOL).toFixed(10);
                            this.gameCredit = balance;
                            myStr = phantomWallet.walletPubkey()
                            walletId.text = myStr.substr(0, 4) + '******' + myStr.substr(myStr.length - 4, myStr.length);
                            txtCredit.text = textCredit.replace('[NUMBER]', balance);
                            goPage('game');
                            Notify("Fetched Balance from Wallet");
                        }).catch(err => Notify("Not able to fetch Balance from Wallet, Please refresh the page"));
                    }
                })
        } else {
            phantomWallet.getBalance().then(x => {
                this.gameCredit = x / solanaWeb3.LAMPORTS_PER_SOL;
                myStr = phantomWallet.walletPubkey()
                walletId.text = myStr.substr(0, 4) + '******' + myStr.substr(myStr.length - 4, myStr.length);
                txtCredit.text = textCredit.replace('[NUMBER]', x / solanaWeb3.LAMPORTS_PER_SOL);
                goPage('game');
                Notify("Fetched Balance from Wallet");
            }).catch(err =>
                Notify("Not able to fetch Balance from Wallet, Please refresh the page")
            )
        }
    });

    buttonReplay.cursor = "pointer";
    buttonReplay.addEventListener("mousedown", function(evt) {
        timtxt.text = timernumber.replace('[NUMBER]', "00");
        paid = false;
        goPage('main');
        document.getElementById("betbutton").disabled = false
    });
    buttonReplay1.cursor = "pointer";
    buttonReplay1.addEventListener("mousedown", function(evt) {
        timtxt.text = timernumber.replace('[NUMBER]', "00");
        paid = false;
        goPage('main');
        document.getElementById("betbutton").disabled = false
    });

    btnFacebook.cursor = "pointer";
    btnFacebook.addEventListener("click", function(evt) {
        share('facebook');
    });
    btnTwitter.cursor = "pointer";
    btnTwitter.addEventListener("click", function(evt) {
        share('twitter');
    });
    btnWhatsapp.cursor = "pointer";
    btnWhatsapp.addEventListener("click", function(evt) {
        share('whatsapp');
    });

    //confirm
    buttonConfirm.cursor = "pointer";
    buttonConfirm.addEventListener("click", function(evt) {
        playSound('soundClick');
        toggleConfirm(false);
        stopGame(true);
        goPage('main');
    });

    buttonCancel.cursor = "pointer";
    buttonCancel.addEventListener("click", function(evt) {
        playSound('soundClick');
        toggleConfirm(false);
    });

    //options
    buttonSoundOff.cursor = "pointer";
    buttonSoundOff.addEventListener("click", function(evt) {
        toggleGameMute(true);
    });

    buttonSoundOn.cursor = "pointer";
    buttonSoundOn.addEventListener("click", function(evt) {
        toggleGameMute(false);
    });

    buttonFullscreen.cursor = "pointer";
    buttonFullscreen.addEventListener("click", function(evt) {
        toggleFullScreen();
    });

    buttonSettings.cursor = "pointer";
    buttonSettings.addEventListener("click", function(evt) {
        toggleOption();
    });

    buttonExit.cursor = "pointer";
    buttonExit.addEventListener("click", function(evt) {
        toggleConfirm(true);
        toggleOption();
    });

    buttonsubmit.cursor = "pointer";
    buttonsubmit.addEventListener("click", function(evt) {
        const bet = document.getElementById("betbutton").value;
        if (bet == 0) { return; };
        document.getElementById("gif").style.display = "block";
        // console.log(bet);
        createtrnasc(bet);
    })

    buttonclear.cursor = "pointer";
    buttonclear.addEventListener("click", function(evt) {
        if (focusInput > 0) {
            focusInput--;
            $.input['number' + focusInput].text = '';
        }
    })
}
async function createtrnasc(bet) {
    const phantomWallet = cryptoUtils.phantomWallet;
    await phantomWallet.requestTransaction(Number(bet)).then(result => {
        {
            transbet = {
                "walletID": phantomWallet.wallet_pubkey,
                "gameName": "CRACK THE CODE",
                "userTransactionID": result,
                "typeOfPlay": "SOL",
                "betAmount": bet,
            };
            // console.log(transbet);
            SOL = bet;
            Notify("Transaction Successful");
            document.getElementById("gif").style.display = "none";
            document.getElementById("betbutton").disabled = true
            buttonsubmit.visible = false;
            paid = true;
            initGameTimer();
        }
    }).catch((err) => {
        Notify("Please Approve Transaction");
        document.getElementById("gif").style.display = "none";
        paid = false;

        buttonsubmit.visible = true;
    });
}
/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage = ''

function goPage(page) {
    curPage = page;

    mainContainer.visible = false;
    gameContainer.visible = false;
    resultContainer.visible = false;
    resultContainer1.visible = false;
    stopAnimate(screenReflect);
    stopSound();

    var targetContainer = ''
    switch (page) {
        case 'main':

            document.getElementById("betbutton").style.display = "none";
            if (backgroundMusic) {
                playSound('musicMain', true);
            }
            // $(digitTop)
            //     .clearQueue()
            //     .stop(true, true)
            //     .animate({ y: canvasW / 100 * 8 }, 500);

            // $(digitBottom)
            //     .clearQueue()
            //     .stop(true, true)
            //     .animate({ y: canvasW / 100 * 67 }, 500);

            targetContainer = mainContainer;
            // btnStart.visible = false;
            // btn1.visible = true;
            // btn2.visible = true;
            // btn3.visible = true;
            break;

        case 'game':
            if (backgroundMusic) {
                playSound('musicGame', true);
            }
            playSound('soundMachineOn');
            buttonsubmit.visible = true;
            document.getElementById("betbutton").style.display = "block";
            // $(digitTop)
            //     .clearQueue()
            //     .stop(true, true)
            //     .animate({ y: canvasW / 100 * -8 }, 500);

            // $(digitBottom)
            //     .clearQueue()
            //     .stop(true, true)
            //     .animate({ y: canvasW / 100 * 58 }, 500);

            animateScreen(screenReflect);

            targetContainer = gameContainer;
            startGame();
            break;

        case 'result':
            document.getElementById("betbutton").style.display = "none";
            stopGame();
            if (backgroundMusic) {
                playSound('musicMain', true);
            }
            // [10, 3, 1.5, 1.25, 0.8, 0.5]; 
            playSound('soundMachineOff');
            let amount = 0;
            if (gameValue.score > 0) {
                switch (gameValue.tried) {
                    case 0:
                        amount = SOL * bonusArray[0];
                        break;
                    case 1:
                        amount = SOL * bonusArray[1];
                        break;
                    case 2:
                        amount = SOL * bonusArray[2];
                        break;
                    case 3:
                        amount = SOL * bonusArray[3];
                        break;
                    case 4:
                        amount = SOL * bonusArray[4];
                        break;
                    case 5:
                        amount = SOL * bonusArray[5];
                        break;
                    default:
                        amount = SOL * 0;
                }
            }
            textFinalScoreDisplay.text = `${Math.round(amount * 10000) / 10000} SOL`;
            saveGame(gameValue.score, amount);

            // $(digitTop)
            //     .clearQueue()
            //     .stop(true, true)
            //     .animate({ y: canvasW / 100 * -2 }, 500);

            // $(digitBottom)
            //     .clearQueue()
            //     .stop(true, true)
            //     .animate({ y: canvasW / 100 * 65 }, 500);
            if (amount > 0) {
                targetContainer = resultContainer;
            } else {
                targetContainer = resultContainer1;
            }
            break;
    }

    targetContainer.alpha = 0;
    targetContainer.visible = true;

    $(targetContainer)
        .clearQueue()
        .stop(true, true)
        .animate({ alpha: 1 }, 500);

    resizeCanvas()
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame() {
    // console.log("start game");
    gameValue.timerSpeed = timerSpeedDefault;
    gameValue.score = 0;
    gamePaused = false;

    createNewPin();
    updateTimerBar();
    updateScoreBar('reset');
    fadeInstruction();
}

/*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame() {
    // console.log("stopped");
    gamePaused = true;
    clearFadeInstruction();
    stopGameTimer();
    stopAlarm();
}

/*!
 *
 * SAVE GAME - This is the function that runs to save game
 *
 */
function saveGame(score, amount) {
    // console.log("Saving game");
    // console.log(gameValue);
    if (typeof toggleScoreboardSave == 'function') {
        $.scoreData.score = score;
        if (typeof type != 'undefined') {
            $.scoreData.type = type;
        }
        toggleScoreboardSave(true);
    }
    postData = {
            ...transbet,
            "timer": gameValue.timer,
            "tried": gameValue.tried,
            "pin": gameValue.pin,
            "amountWon": amount,
            "timerSpeed": gameValue.timerSpeed,
            "gameResult": amount > 0 ? "WIN" : "LOSS",
            "amountLost": amount >= transbet['betAmount'] ? 0 : Number(transbet['betAmount'] - amount),
            'amountPaid': (amount - (amount * 0.015)),
        }
        // console.log(postData);
    axios.post(`${DB_URL}/api/crackCode`, {
        ...postData
    });
    /*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}


/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 
 */
function aniamteButton(obj) {
    obj.alpha = 0;
    $(obj)
        .animate({ alpha: 1 }, 500)
        .animate({ alpha: 0 }, 500, function() {
            aniamteButton(obj);
        });
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimate(obj) {
    obj.alpha = 0;
    $(obj)
        .clearQueue()
        .stop(true, true);
}

/*!
 * 
 * START ANIMATE SCREEN - This is the function that runs to play screen blinking animation
 * 
 */
function animateScreen(obj) {
    obj.alpha = 0;

    var randomAlpha = (Math.random() * 5) * .1;
    randomAlpha += .2;
    var randomSpeed = (Math.random() * 5) * 100;

    $(obj)
        .animate({ alpha: randomAlpha }, randomSpeed)
        .animate({ alpha: 0 }, randomSpeed, function() {
            animateScreen(obj);
        });
}

/*!
 * 
 * GAME INSTRUCTION - This is the function that runs to display game instruction
 * 
 */
var instructionInterval = null;

function fadeInstruction() {
    textInstruction.alpha = 1;
    textEnter.alpha = 0;

    instructionInterval = setInterval(function() {
        $(textInstruction)
            .clearQueue()
            .stop(true, false)
            .animate({ alpha: 0 }, 500);

        $(textEnter)
            .clearQueue()
            .stop(true, false)
            .animate({ alpha: 1 }, 500);
        clearFadeInstruction();
    }, instructionFadeTimer);
}

function clearFadeInstruction() {
    clearInterval(instructionInterval);
    textInstruction.alpha = 0;
}

/*!
 * 
 * CREATE NEW PIN - This is the function that runs to create new pin
 * 
 */
function createNewPin() {
    // console.log("new pin created");
    stopAlarm();
    gameValue.tried = 0;
    gameValue.history = [];
    gameValue.array = numbers_arr.slice();
    shuffle(gameValue.array);
    for (n = gameValue.array.length; n >= totalInputs; n--) {
        gameValue.array.splice(n, 1);
    }
    gameValue.pin = String(gameValue.array[0]) + String(gameValue.array[1]) + String(gameValue.array[2]) + String(gameValue.array[3]);
    resetInputBar();
    removeInputHistory();
    updatePinTried();
    inputDisable = false;

    gameValue.timerSpeed -= timerSpeedIncrease;
    gameValue.timer = 100;
    // initGameTimer();
}

/*!
 * 
 * GAME TIMER - This is the function that runs to start game timer
 * 
 */
var gameTimerInterval = null;

function initGameTimer() {
    stopGameTimer();
    updateGameTimer();
}

function updateGameTimer() {
    // console.log("game timer");
    gameTimerInterval = setInterval(function() {
        if (!gamePaused) {
            gameValue.timer -= timerBarDecreaseValue;
            timtxt.text = timernumber.replace('[NUMBER]', gameValue.timer);
            updateTimerBar();
            stopGameTimer();

            if (gameValue.timer <= alarmSoundInitValue && alarmSoundEnable) {
                initAlarm();
            }

            if (gameValue.timer <= 0) {
                goPage('result');
            } else {
                updateGameTimer();
            }
        }
    }, gameValue.timerSpeed);
}

function stopGameTimer() {
    clearInterval(gameTimerInterval);
}

/*!
 * 
 * GAME TIMER BAR - This is the function that runs to display game timer bar
 * 
 */
function updateTimerBar() {
    // console.log("updateTimerBar")
    screenTimerMask.graphics.clear();
    screenTimerMask.graphics.beginFill("black");

    screenTimerAlertMask.graphics.clear();
    screenTimerAlertMask.graphics.beginFill("black");

    var barWidth = screenTimer.image.naturalWidth;
    var barHeight = screenTimer.image.naturalHeight;
    var startX = screenTimer.x;
    var startY = screenTimer.y + barHeight;
    var percent = (gameValue.timer / 100) * barHeight;
    screenTimerMask.graphics.moveTo(startX, startY).lineTo(startX, startY - (percent)).lineTo(startX + barWidth, startY - (percent)).lineTo(startX + barWidth, startY).lineTo(startX, startY);
    screenTimerAlertMask.graphics.moveTo(startX, startY).lineTo(startX, startY - (percent)).lineTo(startX + barWidth, startY - (percent)).lineTo(startX + barWidth, startY).lineTo(startX, startY);
}

/*!
 * 
 * GAME SCORE - This is the function that runs to display game score
 * 
 */
function updateScore() {
    // console.log("updateScore")
    var newScore = gameValue.score + gameScore;
    $(gameValue).clearQueue().stop().animate({
        score: newScore
    }, {
        duration: 200,
        step: function() {
            updateScoreText();
        },
        complete: function() {
            updateScoreBar();
        }
    });

    for (n = 0; n < totalInputs; n++) {
        $.input['number' + n].text = '';
    }

    $(screenAccessGranted)
        .animate({ alpha: 1 }, 500)
        .animate({ alpha: 1 }, 1300, function() {
            // createNewPin();
            goPage("result")
        });
    // console.log(gameValue);

}

/*!
 * 
 * GAME SCORE TEXT - This is the function that runs to display game score text
 * 
 */
function updateScoreText() {
    gameValue.score = Math.round(gameValue.score);
    screenScoreText.text = formatScores(gameValue.score, 3);
}

/*!
 * 
 * GAME SCORE BAR - This is the function that runs to display game score bar
 * 
 */
function updateScoreBar(con) {
    var endY = canvasH / 100 * 23;
    var startY = canvasH / 100 * 42;

    if (con == 'reset') {
        scoreBar1.y = scoreBar2.y = scoreBar3.y = startY;
    }

    var scoreDisplay = screenScoreText.text;
    for (n = 0; n < scoreDisplay.length; n++) {
        var number = Number(scoreDisplay.substring(n, n + 1));
        var percent = Math.round(number / 9 * (startY - endY));
        $(this['scoreBar' + (n + 1)])
            .animate({ y: startY - percent }, 500);
    }
}

/*!
 * 
 * RESET INPUT NUMBERS - This is the function that runs to reset input numbers
 * 
 */
function resetInputBar() {
    // console.log("reset input number")
    var resetSpeed = 200;
    focusInput = 0;
    for (n = 0; n < totalInputs; n++) {
        $.input['number' + n].text = '';
        $($.input['barDefault' + n])
            .animate({ alpha: 0 }, resetSpeed);

        $($.input['barWrong' + n])
            .animate({ alpha: 0 }, resetSpeed);

        $($.input['barRemove' + n])
            .animate({ alpha: 0 }, resetSpeed);

        $($.input['barCorrect' + n])
            .animate({ alpha: 0 }, resetSpeed);
    }
    screenAccessGranted.alpha = 0;
    textEnter.alpha = 1;
}

/*!
 * 
 * INSERT INPUT NUMBER - This is the function that runs to insert input number
 * 
 */
function inputNumber(num) {
    playSound('soundButton');

    if (focusInput == 0) {
        resetInputBar();
    }
    clearFadeInstruction();
    textEnter.alpha = 0;
    $.input['number' + focusInput].text = num;
    focusInput++;
    if (focusInput == totalInputs) {
        inputDisable = true;
        focusInput = 0;
        checkInputNumber();
    }
}

/*!
 * 
 * MATCH INPUT NUMBERS - This is the function that runs to match input numbers
 * 
 */
var targetBar1 = '';
var targetBar2 = '';
var targetBar3 = '';
var targetBar4 = '';

function checkInputNumber() {
    // console.log('Checking input number');
    targetBar1 = '';
    targetBar2 = '';
    targetBar3 = '';
    targetBar4 = '';
    gameValue.excludeArray = gameValue.array.slice();

    var correctNum = 0;
    //get correct number
    for (n = 0; n < totalInputs; n++) {
        var curInputNumber = Number($.input['number' + n].text);
        if ($.input['number' + n].text == gameValue.pin.substring(n, n + 1)) {
            this['targetBar' + (n + 1)] = $.input['barCorrect' + n];
            gameValue.excludeArray.splice(gameValue.excludeArray.indexOf(curInputNumber), 1);
            correctNum++;
        }
    }

    //get wrong number
    for (n = 0; n < totalInputs; n++) {
        var curInputNumber = Number($.input['number' + n].text);
        if (gameValue.excludeArray.indexOf(curInputNumber) != -1) {
            this['targetBar' + (n + 1)] = $.input['barWrong' + n];
            gameValue.excludeArray.splice(gameValue.excludeArray.indexOf(curInputNumber), 1);
        }
    }

    //get remove number
    for (n = 0; n < totalInputs; n++) {
        var curInputNumber = Number($.input['number' + n].text);
        if (this['targetBar' + (n + 1)] == '') {
            this['targetBar' + (n + 1)] = $.input['barRemove' + n];
        }
    }

    $(targetBar1)
        .animate({ alpha: 0 }, 0, function() {
            playIndicatorSound(targetBar1);
        })
        .animate({ alpha: 1 }, inputAlertFadeSpeed)

    $(targetBar2)
        .animate({ alpha: 0 }, inputAlertDelaySpeed, function() {
            playIndicatorSound(targetBar2);
        })
        .animate({ alpha: 1 }, inputAlertFadeSpeed)

    $(targetBar3)
        .animate({ alpha: 0 }, inputAlertDelaySpeed * 2, function() {
            playIndicatorSound(targetBar3);
        })
        .animate({ alpha: 1 }, inputAlertFadeSpeed)

    $(targetBar4)
        .animate({ alpha: 0 }, inputAlertDelaySpeed * 3, function() {
            playIndicatorSound(targetBar4);
            if (correctNum == totalInputs) {
                stopGameTimer();
            }
        })
        .animate({ alpha: 1 }, inputAlertFadeSpeed, function() {
            inputDisable = false;
            if (correctNum == totalInputs) {
                playSound('soundAccessGranted');
                updateScore();
            } else {
                playSound('soundAccessDenied');
                insertInputHistory();
                displayInputHistory();
            }
        });
}

function playIndicatorSound(obj) {
    if (obj.name == 'correct') {
        playSound('soundIndicatorCorrect');
    } else if (obj.name == 'remove') {
        playSound('soundIndicatorRemove');
    } else if (obj.name == 'wrong') {
        playSound('soundIndicatorWrong');
    }
}

/*!
 * 
 * INPUT NUMBER HISTORY - This is the function that runs to insert input number log list
 * 
 */
function insertInputHistory() {
    var pinCode = '';
    var pinStatus = '';
    for (n = 0; n < totalInputs; n++) {
        pinCode += String($.input['number' + n].text);
        pinStatus += this['targetBar' + (n + 1)].name + ',';
    }
    gameValue.history.push({ pin: pinCode, status: pinStatus });
    if (gameValue.history.length > 5) {
        gameValue.history.splice(0, 1);
    }

    gameValue.tried++;
    updatePinTried();
}

function displayInputHistory() {
    removeInputHistory();

    var startX = 0;
    var startY = 0;
    var inputHistoryWidth = 40;
    var inputHistoryHeight = 40;
    for (n = 0; n < gameValue.history.length; n++) {
        var pin = gameValue.history[n].pin;
        var status = gameValue.history[n].status.split(",");
        startX = 50;
        for (p = 0; p < pin.length; p++) {
            var inputColour = '';
            if (status[p] == 'correct') {
                inputColour = inputCorrectColour;
            } else if (status[p] == 'wrong') {
                inputColour = inputWrongColour;
            } else if (status[p] == 'remove') {
                inputColour = inputRemoveColour;
            } else {
                inputColour = inputTextColour;
            }
            $.inputHistory[String(n) + String(p)] = new createjs.Text();
            $.inputHistory[String(n) + String(p)].font = "40px hackedregular";
            $.inputHistory[String(n) + String(p)].color = inputColour;
            $.inputHistory[String(n) + String(p)].text = pin.substring(p, p + 1);
            $.inputHistory[String(n) + String(p)].textAlign = "center";
            $.inputHistory[String(n) + String(p)].textBaseline = 'alphabetic';
            $.inputHistory[String(n) + String(p)].x = startX;
            $.inputHistory[String(n) + String(p)].y = startY;
            startX += inputHistoryWidth;
            inputHistoryContainer.addChild($.inputHistory[String(n) + String(p)]);
        }
        startY += inputHistoryHeight;
    }
}

function removeInputHistory() {
    inputHistoryContainer.removeAllChildren();
}

function updatePinTried() {
    screenTriedText.text = inputTriedText.replace('[NUMBER]', gameValue.tried);
}


/*!
 * 
 * ALARM - This is the function that runs to toggle alarm sound
 * 
 */
var alarmInterval = null;
var alarmInit = false;

function initAlarm() {
    if (!alarmInit) {
        stopAlarm();
        alarmInit = true;
        screenTimerAlert.alpha = 1;
        updateAlarm();
        aniamteButton(screenTimerAlert);
    }
}

function updateAlarm() {
    clearInterval(alarmInterval);
    alarmInterval = setInterval(function() {
        playSound('soundAlarm');
    }, alarmSoundTimer);
}

function stopAlarm() {
    stopAnimate(screenTimerAlert);
    alarmInit = false;
    screenTimerAlert.alpha = 0;
    clearInterval(alarmInterval);
}

function updateGame() {

}

/*!
 * 
 * CONFIRM - This is the function that runs to toggle confirm
 * 
 */
function toggleConfirm(con) {
    confirmContainer.visible = con;
    gamePaused = con;
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption() {
    if (optionsContainer.visible) {
        optionsContainer.visible = false;
    } else {
        optionsContainer.visible = true;
    }
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameMute(con) {
    buttonSoundOff.visible = false;
    buttonSoundOn.visible = false;
    toggleMute(con);
    if (con) {
        buttonSoundOn.visible = true;
    } else {
        buttonSoundOff.visible = true;
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action) {
    gtag('event', 'click', { 'event_category': 'share', 'event_label': action });

    var loc = location.href
    loc = loc.substring(0, loc.lastIndexOf("/") + 1);
    var title = shareTitle.replace("[SCORE]", gameValue.score);
    var text = shareMessage.replace("[SCORE]", gameValue.score);
    var shareurl = '';

    if (action == 'twitter') {
        shareurl = 'https://twitter.com/intent/tweet?url=' + loc + '&text=' + text;
    } else if (action == 'facebook') {
        shareurl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(loc + 'share.php?desc=' + text + '&title=' + title + '&url=' + loc + '&thumb=' + loc + 'share.jpg&width=590&height=300');
    } else if (action == 'google') {
        shareurl = 'https://plus.google.com/share?url=' + loc;
    } else if (action == 'whatsapp') {
        shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
    }

    window.open(shareurl);
}