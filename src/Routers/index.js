import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Components/Header";
import LoginForm from "../layout/Login";
import Actor from "../pages/actors/actor";
import Film from "../pages/films/film";
import PrivateRoutes from "./privateRouter";
import ProtectRouter from "./protectRouter";
import AddFilm from "../pages/AddFilm";

const router = () => {
  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route path="/actor" index element={<Actor />} />
          <Route path="/film" index element={<Film />} />
          <Route path="/new-film" index element={<AddFilm />} />

        </Route>
        <Route path="/login" element={<LoginForm />} />

        <Route element={<ProtectRouter />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default router;
