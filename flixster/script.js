
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
        this.searchMovies= []
        this.currentPage = 1
    }

    async fetchMovies(search=false, query=""){
        let url;
        if (!search){
            url = `https://api.themoviedb.org/3/movie/now_playing?page=${this.currentPage}&api_key=490dc857a12acaf336b38aca7b1fea9a`
        }
        else{
            url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=490dc857a12acaf336b38aca7b1fea9a`
        }
        const response = await fetch(url)
        const input = await response.json()
        this.searchMovies = []
        for (let i= 0; i<input.results.length; i++){
            if (!search){this.newMovies.push(new movie(input.results[i].title, input.results[i].poster_path, input.results[i].vote_average))}
            else {this.searchMovies.push(new movie(input.results[i].title, input.results[i].poster_path, input.results[i].vote_average))}
        }
        if (!search){this.currentPage++}
        else {}
    }

    populateHTML(search=false){
        if(!search){
            for(let i = 0; i < this.newMovies.length; i++){
                this.movies.push(this.newMovies[i])
            }
            this.newMovies = []
        }
        else{

        }
    }

    async initialPopulate(){
        await this.fetchMovies()
        this.populateHTML()
        for(let i = 0; i < this.movies.length; i++){
            moviesContainer.innerHTML += this.movies[i].toHTML()
        }
    }    

    async search(searchFieldText){
        moviesContainer.innerHTML = ""
        await this.fetchMovies(true, searchFieldText)
        for(let i = 0; i < this.searchMovies.length; i++){
            moviesContainer.innerHTML += this.searchMovies[i].toHTML()
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
    await movManager.fetchMovies()
    movManager.populateHTML()
})

noMatchesMessage = document.querySelector("#no-matches-message")

document.querySelector('#search-input').addEventListener("input", function(event) {
    event.preventDefault()
    let searchFieldText = event.target.value
    movManager.search(searchFieldText)

    if (event.target.value == ""){
        movManager.currentPage = 1 
        movManager.initialPopulate()
        input.style.display = ""
    }else{
        input.style.display = "none"
    }

})

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
})