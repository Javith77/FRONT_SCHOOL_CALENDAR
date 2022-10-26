import { AcademicSubject } from "./academic-subject";

export interface Teacher{
    id: number;
    name: string;
    lastName: string;
    typeDocument: string;
    document: string;
    genre: string;
    address: string;
    academicLevel: string;
    academicSubjects: AcademicSubject[];
    // dateOfBirth: string;
}