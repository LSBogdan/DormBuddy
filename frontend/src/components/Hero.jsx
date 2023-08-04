import * as React from 'react';
import { Container, chakra, Stack, Text, Button, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Hero = () => {

  const navigate = useNavigate();

  const {user, logOut} = UserAuth();

  const handeClick =() => {
    
    if (user){
      navigate('/account');
    }
    else {
    navigate('/login', { replace: true });
  }
}

  return (
    <Container p={{ base: 8, sm: 14 }}>
      <Stack direction="column" spacing={6} alignItems="center">
        <Box py={2} px={3} bg="teal" w="max-content" color="white" rounded="md" fontSize="sm" >
          <Stack direction={{ base: 'column', sm: 'row' }}>
            <Text fontWeight="bold">Ready, Set, Go! 🚀</Text>
            <Text>Join the Campus!</Text>
          </Stack>
        </Box>
        <chakra.h1
          fontSize={{ base: '4xl', sm: '5xl' }}
          fontWeight="bold"
          textAlign="center"
          maxW="600px"
        >
          "Viața este ca o bicicletă, ca să menții echilibrul, trebuie să te miști înainte."{' '}
          <chakra.span color="teal" bg="linear-gradient(transparent 50%, #83e9e7 50%)">
          - Albert Einstein
          </chakra.span>
        </chakra.h1>
        <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
          Conectati-va la aplicatia noastra pentru 
          a va putea bucura de toate functionalitatile ei.
        </Text>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          w={{ base: '100%', sm: 'auto' }}
          spacing={5}
        >
          <Button
            colorScheme="teal"
            variant="outline"
            rounded="md"
            size="lg"
            height="3.5rem"
            fontSize="1.2rem"
            onClick={handeClick}
          >
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Hero;