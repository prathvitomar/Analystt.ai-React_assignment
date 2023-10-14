// DataList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListWithDetails from '../components/ListWithDetails';

function DataList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Define the getData function
        const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/data'); // Replace with the actual API route
            const responseData = response.data;
            setData(responseData);
            console.log('Response Data:', responseData); // Print the response data to the console
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

    // Call the getData function
    getData();
  }, []);

  const renderData = () => {
    return data.map((item) => (
      <ListWithDetails key={item.id} data={item} />
    ));
  };

  return (
    <div className="App">
      <ListWithDetails data={data} />
    </div>
  );
}

export default DataList;
