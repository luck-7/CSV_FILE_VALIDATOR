# CSV_FILE_VALIDATOR





## 🌟 Features

- 📁 **File Upload**: Intuitive drag-and-drop or file picker interface
- ✅ **Real-time Validation**: Instant validation of Name and DateOfBirth fields
- 📋 **Detailed Error Reporting**: Row-wise error messages with specific validation failures
- 🎨 **Responsive UI**: Modern Bootstrap-styled interface that works on all devices
- 🔄 **CORS Enabled**: Seamless frontend-backend communication
- 🚀 **Fast Processing**: Efficient CSV parsing with OpenCSV library

## 📋 Validation Rules

| Field | Rules |
|-------|-------|
| **Name** | • Must not be empty<br>• Cannot contain only whitespace |
| **DateOfBirth** | • Must not be empty<br>• Must match format `yyyy-MM-dd` (e.g., 1990-05-15)<br>• Must be a valid date |

## 🛠️ Tech Stack

### 🔧 Backend
- **Spring Boot 3.2.0** - Main framework
- **OpenCSV 5.8** - CSV parsing library
- **Maven** - Dependency management
- **Java 17** - Programming language

### 🎨 Frontend
- **React 18** - UI framework
- **Bootstrap 5 + React Bootstrap** - Styling and components
- **Axios** - HTTP client for API calls
- **Functional Components + Hooks** - Modern React patterns

## 📂 Project Structure

```
CSV_FILE_VALIDATOR/
├── 🔧 backend/                    # Spring Boot Application
│   ├── src/main/java/com/csvvalidator/
│   │   ├── 🚀 CsvValidatorApplication.java
│   │   ├── 🎮 controller/
│   │   │   └── FileUploadController.java
│   │   ├── ⚙️ service/
│   │   │   └── CsvValidationService.java
│   │   └── 📦 model/
│   │       ├── ValidationError.java
│   │       └── ValidationResponse.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── 🎨 frontend/                   # React Application
│   ├── src/
│   │   ├── 🧩 components/
│   │   │   ├── FileUpload.js
│   │   │   └── ErrorDisplay.js
│   │   ├── 🌐 services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
├── 📄 sample-data.csv             # Test CSV file with various scenarios
└── 📖 README.md
```

## 🚀 Quick Start

### 📋 Prerequisites
- ☕ **Java 17** or higher
- 📦 **Node.js 16** or higher
- 🔨 **Maven 3.6** or higher
- 🌐 **Git** (for cloning)

### 📥 Clone Repository
```bash
git clone https://github.com/luck-7/CSV_FILE_VALIDATOR.git
cd CSV_FILE_VALIDATOR
```

## 🔧 Backend Setup

### 1️⃣ Navigate to Backend Directory
```bash
cd backend
```

### 2️⃣ Install Dependencies & Run
```bash
# Install dependencies and compile
mvn clean install

# Start the Spring Boot application
mvn spring-boot:run
```

### 3️⃣ Verify Backend is Running
- ✅ Backend will start on `http://localhost:8080`
- 🔍 Check console for "Started CsvValidatorApplication" message
- 🌐 API endpoint available at `http://localhost:8080/upload`

## 🎨 Frontend Setup

### 1️⃣ Navigate to Frontend Directory
```bash
cd frontend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start Development Server
```bash
npm start
```

### 4️⃣ Access Application
- ✅ Frontend will start on `http://localhost:3000`
- 🌐 Application will automatically open in your default browser
- 🔄 Hot reload enabled for development

## 📝 API Documentation

### 📤 POST /upload

Uploads and validates a CSV file with detailed error reporting.

**📋 Request:**
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Body:** Form data with `file` parameter (CSV file)

**📋 Response:**
```json
{
  "status": "success" | "error",
  "errors": [
    {
      "row": 3,
      "message": "Invalid date format. Expected yyyy-MM-dd"
    },
    {
      "row": 5,
      "message": "Name must not be empty"
    }
  ]
}
```

**📋 Response Status Codes:**
- `200 OK` - File processed successfully (may contain validation errors)
- `400 Bad Request` - Invalid file or request format
- `500 Internal Server Error` - Server processing error

## 🧪 Testing the Application

### 📄 Using Sample Data
The repository includes `sample-data.csv` with various test scenarios:

```csv
Name,DateOfBirth
John Doe,1990-05-15          ✅ Valid entry
Jane Smith,1985-07-20        ✅ Valid entry
Alex Johnson,1994/03/30      ❌ Invalid date format
Chris Lee,30-04-1991         ❌ Invalid date format
Emily Clark,1995.11.22       ❌ Invalid date format
Tom Brown,22-Aug-1993        ❌ Invalid date format
Samantha Wright,19980817     ❌ Invalid date format
Peter Miles,1993-02-30       ❌ Invalid date (Feb 30th doesn't exist)
Lucy Evans,not-a-date        ❌ Invalid date format
Mark Taylor,                 ❌ Empty date
,1990-01-01                  ❌ Empty name
,                            ❌ Empty name and date
```

