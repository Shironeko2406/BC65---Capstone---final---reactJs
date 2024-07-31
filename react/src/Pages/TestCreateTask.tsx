// src/Pages/SomePage.tsx
import React, { useState } from "react";
import { Button } from "antd";
import CreateTask from "./Modals/TaskDrawer/CreateTask";

const TestCreateTask: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Create Task
      </Button>
      <CreateTask visible={visible} onClose={closeDrawer} />
    </div>
  );
};

export default TestCreateTask;
