class Library {

    constructor(bookList) {
        this.bookList = bookList;
        this.bookName = document.getElementById("bookName");
        this.user = document.getElementById("user");
        this.addButton = document.querySelector("#add");
        this.retButton = document.querySelector("#return");
        this.availBooks = document.getElementById("availBooks");
        this.issuedBooks = document.getElementById("issuedBooks");
        this.issuedUser = document.getElementById("issuedUsers");
        this.issuedEntries = {
            Arts: [],
            Computer: [],
            Science: []
        };
        this.issuers = {};

        this.addButton.addEventListener("click", e => {
            e.preventDefault();

            if (document.getElementById("science").checked) {
                this.inputCat = document.getElementById("science").value;
            }
            else if (document.getElementById("arts").checked) {
                this.inputCat = document.getElementById("arts").value;
            }
            else if (document.getElementById("computer").checked) {
                this.inputCat = document.getElementById("computer").value;
            }
            else {
                return "Select a category!";
            }
            console.log(this.bookName.value, this.inputCat);
            this.populateIssuedList(this.bookName.value, this.inputCat);
            this.issueUser(this.user.value, this.bookName.value); // this will add the user and book name into the list named 'Issued Users'

        });

        this.retButton.addEventListener("click", e => {
            e.preventDefault();

            if (document.getElementById("science").checked) {
                this.inputCat = document.getElementById("science").value;
            }
            else if (document.getElementById("arts").checked) {
                this.inputCat = document.getElementById("arts").value;
            }
            else if (document.getElementById("computer").checked) {
                this.inputCat = document.getElementById("computer").value;
            }
            else {
                return "Select a category!";
            }
            console.log(this.bookName.value, this.user.value, this.inputCat);
            this.returnBook(this.bookName.value, this.inputCat);
            this.delUser(this.user.value, this.bookName.value); // this will take the user name and book and delete the entry from the table 'Issued User'
        });
    }

    returnBook(bookName, category) {
        if (this.issuedEntries[category].includes(bookName)) {
            this.delIssued(category, bookName); // Deleting the book from issuedEntries 
            this.bookList[category].push(bookName); // Returning the book into bookList
            this.availBooks.innerHTML += `<tr>
                                            <td>${bookName}</td>
                                            <td>${category}</td>
                                        </tr>`;

        }
        else {
            console.log("You have alraedy returned it!");

        }
    }

    delIssued(category, bookName) {
        let index = this.issuedEntries[category].indexOf(bookName);
        this.issuedEntries[category].splice(index, 1);
        this.issuedBooks.innerHTML = ''
        for (let cat in this.issuedEntries) { // removing the user and the book form the table 'Issued User'
            this.issuedEntries[cat].forEach(book => {
                this.issuedBooks.innerHTML += `<tr>
                                                <td>${book}</td>
                                                <td>${cat}</td>
                                            </tr>`;
            })
        }
    }

    delElm(catagory, bookName) {
        let index = this.bookList[catagory].indexOf(bookName);
        this.bookList[catagory].splice(index, 1);
    }

    populateAvailBooks() {
        for (let cat in this.bookList) {
            this.bookList[cat].forEach(book => {
                this.availBooks.innerHTML += `<tr>
                                                <td>${book}</td>
                                                <td>${cat}</td>
                                            </tr>`;
            })
        }

    }
    populateIssuedList(bookName, category) {
        if (this.bookList[category].includes(bookName)) {
            this.issuedEntries[category].push(bookName);
            let issue;
            issue = `<tr>
                        <td>${bookName}</td>
                        <td>${category}</td>
                    </tr>`;

            this.issuedBooks.innerHTML += issue;
            this.delElm(category, bookName); // this will delete the book from bookList
            this.availBooks.innerHTML = '';
            this.populateAvailBooks();
        }
        else {
            console.log("This book is already issued by someone!");
        }

    }

    issueUser(user, book) {
        if (this.issuers[user] == undefined) {
            this.issuers[user] = [];
        }

        this.issuers[user].push(book);
        this.issuedUser.innerHTML += `<tr>
                                        <td>${user}</td>
                                        <td>${book}</td>
                                    </tr>`;
    }

    delUser(user, book) {
        let index = this.issuers[user].indexOf(book);
        this.issuers[user].splice(index, 1);
        this.issuedUser.innerHTML = "";
        for (let name in this.issuers) {
            this.issuers[name].forEach(updated => {
                this.issuedUser.innerHTML += `<tr>
                                                <td>${name}</td>
                                                <td>${updated}</td>
                                            </tr>`;
            })
        }

    }
}


booksWithCategory = {
    Arts: ["History", "Pility", "Music", "Literature"],
    Computer: ["Python", "BASIC", "C++", "Java"],
    Science: ["Physics", "Chemistry", "Mathematics", "Geography"]
};

bookShelves = new Library(booksWithCategory);
bookShelves.populateAvailBooks()