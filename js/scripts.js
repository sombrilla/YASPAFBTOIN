const themeColors = {
    home: '#0af',
    projects: 'red',
    contact: 'green'
};

const buttons = document.querySelectorAll('.navigation-list > li > a');

[...buttons].map(button => { button.addEventListener('click', handleNavigationButtonClick) });

window.onload = (event) => {
    startUp();
};

function removeHash(value) {
    return value.replace('#', '');
}

function startUp() {
    goToView(removeHash(window.location.hash) || 'home');
}

function handleNavigationButtonClick(event) {
    goToView(removeHash(event.target.hash) || 'home');
}

function goToView(view) {
    document.documentElement.style.setProperty('--theme-color', themeColors[view] || themeColors.home);
}