import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:8000/api",
});



// Users 
export const fetchUsers = (params) => API.get("/users/", { params });
export const createUser = (userData) => API.post("/users/", userData);
export const updateUser = (id, userData) => API.put(`/users/${id}/`, userData);
export const deleteUser = (id) => API.delete(`/users/${id}/`);


// Products
export const fetchProducts = (params) => API.get("/products/", { params });
export const createProduct = (productData) => API.post("/products/", productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}/`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}/`);

// Transactions
export const fetchTransactions = (params) => API.get("/transactions/", { params });
export const createTransaction = (transactionData) => API.post("/transactions/", transactionData);
export const updateTransaction = (id, transactionData) => API.put(`/transactions/${id}/`, transactionData);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}/`);

// Suppliers
export const fetchSuppliers = (params) => API.get("/suppliers/", { params });
export const createSupplier = (supplierData) => API.post("/suppliers/", supplierData);
export const updateSupplier = (id, supplierData) => API.put(`/suppliers/${id}/`, supplierData);
export const deleteSupplier = (id) => API.delete(`/suppliers/${id}/`);

// Categories
export const fetchCategories = () => API.get("/categories/");
export const createCategory = (categoryData) => API.post("/categories/", categoryData);
export const updateCategory = (id, categoryData) => API.put(`/categories/${id}/`, categoryData);
export const deleteCategory = (id) => API.delete(`/categories/${id}/`);
