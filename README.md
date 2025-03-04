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
 - Atomic commits
 - Git messages based on Conventional Commits spec 

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
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/a0179fe9-c9c0-4c39-9bfc-e3411a8f5ef0" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/a9558f8b-3fc2-4656-963b-009270e4d4b1" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/ffab3c93-17ff-46d6-9c2a-6750a751b528" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/8f3a8349-9be8-4487-b3fe-dbb4f9a18a76" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/d15f129d-0291-4419-804f-9b3d60a041de" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/b24fd315-e77d-4386-b78a-e6b5bfadf691" />
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/81de4abf-8278-4dbd-9a49-8dbbe5d72c3d" />
<img width="920" alt="image" src="https://github.com/user-attachments/assets/d31d48a3-d3dc-4cc1-834a-ae01f1a9d3ca" />
<img width="861" alt="image" src="https://github.com/user-attachments/assets/56dc5b2c-44e6-4f1b-a32f-792ce0897ecd" />
<img width="699" alt="image" src="https://github.com/user-attachments/assets/3400aa17-e24c-4a0b-aed9-a3733179145a" />
<img width="495" alt="image" src="https://github.com/user-attachments/assets/b80b6bcd-5d26-42fb-b44b-e8cec3c6cf96" />
<img width="1436" alt="image" src="https://github.com/user-attachments/assets/6c3f6878-2901-4e7d-8d44-9275f429ca4b" />
<img width="1436" alt="image" src="https://github.com/user-attachments/assets/46f4957e-b83c-46e0-a2c8-c7afff571c50" />



