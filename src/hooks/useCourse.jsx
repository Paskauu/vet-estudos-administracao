import { createContext, useContext } from "react";

export const CourseContext = createContext(null);
export const useCourse = () => useContext(CourseContext);
