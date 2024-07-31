package com.ty.cars.cars.controllers;

import com.ty.cars.cars.models.Car;
import com.ty.cars.cars.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car")
@CrossOrigin(origins = "http://localhost:5173")
public class CarController {

    @Autowired
    CarService carService;

    @GetMapping("/startup")
    public String startup() {
        return "Car application started";
    }

    @GetMapping("/getcar")
    public ResponseEntity<List<Car>> getCar() {
        return new ResponseEntity<>(carService.getCar(), HttpStatus.OK);
    }

    @GetMapping("/getcarbyid/{id}")
    public ResponseEntity<?> getCarById(@PathVariable Long id) {
        if (carService.getCarById(id) == null) return new ResponseEntity<>("No car found by Id " + id, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(carService.getCarById(id), HttpStatus.OK);
    }

    @PostMapping("/addcar")
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        return new ResponseEntity<>(carService.addCar(car), HttpStatus.CREATED);
    }

    @PutMapping("/updatecar/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car car) {
        return new ResponseEntity<>(carService.updateCar(id, car), HttpStatus.OK);
    }

    @DeleteMapping("/deletecar/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
