### 📝 Sympl Tasks
A simple and responsive task manager app built with React and TypeScript that allows users to create tasks, edit and delete them. It features field validations, Local Storage persistence, custom fields, filter, sort, bulk delete operation, 

### ✨ Features
Task Table:
 - Data Table component that displays all todos
 - Columns can be modified using the columnDef params passed to DataTable
 - Sorting/Filtering can be controled from ColumnDef
 - Cells with no data show empty state 

Task CRUD:
 - Add, Edit, Delete Todo options
 - Edit and Delete from each row in table
 - Validation checks on Add and Edit
 - Confirmation dialog on Delete

Filter and Sort:
 - Filter default field and custom fields
 - Filter and Sort works together
 - Supports all data types
 - Clean filter UI without cluttering the table view

 Pagination: 
    - Supports custom page size
    - Responsive pagination control

 Local Storage Persistence: 
    - All store data is persisted in localstorage using Zustand middleware

 Custom Fields:
    - Add custom fields
    - New custom fields add new column to table
    - Editing custom fields
    - Removing custom fields

 Animation/Transition:
    - Success toaster on success actions
    - Trasition effect on drawer and modals

 Multi Select Bulk:
    - Delete multiple tasks together
    - Check box on each row with select all checkbox in header

 Dark Mode:
    - All UI supports dark and light mode
    - Auto detects system theme settings

 Accessibility:
    - Keyboard navigation
    - Aria labels and Semantic HTML

Responsiveness
    - Responsive design that supports mobile devices

Commits:
    Atomic commits
    Git messages based on Conventional Commits spec 

### 🛠️ Tech Stack
- React + TypeScript: End-to-end type safety
- Vite: Fast and efficient build tool
- Chakra UI: Responsive and accessible design components
- Zustand: Lightweight state management
- Zod: Form schema validation

### ✅ To Be Done
- Kanban View
- Undo Redo
- Bulk Edit (delete done)
- Generate the filtering logic from column definition to make DataTable component truly resuable for any usecase

### 💻 Run the Application
````bash
npm install
npm run dev
````

### Screenshots


