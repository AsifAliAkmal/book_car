package server.server.service;

import java.util.List;

import server.server.model.Driver;

public interface DriverService {
	public Driver removeDriver(int driverId);
	public Driver addDriver(Driver driver);
	public List<Driver>getAllDriver();
	public boolean assignCarToDriver(int driverId,int carId);
}
