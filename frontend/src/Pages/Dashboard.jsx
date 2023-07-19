import React, { useState } from 'react';
import { Input, Button, Box, Flex, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { AddNewCar } from './AddNewCar';
import { Oem } from './Oem';
import AddInventoryForm from './AddInventoryForm';
import { ModalInventory } from './ModalInventory';


export const Dashboard = () => {
  
    
  return (
    <Box>
    
        <AddNewCar/>
        
       {/* getting all oem */}
        <Oem />
        <ModalInventory/>
      
    </Box>
  );
};


