
// HTML REFERENCES
const moviesContainer = document.querySelector("#movie-list")
const loadMoreButton = document.querySelector("#load-more-button")
const movieBoxes = document.querySelectorAll('.movie-container')

class movie{

    constructor(title, imgPath, rating){
        this.title = title
        this.rating = rating
        this.imgPath = imgPath
    }

    toHTML(){
        return `<div class="movie-container"> 
                    <img class="movie-img" src="https://image.tmdb.org/t/p/w342${this.imgPath}"/> 
                    <br> ⭐️ ${this.rating} 
                    <br> ${this.title} 
                </div>`
    }

}

class movieManager{

    constructor(){
        this.movies = []
        this.newMovies = []
        this.currentPage = 1
    }

    async fetchMovies(){
        let url = `https://api.themoviedb.org/3/movie/now_playing?page=${this.currentPage}&api_key=490dc857a12acaf336b38aca7b1fea9a`
        const response = await fetch(url)
        const input = await response.json()
        for (let i= 0; i<input.results.length; i++){
            this.newMovies.push(new movie(input.results[i].title, input.results[i].poster_path, input.results[i].vote_average))
        }
        this.currentPage++
    }

    populateHTML(){
        for(let i = 0; i < this.newMovies.length; i++){
            this.movies.push(this.newMovies[i])
        }
        this.newMovies = []
    }

    async initialPopulate(){
        await this.fetchMovies()
        this.populateHTML()
        for(let i = 0; i < this.movies.length; i++){
            moviesContainer.innerHTML += this.movies[i].toHTML()
        }
    }    

    search(searchFieldText){
        moviesContainer.innerHTML = ""
        for(let i = 0; i < this.movies.length; i++){
            if (this.movies[i].title.substring(0, searchFieldText.length).toLowerCase() == searchFieldText.toLowerCase()){
                moviesContainer.innerHTML += this.movies[i].toHTML()
            }
        }
    }
}



let movManager = new movieManager()
window.onload = async function () {
    await movManager.initialPopulate()
}

input = document.querySelector("#load-more-button")
input.addEventListener("click", async (event) => {
    event.preventDefault()
    let currentSearch = document.querySelector('#search-input').value

    if (!currentSearch) {
        await movManager.fetchMovies()
        movManager.populateHTML()
        movManager.search(currentSearch)
        return
    }

    let attempts = 0
    const maxAttempts = 10
    let foundMatchingMovie = false

    while (!foundMatchingMovie && attempts < maxAttempts) {
        attempts++
        await movManager.fetchMovies()
        movManager.populateHTML()
        movManager.search(currentSearch)

        for (let mov of movManager.newMovies) {
            if (mov.title.substring(0, currentSearch.length).toLowerCase() == currentSearch.toLowerCase()) {
                foundMatchingMovie = true
                break
            }
        }
    }
    
    if (!foundMatchingMovie){
        document.querySelector('#no-matches-message').style.display = ""
        input.style.display = "none"
    }
})



document.querySelector('#search-input').addEventListener("input", function(event) {
    event.preventDefault()
    let searchFieldText = event.target.value
    movManager.search(searchFieldText)
    input.style.display = ""
    document.querySelector('#no-matches-message').style.display = "none"
})

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
})