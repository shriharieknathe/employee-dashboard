# Employee Dashboard

A React dashboard built with AG Grid for displaying and managing employee data.

## Features

- **AG Grid Integration** - Sorting, filtering, and pagination
- **Quick Search** - Filter across all columns
- **CSV Export** - Download employee data
- **Summary Stats** - Employee count, avg salary, avg rating, etc.
- **Custom Cell Renderers** - Rating bars, status badges, skill tags
- **Responsive Design** - Works on desktop and mobile

## Tech Stack

- React 19
- AG Grid Community 35
- Vite

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx    # Main dashboard component
│   └── Dashboard.css    # Styles
├── data/
│   └── employeeData.js  # Sample dataset (20 employees)
├── App.jsx
└── main.jsx
```

## Dataset

The dashboard displays 20 employee records with the following fields:
- Name, Email, Department, Position
- Salary, Location, Age
- Performance Rating, Projects Completed
- Hire Date, Status, Skills, Manager
