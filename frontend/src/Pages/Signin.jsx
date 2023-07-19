import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Signupfun } from '../redux/authredux/action';


export const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location,setLocation]=useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locations = useLocation();
  function handleSignin() {
    setIsLoading(true);
    dispatch(Signupfun({email, password,name,location},navigate))
      .then(() => {
        setIsLoading(false);
       
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error('Sign-in failed. Please check your credentials.');
      });
  }

  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Box w={{ base: "90%", sm: "50%" }} mx="auto" mt={8} p={4}>
      <Heading as="h1" size="lg" mb={4}>
        Sign In
      </Heading>
      <form>
      <FormControl mb={4} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}isRequired>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handlePasswordToggle}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="orange"
          onClick={handleSignin}
          w="20%" 
          isLoading={isLoading}
          loadingText="Signing In..."
        >
          Sign In
        </Button>
        
      </form>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};
