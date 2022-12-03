package server.server.service;

import java.util.List;

import server.server.model.Car;
import server.server.model.User;
import server.server.utility.EmailPassword;



public interface UserService {
	
	public User addUser(User user);
	public User removeUser(int userId);
	public List<User> getAllUser();
	public List<Car> getBookedCar(int userId);
	public User login(String email);

}
