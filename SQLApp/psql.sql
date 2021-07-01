-- postgres

CREATE USER manager CREATEDB PASSWORD 'password';

-- manager

CREATE DATABASE organization ENCODING UTF8;

CREATE TABLE employee (
	id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name text NOT NULL,
	drink boolean NOT NULL
);

CREATE TABLE guest (
	id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	employee_id int NOT NULL UNIQUE REFERENCES employee ON DELETE CASCADE ON UPDATE CASCADE,
	name text NOT NULL,
	drink boolean NOT NULL
);

ALTER TABLE employee ADD COLUMN guest_id int UNIQUE REFERENCES guest ON DELETE SET NULL ON UPDATE CASCADE;
