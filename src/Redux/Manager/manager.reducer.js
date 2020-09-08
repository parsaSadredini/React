import ManagerType from './manager.type'

const INITIAL_STATE={
    currentManager : null ,
}

const managerReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case ManagerType.SET_MANAGER:{
            return state={
                ...state,
                currentManager:action.payload
            }
        }
        default : return state
    }
}

export default managerReducer