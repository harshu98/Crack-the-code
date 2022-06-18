////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

/*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload() {
    toggleLoader(true);

    checkMobileEvent();

    $(window).resize(function() {
        resizeGameFunc();
    });
    resizeGameFunc();

    loader = new createjs.LoadQueue(false);
    manifest = [{ src: 'assets/digit_tiles.png', id: 'digitTiles' },
        { src: 'assets/logo.png', id: 'logo' },
        { src: 'assets/btn_can.png', id: 'btn1' },
        { src: 'assets/btn_conf.png', id: 'btn2' },
        { src: 'assets/btn_cont.png', id: "btn3" },
        { src: 'assets/button_start.png', id: 'btnStart' },
        { src: 'assets/button_number.png', id: 'buttonNumber' },
        { src: 'assets/screen_accessgranted.png', id: 'screenAccessGranted' },
        { src: 'assets/screen_default.png', id: 'screenDefault' },
        { src: 'assets/screen_reflect.png', id: 'screenReflect' },
        { src: 'assets/screen_scorebar.png', id: 'screenScoreBar' },
        { src: 'assets/screen_timer.png', id: 'screenTimer' },
        { src: 'assets/screen_timer_alert.png', id: 'screenTimerAlert' },
        { src: 'assets/bar_default.png', id: 'barDefault' },
        { src: 'assets/bar_wrong.png', id: 'barWrong' },
        { src: 'assets/bar_correct.png', id: 'barCorrect' },
        { src: 'assets/bar_remove.png', id: 'barRemove' },
        { src: 'assets/text_enter.png', id: 'textEnter' },
        { src: 'assets/text_instruction.png', id: 'textInstruction' },
        { src: 'assets/textFinalScore.png', id: 'textFinalScore' },
        { src: 'assets/textShare.png', id: 'textShare' },

        { src: 'assets/button_replay.png', id: 'btnReplay' },
        { src: 'assets/button_facebook.png', id: 'btnFacebook' },
        { src: 'assets/button_twitter.png', id: 'btnTwitter' },
        { src: 'assets/button_whatsapp.png', id: 'btnWhatsapp' },

        { src: 'assets/button_submit.png', id: 'buttonsubmit' },
        { src: 'assets/bettxt.png', id: 'bettxt' },
        { src: 'assets/betslot.png', id: 'betslot' },
        { src: 'assets/timer.png', id: 'timerpng' },
        { src: 'assets/wallet.png', id: 'wallet' },
        { src: 'assets/credit.png', id: 'creditspanel' },
        { src: 'assets/bg.jpg', id: 'bg' },
        { src: 'assets/score_slot.png', id: 'scoreslot' },
        { src: 'assets/win_popup.png', id: 'winpopup' },
        { src: 'assets/quit_popup.png', id: 'itemExit' },

        { src: 'assets/button_confirm.png', id: 'buttonConfirm' },
        { src: 'assets/button_cancel.png', id: 'buttonCancel' },
        // { src: 'assets/item_exit.png', id: 'itemExit' },
        { src: 'assets/button_fullscreen.png', id: 'buttonFullscreen' },
        { src: 'assets/button_sound_on.png', id: 'buttonSoundOn' },
        { src: 'assets/button_sound_off.png', id: 'buttonSoundOff' },
        { src: 'assets/button_exit.png', id: 'buttonExit' },
        { src: 'assets/button_settings.png', id: 'buttonSettings' },

        { src: 'assets/bg1.png', id: 'bg1' },
        { src: 'assets/lose_popup.png', id: 'losspopup' },
        { src: 'assets/button_replay1.png', id: 'btnReplay1' },
    ];

    if (typeof addScoreboardAssets == 'function') {
        addScoreboardAssets();
    }

    soundOn = true;
    if ($.browser.mobile || isTablet) {
        if (!enableMobileSound) {
            soundOn = false;
        }
    }

    if (soundOn) {
        manifest.push({ src: 'assets/sounds/musicMain.ogg', id: 'musicGame' });
        manifest.push({ src: 'assets/sounds/musicGame.ogg', id: 'musicMain' });
        manifest.push({ src: 'assets/sounds/press.ogg', id: 'soundButton' });
        manifest.push({ src: 'assets/sounds/access_denied.ogg', id: 'soundAccessDenied' });
        manifest.push({ src: 'assets/sounds/access_granted.ogg', id: 'soundAccessGranted' });
        manifest.push({ src: 'assets/sounds/machine_off.ogg', id: 'soundMachineOff' });
        manifest.push({ src: 'assets/sounds/machine_on.ogg', id: 'soundMachineOn' });
        manifest.push({ src: 'assets/sounds/alarm.ogg', id: 'soundAlarm' });
        manifest.push({ src: 'assets/sounds/notification_wrong.ogg', id: 'soundIndicatorWrong' });
        manifest.push({ src: 'assets/sounds/notification_correct.ogg', id: 'soundIndicatorCorrect' });
        manifest.push({ src: 'assets/sounds/notification_remove.ogg', id: 'soundIndicatorRemove' });

        createjs.Sound.alternateExtensions = ["mp3"];
        loader.installPlugin(createjs.Sound);
    }

    loader.addEventListener("complete", handleComplete);
    loader.addEventListener("fileload", fileComplete);
    loader.addEventListener("error", handleFileError);
    loader.on("progress", handleProgress, this);
    loader.loadManifest(manifest);
}
/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
    var item = evt.item;
    //console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
    console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
    $('#mainLoader').html(Math.round(loader.progress / 1 * 100) + '%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
    toggleLoader(false);
    initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con) {
    if (con) {
        $('#mainLoader').show();
    } else {
        $('#mainLoader').hide();
    }
}