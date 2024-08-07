import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { createCar, modifyCar } from "../features/carsSlice";
import "./CarModal.css";

Modal.setAppElement("#root");

interface CarModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  carId?: number;
}

const CarModal = ({ isOpen, onRequestClose, carId }: CarModalProps) => {
  const [car, setCar] = useState({
    model: "",
    color: "",
    type: "",
    fuelType: "",
    cost: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const { cars } = useSelector((state: RootState) => state.cars);

  useEffect(() => {
    if (isOpen) {
      if (carId) {
        const carData = cars.find((student) => student.id === carId);
        if (carData) setCar(carData);
      } else {
        setCar({
          model: "",
          color: "",
          type: "",
          fuelType: "",
          cost: "",
        });
      }
    }
  }, [isOpen, carId, cars]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (carId) {
      dispatch(modifyCar({ id: carId, car }));
    } else {
      dispatch(createCar(car));
    }
    onRequestClose();
    window.location.reload();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Student Modal"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg max-w-lg w-full h-[80%] flex flex-col">
        <h1 className="text-2xl font-bold mb-4">
          {carId ? "Edit" : "Add"} Car
        </h1>
        <div className="flex-1 overflow-y-auto mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={car.model}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={car.color}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Type
              </label>
              <select
                name="type"
                value={car.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-700"
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Sports">Sports</option>
                <option value="Seden">Seden</option>
                <option value="SUV">SUV</option>
                <option value="Minivan">Minivan</option>
                <option value="Crossover">Crossover</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={car.fuelType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-700"
                required
              >
                <option value="" disabled>
                  Select Fuel Type
                </option>
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Cost
              </label>
              <input
                type="text"
                name="cost"
                value={car.cost}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </form>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={(e) => {
              handleSubmit(e);
              window.location.reload();
            }}
          >
            {carId ? "Update" : "Add"} Car
          </button>
          <button
            type="button"
            onClick={() => {
              onRequestClose();
              window.location.reload();
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CarModal;
