import React from 'react';
import {Grid, Header, Breadcrumb} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import PostForm from './PostForm';
import MainFeed from './MainFeed';
import Sidebar from './Sidebar';



/*
    3 cols whitespace each side
    9 cols main
    4 cols "ad space"

    TODO: 
*/

//temporary navigation
const BreadCrumbNav = ()=> (
    <Breadcrumb>
    <Breadcrumb.Section active><Link to='/' >Home</Link></Breadcrumb.Section>
    <Breadcrumb.Divider />
    <Breadcrumb.Section ><Link to='register' >Sign Up</Link></Breadcrumb.Section>
    <Breadcrumb.Divider />
    <Breadcrumb.Section ><Link to='/login' >Login</Link></Breadcrumb.Section>
    </Breadcrumb>
)

class App extends React.Component{
    render(){
        return(
            <div>
                {/* Page Header */}
                
                <Header 
                    textAlign="center" 
                    as='h1' 
                    style={{
                    marginTop: '3%',
                    marginBottom: '60px',
                    fontSize:'60px'
                    }}
                >
                    😱
                <br />    
                {/* Nav Bar */}
                    <BreadCrumbNav />
                </Header>
                
                <Grid container>
                    <Grid.Row 
                        style={{
                        marginLeft: '5%',
                        marginRight: '5%',
                        }}
                    >
                {/* Main */}
                        <Grid.Column 
                            width={10}
                            sytle={{

                            }}
                        >
                {/* Post Form */}
                            <Grid.Row 
                                style={{
                                    display: 'flex',
                                    justifyContent:'center',
                                    marginBottom: '3%'
                                }}
                            >
                                <Grid.Column>
                                    <PostForm />
                                </Grid.Column>
                            </Grid.Row>
                {/* Post List */}
                            <Grid.Row>
                                <MainFeed />    
                            </Grid.Row>
                            
                        </Grid.Column>
                        <Grid.Column width={2} />
                {/* Sidebar */}
                        <Grid.Column width={4}>
                            <Header textAlign='center' as='h2'>Around the Web</Header>
                            <Sidebar />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}


// const mapStateToProps = (state)=> ({
//     userName: state.user.userName,
//     userID: state.user.userID,
//     url: state.url.url
//   })
  
export default App;
