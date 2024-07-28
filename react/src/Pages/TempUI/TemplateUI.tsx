import React, { useState } from "react";
import {
  DesktopOutlined,
  FolderOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  removeDataTextStorage,
  TOKEN_AUTHOR,
  USER_LOGIN,
} from "../../Util/UtilFunction";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("User", "/home", <UserOutlined />),
  getItem("Project", "sub1", <FolderOutlined />, [
    getItem("Project Management", "/home/project", <DesktopOutlined />),
    getItem("Create Project", "/home/create-project", <DesktopOutlined />),
  ]),
  getItem("Logout", "logout", <LogoutOutlined />),
];

type Props = {};

const TemplateUI = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = (pathname: string) => {
    switch (pathname) {
      case "/home":
        return "User Management";
      case "/home/create-project":
        return "Create Project";
      case "/home/project":
        return "Project Management";
      // thêm các case
      default:
        return "Dashboard";
    }
  };

  const onMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      removeDataTextStorage(USER_LOGIN);
      removeDataTextStorage(TOKEN_AUTHOR);
      navigate("/");
    } else {
      navigate(e.key);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={230}
      >
        <div
          className="logo-container"
          style={{ padding: "16px", textAlign: "center" }}
        >
          <img src="" alt="Logo" style={{ width: "100%", maxWidth: "120px" }} />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header className="bg-white d-flex align-items-center px-3">
          <div className="container-fluid">
            <h1 className="mb-0 fs-4 fw-bold">{getTitle(location.pathname)}</h1>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default TemplateUI;
