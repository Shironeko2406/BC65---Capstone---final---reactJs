import React, { useEffect, useState } from "react";
import { Drawer, Form, Input, Select, Button, Row, Col } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { EditProjectProps } from "../../../Models/ProjectModalType";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../Redux/store";
import { ProjectCategory } from "../../../Models/ProjectCategoryModalType";
import { UpdateProjectActionAsync } from "../../../Redux/Reducers/ProjectReducer";
import { useLoading } from "../../../Contexts/LoadingContext";

const { Option } = Select;

const EditProject: React.FC<EditProjectProps> = ({
  visible,
  onClose,
  project,
}) => {
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState<string>("");
  const { projectCategory } = useSelector(
    (state: RootState) => state.ProjectCategoryReducer
  );
  const dispatch: DispatchType = useDispatch();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        id: project.id,
        projectName: project.projectName,
        categoryId: project.categoryId,
        description: project.description,
      });
      setEditorContent(project.description || "");
    }
  }, [project, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const dataUpdate = { ...values, description: editorContent };
        try {
          await dispatch(UpdateProjectActionAsync(dataUpdate.id, dataUpdate));
        } catch (error) {
        } finally {
          setLoading(false);
        }
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    form.setFieldsValue({ description: content });
  };

  return (
    <Drawer
      title="Edit Project"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={handleOk} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" name="editProjectForm">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="id" label="Project id">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="projectName"
              label="Project name"
              rules={[
                { required: true, message: "Please input the project name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="categoryId"
              label="Project Category"
              rules={[
                {
                  required: true,
                  message: "Please select a project category!",
                },
              ]}
            >
              <Select>
                {projectCategory.map((category: ProjectCategory) => (
                  <Option key={category.id} value={category.id}>
                    {category.projectCategoryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
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
      </Form>
    </Drawer>
  );
};

export default EditProject;
