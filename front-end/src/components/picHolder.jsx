import React, { useReducer } from 'react';
import PicLoader from './picLoader';

const PicHolder = () => {



    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_DROP_DEPTH':
                return { ...state, dropDepth: action.dropDepth };
            case 'SET_IN_DROP_ZONE':
                return { ...state, inDropZone: action.inDropZone };
            case 'FILE_SELECTED':
                return { ...state, image: action.image }
            case 'GOT_RESULT':
                return { ...state, result: action.result }
            case 'ANALIZING':
                return { ...state, analizing: action.analizing, result: null }
            default:
                return state;
        }
    }
    const [data, dispatch] = useReducer(
        reducer, { dropDepth: 0, inDropZone: false, image: null, result: null, analizing: false }
    )


    return (
        <PicLoader data={data} dispatch={dispatch} />
    )
}

export default PicHolder;