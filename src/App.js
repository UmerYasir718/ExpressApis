import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Data from "./myComponets/Data";
import Delete from "./myComponets/Delete";
import PostPage from "./myComponets/PostPage";
import Update from "./myComponets/Update";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Data />}></Route>
        <Route exact path="/post" element={<PostPage />}></Route>
        <Route exact path="/update" element={<Update />}></Route>
        <Route exact path="/delete" element={<Delete />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
