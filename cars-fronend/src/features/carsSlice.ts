import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCar, deleteCar, getCar, getCarById, updateCar } from "../api/CarsConfig";


export interface Car {
    id: number;
    model: string;
    color: string;
    type: string;
    fuelType: string;
    cost: string;
  }

export interface CarState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: CarState = {
  cars: [],
  loading: false,
  error: null,
};

export const fetchCars = createAsyncThunk("cars/fetchcars", async () => {
  const response = await getCar();
  return response.data;
});

export const fetchCarById = createAsyncThunk("cars/fetchcarById", async (id: number) => {
  const response = await getCarById(id);
  return response.data;
});

export const createCar = createAsyncThunk("cars/createcar", async (car: any) => {
  const response = await addCar(car);
  return response.data;
});

export const modifyCar = createAsyncThunk("cars/modifycar", async ({ id, car }: { id: number, car: any }) => {
  const response = await updateCar(id, car);
  return response.data;
});

export const removeCar = createAsyncThunk("cars/removecar", async (id: number) => {
  await deleteCar(id);
  return id;
});

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch car";
      })
      .addCase(removeCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.filter((car) => car.id !== action.payload);
      })
      .addCase(removeCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove car";
      });
  },
});

export default carsSlice.reducer;
