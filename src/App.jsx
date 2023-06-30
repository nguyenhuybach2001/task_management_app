import React, { useState } from "react";
import "./App.scss";
import { Button, Card, Popconfirm } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import ModalAdd from "./components/ModalAdd/ModalAdd";
import { useDispatch, useSelector } from "react-redux";
import { clearTaskAction } from "./redux/taskReducer/taskActions";

export default function App() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const clearTask = (index) => {
    dispatch(clearTaskAction(index));
  };
  console.log(tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  const [selectedTask, setSelectedTask] = useState(null);
  const editTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const currentDate = new Date();
  return (
    <div className="container  text-center  mx-auto">
      <h1>Task Management App</h1>
      <div className="grid mt-10 grid-cols-4 gap-5">
        {tasks.map((item, index) => (
          <Card
            bodyStyle={{ padding: 0 }}
            className={`shadow-lg ${
              currentDate > item.date[1] && item.status !== "c"
                ? "bg-red-100"
                : null
            } `}
            key={item.id}
            title={item.title}
            actions={[
              <Popconfirm
                key="clear"
                title="Are you sure you want to clear this task?"
                onConfirm={() => clearTask(index)}
                okText="Yes"
                cancelText="No"
              >
                <div className="text-red-600 font-medium">Clear</div>
              </Popconfirm>,
              <div
                key="edit"
                onClick={() => editTask(item)}
                className="text-blue-600 font-medium"
              >
                Edit
              </div>,
            ]}
          >
            <p className="text-base mb-0">
              {item.date[0].format("DD/MM/YYYY")} -{" "}
              {item.date[1].format("DD/MM/YYYY")}
            </p>
            {currentDate > item.date[1] && item.status !== "c" ? (
              <p className="overdue absolute top-0 -rotate-45">Overdue</p>
            ) : null}
            <p>
              {(() => {
                switch (item.status) {
                  case "a":
                    return (
                      <div>
                        <ExclamationCircleOutlined className="text-red-600" />{" "}
                        Do not
                      </div>
                    );
                  case "b":
                    return (
                      <div>
                        <SyncOutlined spin className="text-blue-600" /> In
                        process
                      </div>
                    );
                  case "c":
                    return (
                      <div>
                        <CheckCircleOutlined className="text-green-600" /> Done
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
            </p>
          </Card>
        ))}
      </div>
      <div className="fixed bottom-5 right-5">
        <Button
          type="primary"
          size="large"
          shape="circle"
          onClick={showModal}
          icon={<PlusOutlined />}
        />
      </div>
      <ModalAdd
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        selectedTask={selectedTask}
      />
    </div>
  );
}
