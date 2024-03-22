// import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// import Chart from "chart.js/auto";
// import "../css/History.css";
// import { API_BASE_URL } from "../config";

// const History = () => {
//   const [quizResults, setQuizResults] = useState([]);
//   const chartRefs = useRef([]);

//   const auth = localStorage.getItem("user");
//   const userData = JSON.parse(auth);
//   const userName = userData?.fullName;

//   useEffect(() => {
//     // Fetch quiz results when the component mounts
//     fetchQuizResults();
//   }, []);

//   const authToken = localStorage.getItem("token");

//   // const fetchQuizResults = async () => {
//   //   try {
//   //     const response = await fetch(`${API_BASE_URL}/quizResults`, {
//   //       headers: {
//   //         Authorization: `Bearer ${authToken}`,
//   //       },
//   //     });

//   //     if (response.data && response.data.success) {
//   //       setQuizResults(response.data.quizResults);
//   //       updateCharts(response.data.quizResults);
//   //     } else {
//   //       console.error("Failed to fetch quiz results:", response.data.error);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching quiz results:", error);
//   //   }
//   // };

//   const fetchQuizResults = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/quizResults`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch quiz results");
//       }

//       const responseData = await response.json();

//       if (responseData.success) {
//         setQuizResults(responseData.quizResults);
//         updateCharts(responseData.quizResults);
//       } else {
//         console.error("Failed to fetch quiz results:", responseData.error);
//       }
//     } catch (error) {
//       console.error("Error fetching quiz results:", error);
//     }
//   };

//   const updateCharts = (data) => {
//     data.forEach((result, index) => {
//       const chartData = {
//         labels: ["Correct", "Wrong", "Unattempted"],
//         datasets: [
//           {
//             data: [
//               result.correctAnswers,
//               result.wrongAnswers,
//               result.unansweredQuestions,
//             ],
//             backgroundColor: ["#4CAF50", "#FF5733", "#A9A9A9"],
//             hoverBackgroundColor: ["#4CAF50", "#FF5733", "#A9A9A9"],
//           },
//         ],
//       };

//       // const canvasRef = chartRefs.current[index];
//       let canvasRef = chartRefs.current[index];

//       // Create new canvas element if canvasRef is undefined
//       if (!canvasRef) {
//         canvasRef = document.createElement("canvas");
//         chartRefs.current[index] = canvasRef;
//       }

//       // // Destroy existing chart if it exists
//       // if (canvasRef.chart) {
//       //   canvasRef.chart.destroy();
//       // }

//       // Set canvas size using style attribute
//       canvasRef.style.width = "300px";
//       canvasRef.style.height = "250px";

//       // Create new chart instance
//       const ctx = canvasRef.getContext("2d");

//       // Destroy existing chart if it exists
//       if (canvasRef.chart) {
//         canvasRef.chart.destroy();
//       }

//       canvasRef.chart = new Chart(ctx, {
//         type: "pie",
//         data: chartData,
//         options: {
//           aspectRatio: 1, // Adjust this value as needed
//           responsive: false, // Disable responsiveness
//           maintainAspectRatio: false,
//         },
//       });
//     });
//   };

//   return (
//     <div className="container okresult-container">
//       <h3 className="text-center">Result History</h3>
//       {quizResults.length === 0 ? (
//         <p>
//           No results available. Please take a quiz to view your result history.
//         </p>
//       ) : (
//         <ul>
//           {quizResults.map((result, index) => (
//             <li key={result._id} className="list-unstyled">
//               <div className="row">
//                 {auth && userName && <h4 className="mb-4">Name: {userName}</h4>}

