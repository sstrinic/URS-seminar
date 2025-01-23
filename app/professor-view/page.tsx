"use client";

import { useState, useEffect } from "react";
import styles from "./professor-status.module.css";
import data from "../../components/data/users.json"; // Import the JSON file

type Subject = {
  name: string;
  attendance: number | null;
  total_classes: number | null;
};

type Professor = {
  uid: string;
  name: string;
  surname: string;
  teaching_subjects: string[];
  date_of_registration: string;
  short_description: string;
};

type Student = {
  uid: string;
  name: string;
  surname: string;
  college_subjects: {
    name: string;
    attendance: number;  // Number of lectures attended
    total_classes: number; // Total number of lectures
  }[];
};

const ProfessorView: React.FC = () => {
  const [professorData, setProfessorData] = useState<Professor | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Fetch professor data from JSON
    const fetchProfessorData = () => {
      const user = data.users.find(
        (user: any) => user.role === "teacher" && user.teaching_subjects
      );

      if (user && Array.isArray(user.teaching_subjects)) {
        const professor: Professor = {
          uid: user.uid,
          name: user.name,
          surname: user.surname,
          teaching_subjects: user.teaching_subjects,
          date_of_registration: user.date_of_registration,
          short_description: user.short_description,
        };

        setProfessorData(professor);

        const teachingSubjects = user.teaching_subjects.map((subject: string) => ({
          name: subject,
          attendance: null,
          total_classes: null,
        }));

        setSubjects(teachingSubjects);
      }
    };

    fetchProfessorData();
  }, []);

  const handleViewDetails = (subjectName: string) => {
    setSelectedSubject(subjectName);

    // Fetch students enrolled in the selected subject
    const enrolledStudents = data.users.filter(
      (user: any) =>
        user.role === "student" &&
        user.college_subjects.some((subject: any) => subject.name === subjectName)
    );

    const mappedStudents = enrolledStudents.map((student: any) => ({
      uid: student.uid,
      name: student.name,
      surname: student.surname,
      college_subjects: student.college_subjects,
    }));

    setStudents(mappedStudents);
  };

  const handleCloseDetails = () => {
    setSelectedSubject(null);
    setStudents([]);
  };

  if (!professorData) {
    return <p>Loading professor data...</p>;
  }

  return (
    <div className={styles.professorStatusContainer}>
      <h1>Welcome, Professor {professorData.name} {professorData.surname}!</h1>
      <div className={styles.professorDetails}>
        <p><strong>Description:</strong> {professorData.short_description}</p>
        <p><strong>Date of Registration:</strong> {professorData.date_of_registration}</p>
      </div>
      <h2>Your Teaching Subjects</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index} className={styles.subjectRow}>
              <td>{subject.name}</td>
              <td>
                <button
                  className={styles.detailsButton}
                  onClick={() => handleViewDetails(subject.name)}
                >
                  View Subject Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSubject && (
        <div className={styles.studentDetails}>
          <button className={styles.closeButton} onClick={handleCloseDetails}>
            Close
          </button>
          <h3>Students Enrolled in {selectedSubject}</h3>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Attendance (%)</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const subjectDetails = student.college_subjects.find(
                  (subject) => subject.name === selectedSubject
                );

                // Calculate the attendance percentage
                const attendancePercentage = subjectDetails
                  ? (subjectDetails.attendance / subjectDetails.total_classes) * 100
                  : null;

                return (
                  <tr key={student.uid}>
                    <td>{student.name} {student.surname}</td>
                    <td
                      style={{
                        fontWeight: attendancePercentage !== null && attendancePercentage < 50 ? 'bold' : 'normal',
                        color: attendancePercentage !== null && attendancePercentage < 50 ? 'red' : 'inherit',
                      }}
                    >
                      {attendancePercentage !== null ? `${attendancePercentage.toFixed(2)}%` : "No attendance data"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfessorView;
