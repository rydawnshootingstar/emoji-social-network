const firebase = require('../../src/firebase/firebase');


/*
    - Firebase will update the value of the user's ID object to the emoji posted
    - by default, this value will simply be replaced, meaning the user can only have one reaction per post
    - users cannot react to their own posts (client side enforcement)
*/

const parseUserReaction = ({userID, userName, postID, emoji})=> {
    return new Promise((resolve, reject)=> {
        if(userID && userName && postID && emoji){
            const reactionRef = firebase.database().ref('posts').child(postID).child('reactions');
            reactionRef.update({[userID]: {emoji, userName}}).then(()=> {
                resolve();
            }).catch((err)=> {
                console.error(err);
                reject(err);
            });
        } else{
            reject({message: 'user, post, or emoji data is missing'});
        }
    })


}

module.exports= parseUserReaction;