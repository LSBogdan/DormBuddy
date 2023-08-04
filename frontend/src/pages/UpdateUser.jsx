import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { createUser } from "../users";
import { getUserByEmail } from '../users';
import { updateUser } from '../users';
import { addPhotoToBucket, getProfilePhoto } from '../aws';
import { deletePhotoFromBucket } from '../aws';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Icon,
  Image,
  Select,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff, HiX } from 'react-icons/hi';

const UpdateUser = () => {
  
  const { user, email, userData } = UserAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(userData?.firstName || '');
  const [lastName, setLastName] = useState(userData?.lastName || '');
  const [mobileNumber, setMobileNumber] = useState(userData?.mobileNumber || '');

  const [photo, setPhoto] = useState(null);
  const photoInputRef = useRef(null);

  const [error, setError] = useState('');

  const id = userData?.id;
  const gender = userData?.gender;
  const role = userData?.role;
  const faculty = userData?.faculty;
  const roomId = userData?.roomId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName === '' || lastName === '' || mobileNumber === '' || photo === null) {
      setError('Review your input!');
      return;
    }

    try {
      const updatedUser = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        mobileNumber: mobileNumber,
        role: role,
        email: email,
        faculty: faculty,
        roomId: roomId,
        photo: photo,
      };

      const name = email;
      console.log(updateUser);

      await deletePhotoFromBucket(name);

      await updateUser(updatedUser);

      await addPhotoToBucket(name, photo);

      navigate('/account', { replace: true });
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleRemovePhoto = () => {
    setPhoto(null);

    if (photoInputRef.current) {
      photoInputRef.current.value = '';
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
          <Heading fontSize={'4xl'}>Update your account</Heading>
          <Heading fontSize={'4xl'}>informations</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            and enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input autoComplete="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input autoComplete="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </FormControl>

            <FormControl id="mobileNumber" isRequired>
              <FormLabel>Mobile number</FormLabel>
              <Input
                autoComplete="Mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </FormControl>

            <FormControl id="photo" isRequired>
              <FormLabel fontSize="xl">Photo</FormLabel>
              <Flex alignItems="center" justifyContent="center">
                {!photo ? (
                  <Button
                    as="label"
                    htmlFor="photo-input"
                    variant="outline"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'blue.500' }}
                    fontSize="xl"
                    cursor="pointer"
                    borderRadius="md"
                    p={2}
                  >
                    Select a photo
                  </Button>
                ) : (
                  <Box
                    border="1px"
                    borderColor="gray.300"
                    borderRadius="md"
                    p={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    <Image
                      src={URL.createObjectURL(photo)}
                      alt="Selected Photo"
                      maxH="200px"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={handleRemovePhoto}
                    >
                      <Icon as={HiX} />
                    </Button>
                  </Box>
                )}
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  ref={photoInputRef}
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
              </Flex>
            </FormControl>

            {error && (
              <Box bg={'red.500'} rounded={'md'} p={2}>
                <Text color={'white'} textAlign={'center'} fontSize={'sm'}>
                  {error}
                </Text>
              </Box>
            )}

            <Button
              onClick={handleSubmit}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Update
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default UpdateUser;
