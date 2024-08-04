import Carousel from "react-material-ui-carousel";
import { Car } from "../features/carsSlice";
import "./CarModal.css";

interface CarCarouselProps {
  cars: Car[];
}

const CarCarousel = ({ cars }: CarCarouselProps) => {
  return (
    <div className="my-4">
      <Carousel
        navButtonsAlwaysVisible={true}
        autoPlay={false}
        indicators={false}
      >
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <h3 className="text-2xl font-semibold mb-2">{car.model}</h3>
            <div className="mb-4">
              <img
                src={`https://via.placeholder.com/300x200?text=${car.model}`}
                alt={car.model}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-lg mb-1">
                <strong>Color:</strong> {car.color}
              </p>
              <p className="text-lg mb-1">
                <strong>Type:</strong> {car.type}
              </p>
              <p className="text-lg mb-1">
                <strong>Fuel Type:</strong> {car.fuelType}
              </p>
              <p className="text-lg">
                <strong>Cost:</strong> ${car.cost.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarCarousel;
