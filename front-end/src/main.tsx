import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import News from "./Pages/News";
import Drinks from "./Pages/Drinks";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import { store, persistor } from "./Redux/store";
import "./index.css";
import Cart from "./Pages/Cart";
import Management from "./Pages/Management";

import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<App />}>
            <Route path="/" element={<HomePage />} />
            <Route path="drinks" element={<Drinks />} />
            <Route path="news" element={<News />} />
            <Route path="cart" element={<Cart />}></Route>
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="404" />} />
          </Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="management" element={<Management />}></Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
