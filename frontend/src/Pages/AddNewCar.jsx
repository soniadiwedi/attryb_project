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
  
  Box,
} from "@chakra-ui/react";
import axios from "axios";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import Select from "react-select";
export const AddNewCar = () => {
  const [nameOfModel, setnameOfModel] = useState("");
  const [yearOfModel, setyearOfModel] = useState("");
  const [newPriceOfVehicle, setnewPriceOfVehicle] = useState(0);
  const [colors, setcolor] = useState([]);
  const [mileage, setmileage] = useState(0);
  const [power, setpower] = useState(0);
  const [maxSpeed, setmaxspeed] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
  ];

  console.log("color", colors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      nameOfModel: nameOfModel,
      yearOfModel: yearOfModel,
      newPriceOfVehicle: newPriceOfVehicle,
      colors: colors,
      mileage: mileage,
      power: power,
      maxSpeed: maxSpeed,
    };
    console.log(formData);
    // Get the token from localStorage
    let token = JSON.parse(localStorage.getItem("token"));
    console.log("token", token);

    try {
      let res = await axios.post(`http://localhost:5000/oem/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);
      toast({
        title: "Account created.",
        description: res.data.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setnameOfModel("");
      setyearOfModel("");
      setnewPriceOfVehicle("");
      setcolor([]);
      setmileage(0);
      setpower(0);
      setmaxspeed(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box mb="5" mt="5">
      <Button onClick={onOpen} backgroundColor={"orange.200"}>
        Add New Car
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader backgroundColor="yellow">
            Original Equipment Manufacturers Specifications
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={
                handleSubmit
             }
            >
              <FormControl mb={4}>
                <FormLabel>Model</FormLabel>
                <Input
                  type="text"
                  value={nameOfModel}
                  onChange={(e) => setnameOfModel(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Year</FormLabel>
                <Input
                  type="text"
                  value={yearOfModel}
                  onChange={(e) => setyearOfModel(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>List Price</FormLabel>

                <Input
                  type="number"
                  value={newPriceOfVehicle}
                  onChange={(e) => setnewPriceOfVehicle(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Colors</FormLabel>
                <Select
                  options={optionList}
                  placeholder="Select color"
                  value={colors}
                  onChange={setcolor}
                  isSearchable={true}
                  isMulti
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Mileage</FormLabel>
                <Input
                  type="number"
                  value={mileage}
                  onChange={(e) => setmileage(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Power</FormLabel>
                <Input
                  type="number"
                  value={power}
                  onChange={(e) => setpower(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Max Speed</FormLabel>
                <Input
                  type="number"
                  value={maxSpeed}
                  onChange={(e) => setmaxspeed(e.target.value)}
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
