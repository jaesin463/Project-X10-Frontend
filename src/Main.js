import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import WelcomePage from "./pages/WelcomePage";
import MyMainPage from "./pages/MyMainPage";
import MyInfoEditPage from "./pages/MyInfoEditPage";
import StudyGroupPage from "./pages/StudyGroupPage";
import StudyGroupEditPage from "./pages/StudyGroupEditPage";
import QuestionCreatePage from "./pages/QuestionCreatePage";
import SolveExplanationPage from "./pages/SolveExplanationPage";
import SolvePage from "./pages/SolvePage";
import SolveReadyPage from "./pages/SolveReadyPage";
import SolveResultPage from "./pages/SolveResultPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<WelcomePage />} />
          <Route path="my" element={<MyMainPage />} />
          <Route path="edit" element={<MyInfoEditPage />} />
          <Route path="study">
            {/* 여기 수정해야함 */}
            <Route path="groupid">
              <Route index element={<StudyGroupPage />} />
              <Route path="edit" element={<StudyGroupEditPage />} />
              <Route path="create" element={<QuestionCreatePage />} />
              <Route path="solveexplane" element={<SolveExplanationPage />} />
              <Route path="solve" element={<SolvePage />} />
              <Route path="ready" element={<SolveReadyPage />} />
              <Route path="result" element={<SolveResultPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
