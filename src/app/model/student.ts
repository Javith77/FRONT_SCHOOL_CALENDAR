import { Course } from "./course";

export interface Student{
    id: number;
    name: string;
    lastName: string;
    typeDocument: string;
    document: string;
    genre: string;
    address: string;
    course: Course
}