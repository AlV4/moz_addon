const click_play_period_spotify = 30;
const click_play_period_apple = 30;
const click_next_apple = 30;
const click_next_spotify = 30;
const refresh = 1;

(async function () {

    window.click_play_period_apple =  click_play_period_apple ;
    window.click_play_period_spotify =  click_play_period_spotify;

    window.click_next_apple =  click_next_apple;

    window.click_next_spotify =  click_next_spotify;

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
    }

    window.setInterval(infinitePlaySpotify, window.click_play_period_spotify);
    window.setInterval(infinitePlayApple, window.click_play_period_apple);

    window.setInterval(function(){window.location.reload();}, refresh * 60);
})();
