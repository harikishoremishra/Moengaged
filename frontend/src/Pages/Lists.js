import { useState, useEffect } from 'react';
import axios from 'axios';

const Lists = () => {
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => {
        const fetchLists = async () => {
            const res = await axios.get('/api/lists');
            setLists(res.data);
        };
        fetchLists();
    }, []);

    const onDelete = async (listId) => {
        await axios.delete(`/api/lists/${listId}`);
        setLists(lists.filter(list => list._id !== listId));
    };

    return (
        <div>
            <h2>Lists</h2>
            <ul>
                {lists.map(list => (
                    <li key={list._id}>
                        {list.name}
                        <button onClick={() => setSelectedList(list)}>View</button>
                        <button onClick={() => onDelete(list._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {selectedList && (
                <div>
                    <h3>{selectedList.name}</h3>
                    {selectedList.imageLinks.map((link, idx) => (
                        <img key={idx} src={link} alt={`HTTP ${selectedList.responseCodes[idx]}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Lists;
