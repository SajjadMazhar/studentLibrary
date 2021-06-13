class Library{

    

    constructor(bookList){

        this.bookList = bookList;

    }

    

    getBookList(category){

        this.bookList[category].forEach(book => {

        

            console.log(book);

            

        });

    }

    issueBook(catagory, bookName, user){

        for (let userName in Library.issuedEntries){

            if (userName == user){

                Library.issuedEntries[user].push(bookName);

                this.delElm(catagory, bookName);

                return 'issued!';

            }

        }    

        Library.issuedEntries[user] = [];

        Library.issuedEntries[user].push(bookName);

        this.delElm(catagory, bookName);

        return 'issued!';

        

    }

    returnBook(catagory, bookName, user){

        if (this.bookList[catagory].includes(bookName)){

            return "You have alraedy returned it!";

        }

        else{

            for (let entryName in Library.issuedEntries){

                if (entryName == user){

                    for (let i = 0; i<Library.issuedEntries[entryName].length; i++){

                        if (Library.issuedEntries[entryName][i] == bookName){

                            delete Library.issuedEntries[entryName].splice(i, 1);

                            this.bookList[catagory].push(bookName)

                            return 'returned!'

                        }

                    }

                }

            }

        }

    }

    delElm(catagory, bookName){

        let index = this.bookList[catagory].indexOf(bookName);

        this.bookList[catagory].splice(index, 1);

    }

}

Library.constructor.prototype.issuedEntries = {};

booksWithCategory = {

    Arts: ["History", "Pility", "Music", "Literature"],

    Computer: ["Python", "BASIC", "C++", "Java"],

    Science: ["Physics", "Chemistry", "Mathematics", "Geography"]

};

bookShelves = new Library(booksWithCategory);