### 🔍 Test Scenarios
1. **✅ Valid Data**: Upload rows with correct format
2. **❌ Invalid Dates**: Test various incorrect date formats
3. **❌ Empty Fields**: Test missing names or dates
4. **❌ Invalid Dates**: Test impossible dates (like Feb 30th)

## ⚙️ Configuration

### 🔧 Backend Configuration (`application.properties`)
```properties
# Server Configuration
server.port=8080

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# CORS Configuration (handled in code)
# Allows frontend (localhost:3000) to connect
```

### 🎨 Frontend Configuration (`package.json`)
```json
{
  "proxy": "http://localhost:8080",
  "dependencies": {
    "react": "^18.2.0",
    "bootstrap": "^5.3.0",
    "axios": "^1.6.0"
  }
}
```

## 🚀 Production Deployment

### 🔧 Backend Deployment
```bash
# Navigate to backend directory
cd backend

# Create production JAR
mvn clean package -DskipTests

# Run the JAR file
java -jar target/csv-validator-backend-0.0.1-SNAPSHOT.jar

# Or with custom port
java -jar -Dserver.port=8080 target/csv-validator-backend-0.0.1-SNAPSHOT.jar
```

### 🎨 Frontend Deployment
```bash
# Navigate to frontend directory
cd frontend

# Create production build
npm run build





## 🔧 Troubleshooting

### ❌ Common Issues

#### Backend Issues
| Problem | Solution |
|---------|----------|
| **Port 8080 already in use** | Change port in `application.properties` or kill process using port |
| **Java version error** | Ensure Java 17+ is installed and set as JAVA_HOME |
| **Maven build fails** | Run `mvn clean install -U` to force update dependencies |

#### Frontend Issues
| Problem | Solution |
|---------|----------|
| **npm install fails** | Delete `node_modules` and `package-lock.json`, then run `npm install` |
| **Port 3000 already in use** | Kill process or use different port with `PORT=3001 npm start` |
| **API calls fail** | Ensure backend is running on port 8080 |

#### CORS Issues
| Problem | Solution |
|---------|----------|
| **CORS errors in browser** | Verify backend CORS configuration allows `http://localhost:3000` |
| **API not accessible** | Check if both frontend and backend are running |

## 📊 Application Screenshots

### 🏠 Main Interface
- Clean, intuitive file upload interface
- Bootstrap-styled components
- Responsive design for all screen sizes

### ✅ Success State
- Green success message for valid CSV files
- Clear confirmation of successful validation

### ❌ Error State
- Detailed error table showing row numbers and specific issues
- Color-coded error messages for easy identification
- Helpful format hints for users

## 🧪 Advanced Testing

### 📝 Creating Custom Test Files

Create your own CSV files to test specific scenarios:

```csv
Name,DateOfBirth
Valid User,1990-01-01
,1990-01-01
Invalid User,1990/01/01
Another User,not-a-date
Empty Date User,
```

### 🔍 Edge Cases to Test
- Very large CSV files (up to 10MB limit)
- CSV files with different encodings
- Files with extra columns
- Files without headers
- Empty CSV files

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 1️⃣ Fork the Repository
```bash
git fork https://github.com/luck-7/CSV_FILE_VALIDATOR.git
```

### 2️⃣ Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3️⃣ Make Your Changes
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 4️⃣ Commit Your Changes
```bash
git commit -m "Add: your feature description"
```

### 5️⃣ Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

## 📈 Future Enhancements

- [ ] **Multiple File Upload**: Support uploading multiple CSV files at once
- [ ] **Custom Validation Rules**: Allow users to define custom validation rules
- [ ] **Export Results**: Download validation results as PDF or Excel
- [ ] **File History**: Keep track of previously uploaded files
- [ ] **Advanced Date Formats**: Support multiple date formats
- [ ] **User Authentication**: Add user accounts and file management
- [ ] **Database Integration**: Store validation results in database
- [ ] **Email Notifications**: Send validation results via email

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**luck-7** - [GitHub Profile](https://github.com/luck-7)


## 👨‍💻 Result with correct and incorrect csv

## incorrect 

<img width="892" height="673" alt="Screenshot 2025-08-03 182139" src="https://github.com/user-attachments/assets/c6764da6-fbeb-4d4f-b0b0-e6c296f6f7ca" />





## correct 
<img width="827" height="526" alt="Screenshot 2025-08-03 182255" src="https://github.com/user-attachments/assets/5069902d-e63e-4655-b972-ee876d2b0530" />





---

