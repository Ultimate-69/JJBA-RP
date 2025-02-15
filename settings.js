const erase = document.querySelector('.erase');

erase.addEventListener('click', () => {
    localStorage.clear();
});