SELECT current_database();

create table accounts(
	id serial,
	name varchar(10)
);

CREATE INDEX idx_customer_age
ON Customer(age);

ALTER TABLE accounts ADD COLUMN balance DOUBLE PRECISION;

ALTER TABLE accounts ADD CHECK (balance > 0);

ALTER TABLE accounts ADD UNIQUE (id);


INSERT INTO accounts(name,balance) VALUES('yash',400);


ALTER TABLE accounts ADD PRIMARY KEY (id);

ALTER TABLE accounts ADD COLUMN amount DOUBLE PRECISION;

ALTER TABLE accounts RENAME COLUMN "Amount" TO "amount";

select * from accounts;

DELETE FROM accounts WHERE balance IS NULL;

-- TRUNCATE TABLE accounts;

-- DROP TABLE accounts;

CREATE TABLE Customer(
	id int primary key,
	name varchar(30),
	age int,
	accountId int references accounts(id)
);




select 
CASE
	WHEN age < 30 THEN 'YOUNG'
	WHEN age >=30 THEN 'OLD'
END as ageCategory from Customer ;

insert into Customer values(101,'Balaji',59,1);


Begin;
insert into Customer values(102,'Balaji',49,1);
insert into Customer values(103,'Balaji',59,1);
Commit;
ROLLBACK;

INSERT INTO Customer VALUES
(104, 'Akshay', 28, 1),
(105, 'Yash', 32, 1),
(106, 'Rahul', 45, 1),
(107, 'Kiran', 25, 1),
(108, 'Anjali', 30, 1),
(109, 'Priya', 27, 1),
(110, 'Vikram', 52, 1),
(111, 'Deepa', 41, 1),
(112, 'Suresh', 65, 1),
(113, 'Megha', 22, 1);


select * from Customer where age > 50;

select * from Customer order by age asc;
select * from Customer order by age asc offset 1 limit 1;



create table frontend_developers (
	id int primary key,
	name varchar(20),
	project_id varchar(20)
);
insert into frontend_developers values (101, 'Ashok', 'P01');
insert into frontend_developers values (102, 'Kishore', 'P02');
insert into frontend_developers values (103, 'Sagar', 'P03');
insert into frontend_developers values (104, 'Hitesh', 'P04');
insert into frontend_developers values (105, 'Hari', 'P44');

select * from frontend_developers;

create table backend_developers (
	id int primary key,
	name varchar(20),
	project_id varchar(20)
);
insert into backend_developers values (111, 'Sam', 'P11');
insert into backend_developers values (122, 'Ritu', 'P22');
insert into backend_developers values (103, 'Sagar', 'P33');
insert into backend_developers values (144, 'Nikky', 'P44');

select * from frontend_developers;
select * from backend_developers;

select * from frontend_developers, backend_developers; -- 20 rec

select * from frontend_developers, backend_developers where frontend_developers.project_id = backend_developers.project_id;

select * from frontend_developers inner join backend_developers on frontend_developers.project_id = backend_developers.project_id;
select * from frontend_developers join backend_developers on frontend_developers.project_id = backend_developers.project_id;


select * from frontend_developers left join backend_developers on frontend_developers.project_id = backend_developers.project_id;

select * from frontend_developers right join backend_developers on frontend_developers.project_id = backend_developers.project_id;

select * from frontend_developers full join backend_developers on frontend_developers.project_id = backend_developers.project_id;



