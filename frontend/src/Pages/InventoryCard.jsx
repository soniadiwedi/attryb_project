import { Box, Center, Flex, Image, Spinner, Text, Menu, MenuButton, MenuList, MenuItem, IconButton, VStack, HStack, Spacer, Button } from '@chakra-ui/react';
import { HamburgerIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { EditInventory } from './EditInventory';

export const InventoryCard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  useEffect(() => {
    getInventory();
  }, []);

  const handleOpenEditModal = (car) => {
    setSelectedCar(car); // Set the selected car for editing
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleCloseEditModal = () => {
    setSelectedCar(null); // Clear the selected car
    setIsEditModalOpen(false); // Close the edit modal
  };

  const getInventory = async () => {
    let token = JSON.parse(localStorage.getItem('token'));
    setLoading(true);
    try {
      const res = await axios.get('https://frightened-flannel-shirt-ox.cyclic.app/inventory', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);
      setCars(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCar = (carId) => {
    let token = JSON.parse(localStorage.getItem('token'));
    axios
      .delete(`https://frightened-flannel-shirt-ox.cyclic.app/inventory/delete/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
       
        console.log('Car deleted successfully:', carId);
        // Update the cars state to remove the deleted car from the UI
        setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      })
      .catch((err) => {
        // If there is an error during the delete request, you can handle it here
        console.log('Error deleting car:', carId, err);
      });
  };
  

  return (
    <Flex flexWrap="wrap" justifyContent="center">
      {loading ? (
        // If loading is true, show a loading spinner
        <Spinner size="xl" />
      ) : (
        // If loading is false, show the inventory items
        cars.map((car) => (
          <Box
            key={car._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            my="4"
            shadow="md"
            w="300px" // Fixed width for each card
          >
            <Center mb="4">
              <Image src={car.image} alt="Car Image" maxH="150px" objectFit="cover" />
            </Center>
            <VStack spacing="2">
              <Text fontWeight="semibold">{car.carModel}</Text>
              <Text fontSize="sm" color="gray.500">
                {car.des}
              </Text>
              <HStack>
                <Text>Major Scratches:</Text>
                <Text fontWeight="semibold">{car.majorScratches ? "Yes" : "No"}</Text>
                <Spacer />
                <Text>Odometer Kilometers:</Text>
                <Text fontWeight="semibold">{car.odometerKMs}</Text>
              </HStack>
              <HStack>
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleOpenEditModal(car)} // Open the edit modal with the selected car data
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteCar(car._id)}
                />
              </HStack>
            </VStack>
          </Box>
        ))
      )}
      {selectedCar && (
        <EditInventory
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          car={selectedCar}
        />
      )}
    </Flex>
  );
};
