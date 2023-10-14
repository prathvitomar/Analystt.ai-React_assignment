// DataList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListWithDetails from '../components/ListWithDetails';

function DataList() {
    const [data, setData] = useState([]);

    useEffect(() => {
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
    getData();
  }, []);

  const renderData = () => {
    return data.map((item) => (
      <ListWithDetails key={item.id} data={item} />
    ));
  };

  return (
    <div className="App">
      <h1>This is Analystt.ai Assignment for React Js Developer.</h1>
      <h4>I used Node and Express for Backend and i have Integrated the API using Axios.</h4>
      <h4>For Frontend, React and Material UI is used.</h4>
      <ListWithDetails data={data} />
    </div>
  );
}

export default DataList;
