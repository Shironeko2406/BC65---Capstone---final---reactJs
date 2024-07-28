// import React, { useState } from "react";
// import { Drawer, Form, Input, Select, Button, Row, Col } from "antd";
// import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE editor

// const { Option } = Select;

// const EditProject = () => {
//   const [visible, setVisible] = useState(false);

//   const [form] = Form.useForm();

//   const showDrawer = () => {
//     setVisible(true);
//   };

//   const onClose = () => {
//     setVisible(false);
//   };

//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         console.log("Form values:", values);
//         setVisible(false);
//       })
//       .catch((info) => {
//         console.log("Validate Failed:", info);
//       });
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showDrawer}>
//         Edit Project
//       </Button>
//       <Drawer
//         title="Edit Project"
//         width={720}
//         onClose={onClose}
//         visible={visible}
//         bodyStyle={{ paddingBottom: 80 }}
//         footer={
//           <div
//             style={{
//               textAlign: "right",
//             }}
//           >
//             <Button onClick={onClose} style={{ marginRight: 8 }}>
//               Cancel
//             </Button>
//             <Button onClick={handleOk} type="primary">
//               Submit
//             </Button>
//           </div>
//         }
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           name="editProjectForm"
//           initialValues={{
//             projectId: "678",
//             projectName: "BigProject",
//             projectCategory: "Dự án web",
//           }}
//         >
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item name="projectId" label="Project id">
//                 <Input disabled />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="projectName"
//                 label="Project name"
//                 rules={[
//                   { required: true, message: "Please input the project name!" },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="projectCategory"
//                 label="Project Category"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please select a project category!",
//                   },
//                 ]}
//               >
//                 <Select>
//                   <Option value="Dự án web">Dự án web</Option>
//                   <Option value="Dự án mobile">Dự án mobile</Option>
//                   <Option value="Dự án khác">Dự án khác</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Form.Item name="description" label="Description">
//             <Editor
//               apiKey="8ca3emh2vyuloam1fyejbbjecckndq0aahi6hf5pso51iduu" // Replace with your TinyMCE API key
//             //   value={description}
//             //   onEditorChange={onEditorChange}
//               init={{
//                 height: 300,
//                 menubar: false,
//                 plugins: [
//                   "advlist autolink lists link image charmap print preview anchor",
//                   "searchreplace visualblocks code fullscreen",
//                   "insertdatetime media table paste code help wordcount",
//                 ],
//                 toolbar:
//                   "undo redo | formatselect | bold italic backcolor | \
//               alignleft aligncenter alignright alignjustify | \
//               bullist numlist outdent indent | removeformat | help",
//               }}
//             />
//           </Form.Item>
//         </Form>
//       </Drawer>
//     </>
//   );
// };

// export default EditProject;
import React, { useEffect, useState } from "react";
import { Drawer, Form, Input, Select, Button, Row, Col } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { EditProjectProps } from "../../../Models/ProjectModalType";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../Redux/store";
import { ProjectCategory } from "../../../Models/ProjectCategoryModalType";
import { UpdateProjectActionAsync } from "../../../Redux/Reducers/ProjectReducer";

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
      .then((values) => {
        const dataUpdate = { ...values, description: editorContent }
        dispatch(UpdateProjectActionAsync(dataUpdate.id, dataUpdate))
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
