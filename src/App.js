import React from 'react';
import logo from './logo.svg';
import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/HomePage'
import ShopPage from './Pages/ShopPage/ShopPage'
import CheckOutPage from './Pages/CheckOut/CheckOutPage'
import AddCategoryPage from './Pages/ManagerPages/CategoryAfairs/AddCategoryPage'
import ShowAllCategoriesPage from './Pages/ManagerPages/CategoryAfairs/ShowAllCategories.Page'
import ShowOneCategoryPage from './Pages/ManagerPages/CategoryAfairs/ShowOneCategoryPage'

import AddProductPage from './Pages/ManagerPages/ProductAfairs/AddProductPage'
import ShowAllProductsPage from './Pages/ManagerPages/ProductAfairs/ShowAllProductsPage'
import ShowOneProductPage from './Pages/ManagerPages/ProductAfairs/ShowOneProductPage'

import AddRolePage from './Pages/ManagerPages/RoleAfairs/AddRolePage';
import AddAllRolesPage from './Pages/ManagerPages/RoleAfairs/ShowAllRolesPage';
import AddOneRolePage from './Pages/ManagerPages/RoleAfairs/ShowOneRolePage';

import AddUserPage from './Pages/ManagerPages/UserAfairs/AddUserPage'
import ShowAllUsersPage from './Pages/ManagerPages/UserAfairs/ShowAllUsersPage'
import ShowOneUserPage from './Pages/ManagerPages/UserAfairs/ShowOneUserPage'

import ManagerSignInPage from './Pages/ManagerPages/ManagerSignInPage'
import PanelPage from './Pages/ManagerPages/PanelPage'
import SignInAndSignUp  from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {Route,Switch,withRouter,Redirect, Router} from 'react-router-dom'
import Header from './Component/Header/Header.component'
import { auth,createUserProfileDocument } from './Firebase/Firebase.utilze'
import {connect} from 'react-redux'
import {setCurrentUser} from './Redux/User/user.action' 

import {selectCurrentUser} from './Redux/User/user.selector'
import {getCurrentManager} from './Redux/Manager/manager.selector'


const HatsPage =(props)=>{
  console.log(props)
  return (<div> <Header/>Hats</div>)
}

class App extends React.Component {
 
  unsubscribeFromAuth;
  componentDidMount(){
    const {setCurrentUser}  = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapShot => {
            setCurrentUser({
                id:snapShot.id,
                ...snapShot.data()
            });
          });  
      }
      setCurrentUser(null);
    })
  }
  componentWillUnmount (){
    this.unsubscribeFromAuth()
  }
  render(){
    return (
      <div >
        {/* <Header/> */}
        <Switch>

          <Route exact={true} path='/' component={HomePage}/>
          <Route exact={true} path='/shop/hats' component={HatsPage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path="/sign" render={()=>this.props.currentUser ? <Redirect to="/"/> : <SignInAndSignUp/>}/>
          <Route exact path="/checkout" component={CheckOutPage}/>

          
          <Route exact path="/manager/login" component={ManagerSignInPage} />
          {
          this.props.currentManager ? 
          <Switch>
            <Route exact path="/manager/panel" component={PanelPage} />
            <Route exact path="/AddCategory" component={AddCategoryPage} />
            <Route exact path="/ShowAllCategories" component={ShowAllCategoriesPage}/>
            <Route exact path="/ShowAllCategories/:id" component={ShowOneCategoryPage}/>

            <Route exact path="/AddProduct" component={AddProductPage} />
            <Route exact path="/ShowAllProducts" component={ShowAllProductsPage} />
            <Route exact path="/ShowAllProducts/:id" component={ShowOneProductPage} />
            
            <Route exact path="/AddRole" component={AddRolePage} />
            <Route exact path="/ShowAllRoles" component={AddAllRolesPage} />
            <Route exact path="/ShowAllRoles/:id" component={AddOneRolePage} />
            
            <Route exact path="/AddUser" component={AddUserPage} />
            <Route exact path="/ShowAllUsers" component={ShowAllUsersPage} />
            <Route exact path="/ShowAllUsers/:id" component={ShowOneUserPage} />
          </Switch>

          :
          null
        }

        <Route exact path="*" render={()=>(<div><Header/><p>404</p></div>) }/>
        </Switch>

        
      </div>
    );
  }
  
}
const mapStateToProps = (state) => ({
    currentUser : selectCurrentUser(state),
    currentManager : getCurrentManager(state)
})
const mapDispatchToProps = (dispatch) =>({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
