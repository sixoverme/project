# Project Development Guidance

## Project Overview
This project is a modern TypeScript/React application focused on creating a robust and maintainable codebase. We're implementing a structured approach to development with clear interfaces, mock data, and services.

## Project Structure
```
project/
├── src/
│   ├── interfaces/    # TypeScript interfaces
│   ├── data/         # Mock data files
│   ├── services/     # Data services
│   ├── components/   # React components
│   └── utils/        # Utility functions
├── tests/           # Test files
└── config/          # Configuration files
```

## Development Guidelines

### 1. Code Organization
- Keep interfaces in `src/interfaces/`
- Store mock data in `src/data/`
- Implement services in `src/services/`
- Follow TypeScript best practices
- Use meaningful variable and function names
- Document complex logic with comments

### 2. Layout Structure
- App uses a fixed three-part layout:
  - Fixed header at top
  - Scrollable main content area
  - Fixed navigation bar at bottom
- Layout implementation:
  - Root container uses `h-screen` with `flex-col` for precise viewport control
  - Header and nav use `flex-none` to maintain fixed size
  - Main content uses `flex-1` with `overflow-y-auto` for contained scrolling
  - Content scrollbar is isolated to prevent layout shifts
- All layout changes must maintain this structure to ensure consistent UX

### 3. Branding and Colors
- Company name "J&S" represents Juniper and Sage
- Primary color palette:
  - Sage/Juniper Green: `#526D4E` (Used in header and navigation)
  - Darker Green: `#455B41` (Used for borders)
  - Text colors:
    - Primary text on dark: `text-white`
    - Secondary text on dark: `text-gray-200`
- Color usage:
  - Header background: Sage Green
  - Navigation background: Sage Green
  - Active navigation items: White
  - Inactive navigation items: Light gray

### 4. Git Workflow
- Create feature branches for new features
- Use meaningful commit messages
- Keep commits focused and atomic
- Review code before merging

### 5. Testing
- Write unit tests for new functionality
- Test edge cases
- Ensure tests pass before committing

## Current Tasks and Progress

### Phase 1: Data Layer Implementation
- [x] **1.1 Refactor Mock Data:**
  - [x] Create separate data files in `src/data/` for clients, jobs, invoices, and inventory
  - [x] Define TypeScript interfaces in `src/interfaces/` folder
  - [x] Update components to use data from `src/data/` files

- [x] **1.2 Implement Basic Data Operations:**
  - [x] Create data services in `src/services/`
  - [x] Implement CRUD functions for Clients
  - [x] Implement CRUD functions for Jobs
  - [x] Implement CRUD functions for Invoices
  - [x] Implement CRUD functions for Inventory

### Phase 2: UI Components
- [ ] **2.1 Component Architecture:**
  - [x] Design component hierarchy
  - [x] Create reusable base components
  - [ ] Implement layout components
    - [ ] Review and fix data flow in each view
    - [x] Dashboard view
      - [x] Quick Overview Panel
        - [x] Visible on initial login
        - [x] Dismissible with persistence until next login
      - [x] Financial Overview Cards
        - [x] Money Made This Week
          - [x] Sum of jobs before today in current week
          - [x] Progress bar for paid/unpaid customers
          - [x] Format: "$X [Progress Bar] paid/total"
        - [x] Money Made Today
          - [x] Total potential earnings for today
          - [x] Progress bar for paid/unpaid customers
          - [x] Updates with payment status
        - [x] Potential Earnings This Week
          - [x] Total potential earnings for current week
          - [x] Progress bar for paid/total customers
      - [x] Jobs Cards
        - [x] Link to job details (not customer details)
        - [x] Display today's scheduled jobs
        - [x] Show relevant job information
      - [x] Inventory Alerts
        - [x] Link to individual inventory item pages
        - [x] Show items needing attention
        - [x] Display alert reason and status
        - [x] Use consistent inventory cards for alerts
    - [ ] Clients view
      - [x] Client List Component
        - [x] Searchable client list with filtering
        - [x] Client card component with key information
        - [x] Quick action buttons (call, message, schedule)
        - [x] Sort options (name, recent, status)
      - [x] Client Details Component
        - [x] Contact information section
        - [x] Job history with status
        - [x] Payment history and outstanding balance
        - [x] Notes and special requirements
        - [x] Related inventory items
      - [x] Client Management Features
        - [x] Add new client form
        - [x] Edit client information
        - [ ] Archive/delete client
        - [ ] Export client data
        - Implementation Details:
          - Reusable ClientForm component for both add and edit operations
          - Real-time validation with error messages
          - Auto-formatting for phone numbers
          - Conditional fields (secondary address, home phone)
          - Pet information section with dynamic entries
          - State management through App.tsx using PageState
          - Integration with clientService for CRUD operations

#### Client Form Implementation
1. **Component Structure**
   ```typescript
   interface ClientFormProps {
     initialData?: Client;  // Present for edit mode, undefined for add mode
     onSubmit: (data: ClientFormData) => Promise<void>;
     onCancel: () => void;
   }
   ```

2. **State Management**
   - Uses PageState in App.tsx for navigation:
     ```typescript
     type Page = 'dashboard' | 'clients' | ... | 'add-client' | 'edit-client';
     interface PageState {
       type: Page;
       clientId?: string;  // Used for edit mode
     }
     ```
   - Handles form state locally with validation

3. **Validation and Formatting**
   - Real-time field validation
   - Phone number auto-formatting to (XXX) XXX-XXXX
   - Required fields:
     - Client name
     - Primary address
     - Mobile phone
     - Email

4. **UI/UX Patterns**
   - Two-column layout matching detail view
   - Sage-green theme for primary actions
   - Consistent spacing and padding
   - Clear error messages below fields
   - Proper loading and error states

#### Next Steps
- [ ] Implement toast notifications for success/error feedback
- [ ] Add client data refresh after successful operations
- [ ] Implement archive/delete functionality
- [ ] Add export client data feature
- [ ] Add confirmation dialogs for destructive actions

### Phase 3: Integration and Testing
- [ ] **3.1 Integration:**
  - [ ] Connect components with services
  - [ ] Implement error handling
  - [ ] Add loading states

- [ ] **3.2 Testing:**
  - [ ] Write unit tests
  - [ ] Add integration tests
  - [ ] Perform end-to-end testing

## Next Steps
1. ~~Complete the mock data implementation~~ ✅ Done
2. ~~Create data services with CRUD operations~~ ✅ Done
3. Begin implementing UI components:
   - Start with base components (buttons, inputs, cards)
   - Create layout components (header, sidebar, main content)
   - Implement feature-specific components using our data services

## Notes
- Keep this file updated as development progresses
- Mark completed tasks with [x]
- Add new tasks as they are identified
- Document important decisions and their rationale
