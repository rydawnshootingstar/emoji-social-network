const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const postRouter = require('./api/post/post');

const publicPath = path.join(__dirname, '/public');
const imagePath = path.join(__dirname,'/public/images')
const PORT = process.env.PORT || 8080;

console.log('NODE ENV:', process.env);

const app = express();
/*
    Paths
*/
app.use(express.static(publicPath));
app.use('/images', express.static(imagePath));

/*
    Middleware
*/
app.use(bodyParser.json());

/*
    Routes
*/
app.use('/post', postRouter);
app.get('*', (req,res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
});

/*
    Start
*/
app.listen(PORT, ()=> {
    console.log(`app is listening on ${PORT}`);
});