"use client"

import { Form, Input, InputNumber, Select, DatePicker, Upload, Button, message, Card, Divider } from "antd"
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons"

export default function ProformaForm() {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log("[v0] Proforma Requisition Values:", values)
    message.success("Requisition submitted successfully!")
    form.resetFields()
  }

  return (
    <Card className="shadow-lg">
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            name="email"
            label="Business Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="business@example.com" size="large" />
          </Form.Item>

          <Form.Item
            name="businessName"
            label="Business Name"
            rules={[{ required: true, message: "Business name is required" }]}
          >
            <Input placeholder="Enter legal company name" size="large" />
          </Form.Item>

          <Form.Item name="tin" label="TIN Number" rules={[{ required: true, message: "TIN is required" }]}>
            <Input placeholder="Tax Identification Number" size="large" />
          </Form.Item>

          <Form.Item
            name="deadline"
            label="Submission Deadline"
            rules={[{ required: true, message: "Deadline is required" }]}
          >
            <DatePicker className="w-full" size="large" />
          </Form.Item>
        </div>

        <Divider titlePlacement="left" className="!text-primary">
          Material Requirements
        </Divider>

        <Form.List name="materials" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <div className="space-y-4">
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="flex flex-wrap md:flex-nowrap gap-4 items-end bg-secondary p-4 rounded-lg relative"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "type"]}
                    label="Material Type"
                    className="flex-1 min-w-[200px] !mb-0"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input placeholder="e.g. Cement, Steel" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    label="Qty"
                    className="w-32 !mb-0"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <InputNumber min={1} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "uom"]}
                    label="UOM"
                    className="w-32 !mb-0"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select placeholder="Unit">
                      <Select.Option value="pcs">Pcs</Select.Option>
                      <Select.Option value="kg">Kg</Select.Option>
                      <Select.Option value="m">Meters</Select.Option>
                      <Select.Option value="bags">Bags</Select.Option>
                    </Select>
                  </Form.Item>
                  {fields.length > 1 && (
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                      className="mb-1"
                    />
                  )}
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} className="h-10">
                Add Another Material
              </Button>
            </div>
          )}
        </Form.List>

        <Divider titlePlacement="left" className="!text-primary mt-8">
          Required Documentation
        </Divider>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            name="license"
            label="Business / Construction License"
            rules={[{ required: true, message: "License upload required" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e
              }
              return e?.fileList
            }}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />} block size="large">
                Upload License
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="vatReg"
            label="VAT Registration Certificate"
            rules={[{ required: true, message: "VAT certificate required" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e
              }
              return e?.fileList
            }}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />} block size="large">
                Upload VAT Reg
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="requisition"
            label="Formal Requisition Document"
            rules={[{ required: true, message: "Formal requisition required" }]}
            className="md:col-span-2"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e
              }
              return e?.fileList
            }}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />} block size="large">
                Upload Requisition
              </Button>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item className="mt-8 mb-0">
          <Button type="primary" htmlType="submit" size="large" block className="h-12 text-lg font-semibold">
            Submit Proforma Requisition
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
