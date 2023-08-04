import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, useBreakpointValue } from '@chakra-ui/react';
import { GoChevronRight } from 'react-icons/go';
import { Link as Redirect, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAnnouncementById } from '../announcements';
import AnnouncementComment from '../components/AnnouncementComment';
import { getAllAnnouncementComments, createAnnouncementComment } from '../announcementComments';
import { UserAuth } from "../context/AuthContext";
import { getUserById, getUserByEmail, getAllStudents } from "../users";
import Pagination from "../components/Pagination";
import StudentPage from "../components/StudentPage";

const StudentsPage = () => {

  const { user, email, userData } = UserAuth();
  const [error, setError] = useState(null);
  
  const roleCurrentUser = userData?.role;

  const [currentPage, setCurrentPage] = useState(0);
  const [elementsPerPage] = useState(5);
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudentsData() {

      const responseStudents = await getAllStudents(currentPage);

      setStudents(responseStudents.content);
      
      setNumberOfStudents(responseStudents.totalElements);
    }

    fetchStudentsData();
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",
    sm: "repeat(2, 1fr)",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  });

  return (
    <>
      <Box p={4}>
        <Grid templateColumns={gridTemplateColumns} gap={4}>
          {students.map((student) => (
            <StudentPage
              key={student.id}
              id={student.id}
              firstName={student.firstName}
              lastName={student.lastName}
              gender={student.gender}
              mobileNumber={student.mobileNumber}
              email={student.email}
              faculty={student.faculty}
              roomId={student.roomId}
              currentUserRole={roleCurrentUser}
            />
          ))}
        </Grid>

        <Pagination
          elementsPerPage={elementsPerPage}
          allElements={numberOfStudents}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Box>
    </>
  );
};

export default StudentsPage;
