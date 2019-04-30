const {Router} = require('express');
const parseUserPost = require('./parseUserPost');
const saveUserPost = require('./saveUserPost');
const parseUserReaction = require('./parseUserReaction');

const router = new Router();

// calls to /post/submit
router.post('/submit', (req, res)=> {
    const { userName, userID, url, emoji } = req.body;
    if(!userName || !userID || !url || !emoji){
        res.status = 401;
        res.json({message: 'malformed request - missing user data'});
    }else{
        //returns promise
        parseUserPost({userName, userID, url, emoji}).then((result)=> {
            saveUserPost(result).then(()=> {
                //console.log(JSON.stringify(result, undefined, 2));
                return res.json({message: 'post saved'});
            })
        })
        .catch((err)=> {
            res.json({message: 'could not post'});
        });
    }
})

router.post('/react', (req, res)=> {
    const { postID, userID, userName, emoji } = req.body;
    parseUserReaction({postID, userName, userID, emoji}).then(()=> {
        return res.json({message:'reaction saved'});
    }).catch((err)=>{
        res.json({message: 'could not react'})
    });
})

//deletion currently handled directly by client
// router.post('/delete', (req, res)=> {
//     const { postID, sessionToken } = req.body;
//     if(!sessionToken || !postID){
//         res.status = 401;
//         res.json({message: 'malformed request - missing user or post data'});
//     }else {
//         deleteUserPost({postID, sessionToken});
//     }
// })

module.exports = router;