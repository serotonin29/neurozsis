import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginRegistration from "pages/login-registration";
import StudentDashboard from "pages/student-dashboard";
import MaterialCatalogSearch from "pages/material-catalog-search";
import DiscussionForum from "pages/discussion-forum";
import InteractiveQuizSystem from "pages/interactive-quiz-system";
import MaterialViewer from "pages/material-viewer";
import AdminDashboard from "pages/admin-dashboard";
import ContentManagementSystem from "pages/content-management-system";
import UserManagementSystem from "pages/user-management-system";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/login-registration" element={<LoginRegistration />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/material-catalog-search" element={<MaterialCatalogSearch />} />
        <Route path="/discussion-forum" element={<DiscussionForum />} />
        <Route path="/interactive-quiz-system" element={<InteractiveQuizSystem />} />
        <Route path="/material-viewer" element={<MaterialViewer />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/content-management-system" element={<ContentManagementSystem />} />
        <Route path="/user-management-system" element={<UserManagementSystem />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;