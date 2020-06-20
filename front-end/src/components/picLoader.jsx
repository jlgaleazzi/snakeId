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
        let file = null;
        if (e.target.id === 'file-button') {
            file = e.target.files[0];
        } else  {
            file = e.dataTransfer.files[0];
            e.dataTransfer.clearData();
        }
        if (file != null) {
            let fr = new FileReader();
            fr.onload = function(event){
                let img = event.target.result;
                dispatch({type: 'FILE_SELECTED', image:img})
                }
            fr.readAsDataURL(file);
        }
        dispatch({type: 'SET_DROP_DEPTH', dropDepth:0});
        dispatch({type: 'SET_IN_DROP_ZONE', inDropZone:false })
    }

    const sendImageToServer = (img) => {
        const form_data = new FormData();
    }
    


    return (
    <div className="pic-container">
        <div className={data.inDropZone ? 'drag-drop-zone inside-drag-area': 'drag-drop-zone'}
        onDrop = { e => handleDrop(e)}
        onDragOver = { e => handleDragOver(e)}
        onDragEnter = { e => handleDragEnter(e) }
        onDragLeave = { e => handleDragLeave(e)} 
        >
            <img className='img-fluid' src={data.image !== null ? data.image : snake}></img>
        </div>
        <div className='upload-btn-wrapper'>
            <button className='btn btn-primary btn-lg'>
                <svg className="bi bi-cloud-upload" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.887 6.2l-.964-.165A2.5 2.5 0 1 0 3.5 11H6v1H3.5a3.5 3.5 0 1 1 .59-6.95 5.002 5.002 0 1 1 9.804 1.98A2.501 2.501 0 0 1 13.5 12H10v-1h3.5a1.5 1.5 0 0 0 .237-2.981L12.7 7.854l.216-1.028a4 4 0 1 0-7.843-1.587l-.185.96z"/>
                    <path fillRule="evenodd" d="M5 8.854a.5.5 0 0 0 .707 0L8 6.56l2.293 2.293A.5.5 0 1 0 11 8.146L8.354 5.5a.5.5 0 0 0-.708 0L5 8.146a.5.5 0 0 0 0 .708z"/>
                    <path fillRule="evenodd" d="M8 6a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 6z"/>
                </svg>   
                 &nbsp;Upload snake
            </button>
            <input type="file" className='input-btn' accept='image/*' id='file-button' onChange={e=> handleDrop(e)}/>
        </div>
    </div>
        
    )
}

export default PicLoader