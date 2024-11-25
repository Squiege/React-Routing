import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CharacterDetail = ({ characters }) => {
    const { id } = useParams(); 
    const location = useLocation(); 
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        // If state was passed by thumbnail click
        if (location.state?.character) {
            setSelectedCharacter(location.state.character);
        } else {
            // Otherwise, fetch character from the characters based on the URL ID
            const character = characters.find((char) => char.id === parseInt(id)); // Find the character by ID
            setSelectedCharacter(character);
        }
    }, [id, characters, location.state]);

    if (!selectedCharacter) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{selectedCharacter.name}</h2>
            <img
                src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
                alt={selectedCharacter.name}
                style={{ width: '300px', height: '300px' }}
            />
            <p>{selectedCharacter.description || 'No description available.'}</p>
            <h3>Comics:</h3>
            <ul>
                {selectedCharacter.comics.items.map((comic, index) => (
                    <li key={index}>{comic.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetail;


