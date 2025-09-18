import { Inserter } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { __experimentalToggleGroupControl as ToggleGroupControl } from "@wordpress/components";
import { serialize } from "@wordpress/blocks";
import { useState } from "react";

const Navbar = ({ blockContent, handleUndo, handleRedo, toggleSidebar }) => {
    // functions
    const handleExport = () => {
        const html = serialize(blockContent);
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        // replace later with wordpress backend API
        const link = document.createElement("a");
        link.href = url;
        link.download = "page.html";
        link.click();
    };

    const handleView = () => {
        const html = serialize(blockContent);
        console.log(html)
        const newWindow = window.open();
        newWindow.document.body.innerHTML = html;
        newWindow.document.close();
    };

    const handleSave = async () => {
        // Assuming blockContent is an object containing the block content data
        const html = serialize(blockContent);  // Serialize the block content (to HTML)

        // Prepare the data to be sent to WordPress API
        const data = {
            content: html,  
            title: 'Title',  
            excerpt: '',  
        };

        // Add your Bearer token here
        const BEARER_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd3AtZGVtby50ZXN0IiwiaWF0IjoxNzU4MTcwMzYzLCJuYmYiOjE3NTgxNzAzNjMsImV4cCI6MTc1ODc3NTE2MywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.LdKVdYxaiwspp3vo9A8aDAgnHziV4nHFvW-tMH10bEk';

        try {
            // Make the POST request to WordPress API to create the post
            const response = await fetch('/wp-json/wp/v2/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`,  // Include the Bearer token for authentication
                    'Content-Type': 'application/json',  // Set content type to JSON
                },
                body: JSON.stringify(data),  // Send the data in the request body
            });

            // Check if the response is successful
            if (!response.ok) {
                // If the response is not OK, throw an error
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create post');
            }

            // If the request was successful, parse the response JSON
            const responseData = await response.json();

            // Handle the success response (e.g., redirect to the newly created post)
            console.log('Post created successfully:', responseData);
            alert('Post created successfully!');

            // Optionally redirect the user or clear any form
            // window.location.href = responseData.link;  // Redirect to the new post page
        } catch (error) {
            // Handle errors (e.g., failed request or invalid response)
            console.error('Error creating post:', error);
            alert('Failed to create post: ' + error.message);
        }
    };


    // render
    return (
        <div
            style={{
                position: "sticky",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
            }}
        >
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <div>
                    <ToggleGroupControl>
                        <ToggleGroupControl>
                            <Inserter />
                        </ToggleGroupControl>

                        <Button onClick={handleUndo}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M18.3 11.7c-.6-.6-1.4-.9-2.3-.9H6.7l2.9-3.3-1.1-1-4.5 5L8.5 16l1-1-2.7-2.7H16c.5 0 .9.2 1.3.5 1 1 1 3.4 1 4.5v.3h1.5v-.2c0-1.5 0-4.3-1.5-5.7z"></path></svg></Button>
                        <Button onClick={handleRedo}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M15.6 6.5l-1.1 1 2.9 3.3H8c-.9 0-1.7.3-2.3.9-1.4 1.5-1.4 4.2-1.4 5.6v.2h1.5v-.3c0-1.1 0-3.5 1-4.5.3-.3.7-.5 1.3-.5h9.2L14.5 15l1.1 1.1 4.6-4.6-4.6-5z"></path></svg></Button>
                        {/* document overview button */}
                        <Button onClick={toggleSidebar}><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M3 6h11v1.5H3V6Zm3.5 5.5h11V13h-11v-1.5ZM21 17H10v1.5h11V17Z"></path></svg></Button>
                    </ToggleGroupControl>
                </div>
            </div>
            <div style={{
                display: "flex"
            }}>
                <ToggleGroupControl>
                    <Button onClick={handleSave}>Save</Button>
                    <Button>Load</Button>
                </ToggleGroupControl>
                <Button
                    variant="secondary"
                    style={{ marginRight: "10px" }}
                    onClick={handleView}
                >
                    View HTML
                </Button>
                <Button variant="primary" onClick={handleExport}>
                    Export HTML
                </Button>
            </div>
            {/* <div style={{ width: '300px', borderLeft: '1px solid #ccc', padding: '10px' }}>
                <DocumentOverview blockContent={blockContent} />
            </div> */}
        </div>
    );
};

export default Navbar;

