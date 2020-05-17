const click_period_spotify = 30;
const click_period_apple = 30;
const refresh = 1;

(async function () {

    window.setInterval(function(){window.location.reload();}, refresh * 60 * 1000);

    window.click_period_spotify =  click_period_spotify;
    window.click_period_apple =  click_period_apple;

    function infinitePlayApple () {
        const bigPlayButton = document.getElementsByClassName('play-button action-button')[0];

        const controlButtons = document.getElementsByClassName('web-chrome-playback-controls__directionals')[0] || false;
        if (controlButtons) {
            const shuffle = controlButtons.children[0];
            const repeat = controlButtons.children[2];
            if (shuffle.getAttribute('aria-checked') === "false") {
                shuffle.click();
            }
            if (repeat.getAttribute('aria-checked') === "false") {
                repeat.click();
            }
        }     
        const player = document.getElementsByClassName('web-chrome-playback-controls__main')[0] || false;
        const playerButton = player.children[1] || false;
        if (player && playerButton && playerButton.getAttribute('aria-label') === "Play") {
            playerButton.click();
           console.log("Apple music interval: " + window.click_period_apple + "seconds.");
        }
        if (playerButton && playerButton.getAttribute('disabled') === '') {
            bigPlayButton.click();
        }
    }

    function infinitePlaySpotify () {
        let playButton = document.getElementsByClassName('spoticon-play-16')[0];
        if (playButton !== undefined){
            playButton.click();
            console.log("Spotify interval: " + window.click_period_spotify + "seconds.");
        }
    }

    window.setInterval(infinitePlaySpotify, window.click_period_spotify * 1000);
    window.setInterval(infinitePlayApple, window.click_period_apple * 1000);
})();
