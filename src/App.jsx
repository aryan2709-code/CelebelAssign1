import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Form from "./components/Form"
import SuccessPage from "./components/SuccessPage"
function App() {
return (
  <Router>
    <Routes>
      <Route path="/" element = {<Form />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  </Router>
 );
}

export default App