/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

function Test() {
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://localhost:7106/api/test', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setResponseData(data);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div>
            <h1>React ASP.NET App</h1>
            <p>Response from the server: {responseData?.message}</p>
        </div>
    );
}

export default Test;