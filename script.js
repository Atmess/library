(() => {    
const yearstime = document.getElementById('year');
const monthtime = document.getElementById('month');
const daytime = document.getElementById('day');
const datetime = document.getElementById('date-time');
const now = new Date()
yearstime.textContent = now.getFullYear(); 
monthtime.textContent = now.toLocaleString('default', { month: 'short' }) ;
daytime.textContent = now.toLocaleString('default', { weekday: 'short' }) ;
datetime.textContent = now.getDate();
})();
(() => {  
    const toggleBtn = document.getElementById('sidebarbtn');
    const sidebar = document.getElementById('sidebar');
                toggleBtn.addEventListener('click', function() {
                // Toggle the 'open' class on the sidebar
                sidebar.classList.toggle('open');
                // Listen for a click on the button
                });   

    const HeaderBtn = document.getElementById('headerbarbtn');
    const header = document.getElementById('headerbar');
                HeaderBtn.addEventListener('click', function() {
                // Toggle the 'open' class on the sidebar
                header.classList.toggle('open');
                // Listen for a click on the button
                });   

})();
(() => {  
const bookform= document.getElementById('book-form');
const coverpool = [
    "picture/cover evil twin.jpg" ,
    "picture/cover live twin ki-sikil frost.jpg",
    "picture/cover evil twin.jpg" ,
    "picture/cover ki-sikil deal.png", 
    "picture/cover live twin ki-sikil frost.jpg", 
    "picture/cover live twin ki-sikil.jpg", 
    "picture/cover live twin lil la sweet.jpg", 
    "picture/cover live twin lil-la treat.jpg", 
    "picture/cover-live-twin lil la.jpg",
]
let mylibrary=[];
bookform.addEventListener('submit', function(event){
    event.preventDefault();
    addtolibrary();
});

function savelocal(){
    localStorage.setItem('savedlibrary' , JSON.stringify(mylibrary));
}

function loadlocal(){
    const data= localStorage.getItem('savedlibrary');
    if (data){
        const parsedData = JSON.parse(data);
        
        // Re-create them as actual Book class instances
        mylibrary = parsedData.map(item => {
            const restoredBook = new Book(item.title, item.author, item.page, item.read, item.cover);
            restoredBook.id = item.id; // Keep the original ID!
            return restoredBook;
        
    });displaylibrary();
}
}

class Book{ 
    #read;
    constructor(title,author,page,read,cover){       
    this.title = title;
    this.author= author;
    this.page=page ;
    this.#read=read;
    this.cover=cover;
    this.id=crypto.randomUUID();
}
    toJSON() {
        return {
            title: this.title,
            author: this.author,
            page: this.page,
            read: this.#read, // exposes the private field for saving
            cover: this.cover,
            id: this.id
        };
    }

    readstatus(read){
        this.#read=!this.#read;
    }

    get read(){
        return this.#read;
    }
}
function addtolibrary(){
    const titleValue = document.getElementById('title').value;
    const authorValue = document.getElementById('author').value;
    const pageValue = document.getElementById('page').value;
    const readValue  = document.getElementById('read').checked;

    //// 3. Pick a random index from your local pool right here, ONCE
    const randomIndex= Math.floor(Math.random()* coverpool.length);
    const chosenCover = coverpool[randomIndex];

    const newBook = new Book(titleValue , authorValue,pageValue,readValue,chosenCover);
    if (titleValue.trim() === "" || authorValue.trim() === "") {
        alert("Please enter a title and author!");
        return;
    }
    mylibrary.push(newBook);

    savelocal();
    displaylibrary();
    bookform.reset();
}

function displaylibrary(booktorender = mylibrary){
    const booklist = document.getElementById('book-list');

    booklist.innerHTML="";

    for (let i=0; i<booktorender.length; i++){
        let Currentbook= booktorender[i];
        
        const Bookcard =document.createElement('div');
        Bookcard.classList.add('bookcard');

// 2. THE FIX: Add a linear-gradient (the dark tint) right before the image URL
        Bookcard.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${Currentbook.cover}')`;
        Bookcard.style.backgroundSize = "cover";
        Bookcard.style.backgroundPosition = "center";

// 3. THE FIX: Change all the text inside this specific card to white
Bookcard.style.color = "white";
        const idElement = document.createElement('p');
        // Let's make the text slightly smaller or different so it looks like a system ID
        idElement.style.fontSize = "12px"; 
        idElement.style.color = "gray";
        idElement.textContent = "ID: " + Currentbook.id;

        const removebtn=document.createElement('button');
        removebtn.textContent="Remove Book";
        removebtn.classList.add('remove-btn');

        removebtn.addEventListener('click', function(){
            removebook(Currentbook.id);
        })
        const titleElement = document.createElement('h3');
        titleElement.textContent = Currentbook.title;

        const authorElement = document.createElement('p');
        authorElement.textContent="by " + Currentbook.author;

        const pageElement = document.createElement('p');
        pageElement.textContent=Currentbook.page +" pages" ;

        const readElement = document.createElement('p');
        readElement.textContent = Currentbook.read ?"status : read" : "status :Not read";
        // If the book is read, add a green border!

        const togglebtn= document.createElement('button');
        togglebtn.textContent="change status";
        togglebtn.classList.add('toggle-btn');

        togglebtn.addEventListener('click', function(){
            toggleread(Currentbook.id);
        });

        if (Currentbook.read) {
            Bookcard.style.border = "3px solid #4CAF50"; // Green
            togglebtn.textContent = "Mark as Unread";
        } else {
            Bookcard.style.border = "3px solid #f44336"; // Red
            togglebtn.textContent = "Mark as Read";
        }


        if (mylibrary.length === 0) {
        booklist.innerHTML = "<h2 style='color: white;'>Your library is empty. Add a book to get started!</h2>";
        return; // Stops the rest of the function from running
    }
        Bookcard.appendChild(idElement);
        Bookcard.appendChild(titleElement);
        Bookcard.appendChild(authorElement);
        Bookcard.appendChild(pageElement);
        Bookcard.appendChild(readElement);
        Bookcard.appendChild(removebtn);
        booklist.appendChild(Bookcard);
        Bookcard.appendChild(togglebtn);

    }  
}
function removebook(bookid){
    const index = mylibrary.findIndex(Book=>Book.id === bookid);
    mylibrary.splice(index ,1);
    savelocal();
    displaylibrary();
}
function toggleread(bookid){
     const book = mylibrary.find(book=>book.id === bookid);
     book?.readstatus();
     savelocal();
     displaylibrary();
}

const searcbar = document.getElementById('searc-bar');

function cleantext(text){
    return text.toLowerCase().replace(/[^a-z0-9]/gi, '');
}


searcbar.addEventListener('input', function(event) {
    // 1. Get whatever the user just typed and make it lowercase
    const searchString = cleantext(event.target.value);

    // 2. Filter the library array
    const filteredBooks = mylibrary.filter(book => {
            const cleantitle= cleantext(book.title);
            const cleanauthor=cleantext(book.author);

            return cleantitle.includes(searchString)||
                   cleanauthor.includes(searchString);
             
    });

    // 3. Send the filtered list to your updated display function
    displaylibrary(filteredBooks);
});





loadlocal();
})();



