import { Link, } from "react-router-dom";

import NavBar from "../components/NavBar";

const ErrorPage = () => {
  // const error = useRouteError();
  // console.log(error);
  // const {state} = useLocation();
  // console.log(state);

  let title = 'An Error Occured!';
  let message = 'Something went wrong';

  return (
    <>
      <NavBar />
      <div className="w-full h-screen absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl">{title}</h1>
        <p className="my-3">{message}</p>
        <Link to="/">
          <button className="bg-red-600 py-2 px-3 rounded">Back to Home Page</button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;