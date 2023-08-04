import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
} from '@chakra-ui/react';
import { UserAuth } from '../context/AuthContext';
import { getUserByEmail } from '../users';
import { createHall, getHallByNumber } from '../hall';
import { getAllHallsByFloor } from '../hall';
import { createEvent } from '../events';

const CreateEvent = () => {

  const navigate = useNavigate();
  const { user, email, userData } = UserAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hallFloor, setHallFloor] = useState('');
  const [hallNumber, setHallNumber] = useState('');
  const [hallData, setHallData] = useState([]);
  const [error, setError] = useState('');

  const handleHallFloorChange = async (e) => {
    const selectedFloor = e.target.value;
    console.log("selectFloor:" + selectedFloor)
    setHallFloor(selectedFloor);

    if (selectedFloor) {
      try {
        const data = await getAllHallsByFloor(selectedFloor);
        // console.log(data);
        setHallData(data);
        setHallNumber('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !startDate || !endDate || !hallFloor || !hallNumber) {
      setError('Review your input!');
      return;
    }

    try {
      // console.log({
      //   title,
      //   description,
      //   startDate,
      //   endDate,
      //   modified: '',
      //   hallFloor,
      //   hallNumber,
      //   userId: userData?.id,
      // });
      
      const selectedHall = await getHallByNumber(hallNumber);

      if (!selectedHall) {
        console.error('Selected hall not found!');
        return;
      }

      const hallId = selectedHall.id;

      const eventBody = {
        title,
        description,
        startDate,
        endDate,
        hallId,
        modified: '',
        userId: userData?.id,
      };

      await createEvent(eventBody);

      console.log("succes");
      navigate('/event', { replace: true });
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Create your own event</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            and let everyone know{' '}
            <Link color={'blue.400'} href="#">
              about it
            </Link>{' '}
            ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Insert a title" onChange={(e) => setTitle(e.target.value)} />
            </FormControl>

            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Insert a description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl id="startDate" isRequired>
              <FormLabel>Start Date</FormLabel>
              <Input placeholder="yyyy-mm-dd" onChange={(e) => setStartDate(e.target.value)} />
            </FormControl>

            <FormControl id="endDate" isRequired>
              <FormLabel>End Date</FormLabel>
              <Input placeholder="yyyy-mm-dd" onChange={(e) => setEndDate(e.target.value)} />
            </FormControl>

            <FormControl id="hallFloor" isRequired>
              <FormLabel>Hall Floor</FormLabel>
              <Select
                placeholder="Select a floor"
                value={hallFloor}
                onChange={handleHallFloorChange}
              >
                {/* <option value="0">Floor 0</option> */}
                <option value="1">Floor 1</option>
                <option value="2">Floor 2</option>
                <option value="3">Floor 3</option>
                <option value="4">Floor 4</option>
                <option value="5">Floor 5</option>
                <option value="6">Floor 6</option>
              </Select>
            </FormControl>

            {hallFloor && hallData.length > 0 && (
              <FormControl id="hallNumber" isRequired>
                <FormLabel>Hall Number</FormLabel>
                <Select
                  placeholder="Select a hall"
                  value={hallNumber}
                  onChange={(e) => setHallNumber(e.target.value)}
                >
                  {hallData.map((hall) => (
                    <option key={hall.id} value={hall.hallNumber}>
                      {hall.name} {hall.hallNumber}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}

            {error && (
              <Box bg={'red.500'} rounded={'md'} p={2}>
                <Text color={'white'} textAlign={'center'} fontSize={'sm'}>
                  {error}
                </Text>
              </Box>
            )}

            <Stack spacing={10}>
              <Button
                onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Create event
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default CreateEvent;
