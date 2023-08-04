import React, {useState, useEffect} from "react";
import Event from "../components/Event";
import Pagination from "../components/Pagination";
import { getAllEvents } from "../events";

const Events = () => {


    const [currentPage, setCurrentPage] = useState(0);
    const [elementsPerPage] = useState(5);
    const [numberOfEvents, setNumberOfEvents] = useState(0);
    const [events, setEvents] = useState([]);

    useEffect( () => {
        
        async function fetchEventsData() {

            const responseEvent = await getAllEvents(currentPage);

            setEvents(responseEvent.content);
           
            setNumberOfEvents(responseEvent.totalElements);
        
        }

        fetchEventsData();

    }, [currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const commentOrUpdate = "COMMENT";
    
    return (
        <>
            { 
                events.map( (event) => (
                    
                    <Event 
                        key = {event.id}
                        id = {event.id}
                        title = {event.title}
                        description = {event.description}
                        startDate = {event.startDate}
                        endDate = {event.endDate}
                        modified = {event.modified}
                        hallId = {event.hallId}
                        userId = {event.userId}
                        commentOrUpdate = {commentOrUpdate}
                    />
                )
            )}
            
            <Pagination 
                  elementsPerPage = { elementsPerPage } 
                  allElements = { numberOfEvents }
                  paginate =  {paginate}
                  currentPage = { currentPage}
             />
        </>
    )
}

export default Events;