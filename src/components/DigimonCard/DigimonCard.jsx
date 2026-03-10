export const DigimonCard = ({ index, digimon, deleteDigi}) => {
    return(
        <div key={index}>
            <p>{index}</p>
            <h3>{digimon.name}</h3>
            <img src={digimon.image}></img>
            <button onClick={() => deleteDigi(digimon.id)}>Eliminar</button>

        </div>
    )
}