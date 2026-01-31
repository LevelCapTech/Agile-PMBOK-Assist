import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import RootLayout from './app/layout.jsx';
import ProjectSelectionPage from './app/page.jsx';
import ProjectDetailPage from './app/projects/[id]/page.jsx';
import NewProjectPage from './app/projects/new/page.jsx';
import EditProjectPage from './app/projects/[id]/edit/page.jsx';
import PhaseDetailPage from './app/projects/[id]/phases/[phaseId]/page.jsx';
import NewPhasePage from './app/projects/[id]/phases/new/page.jsx';
import './app/global.css';

function AppRoutes() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<ProjectSelectionPage />} />
        <Route path="/projects/new" element={<NewProjectPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/projects/:id/edit" element={<EditProjectPage />} />
        <Route path="/projects/:id/phases/new" element={<NewPhasePage />} />
        <Route path="/projects/:id/phases/:phaseId" element={<PhaseDetailPage />} />
      </Routes>
    </RootLayout>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}
