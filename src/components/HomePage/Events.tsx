"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const eventsPerPage = 6;

  useEffect(() => {
    fetchData();
  }, [currentPage, filter]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_Live_URL}/events/api`,
        {
          params: {
            page: currentPage,
            limit: eventsPerPage,
            filter: filter,
          },
        }
      );
      const { events: fetchedEvents, totalPages: fetchedTotalPages } =
        response.data;
      setEvents(fetchedEvents);
      setTotalPages(fetchedTotalPages);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSearch = () => {
    setFilter(searchQuery.toLowerCase());
    setCurrentPage(1);
  };

  const handleDeleteFilter = () => {
    setFilter("");
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="py-10 flex-col items-center md:px-20">
      <div className="xl:pl-48">
        <h1 className="font-bold text-4xl py-5">
          Trusted by <br /> Thousands of Events
        </h1>
        <div className="">
          <div className="py-3">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-fit px-4 py-2 border rounded"
            />
            <button
              onClick={handleSearch}
              className="px-3 py-2 bg-purple-700 text-white rounded"
            >
              Search
            </button>
            {filter && (
              <h1 className="flex items-center gap-5 font-semibold bg-[#D1D5DB] w-fit rounded-xl px-3 py-2">
                {filter}
                <span
                  onClick={handleDeleteFilter}
                  className="cursor-pointer rounded-full w-6 h-6 flex items-center justify-center bg-red-600 text-white"
                >
                  X
                </span>
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10 flex-wrap">
        {events.length > 0 ? (
          events?.map((event) => (
            <div key={event._id} className="card card-compact w-96 shadow-xl cursor-pointer">
              <Link href={`/events/${event._id}`}>
                <figure>
                  <div className="h-[30vh] w-full">
                    <img
                      className="w-full h-full"
                      src={event.image}
                      alt="event"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex items-center gap-5">
                    <h3 className="bg-green-200 px-3 py-1 rounded-xl w-fit text-green-700 font-semibold">
                      {event.price === 0 ? "Free" : `$${event.price}`}
                    </h3>
                    <h3 className="bg-gray-200 px-3 py-1 rounded-xl w-fit text-gray-600 font-semibold">
                      {event.category}
                    </h3>
                  </div>

                  <h3 className="font-semibold pt-5">
                    Start: <span>{event.startDate}</span>
                  </h3>
                  <h3 className="font-bold py-5 text-xl">
                    <span>{event.name}</span>
                  </h3>

                  <h3 className="font-bold pt-3 text-sm">
                    by:<span className="text-green-600"> {event.by}</span>
                  </h3>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <Loader />
        )}

        {/* Pagination */}
        <div className="mt-10 flex justify-center w-full">
          {totalPages > 1 && (
            <div className="flex">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 bg-purple-700 text-white rounded ${
                    currentPage === index + 1 ? "bg-purple-900" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface Event {
  _id: string;
  image: string;
  price: number;
  category: string;
  startDate: string;
  name: string;
  by: string;
}

export default Events;
