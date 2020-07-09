import React, { useState, useEffect } from "react"
import Snakes from "./Snakes"
import { useParams } from "react-router-dom";



const SnakePage = () => {
    let { slug } = useParams();
    const [state, setState] = useState([]);
    const url = '/api'

    const filterResults = (snakes) => {
        if (slug) {
            let selected = snakes.find(snake => snake.slug === slug);
            return [selected];
        }
        return (snakes)

    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(url);
            result
                .json()
                .then(result => setState(filterResults(result.snakes)))
                .catch(err => { console.log("error " + err) })
        }
        fetchData();
    }, []);


    return (
        <div className='pic-container'>
            {state.map((snake, i) => <Snakes data={snake} key={i} hasSlug={slug} />)}
        </div>
    )
}



export default SnakePage