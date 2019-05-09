import React from 'react';
import 'emoji-mart/css/emoji-mart.css'
import Axios from 'axios';
import { Input, Button, Popup, Segment } from 'semantic-ui-react';
import Emoji from './Emoji';
import { Picker } from 'emoji-mart'
import { connect } from 'react-redux';
import {setUrlValue, clearUrlValue} from '../actions/index';

/*
    - emoji array keeps track of the original reactions associated with a post
    - submittable is true as long as the component is not waiting on a response from DB
    - userName is the text you see when you hover over an emoji reaction
    - userName, userID, url are mapped to props from store
*/

const webURL = 'https://emoji-social-network.herokuapp.com/login';
//const PORT =  '8080';


class PostForm extends React.Component{
    state={
        emoji: [],
        submittable: true
    }

    handleChange = (e)=> {
        this.props.dispatch(setUrlValue({url: e.target.value}));
    }

    handlePickEmoji = (e)=> {
        const {emoji} = this.state;
        if(emoji.length <= 2){
            emoji.push(e.native);
            this.setState({emoji});
        }
    }

    handleSubmit = ()=> {
        const { emoji, submittable } = this.state;
        const { url, userName, userID } = this.props;
        if(emoji.length>=1 && url && userName && userID && submittable){
            this.setState({submittable:false});
            Axios.post(`${webURL}/post/submit`, {emoji, url, userName, userID} ).then(()=> {
                this.handleClear();
            }).catch((e)=> console.error(e));
        }
    }

    handleClear = ()=> {
        this.props.dispatch(clearUrlValue());
        this.setState({
            emoji: [],
            submittable: true
        });
    }

    render(){
        const { emoji, submittable } = this.state;
        return (
            <div>
                <Segment>
                    <Input size='big' placeholder='paste a link...' name={'submittedURL'} value={this.props.url} onChange={this.handleChange}
                    style={{
                        width: '35VW',
                        marginBottom: '20px'
                    }}
                    />
                    <br />
                    <br />
                    
                    {emoji.length === 0 && <i style={{color:'#808080', opacity:'50%', fontSize:'12px'}}>react with up to 3 emoji --></i>}

                    {emoji.map((emoji, index)=> {
                        return (<span  key={index} style={{fontSize:"45px"}}>{emoji}</span>) 
                    })}
                
                    <Popup 
                    trigger={<Button circular color="blue" icon="plus" size="large" floated="right"/>}
                    content={<Picker native onSelect={this.handlePickEmoji} />}
                    on='click'
                    flowing
                    floated='right'
                    >
                    </Popup>
                    <br />
                    <br />
                    <br />

                    <Button floated='right' disabled={!submittable} primary onClick={this.handleSubmit}>Submit</Button>
                    <Button floated='right' secondary onClick={this.handleClear}>Clear</Button>
                    <br />
                    <br />
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state)=> ({
    userName: state.user.userName,
    userID: state.user.userID,
    url: state.url.url
  })
  
export default connect(mapStateToProps)(PostForm);