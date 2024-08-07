import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { FormCreateProject } from "../Models/ProjectModalType";
import { GetProjectCategoryActionAsync } from "../Redux/Reducers/ProjectCategoryReducer";
import { DispatchType, RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ProjectCategory } from "../Models/ProjectCategoryModalType";
import { CreateProjectActionAsync } from "../Redux/Reducers/ProjectReducer";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../Contexts/LoadingContext";

const { Option } = Select;

const CreateProject = () => {
  const { setLoading } = useLoading();
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();
  const { projectCategory } = useSelector(
    (state: RootState) => state.ProjectCategoryReducer
  );

  useEffect(() => {
    setLoading(true);
    dispatch(GetProjectCategoryActionAsync()).finally(() => setLoading(false));
  }, [dispatch, setLoading]);

  const [form] = Form.useForm();
  const [description, setDescription] = useState("");

  const onEditorChange = (content: string) => {
    setDescription(content);
    form.setFieldsValue({ description: content });
  };

  const onFinish = async (values: FormCreateProject) => {
    setLoading(true);
    try {
      const formCreate = {
        ...values,
        description: description,
        alias: "My Project",
      };

      const actionAsync = CreateProjectActionAsync(formCreate);
      await dispatch(actionAsync);
      navigate("/home/project");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ description: "" }}
    >
      <Form.Item
        label="Name"
        name="projectName"
        rules={[{ required: true, message: "Please input the project name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input the project description!" },
        ]}
      >
        <Editor
          apiKey="8ca3emh2vyuloam1fyejbbjecckndq0aahi6hf5pso51iduu" // Replace with your TinyMCE API key
          value={description}
          onEditorChange={onEditorChange}
          init={{
            height: 300,
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

      <Form.Item
        label="Project Type"
        name="categoryId"
        rules={[{ required: true, message: "Please select the project type!" }]}
      >
        <Select placeholder="Select a project type">
          {projectCategory.map((category: ProjectCategory) => (
            <Option key={category.id} value={category.id}>
              {category.projectCategoryName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProject;
