import { useEffect, useState } from "react";

import "./index.scss";
import type { FormProps } from "antd";
import { Card, Form, Input, Checkbox, Button } from "antd";
import type { FieldType } from "./types";
import { getLoginImage } from "@/apis";
import { useRequest } from "@/hooks";
const Login: React.FC = () => {
  const [codeImg, setCodeImage] = useState<string>();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const { run: getLoginImageRun } = useRequest(getLoginImage, {
    manual: true,
    onSuccess: (res) => {
      setCodeImage("data:image/gif;base64," + res);
      console.log(res, codeImg, "==>");
    },
  });
  useEffect(() => {
    getLoginImageRun();
  }, []);
  return (
    <>
      <div className="login">
        <img src={codeImg} alt="" />
        <Card>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              label={null}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;
