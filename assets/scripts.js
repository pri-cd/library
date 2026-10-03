const DEBUG = true;
const ID_SYMBOL = "#";
const ID_BTN_ADD_BOOK = "add-book";
const ID_DIA_ADD_BOOK = "dialog-add-book";
const ID_BTN_CLOS_DIA = "close-dialogue";

function debug(...args) {
    if (DEBUG === true) {
        console.log(...args);
    }
}

function createBook(author, title, pages) {
    if (!new.target) {
        debug("Please use 'new' with createBook.");
        return;
    }
    this.ID = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
}

/**
 * Handle the dialog for 'Adding book' event.
 * @param {Event} event 
 */
function addBookButton_handler(event) {
    const dialog = document.querySelector(ID_SYMBOL + ID_DIA_ADD_BOOK);
    const closeDiaButton = document.querySelector(ID_SYMBOL + ID_BTN_CLOS_DIA);

    if (dialog instanceof HTMLDialogElement) {
        dialog.showModal();
        closeDiaButton.addEventListener('click', () => {
            dialog.close();
        });
    }

}

function registerEvents() {
    const addBookButton = document.querySelector(ID_SYMBOL + ID_BTN_ADD_BOOK);
    addBookButton.addEventListener('click', addBookButton_handler);
}

registerEvents();