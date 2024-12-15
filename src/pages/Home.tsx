import React, { useState } from "react";
import VideoPlayer from "../components/VideoPlayer.tsx";
import Assessments from "../components/Assessments.tsx";
import videoData from "../data/videos.json";

const Home: React.FC = () => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);
  const [canProceed, setCanProceed] = useState(false);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);

  const handleCourseSelect = (index: number) => {
    setSelectedCourseIndex(index);
    setCanProceed(false);
    setIsAssessmentComplete(false);
  };

  const handleVideoEnd = () => setCanProceed(true);

  const handleAssessmentComplete = () => setIsAssessmentComplete(true);

  const handleGoBack = () => {
    setSelectedCourseIndex(null);
    setCanProceed(false);
    setIsAssessmentComplete(false);
  };

  const selectedCourse = selectedCourseIndex !== null ? videoData[selectedCourseIndex] : null;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <aside className="sidebar_main">
  <h2>IIT ROPAR LMS</h2>
  <nav>
    <ul>
      <li>Dashboard</li>
      <li>Courses</li>
      <li>Assignments</li>
      <li>Announcements</li>
    </ul>
  </nav>
</aside>

<main className="main-content">
  <h1>Student Portal</h1>
  {!selectedCourse ? (
    <>
      {/* All Courses */}
      <section>
        <h2>All Courses</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {videoData.map((course, index) => (
              <tr key={course.id} onClick={() => handleCourseSelect(index)}>
                <td>{course.id}</td>
                <td>{course.title}</td>
                <td>{course.duration || "6 weeks"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  ) : (
    <>
      <button onClick={handleGoBack}>← Back to All Courses</button>
      <h2>{selectedCourse.title}</h2>
      <p>{selectedCourse.description}</p>
      <VideoPlayer url={selectedCourse.url} onVideoEnd={handleVideoEnd} />
      {canProceed && !isAssessmentComplete && (
        <Assessments
          questions={selectedCourse.questions}
          onComplete={handleAssessmentComplete}
        />
      )}

      {/* Next Task Button */}
      {isAssessmentComplete && (
              <button
                onClick={() => {
                  setSelectedCourseIndex((prev) =>
                    prev !== null && prev < videoData.length - 1 ? prev + 1 : null
                  );
                  setCanProceed(false);
                  setIsAssessmentComplete(false);
                }}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {selectedCourseIndex !== null && selectedCourseIndex < videoData.length - 1
                  ? "Next Task"
                  : "Go Back"}
              </button>
            )}

    </>
  )}
</main>

    </div>
  );
};

export default Home;
