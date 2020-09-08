import ManagerType from './manager.type'
export const SetManager = (operator)=>({
       type : ManagerType.SET_MANAGER,
       payload: operator
})