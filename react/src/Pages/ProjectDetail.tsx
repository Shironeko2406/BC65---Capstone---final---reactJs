// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Card, Col, Row, Typography, Avatar, Divider } from "antd";
// import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided  } from "react-beautiful-dnd";
// import { useDispatch, useSelector } from "react-redux";
// import { DispatchType, RootState } from "../Redux/store";
// import { GetProjectDetailByIdActionAsync } from "../Redux/Reducers/ProjectReducer";


// const { Text } = Typography;

// type Task = {
//   id: string;
//   priority: string;
//   assignee: string;
// };

// type Stage = {
//   title: string;
//   tasks: Task[];
// };

// type Props = {};

// const initialStages: Stage[] = [
//   { title: "BACKLOG", tasks: [{ id: "1k", priority: "High", assignee: "ML" }] },
//   {
//     title: "SELECTED FOR DEVELOPMENT",
//     tasks: [
//       { id: "189", priority: "High", assignee: "ML MN" },
//       { id: "190", priority: "Medium", assignee: "NM" },
//     ],
//   },
//   { title: "IN PROGRESS", tasks: [] },
//   { title: "DONE", tasks: [] },
// ];

// const reorder = (
//   list: Task[],
//   startIndex: number,
//   endIndex: number
// ): Task[] => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// };

// const move = (
//   stages: Stage[],
//   source: { droppableId: string; index: number },
//   destination: { droppableId: string; index: number }
// ) => {
//   const startStageIndex = stages.findIndex(
//     (stage) => stage.title === source.droppableId
//   );
//   const finishStageIndex = stages.findIndex(
//     (stage) => stage.title === destination.droppableId
//   );

//   const startStage = stages[startStageIndex];
//   const finishStage = stages[finishStageIndex];

//   if (!startStage || !finishStage) {
//     return stages;
//   }

//   const startTasks = Array.from(startStage.tasks);
//   const [movedTask] = startTasks.splice(source.index, 1);

//   if (source.droppableId === destination.droppableId) {
//     // Same stage
//     startTasks.splice(destination.index, 0, movedTask);
//     const updatedStages = [...stages];
//     updatedStages[startStageIndex] = { ...startStage, tasks: startTasks };
//     return updatedStages;
//   } else {
//     // Different stage
//     const finishTasks = Array.from(finishStage.tasks);
//     finishTasks.splice(destination.index, 0, movedTask);

//     const updatedStages = [...stages];
//     updatedStages[startStageIndex] = { ...startStage, tasks: startTasks };
//     updatedStages[finishStageIndex] = { ...finishStage, tasks: finishTasks };

//     return updatedStages;
//   }
// };

// const ProjectDetail: React.FC<Props> = (props: Props) => {
//   const params = useParams();
//   const { id } = params;
//   const [stages, setStages] = React.useState<Stage[]>(initialStages);
//   const dispatch: DispatchType = useDispatch();
//   const { projectDetailById } = useSelector(
//     (state: RootState) => state.ProjectReducer
//   );
//   console.log(projectDetailById)

//   useEffect(() => {
//       dispatch(GetProjectDetailByIdActionAsync(Number(id))); // Gọi action creator với id
//   }, [id]);

//   const onDragEnd = (result: DropResult) => {
//     const { destination, source } = result;
  
//     if (!destination) {
//       return;
//     }
  
//     if (source.droppableId === destination.droppableId && source.index === destination.index) {
//       return;
//     }
  
//     console.log('Before move:', stages);
//     const updatedStages = move(stages, source, destination);
//     console.log('After move:', updatedStages);
  
//     setStages(updatedStages);
//   };
  

