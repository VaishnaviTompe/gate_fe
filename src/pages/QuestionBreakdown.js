import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
import Chart from "chart.js/auto";
import "../css/History.css";
import { API_BASE_URL } from "../config";

const QuestionBreakdown = () => {
  const [quizResults, setQuizResults] = useState([]);
  const chartRef = useRef(null);
  const [questions, setQuestions] = useState([]);

  const auth = localStorage.getItem("user");
  const userData = JSON.parse(auth);
  const userName = userData?.fullName;

  useEffect(() => {
    // Fetch quiz results and questions when the component mounts
    fetchQuizResults();
    fetchQuestions();
  }, []);

  const authToken = localStorage.getItem("token");

  // const fetchQuizResults = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/quizResults`, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });

  //     if (response.data && response.data.success) {
  //       setQuizResults(response.data.quizResults);
  //     } else {
  //       console.error("Failed to fetch quiz results:", response.data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching quiz results:", error);
  //   }
  // };

  // const fetchQuestions = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/getQuestion`);
  //     setQuestions(response.data);
  //   } catch (error) {
  //     console.error("Error fetching questions:", error);
  //   }
  // };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getQuestion`);
      if (response.ok) {
        const responseData = await response.json();
        setQuestions(responseData);
      } else {
        throw new Error("Failed to fetch questions");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchQuizResults = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizResults`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse response body as JSON
        if (responseData.success) {
          setQuizResults(responseData.quizResults);
        } else {
          console.error("Failed to fetch quiz results:", responseData.error);
        }
      } else {
        throw new Error("Failed to fetch quiz results");
      }
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  // Function to determine question status (correct, wrong, unattempted) for a specific question
  const getQuestionStatus = (questionId) => {
    const result = quizResults.find((result) =>
      result.questionResults.some((q) => q.questionId === questionId)
    );
    if (result) {
      const questionResult = result.questionResults.find(
        (q) => q.questionId === questionId
      );
      if (questionResult.correct) {
        return "Correct";
      } else if (questionResult.wrong) {
        return "Wrong";
      } else {
        return "Unattempted";
      }
    } else {
      return "Result not found";
    }
  };

  useEffect(() => {
    // Create chart when quiz results or questions change
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy existing chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Prepare data for the bar graph
      const data = {
        labels: questions.map((question, index) => `Q.${index + 1}`),
        datasets: [
          {
            label: "Correct",
            data: questions.map((question) =>
              getQuestionStatus(question._id) === "Correct" ? 1 : 0
            ),
            backgroundColor: "green",
            borderWidth: 2,
          },
          {
            label: "Wrong",
            data: questions.map((question) =>
              getQuestionStatus(question._id) === "Wrong" ? 1 : 0
            ),
            backgroundColor: "red",
            borderWidth: 2,
          },
          {
            label: "Unattempted",
            data: questions.map((question) =>
              getQuestionStatus(question._id) === "Unattempted" ? 1 : 0
            ),
            backgroundColor: "gray",
            borderWidth: 2,
          },
        ],
      };

      chartRef.current.chart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          scales: {
            x: {
              stacked: true, // Stack the bars horizontally
            },
            y: {
              beginAtZero: true,
            },
          },

          layout: {
            padding: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
          },
          categoryPercentage: 0.7, // Adjust the space between bars
        },
      });
    }

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, [quizResults, questions]);

  return (
    <div className="container okresult-container">
      <h3 className="text-center">Result History</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default QuestionBreakdown;
