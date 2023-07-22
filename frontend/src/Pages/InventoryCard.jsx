import {
  Box,
  Center,
  Flex,
  Image,
  Spinner,
  Text,
 
  IconButton,
  VStack,
  HStack,
  Spacer,
  Button,
  Grid,
  Divider,
  Skeleton,
  Stack,
  SkeletonCircle,
} from "@chakra-ui/react";
import { HamburgerIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { EditInventory } from "./EditInventory";
import { useToast } from "@chakra-ui/react";
export const InventoryCard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [inventory, setInventory] = useState([]);
  const toast = useToast();
  useEffect(() => {
    // Fetch the initial inventory data from the server
    fetchInventoryData();
  }, []);

  const handleOpenEditModal = (car) => {
    setSelectedCar(car); // Set the selected car for editing
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleCloseEditModal = () => {
    setSelectedCar(null); // Clear the selected car
    setIsEditModalOpen(false); // Close the edit modal
  };

  const fetchInventoryData = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    let id =JSON.parse(localStorage.getItem("uid"));
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/inventory/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      setInventory(res.data.deals);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateInventory = (updatedCar) => {
    setInventory((prevInventory) => {
      // Find the index of the updated car in the inventory array
      const updatedIndex = prevInventory.findIndex(
        (car) => car._id === updatedCar._id
      );

      // If the updated car is found in the inventory, update it
      if (updatedIndex !== -1) {
        const newInventory = [...prevInventory];
        newInventory[updatedIndex] = updatedCar;
        return newInventory;
      }

      // If the updated car is not found in the inventory (this should not happen)
      return prevInventory;
    });
  };
  const handleDeleteCar = (carId) => {
    let token = JSON.parse(localStorage.getItem("token"));
    axios
      .delete(`http://localhost:5000/inventory/delete/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Car deleted successfully:", carId);
        setInventory((prevCars) => prevCars.filter((car) => car._id !== carId));
        toast({
          title: res.data.msg,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
      })
      .catch((err) => {
        console.log("Error deleting car:", carId, err);
      });
  };

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      ml="10%"
      gap={6}
      justifyContent="center"
    >
      {loading ? (
       <Stack>
       <Skeleton height="20px" />
       <Skeleton height="20px" />
       <SkeletonCircle textAlign={"center"} size="20" />
       <Skeleton height="20px" />
     </Stack>
      ) : (
        inventory.map((car,i) => (
          
          <Box
            key={car._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            _hover={{ boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;` }}
            p="4"
            my="4"
            shadow="md"
            w="400px"
          >
            <Center mb="4">
              <Image
                src={car.img}
                alt="Car Image"
                maxH="180px"
                objectFit="cover"
              />
            </Center>
            <VStack spacing="2">
              <Text fontWeight="bold">{car.oemId.nameOfModel}</Text>
              <Text fontSize="sm" color="gray.500">
                {car.des}
              </Text>

              <HStack>
                <Text color={'grey'}>Major Scratches:</Text>
                <Text
                  fontWeight="semibold"
                  
                >
                  {car.majorScratches}
                </Text>
                <Spacer />
                <Text>Odometer Kilometers:</Text>
                <Text fontWeight="semibold">{car.km}</Text>
              </HStack>
              <HStack>
                <Text color={'grey'}>Original Paint</Text>
                <Text >
                  {car.orginalPaint}
                </Text>
                <Text color={'grey'}>Registration Place :</Text>
                <Text>
                  {car.registrationPlace}
                </Text>

              </HStack>
              <HStack>
                <Text color={'grey'}></Text>
                <Text >
                 
                </Text>
                <Text color={'grey'} >Colors :</Text>
                <Text display={'flex'}  gap='2'>
                  {car.oemId.colors.map((el)=>{
                    return <Box bg={el} h='20px' w='20px'></Box>
                  })}
                </Text>

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
          onUpdate={handleUpdateInventory}
          car={selectedCar}
        />
      )}
    </Grid>
  );
};
