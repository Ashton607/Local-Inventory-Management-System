import React, { use } from 'react'
import './AdminStaff.css'
import { useState,useEffect } from 'react'
import {ChartBarStacked,HandCoins,Package2,
Users,Grid3X3,Truck,CircleUserRound,LogOut,
PackageCheck,ShoppingCart,Landmark,Search,Plus,Pencil,Trash,X} from 'lucide-react'
import {fetchUsers, createUser as createUserAPI,updateUser,deleteUser,
        fetchCategories, createCategory as createCategoryAPI,updateCategory,deleteCategory,
        fetchSuppliers, createSupplier as createSupplierAPI,updateSupplier,deleteSupplier,
        fetchProducts, createProduct as createProductAPI,updateProduct,deleteProduct,
        fetchTransactions, createTransaction as createTransactionAPI,updateTransaction,deleteTransaction
} from '../api/api.js'
import axios from 'axios'






function Admin(){

const [activeTab, setActiveTab] = useState('dashboard');
const [loading, setLoading] = useState(false);
const [admin, setAdmin] = useState([]);
const [adminInfo, setAdminInfo] = useState(null);
const [currentAdmin, setCurrentAdmin] = useState(null);



const TAB_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Stock Transactions',
  products: 'Products',
  users: 'Users',
  categories: 'Categories',
  suppliers: 'Suppliers',
  profile: 'Profile'
};






// User state
const [users, setUsers] = useState([]);
const [name, setName] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [userRole, setUserRole] = useState("");
const [searchUser,setSearchUser] = useState("");
const [editUserIdx, setEditUserIdx] = useState(null);


//Category state
const [category, setCategory] = useState([]);
const [categoryName, setCategoryname] = useState("");
const [editCategoryIdx, setEditCategoryIdx] = useState(null);


//Supplier state
const [supplier,setSupplier] = useState([]);
const [supplierName,setSupplierName] = useState("");
const [phonenumber,setPhonenumber] = useState("");
const [email,setEmail] = useState("");
const [address,setAddress] = useState("");
const [searchSupplier,setSearchSupplier] = useState("")
const [editSupplierIdx, setEditSupplierIdx] = useState(null);


//Product state
const [product,setProduct] = useState([]);
const [productName,setProductname] = useState("");
const [quantity,setQuantity] = useState("");
const [productCategory,setProductcategory] = useState("");
const [productSupplier,setProductSupplier] = useState("");
const [price,setPrice] = useState("");
const [searchProducts,setSearchProducts] = useState("")
const [editProductIdx,setEditProductIdx] = useState(null);


//Transaction state
const [transaction,setTransaction] = useState([]);
const [Tproduct,setTproduct] =useState("");
const [Tquantity,setTquantity] =useState("");
const [Tprice,setTprice] =useState("");
const [date,setDate] =useState("");
const [type,setType] =useState("");
const [searchTransactions,setSearchTransactions] = useState("")
const [editTransactionIdx,setEditTransactionIdx] =useState(null);

// Sorting state
const [sortOrder, setSortOrder] = useState("")







useEffect(() => {
  const storedAdminInfo = localStorage.getItem('adminInfo');
  console.log('Logged in admin info:', storedAdminInfo);


  if (!storedAdminInfo) {
    console.log('No admin info found, redirecting to home.');
    window.location.href = '/';
    return;
  }
  const userData = JSON.parse(storedAdminInfo);
  console.log('Parsed admin data:', userData);
  setAdminInfo(userData);


  axios.get('http://localhost:8000/api/users/')
  .then(res =>{
  console.log('All users data:', res.data);
  const currentAdmin = res.data.filter(s => s.id === userData.id);
  console.log('Current admin data:', currentAdmin);
  setAdmin(currentAdmin);
})
.catch(err => { console.error('Error fetching users:', err) });
}, []);


const handleLogout = () => {
        localStorage.removeItem('adminInfo');
        window.location.href = '/';
    };






 useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }



   useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }


 useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await fetchTransactions();
      setTransaction(response.data);
    } catch (error) {
      console.error(error);
    }
  }

   useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const response = await fetchSuppliers();
      setSupplier(response.data);
    } catch (error) {
      console.error(error);
    }
  }








useEffect(() => {
  getUsers();
  getCategories();
  getSupplier();
  getProducts();
  getTransactions();
}, []);


