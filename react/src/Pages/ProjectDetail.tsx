import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Typography, Avatar, Divider, Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../Redux/store";
import { GetProjectDetailByIdActionAsync, GetTaskDetailByIdActionAsync, UpdateStatusTaskActionAsync} from "../Redux/Reducers/ProjectReducer";
import { Assignee, Member, TaskDetail, TaskStatus } from "../Models/ProjectModalType";
import { Stage, Task } from "../Models/TaskModalType";
import { GetTaskTypeActionAsync } from "../Redux/Reducers/TaskTypeReducer";
import { GetStatusActionAsync } from "../Redux/Reducers/StatusReducer";
import { GetPriorityActionAsync } from "../Redux/Reducers/PriorityReducer";
import UpdateTask from "./Modals/TaskDrawer/UpdateTask";
import { getUserListByProjectIdActionAsync } from "../Redux/Reducers/UsersReducer";
import CreateTask from "./Modals/TaskDrawer/CreateTask"; // Import CreateTask
import { useLoading } from "../Contexts/LoadingContext";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false); // State for drawer visibility
  const dispatch: DispatchType = useDispatch();
  const { projectDetailById, projectName } = useSelector(
    (state: RootState) => state.ProjectReducer
  );
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          dispatch(GetProjectDetailByIdActionAsync(Number(id))),
          dispatch(GetTaskTypeActionAsync()),
          dispatch(GetStatusActionAsync()),
          dispatch(GetPriorityActionAsync()),
          dispatch(getUserListByProjectIdActionAsync(Number(id))),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id, setLoading]);

  // useEffect(() => {
  //   if (projectDetailById) {
  //     // Transform the projectDetailById data into the format expected by stages
  //     const transformedStages: Stage[] = projectDetailById.lstTask.map(
  //       (taskStatus: TaskStatus) => ({
  //         title: taskStatus.statusName,
  //         tasks: taskStatus.lstTaskDeTail.map((taskDetail: TaskDetail) => ({
  //           id: taskDetail.taskId,
  //           taskName: taskDetail.taskName,
  //           priority: taskDetail.priorityTask.priority,
  //           assignees: taskDetail.assigness.map((assignee: Assignee) => ({
  //             id: assignee.id,
  //             avatar: assignee.avatar,
  //             name: assignee.name,
  //             alias: assignee.alias,
  //           })),
  //         })),
  //       })
  //     );
  //     setStages(transformedStages);
  //   }
  // }, [projectDetailById]);


  useEffect(() => {
    if (projectDetailById) {
      // Lọc các assignees không còn trong projectDetailById.members
      const filteredStages: Stage[] = projectDetailById.lstTask.map(
        (taskStatus: TaskStatus) => ({
          title: taskStatus.statusName,
          tasks: taskStatus.lstTaskDeTail.map((taskDetail: TaskDetail) => {
            const validAssignees = taskDetail.assigness.filter((assignee: Assignee) =>
              projectDetailById.members.some((member: Member) => member.userId === assignee.id)
            );
  
            return {
              id: taskDetail.taskId,
              taskName: taskDetail.taskName,
              priority: taskDetail.priorityTask.priority,
              assignees: validAssignees.map((assignee: Assignee) => ({
                id: assignee.id,
                avatar: assignee.avatar,
                name: assignee.name,
                alias: assignee.alias,
              })),
            };
          }),
        })
      );
      setStages(filteredStages);
    }
  }, [projectDetailById]);
  

  const handleTaskClick = (taskId: number) => {
    dispatch(GetTaskDetailByIdActionAsync(taskId));
    setSelectedTaskId(taskId);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    // setSelectedTaskId(null);
  };

  const statusIdMap = (value: string): string => {
    switch (value) {
      case "BACKLOG":
        return "1";
      case "SELECTED FOR DEVELOPMENT":
        return "2";
      case "IN PROGRESS":
        return "3";
      case "DONE":
        return "4";
      default:
        console.error("Invalid status value:", value);
        return "";
    }
  };

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

    // ---------------------------------------------------------------

    // Nếu nhiệm vụ chỉ được di chuyển trong cùng một bảng, không cần gọi dispatch
    if (source.droppableId !== destination.droppableId) {
      // Determine new statusId
      const newStatusId = statusIdMap(destination.droppableId);
      const taskId = Number(result.draggableId);
      dispatch(UpdateStatusTaskActionAsync(taskId, newStatusId, Number(id)));
    }
  };

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
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
                              draggableId={task.id.toString()}
                              index={taskIndex}
                              key={task.id}
                            >
                              {(provided: DraggableProvided) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onClick={() => handleTaskClick(task.id)}
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
                                    <Text strong>{task.id}</Text>
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

        <UpdateTask
          projectId={Number(id)}
          taskId={selectedTaskId}
          onClose={handleModalCancel}
          visible={isModalVisible}
        />
      </DragDropContext>

      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        size="large"
        onClick={openDrawer}
        style={{
          position: "fixed",
          bottom: 120,
          right: 30,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      />

      <CreateTask
        visible={drawerVisible}
        onClose={closeDrawer}
        projectName={projectName}
      />
    </div>
  );
};

export default ProjectDetail;
