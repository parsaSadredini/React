import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import './Header.style.scss'
import {auth} from '../../Firebase/Firebase.utilze'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDown  from '../cart-dropdown/cart-dropdown.component'
import {selectCurrentUser}  from '../../Redux/User/user.selector'
import {selectCartHidden} from '../../Redux/Cart/cart.selector'
const Header = ({currentUser,hidden}) =>{
    return (
        <div className='header'>
            <Link  className='logo-container' to='/'>
                <Logo className='logo'/>
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    Shop
                </Link>
                <Link className='option' to='/contact'>
                    Contact
                </Link>

                {
                    
                    currentUser != null ? <div className="option" onClick={()=>{
                        auth.signOut()
                    }}>SignOut</div>: <Link className="option" to="/sign">SignIn</Link>

                }
                <CartIcon/>
                {/* <Link className='option' to='/shop'>
                    Shop
                </Link>
                <Link className='option' to='/shop'>
                    Shop
                </Link> */}
            </div>
            {hidden ? null : <CartDropDown />}  
           
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})


export default connect(mapStateToProps)(Header)