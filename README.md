

# React Spreadsheet Component

## Overview
The React Spreadsheet component allows you to manage and interact with tabular data. It includes features like CRUD operations, undo/redo functionality, copy/paste cells, and more.

## Features
- Display and edit tabular data.
- CRUD operations (Create, Read, Update, Delete).
- Undo/redo functionality for data changes.
- Copy and paste cells within the spreadsheet.

## Technologies Used
- React
- axios (for API requests)
- react-table (for table management)

## Getting Started
To use the Spreadsheet component in your project, follow these steps:

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Configuration
Ensure your backend API is running and update the API endpoints in `Spreadsheet.js`:
```javascript
const API_URL = 'https://your-backend-url/data';
// Update API endpoints in fetchData, saveData, handleCreate, handleUpdate, handleDelete
```

### Running the Application
Start the development server:
```
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Usage
- Interact with the spreadsheet by editing cells.
- Use the buttons to save data, create new rows, update existing rows, and delete rows.
- Keyboard shortcuts (`Ctrl + Z` for undo, `Ctrl + Y` for redo, `Ctrl + C` for copy, `Ctrl + V` for paste, `Delete` for clearing cell content) are supported.

## Known Issues
- No known issues at the moment.

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- React
- axios
- react-table

---


![image](https://github.com/somesh123-ctrl/sarg_frontend/assets/55444715/537f3f54-d131-456e-a7ba-b788e44a2da8)
![image](https://github.com/somesh123-ctrl/sarg_frontend/assets/55444715/d5f51ce2-9e17-4e0d-8950-69f1e4fd0c22)

