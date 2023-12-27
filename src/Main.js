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
import ScrollToTop from "./components/ScrollToTop";

function Main() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<WelcomePage />} />
          <Route path="my">
            <Route path=":userid">
              <Route index element={<MyMainPage />} />
              <Route path="edit" element={<MyInfoEditPage />} />
            </Route>
          </Route>
          <Route path="study">
            <Route path=":groupid">
              <Route index element={<StudyGroupPage />} />
              <Route path="edit" element={<StudyGroupEditPage />} />
              <Route path=":workbookid" element={<QuestionCreatePage />} />
              <Route
                path=":solveid/solveexplane"
                element={<SolveExplanationPage />}
              />
              <Route path=":quizroomId/ready" element={<SolveReadyPage />} />
              <Route path=":quizroomId/solve" element={<SolvePage />} />
              <Route path=":solveid/result" element={<SolveResultPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
