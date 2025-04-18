# Bank Management API

A modular and type-safe RESTful backend system built with **Node.js** and **TypeScript**, designed for managing banker-customer relationships and simulating core banking transactions.

## Overview

This API simulates a simple banking system that allows:
- Creating and managing **customers** and **bankers**
- Handling **transactions** such as **deposit**, **withdraw**, and **balance tracking**
- Linking **bankers to customers**
- Using **PostgreSQL** with **TypeORM** and OOP architecture for clarity and maintainability

Built entirely with real-world backend architecture principles including:
- MVC pattern  
- Service + Repository structure  
- OOP with class-based modules  
- Database abstraction via abstract class

---

## Tech Stack

- **Node.js** + **Express** – Server framework
- **TypeScript** – Strongly typed JS superset
- **PostgreSQL** – Relational database
- **TypeORM** – ORM for data modeling and schema sync
- **OOP Principles** – `class`, `abstract class`, inheritance
- **dotenv** – Environment config loader

## Features

- Create & manage **bankers** and **customers**
- Record **transactions**: deposit, withdraw
- Assign **bankers to customers**
- Query customers by balance range
- OOP: Modularized using `class` and `abstract class`
- Type-safe development with TypeScript
- TypeORM auto-schema sync and relation mapping

##  Entity Relationships

- `Banker` ➜ can manage many `Customers`
- `Customer` ➜ can have many `Transactions`
- `Transaction` ➜ belongs to one `Customer`

## API Endpoints

### Customer

| Method | Endpoint                                 | Description                            |
|--------|------------------------------------------|----------------------------------------|
| GET    | `/api/customer`                          | 查詢所有客戶的名字與帳戶餘額（含篩選）  |
| POST   | `/api/customer`                          | 建立客戶資料                            |
| DELETE | `/api/customer/:customerId`              | 刪除指定客戶                            |
| POST   | `/api/customer/:customerId/transaction`  | 建立交易紀錄（存款 / 提款）             |

### Banker

| Method | Endpoint        | Description        |
|--------|-----------------|--------------------|
| GET    | `/api/bankers`  | 查詢所有銀行員     |
| POST   | `/api/bankers`  | 建立銀行員資料     |

### Transaction / Assignment

| Method | Endpoint                                           | Description                           |
|--------|----------------------------------------------------|---------------------------------------|
| GET    | `/api/transaction`                                 | 查詢所有交易（佔位路由）               |
| PUT    | `/api/banker/:bankId/customer/:customerId`         | 指派銀行員給客戶                     |


