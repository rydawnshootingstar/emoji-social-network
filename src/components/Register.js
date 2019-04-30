import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
import md5 from 'md5';

class Register extends React.Component {


    state = {
        username: '',
        password: '',
        passwordConfirmation: '',
        email: '',
        errors: [],
        loading: false,
        usersRef: firebase.database().ref('users')
    }

    handleChange = ((e) => {
        this.setState({ [e.target.name] : e.target.value });
    });

    isFormValid = () => {
        let errors=[];
        let error;

        if(this.isFormEmpty()){
            error = 'fill in all fields';
            this.setState({errors: errors.concat(error)});
            return false;
        }else if(!this.isPasswordValid()){
            error = 'password must be over 6 characters and match';
            this.setState({errors: errors.concat(error)});
            return false;
        }else {
            this.setState({errors: []});
            return true;
        }
    }

    isFormEmpty = () => {
        const { username, password, passwordConfirmation, email } = this.state;
        return (username && password && passwordConfirmation && email) ? false : true;
    }

    isPasswordValid = () => {
        const { password, passwordConfirmation } = this.state;
        return (password.length > 6 && passwordConfirmation.length > 6 && password === passwordConfirmation) ? true : false;
    }

    handleSubmit = ((e)=> {
        //prevents page reload
        e.preventDefault();

        if(this.isFormValid()){
            this.setState({errors: [], loading: true});
            firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user)=> {
                //firebase has a parameter called displayName that isn't filled in when we call createUserWithEmailAndPassword
                //we can set that here, as well as grab a unique default avatar for them and set it as their photoURL
                user.user.updateProfile({
                    displayName : this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(user.user.email)}?d=identicon`
                }).then(()=> {this.saveUser(user).then(()=> {
                    console.log('user saved!');
                });
                    this.setState({loading: false});
                });
                console.log(user);
            }).catch((error)=> {
                this.setState({errors: this.state.errors.concat(error.message), loading: false});
                console.error(error);
            });
        }
    });

    saveUser = (user)=> {
        return this.state.usersRef.child(user.user.uid).set({
            name: user.user.displayName,
            avatar: user.user.photoURL
        });
    }

    render(){

        const {username, email, password, passwordConfirmation, errors, loading} = this.state;

        return (
            <Grid
            textAlign="center"
            verticalAlign="middle"
            className="app"
            >
            <Grid.Column style={{maxWidth: '450px', marginTop:'5%'}}>
                <Header as="h1" icon color="blue" textAlign="center">
                 <p style={{fontSize: '100px'}}>🧟</p>
                Register for React!!!
                </Header>
                <Form onSubmit={this.handleSubmit} size="large">
                    <Segment stacked>
                        <Form.Input fluid name="username" 
                        icon="user" 
                        iconPosition="left" 
                        placeholder="Username"
                        onChange={this.handleChange}
                        type="text"
                        value={username}
                        className={errors.find((x)=> /.*username.*/.test(x)) ? 'error' : ''}
                        />

                        <Form.Input fluid name="email" 
                        icon="mail" 
                        iconPosition="left" 
                        placeholder="Email Address"
                        onChange={this.handleChange}
                        type="email"
                        value={email}
                        className={errors.find((x)=> /.*email.*/.test(x)) ? 'error' : ''}
                        />

                        <Form.Input fluid name="password" 
                        icon="lock" 
                        iconPosition="left" 
                        placeholder="password"
                        onChange={this.handleChange}
                        type="password"
                        value={password}
                        className={errors.find((x)=> /.*password.*/.test(x)) ? 'error' : ''}
                        />

                        <Form.Input fluid name="passwordConfirmation" 
                        icon="repeat" 
                        iconPosition="left" 
                        placeholder="confirm password"
                        onChange={this.handleChange}
                        type="password"
                        value={passwordConfirmation}
                        className={errors.find((x)=> /.*password.*/.test(x)) ? 'error' : ''}
                        />

                        <Button color="blue" fluid size="large" disabled={loading}
                        className={loading ? 'loading' : ''}
                        >Submit</Button>
                    </Segment>
                </Form>
                {
                    errors && errors.map((err,index)=> <Message  className='error' key={index}><h3>Error:</h3> {err}</Message>)
                }

                <Message>Already registered? <Link to="/login">Login</Link></Message>

            </Grid.Column>
            
            </Grid>
        )
    }
}

export default Register;
