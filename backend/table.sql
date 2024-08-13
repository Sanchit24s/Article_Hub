create table appuser(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    isDeletable varchar(20), 
    UNIQUE (email)
);

insert into appuser(name,email,password,status,isDeletable) values("Admin","admin@gmail.com","admin","true","false");