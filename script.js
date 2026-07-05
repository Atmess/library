const yeartime = document.getElementById('year');
const monthtime = document.getElementById('month');
const daytime = document.getElementById('day');
const datetime = document.getElementById('date-time');
const bookform= document.getElementById('book-form');
const mylibrary=[];


yeartime.textContent = new Date().getFullYear(); 
monthtime.textContent = new Date().toLocaleString('default', { month: 'short' }) ;
daytime.textContent = new Date().toLocaleString('default', { weekday: 'short' }) ;
datetime.textContent = new Date().getDate();

bookform.addEventListener('submit', function(event){
    event.preventDefault();
    addtolibrary();
});


function Book(title,author,page,read){
    this.title = title;
    this.author= author;
    this.page=page ;
    this.read=read;
    this.id=crypto.randomUUID();
}

function addtolibrary(){
    const titleValue = document.getElementById('title').value;
    const authorValue = document.getElementById('author').value;
    const pageValue = document.getElementById('page').value;
    const readValue  = document.getElementById('read').checked;

    const newBook = new Book(titleValue , authorValue,pageValue,readValue);
    mylibrary.push(newBook);
    displaylibrary();
}

function displaylibrary(){
    const booklist = document.getElementById('book-list');

    booklist.innerHTML="";

    for (let i=0; i<mylibrary.length; i++){
        let Currentbook= mylibrary[i];
        
        const Bookcard =document.createElement('div');
        Bookcard.classList.add('bookcard');

        const idElement = document.createElement('p');
        // Let's make the text slightly smaller or different so it looks like a system ID
        idElement.style.fontSize = "12px"; 
        idElement.style.color = "gray";
        idElement.textContent = "ID: " + Currentbook.id;

        const titleElement = document.createElement('h3');
        titleElement.textContent = Currentbook.title;

        const authorElement = document.createElement('p');
        authorElement.textContent="by " + Currentbook.author;

        const pageElement = document.createElement('p');
        pageElement.textContent=Currentbook.page +" pages" ;

        const readElement = document.createElement('p');
        readElement.textContent = Currentbook.read ?"status : read" : "status :Not read";
        
        Bookcard.appendChild(idElement);
        Bookcard.appendChild(titleElement);
        Bookcard.appendChild(authorElement);
        Bookcard.appendChild(pageElement);
        Bookcard.appendChild(readElement);

        booklist.appendChild(Bookcard);

    }
}
