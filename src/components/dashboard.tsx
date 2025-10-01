"use client"

import { Card, Table, Tag, Statistic, Row, Col, Typography, Badge } from "antd"
import { MessageSquare, FileText, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

const { Title, Text } = Typography

export default function Dashboard() {
  const stats = [
    {
      title: "Total Compliants",
      value: 124,
      icon: <MessageSquare className="text-cyan-400" />,
      color: "blue",
    },
    {
      title: "Active Requisitions",
      value: 48,
      icon: <FileText className="text-purple-400" />,
      color: "purple",
    },
    {
      title: "Resolved Issues",
      value: 86,
      icon: <CheckCircle2 className="text-green-400" />,
      color: "green",
    },
    {
      title: "Urgent Deadline",
      value: 5,
      icon: <AlertTriangle className="text-red-400" />,
      color: "red",
    },
  ]

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => <Text className="font-mono text-cyan-400">{id}</Text>,
    },
    {
      title: "Subject / Business",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => <Tag color={type === "Compliant" ? "error" : "processing"}>{type.toUpperCase()}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusConfig: any = {
          Pending: { color: "gold", icon: <Clock size={12} className="mr-1" /> },
          Approved: { color: "green", icon: <CheckCircle2 size={12} className="mr-1" /> },
          Rejected: { color: "red", icon: <AlertTriangle size={12} className="mr-1" /> },
        }
        const config = statusConfig[status] || { color: "default" }
        return (
          <Tag color={config.color} className="flex items-center w-fit">
            {config.icon}
            {status}
          </Tag>
        )
      },
    },
  ]

  const dataSource = [
    {
      key: "1",
      id: "CMP-902",
      subject: "Cement Quality Issue",
      type: "Compliant",
      date: "2026-01-04",
      status: "Pending",
    },
    {
      key: "2",
      id: "REQ-104",
      subject: "Steel Bars Requisition",
      type: "Requisition",
      date: "2026-01-03",
      status: "Approved",
    },
    {
      key: "3",
      id: "CMP-899",
      subject: "Delivery Delay - Branch A",
      type: "Compliant",
      date: "2026-01-02",
      status: "Rejected",
    },
    {
      key: "4",
      id: "REQ-105",
      subject: "Electrical Wiring Bulk",
      type: "Requisition",
      date: "2026-01-05",
      status: "Pending",
    },
  ]

  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        {stats.map((stat, idx) => (
          <Col xs={24} sm={12} xl={6} key={idx}>
            <Card variant="borderless" className="shadow-md h-full">
              <Statistic
                title={<span className="text-slate-400 text-sm uppercase font-bold tracking-wider">{stat.title}</span>}
                value={stat.value}
                prefix={<span className="mr-3 p-2 bg-slate-800 rounded-lg inline-flex">{stat.icon}</span>}
                styles={{ content: { color: "#fff", fontWeight: 700 } }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card
        title={
          <div className="flex items-center gap-2 text-white">
            <Clock size={18} className="text-cyan-400" />
            <span>Recent Activity Log</span>
          </div>
        }
        className="shadow-lg"
        extra={<Badge count={4} offset={[10, 0]} color="#22d3ee" />}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          className="custom-table"
          scroll={{ x: true }}
        />
      </Card>
    </div>
  )
}
