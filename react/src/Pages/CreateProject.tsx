import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { FormCreateProject } from "../Models/ProjectModalType";
import { string } from "yup";

const { Option } = Select;

const CreateProject = () => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");

  const onEditorChange = (content: string) => {
    setDescription(content);
    form.setFieldsValue({ description: content });
  };

  const onFinish = (values: FormCreateProject) => {
    const formCreate = {
      ...values,
      description: description, // Replace the description with the state value
      alias: "My Project",
    };

    console.log(formCreate);
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
          <Option value="web">Dự án web</Option>
          <Option value="software">Dự án phần mềm</Option>
          <Option value="mobile">Dự án di động</Option>
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
