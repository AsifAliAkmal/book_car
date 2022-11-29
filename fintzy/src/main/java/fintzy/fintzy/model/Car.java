package fintzy.fintzy.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="car")
public class Car {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String car_number;
	
	private int capacity;
	
	private boolean is_booked;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	
	@ManyToMany(mappedBy="cars",
			cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH},
			fetch=FetchType.LAZY)
	List<Driver> drivers;
	
	public List<Driver> getDrivers() {
		return drivers;
	}

	public void setDrivers(List<Driver> drivers) {
		this.drivers = drivers;
	}

	public Car() {}

	public Car(int id, String car_number, int capacity, boolean is_booked) {
		
		this.id = id;
		this.car_number = car_number;
		this.capacity = capacity;
		this.is_booked = is_booked;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCar_number() {
		return car_number;
	}

	public void setCar_number(String car_number) {
		this.car_number = car_number;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public boolean isIs_booked() {
		return is_booked;
	}

	public void setIs_booked(boolean is_booked) {
		this.is_booked = is_booked;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public void removeDriver() {
		drivers.clear();
	}
	

}
