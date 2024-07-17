CREATE DATABASE out_of_office_app;
use out_of_office_app;

CREATE TABLE Employees (
    ID INT AUTO_INCREMENT NOT NULL,
    FullName TEXT NOT NULL,
    Subdivision VARCHAR(255) NOT NULL,
    Position VARCHAR(255) NOT NULL,
    Status ENUM('active', 'inactive') DEFAULT 'active' NOT NULL,
    People_Partner INT NOT NULL,
    Leave_Balance INT NOT NULL,
    Photo BLOB,
    PRIMARY KEY (ID)
    /*FOREIGN KEY (People_Partner) REFERENCES employees(Position)*/
);

CREATE TABLE LeaveRequest (
    ID INT AUTO_INCREMENT NOT NULL,
    Employee INT NOT NULL,
    AbsenceReason ENUM('Vacation', 'Sick Leave', 'Personal', 'Other') NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Comment TEXT,
    Status ENUM('Submitted', 'Approved', 'Rejected', 'Canceled') DEFAULT 'Submitted',
    PRIMARY KEY (ID),
    FOREIGN KEY (Employee) REFERENCES Employees(ID)
);

CREATE TABLE ApprovalRequest (
    ID INT AUTO_INCREMENT NOT NULL,
    Approver INT NOT NULL,
    LeaveRequest INT NOT NULL,
    Status ENUM('New', 'Approved', 'Rejected', 'Canceled') DEFAULT 'New',
    Comment TEXT,
    PRIMARY KEY (ID),
    FOREIGN KEY (LeaveRequest) REFERENCES LeaveRequest(ID)
);

CREATE TABLE Project (
    ID INT AUTO_INCREMENT NOT NULL,
    ProjectType VARCHAR(255) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE,
    ProjectManager INT NOT NULL,
    Comment TEXT,
    Status ENUM('active', 'inactive') DEFAULT 'active' NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (ProjectManager) REFERENCES Employees(ID)
);