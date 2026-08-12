import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Dashboard from "./Pages/DashBoard/DashBoard";
import Account from "./Pages/Account/Account";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}