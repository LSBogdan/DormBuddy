import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  HStack,
  VStack,
  Stack,
  Link,
  Text,
  Icon,
  Tag,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { GoPrimitiveDot } from 'react-icons/go';

const EventComment = (props) => {
  
  const {
    id,
    description,
    publishDate,
    eventId,
    userId,
  } = props;

  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const hoverBorderColor = useColorModeValue('blue.300', 'blue.100');
  const hoverBoxShadow = useColorModeValue(
    '0 4px 6px rgba(160, 174, 192, 0.6)',
    '0 4px 6px rgba(9, 17, 28, 0.9)'
  );
  const tagColorScheme = useColorModeValue('blackAlpha', 'gray');
  const hoverBgColor = useColorModeValue('gray.200', 'gray.700');
  const linkHoverColor = useColorModeValue('blue.400', 'blue.400');

  return (
    <Container p={4} centerContent>
      <Box p={4} bg={bgColor} rounded="lg" mb={2} w="full">
        <Box textAlign="left">
          <Text fontSize="md" color="gray.500" noOfLines={2} lineHeight="normal">
            {description}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {publishDate}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default EventComment;
