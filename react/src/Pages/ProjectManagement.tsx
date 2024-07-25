// import React, { useEffect } from 'react';
// import { Table, Button, Tag } from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { DispatchType, RootState } from '../Redux/store';
// import { GetProjectAllActionAsync } from '../Redux/Reducers/ProjectReducer';

// const ProjectManagement = () => {
//     const { projectList } = useSelector((state: RootState) => state.ProjectReducer)
//     console.log(projectList)
//     const dispatch: DispatchType = useDispatch()

//     useEffect(() => {
//         dispatch(GetProjectAllActionAsync());
//     }, []);

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Project Name',
//       dataIndex: 'projectName',
//       key: 'projectName',
//       render: text => <a>{text}</a>,
//     },
//     {
//       title: 'Category',
//       dataIndex: 'category',
//       key: 'category',
//     },
//     {
//       title: 'Creator',
//       dataIndex: 'creator',
//       key: 'creator',
//       render: creator => <Tag color="green">{creator}</Tag>,
//     },
//     {
//       title: 'Members',
//       dataIndex: 'members',
//       key: 'members',
//       render: members => (
//         <>
//           {members.map(member => (
//             <Tag key={member} color="blue">
//               {member}
//             </Tag>
//           ))}
//           <Button type="dashed" shape="circle" icon="+" />
//         </>
//       ),
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <span>
//           <Button type="primary" shape="circle" icon={<EditOutlined />} />
//           <Button danger shape="circle" icon={<DeleteOutlined />} />
//         </span>
//       ),
//     },
//   ];

//   const data = [
//     {
//       key: '1',
//       id: '678',
//       projectName: 'BigProject',
//       category: 'Dự án web',
//       creator: 'Thanh Quy',
//       members: ['TN', 'TQ'],
//     },

//     // Add more data here...
//   ];

//   return (
//     <Table columns={columns} dataSource={data} />
//   );
// };

// export default ProjectManagement;

import React, { useEffect } from "react";
import { Table, Button, Tag, Avatar, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../Redux/store";
import { GetProjectAllActionAsync } from "../Redux/Reducers/ProjectReducer";
import { Creator, Member } from "../Models/ProjectModalType";

const ProjectManagement = () => {
  const { projectList } = useSelector(
    (state: RootState) => state.ProjectReducer
  );
  console.log(projectList);
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    dispatch(GetProjectAllActionAsync());
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (creator: Creator) => <Tag color="green">{creator.name}</Tag>,
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members:Member[]) => {
        const maxVisibleAvatars = 2;
        const visibleMembers = members.slice(0, maxVisibleAvatars);
        const hiddenMembersCount = members.length - maxVisibleAvatars;

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {visibleMembers.map((member:Member, index: number) => (
                    <div
                        key={member.userId}
                        style={{
                            position: 'relative',
                            marginLeft: index > 0 ? -12 : 0, // Overlap avatars
                            zIndex: visibleMembers.length - index, // Stack avatars
                        }}
                    >
                        <Avatar src={member.avatar} size="large" />
                    </div>
                ))}
                {hiddenMembersCount > 0 && (
                    <Tooltip
                        title={
                            <div>
                                {members.slice(maxVisibleAvatars).map(member => (
                                    <div key={member.userId} style={{ marginBottom: 8 }}>
                                        <Avatar src={member.avatar} size="small" />
                                        <span style={{ marginLeft: 8 }}>{member.name}</span>
                                    </div>
                                ))}
                            </div>
                        }
                    >
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: -12,
                                zIndex: 0,
                            }}
                        >
                            <Avatar style={{ backgroundColor: '#f56a00' }} size="large">
                                +{hiddenMembersCount}
                            </Avatar>
                        </span>
                    </Tooltip>
                )}
                <Button type="dashed" shape="circle" icon="+" />
            </div>
        );
    },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <span>
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={projectList} rowKey="id" />;
};

export default ProjectManagement;
