import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";

const ErrorPage = () => {
  const error = useRouteError();
  let title = "An error occured!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not Found!";
    message = "Could not find resource page!";
  }

  return (
    <>
      <PageContent title={title}>{message}</PageContent>
    </>
  );
};

export default ErrorPage;
