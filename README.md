# Employee Management Application

This repository contains an employee management application, allowing users to perform various operations related to employee management. Below are the instructions for running the application:

## Prerequisites

- Visual Studio or any other compatible IDE.
- .NET Core SDK.
- Node.js and npm installed on your system.

## Installation Steps

1. **Clone the Repository**: Clone this repository to your local machine.

```bash
git clone https://github.com/ruth7873/EmployeeApplication.git
```

2. **Database Setup**: Open the solution in Visual Studio. In the Package Manager Console, run the following command to update the database:

```bash
update-database
```

3. **Run the Server**: After updating the database, run the server.

4. **Run the Client**: Download the client-side code and run it.

## Usage

- To access the application, users need to authenticate with a username and password. Only users with the admin password can register new users on the site. The admin password is `123456`.
- The application displays a table of all employees, allowing users to navigate between rows.
- For each employee, users can edit their details, view employee details, and delete them from the company (change status to inactive).
- Users can also add new employees and export the list of all employees to an Excel file.
- Additionally, users can perform a search on the table by name, surname, etc., and filter by gender (male or female).
- Each employee has a list of roles they perform, with each role having an entry date. Admins can add roles and choose whether they are managerial roles or not.

## Notes

- Make sure to follow the installation steps correctly to ensure smooth running of the application.
- For any issues or inquiries, feel free to contact the repository owner.

Enjoy using the application!
