import React from 'react';
import { Item, Modal, Popup, Button  } from 'semantic-ui-react';
import { Picker } from 'emoji-mart'
import Axios from 'axios';
import { connect } from 'react-redux';
import PostModal from './PostModal';
import firebase from '../firebase/firebase';
import moment from 'moment';

/*
    - this.props.post holds all post information
    - whenever component updates, determine whether or not to split up description into 2 parts based on length
    - userID, userName (of logged in user) are mapped to props from store
    - closing procedure: postID comes from props -> to state when 'x' is clicked -> to deletePost
*/

const webURL = 'https://emoji-social-network.herokuapp.com';
//const webURL = 'http://localhost:8080';
//const PORT = '8080';

class Post extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            mouseInside: false,
            modalOpen: false,
            modalPostID: '',
            description: '',
            overFlowText: ''
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.post !== prevProps.post){
            const { description } = this.props.post;
            if(description.length >= 100){
                const splitAt = index => x => [x.slice(0, index), x.slice(index)] //splits string into 2 substrings at index
                const shortDescription = splitAt(100)(description)[0];
                const overFlowText = splitAt(100)(description)[1];
                
                this.setState({description: shortDescription, overFlowText});
            }else{
                this.setState({description, overFlowText:''});
            }
        }
    }

    handlePickEmoji = (e)=> {
        const { postID } = this.props.post;
        const { userID, userName } = this.props;
        Axios.post(`${webURL}/post/react`, {postID, userName, userID, emoji: e.native}).then(()=> {
        });
    }

    openModal = ({postID})=> {
        console.log('modal should be open');
        this.setState({modalOpen:true, modalPostID: postID });
    }

    closeModal = ()=> {
        console.log('modal should close');
        this.setState({modalOpen: false, modalPostID:''});
    }

    deletePost = ()=> {
        const postRef = firebase.database().ref('posts').child(this.state.modalPostID);
        postRef.remove();
        this.closeModal();
    }

    mouseEnter= ()=>{
        this.setState({mouseInside:true});
    }

    mouseLeave = ()=> {
        this.setState({mouseInside:false});
    }

    expandDescription = ()=> {
        const {description, overFlowText} = this.state;
        const newDescription = description.concat(overFlowText);
        this.setState({
            description: newDescription, overFlowText:''
        });
    }

    render(){
        const { createdAt, title, postID, userName,image, emoji, reactions, userID, url} = this.props.post;
        const { mouseInside, description, overFlowText } = this.state;
        console.log('description at render is', description);

        return (
            <Item onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        {/* Modal */} 
                <PostModal modalOpen={this.state.modalOpen} closeModal={this.closeModal} deletePost={this.deletePost} />
        {/* Image */}     
                <a href={url} target='none'>
                    <Item.Image verticalAlign='middle' floated='left' size='small' src={image ? image : 'images/froglook.png'}
                    style={{marginRight:'10px',marginTop:'10px'}}
                    />  
                </a>
        {/* Main Content */}             
                <Item.Content>   
                    <Item.Header as='h2'>{userName}</Item.Header>                    
                    <span style={{fontSize:'35px', marginLeft:'5px', paddingTop:'10px'}}>
                        {emoji && emoji.map((emoji, index)=> (
                            <span key={index}>{emoji}</span>
                        ))}

                    </span>
                    {userID === this.props.userID && mouseInside && <Button icon='x' circular color='red inverted' size='tiny' floated='right' onClick={()=>this.openModal({postID})}/>}
                    <span style={{float:'right', paddingTop:'10px', fontSize:'11px', color: '#888888'}}>
                        {moment(createdAt).fromNow()}
                    </span>
                    <a href={url} target='none'>
                        <Item.Description as='h3' style={{fontWeight:500}} floated='right'>{title}</Item.Description>
                    </a>
                    <Item.Description floated='right'>{description}{' '}{overFlowText && <a onClick={this.expandDescription}>Show More...</a>}</Item.Description>
        {/* Reaction Button */}
                    <Item.Extra>
                        {userID !== this.props.userID &&
                            <Popup 
                            trigger={<Button circular color="blue inverted" icon="plus" size="tiny" floated="left"/>}
                            content={<Picker native onSelect={this.handlePickEmoji} />}
                            on='click'
                            flowing
                            floated='right'
                            >
                            </Popup>
                        }
        {/* Reaction Emojis */}
                        <span style={{fontSize:'20px'}}>
                            {
                                reactions && Object.keys(reactions).map((key, index) =>(
                                    <Popup key={key} position='bottom center' size='medium' content={reactions[key].userName} trigger={<span>{reactions[key].emoji}</span>} />
                                ))
                            }   
                        </span>
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    };
}

const mapStateToProps = (state)=> ({
    userID: state.user.userID,
    userName: state.user.userName
  });
  
export default connect(mapStateToProps)(Post);