import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const MarvelApp = ({ characters }) => {
    const navigate = useNavigate();

    const handleThumbnailClick = (character) => {
        navigate(`/character_details/${character.id}`, { state: { character } });
    };

    return (
        <div
            className="character-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
        >
            {characters.map((character) => (
                <img
                    key={character.id}
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    onClick={() => handleThumbnailClick(character)}
                    style={{
                        cursor: 'pointer',
                        width: '150px',
                        height: '150px',
                        borderRadius: '10px',
                        border: '2px solid red',
                    }}
                />
            ))}
        </div>
    );
};

MarvelApp.propTypes = {
    characters: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            thumbnail: PropTypes.shape({
                path: PropTypes.string.isRequired,
                extension: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
};

export default MarvelApp;


