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
  DeleteOutlined,
  FileExcelOutlined,
  DownloadOutlined,
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
import * as XLSX from "xlsx";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

const { Option } = Select;
const { TextArea } = Input;

type Props = {
  projectId: number;
  taskId: number | null;
  onClose: () => void;
  visible: boolean;
};

const UpdateTask: React.FC<Props> = ({
  projectId,
  taskId,
  onClose,
  visible,
}) => {
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
        listUserAsign: taskDetail.assigness.map(
          (assignee: Assignee) => assignee.id
        ),
        priorityId: taskDetail.priorityId,
        originalEstimate: taskDetail.originalEstimate,
        // timeTrackingSpent: taskDetail.timeTrackingSpent,
        // timeTrackingRemaining: taskDetail.timeTrackingRemaining,
      });
      setAssignees(
        taskDetail.assigness.map((assignee: Assignee) => assignee.id)
      );
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
          taskId: taskId.toString(),
        };
        dispatch(UpdateTaskActionAsync(dataUpdate));
        onClose();
      }
    });
  };

  const handleExportExcel = () => {
    if (taskDetail) {
      // Chuyển đổi dữ liệu thành định dạng phù hợp cho Excel
      const data = {
        TaskId: taskDetail.taskId,
        TaskName: taskDetail.taskName,
        Description: taskDetail.description,
        Priority: taskDetail.priorityTask.priority,
        PriorityId: taskDetail.priorityTask.priorityId,
        TaskType: taskDetail.taskTypeDetail.taskType,
        TypeId: taskDetail.taskTypeDetail.id,
        StatusId: taskDetail.statusId,
        OriginalEstimate: taskDetail.originalEstimate,
        TimeTrackingSpent: taskDetail.timeTrackingSpent,
        TimeTrackingRemaining: taskDetail.timeTrackingRemaining,
        Assignees: taskDetail.assigness.map((assignee: Assignee) => `${assignee.name} (${assignee.alias})`).join(", "),
        // Thêm các thuộc tính khác nếu cần
      };
  
      // Chuyển đổi dữ liệu thành worksheet
      const worksheet = XLSX.utils.json_to_sheet([data]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "TaskDetail");
  
      // Tạo buffer và lưu file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const file = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(file, `taskDetail-${taskId}.xlsx`);
    }
  };

  const handleExportWord = () => {
    if (taskDetail) {
      // Tạo nội dung cho tài liệu Word
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: "Task Report",
                heading: HeadingLevel.HEADING_1,
              }),
              new Paragraph({
                text: `Task ID: ${taskDetail.taskId}`,
              }),
              new Paragraph({
                text: `Task Name: ${taskDetail.taskName}`,
              }),
              new Paragraph({
                text: `Description:`,
              }),
              new Paragraph({
                children: [new TextRun(taskDetail.description)],
              }),
              new Paragraph({
                text: `Priority: ${taskDetail.priorityTask.priority}`,
              }),
              new Paragraph({
                text: `Priority ID: ${taskDetail.priorityTask.priorityId}`,
              }),
              new Paragraph({
                text: `Task Type: ${taskDetail.taskTypeDetail.taskType}`,
              }),
              new Paragraph({
                text: `Type ID: ${taskDetail.taskTypeDetail.id}`,
              }),
              new Paragraph({
                text: `Status ID: ${taskDetail.statusId}`,
              }),
              new Paragraph({
                text: `Original Estimate: ${taskDetail.originalEstimate}`,
              }),
              new Paragraph({
                text: `Time Tracking Spent: ${taskDetail.timeTrackingSpent}`,
              }),
              new Paragraph({
                text: `Time Tracking Remaining: ${taskDetail.timeTrackingRemaining}`,
              }),
              new Paragraph({
                text: `Assignees: ${taskDetail.assigness.map(
                  (assignee:Assignee) => `${assignee.name} (${assignee.alias})`
                ).join(", ")}`,
              }),
            ],
          },
        ],
      });
  
      // Tạo buffer và lưu file
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "taskDetail.docx");
      });
    }
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
              <Button icon={<DownloadOutlined />} type="link" onClick={handleExportWord}>
                Download report
              </Button>
              <Button
                icon={<FileExcelOutlined />}
                type="link"
                onClick={handleExportExcel}
              >
                Export Excel
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
                  filterOption={(inputValue, option) => {
                    if (!option || !option.props || !option.props.children) {
                      return false;
                    }
                    const children = option.props.children as React.ReactNode;
                    return React.Children.toArray(children)
                      .join(" ")
                      .toLowerCase()
                      .includes(inputValue.toLowerCase());
                  }}
                  dropdownRender={(menu) => <>{menu}</>}
                >
                  {userListByProjectId.map((user: Member) => (
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
