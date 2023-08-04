import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Pagination from "../components/Pagination";
import { UserAuth } from '../context/AuthContext';
import { getAllAnnouncementsByUserId } from "../announcements";
import { getUserByEmail } from "../users";

const MyAnnouncements = () => {
  const { user, email, userData } = UserAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [elementsPerPage] = useState(5);
  const [numberOfAnnouncements, setNumberOfAnnouncements] = useState(0);
  const [announcements, setAnnouncements] = useState([]);

  const userConnectId = userData?.id || "";

  useEffect(() => {
    async function fetchAnnouncementsData() {
      try {
        const responseAnnouncement = await getAllAnnouncementsByUserId(userConnectId, currentPage);

        setAnnouncements(responseAnnouncement.content);
        setNumberOfAnnouncements(responseAnnouncement.totalElements);
      
      } catch (error) {
        console.error(error);
      }
    }

    fetchAnnouncementsData();
  }, [userConnectId, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {announcements.map((announcement) => (
        <Announcement
          key={announcement.id}
          id={announcement.id}
          title={announcement.title}
          description={announcement.description}
          publishDate={announcement.publishDate}
          modified={announcement.modified}
          userId={announcement.userId}
        />
      ))}

      <Pagination
        elementsPerPage={elementsPerPage}
        allElements={numberOfAnnouncements}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default MyAnnouncements;
