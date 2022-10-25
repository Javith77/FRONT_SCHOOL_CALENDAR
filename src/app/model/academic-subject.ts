import { Course } from "./course";
import { Teacher } from "./teacher";

export interface AcademicSubject{
    id: number;
    description: string;
    teachers: Teacher[];
    courses: Course[]
}