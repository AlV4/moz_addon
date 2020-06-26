'use strict';

const hostsInput =  document.querySelector("#hosts");
const codeInput =  document.querySelector("#code");
const codeArea =  document.querySelector("#code_area");
const userScriptIDInput =  document.querySelector("#userScriptID");
const lastErrorEl =  document.querySelector("#lastError");
const lastResultEl =  document.querySelector("#lastResult");

const refreshEl =  document.querySelector("#refresh");
const clickPeriodAppleEl =  document.querySelector("#click_period_apple");
const clickPeriodSpotifyEl =  document.querySelector("#click_period_spotify");
const clickScatterAppleEl =  document.querySelector("#scatter_apple");
const clickScatterSpotifyEl =  document.querySelector("#scatter_spotify");
const clickNextAppleEl =  document.querySelector("#click_next_apple");
const scatterNextAppleEl =  document.querySelector("#scatter_next_apple");
const clickNextSpotifyEl =  document.querySelector("#click_next_spotify");
const scatterNextSpotifyEl =  document.querySelector("#scatter_next_spotify");

const defaultClickPeriod = 30;
const defaultScatterPeriod = 1;

const defaultHosts = "*://music.apple.com/*,*://*.spotify.com/*";
const defaultCode = loadCode();
const defaultUserScriptID = "user_script";

hostsInput.value = defaultHosts;
codeInput.value = defaultCode;
userScriptIDInput.value = defaultUserScriptID;

async function loadLastSetValues() {
    const params = await browser.storage.local.get();

    const {
        hosts,
        code,
        userScriptID,
        refresh,
        clickPeriodSpotify,
        clickPeriodApple,
        clickScatterApple,
        scatterNextApple,
        clickNextApple,
        clickScatterSpotify,
        scatterNextSpotify,
        clickNextSpotify
    } = params.lastSetValues || {};

    hostsInput.value = hosts ? hosts.join(",") : defaultHosts;
    codeInput.value = code ? code : defaultCode;
    userScriptIDInput.value = userScriptID ? userScriptID : defaultUserScriptID;
    refreshEl.value = refresh ? refresh : defaultClickPeriod;
    clickPeriodSpotifyEl.value = clickPeriodSpotify ? clickPeriodSpotify : defaultClickPeriod;
    clickPeriodAppleEl.value = clickPeriodApple ? clickPeriodApple : defaultClickPeriod;
    clickScatterAppleEl.value = clickScatterApple ? clickScatterApple : defaultScatterPeriod;
    clickScatterSpotifyEl.value = clickScatterSpotify ? clickScatterSpotify : defaultScatterPeriod;
    scatterNextAppleEl.value = scatterNextApple ? scatterNextApple : defaultScatterPeriod;
    scatterNextSpotifyEl.value = scatterNextSpotify ? scatterNextSpotify : defaultScatterPeriod;
    clickNextAppleEl.value = clickNextApple ? clickNextApple : defaultClickPeriod;
    clickNextSpotifyEl.value = clickNextSpotify ? clickNextSpotify : defaultClickPeriod;

    lastErrorEl.textContent = params.lastError || "";
}

function stringToArray(value) {
    const res = value.split(",").map(el => el.trim()).filter(el => el !== "");

    return res.length > 0 ? res : null;
}

function editCode () {
    if (!codeArea.getAttribute('data-show')) {
        codeArea.setAttribute('style', 'display:block');
        codeArea.setAttribute('data-show', 'true');
    } else {
        codeArea.setAttribute('style', 'display:none');
        codeArea.removeAttribute('data-show');
    }
}

function rand (limit) {
    return Math.floor(Math.random() * limit);
}

function seconds (millis) {
    return millis * 1000;
}

