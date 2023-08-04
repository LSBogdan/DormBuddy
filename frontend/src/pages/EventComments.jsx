import React, { useState, useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getEventById } from "../events";
import { getUserById, getUserByEmail } from "../users";
import { UserAuth } from "../context/AuthContext";
import { getAllEventComments, createEventComment } from "../eventComments";
import EventComment from "../components/EventComment";
import Event from "../components/Event";
import { getHallById } from "../hall";
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
    Textarea,
    Container
  } from '@chakra-ui/react';

const EventComments = () => {

  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  // console.log("EventId: " + eventId);

  const navigate = useNavigate();

  const { user, email, userData }  =  UserAuth();
  const [eventUser, setEventUser] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentToAdd, setCommentToAdd] = useState("")
  const [error, setError] = useState(null);

  useEffect( () => {
      getEventById(eventId)
          .then((data) => {
              // console.log(data);
              setEventData(data);
          })
          .catch( (error) => {
              console.error(error);
          })
  }, [eventId]);

  const eventTitle = eventData?.title;
  const eventDescription = eventData?.description;
  const eventStartDate = eventData?.startDate;
  const eventEndDate = eventData?.endDate;
  const eventModified = eventData?.modified;
  const eventHallId = eventData?.hallId;
  const eventUserId = eventData?.userId;
    

  useEffect( () => {
      
      getUserById(eventUserId)
          .then( (data) => {
              // console.log(data);
              setEventUser(data);
          })
          .catch( (error) => {
            console.error(error)
          });
  }, [eventUserId]);
    
  useEffect(() => {
    async function fetchEventCommentsData() {
      try {
          const responseEventComments = await getAllEventComments(eventId);
          setComments(responseEventComments);
      } catch (error) {
          console.error(error);
          }
      }      
      fetchEventCommentsData();
    }, []);

    // console.log(comments);
      
    const handleCommentSubmit = async (e) => {
        
        e.preventDefault();

        if(!commentToAdd) {
            setError('Review your comment!');
            return;
        }

        const eventCommentBody = {
            description: commentToAdd,
            publishDate: "",
            modified: "",
            eventId,
            userId: userData?.id,
        };

        await createEventComment(eventCommentBody);

        window.location.reload(false);
        
    }

    const scrollButtonRef = useRef(null);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    return(
        <Container maxW="container.lg">
            <>
            <Event
                key = {eventId}
                id = {eventId}
                title = {eventTitle}
                description = {eventDescription}
                startDate = {eventStartDate}
                endDate = {eventEndDate}
                modified = {eventModified}
                hallId = {eventHallId}
                userId = {eventUserId} 
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

        { comments && comments.length > 0 && (
            comments.map( (comment) => (

                <EventComment 
                    key = {comment.id}
                    id = {comment.id}
                    description = {comment.description}
                    publishDate = {comment.publishDate}
                    eventId = {comment.eventId}
                    userId = {comment.userId}  
                />
            ))
        )};
        </Box>
        </>
        </Container>
    );
}

export default EventComments;