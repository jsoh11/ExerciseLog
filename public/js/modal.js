const createBtn = document.querySelector('#create-btn');
const modalBg = document.querySelector('.modal-background');
const cancelBtn = document.querySelector('#cancel-btn');
const deleteBtn = document.querySelector('#delete-btn');
const modal = document.querySelector('.modal');


createBtn.addEventListener('click', () => {
    modal.classList.add('is-active');
});

cancelBtn.addEventListener('click', () => {
    modal.classList.remove('is-active');
});

deleteBtn.addEventListener('click', () => {
    modal.classList.remove('is-active');
});