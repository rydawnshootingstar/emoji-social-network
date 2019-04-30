const Axios = require('axios');
const moment = require('moment');
const firebase = require('../../src/firebase/firebase');

/*
- client will hit the POST api endpoint. The endpoint will fire this function with the provided data
- by performing this server-side, we will minimize the amount of API requests made. the limit is 60 per hour
    1. link comes in from client post
    2. this function hits linkpreview.net to generate the preview
    3. the title, description, image, url are picked off the result
    4. if any of them are null, dummy/placeholders are inserted to fill in
    5. the post's author and a timestamp is added to the result object, as well as an empty array of reactions
    6. the post is saved to the database
*/

const key = process.env.IMAGE_PREVIEW_KEY;

const modifyEmoji = ({emoji})=> {
    //1
    if(emoji.length === 1){
        return [emoji[0], emoji[0], emoji[0]];
    }
    //2 equal
    if(emoji.length === 2 && emoji[0] === emoji[1]){
        return [emoji[0], emoji[0], emoji[0]];
    }
    //2 different ones
    if(emoji.length === 2 && emoji[0] !== emoji[1]){
        return [emoji[0], emoji[1], emoji[0]];
    }
    else{
        return emoji;
    }
}

const parseUserPost = ({url, userName, userID, emoji})=> {
    const targetURL = `https://api.linkpreview.net/?key=${key}&q=${url}`;
    let result = {};

    return new Promise((resolve, reject)=> {
        Axios.get(targetURL).then((res)=> {
            const results = {...res.data};

            emoji = modifyEmoji({emoji});     

            const createdAt = firebase.database.ServerValue.TIMESTAMP;
            const reactions = [];
           
            result = { userName, url, userID, ...results, emoji, reactions, createdAt }

            resolve(result);
            console.log('result of request:',JSON.stringify(result, undefined, 2));
        }).catch((err)=> {
            console.error(err);
            reject(err);
        })
    });
}

module.exports = parseUserPost;


/*
    - example code to put in API function. something like this
    - saveUserPost() will handle the actual saving to the DB
    - API's response will be dependent on both the parsing and the saving going through successfully
    - the client will not really be waiting  for a response to continue viewing the site, but they will not be able to 
        submit a new post until the first one clears or fails (save status in redux store)
*/
// parseUserPost({
//     userName: 'mitchell',
//     userID: '12345',
//     submittedURL: 'https://www.youtube.com/watch?v=zf6IPskH_qg'
// })
// .then((result)=> {
//     console.log(JSON.stringify(result, undefined, 2));
//     saveUserPost(result).then(()=> {
//         return res.json({message: 'post saved'});
//     })
// })
// .catch((err)=> {
//     res.json({message: 'could not post'});
// });
