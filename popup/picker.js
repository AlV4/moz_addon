document.addEventListener("click", function(e) {
    if (!e.target.classList.contains("site-choice")) {
        return;
    }

    alert(browser.tabs);
    // var chosenPage = "https://" + e.target.textContent;
    // browser.tabs.create({
    //     url: chosenPage
    // });

});