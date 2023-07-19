import React, { useState } from 'react';
import { Input, Button, Box, Flex, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { AddNewCar } from './AddNewCar';
import { Oem } from './Oem';

export const Dashboard = () => {
  
    
  return (
    <Box>
    
        <AddNewCar/>
        
       {/* getting all oem */}
        <Oem />
    </Box>
  );
};


