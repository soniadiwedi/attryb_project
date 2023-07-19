import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

import { useState } from "react";
import { useToast } from '@chakra-ui/react'

export const AddNewCar = () => {

   const[model,setmodel]=useState('')
   const[year, setyear ]=useState("")
   const[listprice , setListPrice] = useState("");
   const[color,setcolor]=useState([])
   const[mileage,setmileage]=useState('')
   const[power,setpower]=useState('')
   const[maxSpeed,setmaxspeed]=useState('')
  const { isOpen, onOpen, onClose } = useDisclosure();
    const toast=useToast()

  const handleColorChange = (e) => {
    const selectedColors = Array.from(e.target.selectedOptions, (option) => option.value);
    setcolor(selectedColors);
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("hii");
  
    const formData = {
      model: model,
      year: year,
      listPrice: listprice,
      colors: color,
      mileage: mileage,
      power: power,
      maxSpeed: maxSpeed,
    };
  
    
      // Get the token from localStorage
      let token = JSON.parse(localStorage.getItem("token"));
      console.log("token", token);
  
      try{
        let res= await axios.post(`https://frightened-flannel-shirt-ox.cyclic.app/oem/add`,formData,{
         headers: {
           Authorization: `Bearer ${token}`,
         },
        })
         
        console.log(res)
        toast({
            title: 'Account created.',
            description: res.data.msg,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          setmodel('');
          setyear('');
          setListPrice('');
          setcolor([]);
          setmileage('');
          setpower('');
          setmaxspeed('');
        }catch(err){
           console.log(err)
        } 
  };

  return (
    <Box mb="5" mt='5'>
      <Button onClick={onOpen} backgroundColor={"orange.200"}>Add New Car</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Original Equipment Manufacturers Specifications
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Model</FormLabel>
                <Input
                  type="text"
                 
                  value={model}
                  onChange={(e)=>setmodel(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Year</FormLabel>
                <Input
                 type="number"
                  value={year}
                  onChange={(e)=>setyear(e.target.value)}
                />
              
              
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>List Price</FormLabel>
               
                <Input
                 type="number"
                  value={listprice}
                  onChange={(e)=>setListPrice(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Colors</FormLabel>
                <Select

                  value={color}
                  onChange={handleColorChange} // Use the handleColorChange function
                  required
                >
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  {/* Add more color options as needed */}
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Mileage</FormLabel>
                <Input
                 type="number"
                  value={mileage}
                  onChange={(e)=>setmileage(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Power</FormLabel>
                <Input
                 type="number"
                  value={power}
                  onChange={(e)=>setpower(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Max Speed</FormLabel>
                <Input
                 type="number"
                  value={maxSpeed}
                  onChange={(e)=>setmaxspeed(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="orange" type="submit" w="100%">
                Create
              </Button>
            </form>
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </Box>
  );
};
