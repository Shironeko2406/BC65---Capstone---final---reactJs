import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteMultipleUsersApi, deleteUserApi, editUserApi, getUserListApi } from "../Redux/Reducers/UsersReducer";
import { DispatchType, RootState } from "../Redux/store";
import "antd/dist/reset.css";
import UserDrawer from "./Modals/UserDrawer/UserDrawer";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../Models/UserModalType";
import { useLoading } from "../Contexts/LoadingContext";

const UserManagement: React.FC = () => {
  const { setLoading } = useLoading();
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();
  const { userList, userLogin } = useSelector(
    (state: RootState) => state.UsersReducer
  );
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!userLogin) {
      message.warning("You need to log in to access this page!");
      navigate("/");
    } else {
      setLoading(true);
      dispatch(getUserListApi()).finally(() => setLoading(false));
    }
  }, [dispatch, navigate, userLogin, setLoading]);

  useEffect(() => {
    setFilteredUsers(userList);
  }, [userList]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    const filteredData = userList.filter(
      (user: UserInfo) =>
        user.userId.toString().includes(value) ||
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.phoneNumber.includes(value)
    );
    setFilteredUsers(filteredData);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUserApi(id));
  };

  const handleDeleteSelected = () => {
    dispatch(deleteMultipleUsersApi(selectedRowKeys));
    setSelectedRowKeys([]); // Clear selected rows
  };

  const handleEdit = (user: UserInfo) => {
    setCurrentUser(user);
    setIsDrawerVisible(true);
    console.log(currentUser);
  };

  const handleUpdate = async (values: UserInfo) => {
    try {
      await dispatch(editUserApi(values));
      setIsDrawerVisible(false);
      dispatch(getUserListApi()); // Fetch lại dữ liệu sau khi cập nhật thành công
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const columns: ColumnsType<UserInfo> = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you want to delete this user?"
            onConfirm={() => handleDelete(record.userId)}
            okText="Yes"
            cancelText="No"
          >
            <Button shape="circle" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys as number[]);
    },
  };

  return (
    <div>
      <Input
        placeholder="Search...."
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: 300 }}
        prefix={<SearchOutlined />}
      />
      <div style={{ marginBottom: 16 }}>
        {selectedRowKeys.length > 1 && (
          <Popconfirm
            title="Are you sure you want to delete the selected users?"
            onConfirm={handleDeleteSelected}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete selected user
            </Button>
          </Popconfirm>
        )}
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredUsers}
        rowKey="userId"
      />
      <UserDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        onSubmit={handleUpdate}
        initialValues={currentUser}
      />
    </div>
  );
};

export default UserManagement;
