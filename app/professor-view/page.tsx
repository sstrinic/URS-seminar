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
  short_description1: string | undefined;
};

type Student = {
  uid: string;
  name: string;
  surname: string;
  college_subjects: {
    name: string;
    attendance: number;
    total_classes: number;
  }[];
  db_attendance?: number | null; // New field for DB attendance count
};

const ProfessorView: React.FC = () => {
  const [professorData, setProfessorData] = useState<Professor | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Fetch professor data from JSON
    const fetchProfessorData = () => {
      const user = data.users.find((user: any) => user.role === "teacher");

      if (user && Array.isArray(user.teaching_subjects)) {
        const professor: Professor = {
          uid: user.uid,
          name: user.name,
          surname: user.surname,
          teaching_subjects: user.teaching_subjects,
          date_of_registration: user.date_of_registration,
          short_description: user.short_description,
          short_description1: user.short_description1,
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

  const handleViewDetails = async (subjectName: string) => {
    setSelectedSubject(subjectName);

    // Fetch students enrolled in the selected subject
    const enrolledStudents = data.users.filter(
      (user: any) =>
        user.role === "student" &&
        user.college_subjects.some((subject: any) => subject.name === subjectName)
    );

    let mappedStudents = enrolledStudents.map((student: any) => ({
      uid: student.uid,
      name: student.name,
      surname: student.surname,
      college_subjects: student.college_subjects,
      db_attendance: student.db_attendance, // Default to null
    }));

    // If the selected subject is "Ugradbeni Računalni Sustavi", fetch attendance from the database
    if (subjectName === "Ugradbeni Računalni Sustavi") {
      try {
        const response = await fetch("/api/attendance");
        const attendanceData = await response.json();

        // Count occurrences of each rfid_uid in the fetched data
        const attendanceCountMap: Record<string, number> = attendanceData.reduce(
          (acc: Record<string, number>, record: any) => {
            acc[record.rfid_uid] = (acc[record.rfid_uid] || 0) + 1;
            return acc;
          },
          {}
        );

        // Assign attendance count to each student
        mappedStudents = mappedStudents.map(student => ({
          ...student,
          db_attendance: attendanceCountMap[student.uid] || null, // Default to 0 if no records found
        }));

      } catch (error) {
        console.error("Failed to fetch attendance data", error);
      }
    }

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
      <div className={styles.professorStatusContainerhead}>
      <h1>Dobrodošli, {professorData.name} {professorData.surname}!</h1>
      <div className={styles.professorDetails}>
        <p><strong>Zavod:</strong> {professorData.short_description}</p>
        <p><strong>Katedra:</strong> {professorData.short_description1}</p>
        <p><strong>Datum registracije:</strong> {professorData.date_of_registration}</p>
      </div>
      </div>

      <h2>Vaši kolegiji</h2>
      <table>
        <thead>
          <tr>
            <th>Kolegij</th>
            <th>Detalji</th>
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
                  Klikni za više detalja
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSubject && (
        <div className={styles.studentDetails}>
          <button className={styles.closeButton} onClick={handleCloseDetails}>
            Zatvori
          </button>
          <h3>Studenti upisani na {selectedSubject}</h3>
          <table>
            <thead>
              <tr>
                <th>Ime Studenta</th>
                <th>Dolasci</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const subjectDetails = student.college_subjects.find(
                  (subject) => subject.name === selectedSubject
                );

                // If "Ugradbeni Računalni Sustavi", use counted DB attendance
                if (selectedSubject === "Ugradbeni Računalni Sustavi" && student.db_attendance !== null) {
                  return (
                    <tr key={student.uid}>
                      <td>{student.name} {student.surname}</td>
                      <td style={{ fontWeight: "bold", color: "#3498db" }}>
                        {student.db_attendance} dolazaka
                      </td>
                    </tr>
                  );
                }

                // Otherwise, use JSON data and calculate percentage
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