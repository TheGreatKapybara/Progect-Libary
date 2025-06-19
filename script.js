const bookList = document.querySelector('.bookList');

const myLibary = [];


// Конструктор объекта книги
function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error('Напишите оператор "new" для вызова этой функции');
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    if (read == true) {
        this.read = 'Прочитано';
    }
    else {
        this.read = 'Пока не читал';
    }
    addBookToLibary(this)
}

const theHobbit = new Book('Хоббит', 'Толкин', 352, true);

const vsdfcsd = new Book('Война и мир', 'Толстой', 1360, true);

const vsdv = new Book('Морфий', 'Булгаков', 320, true);

//Выводим в консоль информацию о книге
Book.prototype.info = function() {
        console.log(`Книга называется - ${this.title} \nАвтор - ${this.author}\nСтраниц - ${this.pages}\n${this.read}`       
        )
    }

// Добавляем книгу в библиотеку
function addBookToLibary(newBook) {
    if (myLibary.length == 0) {
        myLibary[0] = newBook
    }
    myLibary[myLibary.length] = newBook
}


//Форма
// Собираем данные из формы
function checkForm(event) {
    event.preventDefault();
    const el = document.getElementById('mainForm');
    const bookName = el.bookName.value;
    const bookAuthor = el.bookAuthor.value;;
    const pagesCount = el.pagesCount.value;
    const isRead = el.isRead.checked;
    
    const createBook = new Book(bookName, bookAuthor, pagesCount, isRead);
    createBook.info();
    appendNewBook(myLibary.length-1);
}

document.getElementById('mainForm').addEventListener('submit', checkForm);

//Скрываем и показываем форму
function showMainForm() {
    const button = document.getElementById('newBookButton');
    const form = document.getElementById('mainForm');
    if (button.textContent == 'Добавить книгу') {
        button.textContent = 'Скрыть форму';
        form.style.display = 'block';
    } else {
        button.textContent = 'Добавить книгу';
        form.style.display = 'none';
    }
}


//Вывод книг на страницу
//Выводим книги из массива на страницу
showMyBooks();
function showMyBooks() {
    bookList.innerHTML = '';
    for (var key in myLibary) {
    appendNewBook(key);
    }
}

//Сорздаем блок книги
function appendNewBook(key) {
    const div = document.createElement('div');
    div.style.cssText = `
    background-color: red;
    width: 200px;
    `
    div.className = 'bookElement';
    div.innerHTML = `
    <h1>${myLibary[key].title}</h1>
    <h2>Автор - ${myLibary[key].author}</h2>
    <h2>Страниц - ${myLibary[key].pages}</h2>
    <button class="isRead" data-id="${key}">${myLibary[key].read}</button>
    <button class="deleteBtn" data-id="${key}">Удалить книгу</button>
    `;
    bookList.append(div);
    refreshDeleteList();
}






//кнопка "удалить"
refreshDeleteList()

//Удаление книги
function deleteTheBook(event) {
    const bookId = event.target.dataset.id;
    myLibary.splice(bookId, 1);
    showMyBooks();
    refreshDeleteList();
}

//Старт или перезагрузка обработчика кнопки "Удалить"
function refreshDeleteList() {
    const buttonDelete = document.querySelectorAll('.deleteBtn');
    buttonDelete.forEach(button => {
    button.addEventListener('click', deleteTheBook);
})
}


//Кнопка "Прочитано"
//Переключаем статус "Прочитано"/"Пока не читал"
Book.prototype.resetRead = function(event) {
    console.log('hui');
    const readId = event.target.dataset.id;
    if (myLibary[readId].read == 'Прочитано') {
        myLibary[readId].read = 'Пока не читал';
    }
    else {
        myLibary[readId].read = 'Прочитано';   
    }
   showMyBooks();
   refreshReadStatus();
}

refreshReadStatus();
//Старт или перезагрузка обработчика кнопки "Прочитано"
function refreshReadStatus() {
    const readStatus = document.querySelectorAll('.isRead');
    readStatus.forEach(button => {
    button.addEventListener('click', Book.prototype.resetRead);
})
}




