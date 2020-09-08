import UserActions from './user.type'

export const setCurrentUser = (user) =>({
    type: UserActions.SET_CURRENT_USER,
    payload : user
})