import { useState, useEffect } from 'react';
import { Button, Modal } from '@wordpress/components';

const LoadWindow = () => {
    const [isOpen, setOpen] = useState(false);
    const [posts, setPosts] = useState([]); // State to store fetched posts
    const [loadingItem, setLoadingItem] = useState(null); // Track loading state for individual items

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const BEARER_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd3AtZGVtby50ZXN0IiwiaWF0IjoxNzU4MTcwMzYzLCJuYmYiOjE3NTgxNzAzNjMsImV4cCI6MTc1ODc3NTE2MywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.LdKVdYxaiwspp3vo9A8aDAgnHziV4nHFvW-tMH10bEk';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://wp-demo.test/wp-json/wp/v2/posts?status=publish,draft,future,pending,private', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${BEARER_TOKEN}`,
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                setPosts(data); 
                console.log(data[0].content.rendered);
                
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const loadItem = (id) => {
        setLoadingItem(id);
        setTimeout(() => {
            setLoadingItem(null); // Reset loading state
            console.log(`Loaded item with ID: ${id}`);
        }, 0); // Simulated loading delay
    };

    return (
        <>
            <Button variant="secondary" onClick={openModal}>
                Open Modal
            </Button>
            {isOpen && (
                <Modal title="Item List" onRequestClose={closeModal} shouldCloseOnEsc={true} shouldCloseOnClickOutside={true}>
                    <div style={{ marginTop: '40px' }}>
                        <h3>Select an Item to Load:</h3>
                        <ul>
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <li key={post.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                                        <span style={{ marginRight: '10px' }}>{post.title.rendered}</span>
                                        <Button
                                            variant="primary"
                                            onClick={() => loadItem(post.id)}
                                            isBusy={loadingItem === post.id}
                                        >
                                            {loadingItem === post.id ? 'Loading...' : 'Load'}
                                        </Button>
                                    </li>
                                ))
                            ) : (
                                <li>Loading posts...</li>
                            )}
                        </ul>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default LoadWindow;
