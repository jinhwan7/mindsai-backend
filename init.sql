-- init.sql

CREATE DATABASE IF NOT EXISTS mindsai_db;
USE mindsai_db;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uniqueName VARCHAR(255) NOT NULL UNIQUE,
    nickName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    refreshToken VARCHAR(255)
);

INSERT INTO user (uniqueName, nickName, password) VALUES
('test1', 'hahahah','$2a$10$HkK2wZyfzSgq2I11cS4B9ea6YDJGlhfTPqYtAEGEzlHqB44kCGBcO'),
('test2', 'gagaga','$2a$10$AHYOqqp3BdLeHwuR3CwAFueVefRImUW4Qh0IGlBo5p4BUasOmDY7S'),
('test3', 'gugugugu','$2a$10$qbuo1VflYwguRW./CcPUdeWSrQ5uIXCRzjgorbnpQkdoKkrElM7Zm');
