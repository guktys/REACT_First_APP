import React, { useEffect, useState } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { useParams } from 'react-router-dom';
const Category = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [kategory, setKategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const { categoryName } = useParams();
    useEffect(() => {
        if(categoryName){
            setSelectedOption(categoryName.replace(":", ""));
        }
            },[categoryName ])
    useEffect(() => {
        fetch('http://localhost:3001/kategoris')
            .then((response) => response.json())
            .then((data) => {
                setKategory(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Failed to fetch categories');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedOption) {
            fetch(`http://localhost:3001/kategoria_select/${selectedOption}`)
                .then((response) => response.json())
                .then((data) => {
                    setPosts(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setError('Failed to fetch posts');
                    setLoading(false);
                });
        } else {
            setPosts([]);
            setLoading(false);
        }
    }, [selectedOption]);
    const dataContainer = (array) => {
        return array.map((post, index) => {
            const img = require(`../assets/${post.image}`);
            return (
                <div key={index} className="d-flex align-items-center me-5">
                    <NavItem>
                        <Nav.Link href={post.url} style={{ color: 'black' }}>
                            <div className="flex-shrink-0">
                                <div className="img" source={img}></div>
                                <img
                                    width={150}
                                    height={150}
                                    className="mr-3"
                                    src={img}
                                    alt="photo"
                                />
                                <div className="flex-grow-1 ms-3">
                                    <h5>{post.title}</h5>
                                    <p>{post.data}</p>
                                    <StarRatings
                                        rating={parseFloat(post.stars)}
                                        starRatedColor="blue"
                                        numberOfStars={4}
                                        name="rating"
                                    />
                                </div>
                            </div>
                        </Nav.Link>
                    </NavItem>
                </div>
            );
        });
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };

    return (
        <div className="select">
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Выберите опцию</option>
                {kategory.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            <p>Выбранная опция: {selectedOption}</p>
            {loading ? (
                <div>Loading...</div>
            ) : posts.length > 0 ? (
                dataContainer(posts)
            ) : (
                <div className="No_sort">Постов нет</div>
            )}
        </div>
    );
};

export default Category;
