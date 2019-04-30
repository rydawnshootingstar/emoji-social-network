const firebase = require('../../src/firebase/firebase');

postsRef = firebase.database().ref('posts');

//result name comes from result returned from previous function
const saveUserPost = (result)=> {
    return new Promise((resolve, reject)=> {
        if(result){
            postsRef
            //.child(result.userID)
            .push()
            .set({
                ...result
            }).then(()=> resolve())
            .catch((err)=> {
                console.error(err);
                reject(err);
            })
        }else{
            reject({message: 'no post was supplied to save'});
        }
    }); 
} 

module.exports = saveUserPost;

