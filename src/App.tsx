import { useCallback, useState } from 'react';
import { Routes, Route, } from "react-router-dom";

import AuthContextProvider from "./store/auth-context";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import WatchPage from "./pages/Watch";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieDetail from "./components/MovieDetail";
import LandingPage from './pages/Landing';
import { MovieType } from "./models/movie";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movie, setMovie] = useState<MovieType>();

  const openModalHandler = useCallback((movieRef: MovieType) => {
    setModalIsOpen(true);
    setMovie(movieRef);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModalHandler = useCallback(() => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route>
  //       {modalIsOpen && <MovieDetail onClose={closeModalHandler} movie={movie} />}

  //       <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
  //         <Route index element={<ProtectedRoute><HomePage onOpenModal={openModalHandler} /></ProtectedRoute>} />
  //         <Route path="account" element={<ProtectedRoute><Account onOpenModal={openModalHandler} /></ProtectedRoute>} />
  //         <Route path="login" element={<Login />} />
  //         <Route path="signup" element={<Signup />} />
  //       </Route>
  //       <Route path='details' element={<MovieDetail onClose={closeModalHandler} />} />
  //       <Route path="watch/:movieId" element={<ProtectedRoute><WatchPage /></ProtectedRoute>} />
  //     </Route>
  //   )
  // );

  // return (
  //   <AuthContextProvider>
  //     <RouterProvider router={router} />
  //   </AuthContextProvider>
  // );

  return (
    <AuthContextProvider>
      {modalIsOpen && <MovieDetail onClose={closeModalHandler} movie={movie} />}

      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="browser">
            <Route index element={<ProtectedRoute><HomePage onOpenModal={openModalHandler} /></ProtectedRoute>} />
            <Route path="account" element={<ProtectedRoute><Account onOpenModal={openModalHandler} /></ProtectedRoute>} />
            <Route path="watch/:movieId" element={<ProtectedRoute><WatchPage /></ProtectedRoute>} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
