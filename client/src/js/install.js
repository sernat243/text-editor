const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();

    deferredPrompt = event;

    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();

        const choiceResult = await deferredPrompt.userChoice;

        deferredPrompt = null;

        if (choiceResult.outcome === 'accepted') {
            console.log('PWA installation accepted');
        } else {
            console.log('PWA installation cancelled');
        }
    }

    butInstall.style.display = 'none';
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA installed succesfully');
});
