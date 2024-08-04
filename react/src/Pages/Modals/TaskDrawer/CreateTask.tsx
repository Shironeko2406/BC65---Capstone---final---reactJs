import React, { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Slider,
  Button,
  Row,
  Col,
  InputNumber,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { RootState, DispatchType } from "../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { SelectProps } from "antd";
import { Priority } from "../../../Models/PriorityModalType";
import { Status } from "../../../Models/StatusModalType";
import { TaskType } from "../../../Models/TaskTypeModalType";
import { UserInfo } from "../../../Models/UserModalType";
import { GetPriorityActionAsync } from "../../../Redux/Reducers/PriorityReducer";
import { GetStatusActionAsync } from "../../../Redux/Reducers/StatusReducer";
import { GetTaskTypeActionAsync } from "../../../Redux/Reducers/TaskTypeReducer";
import { getUserListByProjectIdActionAsync } from "../../../Redux/Reducers/UsersReducer";
import { CreateTaskActionAsync } from "../../../Redux/Reducers/ProjectReducer";

interface TaskDrawerProps {
  visible: boolean;
  onClose: () => void;
  projectName: string;
}

const TaskDrawer: React.FC<TaskDrawerProps> = ({
  visible,
  onClose,
  projectName,
}) => {
  const [editorContent, setEditorContent] = useState("");
  const [form] = Form.useForm();
  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const dispatch: DispatchType = useDispatch();
  const params = useParams();
  const { id } = params;

  const { userListByProjectId } = useSelector(
    (state: RootState) => state.UsersReducer
  );
  const { priorityList } = useSelector(
    (state: RootState) => state.PriorityReducer
  );
  const { taskTypeList } = useSelector(
    (state: RootState) => state.TaskTypeReducer
  );
  const { statusList } = useSelector((state: RootState) => state.StatusReducer);

  useEffect(() => {
    if (visible) {
      dispatch(GetPriorityActionAsync());
      dispatch(GetTaskTypeActionAsync());
      dispatch(GetStatusActionAsync());
      dispatch(getUserListByProjectIdActionAsync(Number(id)));
    }
  }, [visible, dispatch, id]);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
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
    form
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
          listUserAsign: values.assignees,
          description: editorContent,
          timeTrackingSpent: timeTracking.timeTrackingSpent,
          timeTrackingRemaining: timeTracking.timeTrackingRemaining,
          projectId: Number(id),
        };
        dispatch(CreateTaskActionAsync(data));
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
    setEditorContent("");
    setTimetracking({
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
    });
  };

  useEffect(() => {
    if (!visible) {
      setEditorContent("");
      setTimetracking({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
      });
    }
  }, [visible]);

  const total =
    timeTracking.timeTrackingSpent + timeTracking.timeTrackingRemaining;

  const priorityOptions: SelectProps["options"] = priorityList.map(
    (priority: Priority) => ({
      label: priority.priority,
      value: priority.priorityId,
    })
  );

  const taskTypeOptions: SelectProps["options"] = taskTypeList.map(
    (taskType: TaskType) => ({
      label: taskType.taskType,
      value: taskType.id,
    })
  );

  const statusOptions: SelectProps["options"] = statusList.map(
    (status: Status) => ({
      label: status.statusName,
      value: status.statusId,
    })
  );

  const assigneeOptions: SelectProps["options"] = userListByProjectId.map(
    (assignee: UserInfo) => ({
      label: assignee.name,
      value: assignee.userId,
    })
  );

  return (
    <Drawer
      title="Create Task"
      placement="right"
      onClose={handleCancel}
      visible={visible}
      width={600}
    >
      <Form form={form} layout="vertical" name="createTaskForm">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Project Name">
              <Input value={projectName} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Task Name"
              name="taskName"
              rules={[{ required: true, message: "Please enter task name" }]}
            >
              <Input placeholder="Enter task name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Priority"
              name="priorityId"
              rules={[{ required: true, message: "Please select priority" }]}
            >
              <Select placeholder="Select priority" options={priorityOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Task Type"
              name="typeId"
              rules={[{ required: true, message: "Please select task type" }]}
            >
              <Select
                placeholder="Select task type"
                options={taskTypeOptions}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Status"
              name="statusId"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select status" options={statusOptions} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Assignees"
              name="assignees"
              rules={[{ required: true, message: "Please select assignees" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select assignees"
                onChange={handleChange}
                options={assigneeOptions}
                onSelect={(value) => {
                  console.log(value);
                }}
              />
            </Form.Item>
            <Form.Item label="Original Estimate" name="originalEstimate">
              <InputNumber
                min={0}
                placeholder="Original estimate"
                style={{ width: "100%" }}
                type="number"
              />
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
                    type="number"
                  />
                </div>
                <div style={{ width: "45%" }}>
                  <label>Time Remaining</label>
                  <InputNumber
                    min={0}
                    value={timeTracking.timeTrackingRemaining}
                    onChange={handleTimeRemainingChange}
                    style={{ width: "100%" }}
                    type="number"
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
