import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import './App.css';
import Home from './pages/Home';
import RootPage from './pages/RootPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Event from './components/Event';
import Announcement from './components/Announcement';
import Account from './pages/Account';
import UpdateUser from './pages/UpdateUser';
import Events from './pages/Events';
import Announcements from './pages/Announcements';
import AnnouncementComments from './pages/AnnouncementComments';
import EventComments from './pages/EventComments';
import CreateAnnouncement from './pages/CreateAnnouncement';
import CreateEvent from './pages/CreateEvent';
import MyAnnouncements from './pages/MyAnnouncements';
import MyEvents from './pages/MyEvents';
import Students from './pages/StudentsPage';
import Map from './components/Map';
import RoomsCarousel from './pages/RoomsCarousel';
import UpdateStudent from './pages/UpdateStudent';
import UpdateAnnouncement from './pages/UpdateAnnouncement';
import UpdateEvent from './pages/UpdateEvent';
import EmployesPage from './pages/EmployesPage';
import UpdateEmployee from './pages/UpdateEmployee';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/register',
        element: <Register/>,
      },
      {
        path: '/event',
        element: <ProtectedRoute> <Events/> </ProtectedRoute>,
      },
      {
        path: '/announcement',
        element: <ProtectedRoute> <Announcements/> </ProtectedRoute>,
      },
      {
        path: '/account',
        element: <ProtectedRoute> <Account/> </ProtectedRoute>,
      },
      {
        path: '/updateUser',
        element: <ProtectedRoute> <UpdateUser/> </ProtectedRoute>,
      },
      {
        path: '/announcementComments/:id', 
        element: <ProtectedRoute> <AnnouncementComments/> </ProtectedRoute>,
      },
      {
        path: '/eventComments/:id',
        element: <ProtectedRoute> <EventComments/> </ProtectedRoute>,
      },
      {
        path: '/createEvent',
        element: <ProtectedRoute> <CreateEvent/> </ProtectedRoute>,
      },
      {
        path: '/createAnnouncement',
        element: <ProtectedRoute>  <CreateAnnouncement/> </ProtectedRoute>,
      },
      {
        path: '/myAnnouncement',
        element: <ProtectedRoute> <MyAnnouncements/> </ProtectedRoute>
      },
      {
        path: '/myEvent',
        element: <ProtectedRoute> <MyEvents/> </ProtectedRoute>
      },
      {
        path: '/allStudents',
        element: <ProtectedRoute> <Students/> </ProtectedRoute>
      },
      {
        path:'/location',
        element: <Map />
      },
      {
        path:'/roomPhotos/:roomNumber',
        element: <ProtectedRoute> <RoomsCarousel/> </ProtectedRoute>
      },
      {
        path:'/updateStudent/:id',
        element: <ProtectedRoute>  <UpdateStudent/>  </ProtectedRoute>
      },
      {
        path:'/updateAnnouncement/:id',
        element: <ProtectedRoute> <UpdateAnnouncement />   </ProtectedRoute>
      },
      {
        path:'/updateEvent/:id',
        element: <ProtectedRoute> <UpdateEvent /> </ProtectedRoute>
      },
      {
        path:'/allEmployes',
        element: <ProtectedRoute> <EmployesPage/> </ProtectedRoute>
      },
      {
        path:'/updateEmployee/:id',
        element: <ProtectedRoute> <UpdateEmployee /> </ProtectedRoute>
      }
    ],
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
