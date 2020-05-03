function infinitePlay () {
    let playButton = document.getElementsByClassName('spoticon-play-16')[0];
    if (playButton !== undefined){
        playButton.click();
    }
}
window.setInterval(infinitePlay, 1000);
