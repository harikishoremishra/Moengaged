import { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [filter, setFilter] = useState('');
    const [images, setImages] = useState([]);

    const onSearch = async () => {
        const response = await axios.get(`https://http.dog/${filter}`);
        setImages(response.data);
    };

    const onSave = async () => {
        const list = {
            name: `List ${filter}`,
            responseCodes: images.map(img => img.code),
            imageLinks: images.map(img => img.url)
        };
        await axios.post('/api/lists', list);
    };

    return (
        <div>
            <h2>Search</h2>
            <input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
            <button onClick={onSearch}>Search</button>
            <button onClick={onSave}>Save List</button>
            <div>
                {images.map(img => (
                    <div key={img.code}>
                        <p>{img.code}</p>
                        <img src={img.url} alt={`HTTP ${img.code}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
