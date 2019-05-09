import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
 
class Login extends React.Component {


    state = {
        password: '',
        email: '',
        errors: [],
        loading: false,
    }

    handleChange = ((e) => {
        this.setState({ [e.target.name] : e.target.value });
    });


    handleSubmit = ((e)=> {
        //prevents page reload
        const { email, password } = this.state;
        e.preventDefault();
        if(this.isFormValid({email,password})){
            this.setState({errors: [], loading: true});
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user)=> {
                this.setState({loading: false});
            }).catch((err)=>{
                this.setState({errors: this.state.errors.concat(err), loading: false});
            })
        }
    });

    isFormValid = ({ email, password })=> {
        return email && password;
    }

    render(){

        const {email, password, errors, loading} = this.state;

        return (
            <Grid
            textAlign="center"
            verticalAlign="middle"
            className="app"
            >
        {/* Header */}           
            <Grid.Column style={{maxWidth: '450px', marginTop:'5%'}}>
                <Header as="h1" icon color="black" textAlign="center">
                <p style={{fontSize: '100px'}}>🤣</p>
                Login
                </Header>
        {/* Main Form */}   
                <Form onSubmit={this.handleSubmit} size="large">
                    <Segment stacked>
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

                        <Button color="black" fluid size="large" disabled={loading}
                        className={loading ? 'loading' : ''}
                        >Submit</Button>
                    </Segment>
                </Form>
        {/* Errors */}   
                {
                    errors && errors.map((err,index)=> <Message  className='error' key={index}><h3>Error:</h3> {err.message}</Message>)
                }
                <Message>Don't have an account? <Link to="/register">Sign Up</Link></Message>
            </Grid.Column>
            </Grid>
        )
    }
}

export default Login;
