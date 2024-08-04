// import React, { useState } from "react";
// import {Modal, Form, Input, Select, Button, Slider, InputNumber, Avatar, Row, Col} from "antd";
// import { PlusOutlined, DeleteOutlined, LinkOutlined, MessageOutlined,} from "@ant-design/icons";
// import { Editor } from "@tinymce/tinymce-react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../Redux/store";
// import { TaskType } from "../../../Models/TaskTypeModalType";
// import { Status } from "../../../Models/StatusModalType";
// import { Priority } from "../../../Models/PriorityModalType";

// const { Option } = Select;
// const { TextArea } = Input;

// const UpdateTask = () => {
//   const { taskTypeList } = useSelector(
//     (state: RootState) => state.TaskTypeReducer
//   );
//   const { statusList } = useSelector((state: RootState) => state.StatusReducer);
//   const { priorityList } = useSelector(
//     (state: RootState) => state.PriorityReducer
//   );
//   const [visible, setVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [assignees, setAssignees] = useState([
//     "Bosh",
//     "kaitokid",
//     "devfe",
//     "Nguyễn Đức",
//     "Nhật",
//   ]);
//   const [timeTracking, setTimeTracking] = useState({
//     timeTrackingSpent: 0,
//     timeTrackingRemaining: 0,
//   });
//   const [editorContent, setEditorContent] = useState<string>("");

//   const total =
//     timeTracking.timeTrackingSpent + timeTracking.timeTrackingRemaining;

//   const handleAssigneesChange = (value) => {
//     setAssignees(value);
//   };

//   const handleSliderChange = (value) => {
//     setTimeTracking({ ...timeTracking, timeTrackingSpent: value });
//   };

//   const handleTimeSpentChange = (value) => {
//     setTimeTracking({ ...timeTracking, timeTrackingSpent: value });
//   };

//   const handleTimeRemainingChange = (value) => {
//     setTimeTracking({ ...timeTracking, timeTrackingRemaining: value });
//   };

//   const handleEditorChange = (content: string) => {
//     setEditorContent(content);
//     form.setFieldsValue({ description: content });
//   };

