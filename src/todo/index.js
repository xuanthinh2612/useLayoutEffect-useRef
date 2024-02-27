import {setJob, addJob, deleteJob} from './actions'
import reducer from './reducer';
import { initValue } from './reducer';
import { useReducer } from 'react';
import logger from '../logger';


  function TodoApp() {
    const [state, dispatch] = useReducer(logger(reducer), initValue)
  
    const{job, jobs} = state
    
    return (
      <>
        <div className="App m-5">
          <h1>Học useReducer đơn giản</h1>
          <input
            value={job}
            onChange={(e)=> dispatch(setJob(e.target.value))}
          />
          <button className='btn btn-outline-success m-2'
            onClick={()=> dispatch(addJob())}
          >Add</button>
          <div>
            <ul>
                {jobs.map((job, index) => {
                  return(
                    <li key={index}>
                      {job}
                      <button className='btn btn-outline-danger mx-5'
                        onClick={()=> dispatch(deleteJob(index))}
                      >Delete</button>
                    </li>
                  )
                })} 
            </ul>
          </div>
        </div>
      </>
    );
  }

  export default TodoApp