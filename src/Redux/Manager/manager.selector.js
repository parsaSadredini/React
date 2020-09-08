import {createSelector} from 'reselect'

const manager = state => state.manager

export const getCurrentManager =  createSelector([manager], (manager )=> manager.currentManager)
export const getManagerPermissoins = createSelector([manager],(manager)=> manager.currentManager.permissions)
export const getToken = createSelector([manager],(manager)=> manager.currentManager.Token)