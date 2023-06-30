import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";

import { Button, DatePicker, Form, Input, Modal, Radio } from "antd";
import {
  PlusOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  addTaskAction,
  editTaskAction,
} from "../../redux/taskReducer/taskActions";

export default function ModalAdd(props) {
  const [form] = Form.useForm();
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState([]);
  const dispatch = useDispatch();
  const [valueList, setValueList] = useState("");
  const onFinish = (values) => {
    if (props.selectedTask) {
      const updatedTask = {
        ...props.selectedTask,
        title: values.title,
        content: taskList,
        status: values.status,
        date: values.date,
      };
      setTask([{ ...updatedTask }]);
      dispatch(editTaskAction(updatedTask));
    } else {
      const newTask = {
        id: task.length,
        title: values.title,
        content: taskList,
        status: values.status,
        date: values.date,
      };
      setTask([...task, newTask]);
      dispatch(addTaskAction(newTask));
    }
    setTaskList([]);
    form.resetFields();
    props.handleCancel();
  };
  useEffect(() => {
    if (props.selectedTask) {
      const { id, title, content, status, date } = props.selectedTask;
      setTaskList(content);
      setTask([{ id, title, status, date }]);
      form.setFieldsValue({ title, status, date });
    }
  }, [props.selectedTask, form]);
  const addTask = async () => {
    try {
      await form.validateFields(["task"]);
      const values = form.getFieldsValue(["task"]);
      const taskValue = values.task;
      setTaskList([...taskList, taskValue]);
      form.resetFields(["task"]);
      setValueList("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleCancel = () => {
    setTaskList([]);
    form.resetFields();
    setValueList("");
    props.handleCancel();
  };
  const handleChangeValueList = (e) => {
    setValueList(e.target.value);
  };
  const removeTask = (index) => {
    const updatedListTask = [...taskList];
    updatedListTask.splice(index, 1);
    setTaskList(updatedListTask);
  };
  const { RangePicker } = DatePicker;
  return (
    <Modal
      footer={false}
      title="Add Task"
      open={props.isModalOpen}
      closable={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item name="task" label="Task">
          <Input placeholder="Enter task" onChange={handleChangeValueList} />
        </Form.Item>
        <div className=" max-h-20 overflow-y-scroll">
          {taskList.map((task, index) => (
            <Form.Item
              key={index}
              initialValue={task}
              className="m-0 mb-2 add-task"
            >
              <div className="max-w-md add-task flex items-center justify-between">
                Task {index + 1} : {task}
                <Button
                  className=" !w-auto"
                  type="link"
                  onClick={() => removeTask(index)}
                  icon={<CloseCircleFilled />}
                ></Button>
              </div>
            </Form.Item>
          ))}
        </div>
        <Form.Item>
          <Button
            type="dashed"
            disabled={valueList.length === 0 ? true : false}
            onClick={addTask}
            block
            icon={<PlusOutlined />}
          >
            Add task
          </Button>
        </Form.Item>
        <Form.Item
          label="Start date - End date"
          name="date"
          rules={[{ required: true }]}
        >
          <RangePicker format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="a">Do not</Radio>
            <Radio value="b">In progress</Radio>
            <Radio value="c">Done</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item className="m-0">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
     
        <div className="absolute top-2 right-2 ">
          <CloseCircleOutlined onClick={handleCancel} className="text-2xl" />
        </div>
     
    </Modal>
  );
}
ModalAdd.propTypes = {
  isModalOpen: PropTypes.bool,
  handleCancel: PropTypes.func,
  selectedTask: PropTypes.object,
  close: PropTypes.bool,
};