//                 <div className="col-lg-4 col-md-6 mb-4">
//                   <div className="card">
//                     <div className="card-header obtained-header">
//                       <h3>Total Analysis</h3>
//                     </div>
//                     <div className="card-body">
//                       <div className="card-text">
//                         <p>Total Questions: {result.totalQuestions}</p>
//                         <p>Correct Answers: {result.correctAnswers}</p>
//                         <p>Wrong Answers: {result.wrongAnswers}</p>
//                         <p>
//                           Unanswered Questions: {result.unansweredQuestions}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-6 mb-4">
//                   <div className="card">
//                     <div className="card-header">
//                       <h3>Score</h3>
//                     </div>
//                     <div className="card-body">
//                       <div className="card-text text-center">
//                         <h4 className="history-text">Obtained marks</h4>
//                         <p>
//                           {result.obtainedMarks} / {result.totalMarks}
//                         </p>
//                         <br></br>
//                         {/* <h4 className="history-text">Score</h4>
//                         <p>{result.score}</p> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-lg-4 col-md-6 mb-4">
//                   <div className="card">
//                     <div className="card-header">
//                       <h3>Graphical</h3>
//                     </div>
//                     <div className="card-body">
//                       <div className="card-text">
//                         <canvas
//                           ref={(el) => (chartRefs.current[index] = el)}
//                           style={{ width: "300px", height: "250px" }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default History;



import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import "../css/History.css";
import { API_BASE_URL } from "../config";

const History = () => {
  const [quizResults, setQuizResults] = useState([]);
  const chartRefs = useRef([]);

  const auth = localStorage.getItem("user");
  const authToken = localStorage.getItem("token");
  const userData = JSON.parse(auth);
  const userName = userData?.fullName;

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/quizResults`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch quiz results");
        }

        const responseData = await response.json();

        if (responseData.success) {
          setQuizResults(responseData.quizResults);
          updateCharts(responseData.quizResults);
        } else {
          console.error("Failed to fetch quiz results:", responseData.error);
        }
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      }
    };

    // Fetch quiz results when the component mounts
    fetchQuizResults();
  }, [authToken]);

  const updateCharts = (data) => {
    data.forEach((result, index) => {
      const chartData = {
        labels: ["Correct", "Wrong", "Unattempted"],
        datasets: [
          {
            data: [
              result.correctAnswers,
              result.wrongAnswers,
              result.unansweredQuestions,
            ],
            backgroundColor: ["#4CAF50", "#FF5733", "#A9A9A9"],
            hoverBackgroundColor: ["#4CAF50", "#FF5733", "#A9A9A9"],
          },
        ],
      };

      let canvasRef = chartRefs.current[index];

      if (!canvasRef) {
        canvasRef = document.createElement("canvas");
        chartRefs.current[index] = canvasRef;
      }

      canvasRef.style.width = "300px";
      canvasRef.style.height = "250px";

      const ctx = canvasRef.getContext("2d");

      if (canvasRef.chart) {
        canvasRef.chart.destroy();
      }

      canvasRef.chart = new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: {
          aspectRatio: 1,
          responsive: false,
          maintainAspectRatio: false,
        },
      });
    });
  };

  return (
    <div className="container okresult-container">
      <h3 className="text-center">Result History</h3>
      {quizResults.length === 0 ? (
        <p>
          No results available. Please take a quiz to view your result history.
        </p>
      ) : (
        <ul>
          {quizResults.map((result, index) => (
            <li key={result._id} className="list-unstyled">
              <div className="row">
                {auth && userName && <h4 className="mb-4">Name: {userName}</h4>}

                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="card">
                    <div className="card-header obtained-header">
                      <h3>Total Analysis</h3>
                    </div>
                    <div className="card-body">
                      <div className="card-text">
                        <p>Total Questions: {result.totalQuestions}</p>
                        <p>Correct Questions: {result.correctAnswers}</p>
                        <p>Wrong Questions: {result.wrongAnswers}</p>
                        <p>
                          Unanswered Questions: {result.unansweredQuestions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h3>Score</h3>
                    </div>
                    <div className="card-body">
                      <div className="card-text text-center">
                        <h4 className="history-text">Obtained marks</h4>
                        <h5>
                          {result.obtainedMarks} / {result.totalMarks}

                        </h5>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h3>Graphical</h3>
                    </div>
                    <div className="card-body">
                      <div className="card-text">
                        <canvas
                          ref={(el) => (chartRefs.current[index] = el)}
                          style={{ width: "300px", height: "250px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
