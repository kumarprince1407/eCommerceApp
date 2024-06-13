import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Home from "./components/Home";
import CardDetails from "./components/CardDetails";

function App() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
