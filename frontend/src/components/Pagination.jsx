import React from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";

const Pagination = ({
  elementsPerPage,
  allElements,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [...Array(Math.ceil(allElements / elementsPerPage)).keys()].map(
    (n) => n + 1
  );

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      paginate(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pageNumbers.length - 1) {
      paginate(currentPage + 1);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <ButtonGroup>

        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => paginate(pageNumber - 1)}
            variant={pageNumber === currentPage + 1 ? "solid" : "outline"}
            borderRadius="full"
            style={{
              backgroundColor:
                pageNumber === currentPage + 1 ? "rgb(25, 167, 206)" : "white",
            }}
          >
            {pageNumber}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default Pagination;
