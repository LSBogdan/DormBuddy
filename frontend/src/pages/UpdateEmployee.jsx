import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { getUserById, updateUser } from '../users';
import { addPhotoToBucket, deletePhotoFromBucket } from '../aws';
import { HiEye, HiEyeOff, HiX } from 'react-icons/hi';

const UpdateEmployee = () => {
  const location = useLocation();
  const employeeId = location.pathname.split('/').pop();

  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const [photo, setPhoto] = useState(null);
  const photoInputRef = useRef(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (employeeId) {
      getUserById(employeeId)
        .then((data) => {
          setEmployeeData(data);
          setFirstName(data?.firstName || '');
          setLastName(data?.lastName || '');
          setMobileNumber(data?.mobileNumber || '');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [employeeId]);

  const gender = employeeData?.gender;
  const role = employeeData?.role;
  const email = employeeData?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName === '' || lastName === '' || mobileNumber === '' || photo === null) {
      setError('Review your input!');
      return;
    }

    try {
      const updatedEmployee = {
        id: employeeId,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        mobileNumber: mobileNumber,
        email: email,
        role: role,
      };

      const name = email;

      await deletePhotoFromBucket(name);

      await updateUser(updatedEmployee);

      await addPhotoToBucket(name, photo);

      navigate('/allEmployes', { replace: true });
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
              <Input
                autoComplete="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                autoComplete="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
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
                    <Image src={URL.createObjectURL(photo)} alt="Selected Photo" maxH="200px" />
                    <Button size="sm" variant="ghost" colorScheme="red" onClick={handleRemovePhoto}>
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

export default UpdateEmployee;
