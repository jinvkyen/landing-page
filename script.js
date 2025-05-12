document.body.classList.add('scissors-open');

document.addEventListener('click', () => {
    document.body.classList.toggle('scissors-open');
    document.body.classList.toggle('scissors-close');
})