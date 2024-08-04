import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { removeCar, Car } from "../features/carsSlice";

interface CarRowProps {
  car: Car;
  onEdit: () => void;
}

const CarRow = ({ car, onEdit }: CarRowProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${car.model}?`)) {
      dispatch(removeCar(car.id));
    }
  };

  return (
    <tr>
      <td className="px-4 py-2 border">{car.model}</td>
      <td className="px-4 py-2 border">{car.color}</td>
      <td className="px-4 py-2 border">{car.type}</td>
      <td className="px-4 py-2 border">{car.fuelType}</td>
      <td className="px-4 py-2 border">{car.cost}</td>
      <td className="px-4 py-2 border">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CarRow;
