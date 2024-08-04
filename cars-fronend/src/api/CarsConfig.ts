import axios from "axios";

const API_URL = "http://localhost:8090/car";

export const getCar = () => axios.get(`${API_URL}/getcar`);
export const getCarById = (id: number) => axios.get(`${API_URL}/getcarbyid/${id}`);
export const addCar = (car: any) => axios.post(`${API_URL}/addcar`, car);
export const updateCar = (id: number, car: any) => axios.put(`${API_URL}/updatecar/${id}`, car);
export const deleteCar = (id: number) => axios.delete(`${API_URL}/deletecar/${id}`);
