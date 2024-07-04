document.getElementById('message-icon').addEventListener('click', function(event) {
    event.stopPropagation();
    document.getElementById('message-dropdown').classList.toggle('show');
});

document.getElementById('user-text').addEventListener('click', function(event) {
    event.stopPropagation();
    document.getElementById('user-dropdown').classList.toggle('show');
});

document.getElementById('user-icon').addEventListener('click', function(event) {
    event.stopPropagation();
    document.getElementById('user-dropdown').classList.toggle('show');
});

window.onclick = function(event) {
    if (!event.target.matches('.icon')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};