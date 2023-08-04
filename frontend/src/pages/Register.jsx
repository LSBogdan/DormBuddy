import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { createUser } from '../users';
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
import { addPhotoToBucket } from '../aws';

const Register = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [faculty, setFaculty] = useState('');
  const photoInputRef = useRef(null);
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      firstName === '' ||
      lastName === '' ||
      gender === '' ||
      mobileNumber === '' ||
      role === '' ||
      email === '' ||
      password === '' ||
      photo === null
    ) {
      setError('Review your input!');
    } else if (!isValidEmail(email)) {
      setError('Invalid email format!');
    } else {
      try {
        await signUp(email, password);

        console.log({
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          mobileNumber: mobileNumber,
          role: role,
          faculty: faculty,
          email: email,
        });

        const response = await createUser({
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          mobileNumber: mobileNumber,
          role: role,
          email: email,
          faculty: faculty,
          photo: photo,
        });

        const name = email;

        await addPhotoToBucket(name, photo);

        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
          <Heading fontSize={'4xl'}>Create a new account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input autoComplete="First Name" onChange={(e) => setFirstName(e.target.value)} />
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input autoComplete="Last Name" onChange={(e) => setLastName(e.target.value)} />
            </FormControl>


            <FormControl id="gender" isRequired>
              <FormLabel>Gender</FormLabel>
              <Select placeholder="Select gender" onChange={(e) => setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
              </Select>
            </FormControl>

            <FormControl id="mobileNumber" isRequired>
              <FormLabel>Mobile number</FormLabel>
              <Input autoComplete="Mobile number" onChange={(e) => setMobileNumber(e.target.value)} />
            </FormControl>
            <FormControl id="role" isRequired>
              <FormLabel>Role</FormLabel>
              <Select placeholder="Select role" onChange={(e) => setRole(e.target.value)}>
                <option value="STUDENT">STUDENT</option>
                <option value="JANITOR">JANITOR</option>
                <option value="MAINTENANCE_MAN">MAINTENANCE MAN</option>
              </Select>
            </FormControl>

              {role === 'STUDENT' && (
                <FormControl id="faculty" isRequired>
                <FormLabel>Faculty</FormLabel>
                <Input autoComplete="Faculty" onChange={(e) => setFaculty(e.target.value)} />
                </FormControl>
              )}

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={email !== '' && !isValidEmail(email)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleTogglePassword}>
                    <Icon
                      as={showPassword ? HiEyeOff : HiEye}
                      color={showPassword ? 'gray.600' : 'gray.400'}
                    />
                  </Button>
                </InputRightElement>
              </InputGroup>
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
              <Text fontSize={'md'} color={'red.500'}>
                {error}
              </Text>
            )}
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
