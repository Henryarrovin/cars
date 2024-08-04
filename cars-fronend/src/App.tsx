import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import CarList from "./components/pages/CarList";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<CarList />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