const getUsers = async () => {
    try {
        setLoading(true);
        const{data} = await fetchUsers();
        setUsers(data);
        console.log('Users fetched successfully:', data);
    } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
        
    } finally {
        setLoading(false);
    }
};


const getCategories = async () =>{
  try{
    setLoading(true);
    const{data} = await fetchCategories();
    setCategory(data);
    console.log('Categories fetched successfully: ',data);
  }catch(error){
    console.error('Error fetching categories:',error,response ? error.response.data : error.message);
  }finally{
    setLoading(false);
  }
}



const getSupplier = async()=>{
  try{
    setLoading(true);
    const{data} = await fetchSuppliers();
    setSupplier(data);
    console.log('Suppliers fetched successfully: ',data);
  }catch(error){
    console.error('Error fetching suppliers:',error,response? error.response.data: error.message);
  }finally{
    setLoading(false);
  }
}



const getProducts = async()=>{
  try{
    setLoading(true);
    const{data} = await fetchProducts();
    setProduct(data);
    console.log('Products fetched successfully: ',data);
  }catch(error){
    console.error('Error fetching products: ',error,response? error.respone.data: error.message);
  }finally{
    setLoading(false);
  }
}



const getTransactions = async()=>{
  try{
    setLoading(true);
    const{data} = await fetchTransactions();
    setTransaction(data);
    console.log('Transactions fetched successfully: ',data);
  }catch(error){
    console.error('Error fetching transactions: ',error,respone? error.response.data: error.message);
  }finally{
    setLoading(false);
  }
}










// Users handlerr
const handleAddorUpdateUser = async (e) => {
    e.preventDefault();

    if(!name || !username || !password || !userRole){
        alert("Please fill in all fields.");
        return;
    }

    const userData = {
        name,
        username: parseInt(username),  
        password: password.trim(),
        role: userRole
    };

    if(isNaN(userData.username)){
        alert("Username must be a number.");
        return;
    }

    try{
    setLoading(true);
    if (editUserIdx !== null) {
      const userToEdit = users[editUserIdx];
      await updateUser(userToEdit.id, userData);
      const updatedUsers = [...users];
      updatedUsers[editUserIdx] = { ...userToEdit, ...userData };
      setUsers(updatedUsers);  
    } else {
      const { data } = await createUserAPI(userData);
      setUsers(prev => [...prev, data]);  
      resetUsersForm();
    }
        alert('User saved successfully.');
    } catch (error) {
        console.error('Error saving user:', error.response ? error.response.data : error.message);
        alert('Failed to save user. Please try again later.');
    } finally {
        setLoading(false);
    }
};


const handleEditUser = (idx) => {
    const user = users[idx];
    setName(user.name);
    setUsername(user.username.toString());
    setPassword(user.password);
    setUserRole(user.role);
    setEditUserIdx(idx);
    setActiveTab('users');
};

const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
        return;
    }
    try {
        setLoading(true);
        await deleteUser(id);
        setUsers(prev => prev.filter(u => u.id !== id));
        if (editUserIdx !== null) {
            const editingUser = users[editUserIdx];
            if (editingUser && editingUser.id === id) resetUsersForm();
        }
        console.log('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
        alert('Failed to delete user. Please try again later.');
    } finally {
        setLoading(false);
    }
};

const resetUsersForm = () => {
    setName("");
    setUsername("");
    setPassword("");
    setUserRole("");
    setEditUserIdx(null);
};

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetchUsers(
          searchUser.trim() ? { search: searchUser } : {}
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchUser]);











    




//Categories handler
const handleAddOrUpdateCategories = async (e) =>{
  e.preventDefault();

  if(!categoryName){
    alert('Please fill in the field');
    return;
  };

  const categoryData = {
        name: categoryName,
    };

    try{
    setLoading(true);
    if (editCategoryIdx !== null) {
      const categoryToEdit = category[editCategoryIdx];
      await updateCategory(categoryToEdit.id, categoryData);
      const updatedCategories = [...category];
      updatedCategories[editCategoryIdx] = { ...categoryToEdit, ...categoryData };
      setCategory(updatedCategories);  
    } else {
      const { data } = await createCategoryAPI(categoryData);
      setCategory(prev => [...prev, data]);  
      resetCategoriesForm();
    }
    alert('Category saved successfully.');
  } catch (error) {
    console.error('Error saving category:', error.response ? error.response.data : error.message);
    alert('Failed to save category. Please try again later.');
  } finally {
    setLoading(false);
  }
};


