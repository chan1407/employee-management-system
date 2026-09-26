\# Employee Management System



A full-stack \*\*Employee Management System\*\* built using \*\*Spring Boot, Spring Security, JWT, MySQL, React, and Vite\*\*.



This application allows an administrator to securely log in and manage employee records through a web-based dashboard.



\---



\## Features



\### Authentication



\* Admin login

\* JWT-based authentication

\* BCrypt password encryption

\* Protected routes

\* Logout functionality



\### Employee Management



\* Add employee

\* View employee details

\* Edit employee information

\* Delete employee

\* Search employees

\* Filter employees by department

\* Client-side pagination



\### Dashboard



\* Admin dashboard

\* Employee management interface

\* Sidebar navigation

\* Navbar

\* Responsive user interface

\* Loading and error handling

\* Delete confirmation modal



\---



\## Technology Stack



\### Backend



\* Java

\* Spring Boot

\* Spring Web

\* Spring Data JPA

\* Spring Security

\* JWT

\* BCrypt

\* Maven



\### Frontend



\* React

\* Vite

\* JavaScript

\* HTML

\* CSS

\* React Router

\* Axios



\### Database



\* MySQL



\---



\## Project Structure



```text

employee-management-system/

│

├── backend/

│   ├── src/

│   │   ├── main/

│   │   │   ├── java/

│   │   │   │   └── ...

│   │   │   │

│   │   │   └── resources/

│   │   │       ├── application.properties

│   │   │       └── application.example.properties

│   │   │

│   │   └── test/

│   │

│   └── pom.xml

│

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── services/

│   │   ├── context/

│   │   └── ...

│   │

│   ├── package.json

│   └── vite.config.js

│

├── .gitignore

└── README.md

```



\---



\## Employee Fields



Each employee record contains:



\* ID

\* Name

\* Email

\* Phone

\* Department

\* Role

\* Joining Date

\* Salary

\* Address



\---



\## API Endpoints



\### Authentication



```text

POST /api/auth/login

```



\### Employee APIs



```text

GET    /api/employees

GET    /api/employees/{id}

POST   /api/employees

PUT    /api/employees/{id}

DELETE /api/employees/{id}

```



\---



\## Prerequisites



Make sure the following software is installed on your system:



\* Java 17 or later

\* Maven

\* Node.js

\* npm

\* MySQL



\---



\## Database Configuration



The application uses MySQL as the database.



The database configuration is located at:



```text

backend/src/main/resources/application.properties

```



Example:



```properties

spring.datasource.url=jdbc:mysql://localhost:3306/employee\_management?createDatabaseIfNotExist=true\&useSSL=false\&allowPublicKeyRetrieval=true\&serverTimezone=UTC

spring.datasource.username=YOUR\_DB\_USERNAME

spring.datasource.password=YOUR\_DB\_PASSWORD

```



The application is configured to create the `employee\_management` database automatically when the database does not already exist.



Make sure your MySQL server is running before starting the backend.



\---



\## Application Configuration



A template configuration file is provided:



```text

backend/src/main/resources/application.example.properties

```



Before running the application, update the placeholder/default values with your own local configuration.



For example:



```properties

spring.datasource.username=YOUR\_DB\_USERNAME

spring.datasource.password=YOUR\_DB\_PASSWORD



app.jwt.secret=YOUR\_JWT\_SECRET



app.admin.default-email=admin@company.com

app.admin.default-password=YOUR\_ADMIN\_PASSWORD



cors.allowed-origin=http://localhost:5174

```



\### Values that need to be changed



Update the following values according to your local environment:



\* MySQL username

\* MySQL password

\* JWT secret

\* Default admin password

\* Frontend URL, if required



The `application.example.properties` file is only a \*\*template\*\*.



Use your own actual configuration values in your local:



```text

backend/src/main/resources/application.properties

```



\### Important



Do \*\*not\*\* commit `application.properties` to GitHub because it may contain:



