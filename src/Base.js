import { useState } from "react";
import {Outlet} from 'react-router-dom';
import Navbar from "./components/Navbar";
import { Layout } from "antd"
const {Sider } = Layout;


export default function Base() {
    const [collapsed, setCollapsed] = useState(false);
    return <>
        <Layout style={{minHeight: "100vh"}}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <Navbar collapsed={collapsed} />
            </Sider>
            <Layout className="container py-5 position-relative">
                <main>
                    <Outlet/>
                </main>
            </Layout>
        </Layout>
    </>
}