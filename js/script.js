const API_KEY = "AIzaSyD86fvY_zKTdo3bujQWJFIZoHVejiXUFA0";
let page = "";
let nextP;
let prevP;
/* temporal */
function fetchVideos( searchTerm ){
    let url = `https://www.googleapis.com/youtube/v3/search?&part=snippet&key=${API_KEY}&q=${searchTerm}&maxResults=10&type=video&pageToken=${page}`
    let settings = {
        method : 'GET'
    };
    fetch(url, settings )
        .then(response => {
            if(response.ok){
                console.log(response);
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            console.log(responseJSON);
            displayResults( responseJSON );
            nextPage( responseJSON );
            prevPage( responseJSON );
        })
        .catch( err => {
            console.log(err)
        })
}
function displayResults (data){
    let results = document.querySelector('.results');
    results.innerHTML = "";
    page = data.etag;
    console.log(data.items.length);
    for ( let i = 0;  i < data.items.length; i++){
        results.innerHTML += `
        <div>
        <h2> ${data.items[i].snippet.title} </h2>
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank"><img src="${data.items[i].snippet.thumbnails.high.url}"/></a>
        </div>
        `
        console.log(data.items[i].id.videoId);
    }
}
function nextPage(data) {
    let results = document.querySelector('.results');
    nextP = data.nextPageToken;
    console.log(nextP);
    results.innerHTML = "";
    for ( let i = 0;  i < data.items.length; i++){
        results.innerHTML += `
        <div>
        <h2> ${data.items[i].snippet.title} </h2>
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank"><img src="${data.items[i].snippet.thumbnails.high.url}"/></a>
        </div>
        `
    }
}
function prevPage(data) {
    let results = document.querySelector('.results');
    prevP = data.prevPageToken;
    console.log(prevP);
    results.innerHTML = "";
    for ( let i = 0;  i < data.items.length; i++){
        results.innerHTML += `
        <div>
        <h2> ${data.items[i].snippet.title} </h2>
        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank"><img src="${data.items[i].snippet.thumbnails.high.url}"/></a>
        </div>
        `
    }
}
function watchForm(){
    let submitButton = document.querySelector('.submitButton');
    let nextButton = document.querySelector('.nextButton');
    let prevButton = document.querySelector('.prevButton');
    nextButton.classList.toggle('dis');
    prevButton.classList.toggle('dis');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        nextButton.classList.toggle('show');
        prevButton.classList.toggle('show');
        let searchTerm = document.querySelector('#searchTerm').value
        fetchVideos( searchTerm );
    });
    /* boton para avanzar */
    nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        page = nextP;
        searchTerm = document.querySelector('#searchTerm').value
        fetchVideos( searchTerm );
    });
    /* boton para regresar */
    prevButton.addEventListener('click', (event) => {
        event.preventDefault();
        page = prevP;
        searchTerm = document.querySelector('#searchTerm').value
        fetchVideos( searchTerm );
    });
}
function init(){
    watchForm();
}
init();