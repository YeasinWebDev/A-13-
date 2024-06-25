"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loade, setLoade] = useState(false)
  const [filter, setfilter] = useState('')

  const getData = async () => {
    const data = await axios.get("/events/api");
    setEvents(data.data.events);
  };
  useEffect(() => {
    getData();
  }, [loade]);

  const handleSearch = () => {
    setfilter(searchQuery)
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setEvents(filtered);
    setSearchQuery('')
  };

  const handeldelete =() =>{
    setfilter('')
    setLoade(!loade)
  }

  return (
    <div className=" py-10 flex-col items-center md:px-20">
      <div className="xl:pl-48">
        <h1 className="font-bold text-4xl py-5 ">
          Trusted by <br /> Thousand of Events
        </h1>
        <div className="">
          <div className="py-3 ">
            {/* search bar */}
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
              <div>{filter &&<h1 className="flex items-center gap-5 font-semibold bg-[#D1D5DB] w-fit rounded-xl px-3 py-2 ">{filter} 
                <span onClick={handeldelete} className="cursor-pointer rounded-full w-6 h-6 flex items-center justify-center bg-red-600 text-white">X</span></h1>}</div>
          </div>
          {/* filter by category */}
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 flex-wrap">
        {events ? (
          events.map((event) => (
            <Link href={`/events/${event?._id}`}>
              <div className="card card-compact bg-base-100 w-96 shadow-xl cursor-pointer">
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
                      {event?.price === 0 ? "Free" : `$${event?.price}`}
                    </h3>
                    <h3 className="bg-gray-200 px-3 py-1 rounded-xl w-fit text-gray-600 font-semibold">
                      {event?.category?.tag}
                    </h3>
                  </div>

                  <h3 className="font-semibold pt-5">
                    Start: <span>{event?.startDate}</span>
                  </h3>
                  <h3 className="font-bold py-5 text-2xl">
                    <span>{event?.name}</span>
                  </h3>

                  <h3 className="font-bold pt-5 text-sm">
                    by:<span className="text-green-600"> {event?.by}</span>
                  </h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
interface Event {
  _id: string;
  image: string;
  price: number;
  category: {
    tag: string;
  };
  startDate: string;
  name: string;
  by: string;
}
export default Events;
