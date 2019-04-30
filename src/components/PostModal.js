import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const PostModal = (props)=> (
    <Modal size='mini' open={props.modalOpen} onClose={props.closeModal}>
        <Modal.Header>Delete Post</Modal.Header>
        <Modal.Content>
            <p>Are you sure you want to delete this post?</p>
        </Modal.Content>
        <Modal.Actions>
            <Button secondary onClick={props.closeModal}>No</Button>
            <Button primary icon='checkmark' labelPosition='right' content='Yes' onClick={props.deletePost}/>
        </Modal.Actions>
    </Modal>
)

export default PostModal;