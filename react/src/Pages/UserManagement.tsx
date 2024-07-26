import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserListApi, UserInfo } from "../Redux/Reducers/userReducer";
import { DispatchType, RootState } from "../Redux/store";
import "antd/dist/reset.css";

const UserList: React.FC = () => {
  const dispatch: DispatchType = useDispatch();
  const { userList } = useSelector((state: RootState) => state.userReducer);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    dispatch(getUserListApi());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(userList);
  }, [userList]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    const filteredData = userList.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.phoneNumber.includes(value)
    );
    setFilteredUsers(filteredData);
  };

  const handleDelete = (id: number) => {
    const newData = filteredUsers.filter((user) => user.userId !== id);
    setFilteredUsers(newData);
    message.success("Xóa người dùng thành công");
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Popconfirm
            title="Bạn có chắc muốn xóa người dùng này không?"
            onConfirm={() => handleDelete(record.userId)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Tìm kiếm người dùng"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: 300 }}
        prefix={<SearchOutlined />}
      />
      <Table
        rowSelection={{ type: "checkbox" }}
        columns={columns}
        dataSource={filteredUsers}
        rowKey="userId"
      />
    </div>
  );
};

export default UserList;
