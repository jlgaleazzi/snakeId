import React from 'react';
import snake from '../assets/snake.png'

const PicLoader = props => {
    const {data, dispatch} = props;
    

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({type:'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1})
    }

    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({type:'SET_DROP_DEPTH',dropDepth: data.dropDepth - 1 });
        if (data.dropDepth > 0) return
        dispatch({type: 'SET_IN_DROP_ZONE', inDropZone:false})

    }

    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        dispatch({type: 'SET_IN_DROP_ZONE', inDropZone:true})
    }

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        let file = e.dataTransfer.files[0]
        dispatch({type: 'ADD_FILE',file})
        e.dataTransfer.clearData();
        dispatch({type: 'SET_DROP_DEATH', dropDepth:0});
        dispatch({type: 'SET_IN_DROP_ZONE', inDropZone:false })


    }


    return (
        <div className={'drag-drop-zone'}
        onDrop = { e => handleDrop(e)}
        onDragOver = { e => handleDragOver(e)}
        onDragEnter = { e => handleDragEnter(e) }
        onDragLeave = { e => handleDragLeave(e)} 
        >
        <img src={snake}></img>
    </div>
        
    )
}

export default PicLoader