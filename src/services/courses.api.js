import api from "./api";

export const getCourses = (params, config = {}) => {
  return api.get("/courses", { params, ...config });
};

export const getCourseById = (id, config = {}) => {
  return api.get(`/courses/${id}`, config);
};
