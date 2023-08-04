import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, useBreakpointValue } from '@chakra-ui/react';
import { GoChevronRight } from 'react-icons/go';
import { Link as Redirect, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAnnouncementById } from '../announcements';
import AnnouncementComment from '../components/AnnouncementComment';
import { getAllAnnouncementComments, createAnnouncementComment } from '../announcementComments';
import { UserAuth } from "../context/AuthContext";
import { getUserById, getUserByEmail, getAllEmployes } from "../users";
import Pagination from "../components/Pagination";
import EmployeePage from "../components/EmployeePage";

const EmployesPage = () => {

  const { user, email, userData } = UserAuth();
  const [error, setError] = useState(null);
  
  const roleCurrentUser = userData?.role;

  const [currentPage, setCurrentPage] = useState(0);
  const [elementsPerPage] = useState(5);
  const [numberOfEmployes, setNumberOfEmployes] = useState(0);
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    async function fetchEmployesData() {

      const responseEmployes = await getAllEmployes(currentPage);

      setEmployes(responseEmployes.content);
      
      setNumberOfEmployes(responseEmployes.totalElements);
    }

    fetchEmployesData();

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
          {employes.map((employee) => (
            <EmployeePage
              key={employee.id}
              id={employee.id}
              firstName={employee.firstName}
              lastName={employee.lastName}
              gender={employee.gender}
              mobileNumber={employee.mobileNumber}
              email={employee.email}
              role={employee?.role}
              currentUserRole={roleCurrentUser}
            />
          ))}
        </Grid>

        <Pagination
          elementsPerPage={elementsPerPage}
          allElements={numberOfEmployes}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Box>
    </>
  );
};

export default EmployesPage;
