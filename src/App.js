import React, {useState, useEffect} from 'react'
import { SearchInput } from './SearchInput'

import './styles.css'

const api = 'https://kitsu.io/api/edge/'

export default function App() {
    const [info, setInfo] = useState({})
    const [text, setText] = useState('')

    useEffect(()=>{
        if (text) {
            setInfo({})
            fetch(`${api}anime?filter[text]${text}&page[limit]=12`)
                .then((response) => response.json())
                .then((response) => {
                    setInfo(response)
                })
        }
    }, [text])

    return (
        <div className="App">
            <h1>Animes</h1>
            <SearchInput value={text} onChange={(e)=>{setText(e)}} />
            {text && !info.data && (
                <div className="loading">
                    <img 
                        src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp" 
                        width="100px"
                        alt="carregando" 
                    />
                    <span>Carragnado...</span>
                </div>
            )}
            {info.data && (
                <ul className="animes-list">
                    {info.data.map((anime) => (
                        <li key={anime.id}>
                            <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle}/>
                            {anime.attributes.canonicalTitle}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

