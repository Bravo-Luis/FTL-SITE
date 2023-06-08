
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

// Converts JSON to a movie class
function JSONConvert(input){
    for (let i= 0; i<input.results.length; i++){
        movieCollection.push(movie(input.results[i].title, input.results[i].poster_path, input.results[i].vote_average))
    }
}

// Makes API call
async function APICall(){
    fetch(url).then((response)=>{
        let data = response.json()
    }).then((res) => {console.log(res)})
}

let input = document.querySelector("#load-more-button");
input.addEventListener("click", (event) => {
  event.preventDefault();
})




window.onload = function () {
    json_data = APICall()
    console.log(json_data)
  }