function loadCode () {
    const scatter_apple = clickScatterAppleEl.value || defaultScatterPeriod;
    let click_play_period_apple = clickPeriodAppleEl.value || defaultClickPeriod;
    click_play_period_apple = seconds(parseInt(click_play_period_apple) + rand(scatter_apple));

    const scatter_spotify = clickScatterSpotifyEl.value || defaultScatterPeriod;
    let click_play_period_spotify = clickPeriodSpotifyEl.value || defaultClickPeriod;
    click_play_period_spotify = seconds(parseInt(click_play_period_spotify) + rand(scatter_spotify));

    const scatter_next_apple = scatterNextAppleEl.value || defaultScatterPeriod;
    let click_next_apple = clickNextAppleEl.value || defaultClickPeriod;
    click_next_apple = seconds(parseInt(click_next_apple) + rand(scatter_next_apple));

    const scatter_next_spotify = scatterNextSpotifyEl.value || defaultScatterPeriod;
    let click_next_spotify = clickNextSpotifyEl.value || defaultClickPeriod;
    click_next_spotify = seconds(parseInt(click_next_spotify) + rand(scatter_next_spotify));

    let refresh = refreshEl.value || defaultClickPeriod;
    refresh = seconds(refresh);
    return `(async function () {

    window.click_play_period_spotify =  `+ click_play_period_spotify +`;
    window.click_play_period_apple =  `+ click_play_period_apple +`;
    window.click_next_apple =  `+ click_next_apple +`;
    window.click_next_spotify =  `+ click_next_spotify +`;
    window.refresh =  `+ refresh +`;
    

    function infinitePlayApple () {
        const bigPlayButton = document.getElementsByClassName('play-button action-button')[0];

        const controlButtons = document.getElementsByClassName('web-chrome-playback-controls__directionals')[0] || false;
        if (controlButtons) {
            const shuffle = controlButtons.children[0];
            const repeat = controlButtons.children[2];
            if (shuffle.getAttribute('aria-checked') === "false") {
                setTimeout(function () {
                    shuffle.click();
                }, 1000);
            }
            if (repeat.getAttribute('aria-checked') === "false") {
                setTimeout(function () {
                    repeat.click();
                }, 1000);
            }
        }    
        const playerButtons = document.getElementsByClassName('web-chrome-playback-controls__main')[0] || false;
        if (playerButtons) {
            const next = playerButtons.children[2];
            setTimeout(function () {
                next.click();
            }, window.click_next_apple);
        }
 
        const player = document.getElementsByClassName('web-chrome-playback-controls__main')[0] || false;
        const playerButton = player.children[1] || false;
        if (player && playerButton && playerButton.getAttribute('aria-label') === "Play") {
            playerButton.click();
           console.log("Apple music interval: " + Math.round(window.click_play_period_apple/1000) + "seconds.");
        }
        
        if (playerButton && playerButton.getAttribute('disabled') === '') {
            bigPlayButton.click();
        }
    }

    function infinitePlaySpotify () {
        let playButton = document.getElementsByClassName('spoticon-play-16')[0];
        if (playButton !== undefined){
            playButton.click();
            console.log("Spotify interval: " + Math.round(window.click_play_period_spotify/1000) + " seconds.");
        }
        document.getElementById('close_btn_rateus').click();
    }

    window.setInterval(infinitePlaySpotify, window.click_play_period_spotify);
    window.setInterval(infinitePlayApple, window.click_play_period_apple);

    window.setInterval(function(){window.location.reload();}, window.refresh * 60);
})();`;
}

function changedSettings() {
    codeInput.value = loadCode();
}

async function registerScript() {
    const params = {
        hosts: stringToArray(hostsInput.value),
        code: codeInput.value,
        userScriptID: userScriptID.value,

        clickScatterApple: clickScatterAppleEl.value,
        clickPeriodApple: clickPeriodAppleEl.value,

        scatterNextApple: scatterNextAppleEl.value,
        clickNextApple: clickNextAppleEl.value,

        clickScatterSpotify: clickScatterSpotifyEl.value,
        clickPeriodSpotify: clickPeriodSpotifyEl.value,

        scatterNextSpotify: scatterNextSpotifyEl.value,
        clickNextSpotify: clickNextSpotifyEl.value
    };

    // Store the last submitted values to the extension storage
    // (so that they can be restored when the popup is opened
    // the next time).
    await browser.storage.local.set({
        lastSetValues: params,
    });

    try {
        // Clear the last userScripts.register result.
        lastResultEl.textContent = "";

        await browser.runtime.sendMessage(params);
        lastResultEl.textContent = "Script successfully registered";
        // Clear the last userScripts.register error.
        lastErrorEl.textContent = "";

        // Clear the last error stored.
        await browser.storage.local.remove("lastError");
    } catch (e) {
        // There was an error on registering the contentScript,
        // let's show the error message in the popup and store
        // the last error into the extension storage.

        const lastError = `${e}`;
        // Show the last userScripts.register error.
        lastErrorEl.textContent = lastError;

        // Store the last error.
        await browser.storage.local.set({lastError});
    }

    browser.tabs.executeScript({
        code: `window.location.reload();`
    });
}

loadLastSetValues();

document.querySelector("#register").addEventListener('click', registerScript);
document.querySelector("#code_field").addEventListener('click', editCode );
document.querySelector("#refresh").addEventListener('change', changedSettings );
document.querySelector("#click_period_apple").addEventListener('change', changedSettings );
document.querySelector("#click_period_spotify").addEventListener('change', changedSettings );

document.querySelector("#scatter_apple").addEventListener('change', changedSettings );
document.querySelector("#scatter_spotify").addEventListener('change', changedSettings );
document.querySelector("#click_next_apple").addEventListener('change', changedSettings );
document.querySelector("#scatter_next_apple").addEventListener('change', changedSettings );
document.querySelector("#click_next_spotify").addEventListener('change', changedSettings );
document.querySelector("#scatter_next_spotify").addEventListener('change', changedSettings );