const handleEditCategory= (idx) => {
    const categories = category[idx];
    setCategoryname(categories.name);
    setEditCategoryIdx(idx);
    setActiveTab('categories');
};

const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
        return;
    };
    try {
        setLoading(true);
        await deleteCategory(id);
        setCategory(prev => prev.filter(u => u.id !== id));
        if (editCategoryIdx !== null) {
            const editingCategory = category[editCategoryIdx];
            if (editingCategory && editingCategory.id === id) resetCategoriesForm();
        }
        console.log('Category deleted successfully');
    } catch (error) {
        console.error('Error deleting category:', error.response ? error.response.data : error.message);
        alert('Failed to delete category. Please try again later.');
    } finally {
        setLoading(false);
    }
};

const resetCategoriesForm = () => {
    setCategoryname("");
    setEditCategoryIdx(null); 
};












// Supplier handlers
const handleAddOrUpdateSuppliers = async (e) =>{
    e.preventDefault();

  if(!supplierName || !phonenumber || !email || !address){
    alert('Please fill in all the fields');
    return;
  };

  const supplierData = {
      name: supplierName,
      phone_number: phonenumber,
      email: email,
      address: address,
    };

  try{
    setLoading(true);
    if (editSupplierIdx !== null) {
      const supplierToEdit = supplier[editSupplierIdx];
      await updateSupplier(supplierToEdit.id, supplierData);
      const updatedSuppliers = [...supplier];
      updatedSuppliers[editSupplierIdx] = { ...supplierToEdit, ...supplierData };
      setSupplier(updatedSuppliers);  
    } else {
      const { data } = await createSupplierAPI(supplierData);
      setSupplier(prev => [...prev, data]);  
      resetSuppliersForm();
    }
    alert('Supplier saved successfully.');
  } catch (error) {
    console.error('Error saving supplier:', error.response ? error.response.data : error.message);
    alert('Failed to save supplier. Please try again later.');
  } finally {
    setLoading(false);
  }
};

const handleEditSupplier= (idx) => {
    const suppliers = supplier[idx];
    setSupplierName(suppliers.name);
    setPhonenumber(suppliers.phone_number);
    setEmail(suppliers.email);
    setAddress(suppliers.address);
    setEditSupplierIdx(idx);
    setActiveTab('suppliers');
};

const handleDeleteSupplier= async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) {
        return;
    };
    try {
        setLoading(true);
        await deleteSupplier(id);
        setSupplier(prev => prev.filter(u => u.id !== id));
        if (editSupplierIdx !== null) {
            const editingSupplier = supplier[editSupplierIdx];
            if (editingSupplier && editingSupplier.id === id) resetSuppliersForm();
        }
        console.log('Supplier deleted successfully');
    } catch (error) {
        console.error('Error deleting supplier:', error.response ? error.response.data : error.message);
        alert('Failed to delete supplier. Please try again later.');
    } finally {
        setLoading(false);
    }
};

const resetSuppliersForm = () => {
    setSupplierName("");
    setPhonenumber("");
    setEmail("");
    setAddress("");
    setEditSupplierIdx(null); 
};

useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetchSuppliers(
          searchSupplier.trim() ? { search: searchSupplier } : {}
        );
        setSupplier(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchSupplier]);





















//Product handlers
const  handleAddOrUpdateProducts = async(e) =>{
  e.preventDefault();

  if(!productName || !quantity || !productCategory || !productSupplier || !price){
    alert('Please fill in all the fields');
    return;
  };

  const productData = {
      name: productName,
      quantity: parseInt(quantity),
      category: productCategory,
      supplier: productSupplier,
      price: parseFloat(price),
    };
  
    try{
    setLoading(true);
    if (editProductIdx !== null) {
      const productToEdit = product[editProductIdx];
      await updateProduct(productToEdit.id, productData);
      const updatedProducts = [...product];
      updatedProducts[editProductIdx] = { ...productToEdit, ...productData };
      setProduct(updatedProducts);  
    } else {
      const { data } = await createProductAPI(productData);
      setProduct(prev => [...prev, data]);  
      resetProductsForm();
    }
    alert('Product saved successfully.');
  } catch (error) {
    console.error('Error saving product:', error.response ? error.response.data : error.message);
    alert('Failed to save product. Please try again later.');
  } finally {
    setLoading(false);
  }
};

