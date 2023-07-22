import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export const EditInventory = ({ car, isOpen, onClose, onUpdate }) => {
  const [carModel, setcarModel] = useState(car.carModel||"");
  const [odometerKMs, setodometerKMs] = useState(car.odometerKMs||"");
  const [majorScratches, setmajorScratches] = useState(car.majorScratches||0);
  const [originalPaint, setoriginalPaint] = useState(car.originalPaint||0);
  const [accidentsReported, setaccidentsReported] = useState(car.accidentsReported||"");
  const [previousBuyers, setpreviousBuyers] = useState(car.previousBuyers||"");
  const [registrationPlace, setregistrationPlace] = useState(car.registrationPlace||"");
  const [image, setimage] = useState(car.image||"");
  const [des, setdes] = useState(car.des || []); 
  const { onOpen } = useDisclosure();
  const [loading, setloading] = useState(false);

  const toast = useToast();
  // for Image
  const hanleImage = (pic) => {
    setloading(true);
    if (pic === undefined) {
      toast({
        title: "Please select your beautiful Image!",
        description: "We've created your account for you.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "TalkWithLoveOnce");
      data.append("cloud_name", "soniadiwedi");
      fetch("https://api.cloudinary.com/v1_1/soniadiwedi/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setimage(data.url.toString());
          console.log(data.url.toString());
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      toast({
        title: "Please select your beautiful Image!",
        description: "We've created your account for you.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      carModel,
      odometerKMs,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      image,
      des,
    };
    let token = JSON.parse(localStorage.getItem("token"));
    axios
      .patch(
        `http://localhost:5000/inventory/edit/${car._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // Call the onUpdate callback with the updated car data
        onUpdate(res.data.updatedInventory); // Assuming the response data contains the updated car object
        console.log("edit",res.data);
        toast({
          title: res.data.msg,
          status: 'success',
          duration: 4000, // Display the toast for 4 seconds
          isClosable: true,
          position: 'bottom',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Button onClick={onOpen}>Edit Inventory</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Car Model</FormLabel>
                <Input
                  type="text"
                  value={carModel}
                  onChange={(e) => setcarModel(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Odo Meters</FormLabel>
                <Input
                  type="number"
                  value={odometerKMs}
                  onChange={(e) => setodometerKMs(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Major Scratches</FormLabel>
                <Input
                  type="text"
                  value={majorScratches}
                  onChange={(e) => setmajorScratches(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Original Paint</FormLabel>
                <Input
                  type="text"
                  value={originalPaint}
                  onChange={(e) => setoriginalPaint(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Accident Reported</FormLabel>
                <Input
                  type="number"
                  value={accidentsReported}
                  onChange={(e) => setaccidentsReported(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Previous Buyers</FormLabel>
                <Input
                  type="number"
                  value={previousBuyers}
                  onChange={(e) => setpreviousBuyers(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Registration Place</FormLabel>
                <Input
                  type="text"
                  value={registrationPlace}
                  onChange={(e) => setregistrationPlace(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="pic">
                <FormLabel>Upload Car Picture</FormLabel>
                <Input
                  type="file"
                  p={1.5}
                  accept="image/*"
                  onChange={(e) => hanleImage(e.target.files[0])}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={des}
                  onChange={(e) => setdes(e.target.value)}
                  required
                />
              </FormControl>

              <Button colorScheme="orange" type="submit" w="50%">
                Add Inventory Item
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
