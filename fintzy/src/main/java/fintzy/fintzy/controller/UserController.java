package fintzy.fintzy.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fintzy.fintzy.model.Car;
import fintzy.fintzy.model.User;
import fintzy.fintzy.service.UserService;
import fintzy.fintzy.utility.EmailPassword;

@RestController
@CrossOrigin
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/users")
	public List<User> getAllUser(){
		List<User> list = userService.getAllUser();
		return list;
	}
	
	@GetMapping("/getBookedCar/{userId}")
	public List<Car> bookedCar(@PathVariable int userId){
		return userService.getBookedCar(userId);
	}
	
	@DeleteMapping("/deleteuser/{userId}")
	public User deleteUser(@PathVariable int userId) {
		User user = userService.removeUser(userId);
		return user;
	}
	
	@PostMapping("/register")
	public User addUser(@RequestBody User user) {
		return userService.addUser(user);
	}
	
	@GetMapping("/login/{email}")
	public User login(@PathVariable String email) {
			User user =  userService.login(email);
			return user;
	}

}
