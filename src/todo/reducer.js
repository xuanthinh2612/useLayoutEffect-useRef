import {SET_JOB, ADD_JOB, DELETE_JOB} from './constants'

// init state
export const initValue = {
    job: '',
    jobs: []
  }
  

// reducer

const reducer = (state, action) => {

    switch (action.type) {
        case SET_JOB:
        return  {
            ...state,
            job: action.payload
        } 

        case ADD_JOB:
        return  {
            job: "",
            jobs: [...state.jobs, state.job]
        }
        case DELETE_JOB:
        const newJobs = [...state.jobs]
        newJobs.splice(action.payload, 1)
        return {
            ...state,
            jobs: newJobs
        }
        default: 
        throw new Error("invalid action.")  
    }

}
export default reducer