const handleEditProduct = (idx) => {
    const products = product[idx];
    setProductname(products.name);           
    setQuantity(products.quantity);          
    setProductcategory(products.category);   
    setProductSupplier(products.supplier);   
    setPrice(products.price);                
    setEditProductIdx(idx);
    setActiveTab('products');
};

const handleDeleteProduct= async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
    };
    try {
        setLoading(true);
        await deleteProduct(id);
        setProduct(prev => prev.filter(u => u.id !== id));
        if (editProductIdx !== null) {
            const editingProduct = product[editProductIdx];
            if (editingProduct && editingProduct.id === id) resetProductsForm();
        }
        console.log('Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        alert('Failed to delete product. Please try again later.');
    } finally {
        setLoading(false);
    }
};

const resetProductsForm = () => {
    setProductname("");
    setQuantity("");
    setProductcategory("");
    setProductSupplier("");
    setPrice("")
    setEditProductIdx(null); 
};


useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetchProducts(
          searchProducts.trim() ? { search: searchProducts } : {}
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchProducts]);




























//Transaction handlers
const handleAddOrUpdateTransaction = async(e)=>{
  e.preventDefault();

  if(!Tproduct || !Tquantity || !Tprice || !date || !type){
    alert('Please fill in all the fields');
    return;
  };

      const transactionData = {
      product: Tproduct,
      quantity: parseInt(Tquantity),
      price: parseFloat(Tprice),
      date: new Date().toISOString(),
      type: type,
    };

    try{
    setLoading(true);
    if (editTransactionIdx !== null) {
      const transactionToEdit = transaction[editTransactionIdx];
      await updateTransaction(transactionToEdit.id, transactionData);
      const updatedTransactions = [...transaction];
      updatedTransactions[editTransactionIdx] = { ...transactionToEdit, ...transactionData };
      setTransaction(updatedTransactions);  
    } else {
      const { data } = await createTransactionAPI(transactionData);
      setTransaction(prev => [...prev, data]);  
      resetTransactonsForm();
    }
    alert('Transaction saved successfully.');
  } catch (error) {
    console.error('Error saving transaction:', error.response ? error.response.data : error.message);
    alert('Failed to save transaction. Please try again later.');
  } finally {
    setLoading(false);
  }
};

const handleEditTransaction = (idx) => {
    const transactions = transaction[idx];
    setTproduct(transactions.product);           
    setTquantity(transactions.quantity);          
    setTprice(transactions.price);   
    setDate(transactions.date);   
    setType(transactions.type);                
    setEditTransactionIdx(idx);
    setActiveTab('transactions');
};


const handleDeleteTransactions= async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
        return;
    };
    try {
        setLoading(true);
        await deleteTransaction(id);
        setTransaction(prev => prev.filter(u => u.id !== id));
        if (editTransactionIdx !== null) {
            const editingTransaction = transaction[editTransactionIdx];
            if (editingTransaction && editingTransaction.id === id) resetTransactonsForm();
        }
        console.log('Transaction deleted successfully');
    } catch (error) {
        console.error('Error deleting transaction:', error.response ? error.response.data : error.message);
        alert('Failed to delete transaction. Please try again later.');
    } finally {
        setLoading(false);
    }
};


const resetTransactonsForm = () => {
    setTproduct("");
    setTquantity("");
    setTprice("");
    setDate("");
    setType("")
    setEditTransactionIdx(null); 
};

useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetchTransactions(
          searchTransactions.trim() ? { search: searchTransactions} : {}
        );
        setTransaction(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTransactions]);

















// transaction
const selectedProduct = product.find(p => p.id === parseInt(Tproduct));
const availableQuantity = selectedProduct ? selectedProduct.quantity : 0;
const availablePrice = selectedProduct? selectedProduct.price:0;


//dashboard 
const totalOut = transaction
  .filter(t => t.type === 'Out')
  .reduce((total, t) => total + (parseFloat(t.price) * parseInt(t.quantity)), 0);




