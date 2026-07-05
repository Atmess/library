const yearstime = document.getElementById('year');
const yeartime = document.getElementById('years');
const monthtime = document.getElementById('month');
const daytime = document.getElementById('day');
const datetime = document.getElementById('date-time');
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
const mylibrary=[];

yearstime.textContent = new Date().getFullYear(); 
yeartime.textContent = new Date().getFullYear(); 
monthtime.textContent = new Date().toLocaleString('default', { month: 'short' }) ;
daytime.textContent = new Date().toLocaleString('default', { weekday: 'short' }) ;
datetime.textContent = new Date().getDate();

bookform.addEventListener('submit', function(event){
    event.preventDefault();
    addtolibrary();
});


function Book(title,author,page,read,cover){
    this.title = title;
    this.author= author;
    this.page=page ;
    this.read=read;
    this.cover=cover;
    this.id=crypto.randomUUID();
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

        //for backgrond image book
      const randomNum = Math.floor(Math.random() * 1000);

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
