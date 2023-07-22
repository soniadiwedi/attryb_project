import { Box, Circle } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Oem = () => {
  const [car, setCars] = useState(null);

  useEffect(() => {
    getCount();
  }, []);

  const getCount = () => {
    axios
      .get(`http://localhost:5000/oem/count`)
      .then((res) => {
        console.log(res.data.count);
        setCars(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Circle bg='green.300' w='500px'>

      {car !== null ? <h1>{`Original Equipment Manufacturers: ${car}`}</h1> : <h1>Loading...</h1>}
      </Circle>
    </Box>
  );
};
