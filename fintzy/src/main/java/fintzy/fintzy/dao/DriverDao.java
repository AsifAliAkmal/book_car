package fintzy.fintzy.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fintzy.fintzy.model.Driver;

public interface DriverDao extends JpaRepository<Driver,Integer>{

}
