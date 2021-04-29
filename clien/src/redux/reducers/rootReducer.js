import {combineReducers} from 'redux';
import productReducer from './productReducer';
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import categoryReducer from './categoryReducer'
import messageReducer from './messageReducer'

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    category: categoryReducer,
    message: messageReducer
    
})

export default rootReducer