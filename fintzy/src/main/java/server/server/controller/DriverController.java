package server.server.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import server.server.model.Driver;
import server.server.service.DriverService;

@RestController	
public class DriverController {
	
	@Autowired
	DriverService driverService;
	
	
	@GetMapping("/drivers")
	public List<Driver> getAllDriver(){
		List<Driver> allDriver = driverService.getAllDriver();
		return allDriver;
		
	}
	
	@PostMapping("/addDriver")
	public Driver addDriver(@RequestBody Driver driver) {
		Driver dr = driverService.addDriver(driver);
		return dr;
	}
	
	
	@DeleteMapping("/removeDriver/{driverId}")
	public Driver removeDriver(@PathVariable int driverId) {
		return driverService.removeDriver(driverId);
	}
	
	@PutMapping("/assignDriver/{driverId}/car/{carId}")
	public boolean assignCarToDriver(@PathVariable int driverId,@PathVariable int carId) {
		return driverService.assignCarToDriver(driverId, carId);
	}
	
}
