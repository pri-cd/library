const DEBUG = true;
const ID_SYMBOL = "#";
const ID_BTN_ADD_BOOK = "add-book-btn";
const ID_DIA_ADD_BOOK = "dialog-add-book";
const ID_BTN_CLOS_DIA = "close-dialogue";
const ID_BTN_SBMT = "submit";

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
function openDialog(event) {
    const dialog = document.querySelector(ID_SYMBOL + ID_DIA_ADD_BOOK);
    const closeDiaButton = document.querySelector(ID_SYMBOL + ID_BTN_CLOS_DIA);

    if (event instanceof Event) {
        if (dialog instanceof HTMLDialogElement) {
            dialog.showModal();

            closeDiaButton.addEventListener('click', (event) => {
                dialog.close();
            });
        }
    }
}

/**
 * Handle submitting of the form..
 * @param {Event} event 
 */
function submitButton_handler(event) {
    event.preventDefault();
    const title = document.querySelector("input[id='title']").value;
    const authr = document.querySelector("input[id='author']").value;
    const pages = document.querySelector("input[id='pages']").value;

    const target = event.target;
    if (target instanceof HTMLElement)
    {
        const dialog = target.closest(ID_SYMBOL + ID_DIA_ADD_BOOK);
        dialog.close();
    }
}

/**
 * This function registers: 'Add book' and, 'submit' button..
 * @param 
 */
function registerEvents() {
    const addBookButton = document.querySelector(ID_SYMBOL + ID_BTN_ADD_BOOK);
    const submitButton = document.querySelector(ID_SYMBOL + ID_BTN_SBMT);

    addBookButton.addEventListener('click', openDialog);
    submitButton.addEventListener('click', submitButton_handler);
}

registerEvents();