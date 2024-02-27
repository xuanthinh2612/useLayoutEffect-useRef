import {SET_JOB, ADD_JOB, DELETE_JOB} from './constants'


// actions 


 export const setJob = (payload) => {
    return {
      type: SET_JOB,
      payload
    }
  }
  
 export const addJob = () => {
    return{
      type: ADD_JOB,
      payload: ""
    }
  }
  
 export const deleteJob = (index)=> {
    return{
      type: DELETE_JOB,
      payload: index
    }
  }