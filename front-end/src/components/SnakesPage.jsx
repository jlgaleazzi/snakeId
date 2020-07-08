import React, { useState, useEffect } from "react"
import Snakes from "./Snakes"



const SnakePage = () => {

    const [state, setState] = useState([]);
    const url = '/api'
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(url);
            result
                .json()
                .then(result => setState(result.snakes))
                .catch(err => { console.log("error " + err) })
        }
        fetchData();
    }, []);


    return (
        <div className='pic-container'>
            {state.map((snake, i) => <Snakes data={snake} key={i} />)}
        </div>
    )
}



export default SnakePage