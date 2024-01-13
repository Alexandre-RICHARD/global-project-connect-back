DROP TABLE IF EXISTS work_time;
DROP TABLE IF EXISTS projects_todo;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS user_data;

CREATE TABLE user_data(
   Id_user_data INT AUTO_INCREMENT,
   nickname VARCHAR(50) NOT NULL,
   mail VARCHAR(100) NOT NULL,
   password_hashed VARCHAR(100) NOT NULL,
   hourly_rate DECIMAL(6,2),
   PRIMARY KEY(Id_user_data)
);

CREATE TABLE projects(
   Id_projects INT AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   description VARCHAR(500) NOT NULL,
   color VARCHAR(8) NOT NULL,
   monetized BOOLEAN NOT NULL,
   Id_user_data INT NOT NULL,
   PRIMARY KEY(Id_projects),
   FOREIGN KEY(Id_user_data) REFERENCES user_data(Id_user_data)
);

CREATE TABLE projects_todo(
   Id_projects_todo INT AUTO_INCREMENT,
   task VARCHAR(200) NOT NULL,
   Id_projects INT NOT NULL,
   PRIMARY KEY(Id_projects_todo),
   FOREIGN KEY(Id_projects) REFERENCES projects(Id_projects)
);

CREATE TABLE work_time(
   Id_work_time INT AUTO_INCREMENT,
   activity_date DATETIME NOT NULL,
   length DECIMAL(7,0) NOT NULL,
   description VARCHAR(300) NOT NULL,
   Id_projects INT NOT NULL,
   PRIMARY KEY(Id_work_time),
   FOREIGN KEY(Id_projects) REFERENCES projects(Id_projects)
);

INSERT INTO user_data (nickname, mail, password_hashed, hourly_rate) 
VALUES ('Shadowmere', 'abcdef@gmail.com', '$2b$10$S1J1QV6ab5LJ3DGLweJyseFGUbfFkCx6xlJTKWCTH5NTZBDfYL9XK', 13.20);

SET @last_user_data_id = LAST_INSERT_ID();

INSERT INTO projects (name, description, color, monetized, Id_user_data) 
VALUES ('worklock', 'Un projet destiné à mesurer son temps de travail', 'ffff00', true, @last_user_data_id);

SET @last_projects_id = LAST_INSERT_ID();

INSERT INTO projects_todo (task, Id_projects) 
VALUES ('Commencer ce projet', @last_projects_id);

INSERT INTO work_time (activity_date, length, description, Id_projects) 
VALUES ('2024-01-08 16:00:00', 7200, 'Work on Worklock', @last_projects_id);