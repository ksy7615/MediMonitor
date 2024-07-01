function toggleBox() {
    var toggleBox = document.getElementById('toggle-box');
    var mainPanel = document.getElementById('main-panel');

    if (toggleBox.classList.contains('active')) {
        toggleBox.classList.remove('active');
        mainPanel.classList.remove('shifted');
    } else {
        toggleBox.classList.add('active');
        mainPanel.classList.add('shifted');
    }
}