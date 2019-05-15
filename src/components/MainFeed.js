import React from 'react';
import _ from 'lodash';
import Post from './Post';
import firebase from '../firebase/firebase';
import { Item, Popup, Button, Icon } from 'semantic-ui-react';


/*
    - postsRef is a ref to the "main" posts tree
    - posts array keeps track of posts loaded from DB
    - posts are loaded as firebase listeners recognize an addition, deletion OR change to a post object
    - Post components are rendered with all post information passed as a prop

*/

class MainFeed extends React.Component{
    state = {
        postsRef: firebase.database().ref('posts'),
        messagesLoading: true,
        posts: []
    }

    componentDidMount(){
            this.addNewListener();
            this.addChangedListener();
            this.addDeletedListener();
    }

    addNewListener = ()=> {
        let loadedPosts = [];
        this.state.postsRef
        .on('child_added', (snap)=> {
            loadedPosts.push({...snap.val(), postID: snap.key});
            loadedPosts.sort((a,b)=> b.createdAt - a.createdAt );
            this.setState({
                posts: loadedPosts,
                messagesLoading: false
            })
        });
    }

    addChangedListener = ()=> {
        this.state.postsRef
        .on('child_changed', (snap)=> {
            this.fetchPosts();
        });
    }

    addDeletedListener = ()=> {
        this.state.postsRef.on('child_removed', (snap)=> {
            this.fetchPosts();
        });
    }

    fetchPosts = ()=> {
        this.state.postsRef.once('value', (snap)=>{
            let loadedPosts = [];
            const posts = snap.val();
            Object.keys(posts).map((key, index) =>{
                posts[key].postID = key;
                loadedPosts.push(posts[key]);
            });
            loadedPosts.sort((a,b)=> b.createdAt - a.createdAt );
            this.setState({
                posts: []
            });
            this.setState({
                posts: loadedPosts
            });
        });
    }


    render(){
        const { posts } = this.state;
        
        return(
            <div>
                <Item.Group divided>
                    {posts.map((post, index)=> (
                        <Post key={index} post={post} />
                    ))}
                </Item.Group>
            </div>
        )
    }
}

export default MainFeed;