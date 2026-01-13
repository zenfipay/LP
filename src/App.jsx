import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"

import Home from "./pages/Home"
import FrequentlyAskedQuestions from "./pages/FrequentlyAskedQuestions"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/frequentlyaskedquestions" element={<FrequentlyAskedQuestions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}