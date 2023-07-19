import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Select,
  Button,
  useToast,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';

const AddInventoryForm = () => {
  const [carModel, setcarModel] = useState('');
  const [odometerKMs, setodometerKMs] = useState('');
  const [majorScratches, setmajorScratches] = useState(0);
  const [originalPaint, setoriginalPaint] = useState(0);
  const [accidentsReported, setaccidentsReported] = useState('');
  const[previousBuyers,setpreviousBuyers]=useState('')
  const[registrationPlace,setregistrationPlace]=useState('')
  const [image,setimage]=useState('')
  const[des,setdes]=useState([])
  const[loading,setloading]=useState(false)
 
  const toast = useToast();
  // for Image
  const hanleImage=(pic)=>{
    setloading(true)
    if(pic===undefined){
        toast({
          title: 'Please select your beautiful Image!',
          description: "We've created your account for you.",
          status: 'warning',
          duration: 4000,
          isClosable: true,
          position:"bottom"
        })
        return ;
      }

      if(pic.type==='image/jpeg' || pic.type==='image/png' ){
        const data=new FormData()
        data.append('file',pic)
        data.append('upload_preset',"TalkWithLoveOnce")
        data.append('cloud_name',"soniadiwedi")
        fetch("https://api.cloudinary.com/v1_1/soniadiwedi/image/upload",{
          method:'POST',
          body:data
        }).then((res)=>res.json()).then(data=>{
          setimage(data.url.toString())
          console.log(data.url.toString());
          setloading(false)
        })
        .catch((err)=>{
          console.log(err)
          setloading(false)
        })
      }else{
        toast({
          title: 'Please select your beautiful Image!',
          description: "We've created your account for you.",
          status: 'warning',
          duration: 4000,
          isClosable: true,
          position:"bottom"
        })
        setloading(false)
        return
      }
    }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInventoryItem = {
     
    };

    try {
      const response = await axios.post(
        'https://frightened-flannel-shirt-ox.cyclic.app/inventory/add',
        newInventoryItem
      );

      console.log('New inventory item added:', response.data);
      toast({
        title: 'Inventory Item Added',
        description: 'The inventory item has been successfully added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset the form fields after successful submission
      carModel('')
      odometerKMs('')
      majorScratches('')
      originalPaint('')
      accidentsReported('')
      previousBuyers('')
      image('')
      des('')
    } catch (error) {
      console.error('Error adding inventory item:', error.message);
      toast({
        title: 'Error',
        description: 'An error occurred while adding the inventory item.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
    <form onSubmit={handleSubmit} >
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
        <Input type="file" p={1.5} accept="image/*" onChange={(e)=>hanleImage(e.target.files[0])}/>
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
    </Box>
  );
};

export default AddInventoryForm;

