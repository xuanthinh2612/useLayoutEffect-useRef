
function logger(reducer) {

    return (prevState, action) => {
        console.group(action.type)
        console.log("prev state: ",prevState );
        console.log("Action type: ", action);
        
        const newState =  reducer(prevState, action)

        console.log("Next state: ", newState);
        console.groupEnd();
        
        return newState
    }

}

export default logger