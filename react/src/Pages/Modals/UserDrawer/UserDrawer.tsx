// src/Modals/UserDrawer.tsx
import React, { useEffect } from "react";
import { Drawer, Form, Input, Button } from "antd";
import { UserInfo } from "../../../Redux/Reducers/UsersReducer";

interface UserDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: UserInfo) => void;
  initialValues: UserInfo | null;
}

const UserDrawer: React.FC<UserDrawerProps> = ({
  visible,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    if (initialValues) {
      onSubmit({ ...initialValues, ...values });
    }
  };

  return (
    <Drawer
      title="Edit user information"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={400}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues || {}}
      >
        <Form.Item name="userId" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="passWord"
          label="Password"
          rules={[{ required: true, message: "Please enter password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserDrawer;
