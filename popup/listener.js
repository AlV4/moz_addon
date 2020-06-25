const click_play_period_spotify = 30;
const click_play_period_apple = 30;
const click_next_apple = 30;
const click_next_spotify = 30;
const refresh = 1;

const scatter_apple = 10;
const scatter_spotify = 10;
const scatter_next_apple = 10;
const scatter_next_spotify = 10;

(async function () {

    window.click_play_period_spotify =  click_play_period_spotify;
    window.click_play_period_apple =  click_play_period_apple;
    window.scatter_apple =  scatter_apple;
    window.scatter_spotify =  scatter_spotify;
    window.click_next_apple =  click_next_apple;
    window.click_next_spotify =  click_next_spotify;
    window.scatter_next_apple =  scatter_next_apple;
    window.scatter_next_spotify =  scatter_next_spotify;

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
        const player = document.getElementsByClassName('web-chrome-playback-controls__main')[0] || false;
        const playerButton = player.children[1] || false;
        if (player && playerButton && playerButton.getAttribute('aria-label') === "Play") {
            playerButton.click();
           console.log("Apple music interval: " + window.click_play_period_apple + "seconds.");
        }
        if (playerButton && playerButton.getAttribute('disabled') === '') {
            bigPlayButton.click();
        }
    }

    function infinitePlaySpotify () {
        let playButton = document.getElementsByClassName('spoticon-play-16')[0];
        if (playButton !== undefined){
            playButton.click();
            console.log("Spotify interval: " + window.click_play_period_spotify + " seconds.");
        }
    }

    window.setInterval(infinitePlaySpotify, window.click_play_period_spotify * 1000);
    window.setInterval(infinitePlayApple, window.click_play_period_apple * 1000);

    window.setInterval(function(){window.location.reload();}, refresh * 60 * 1000);
})();
