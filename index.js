const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
require('dotenv').config();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000

app.use(logger('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))

app.get('/', (req, res)=>{
    return res.send('hello from root')
})
app.get('/movies', (req, res) => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`;
    const img = 'https://image.tmdb.org/t/p/w185';
    fetch(url).then((res) => res.json()).then((movies) => {
        const theMovies = movies.results
        // console.log(theMovies)
        res.render('main/movies', {theMovies, img})
    })
    .catch((err) => console.log(err))
});

app.get('/random',(req, res) => {
    const url = 'https://randomuser.me/api/?results=20';
    fetch(url).then((res) => res.json()).then((random) => {
        const people = random.results
        res.render('main/random', {people})
    })
    .catch((err) => console.log(err))
});


// app.get('/random', (req, res) => {
//     return url
// })



app.listen(port, () => {
    console.log(`listening on port ${port}`)
});