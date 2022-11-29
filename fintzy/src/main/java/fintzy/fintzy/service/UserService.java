package fintzy.fintzy.service;

import java.util.List;

import fintzy.fintzy.model.Car;
import fintzy.fintzy.model.User;
import fintzy.fintzy.utility.EmailPassword;



public interface UserService {
	
	public User addUser(User user);
	public User removeUser(int userId);
	public List<User> getAllUser();
	public List<Car> getBookedCar(int userId);
	public User login(String email);

}
