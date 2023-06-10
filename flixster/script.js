class movie_manager {
  constructor() {
    this.current_page = 1
    this.movie_list = document.querySelector("#movie-list")
    this.load_more_button = document.querySelector("#load-more-button")
    this.search_box = document.querySelector("#search-input")
    this.movie_boxes = document.querySelectorAll(".movie-container")
    this.popup_box = document.querySelector("#popup")
    this.popup_holder = document.querySelector("#popup-holder")
    this.clear_button = document.querySelector("#clear")
  }

  async apiCall(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data.results || data
  }

  async fetchNowPlaying(reset = false) {
    if (reset) {
      this.current_page = 1
      this.movie_list.innerHTML = ""
    }
    let url = `https://api.themoviedb.org/3/movie/now_playing?page=${this.current_page}&api_key=490dc857a12acaf336b38aca7b1fea9a`
    const movies = await this.apiCall(url)
    for (let i = 0; i < movies.length; i++) {
      let movie = movies[i]
      this.movie_list.innerHTML += this.movieToMovieBox(movie)
    }
    this.setMovieBoxListener()
    this.current_page++
  }

  async fetchSearched(query) {
    this.movie_list.innerHTML = ""
    if (query == "") {
      this.current_page = 1
      this.load_more_button.style.display = ""
      this.fetchNowPlaying()
      this.clear_button.style.display = "none"
      return
    } else {
      this.load_more_button.style.display = "none"
      this.clear_button.style.display = ""
    }
    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=490dc857a12acaf336b38aca7b1fea9a`
    const movies = await this.apiCall(url)
    for (let i = 0; i < movies.length; i++) {
      let movie = movies[i]
      this.movie_list.innerHTML += this.movieToMovieBox(movie)
    }
    this.setMovieBoxListener()
  }

  async fetchByID(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=490dc857a12acaf336b38aca7b1fea9a`
    const movie = await this.apiCall(url)
    this.popup_box.innerHTML = `
            <h2 style="padding-left:2.5%;padding-top:2.5%;"> ${movie.title} </h2> <br> 
            <div style="display:flex;flex-direction:row;">
                <div style="padding-left:2.5%;padding-bottom:2.5%;">
                <img class="movie-img" src="https://image.tmdb.org/t/p/w342${movie.poster_path}"/> 
                <br> ⭐️ ${movie.vote_average} 
                <br> Released: ${movie.release_date}
                </div>
                <div>
                    <div style="padding-left:2.5%;margin:2.5%;">
                        ${movie.overview}
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        `
  }

  movieToMovieBox(movie) {
    if(movie.poster_path){
        return `
            <div class="movie-container" id="${movie.id}"> 
                <img class="movie-img" alt="${movie.title} poster" src="https://image.tmdb.org/t/p/w342${movie.poster_path}"/> 
                <br> ⭐️ ${movie.vote_average} 
                <br> <h4> ${movie.title} </h4>
            </div>
            `
    }

    return `
            <div class="movie-container" id="${movie.id}"> 
                <img class="movie-img" alt="${movie.title} poster" src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="/> 
                <br> ⭐️ ${movie.vote_average} 
                <br> <h4> ${movie.title} </h4>
            </div>
            `
  }

  createEventListeners() {
    document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault()
    })

    this.load_more_button.addEventListener("click", async (event) => {
      event.preventDefault()
      await this.fetchNowPlaying()
    })

    this.search_box.addEventListener("input", async (event) => {
      let query = event.target.value
      await this.fetchSearched(query)
    })

    this.popup_holder.addEventListener("click", () => {
      this.popup_holder.style.display = "none"
    })

    this.clear_button.addEventListener("click", ()=>{
        this.search_box.value = ""
        this.fetchNowPlaying(true)
        this.clear_button.style.display = "none"
        this.load_more_button.style.display = ""
    })

  }

  setMovieBoxListener() {
    this.movie_boxes = document.querySelectorAll(".movie-container")
    for (let i = 0; i < this.movie_boxes.length; i++) {
      this.movie_boxes[i].addEventListener("click", (event) => {
        this.popup_box.style.display = "block"
        this.popup_holder.style.display = "flex"
        let movie_id = event.currentTarget.id
        this.fetchByID(movie_id)
      })
    }
  }
}

window.onload = function () {
  let manager = new movie_manager()
  manager.createEventListeners()
  manager.fetchNowPlaying()
}
