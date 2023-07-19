import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Flex, Image, Link as ChakraLink, Spacer, Button, Text, Circle } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../image/logo.png';
import { logoutData } from '../redux/authredux/action';
import { Search } from '../Pages/Search';

export const Navbar = () => {
  const isLoggedIn = useSelector((store) => store.authReducer.token); 
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout = () => {
    dispatch(logoutData())
    navigate("/")
  };

  return (
    <Box as="nav" bg="orange.500" color="white" py={4}>
      <Flex align="center" maxW="1200px" mx="auto">
        <Link to="/dashboard">
          <Image src={logo} alt="Logo" h="60px" ml="23px" />
          <Text ml="11px" fontWeight="bold" fontSize="md">
            Dream car
          </Text>
        </Link>
        <Search/>
        {/* Spacer to push elements to the right */}
        <Spacer />

        {/* Conditional rendering */}
        {isLoggedIn ? (
          <Button colorScheme="orange" onClick={handleLogout} fontWeight="bold" fontSize="20px">
            Logout
          </Button>
        ) : (
          
          <Text as={Link} to="/login" color="white" fontSize="20px">
            Login
          </Text>
        )}
      </Flex>
    </Box>
  );
};
