import React from 'react';
import { Button, Card } from 'react-bootstrap'
import snake from '../assets/snake.png'



const PicLoader = props => {
    const { data, dispatch } = props;


    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 })
    }

    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
        if (data.dropDepth > 0) return
        dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })

    }

    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true })
    }

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        let file = null;
        if (e.target.id === 'file-button') {
            file = e.target.files[0];
        } else {
            file = e.dataTransfer.files[0];
            e.dataTransfer.clearData();
        }
        if (file != null) {
            let fr = new FileReader();
            fr.onload = function (event) {
                let img = event.target.result;
                dispatch({ type: 'FILE_SELECTED', image: img })
            }
            fr.readAsDataURL(file);
            dispatch({ type: "ANALIZING", analizing: true })
            sendImageToServer(file)
                .then(data => {
                    dispatch({ type: "ANALIZING", analizing: false })
                    dispatch({ type: 'GOT_RESULT', result: data })
                })
        }
        dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
        dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })
    }

    async function sendImageToServer(img) {
        const form_data = new FormData();
        form_data.append('file', img);
        const url = '/idmysnake';
        const request_Obj = {
            method: 'POST',
            cache: 'no-cache',
            body: form_data,
            headers: {
                'accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.8',
            },
        }

        const response = await fetch(url, request_Obj);
        return response.json();
    }

    const getProperties = () => {

        if (data.result) {
            if (data.result.venomous === 'true') {
                return { bg: 'danger', label: 'venomous' }
            }
            if (data.result.venomous === 'undetermined') {
                return { bg: 'warning', label: '' }
            }
        }
        return { bg: 'light', label: 'Non venomous' }
    }

    const getSlug = () => {
        if (data.result) {
            return "/snakes/" + data.result.slug;
        }
        return null
    }

    return (

        <div className="pic-container">

            <div
                onDrop={e => handleDrop(e)}
                onDragOver={e => handleDragOver(e)}
                onDragEnter={e => handleDragEnter(e)}
                onDragLeave={e => handleDragLeave(e)}
            >
                <Card bg={getProperties().bg} style={{ width: '30rem', height: 'auto' }}>
                    <Card.Body >
                        <Card.Img variant='top' className={'card-img-top'} src={data.image !== null ? data.image : snake} />
                        <Card.Text></Card.Text>
                        <Card.Title>{
                            data.analizing ? <span>Analizing Picture</span> : (data.result !== null ? <a href={getSlug()}> {data.result.snake} </a> : "Upload a Snake Pic")}
                        </Card.Title>
                        <Card.Text>
                            {data.result !== null ? getProperties().label : <span>&nbsp;</span>}
                        </Card.Text>
                        <div className='upload-btn-wrapper'>
                            <Button className='btn btn-primary' disabled={data.analizing}>
                                {
                                    data.analizing ?
                                        <div>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            &nbsp;Analizing...
                                    </div> :
                                        <div>
                                            <svg className="bi bi-cloud-upload" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.887 6.2l-.964-.165A2.5 2.5 0 1 0 3.5 11H6v1H3.5a3.5 3.5 0 1 1 .59-6.95 5.002 5.002 0 1 1 9.804 1.98A2.501 2.501 0 0 1 13.5 12H10v-1h3.5a1.5 1.5 0 0 0 .237-2.981L12.7 7.854l.216-1.028a4 4 0 1 0-7.843-1.587l-.185.96z" />
                                                <path fillRule="evenodd" d="M5 8.854a.5.5 0 0 0 .707 0L8 6.56l2.293 2.293A.5.5 0 1 0 11 8.146L8.354 5.5a.5.5 0 0 0-.708 0L5 8.146a.5.5 0 0 0 0 .708z" />
                                                <path fillRule="evenodd" d="M8 6a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 6z" />
                                            </svg>
                                            <span>&nbsp;Upload Snake</span>
                                        </div>
                                }
                            </Button>
                            <input type="file" className='input-btn' accept='image/*' id='file-button' onChange={e => handleDrop(e)} />
                        </div>
                    </Card.Body>
                </Card>

            </div>



        </div>

    )
}

export default PicLoader