\* Database passwords

\* JWT secrets

\* Admin credentials

\* Other environment-specific configuration



The actual `application.properties` file is excluded using `.gitignore`.



\---



\## Backend Setup



Open a terminal and navigate to the backend directory:



```bash

cd backend

```



Run the Spring Boot application:



```bash

mvn spring-boot:run

```



The backend runs on:



```text

http://localhost:8080

```



If the application starts successfully, you should see a message similar to:



```text

Tomcat started on port 8080

Started EmsApplication

```



\---



\## Frontend Setup



Open another terminal and navigate to the frontend directory:



```bash

cd frontend

```



Install the dependencies:



```bash

npm install

```



Start the React development server:



```bash

npm run dev

```



Vite will display the frontend URL in the terminal.



For example:



```text

http://localhost:5174

```



\---



\## Default Admin Login



When the backend starts for the first time, a default administrator account can be created automatically.



Default configuration:



```text

Email:    admin@company.com

Password: Admin@123

```



The default credentials can be configured through:



```text

app.admin.default-email

app.admin.default-password

```



For security, change the default password before using the application in a production environment.



\---



\## Application Flow



```text

Admin

&#x20; │

&#x20; ▼

Login

&#x20; │

&#x20; ▼

JWT Authentication

&#x20; │

&#x20; ▼

Dashboard

&#x20; │

&#x20; ├── Employee List

&#x20; │      ├── Search

&#x20; │      ├── Department Filter

&#x20; │      └── Pagination

&#x20; │

&#x20; ├── Add Employee

&#x20; │

&#x20; ├── View Employee

&#x20; │

&#x20; ├── Edit Employee

&#x20; │

&#x20; └── Delete Employee

&#x20; │

&#x20; ▼

Logout

```



\---



\## Security



The application uses:



\* Spring Security for authentication and authorization

\* JWT for stateless authentication

\* BCrypt for password hashing

\* Protected employee APIs

\* CORS configuration for frontend-backend communication



Sensitive configuration is excluded from version control.



Never commit real:



\* Database passwords

\* JWT secrets

\* Production credentials

\* API keys



\---



\## Running the Application



Start the backend first:



```bash

cd backend

mvn spring-boot:run

```



Then start the frontend in a separate terminal:



```bash

cd frontend

npm install

npm run dev

```



Open the frontend URL provided by Vite.



\---



\## Testing the Application



After starting both backend and frontend, test the following flow:



```text

1\. Open the frontend

2\. Login as Admin

3\. Open Dashboard

4\. Open Employees

5\. Add a new employee

6\. View employee details

7\. Edit employee information

8\. Search employees

9\. Filter employees by department

10\. Delete an employee

11\. Logout

```



\---



\## CORS Configuration



The backend is configured to allow communication between the React frontend and Spring Boot backend.



During local development, the frontend may run on a Vite port such as:



```text

http://localhost:5174

```



The backend runs on:



```text

http://localhost:8080

```



Make sure the configured frontend origin matches the URL used by the frontend.



\---



\## Development Ports



| Application           |   Port |

| --------------------- | -----: |

| Spring Boot Backend   | `8080` |

| React / Vite Frontend | `5174` |

| MySQL                 | `3306` |



The Vite development server may use another available port if `5174` is already occupied.



\---



\## Future Improvements



Possible future enhancements include:



\* Role-based access control

\* Server-side pagination

\* Employee profile images

\* Advanced reporting

\* Export employee data

\* Email notifications

\* Production deployment

\* Improved dashboard analytics



\---



\## Important Notes



\* Employees are managed as records by the Admin.

\* Employees do not have separate login accounts.

\* The Admin is responsible for employee CRUD operations.

\* MySQL must be running before starting the backend.

\* `application.properties` should remain local and should not be committed to GitHub.

\* Use `application.example.properties` as a configuration template.



\---



\## License



This project is intended for educational, learning, and portfolio purposes.



