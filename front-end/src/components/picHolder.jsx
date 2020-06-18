import React, {useState, useReducer} from 'react';
import PicLoader from './picLoader';

const PicHolder = () => {
    const reducer = (state,action) => {
        switch(action.type) {
            case 'SET_DROP_DEPTH':
                return { ...state, dropDepth: action.dropDepth};
            case 'SET_IN_DROP_ZONE':
                return {...state, inDropZone: action.inDropZone};
            case 'ADD_FILE':
                return {...state, file:state.file}
            default:
                return state;
        }
    }
    const [data, dispatch] = useReducer(
        reducer, {dropDepth:0, inDropZone: false, file:''}
    )


   return(
       <PicLoader data={data} dispatch={dispatch}/>
   )
}

export default PicHolder;