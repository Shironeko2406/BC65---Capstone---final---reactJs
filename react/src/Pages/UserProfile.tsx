import React from "react";
import { Avatar, Card, Col, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const { Title, Text } = Typography;

const UserProfile: React.FC = () => {
  const userLogin = useSelector(
    (state: RootState) => state.UsersReducer.userLogin
  );

  return (
    <Card style={{ maxWidth: "800px", margin: "auto", padding: "24px" }}>
      <Row gutter={[16, 16]}>
        <Col span={8} style={{ textAlign: "center" }}>
          <Avatar size={120} src={userLogin?.avatar} />
        </Col>
        <Col span={16}>
          <Title level={3}>User Profile</Title>
          <div style={{ marginBottom: 16 }}>
            <Text strong>ID: </Text>
            <Text>{userLogin?.id}</Text>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Name: </Text>
            <Text>{userLogin?.name}</Text>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Email: </Text>
            <Text>{userLogin?.email}</Text>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Phone Number: </Text>
            <Text>{userLogin?.phoneNumber}</Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default UserProfile;
