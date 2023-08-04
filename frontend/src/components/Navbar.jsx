import React from 'react';
import { Link as Redirect, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

import {
  Box,
  Flex,
  IconButton,
  Text,
  Stack,
  Button,
  Collapse,
  Link,
  Icon,
  useColorModeValue,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@chakra-ui/react';

import {
  CloseIcon,
  HamburgerIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';

import { MdHome, MdAccountCircle } from 'react-icons/md';
import { MdAnnouncement, MdEvent, MdSchool, MdPlace, MdExitToApp } from 'react-icons/md';
import { GrUserWorker} from 'react-icons/gr';
import { IoMdPerson } from 'react-icons/io';

export default function NavBar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirectAccount = () => {
    navigate('/account');
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.900');
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const buttonColor = useColorModeValue('gray.600', 'gray.200');
  const buttonHoverColor = useColorModeValue('gray.800', 'white');
  const buttonBgColor = useColorModeValue('rgb(20, 108, 148)', 'rgb(20, 108, 148)');
  const buttonHoverBgColor = useColorModeValue('red.500', 'red.500');

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={bgColor}
        color={textColor}
        minHeight="40px"
        py={{ base: 0 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={borderColor}
        align="center"
        // background={'blue.100'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link
            as={Redirect}
            to="/"
            _hover={{
              textDecoration: 'none',
            }}
            display="flex"
            alignItems="center"
          >
            <Icon as={MdHome} boxSize={5} mr={1} style={{ marginTop: '0rem' }} />
            <Text
              fontWeight={500}
              color={textColor}
              _hover={{
                color: linkHoverColor,
              }}
            >
              Home
            </Text>
          </Link>
          <Flex display={{ base: 'none', md: 'flex' }} ml={4}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row" spacing={6}>
          {user?.email ? (
            <>
              <Button
                onClick={handleRedirectAccount}
                as={Link}
                href="/account"
                fontSize="sm"
                fontWeight={400}
                variant="link"
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                <Flex align="center">
                  <Icon as={MdAccountCircle} boxSize={5} mr={1} />
                  <Text
                    fontWeight={500}
                    color={textColor}
                    _hover={{
                      color: linkHoverColor,
                    }}
                  >
                    Account
                  </Text>
                </Flex>
              </Button>
              <Button
                onClick={handleLogout}
                as={Redirect}
                to="/login"
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg={buttonBgColor}
                _hover={{
                  bg: buttonHoverBgColor,
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                href="/login"
                onClick={onToggle}
                fontSize="sm"
                fontWeight={400}
                variant="link"
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                <Flex align="center">
                  <Icon as={MdAccountCircle} boxSize={5} mr={1} />
                  <Text
                    fontWeight={500}
                    color={textColor}
                    _hover={{
                      color: linkHoverColor,
                    }}
                  >
                    Sign In
                  </Text>
                </Flex>
              </Button>
              <Button
                as={Redirect}
                to="/register"
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg={buttonBgColor}
                _hover={{
                  bg: buttonHoverBgColor,
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = 'gray.600';
  const linkHoverColor = 'gray.800';
  const popoverContentBgColor = 'white';

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                <Flex align="center">
                  <Icon as={navItem.icon} boxSize={5} mr={1} />
                  {navItem.label}
                </Flex>
              </Link>
            </PopoverTrigger>
            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                   <Link
                      key={child.label}
                      href={child.href}
                      role={'group'}
                      display={'block'}
                      p={2}
                      rounded={'md'}
                      _hover={{ bg: 'rgb(175, 211, 226)', color: 'gray.900' }}
                    >
                      <Stack direction={'row'} align={'center'}>
                        <Box>
                          <Text
                            transition={'all .3s ease'}
                            _groupHover={{ color: 'black.400' }}
                            fontWeight={500}
                          >
                            {child.label}
                          </Text>
                          <Text fontSize={'sm'}>{child.subLabel}</Text>
                        </Box>
                        <Flex
                          transition={'all .3s ease'}
                          transform={'translateX(-10px)'}
                          opacity={0}
                          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                          justify={'flex-end'}
                          align={'center'}
                          flex={1}
                        >
                          <Icon color={'black.400'} w={5} h={5} as={ChevronRightIcon} />
                        </Flex>
                      </Stack>
                    </Link>
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};


const MobileNav = () => {

  const navigate = useNavigate();
  const { user, email, logOut } = UserAuth();
   
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {email && (
        <MobileNavItem
          label="Logout"
          icon={MdExitToApp}
          onClick={handleLogout}
        />
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, icon, onClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Stack spacing={4} onClick={children ? handleToggle : onClick}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Flex align="center">
          <Icon as={icon} boxSize={6} mr={2} />
          <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
        </Flex>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'blue.700')}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};


const NAV_ITEMS = [
  {
    label: 'Events',
    icon: MdEvent,
    children: [
      {
        label: 'Explore the events',
        subLabel: 'Watch other people events',
        href: '/event',
      },
      {
        label: 'Create your event',
        subLabel: 'You can add your event in dashboard',
        href: '/createEvent',
      },
    ],
  },
  {
    label: 'Announcements',
    icon: MdAnnouncement,
    children: [
      {
        label: 'View other announcements',
        subLabel: 'Be updated to the news',
        href: '/announcement',
      },
      {
        label: 'Create your announcement',
        subLabel: 'Let the others know',
        href: '/createAnnouncement',
      },
    ],
  },
  {
    label: 'Students',
    icon: MdSchool,
    href: '/allStudents',
  },
  {
    label: 'Employes',
    icon: IoMdPerson,
    href: '/allEmployes',
  },
  {
    label: 'Location',
    icon: MdPlace,
    href: '/location',
  },
];

export { NavBar };
