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
import { UserAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';  
import {Link as Redirect, useNavigate} from 'react-router-dom';
import { getRoomById } from '../room';


  const AccountCard = () => {

    const navigate = useNavigate();

    const {userData, photo, email} = UserAuth();
    const [roomData, setRoomData] = useState(null);

    const id = userData?.id;
    const firstName = userData?.firstName; 
    const lastName = userData?.lastName;
    const gender = userData?.gender;
    const mobileNumber = userData?.mobileNumber;
    const role = userData?.role;
    const faculty = userData?.faculty;
    const roomId = userData?.roomId;

    const price = roomData?.price;
    const roomNumber = roomData?.roomNumber;

    useEffect( () => {

      if(role === 'STUDENT') {
        getRoomById(roomId)
          .then( (data) => {
            // console.log(data);
            setRoomData(data);
          })
          .catch( (error) => {
            console.error(error);
          })
      }
        
    }, [userData]);

    const handleEditUser = () => {
      navigate('/updateUser');
      
    }
  
    const handleMyEvents = () => {
      navigate('/myEvent');
    }
  
    const handleMyAnnouncements = () => {
      navigate('/myAnnouncement');
    }
  
    const handleRoom = (roomNumber) => {
      // console.log("HandleRoom " + roomNumber);
      navigate(`/roomPhotos/${roomNumber}`);
    }
    
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
              label= {firstName}
              aria-label= {firstName}
              placement="right-end"
              size="sm"
            >
              <Box pos="relative">
                <Avatar
                  src = {photo}
                  size="xl"
                  borderRadius="md"
                />
              </Box>
            </Tooltip>

            <Button onClick={handleEditUser} 
                    top = "0.4rem"
                    _hover={{
                      bg: 'rgb(175, 211, 226)',
                    }}
            >
              Edit
            </Button>
          </HStack>
          
          <br></br>
          <Button onClick={handleMyEvents}
                              _hover={{
                                bg: 'rgb(175, 211, 226)',
                              }}        >
              My events
            </Button>
          <Button onClick={handleMyAnnouncements}
                              _hover={{
                                bg: 'rgb(175, 211, 226)',
                              }}>
              My Announcements
            </Button>
          
          <br/>
          <chakra.h1 fontSize="xl" fontWeight="bold">
          {email}
          </chakra.h1>
          <Divider />
          <Text fontSize="md">
            {firstName} {lastName} 
          </Text>
          <Divider />
          <Text>
            {gender}
          </Text>
          <Divider />
          <Text>
            {mobileNumber}
          </Text>
          <Divider />
          <Text>
            {role}
          </Text>
          <Divider />
          
          {userData?.role === "STUDENT" && userData?.roomId && (
          <>
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
          </>
        )}
      </Stack>
      </Container>
    );
};
  export default AccountCard;
