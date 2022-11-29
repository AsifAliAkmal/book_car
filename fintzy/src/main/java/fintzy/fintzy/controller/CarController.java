package fintzy.fintzy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fintzy.fintzy.model.Car;
import fintzy.fintzy.service.CarService;

@RestController
@CrossOrigin
public class CarController {
	
	@Autowired
	CarService carService;
	
	@GetMapping("/cars")
	public List<Car> getAllCar(){
		List<Car> cars = carService.getAllCar();
		return cars;
	}
	
	@PostMapping("/addCar")
	public Car addCar(@RequestBody Car car) {
		carService.addCar(car);
		return car;
	}
	
	
	@DeleteMapping("/removeCar/{carId}")
	public Car removeCar(@PathVariable int carId) {
		Car car = carService.removeCar(carId);
		car.removeDriver();
		return car;
	}
	
	@GetMapping("/carByCapacity/{capacity}")
	public List<Car> getCarByCapacity(@PathVariable int capacity){
		List<Car> cars = carService.findCarByCapacity(capacity);
		return cars;
	}
	
	
	@PutMapping("/bookCar/{carId}/user/{userId}")
	public Car bookCar(@PathVariable(name="carId") int carId,@PathVariable(name="userId") int userId) {
		Car car = carService.bookCar(carId,userId);
		return car;
	}
	
	@PutMapping("/cancleBooking/{carId}")
	public Car cancleBooking(@PathVariable int carId) {
		Car car = carService.cancleBooking(carId);
		return car;
	}

}
