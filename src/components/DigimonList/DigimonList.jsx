import { useEffect, useState } from "react"
import { DigimonCard } from "../DigimonCard/DigimonCard"
import "./DigimonList.css"

export const DigimonList = () => {
    const [newDigiName, setNewDigiName] = useState('')
    const [newDigiImg, setNewDigiImg] = useState('')

    const [digimons, setDigimons] = useState([])

    useEffect(() => {
        const fetchDigimons = async () => {
            try {
                const response = await fetch(
                    "https://digi-api.com/api/v1/digimon?pageSize=10"
                )
                const data = await response.json()
                if(!response.ok){
                    throw new Error ("No results")
                }
                setDigimons(data.content)
            } catch (err) {
                setDigimons([])
            }
        }
        fetchDigimons()
        console.log(digimons)
    }, [])

    const createDigi = (e) => {
        e.preventDefault()
        

        if (!newDigiName || !newDigiImg) {
            throw new Error ("must fill the inputs")
        } else {
            setDigimons([...digimons, {name: newDigiName, image: newDigiImg }])
            setNewDigiName('')
            setNewDigiImg('')
        }
    }

    const deleteDigi = (id) => {
        const digisFiltered = digimons.filter((_, index) => index !== (id-1)) 
        setDigimons(digisFiltered)

        console.log(digisFiltered)
    }
    console.log(digimons)
    
    return(
        <div>
            <h1>Digimon List</h1>
            <input
            type="text"
            placeholder="Nombre"
            value={newDigiName}
            onChange={(e) => setNewDigiName(e.target.value)}
            />
            <input
            type="text"
            placeholder="URL de imagen"
            value={newDigiImg}
            onChange={(e) => setNewDigiImg(e.target.value)}
            />

            <button onClick={(e) => createDigi(e)}>Añadir un Digimon</button>

            <div className="list">
            {digimons.map((digimon, index) => (
                <DigimonCard
                key={index}
                 digimon={digimon}
                 deleteDigi = {deleteDigi}
                />
            ))}
            </div>
        </div>
    )
}