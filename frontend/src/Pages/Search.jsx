import React, { useState } from 'react';
import {
  Input,
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';

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

      setSearchResult(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('OEM specs not found');
      } else {
        setError('Internal Server Error');
      }
    }
  };

  // Get the color for the search icon based on the color mode (light/dark)
  const searchIconColor = useColorModeValue('gray.700', 'gray.200');

  return (
    <Box>
      <Flex>
        <Input
          placeholder="Search by model or year"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mr={2}
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
        <Box mt={4}>
          <Heading as="h2" size="md" mb={2}>
            Search Result:
          </Heading>
          <Text>Model: {searchResult.model}</Text>
          <Text>Year: {searchResult.year}</Text>
          {/* Display other data properties as needed */}
        </Box>
      )}
    </Box>
  );
};
