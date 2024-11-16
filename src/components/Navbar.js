import {Menu} from "antd";
import {DashboardOutlined, FileOutlined, LogoutOutlined} from "@ant-design/icons"
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../AuthContext";

const menuItems = [
    {
        label: <Link to="/dashboard" className="text-decoration-none">Dashboard</Link>,
        key: '/dashboard',
        icon: <DashboardOutlined/>
    },
    {
        label: <Link to="/upload-rates" className="text-decoration-none">Upload Rates</Link>,
        key: '/upload-rates',
        icon: <FileOutlined/>
    },
    {
        label: 'Logout',
        key: 'logout',
        icon: <LogoutOutlined/>
    }
];

export default function Navbar({collapsed}) {
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogout = () => {
        logout()
        navigate('/login');
    }
    return <>
        <div className="logo text-center p-3 text-white">
            <h5 className="mb-0">{collapsed ? 'PB' : 'Price Benchmarking'}</h5>
        </div>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            className="text-left" items={menuItems}
        ></Menu>
    </>
}