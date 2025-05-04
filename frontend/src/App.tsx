
import { Routes, Route } from "react-router";

import FeedbackPage from "./pages/FeedbackPage"
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FeedbackPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
