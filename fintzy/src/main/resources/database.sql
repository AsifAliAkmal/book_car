create database assignment

use assignment

create table user(
id int not null auto_increment,
name varchar(40) not null,
email varchar(50) not null unique,
password varchar(300) not null,
role varchar(30) not null,
primary key(id)
)

insert table user (id,name,email,password,role) values
(1,"Asif Khan","asifali11813047@gmail.com","$2a$12$C9vZT0i9W6mLw0HrrGfdluo21lTtY3QoJVH33irPjSB/lK8qeq96a","ADMIN"),
(2,"Asad Khan","asifakmal2112@gmail.com","$2a$12$aWguN7n6mq3SRE/6QerwQOAgkQf1RF92mveJ8/fIDGwwjiKff4yg6","USER");

//You can get the password using {https://bcrypt-generator.com/} simply you need to enter the email address

create table driver(
id int not null auto_increment,
name varchar(30) not null,
phone_number varchar(20) not null,
primary key (id)
)

insert into driver (id,name,phone_number) values
(1,"Kabir","+91-231312131"),
(2,"Kapil","+91-232342343"); 

create table car(
id int not null auto_increment,
car_number varchar(20) not null unique,
capacity int not null,
primary key(id)
)

insert into car (id,car_number,capacity) values
(1,"BR02 1211",4),
(2,"BR04 2121,5);

create table driver_car(
driver_id int not null,
car_id int not null,
primary key (driver_id,car_id),
foreign key(driver_id) references driver(id),
foreign key(car_id) references car(id)
)

create table authorities(
id long int not null auto_increment,
user_id int not null,
name varchar(20) not null,
primary key(id),
foreign key user_id references user(user_id)
)

insert into authorities (id,user_id,name) values
(1,1,"ADMIN"),
(2,2,"USER");