//   const showModal = () => {
//     setVisible(true);
//   };

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Edit Task
//       </Button>
//       <Modal
//         title="Task Detail"
//         visible={visible}
//         onCancel={handleCancel}
//         width={800}
//         footer={[
//           <Button key="cancel" onClick={handleCancel}>
//             Cancel
//           </Button>,
//           <Button key="save" type="primary">
//             Save
//           </Button>,
//         ]}
//       >
//         <Form form={form} layout="vertical">
//           <Row justify="space-between" align="middle">
//             <Col>
//               <Form.Item name="type" noStyle>
//                 <Select
//                   style={{ marginRight: 8, width: 100 }}
//                   placeholder="Select a Task type"
//                 >
//                   {taskTypeList.map((type: TaskType) => (
//                     <Option key={type.id} value={type.taskType}>
//                       {type.taskType}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <span>TASK-8508</span>
//             </Col>
//             <Col>
//               <Button icon={<MessageOutlined />} type="link">
//                 Give feedback
//               </Button>
//               <Button icon={<LinkOutlined />} type="link">
//                 Copy link
//               </Button>
//               <Button icon={<DeleteOutlined />} type="link">
//                 Delete
//               </Button>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={16}>
//               <Form.Item name="taskName" label="Task Name">
//                 <Input defaultValue="Demo task 1234" />
//               </Form.Item>
//               <Form.Item name="description" label="Description">
//                 <Editor
//                   apiKey="8ca3emh2vyuloam1fyejbbjecckndq0aahi6hf5pso51iduu"
//                   value={editorContent}
//                   onEditorChange={handleEditorChange}
//                   init={{
//                     height: 200,
//                     menubar: false,
//                     plugins: [
//                       "advlist autolink lists link image charmap print preview anchor",
//                       "searchreplace visualblocks code fullscreen",
//                       "insertdatetime media table paste code help wordcount",
//                     ],
//                     toolbar:
//                       "undo redo | formatselect | bold italic backcolor | \
//                       alignleft aligncenter alignright alignjustify | \
//                       bullist numlist outdent indent | removeformat | help",
//                   }}
//                 />
//               </Form.Item>
//               <Form.Item name="comment" label="Comment">
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <Avatar style={{ backgroundColor: "#87d068" }}>DN</Avatar>
//                   <Input
//                     style={{ marginLeft: 8 }}
//                     placeholder="Comment here..."
//                   />
//                 </div>
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item name="status" label="STATUS">
//                 <Select placeholder="Select a Status">
//                   {statusList.map((status: Status) => (
//                     <Option key={status.statusId} value={status.statusName}>
//                       {status.statusName}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item name="assignees" label="Assignees">
// <Select
//   mode="multiple"
//   defaultValue={assignees}
//   onChange={handleAssigneesChange}
//   dropdownRender={(menu) => (
//     <>
//       {menu}
//       <Button
//         type="link"
//         icon={<PlusOutlined />}
//         onClick={() => {}}
//       >
//         ADD MORE
//       </Button>
//     </>
//   )}
// >
//   {assignees.map((assignee) => (
//     <Option key={assignee}>{assignee}</Option>
//   ))}
// </Select>
//               </Form.Item>
//               <Form.Item name="priority" label="Priority">
//                 <Select placeholder="Select a Priority">
//                   {priorityList.map((priority:Priority) => (
//                     <Option
//                       key={priority.priorityId}
//                       value={priority.priority.toLowerCase()}
//                     >
//                       {priority.priority}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item
//                 name="originalEstimate"
//                 label="Original estimate (hours)"
//               >
//                 <Input defaultValue="23" />
//               </Form.Item>
//               <Form.Item label="Time Tracking">
//                 <Slider
//                   max={total}
//                   value={timeTracking.timeTrackingSpent}
//                   onChange={handleSliderChange}
//                 />
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 8,
//                   }}
//                 >
//                   <div>Logged: {timeTracking.timeTrackingSpent}h</div>
//                   <div>Remaining: {timeTracking.timeTrackingRemaining}h</div>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 16,
//                   }}
//                 >
//                   <div style={{ width: "45%" }}>
//                     <label>Time Spent</label>
//                     <InputNumber
//                       min={0}
//                       value={timeTracking.timeTrackingSpent}
//                       onChange={handleTimeSpentChange}
//                       style={{ width: "100%" }}
//                     />
//                   </div>
//                   <div style={{ width: "45%" }}>
//                     <label>Time Remaining</label>
//                     <InputNumber
//                       min={0}
//                       value={timeTracking.timeTrackingRemaining}
//                       onChange={handleTimeRemainingChange}
//                       style={{ width: "100%" }}
//                     />
//                   </div>
//                 </div>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default UpdateTask;

import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Slider,
  InputNumber,
  Avatar,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  LinkOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../Redux/store";
import { TaskType } from "../../../Models/TaskTypeModalType";
import { Status } from "../../../Models/StatusModalType";
import { Priority } from "../../../Models/PriorityModalType";
import { useDispatch } from "react-redux";
import { UpdateTaskActionAsync } from "../../../Redux/Reducers/ProjectReducer";
import { Assignee, Member } from "../../../Models/ProjectModalType";

const { Option } = Select;
const { TextArea } = Input;

type Props = {
  projectId: number
  taskId: number | null;
  onClose: () => void;
  visible: boolean;
};

