const click_play_period_apple = 30;
const scatter_apple = 1;
const click_play_period_spotify = 30;
const scatter_spotify = 1;
const click_next_apple = 30;
const scatter_next_apple = 30;
const click_next_spotify = 30;
const scatter_next_spotify = 30;
const refresh = 1;
const scatter_refresh = 1;

(async function () {

    window.click_play_period_apple =  click_play_period_apple ;
    window.scatter_apple =  scatter_apple ;
    window.click_play_period_spotify =  click_play_period_spotify;
    window.scatter_spotify =  scatter_spotify;

    window.click_next_apple =  click_next_apple;
    window.scatter_next_apple =  scatter_next_apple;

    window.click_next_spotify =  click_next_spotify;
    window.scatter_next_spotify =  scatter_next_spotify;

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

        infinitePlayApple();
        nextApple();

        infinitePlaySpotify();
        nextSpotify();

        refreshPage();
    } catch (e) {
        console.log(e);
    }
})();
