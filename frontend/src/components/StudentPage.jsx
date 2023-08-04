import {
  chakra,
  Box,
  Stack,
  Link,
  HStack,
  Text,
  Container,
  Icon,
  Avatar,
  Tooltip,
  StackProps,
  Divider,
  useColorModeValue,
  Button
} from '@chakra-ui/react';
import { AiFillGithub } from 'react-icons/ai';
import { UserAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getUserByEmail } from '../users';
import { updateUser } from '../users';
import { Link as Redirect, useNavigate } from 'react-router-dom';
import { getProfilePhoto } from '../aws';
import { getRoomById } from '../room';

const Student = ({
  id,
  firstName,
  lastName,
  gender,
  mobileNumber,
  email,
  faculty,
  roomId,
  currentUserRole
}) => {
  const navigate = useNavigate();

  const [studentPhoto, setStudentPhoto] = useState('');
  const [roomData, setRoomData] = useState([]);

  useEffect( () => {

    getProfilePhoto(email)
      .then( (data) => {
        setStudentPhoto(data);
      })
      .catch( (error) => {
        console.error(error);
      })
  }, [id]);

  useEffect(() => {
    if (roomId) {
      getRoomById(roomId)
        .then((data) => {
          // console.log(data);
          setRoomData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [email]);

  const handleEdit = (id) => {
    navigate(`/updateStudent/${id}`);
  };

  const handleRoom = (roomNumber) => {
    navigate(`/roomPhotos/${roomNumber}`);
  }
  
  const roomNumber = roomData?.roomNumber;
  const floor = roomData?.floor;
  const price = roomData?.price;

  return (
    <Container maxW="5xl" p={{ base: 5, md: 6 }}>
      <Stack
        w="22rem"
        spacing={2}
        p={4}
        border="1px solid"
        borderColor={useColorModeValue('gray.400', 'gray.600')}
        rounded="md"
        margin="0 auto"
        _hover={{
          boxShadow: useColorModeValue(
            '0 4px 6px rgba(160, 174, 192, 0.6)',
            '0 4px 6px rgba(9, 17, 28, 0.4)'
          )
        }}
      >
        <HStack justifyContent="space-between" alignItems="baseline">
          <Tooltip
            label={firstName}
            aria-label={firstName}
            placement="right-end"
            size="sm"
          >
            <Box pos="relative">
              <Avatar src={studentPhoto} size="xl" borderRadius="md" />
            </Box>
          </Tooltip>

          {currentUserRole === 'ADMINISTRATOR' && (
            <Button
              top="0.4rem"
              _hover={{
                bg: 'rgb(175, 211, 226)'
              }}
              onClick={() => handleEdit(id)}
            >
              Edit
            </Button>
          )}
        </HStack>

        <br />
        <chakra.h1 fontSize="xl" fontWeight="bold">
          {email}
        </chakra.h1>
        <Divider />
        <Text fontSize="md">
          {firstName} {lastName}
        </Text>
        <Divider />
        <Text>{gender}</Text>
        <Divider />
        <Text>{mobileNumber}</Text>
        <Divider />
        <Text>{"STUDENT"}</Text>
        <Divider />
        <Text>
          {faculty}
        </Text>
        <Divider />
        <Link onClick={() => handleRoom(roomNumber)}>
              {'RoomNo '} {roomNumber}
            </Link>
        <Divider />
        <Text>
          {'Price '}  {price}
        </Text>
      </Stack>
    </Container>
  );
};

export default Student;
