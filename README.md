# 💰 Finance Dashboard

A modern and responsive **Finance Dashboard** built to track financial activities, visualize spending patterns, and manage transactions with role-based UI (Admin & Viewer).

---

## 🚀 Features

### 📊 Dashboard Overview

* Total Balance, Income, and Expenses summary cards
* Balance trend visualization (Area Chart)
* Category-wise spending breakdown (Pie Chart)

---

### 💳 Transactions Management

* View all transactions with:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)
* 🔍 Search (Debounced)
* 🧩 Filter by:

  * Category
  * Date (Month-based)
* Sorting support

---

### 🔐 Role-Based UI

#### 👤 Viewer Mode

* Can **view data only**
* Access to:

  * Dashboard insights
  * Charts
  * Transaction list

#### 🛠️ Admin Mode

* Full control over data
* Can:

  * ➕ Add transactions
  * ✏️ Edit transactions
  * ❌ Delete transactions
* Form with prefilled data in edit mode

---

### 📈 Insights Section

* Highest spending category
* Monthly comparison
* Smart financial observations

---

## ⚙️ Tech Stack

* ⚛️ React (Hooks)
* 🎨 Tailwind CSS
* 📊 Recharts (Charts)
* 🧠 Context API (State Management)

---

## 🧠 State Management

Managed using **React Context API**

Stores:

* User role (Admin / Viewer)
* Transactions data
* Filters (search, category, date)
* Derived insights

---

## 🔍 Filtering Logic

Supports:

* Single filter
* Multiple filters (auto-applied)

✔ Dynamic filtering
✔ No toggle required

---

## 📁 Project Structure

```
src/
│── components/
│   ├── Dashboard/
│   ├── Transactions/
│   ├── Charts/
│   ├── Insights/
│   └── Add_Edit_Transaction/
│
│── context/
│   └── AppContext.js
│
│── hooks/
│   └── useDebounce.js
│
│── utils/
│   └── helpers.js
```

---

## 🧪 Key Functionalities

### 🔹 Add Transaction

* Controlled form
* Updates global state

### 🔹 Edit Transaction

* Prefills form
* Updates specific item using `map()`

### 🔹 Delete Transaction

* Removes item from list

---

## 📊 Chart Integration

* **Area Chart** → Balance trend
* **Pie Chart** → Category distribution
* Tooltip + hover interaction supported

---

## 📱 Responsive Design

* Fully responsive layout
* Works across:

  * Mobile
  * Tablet
  * Desktop

---


## 🧠 Key Learnings

* Efficient state handling with Context API
* Debounced search implementation
* Dynamic filtering (single + multiple)
* Data aggregation using `reduce()`
* Chart integration with Recharts

---

---

## 📌 Future Improvements

* Role-based authentication
* Backend integration
* Advanced analytics
* Budget tracking

---

## 👨‍💻 Author

Dharmendra Patel