const UpdateTask: React.FC<Props> = ({projectId, taskId, onClose, visible }) => {
  const dispatch: DispatchType = useDispatch();
  const { taskTypeList } = useSelector(
    (state: RootState) => state.TaskTypeReducer
  );
  const { statusList } = useSelector((state: RootState) => state.StatusReducer);
  const { priorityList } = useSelector(
    (state: RootState) => state.PriorityReducer
  );
  const { taskDetail } = useSelector(
    (state: RootState) => state.ProjectReducer
  );
  const { userListByProjectId } = useSelector(
    (state: RootState) => state.UsersReducer
  );
  const [form] = Form.useForm();
  const [assignees, setAssignees] = useState<number[]>([]);
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const [editorContent, setEditorContent] = useState<string>("");

  const total =
    timeTracking.timeTrackingSpent + timeTracking.timeTrackingRemaining;

  useEffect(() => {
    if (taskDetail) {
      form.setFieldsValue({
        taskName: taskDetail.taskName,
        description: taskDetail.description,
        typeId: taskDetail.typeId,
        statusId: taskDetail.statusId,
        listUserAsign: taskDetail.assigness.map((assignee: Assignee) => assignee.id),
        priorityId: taskDetail.priorityId,
        originalEstimate: taskDetail.originalEstimate,
        // timeTrackingSpent: taskDetail.timeTrackingSpent,
        // timeTrackingRemaining: taskDetail.timeTrackingRemaining,
      });
      setAssignees(taskDetail.assigness.map((assignee: Assignee) => assignee.id));
      setTimeTracking({
        timeTrackingSpent: taskDetail.timeTrackingSpent,
        timeTrackingRemaining: taskDetail.timeTrackingRemaining,
      });
      setEditorContent(taskDetail.description || "");
    }
  }, [taskDetail, form]);

  const handleAssigneesChange = (value: number[]) => {
    setAssignees(value);
    form.setFieldsValue({ assignees: value });
  };

  const handleSliderChange = (value: number) => {
    setTimeTracking({ ...timeTracking, timeTrackingSpent: value });
  };

  const handleTimeSpentChange = (value: number | null) => {
    setTimeTracking((prev) => ({
      ...prev,
      timeTrackingSpent: value ?? 0,
    }));
    form.setFieldsValue({ timeTrackingSpent: value });
  };

  const handleTimeRemainingChange = (value: number | null) => {
    setTimeTracking((prev) => ({
      ...prev,
      timeTrackingRemaining: value ?? 0,
    }));
    form.setFieldsValue({ timeTrackingRemaining: value });
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    form.setFieldsValue({ description: content });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (taskId !== null) {
        // dispatch(UpdateTaskActionAsync({ ...values, taskId }));
        const dataUpdate = {
          ...values,
          description: editorContent,
          timeTrackingSpent: timeTracking.timeTrackingSpent,
          timeTrackingRemaining: timeTracking.timeTrackingRemaining,
          projectId: projectId,
          taskId: taskId.toString()
        };
        dispatch(UpdateTaskActionAsync(dataUpdate))
        onClose();
      }
    });
  };

  return (
    <>
      <Modal
        title="Update Task"
        visible={visible}
        onCancel={onClose}
        width={800}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Row justify="space-between" align="middle">
            <Col>
              <Form.Item name="typeId" noStyle>
                <Select
                  style={{ marginRight: 8, width: 200 }}
                  placeholder="Select a Task type"
                >
                  {taskTypeList.map((type: TaskType) => (
                    <Option key={type.id} value={type.id}>
                      {type.taskType}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <span>TASK-{taskId}</span>
            </Col>
            <Col>
              <Button icon={<MessageOutlined />} type="link">
                Give feedback
              </Button>
              <Button icon={<LinkOutlined />} type="link">
                Copy link
              </Button>
              <Button icon={<DeleteOutlined />} type="link">
                Delete
              </Button>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="taskName" label="Task Name">
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
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
              <Form.Item name="comment" label="Comment">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar style={{ backgroundColor: "#87d068" }}>DN</Avatar>
                  <Input
                    style={{ marginLeft: 8 }}
                    placeholder="Comment here..."
                  />
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="statusId" label="STATUS">
                <Select placeholder="Select a Status">
                  {statusList.map((status: Status) => (
                    <Option key={status.statusId} value={status.statusId}>
                      {status.statusName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="listUserAsign" label="Assignees">
                <Select
                  mode="multiple"
                  placeholder="Select assignees"
                  onChange={handleAssigneesChange}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Button
                        type="link"
                        icon={<PlusOutlined />}
                        onClick={() => {}}
                      >
                        ADD MORE
                      </Button>
                    </>
                  )}
                >
                  {userListByProjectId.map((user:Member) => (
                    <Option key={user.userId} value={user.userId}>
                      <Avatar src={user.avatar} size="small" />
                      {user.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="priorityId" label="Priority">
                <Select placeholder="Select a Priority">
                  {priorityList.map((priority: Priority) => (
                    <Option
                      key={priority.priorityId}
                      value={priority.priorityId}
                    >
                      {priority.priority}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="originalEstimate"
                label="Original estimate (hours)"
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item label="Time Tracking">
                <Slider
                  max={
                    timeTracking.timeTrackingSpent +
                    timeTracking.timeTrackingRemaining
                  }
                  value={timeTracking.timeTrackingSpent}
                  onChange={(value) =>
                    form.setFieldsValue({ timeTrackingSpent: value })
                  }
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
        </Form>
      </Modal>
    </>
  );
};

export default UpdateTask;
