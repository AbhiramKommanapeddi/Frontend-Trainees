# CNAPP Dynamic Dashboard - Frontend Trainees Assignment

A dynamic, responsive Cloud Security & Compliance (CNAPP) dashboard built with **React**, **Vite**, and **Redux Toolkit**.

## 🚀 Key Features

1. **Dynamic JSON Configuration**: Categories and widgets are dynamically generated from a JSON specification.
2. **Category Management**: Organized into categories (e.g., *CSPM Executive Dashboard*, *CWPP Dashboard:*, *Registry Scan*, *Ticket Dashboard*).
3. **Dynamic Widget Addition & Removal**:
   - Add new custom widgets with customizable name, description/text, and visual representation (Text, Donut Chart, Stacked Progress Bar).
   - Remove widgets with a single click using the cross icon (`×`) on each card.
   - Bulk manage visibility using the slide-in **Add Widget Drawer** with checkboxes.
4. **Interactive Visualizations**:
   - SVG Donut Charts with center totals and color-coded legends.
   - Horizontal Stacked Progress Bar for risk/vulnerability breakdowns.
   - Empty state placeholders for categories without data.
5. **Real-time Global Search**:
   - Instant search across all widgets and categories with keyword highlighting.
   - Dynamic match count and quick clear filter.
6. **State Persistence**:
   - Powered by **Redux Toolkit** (`@reduxjs/toolkit` and `react-redux`).
   - Automatically persists changes locally in `localStorage`.
   - Includes JSON export and reset-to-default functionality.

---

## 🛠️ Tech Stack

- **Framework**: React 18+ (Vite)
- **State Management**: Redux Toolkit & React-Redux
- **Styling**: Modern Vanilla CSS (Design system with CSS variables)
- **Icons**: Lucide React

---

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/         # Modular UI components
│   │   ├── Navbar.jsx              # Header, breadcrumbs & search bar
│   │   ├── DashboardHeader.jsx     # Action buttons, refresh, time filter
│   │   ├── CategorySection.jsx     # Category rows & grid layout
│   │   ├── WidgetCard.jsx          # Widget card with remove cross icon
│   │   ├── AddWidgetCard.jsx       # "+ Add Widget" card placeholder
│   │   ├── AddWidgetDrawer.jsx     # Side drawer with category tabs & checkboxes
│   │   ├── AddCategoryModal.jsx    # Modal dialog to create new categories
│   │   ├── DonutChart.jsx          # SVG Donut chart component
│   │   ├── StackedBar.jsx          # Horizontal stacked progress bar
│   │   ├── EmptyGraph.jsx          # Vector graph empty state
│   │   ├── TextWidget.jsx          # Custom text and metric widget card
│   │   └── Toast.jsx               # Feedback notifications with Undo
│   ├── data/
│   │   └── dashboardData.json      # Initial JSON configuration
│   ├── store/
│   │   ├── dashboardSlice.js       # Redux Toolkit slice with actions & persistence
│   │   └── store.js                # Redux store
│   ├── App.jsx                     # Root application
│   ├── App.css                     # Component styles
│   ├── index.css                   # Global styles & design tokens
│   └── main.jsx                    # Application entry point
├── index.html              # HTML template
├── package.json            # Project dependencies & scripts
├── vite.config.js          # Vite configuration
└── .gitignore              # Files ignored by git
```

---

## 💻 Getting Started

### 1. Clone & Install
```bash
git clone <your-repository-url>
cd <repository-directory>
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
