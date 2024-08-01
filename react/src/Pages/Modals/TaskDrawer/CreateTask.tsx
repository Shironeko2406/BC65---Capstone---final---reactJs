// src/Modals/TaskDrawer.tsx
import React, { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Slider,
  Button,
  Tag,
  Row,
  Col,
  InputNumber,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";

const { Option } = Select;

interface TaskDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const TaskDrawer: React.FC<TaskDrawerProps> = ({ visible, onClose }) => {
  const [editorContent, setEditorContent] = useState("");
  const [assignees, setAssignees] = useState<string[]>([]);
  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleAssigneesChange = (value: string[]) => {
    setAssignees(value);
  };

  const handleSliderChange = (value: number) => {
    setTimetracking({
      ...timeTracking,
      timeTrackingSpent: value,
      timeTrackingRemaining:
        timeTracking.timeTrackingSpent +
        timeTracking.timeTrackingRemaining -
        value,
    });
  };

  const handleTimeSpentChange = (value: number | null) => {
    if (value !== null) {
      setTimetracking({
        ...timeTracking,
        timeTrackingSpent: value,
      });
    }
  };

  const handleTimeRemainingChange = (value: number | null) => {
    if (value !== null) {
      setTimetracking({
        ...timeTracking,
        timeTrackingRemaining: value,
      });
    }
  };

  const handleSubmit = () => {
    // Handle form submit logic
    console.log("Form submitted");
  };

  const handleCancel = () => {
    // Handle cancel logic
    onClose();
    console.log("Form cancelled");
  };

  useEffect(() => {
    if (!visible) {
      // Reset form and state when drawer is closed
      setEditorContent("");
      setAssignees([]);
      setTimetracking({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
      });
    }
  }, [visible]);

  const total =
    timeTracking.timeTrackingSpent + timeTracking.timeTrackingRemaining;

  return (
    <Drawer
      title="Create Task"
      placement="right"
      onClose={handleCancel}
      visible={visible}
      width={600}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Project Name">
              <Input value="Sample Project" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Task Name">
              <Input value="Sample Task" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Priority">
              <Select defaultValue="Medium">
                <Option value="High">High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Task Type">
              <Select defaultValue="Feature">
                <Option value="Feature">Feature</Option>
                <Option value="Bug">Bug</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Status">
              <Select defaultValue="Open">
                <Option value="Open">Open</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Closed">Closed</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Assignees">
              <Select
                mode="multiple"
                defaultValue={["John Doe", "Jane Smith"]}
                onChange={handleAssigneesChange}
              >
                <Option value="John Doe">John Doe</Option>
                <Option value="Jane Smith">Jane Smith</Option>
                <Option value="Mark Johnson">Mark Johnson</Option>
              </Select>
              <div style={{ marginTop: 8 }}>
                {assignees.map((assignee) => (
                  <Tag key={assignee}>{assignee}</Tag>
                ))}
              </div>
            </Form.Item>
            <Form.Item label="Original Estimate">
              <InputNumber min={0} value={10} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Time Tracking">
              <Slider
                max={total}
                value={timeTracking.timeTrackingSpent}
                onChange={handleSliderChange}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <div>Logged: {timeTracking.timeTrackingSpent}h</div>
                <div>Remaining: {timeTracking.timeTrackingRemaining}h</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
              >
                <div style={{ width: "45%" }}>
                  <label>Time Spent</label>
                  <InputNumber
                    min={0}
                    value={timeTracking.timeTrackingSpent}
                    onChange={handleTimeSpentChange}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ width: "45%" }}>
                  <label>Time Remaining</label>
                  <InputNumber
                    min={0}
                    value={timeTracking.timeTrackingRemaining}
                    onChange={handleTimeRemainingChange}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Description">
              <Editor
                apiKey="8ca3emh2vyuloam1fyejbbjecckndq0aahi6hf5pso51iduu"
                value={editorContent}
                onEditorChange={handleEditorChange}
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default TaskDrawer;
