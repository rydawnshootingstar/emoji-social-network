import React from 'react';
import Parser from 'rss-parser';
import { Card } from 'semantic-ui-react';
import SidePost from './SidePost';


/*
    - Grab rss feed, populate list 
    - Render sidebar posts (basically mini posts)
    https://www.clickhole.com/rss
*/

const parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

class Sidebar extends React.Component{

    state = {
        feedURL: 'https://www.clickhole.com/tag/capn-crunch/rss',
        items: []
    }

    //on load, grab rss feed with perser, fill up an array, extract image data from each item, add to state
    //rss parser puts the "description" into "content" object
    componentDidMount(){
        this.parseFeed();
    }

    //clips the trailing " I had to include because of the regex nonsense.    
    //sometimes the feed would return null for images, so check if it exists first
    parseFeed = ()=> {
        parser.parseURL(CORS_PROXY + this.state.feedURL, (err, feed)=> {
            let items = [];
            let image = '';
            feed.items.forEach((entry)=> {
                    let images = entry.content.match(/https:(.*)\.[a-z]{3}"/);
                    if(images && images.length >=2){
                        image = images[0];
                        image = image.slice(0, image.lastIndexOf('"'));
                    }
                entry.image = image;
                items.push(entry);    
            });
            this.setState({items});
          });
    }

    // a little hacky - developed for the clickhole rss feed. not quite universal yet. improve the regex
    // extractImage = (content)=> {
    //     const images = content.match(/https:(.*).jpg/);
    //     console.log(images);
    //     return images;
    // }

    render(){
        const { items } = this.state;
        return (
            <Card.Group centered>
                {items.map((item, index)=> (
                    <SidePost key={index} title={item.title} image={item.image} url={item.link}/>
                    
                ))}

                
                </Card.Group>
        )
    }
}

export default Sidebar;