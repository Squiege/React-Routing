import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarvelApp from './component/MarvelApp';
import md5 from 'md5';
import CharacterDetail from './component/CharacterDetail';
import axios from 'axios';
import Home from './Home';
import NotFound from './component/NotFound';
import NavigationBar from './component/NavigationBar';
import Comics from './component/Comics';

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null); // Unsure why this error is here

    // Getting character data
    useEffect(() => {
        const fetchCharacters = async () => {
            const PUBLIC_KEY = '82e8d6bb00374e14ef2afd27fea2547f';
            const privateKey = 'c71505f8696a928efc09356d84694af6045788b3';
            const timestamp = Date.now().toString(); // Dynamic timestamp
            const HASH = md5(`${timestamp}${privateKey}${PUBLIC_KEY}`); // Generate hash
            const URL = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${HASH}`;

            try {
                const response = await axios.get(URL);
                setCharacters(response.data.data.results);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchCharacters();
    }, []);

    // Thumbnail click functionality
    const handleThumbnailClick = (character) => {
        setSelectedCharacter(character);
    };

    return (
        <Router>
            <div>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                    path="/character_details/:id"
                    element={<CharacterDetail characters={characters} />}
                    />
                    <Route path='/characters' element={<MarvelApp characters={characters} onThumbnailClick={handleThumbnailClick} /> } />
                    <Route path='/comics' element={<Comics />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
