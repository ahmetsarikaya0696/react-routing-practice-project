import {
  Await,
  defer,
  json,
  redirect,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import { loadEvents } from "./Events";
import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { getAuthToken } from "../util/auth";

const EventDetailsPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");
  const { eventId } = useParams();

  return (
    <>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading event...</p>}
      >
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading events...</p>}
      >
        <Await resolve={events}>
          {(loadedEvents) => {
            const filteredEvents = loadedEvents.filter((e) => e.id !== eventId);
            return (
              <EventsList events={filteredEvents} pageTitle="Other Event(s)" />
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailsPage;

const loadEvent = async (eventId) => {
  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    return json(
      { message: "Could not fetch details for the selected event!" },
      { status: 500 }
    );
  } else {
    const responseData = await response.json();
    return responseData.event;
  }
};

export const loader = async ({ request, params }) => {
  const eventId = params.eventId;
  return defer({
    event: await loadEvent(eventId),
    events: loadEvents(),
  });
};

export const action = async ({ request, params }) => {
  const eventId = params.eventId;
  const token = getAuthToken();

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
    headers:{
      "Authorization" : "Bearer " + token 
    }
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event!" }, { status: 500 });
  }

  return redirect("/events");
};
