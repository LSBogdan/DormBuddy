import React, { useEffect, useState } from "react";
import Event from "../components/Event";
import Pagination from "../components/Pagination";
import { UserAuth } from '../context/AuthContext';
import { getAllEventsFilterById } from "../events";
import { getUserByEmail } from "../users";

const MyEvents = () => {
  const { user, email, userData } = UserAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [elementsPerPage] = useState(5);
  const [numberOfEvents, setNumberOfEvents] = useState(0);
  const [events, setEvents] = useState([]);

  const userConnectId = userData?.id || "";

  useEffect(() => {
    
    async function fetchEventsData() {
      try {

        const responseEvent = await getAllEventsFilterById(userConnectId, currentPage);
        
        if (responseEvent && responseEvent.content) {
          setEvents(responseEvent.content);
          setNumberOfEvents(responseEvent.totalElements);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchEventsData();
  }, [userConnectId, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {events.map((event) => (
        <Event
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          startDate={event.startDate}
          endDate={event.endDate}
          modified={event.modified}
          hallId={event.hallId}
          userId={event.userId}
        />
      ))}

      <Pagination
        elementsPerPage={elementsPerPage}
        allElements={numberOfEvents}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default MyEvents;
