import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { loginFun } from '../redux/authredux/action';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility
    const [isLoading, setIsLoading] = useState(false); // New state for login loading
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
  
    function handleLogin() {
        setIsLoading(true);
        dispatch(loginFun(email, password))
          .then(() => {
            setIsLoading(false);
            navigate(location.state);
          })
          .catch((error) => {
            setIsLoading(false)
          });
    }
  
    const handlePasswordToggle = () => {
      setShowPassword((prevState) => !prevState);
    };
  
    return (
      <Box w={{ base: "90%", sm: "50%" }} mx="auto" mt={8} p={4}>
        <Heading as="h1" size="lg" mb={4}>
          Log In
        </Heading>
        <form>
          <FormControl mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
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
            onClick={handleLogin}
            w="20%"
            isLoading={isLoading}
            loadingText="Logging In..."
          >
            Login
          </Button>
          <Box mt={4} textAlign="center">
              <a href="/signin">Create New Account</a>
            </Box>
        </form>
        <ToastContainer position="bottom-right" />
      </Box>
    )
};