//Sort users
 const sortedUsers = [...users].sort((a, b) => {
    if (!sortOrder) return 0; 
    const nameA = a.name?.toLowerCase() || "";
    const nameB = b.name?.toLowerCase() || "";
    return sortOrder === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };



//Sort Categories
const sortedCategories = [...category].sort((a,b)=>{
  if(!sortOrder) return 0;
  const categoryA = a.categoryName?.toLowerCase() || "";
  const categoryB = b.name?.toLowerCase() || "";
  return sortOrder === "asc"
  ? categoryA.localeCompare(categoryB)
  : categoryB.localeCompare(categoryA);
});









  

  return (
    <div className='admin-body'>
    <div className='header'>  
    <div className="header-subtitle">{TAB_TITLES[activeTab] || activeTab}</div>
    </div>
    
    <div className='Menu'>
     <ul>
        <li>
            <button
            type='button'
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
            >
            <ChartBarStacked size={25}/> 
            Dashboard
            </button>
        </li>
        <li>
            <button
            type='button'
            className={activeTab === 'transactions' ? 'active' : ''}
            onClick={() => setActiveTab('transactions')}
            >
            <ShoppingCart size={25}/>
             Orders
             </button>
        </li>
        <li>
            <button
            type='button'
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
            >
            <Package2 size={25}/>
             Products
             </button>
        </li>
        <li>
            <button
            type='button'
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
            >
            <Users size={25}/>
             Users
             </button>
        </li>
        <li>
            <button
            type='button'
            className={activeTab === 'categories' ? 'active' : ''}
            onClick={() => setActiveTab('categories')}
            >
            <Grid3X3 size={25}/> 
            Categories
            </button>
        </li>
        <li>
            <button
            type='button'
            className={activeTab === 'suppliers' ? 'active' : ''}
            onClick={() => setActiveTab('suppliers')}
            >
            <Truck size={25}/>
             Suppliers
             </button>
        </li>
        <li>
            <button
            type='button'
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
            >
            <CircleUserRound size={25}/>
             Profile
             </button>
        </li>
        <li>
            <button onClick={handleLogout}><LogOut size={25}/> Logout</button>
        </li>
     </ul>
    </div>

    <div className='nav-content'>
    
    {activeTab ==='dashboard'&&(
    <div className="dashboard">
        <div className="card-container">
            <div className="card">
                <h3>Total Stock</h3>
                <div className="card-icon">
                    <PackageCheck size={70}/>
                </div>
                <div className="footer">
                   <span>{product.reduce((total, p) => total + p.quantity, 0)}</span>
                </div>
            </div>

            <div className="card">
                <h3>Orders</h3>
                <div className="card-icon">
                    <ShoppingCart size={70}/>
                </div>
                <div className="footer">
                    <span>{transaction.length}</span>
                </div>
            </div>

            <div className="card">
                <h3>Total Products</h3>
                <div className="card-icon">
                    <Package2 size={70}/>
                </div>
                <div className="footer">
                    <span>{product.length}</span>
                </div>
            </div>

            <div className="card" style={{width:"800px", marginTop:"40px"}}>
                <h3>Total Revenue</h3>
                <div className="card-icon">
                    <Landmark size={70}/>
                </div>
                <div className="footer">
                    <span className={totalOut < 5000 ? 'amount-red' : 'amount-green'}>
                     R{totalOut.toFixed(2)}
                    </span>
                </div>
            </div>

            

        </div>
    </div>
    
    )}

     {activeTab ==='transactions'&&(
    <div className="transactions">
        <div className="transactions-content">
            <div className="search-bar">
            <input
            type="text" 
            value={searchTransactions}
            onChange={(e)=> setSearchTransactions(e.target.value)} 
            placeholder="Search Transactions..." />
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Plus size={20} style={{marginRight:"9px", marginBottom:"5px"}}/>Add</button>
        </div>

          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
         <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Transaction</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <form onSubmit={handleAddOrUpdateTransaction}>
          <div class="mb-3">
            <label for="productname" class="form-label">Product Name</label>
            <select name='productname' class="form-select" value={Tproduct} onChange={(e) => setTproduct(e.target.value)} required>
             <option value="">Select Product</option>
           {product.map((p) => (
            <option key={p.id} value={p.id}>
                {p.name}
            </option>
           ))}
          </select>
          </div>
          <div class="mb-3">
            <label for="productprice" class="form-label">Price(Available: {availablePrice})</label>
            <select  class="form-select" value={Tprice} onChange={(e) => setTprice(e.target.value)} required disabled={!Tproduct}>
            <option value="">Select Price</option>
            {selectedProduct && Array.from({ length: availablePrice},(_, i) => i+1).map(numprice =>(
              <option value={availablePrice}>{availablePrice}</option>
            ))}
            </select>
          </div>
          <div class="mb-3">
         <label for="productquantity" class="form-label">Quantity (Available: {availableQuantity})</label>
          <select 
           name="productquantity" 
           class="form-select" 
           value={Tquantity} 
           onChange={(e) => setTquantity(e.target.value)} 
           required
           disabled={!Tproduct}
           >
          <option value="">Select Quantity</option>
          {selectedProduct && Array.from({ length: availableQuantity }, (_, i) => i + 1).map(num => (
          <option key={num} value={num}>{num}</option>
          ))}
         </select>
          </div>
          <div class="mb-3">
            <label for="transactiontype" class="form-label">Type</label>
            <select name="transactiontype" value={type} onChange={(e) => setType(e.target.value)} class="form-select" required>
             <option value="">Select Type</option> 
             <option value="In">In</option>
             <option value="Out">Out</option>
            </select>
          </div>
           <div class="mb-3">
            <label for="transactiondate" class="form-label">Date</label>
            <input type="date" class="form-control" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Enter transaction date" required/>
          </div>
          <div class="modal-footer">
        {editTransactionIdx !==null &&(
        <button type="button" onClick={resetTransactonsForm} class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        )}
        <button type="submit" class="btn btn-primary">{(editTransactionIdx !==null? "Update":"Add Transaction")}</button>
      </div>
        </form>
      </div>
    </div>
  </div>
</div>
<br />
<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Total Price</th>
      <th>Type</th>
      <th>Date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {transaction.map((transactionData)=>(
      <tr key={transactionData.id}>
        <td>{product.find(p => p.id === transactionData.product)?.name || 'N/A'}</td>
        <td>R{transactionData.price}</td>
        <td>{transactionData.quantity}</td>
        <td>
        <span className={transactionData.type === 'Out' ? 'TotalPriceOut' : 'TotalPriceIn'}>
        R{(transactionData.price * transactionData.quantity).toFixed(2)}
        </span>
        </td>
        <td>
       <span className={transactionData.type === 'Out' ? 'type-out' : 'type-in'}>
       {transactionData.type}
       </span>
      </td>
        <td>{new Date(transactionData.date).toLocaleDateString()}</td>
        <td>
      <div className="user-actions">
                <button
                onClick={() => handleEditTransaction(transaction.findIndex(e => e.id === transactionData.id))}
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                >
                <Pencil size={22}/>
                </button>
                <button onClick={() => handleDeleteTransactions(transactionData.id)}>
                  <Trash size={22}/>
                </button>
            </div>
    </td>
      </tr>
    ))}
  </tbody>
</table>
        
        </div>
    </div>
    )}


     {activeTab ==='products'&&(
    <div className="products">
       <div className="products-content">

            <div className="search-bar">
            <input
            type="text" 
            value={searchProducts}
            onChange={(e)=> setSearchProducts(e.target.value)} 
            placeholder="Search Products..." />
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Plus size={20} style={{marginRight:"9px", marginBottom:"5px"}}/>Add</button>
        </div>


        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
         <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add New Product</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <form onSubmit={handleAddOrUpdateProducts}>
          <div class="mb-3">
            <label for="productname" class="form-label">Name</label>
            <input type="text" class="form-control" value={productName} onChange={(e) => setProductname(e.target.value)} placeholder="Enter product name" required/>
          </div>
          <div class="mb-3">
            <label for="productprice" class="form-label">Price</label>
            <input type="number" class="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter product price" required/>
          </div>
          <div class="mb-3">
            <label for="productquantity" class="form-label">Quantity</label>
            <input type="number" class="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter product quantity" required/>
          </div>
          <div class="mb-3">
            <label for="productcategory" class="form-label">Category</label>
            <select 
            name="productcategory" 
            value={productCategory} 
            onChange={(e) => setProductcategory(e.target.value)} 
            class="form-select" 
            required
           >
           <option value="">Select category</option>
           {category.map((cat) => (
            <option key={cat.id} value={cat.id}>
                {cat.name}
            </option>
           ))}
          </select>
          </div>
          <div class="mb-3">
            <label for="productsupplier" class="form-label">Supplier</label>
            <select name="productsupplier" value={productSupplier} onChange={(e) => setProductSupplier(e.target.value)} class="form-select" required>
             <option value="">Select supplier</option>
              {supplier.map((sup) => (
              <option key={sup.id} value={sup.id}>
             {sup.name}
           </option>
           ))}
          </select>
          </div>
        <div class="modal-footer">
        {editProductIdx !==null &&(
        <button type="button" onClick={resetProductsForm} class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        )}
        <button type="submit" class="btn btn-primary">{(editProductIdx !==null? "Update":"Add Product")}</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
<br />
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Category</th>
      <th>Total Price</th>
      <th>Supplier</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {product.map((productData,idx)=>(
    <tr key={productData.id}>
    <td>{productData.name}</td>
    <td>R{productData.price}</td>
    <td>
   <span className={productData.quantity < 5 ? 'qty-low' : 'qty-high'}>
    {productData.quantity}
    </span>
    </td>
    <td>{category.find(cat => cat.id === productData.category)?.name || 'N/A'}</td>
    <td>R{(productData.price * productData.quantity).toFixed(2)}</td>
    <td>{supplier.find(sup => sup.id === productData.supplier)?.name || 'N/A'}</td>
    <td>
      <div className="user-actions">
                <button
                onClick={() => handleEditProduct(product.findIndex(e => e.id === productData.id))}
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                >
                <Pencil size={22}/>
                </button>
                <button onClick={() => handleDeleteProduct(productData.id)}>
                  <Trash size={22}/>
                </button>
            </div>
    </td>
    </tr>
  ))}
  </tbody>
</table>



        </div>
    </div>
    )}


     {activeTab ==='users'&&(
    <div className="users">
        <div className="users-content">

            <div className="search-bar">
            <input
            type="text"
            value={searchUser}
            onChange={(e)=> setSearchUser(e.target.value)} 
            placeholder="Search Users..." />

            
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Plus size={20} style={{marginRight:"9px", marginBottom:"5px"}}/>Add</button>
            <select name="sort" id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Sort</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
            </select>          
           </div>
        
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
         <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add New User</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

        <form onSubmit={handleAddorUpdateUser}>
          <div class="mb-3">
            <label for="contactName" class="form-label">Name</label>
            <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" required/>
          </div>
          <div class="mb-3">
            <label for="Staffnumber" class="form-label">Username</label>
            <input type="number" class="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required/>
          </div>
          <div class="mb-3">
            <label for="Password" class="form-label">Password</label>
            <input type="password" class="form-control" id="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required/>
          </div>
           <div class="mb-3">
            <label for="userrole" class="form-label">User Role</label>
            <select name="userrole" value={userRole} onChange={(e) => setUserRole(e.target.value)} class="form-select" required>
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="Personnel">Personnel</option>
            </select>
          </div>
           <div class="modal-footer" >
        {editUserIdx !==null &&(
        <button type="button" onClick={resetUsersForm} class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        )}
        <button type="submit" class="btn btn-primary">{(editUserIdx !==null? "Update":"Add User")}</button>
      </div>
        </form>
      </div>
    </div>
  </div>
</div>
<br />
 <table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>User Role</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {sortedUsers.map((userData) => (
        <tr key={userData.id}>
        <td>{userData.name}</td>
        <td>{userData.username}</td>
        <td>{userData.password}</td>
        <td>{userData.role}</td>       
        <td>
            <div className="user-actions">
                <button
                onClick={() => handleEditUser(users.findIndex(e => e.id === userData.id))}
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                >
                <Pencil size={18}/>
                </button>
                <button onClick={() => handleDeleteUser(userData.id)}>
                  <Trash size={18}/>
                </button>
            </div>
        </td>
    </tr>
    ))}
</tbody>
 </table>

</div>
</div>
    )}


     {activeTab ==='categories'&&(
    <div className="categories">
        <div className="categories-content">
        <form onSubmit={handleAddOrUpdateCategories}>
            <div className="category-bar">
           
            <input 
            type="text"
            value={categoryName}
            onChange={(e)=> setCategoryname(e.target.value)}
            placeholder="Name" />
            <button type='submit' disabled={loading}>
             {loading? "Processing...":(editCategoryIdx !== null?'Update':'Add')}
            <Plus size={20} style={{marginLeft:"-70px", marginBottom:"5px", marginRight:"30px"}}/>
            </button>
            {editCategoryIdx !==null &&(
            <button type='button' onClick={resetCategoriesForm} style={{color:"#ff5a5aff",fontWeight:"bold"}}>
             <X size={20} style={{marginBottom:"5px"}}/> Cancel
            </button>
            )}
            <select name="sort" id="sort">
            <option value="">Sort</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            </select> 
        </div>

        <ul>
          {category.map((categoryData,idx)=>(
          <li key={categoryData.id}>
            <div>  
            <span>{categoryData.name}</span>
            </div>
            <div className="category-actions">
               <button
                onClick={() => handleEditCategory(category.findIndex(e => e.id === categoryData.id))}
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                >
                <Pencil size={22}/>
                </button>
                <button onClick={() => handleDeleteCategory(categoryData.id)}>
                  <Trash size={22}/>
                </button>
            </div>
          </li>
          ))}
        </ul>
        </form>
        </div>
    </div>
    )}



     {activeTab ==='suppliers'&&(
    <div className="suppliers">
        <div className="suppliers-content">

            <div className="search-bar">
            <input
            type="text" 
            value={searchSupplier}
            onChange={(e)=> setSearchSupplier(e.target.value)} 
            placeholder="Search Suppliers..." />

            
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Plus size={20} style={{marginRight:"9px", marginBottom:"5px"}}/>Add</button>
            </div>




         <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
         <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Supplier</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

        <form onSubmit={handleAddOrUpdateSuppliers}>
          <div class="mb-3">
            <label for="contactName" class="form-label">Name</label>
            <input type="text" class="form-control" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} placeholder="Enter full name" required/>
          </div>
          <div class="mb-3">
            <label for="emailaddress" class="form-label">Email Address</label>
            <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" required/>
          </div>
          <div class="mb-3">
            <label for="Phone" class="form-label">Phone</label>
            <input type="number" class="form-control" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} placeholder="Enter phone number" required/>
          </div>
          <div class="mb-3">
            <label for="ShopAddress" class="form-label">Shop Address</label>
            <input type="text" class="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter shop address" required/>
          </div>
          <div class="modal-footer">
          {editSupplierIdx !==null &&(
         <button type="button" onClick={resetSuppliersForm} class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
           )}
         <button type="submit" class="btn btn-primary">{(editSupplierIdx !==null? "Update":"Add User")}</button>
        </div>
        </form>
        </div>
      
    </div>
  </div>
</div>
<br />
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone number</th>
            <th>Shop Address</th>
            <th>Actions</th>
        </tr>
    </thead>
      <tbody>
        {supplier.map((supplierData, idx) => (
        <tr key={supplierData.id}>
        <td>{supplierData.name}</td>
        <td>{supplierData.email}</td>
        <td>{supplierData.phone_number}</td>
        <td>{supplierData.address}</td>       
        <td>
            <div className="supplier-actions">
                <button
                onClick={() => handleEditSupplier(supplier.findIndex(e => e.id === supplierData.id))}
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                >
                <Pencil size={22}/>
                </button>
                <button onClick={() => handleDeleteSupplier(supplierData.id)}>
                  <Trash size={22}/>
                </button>
            </div>
        </td>
    </tr>
    ))}
</tbody>
 </table>
    </div>
    </div>
    )}



  {activeTab === 'profile' && (
  <div className="profile">
    {admin && admin.length > 0 ? (
      admin.map((userData) => (
        <div className="profile-card" key={userData.id}>
          <div className="profile-header">
            <div className="avatar-wrapper">
              <div className="avatar-circle">
                <span className="avatar-letter">
                  {typeof userData.name === 'string'
                    ? userData.name.charAt(0).toUpperCase()
                    : userData.user?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-body">
            <h3>Profile Information</h3>

            <div className="info-grid">
              <div className="info-item">
                <label>Role</label>
                <p>{userData.role || userData.user?.role || 'N/A'}</p>
              </div>

              <div className="info-item">
                <label>Name</label>
                <p>{userData.name|| userData.user?.name || 'N/A'}</p>
              </div>

              <div className="info-item">
                <label>Username</label>
                <p>{userData.username || userData.user?.username || 'N/A'}</p>
              </div>

              <div className="info-item">
                <label>Password</label>
                <p>••••••••</p>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>Loading profile...</p>
    )}
  </div>
)}



    </div>







    </div>
  )
}

export default Admin
