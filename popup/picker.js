'use strict';

const hostsInput =  document.querySelector("#hosts");
const codeInput =  document.querySelector("#code");
const codeArea =  document.querySelector("#code_area");
const userScriptIDInput =  document.querySelector("#userScriptID");
const lastErrorEl =  document.querySelector("#lastError");
const lastResultEl =  document.querySelector("#lastResult");

const refreshEl =  document.querySelector("#refresh");
const scatterRefreshEl =  document.querySelector("#scatter_refresh");

const clickPeriodAppleEl =  document.querySelector("#click_period_apple");
const clickScatterAppleEl =  document.querySelector("#scatter_apple");

const clickNextAppleEl =  document.querySelector("#click_next_apple");
const scatterNextAppleEl =  document.querySelector("#scatter_next_apple");

const clickPeriodSpotifyEl =  document.querySelector("#click_period_spotify");
const clickScatterSpotifyEl =  document.querySelector("#scatter_spotify");

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
        scatterRefresh,

        clickPeriodApple,
        clickScatterApple,

        clickNextApple,
        scatterNextApple,

        clickPeriodSpotify,
        clickScatterSpotify,

        clickNextSpotify,
        scatterNextSpotify

    } = params.lastSetValues || {};

    hostsInput.value = hosts ? hosts.join(",") : defaultHosts;
    codeInput.value = code ? code : defaultCode;
    userScriptIDInput.value = userScriptID ? userScriptID : defaultUserScriptID;

    refreshEl.value = refresh ? refresh : defaultClickPeriod;
    scatterRefreshEl.value = scatterRefresh ? scatterRefresh : defaultScatterPeriod;

    clickPeriodAppleEl.value = clickPeriodApple ? clickPeriodApple : defaultClickPeriod;
    clickScatterAppleEl.value = clickScatterApple ? clickScatterApple : defaultScatterPeriod;

    clickNextAppleEl.value = clickNextApple ? clickNextApple : defaultClickPeriod;
    scatterNextAppleEl.value = scatterNextApple ? scatterNextApple : defaultScatterPeriod;

    clickPeriodSpotifyEl.value = clickPeriodSpotify ? clickPeriodSpotify : defaultClickPeriod;
    clickScatterSpotifyEl.value = clickScatterSpotify ? clickScatterSpotify : defaultScatterPeriod;

    clickNextSpotifyEl.value = clickNextSpotify ? clickNextSpotify : defaultClickPeriod;
    scatterNextSpotifyEl.value = scatterNextSpotify ? scatterNextSpotify : defaultScatterPeriod;

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

function seconds (millis) {
    return millis * 1000;
}

