import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";

import { Button, DatePicker, Form, Input, Modal, Radio } from "antd";
import { PlusOutlined, CloseCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";

export default function ModalAdd(props) {
  const [form] = Form.useForm();
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState([]);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const newTask = {
      id: task.length,
      title: values.title,
      content: taskList,
      status: values.status,
      date: values.date,
    };
    setTaskList([]);
    setTask([...task, newTask]);
    form.resetFields();
    dispatch({ type: "ADD_TASK", payload: newTask });
    props.handleCancel();
  };
  const addTask = async () => {
    try {
      await form.validateFields(["task"]);
      const values = form.getFieldsValue(["task"]);
      const taskValue = values.task;
      setTaskList([...taskList, taskValue]);
      form.resetFields(["task"]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
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
      onCancel={props.handleCancel}
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
          <Input placeholder="Enter task" />
        </Form.Item>
        {taskList.map((task, index) => (
          <Form.Item
            key={index}
            label={`Task ${index + 1}`}
            initialValue={task}
            className="m-0 mb-2 add-task"
          >
            <div className="add-task flex items-center justify-between">
              {task}
              <Button
                type="link"
                onClick={() => removeTask(index)}
                icon={<CloseCircleFilled />}
              ></Button>
            </div>
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={addTask} block icon={<PlusOutlined />}>
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
    </Modal>
  );
}
ModalAdd.propTypes = {
  isModalOpen: PropTypes.bool,
  handleCancel: PropTypes.func,
};
