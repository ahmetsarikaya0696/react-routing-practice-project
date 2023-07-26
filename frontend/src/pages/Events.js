import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  // const { events } = useLoaderData();
  const { events } = useRouteLoaderData("events"); // loader parenta taşındığından üstteki kod ile değiştirildi.

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  // -------------------------------------------
  // const events = data.events;

  // return <EventsList events={events} />;

  return (
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} pageTitle="All Event(s)" />}
        </Await>
      </Suspense>
  );
}

export default EventsPage;

export const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {
    //   isError: true,
    //   message: "Could not fetch events!",
    // };

    // throw new Response(JSON.stringify({ message: "Could not fetch events!" }), {
    //   status: 500,
    // });

    return json({ message: "Could not fetch events!" }, { status: 500 });
  } else {
    const responseData = await response.json();
    return responseData.events;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
