import React, { useEffect } from "react";
import Announcement from "../components/Announcement";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { getAllAnnouncements } from "../announcements";
import { getUserById } from "../users";

const Announcements = () => {

    const [ currentPage, setCurrentPage] = useState(0);
    const [elementsPerPage] = useState(5);
    const [numberOfAnnouncements, setNumberOfAnnouncements] = useState(0);
    const [announcements, setAnnouncements] = useState([]);

    useEffect( () => {
        
        async function fetchAnnouncementsData() {

            const responseAnnouncement = await getAllAnnouncements(currentPage);

            setAnnouncements(responseAnnouncement.content);
            // console.log(responseAnnouncement.content);

            setNumberOfAnnouncements(responseAnnouncement.totalElements);
            // console.log(responseAnnouncement.totalElements);

        }

        fetchAnnouncementsData();

    }, [currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const commentOrUpdate = "COMMENT";

    return (
        <>
            { 
                announcements.map( (announcement) => (

                    <Announcement 
                        key = {announcement.id}
                        id = {announcement.id}
                        title = {announcement.title}
                        description = {announcement.description}
                        publishDate = {announcement.publishDate}
                        modified = {announcement.modified}
                        userId = {announcement.userId}
                        commentOrUpdate = {commentOrUpdate}
                    />
                )
            )}
            
            <Pagination 
                  elementsPerPage = { elementsPerPage } 
                  allElements = { numberOfAnnouncements }
                  paginate =  {paginate}
                  currentPage = { currentPage}
             />
        </>
    )
}

export default Announcements;