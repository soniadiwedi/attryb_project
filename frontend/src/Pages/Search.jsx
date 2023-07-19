
import React, { useState } from 'react'
import { Input, Button, Box, Flex, Heading, Text, IconButton, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { SearchIcon } from '@chakra-ui/icons';

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      setSearchResult(null);
  
      if (!searchQuery) {
        setError('Please provide either model or year parameter');
        return;
      }
  
      const response = await axios.get(
        `https://frightened-flannel-shirt-ox.cyclic.app/oem/search?${searchQuery}`
      );
  
      console.log('Response data:', response.data);
  
      setSearchResult(response.data.data);
    } catch (error) {
      console.log('Error:', error);
      if (error.response && error.response.status === 404) {
        setError('OEM specs not found');
      } else {
        setError('Internal Server Error');
      }
    }
  };

 
  
  const searchIconColor = useColorModeValue('gray.700', 'gray.200');
  return (
   <Box>
    <Flex>
    <Input
          placeholder="Search by model or year"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mr={2}
          color={'black'}
          bg="white"
          _hover={{ bg: 'white' }}
          _focus={{ bg: 'white' }}
        />
        <IconButton
          icon={<SearchIcon color={searchIconColor} />}
          aria-label="Search"
          onClick={handleSearch}
          bg="orange.200"
          _hover={{ bg: 'orange.300' }}
        />
    </Flex>
      {error && <Text color="red">{error}</Text>}
      {searchResult && (
        <Box>
          <Heading as="h2" size="md" mb={2}>
            Search Result:
          </Heading>
          <Text>Model: {searchResult.model}</Text>
          <Text>Year: {searchResult.year}</Text>
          {/* Display other data properties as needed */}
        </Box>
      )}


   </Box>
  )
}
