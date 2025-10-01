"use client"

import { useState, useEffect } from "react"
import { ConfigProvider, Tabs, Layout, Typography } from "antd"
import { LayoutDashboard, MessageSquare, FileText } from "lucide-react"
import CompliantForm from "./components/compliant-form"
import ProformaForm from "./components/proforma-form"
import Dashboard from "./components/dashboard"

const { Header, Content } = Layout
const { Title, Text } = Typography

export default function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log("[v0] App mounted successfully")
  }, [])

  if (!mounted) return null

  const items = [
    {
      key: "dashboard",
      label: (
        <span className="flex items-center gap-2">
          <LayoutDashboard size={16} />
          Dashboard
        </span>
      ),
      children: <Dashboard />,
    },
    {
      key: "compliant",
      label: (
        <span className="flex items-center gap-2">
          <MessageSquare size={16} />
          Compliants
        </span>
      ),
      children: <CompliantForm />,
    },
    {
      key: "proforma",
      label: (
        <span className="flex items-center gap-2">
          <FileText size={16} />
          Requisitions
        </span>
      ),
      children: <ProformaForm />,
    },
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7c3aed",
          borderRadius: 8,
          colorBgBase: "#ffffff",
          colorBgContainer: "#ffffff",
          colorTextBase: "#0f172a",
          colorBorder: "#e2e8f0",
        },
        components: {
          Card: {
            colorBgContainer: "#ffffff",
            colorBorderSecondary: "#e2e8f0",
          },
          Tabs: {
            colorText: "#64748b",
            itemSelectedColor: "#7c3aed",
            inkBarColor: "#7c3aed",
          },
        },
      }}
    >
    <Layout className="min-h-screen bg-gray-50">
        <Header className="bg-white border-b border-slate-200 px-6 py-4 h-auto flex flex-col justify-center">
          <Title level={2} className="!m-0 !text-slate-900">
            Management Portal
          </Title>
          <Text className="text-slate-400">Compliant Management & Proforma Requisition System</Text>
        </Header>
        <Content className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Tabs
              defaultActiveKey="dashboard"
              items={items}
              size="large"
              type="card"
              className="custom-tabs"
              destroyOnHidden={false}
            />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}
