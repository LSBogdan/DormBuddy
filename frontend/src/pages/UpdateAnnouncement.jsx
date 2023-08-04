import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
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
} from '@chakra-ui/react';
import { Link as Redirect, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAnnouncementById, updateAnnouncement } from '../announcements';
import { getUserByEmail } from '../users';

const UpdadeAnnouncement = () => {

    const location = useLocation();
    const announcementId = location.pathname.split("/").pop();
    const navigate = useNavigate();

    const { user, email, userData } = UserAuth();
    const [announcementData, setAnnouncementData] = useState(null);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
  
    const announcementPublishDate = announcementData?.publishDate;
    const announcementUserId = announcementData?.userId;

    const role = userData?.role;
    const userId = userData?.id;

    useEffect(() => {

        getAnnouncementById(announcementId)
          .then((data) => {
            // console.log(data);
            setAnnouncementData(data);
          })
          .catch((error) => {
            console.error("GetAnnouncementByIdError");
          });
      }, [announcementId]);
      

      const handleSubmit = async (e)  => {
        e.preventDefault();

    if(
        title === "" || 
        description === ""
       ) {
            setError("Review your input!");
            return;
        }

        try{
            const announcementBody = {
                id: announcementId,
                title: title,
                description: description,
                publishDate: announcementPublishDate,
                modified: "",
                userId: announcementUserId
            }

            // console.log(announcementBody);

            await updateAnnouncement(announcementBody);
            navigate('/announcement', {replace: true});

        } catch( error ) {
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
              <Heading fontSize={'4xl'}>Update your announcement </Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                and let everyone knows <Link color={'blue.400'}>about it</Link> ✌️
              </Text>
            </Stack>
            <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <FormControl id="title" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder='Insert a title'
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
    
                <FormControl id="description" isRequired>
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder='Insert a description'
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
    
                {error && (
                  <Box bg={'red.500'} rounded={'md'} p={2}>
                    <Text color={'white'} textAlign={'center'} fontSize={'sm'}>
                      {error}
                    </Text>
                  </Box>
                )}                  
            <Stack spacing={10}>
            {(role === 'ADMINISTRATOR' || userId === announcementUserId) && (
              <Button
                onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Update announcement
              </Button>
            )}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      );
};

export default UpdadeAnnouncement;