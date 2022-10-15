import { MdArrowBack } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="bg-main text-white h-screen w-screen flex items-center justify-center flex-col"
    >
      <img src="/img/logo.png" alt="logo" className="m-10 w-48" />
      <h1 className="text-3xl mb-4">Oops!</h1>
      <p className="opacity-60">Sorry, an unexpected error has occurred.</p>
      <p className="mt-6">
        <i>{error.statusText || error.message}</i>
      </p>
      <div className="flex w-full sm:w-96 justify-between mt-10 px-4">
        <button
          className="flex space-x-2 items-center border border-white rounded px-4 py-2 hover:bg-white transition-all hover:text-black"
          onClick={() => window.history.back()}
        >
          <MdArrowBack />
          <span>Go Back</span>
        </button>
        <a
          className="flex space-x-2 items-center border border-white rounded px-4 py-2 hover:bg-white transition-all hover:text-black"
          href="/"
        >
          <IoIosHome />
          <span>Go to main page</span>
        </a>
      </div>
    </div>
  );
}
