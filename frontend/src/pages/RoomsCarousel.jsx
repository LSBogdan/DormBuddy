import React, {useState, useEffect} from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Flex,
  Image,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { getAllRoomPhotos } from '../aws';
import { useLocation } from 'react-router-dom';

const RoomsCarousel = () => {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "30%",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const location = useLocation();
  const roomNumber = location.pathname.split("/").pop();
  console.log("RoomNumber:" + roomNumber);

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    async function fetchRoomPhotos() {
      try {
        const responseUrlList = await getAllRoomPhotos(roomNumber);
        console.log(responseUrlList); 
        setSlides(responseUrlList);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRoomPhotos();
  }, []);

  console.log(slides);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={10}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" overflow="hidden" pos="relative">
        <Flex h="600px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide}
                alt="carousel image"
                boxSize="full"
                backgroundSize="cover"
              />
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
      </Flex>
    </Flex>
  );
};

export default RoomsCarousel;