//   return (
//     <div style={{ padding: 15 }}>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="all-stages" direction="horizontal">
//           {(provided: DroppableProvided) => (
//             <Row
//               gutter={[16, 16]}
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               {stages.map((stage, index) => (
//                 <Droppable
//                   droppableId={stage.title}
//                   key={stage.title}
//                   type="TASK"
//                 >
//                   {(provided: DroppableProvided) => (
//                     <Col
//                       span={6}
//                       ref={provided.innerRef}
//                       {...provided.droppableProps}
//                     >
//                       <Card
//                         title={<Text strong>{stage.title}</Text>}
//                         bordered={false}
//                         style={{
//                           border: `1px solid ${
//                             ["#1890ff", "#52c41a", "#faad14", "#eb2f96"][index]
//                           }`,
//                           borderRadius: "8px",
//                           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//                           marginBottom: 16,
//                         }}
//                       >
//                         {stage.tasks.length === 0 ? (
//                           <Text type="secondary">No tasks available</Text>
//                         ) : (
//                           stage.tasks.map((task, taskIndex) => (
//                             <Draggable
//                               draggableId={task.id}
//                               index={taskIndex}
//                               key={task.id}
//                             >
//                               {(provided: DraggableProvided) => (
//                                 <Card
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   style={{
//                                     marginBottom: 16,
//                                     borderRadius: "8px",
//                                     padding: 16,
//                                     border: `1px solid ${
//                                       [
//                                         "#1890ff",
//                                         "#52c41a",
//                                         "#faad14",
//                                         "#eb2f96",
//                                       ][index]
//                                     }`,
//                                     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                                     ...provided.draggableProps.style,
//                                   }}
//                                   bodyStyle={{ padding: 0 }}
//                                 >
//                                   <div style={{ marginBottom: 8 }}>
//                                     <Text strong>Task {task.id}</Text>
//                                   </div>
//                                   <Divider style={{ margin: "8px 0" }} />
//                                   <div
//                                     style={{
//                                       display: "flex",
//                                       justifyContent: "space-between",
//                                       alignItems: "center",
//                                     }}
//                                   >
//                                     <Text
//                                       type="danger"
//                                       style={{ fontWeight: 500 }}
//                                     >
//                                       {task.priority}
//                                     </Text>
//                                     <Avatar.Group maxCount={2}>
//                                       {task.assignee
//                                         .split(" ")
//                                         .map((assignee) => (
//                                           <Avatar
//                                             key={assignee}
//                                             style={{
//                                               backgroundColor: "#f56a00",
//                                               verticalAlign: "middle",
//                                             }}
//                                           >
//                                             {assignee[0]}
//                                           </Avatar>
//                                         ))}
//                                     </Avatar.Group>
//                                   </div>
//                                 </Card>
//                               )}
//                             </Draggable>
//                           ))
//                         )}
//                         {provided.placeholder}
//                       </Card>
//                     </Col>
//                   )}
//                 </Droppable>
//               ))}
//               {provided.placeholder}
//             </Row>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default ProjectDetail;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Typography, Avatar, Divider } from "antd";
import {DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../Redux/store";
import { GetProjectDetailByIdActionAsync } from "../Redux/Reducers/ProjectReducer";
import { Assignee, TaskDetail, TaskStatus } from "../Models/ProjectModalType";
import { Stage, Task } from "../Models/TaskModalType";

const { Text } = Typography;

type Props = {};

const reorder = (
  list: Task[],
  startIndex: number,
  endIndex: number
): Task[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (
  stages: Stage[],
  source: { droppableId: string; index: number },
  destination: { droppableId: string; index: number }
) => {
  const startStageIndex = stages.findIndex(
    (stage) => stage.title === source.droppableId
  );
  const finishStageIndex = stages.findIndex(
    (stage) => stage.title === destination.droppableId
  );

  const startStage = stages[startStageIndex];
  const finishStage = stages[finishStageIndex];

  if (!startStage || !finishStage) {
    return stages;
  }

  const startTasks = Array.from(startStage.tasks);
  const [movedTask] = startTasks.splice(source.index, 1);

  if (source.droppableId === destination.droppableId) {
    // Same stage
    startTasks.splice(destination.index, 0, movedTask);
    const updatedStages = [...stages];
    updatedStages[startStageIndex] = { ...startStage, tasks: startTasks };
    return updatedStages;
  } else {
    // Different stage
    const finishTasks = Array.from(finishStage.tasks);
    finishTasks.splice(destination.index, 0, movedTask);

    const updatedStages = [...stages];
    updatedStages[startStageIndex] = { ...startStage, tasks: startTasks };
    updatedStages[finishStageIndex] = { ...finishStage, tasks: finishTasks };

    return updatedStages;
  }
};

const ProjectDetail: React.FC<Props> = (props: Props) => {
  const params = useParams();
  const { id } = params;
  const [stages, setStages] = useState<Stage[]>([]);
  const dispatch: DispatchType = useDispatch();
  const { projectDetailById } = useSelector(
    (state: RootState) => state.ProjectReducer
  );

  useEffect(() => {
    dispatch(GetProjectDetailByIdActionAsync(Number(id)));
  }, [id]);

  useEffect(() => {
    if (projectDetailById) {
      // Transform the projectDetailById data into the format expected by stages
      const transformedStages: Stage[] = projectDetailById.lstTask.map(
        (taskStatus: TaskStatus) => ({
          title: taskStatus.statusName,
          tasks: taskStatus.lstTaskDeTail.map((taskDetail:TaskDetail) => ({
            id: taskDetail.taskId.toString(),
            taskName: taskDetail.taskName,
            priority: taskDetail.priorityTask.priority,
            assignees: taskDetail.assigness.map((assignee:Assignee) => ({
              id: assignee.id,
              avatar: assignee.avatar,
              name: assignee.name,
              alias: assignee.alias,
            })),
          })),
        })
      );
      setStages(transformedStages);
    }
  }, [projectDetailById]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedStages = move(stages, source, destination);
    setStages(updatedStages);
  };

  return (
    <div style={{ padding: 15 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-stages" direction="horizontal">
          {(provided: DroppableProvided) => (
            <Row
              gutter={[16, 16]}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {stages.map((stage, index) => (
                <Droppable
                  droppableId={stage.title}
                  key={stage.title}
                  type="TASK"
                >
                  {(provided: DroppableProvided) => (
                    <Col
                      span={6}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Card
                        title={<Text strong>{stage.title}</Text>}
                        bordered={false}
                        style={{
                          border: `1px solid ${
                            ["#1890ff", "#52c41a", "#faad14", "#eb2f96"][index]
                          }`,
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                          marginBottom: 16,
                        }}
                      >
                        {stage.tasks.length === 0 ? (
                          <Text type="secondary">No tasks available</Text>
                        ) : (
                          stage.tasks.map((task, taskIndex) => (
                            <Draggable
                              draggableId={task.id}
                              index={taskIndex}
                              key={task.id}
                            >
                              {(provided: DraggableProvided) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    marginBottom: 16,
                                    borderRadius: "8px",
                                    padding: 16,
                                    border: `1px solid ${
                                      [
                                        "#1890ff",
                                        "#52c41a",
                                        "#faad14",
                                        "#eb2f96",
                                      ][index]
                                    }`,
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                    ...provided.draggableProps.style,
                                  }}
                                  bodyStyle={{ padding: 0 }}
                                >
                                  <div style={{ marginBottom: 8 }}>
                                    <Text strong>{task.taskName}</Text>
                                  </div>
                                  <Divider style={{ margin: "8px 0" }} />
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Text
                                      type="danger"
                                      style={{ fontWeight: 500 }}
                                    >
                                      {task.priority}
                                    </Text>
                                    <Avatar.Group max={{ count: 1 }}>
                                      {task.assignees.map((assignee) => (
                                        <Avatar
                                          key={assignee.id}
                                          src={assignee.avatar}
                                        />
                                      ))}
                                    </Avatar.Group>
                                  </div>
                                </Card>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </Card>
                    </Col>
                  )}
                </Droppable>
              ))}
              {provided.placeholder}
            </Row>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ProjectDetail;

