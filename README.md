# CRM-Pro — Enterprise CRM System

A web-based Customer Relationship Management (CRM) application designed to help businesses manage leads and track their sales pipeline.

## 🎯 Objective

The objective of CRM-Pro is to provide a simple and user-friendly platform for managing business leads, tracking their progress through different sales stages, and monitoring overall pipeline value.

## ✨ Features

- 📊 Dashboard with sales statistics
- 👥 Add and manage leads
- 🏢 Store company and contact information
- 💰 Track deal values
- 🔄 Update lead status
- 🗑️ Delete leads
- 📈 Automatic pipeline calculations
- 💾 Persistent data using browser LocalStorage
- 📱 Responsive user interface

## 🔄 Sales Pipeline

Leads can be moved through the following stages:

**New → Contacted → Qualified → Won / Lost**

## 🛠️ Technology Stack

- React.js
- JavaScript
- CSS
- Vite
- Browser LocalStorage

## 📂 Project Structure

```text
enterprise-crm/
│
└── client/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    │
    ├── package.json
    └── vite.config.js