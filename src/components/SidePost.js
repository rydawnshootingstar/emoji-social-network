import React from 'react';
import { Card, Button, Image} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setUrlValue } from '../actions/index';

/*
    - Side Posts are simulated advertisements that come from an RSS feed
    - sharing a post will throw its link into the Post Form url box and scroll to the top of the window
    - dispatch is mapped to props

    +UX question: is the scrolling cool? I like it
*/

class SidePost extends React.Component{

    constructor(props){
        super(props);
    }

    //keeps track of scroll progress
    state={
        intervalId: 0
    }

    shareSidePost = (url)=> {
        this.props.dispatch(setUrlValue({url}));
        this.scrollToTop();
    }

    scrollStep = ()=> {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - '50');
      }
      
      scrollToTop = ()=> {
        let intervalId = setInterval(this.scrollStep, '16.66');
        this.setState({ intervalId });
      }

    render(){
        const { title, image, url } = this.props
        return (
            <Card centered style={{minWidth: '200px'}}>
                <a href={url} target='none'>
                    <Card.Content>
                        <Image style={{marginLeft:'5px'}} size='tiny' floated='left' verticalAlign='middle' src={image} />
                        <Card.Header floated='right' style={{verticalAlign:'middle', fontWeight:330}} textAlign='center' as='h5'>{title}</Card.Header>
                    </Card.Content>
                    {/*   <Card.Content textAlign='left'>{description}</Card.Content>   */}
                </a>
                    <Card.Content textAlign='center' extra>                   
                        <Button icon='reply' size='tiny' label='share' onClick={()=>this.shareSidePost(url)}/>
                           
                    </Card.Content>
            </Card>
        )
    }
}

export default connect()(SidePost);