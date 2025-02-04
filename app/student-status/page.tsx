"use client";

import { useState, useEffect } from 'react';
import styles from './student-status.module.css';

type Course = {
  id: number;
  name: string;
  attendance: number;
  totalLectures: number;
  professor: string;
};

// Mapa za akronime predmeta
const acronyms: { [key: string]: string } = {
  'Fizika': 'FIZ',
  'Matematika': 'MAT',
  'Ugradbeni računalni sustavi': 'URS',
  'Umjetna inteligencija': 'UI',
  'Računalna grafika': 'RG',
  'Multimedija': 'MM',
};

const fakeData: Course[] = [
  { id: 1, name: 'Fizika', attendance: 85, totalLectures: 13, professor: 'Nikola Godinović' },
  { id: 2, name: 'Matematika', attendance: 78, totalLectures: 13, professor: 'Ivan Slapničar' },
  { id: 3, name: 'Ugradbeni računalni sustavi', attendance: 92, totalLectures: 13, professor: 'Sven Gotovac' },
  { id: 4, name: 'Umjetna inteligencija', attendance: 88, totalLectures: 13, professor: 'Maja Braović' },
  { id: 5, name: 'Računalna grafika', attendance: 75, totalLectures: 13, professor: 'Vladan Papić' },
  { id: 6, name: 'Multimedija', attendance: 95, totalLectures: 13, professor: 'Mladen Russo' },
];

const StudentStatus: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    setCourses(fakeData);
  }, []);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleCloseClick = () => {
    setSelectedCourse(null);
  };

  return (
    <div className={styles.studentStatusContainer}>
      <h1>Dobro došao, student!</h1>
      <h2>Status posjećenosti</h2>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Predmet</th>
              <th>Posjećenost (%)</th>
              <th>Detalji</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className={styles.courseRow}>
                <td className={styles.courseName}>
                  {/* Ako je mobilni uređaj, prikazujemo akronime, inače puni naziv predmeta */}
                  <span className={styles.desktop}>{course.name}</span>
                  <span className={styles.mobile}>{acronyms[course.name] || course.name}</span>
                </td>
                <td>{course.attendance}</td>
                <td>
                  {/* Ako je mobilni uređaj, prikazujemo samo 'Detalji', inače 'Klikni za više detalja' */}
                  <button onClick={() => handleCourseClick(course)} className={styles.detailsButton}>
                    <span className={styles.desktop}>Klikni za više detalja</span>
                    <span className={styles.mobile}>Detalji</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCourse && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button onClick={handleCloseClick} className={styles.closeButton}>X</button>
            <h3>Detalji za predmet: {selectedCourse.name}</h3>
            <p>
              Pohađano predavanje: {Math.round((selectedCourse.attendance / 100) * selectedCourse.totalLectures)} od {selectedCourse.totalLectures}
            </p>
            <p>Profesor: {selectedCourse.professor}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentStatus;