function loadCode () {
    const scatter_apple = clickScatterAppleEl.value || defaultScatterPeriod;
    let click_play_period_apple = clickPeriodAppleEl.value || defaultClickPeriod;

    const scatter_spotify = clickScatterSpotifyEl.value || defaultScatterPeriod;
    let click_play_period_spotify = clickPeriodSpotifyEl.value || defaultClickPeriod;

    const scatter_next_apple = scatterNextAppleEl.value || defaultScatterPeriod;
    let click_next_apple = clickNextAppleEl.value || defaultClickPeriod;

    const scatter_next_spotify = scatterNextSpotifyEl.value || defaultScatterPeriod;
    let click_next_spotify = clickNextSpotifyEl.value || defaultClickPeriod;

    let refresh = refreshEl.value || defaultClickPeriod;
    refresh = seconds(refresh);
    let scatter_refresh = scatterRefreshEl.value || defaultScatterPeriod;
    scatter_refresh = seconds(scatter_refresh);

    return `(function () {

    window.click_play_period_apple =  `+ click_play_period_apple +`;
    window.scatter_apple =  `+ scatter_apple +`;
    window.click_play_period_spotify =  `+ click_play_period_spotify +`;
    window.scatter_spotify =  `+ scatter_spotify +`;
    window.click_next_apple =  `+ click_next_apple +`;
    window.scatter_next_apple =  `+ scatter_next_apple +`;
    window.click_next_spotify =  `+ click_next_spotify +`;
    window.scatter_next_spotify =  `+ scatter_next_spotify +`;
    window.refresh =  `+ refresh +`;
    window.scatter_refresh =  `+ scatter_refresh +`;

    window.allowReload = false;

    var randomInterval = function (interval, random) {
        let rand = Math.floor(Math.random() * random);
        return parseInt(interval) + rand;
    }

    try {

        var infinitePlayApple = function () {

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

            const player = document.getElementsByClassName('web-chrome-playback-controls__main')[0] || false;
            let playerButton = false;
            try {
                playerButton = player.children[1];
            } catch (e) {
            }
            if (player && playerButton && playerButton.getAttribute('aria-label') === "Play") {
                playerButton.click();
            }
            if (player && playerButton && playerButton.getAttribute('disabled') === '') {
                const bigPlayButton = document.getElementsByClassName('play-button action-button')[0];
                bigPlayButton.click();
            }
            let rand = randomInterval(click_play_period_apple, scatter_apple);
            console.log("Apple music interval: " + rand + " seconds.");
            setTimeout(infinitePlayApple, rand * 1000);
        }
        var nextApple = function () {
            const playerButtons = document.getElementsByClassName('web-chrome-playback-controls__main')[0] || false;
            if (playerButtons) {
                const next = playerButtons.children[2];
                if (next) {
                    next.click();
                }
            }
            let rand = randomInterval(click_next_apple, scatter_next_apple);
            console.log("Apple music next: " + rand + " seconds.");
            setTimeout(nextApple, rand * 1000);
        }

        var infinitePlaySpotify = function () {
            // Click on big green play button, it exists when album doesn't started yet
            for (let item of document.getElementsByTagName('button')) {
                if (56 === item.scrollWidth && "Play" === item.title){
                    item.click();
                }
            }
            let playButton = document.getElementsByClassName('spoticon-play-16')[0];
            if (playButton !== undefined) {
                playButton.click();
            }
            let rand = randomInterval(click_play_period_spotify, scatter_spotify);
            console.log("Spotify interval: " + rand + " seconds.");
            setTimeout(infinitePlaySpotify, rand * 1000);
        }
        var nextSpotify = function () {
            let skipButton = document.getElementsByClassName('spoticon-skip-forward-16')[0];
            if (skipButton !== undefined) {
                skipButton.click();
            }
            let rand = randomInterval(click_next_spotify, scatter_next_spotify);
            console.log("Spotify next: " + rand + " seconds.");
            setTimeout(nextSpotify, rand * 1000);
        }

        var refreshPage = function () {
            if (allowReload) {
                location.reload();
            }
            window.allowReload = true;
            let rand = randomInterval(refresh, scatter_refresh);
            setTimeout(refreshPage, rand * 60);
            rand = Math.round(rand / 1000);
            console.log("Reload rand: " + rand + " minutes");
        }

        if (location.href.indexOf('apple.com') !== -1) {
            infinitePlayApple();
            nextApple();
        }

        if (location.href.indexOf('spotify.com') !== -1) {
            infinitePlaySpotify();
            nextSpotify();
        }

        refreshPage();
    } catch (e) {
        console.log(e);
    }})();`;
}

function changedSettings() {
    codeInput.value = loadCode();
}

async function registerScript() {
    const params = {
        hosts: stringToArray(hostsInput.value),
        code: codeInput.value,
        userScriptID: userScriptID.value,

        refresh: refreshEl.value,
        scatterRefresh: scatterRefreshEl.value,

        clickPeriodApple: clickPeriodAppleEl.value,
        clickScatterApple: clickScatterAppleEl.value,

        clickNextApple: clickNextAppleEl.value,
        scatterNextApple: scatterNextAppleEl.value,

        clickPeriodSpotify: clickPeriodSpotifyEl.value,
        clickScatterSpotify: clickScatterSpotifyEl.value,

        clickNextSpotify: clickNextSpotifyEl.value,
        scatterNextSpotify: scatterNextSpotifyEl.value
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
document.querySelector("#scatter_refresh").addEventListener('change', changedSettings );

document.querySelector("#click_period_apple").addEventListener('change', changedSettings );
document.querySelector("#scatter_apple").addEventListener('change', changedSettings );

document.querySelector("#click_next_apple").addEventListener('change', changedSettings );
document.querySelector("#scatter_next_apple").addEventListener('change', changedSettings );

document.querySelector("#click_period_spotify").addEventListener('change', changedSettings );
document.querySelector("#scatter_spotify").addEventListener('change', changedSettings );

document.querySelector("#click_next_spotify").addEventListener('change', changedSettings );
document.querySelector("#scatter_next_spotify").addEventListener('change', changedSettings );