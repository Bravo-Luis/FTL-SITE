
// HTML REFERENCES
const movieContainer = document.querySelector("#movie-list")
const loadMoreButton = document.querySelector("#load-more-button")

const url = 'https://api.themoviedb.org/3/discover/movie?api_key=490dc857a12acaf336b38aca7b1fea9a'
let movieCollection = []

/**
 * Make the actual `fetch` request to the Giphy API
 * and appropriately handle the response.
 */

// Class im going to use to store movies
class movie{
    constructor(title, imgPath, rating){
        this.title = title
        this.rating = rating
        this.imgPath = imgPath
    }

    toHTML(){
        return '<div class=\"movie-container\"> <img class="movie-img" src=\" ' + 'https://image.tmdb.org/t/p/w342' + this.imgPath + '\"/> <br>' + '⭐️ ' + this.rating + '<br>' + this.title +' </div>'
    }
}

async function APICall(){
    const response = await fetch(url);
    const data = await response.json();
    JSONConvert(data);
}

function JSONConvert(input){
    for (let i= 0; i<input.results.length; i++){
        movieCollection.push(new movie(input.results[i].title, input.results[i].poster_path, input.results[i].vote_average))
    }
}

let input = document.querySelector("#load-more-button");
input.addEventListener("click", (event) => {
  event.preventDefault();
  for(let i = 0; i < 5; i++){
    try{
        movieContainer.innerHTML += movieCollection[i].toHTML()
        movieCollection.splice(i, 1)

        if (movieCollection.length == 0) {
            input.style.display = "none"
        }

    } catch {
    }
}
})

window.onload = async function () {
    await APICall();
    for(let i = 0; i < 5; i++){
        movieContainer.innerHTML += movieCollection[i].toHTML()
        movieCollection.splice(i, 1)
        
    }
}