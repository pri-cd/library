const DEBUG = true;
const ID_BTN_ADD_BOOK = "#add-book-btn";
const ID_BOOK_GRID = "#book-grid";

const ID_DIALOG = "#dialog-box";
const ID_BTN_DIA_SUB = "#submit";
const ID_BTN_DIA_CLS = "#close-dialogue";

const ID_INP_DIA_TITLE = "input[id='title']";
const ID_INP_DIA_AUTHOR = "input[id='author']";
const ID_INP_DIA_PAGES = "input[id='pages']";

const ARTCL_TITLE_CON = "#title-content";
const ARTCL_AUTHOR_CON = "#author-content";
const ARTCL_PAGES_CON = "#pages-content";

const ID_ARTCL_READ_LBL = "#read-label";
const ARTCL_READ_INP = "input[type='checkbox']";
const ID_ARTCL_DELT_BTN = "#delete-book";

const ID_ARTCL_BOOK = "#article-book";
const ID_ARTCL_BOOK_ = "article-book";

const ARTCL_HTML =
    `<div class="book-title-cn">
        <span class="title-label sLabel">Title:</span>
        <span class="title-content" id="title-content"></span>
    </div>

    <div class="book-authr-cn">
        <span class="author-label sLabel">Author:</span>
        <span class="author-content" id="author-content"></span>
    </div>
    
    <div class="book-pages-cn">
        <span class="pages-label sLabel">Pages:</span>
        <span class="pages-content" id="pages-content"></span>
    </div>
    
    <div class="book-read-cn">
        <label class="read-label sLabel" id="read-label">Read</label>
        <input type="checkbox">
    </div>
    
    <button class="delete-book" id="delete-book">Delete</button>`;


const allBooks = [];

function debug(...args) {
    if (DEBUG === true) {
        console.log(...args);
    }
}

function book(author, title, pages) {
    if (!new.target) {
        debug("Please use 'new' with book.");
        return;
    }

    this.ID = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false; /** Comes by default, can be ticked later! */
}

/**
 * Deletes a Book Entry!
 * @param {Event} event 
 */
function handleDeleteEvent(event) {
    if (event.target instanceof HTMLElement) {
        event.target.parentElement.remove();
    }
}

/**
 * 
 * @param {Event} event 
 */
function handleCheckEvent(event) {

    if (event.target instanceof HTMLInputElement) {
        const getBook = event.target.closest(ID_ARTCL_BOOK);
        const uuid = getBook.getAttribute('data-uuid');

        const foundBook = allBooks.find((value, index, array) => {
            if (value instanceof book) {
                return value.ID === uuid;
            }
        });

        if (foundBook instanceof book) {
            foundBook.read = event.target.checked;
        }
    }

    debug(allBooks);
}

/**
 * 
 * @param {book} newBook 
 */
function createBookDOM(newBook) {
    const article = document.createElement('article');

    article.classList.add(ID_ARTCL_BOOK_);
    article.id = ID_ARTCL_BOOK_;

    article.dataset.uuid = newBook.ID;
    article.innerHTML = ARTCL_HTML;

    article.querySelector(ARTCL_TITLE_CON).textContent = newBook.title;
    article.querySelector(ARTCL_AUTHOR_CON).textContent = newBook.author;
    article.querySelector(ARTCL_PAGES_CON).textContent = newBook.pages;


    const readLabel = article.querySelector(ID_ARTCL_READ_LBL);
    const deleteBtn = article.querySelector(ID_ARTCL_DELT_BTN);
    const readInput = article.querySelector(ARTCL_READ_INP);

    readLabel.setAttribute("for", ("read-" + newBook.ID));
    readInput.id = "read-" + newBook.ID;

    deleteBtn.addEventListener('click', handleDeleteEvent);
    readInput.addEventListener('click', handleCheckEvent);
    return article;
}
/**
 * This will insert the respective 'book' into the grid.
 * @param {book} book 
 */
function insertBook(book) {
    const book_grid = document.querySelector(ID_BOOK_GRID);
    debug(book_grid);
    book_grid.appendChild(createBookDOM(book));
}

/**
 * Handle the dialog for 'Adding book' event.
 * @param {Event} event 
*/
function openDialog(event) {
    const dialog = document.querySelector(ID_DIALOG);
    const closeDiaButton = document.querySelector(ID_BTN_DIA_CLS);

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
    const title = document.querySelector(ID_INP_DIA_TITLE).value;
    const author = document.querySelector(ID_INP_DIA_AUTHOR).value;
    const pages = document.querySelector(ID_INP_DIA_PAGES).value;

    const target = event.target;
    if (target instanceof HTMLElement) {
        const dialog = target.closest(ID_DIALOG);
        dialog.close();
    }

    const newBook = new book(author, title, pages);
    allBooks.push(newBook);

    document.querySelector(ID_INP_DIA_TITLE).value = "";
    document.querySelector(ID_INP_DIA_AUTHOR).value = "";
    document.querySelector(ID_INP_DIA_PAGES).value = "";
    insertBook(newBook);
}

/**
 * This function registers: 'Add book' and, 'submit' button..
 */
function registerEvents() {
    const addBookButton = document.querySelector(ID_BTN_ADD_BOOK);
    const submitButton = document.querySelector(ID_BTN_DIA_SUB);

    addBookButton.addEventListener('click', openDialog);
    submitButton.addEventListener('click', submitButton_handler);

}

registerEvents();