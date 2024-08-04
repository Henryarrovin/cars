import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchCars } from "../../features/carsSlice";
import SearchBar from "../SearchBar";
import CarRow from "../CarRow";
import CarModal from "../CarModal";
import CarCarousel from "../CarCarousel";

const CarList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cars, loading, error } = useSelector(
    (state: RootState) => state.cars
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [editCarId, setEditCarId] = useState<number | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const filteredStudents = cars.filter((car) =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (id?: number) => {
    setEditCarId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditCarId(undefined);
    setIsModalOpen(false);
  };

  return (
    <>
      {showDetails && (
        <div className="bg-gray-900 text-white min-h-screen p-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Cars</h1>
            <button
              onClick={() => {
                openModal();
                setShowDetails(!showDetails);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
              Add Car
            </button>

            {showDetails && <CarCarousel cars={cars} />}

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Model</th>
                  <th className="px-4 py-2 border">Color</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Fuel Type</th>
                  <th className="px-4 py-2 border">Cost</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((car) => (
                  <CarRow
                    key={car.id}
                    car={car}
                    onEdit={() => {
                      openModal(car.id);
                      setShowDetails(!showDetails);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <CarModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        carId={editCarId}
      />
    </>
  );
};

export default CarList;
