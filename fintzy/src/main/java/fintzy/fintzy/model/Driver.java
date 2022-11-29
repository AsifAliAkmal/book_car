package fintzy.fintzy.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;


@Entity
@Table(name="Driver")
public class Driver {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String phone_number;
	
	@ManyToMany(fetch=FetchType.LAZY,cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
	@JoinTable(
			  name = "driver_car", 
			  joinColumns = @JoinColumn(name = "driver_id"), 
			  inverseJoinColumns = @JoinColumn(name = "car_id"))
	List<Car> cars;
	
	public List<Car> getCars() {
		return cars;
	}

	public void setCars(List<Car> cars) {
		this.cars = cars;
	}
	
	public void assignCar(Car car) {
		if(cars == null) {
			cars = new ArrayList<>();
		}
		cars.add(car);
	}
	
	public void removeCar() {
		cars.clear();
	}

	public Driver() {}

	public Driver(int id, String name, String phone_number) {
		this.id = id;
		this.name = name;
		this.phone_number = phone_number;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}	
	

}
