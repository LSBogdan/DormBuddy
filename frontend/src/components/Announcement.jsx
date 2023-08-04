import React, { useState, useEffect } from 'react';
import {
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
import { GoChevronRight } from 'react-icons/go';
import { Link as Redirect, useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { deleteAnnouncement } from '../announcements';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { getUserById } from '../users';
import { getProfilePhoto } from '../aws';

const Announcement = ({
  id,
  title,
  description,
  publishDate,
  modified,
  userId,
  commentOrUpdate
}) => {
  const navigate = useNavigate();

  const { user } = UserAuth();

  const[announcementUserData, setAnnouncementUserData] = useState(null);
  const[announcementUserPhoto, setAnnouncementUserPhoto] = useState('');

  useEffect( () => {

    getUserById(userId)
      .then( (data) => {
        setAnnouncementUserData(data);
      })
      .catch( (error) => {
        console.error(error);
      })
  }, [userId]);

  const currentUserId = announcementUserData?.id;
  const firstName = announcementUserData?.firstName;
  const lastName = announcementUserData?.lastName;
  const role = announcementUserData?.role;

  useEffect( () => {

    getProfilePhoto(announcementUserData?.email)
      .then( (data) => {
        setAnnouncementUserPhoto(data);
      })
      .catch( (error) => {
        console.error(error);
      })
  }, [currentUserId]);

  const canComment = commentOrUpdate === 'COMMENT';
  const canUpdate =
    (role === 'ADMINISTRATOR' || currentUserId === userId) && !canComment;

  const tags = [role, 'ANNOUNCEMENT'];

  if (modified) {
    tags.push('MODIFIED');
  }

  const handleComment = (id) => {
    console.log(id);
    navigate(`/announcementComments/${id}`);
  };

  const handleUpdate = (id) => {
    console.log(id);
    navigate(`/updateAnnouncement/${id}`);
  };

  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const hoverBorderColor = useColorModeValue('blue.300', 'blue.100');
  const hoverBoxShadow = useColorModeValue(
    '0 4px 6px rgba(160, 174, 192, 0.6)',
    '0 4px 6px rgba(9, 17, 28, 0.9)'
  );
  const tagColorScheme = useColorModeValue('blackAlpha', 'gray');
  const hoverBgColor = useColorModeValue('gray.200', 'gray.700');
  const linkHoverColor = useColorModeValue('blue.400', 'blue.400');

  const renderEditButton = () => {
    if (canComment || canUpdate) {
      return (
        <HStack
          as={Link}
          spacing={1}
          p={1}
          alignItems="center"
          height="2rem"
          w="max-content"
          margin="auto 0"
          rounded="md"
          color="blue.400"
          _hover={{ bg: hoverBgColor }}
          onClick={() => (canComment ? handleComment(id) : handleUpdate(id))}
        >
          <Text fontSize="sm">{canComment ? 'Comments' : 'Update'}</Text>
          <Icon as={EditIcon} w={4} h={4} />
        </HStack>
      );
    }
    return null;
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      navigate(`/announcement`);
    } catch (error) {
      console.error('Delete Announcement Error:', error);
    }
  };

  const renderDeleteButton = () => {
    if (canUpdate) {
      return (
        <HStack
          as={Link}
          spacing={1}
          p={1}
          alignItems="center"
          height="2rem"
          w="max-content"
          margin="auto 0"
          rounded="md"
          color="red.400"
          _hover={{ bg: hoverBgColor }}
          onClick={() => handleDelete(id)}
        >
          <Text fontSize="sm">{'Delete'}</Text>
          <Icon as={DeleteIcon} w={4} h={4} />
        </HStack>
      );
    }
    return null;
  };

  return (
    <Box p={4} bg={bgColor} rounded="lg" w="100%" maxW="600px" mx="auto" my={4}>
      <HStack spacing={2} mb={1} flexWrap="wrap" align="baseline">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            colorScheme={tagColorScheme}
            borderRadius="full"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxWidth="100%"
            flex="0 0 auto"
            mb={1}
          >
            {tag}
          </Tag>
        ))}
    </HStack>
      <Box textAlign="left">
        <Text fontSize="xl" fontWeight="semibold" mb={2}>
          {title}
        </Text>
        <Text fontSize="md" color="gray.500" noOfLines={2} lineHeight="normal">
          {description}
        </Text>
      </Box>
      <Box>
        <Avatar size="sm" title="Author" mb={2} src={announcementUserPhoto} />
        <Stack justify="space-between" direction={{ base: 'column', sm: 'row' }}>
          <Box>
            <Text fontSize="sm" fontWeight="bold">
              {firstName} {lastName}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {publishDate}
            </Text>
          </Box>
          <VStack align="flex-start" spacing={1}>
            {renderDeleteButton()}
            {renderEditButton()}
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Announcement;
