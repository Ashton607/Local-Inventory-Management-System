import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { User, Eye, EyeOff } from 'lucide-react';
import  './Home.css'

function Home(){
    const [activeTab, setActiveTab] = useState('admin');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const [staffusername, setStaffusername] = useState("");
    const [staffpassword, setStaffpassword] = useState("");
    const [staffrole, setStaffrole] = useState("Personnel");  

    const [adminusername, setAdminusername] = useState("");
    const [adminpassword, setAdminpassword] = useState("");
    const [adminrole, setAdminrole] = useState("Admin");     


    const [showStaffPassword, setShowStaffPassword] = useState(false);
    const [showAdminPassword, setShowAdminPassword] = useState(false);


   const handleStaffSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
        const response = await fetch('http://localhost:8000/api/users/');
        const staffData = await response.json();
        
        console.log('Staff attempting login:', {
            username: staffusername,
            password: staffpassword,
            role: staffrole
        });

        // Convert username to string for comparison since API returns number
        const userData = staffData.find(s => 
            String(s.username) === String(staffusername) && 
            s.password === staffpassword && 
            s.role === staffrole
        );

        console.log('Found staff:', userData);

        if (userData) {
            localStorage.setItem('staffInfo', JSON.stringify(userData));
            navigate('/staff');
        } else {
            setError("Invalid staff credentials");
        }
        } catch (error){
            console.error('Error during staff login:', error);
            setError("Error during staff login");
        } finally {
            setLoading(false);
        }
    };


   const handleAdminSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            const response = await fetch('http://localhost:8000/api/users/');
            const adminData = await response.json();

            const userData = adminData.find(a => 
                String(a.username) === String(adminusername) && 
                a.password === adminpassword && 
                a.role === adminrole
            );

            if(userData){
                localStorage.setItem('adminInfo', JSON.stringify(userData));
                console.log("Admin login successful");
                navigate('/admin');
            } else {
                setError("Invalid admin credentials");
            }
        } catch (error){
            console.error('Error during admin login:', error);
            setError("Error during admin login");
        } finally {
            setLoading(false);
        }
    };











  return (
    <div className='signupbody'>

        <div className="signup-header">
            <h1>Inventory Management System</h1>
        </div>


        <div className="login-container">
            <div className="tab-btn">
                <button
                 type='button'
                 className={activeTab === 'admin' ? 'active' : ''}
                 onClick={() => setActiveTab('admin')}
                >
                 Admin
                 </button>
                  <button
                 type='button'
                 className={activeTab === 'staff' ? 'active' : ''}
                 onClick={() => setActiveTab('staff')}
                >
                 Staff
                 </button>
            </div>
        

                {error && (
                    <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
                )}



        {activeTab === 'admin'  && (
               <form className="login-form" onSubmit={handleAdminSubmit}>
                <div>
                    <label htmlFor="admin-username">Admin Username:</label>
                    <input
                    type="text"
                    id="admin-username" 
                    name="admin-username" 
                    value={adminusername}
                    onChange={(e) => setAdminusername(e.target.value)}
                    required 
                    disabled={loading}/>
                </div>

                <div>
                    <label htmlFor="admin-password">Admin Password:</label>
                    <input
                    type={showAdminPassword? 'text':'password'}
                    id="admin-password" 
                    name="admin-password" 
                    value={adminpassword}
                    onChange={(e) => setAdminpassword(e.target.value)}
                    required 
                    disabled={loading}/>
                    <span
                    style={{marginLeft:"85%",marginTop:"-30px"}}
                    onClick={()=> setShowAdminPassword(!showAdminPassword)}>
                     {showAdminPassword? <Eye size={22}/> : <EyeOff size={22}/>}
                    </span>
                </div>
                
                <input 
                 type="hidden"
                 value="Admin"
                 onChange={(e) => setAdminrole(e.target.value)}
                 />
                
                <button type="submit" disabled={loading}>Login</button>
               </form>
             )}





             {activeTab === 'staff' && (
               <form className="login-form" onSubmit={handleStaffSubmit}>
                <div>
                    <label htmlFor="staff-username">Staff Username:</label>
                    <input
                    type="text"
                    id="staff-username" 
                    name="staff-username" 
                    value={staffusername}
                    onChange={(e) => setStaffusername(e.target.value)}
                    required 
                    disabled={loading}/>
                </div>

                <div>
                    <label htmlFor="staff-password">Staff Password:</label>
                    <input
                    type={showStaffPassword?'text':'password'}
                    id="staff-password" 
                    name="staff-password"
                    value={staffpassword}
                    onChange={(e) => setStaffpassword(e.target.value)} 
                    required 
                    disabled={loading}/>
                    <span
                    style={{marginLeft:"85%",marginTop:"-30px"}}
                    onClick={()=> setShowStaffPassword(!showStaffPassword)}>
                     {showStaffPassword? <Eye size={22}/> : <EyeOff size={22}/>}
                    </span>
                </div>
                
                <input 
                 type="hidden"
                 value="Personnel"
                 onChange={(e) => setStaffrole(e.target.value)}
                 />
                <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
               </form>
             )}

          </div>   
        
    </div>
  )
}

export default Home
