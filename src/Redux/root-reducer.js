import userReducer from './User/user.reducer';
import {combineReducers} from 'redux';
import CartReducer from './Cart/cart.reducer';
import managerReducer from './Manager/manager.reducer'
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['cart','manager']
} 
const rootReducer = combineReducers({
    user  : userReducer,
    cart : CartReducer,
    manager : managerReducer
});
export default persistReducer(persistConfig,rootReducer);