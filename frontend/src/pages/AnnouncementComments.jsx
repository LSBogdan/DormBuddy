import React, { useState, useEffect, useRef } from 'react';
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
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Textarea,
} from '@chakra-ui/react';
import { GoChevronRight } from 'react-icons/go';
import { Link as Redirect, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAnnouncementById } from '../announcements';
import AnnouncementComment from '../components/AnnouncementComment';
import { getAllAnnouncementComments, createAnnouncementComment } from '../announcementComments';
import { UserAuth } from "../context/AuthContext";
import { getUserById, getUserByEmail } from "../users";
import Announcement from '../components/Announcement';

const AnnouncementComments = () => {
  
  const location = useLocation();
  const announcementId = location.pathname.split("/").pop();
  const navigate = useNavigate();

  const { user, email, photo, userData } = UserAuth();
  const [announcementData, setAnnouncementData] = useState(null);
  const [announcementUser, setAnnouncementUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [commentToAdd, setCommentToAdd] = useState("");

  useEffect(() => {

    getAnnouncementById(announcementId)
      .then((data) => {
        // console.log(data);
        setAnnouncementData(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });

  }, [announcementId]);

  const announcementTitle = announcementData?.title;
  const announcementDescription = announcementData?.description;
  const announcementPublishDate = announcementData?.publishDate;
  const announcementModified = announcementData?.modified;
  const announcementUserId = announcementData?.userId;

  useEffect(() => {

    getUserById(announcementUserId)
      .then((data) => {
        // console.log(data);
        setAnnouncementUser(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });

  }, [announcementUserId]);

  useEffect(() => {

    async function fetchAnnouncementCommentsData() {
      try {
        const responseAnnouncementComments = await getAllAnnouncementComments(announcementId);
        setComments(responseAnnouncementComments);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
    fetchAnnouncementCommentsData();
  }, []);

  // console.log(comments);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentToAdd) {
      setError('Review your comment!');
      return;
    }

    const announcementCommentBody = {
      description: commentToAdd,
      publishDate: announcementPublishDate,
      modified: announcementModified,
      announcementId,
      userId: userData?.id,
    };

    await createAnnouncementComment(announcementCommentBody);

    window.location.reload(false);

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

  const scrollButtonRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container maxW="container.lg">
      <>
        <Announcement
          key={announcementId}
          id={announcementId}
          title = {announcementTitle}
          description={announcementDescription}
          publishDate={announcementPublishDate}
          modified={announcementModified}
          userId={announcementUserId}
        />

        
        <Box mt={8}>
        <Container
          centerContent
          p={{ base: 5, md: 10 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={{ base: 'column', md: 'row' }}
          mt={{ base: -4, md: -10 }}
        >
          <Textarea
            placeholder='Write your comment here'
            flex="1"
            mb={{ base: 4, md: 0 }}
            mr={{ base: 0, md: 4 }}
            resize="vertical"
            onChange={(e) => setCommentToAdd(e.target.value)}
          />
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={handleCommentSubmit}
          >
            Submit
          </Button>
        </Container>

        <Button
          ref={scrollButtonRef}
          onClick={scrollToTop}
          position="fixed"
          bottom={4}
          right={4}
          colorScheme="blue"
          size="sm"
          zIndex="tooltip"
        >
          Scroll to Top
        </Button>

          {comments && comments.length > 0 && (
            comments.map((comment) => (
              <AnnouncementComment
                key={comment.id}
                id={comment.id}
                description={comment.description}
                publishDate={comment.publishDate}
                announcementId={comment.announcementId}
                userId={comment.userId}
              />
            ))
          )}
        </Box>
      </>
    </Container>
  );
};

export default AnnouncementComments;
