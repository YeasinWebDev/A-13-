"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ProfilePage() {
  const [ticket, setTicket] = useState<Event[]>([]);
  const [postEvents, setPostEvents] = useState<Event[]>([]);
  const [loading, setloading] = useState(false);
  const session = useSession();
  const email = session?.data?.user?.email;

  const getData = async () => {
    try {
      setloading(true);
      const response = await axios.post(`/api/getAllProfile`, { email });
      setTicket(response.data.events);
      setPostEvents(response.data.eventsByEmail);
      setloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setloading(false);
    }
  };

  useEffect(() => {
    if (session) {
      getData();
    }
  }, [session]); // Trigger fetch when session changes


  if (loading) return <Loader />;
  console.log(postEvents)

  return (
    <div className="w-[70vw] mx-auto py-10">
      <div>
        <h1 className="font-bold text-3xl">My Tickets</h1>
      </div>
      <div className="flex gap-5 py-5 flex-wrap">
        {/* Render your ticket data here */}
        {ticket.length > 0 ? (
          ticket?.map((event) => (
            <div
              key={event._id}
              className="card card-compact w-80 shadow-xl cursor-pointer"
            >
              <Link href={`/events/${event._id}`}>
                <figure>
                  <div className="h-[30vh] w-full">
                    <img
                      className="w-full h-full rounded-t-xl"
                      src={event.image}
                      alt="event"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="font-semibold ">
                    <span>{event.startDate}</span>
                  </h3>
                  <h3 className="font-bold py-5 text-xl">
                    <span>{event.name}</span>
                  </h3>

                  <h3 className="font-bold  text-sm">
                    by:<span className="text-green-600"> {event.by}</span>
                  </h3>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="font-semibold ">No Ticket Found</h1>
        )}
      </div>

      <div>
        <h1 className="font-bold text-3xl py-10">Events Organized</h1>
        <div className="flex gap-5 py-5 flex-wrap">
          {postEvents.length > 0 ? (
            postEvents?.map((event) => (
              <div
                key={event._id}
                className="card card-compact w-80 shadow-xl cursor-pointer"
              >
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
            <h1 className="font-semibold flex items-center justify-center w-full text-xl bg-[#f2f2f2] py-10 rounded-xl">No Event have been created yet</h1>
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

export default ProfilePage;
