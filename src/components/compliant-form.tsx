"use client"

import { Form, Input, Select, DatePicker, Upload, Button, message, Card } from "antd"
import { UploadOutlined } from "@ant-design/icons"

const { TextArea } = Input

export default function ComplaintForm() {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log("[v0] Compliant Form Values:", values)
    message.success("Compliant submitted successfully!")
    form.resetFields()
  }

  return (
    <Card className="shadow-lg">
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="buyer@example.com" size="large" />
          </Form.Item>

          <Form.Item
            name="buyerName"
            label="Name of Buyer"
            rules={[{ required: true, message: "Buyer name is required" }]}
          >
            <Input placeholder="Enter full name" size="large" />
          </Form.Item>

          <Form.Item
            name="shopBranch"
            label="Shop / Branch"
            rules={[{ required: true, message: "Branch is required" }]}
          >
            <Input placeholder="Enter shop or branch name" size="large" />
          </Form.Item>

          <Form.Item
            name="materialType"
            label="Material Type"
            rules={[{ required: true, message: "Material type is required" }]}
          >
            <Select placeholder="Select type" size="large">
              <Select.Option value="electronics">Electronics</Select.Option>
              <Select.Option value="furniture">Furniture</Select.Option>
              <Select.Option value="construction">Construction Materials</Select.Option>
              <Select.Option value="office">Office Supplies</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="dateBought" label="Date Bought" rules={[{ required: true, message: "Date is required" }]}>
            <DatePicker className="w-full" size="large" />
          </Form.Item>

          <Form.Item
            name="attachments"
            label="Supporting Documents (Multiple)"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e
              }
              return e?.fileList
            }}
          >
            <Upload listType="picture" multiple beforeUpload={() => false}>
              <Button icon={<UploadOutlined />} size="large" block>
                Select Files
              </Button>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Detailed Description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <TextArea rows={4} placeholder="Describe the issue or compliant in detail..." size="large" />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button type="primary" htmlType="submit" size="large" block className="h-12 text-lg font-semibold">
            Submit Compliant Report
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
