import { AcademicSubject } from "./academic-subject";
import { Student } from "./student";

export interface Course{
    id: number;
    description: string;
    students: Student[];
    academicSubjects: AcademicSubject[];
    numberStudents: number
}