'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MapPin, 
  FileText, 
  DollarSign, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  Plus,
  ArrowUp,
  ArrowDown,
  Zap,
  Sparkles,
  Mountain,
  Leaf
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-gray-50 via-white to-green-50/30 p-6">
        <div className="relative z-10 w-full max-w-xl text-center">
          <div className="inline-flex items-center space-x-4 p-6 rounded-2xl bg-white/60 backdrop-blur-xl border border-gray-200/60 shadow-lg">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%)'
              }}
            >
              <span className="text-white font-black">LM</span>
            </div>

            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900">Preparing your dashboard</h3>
              <p className="text-sm text-gray-600">Loading data and getting things ready...</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-green-100 border-t-green-600 animate-spin" />
          </div>

          <div className="mt-6 text-sm text-gray-500">This may take a moment. Thanks for your patience.</div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Properties",
      value: "12",
      change: "+2",
      description: "Land parcels",
      icon: MapPin,
      color: "text-green-600",
      gradient: "from-green-500/10 to-green-500/5",
      border: "border-green-500/20"
    },
    {
      title: "Active Documents",
      value: "47",
      change: "-3",
      description: "Contracts & permits",
      icon: FileText,
      color: "text-blue-600",
      gradient: "from-blue-500/10 to-blue-500/5",
      border: "border-blue-500/20"
    },
    {
      title: "Monthly Revenue",
      value: "$24,580",
      change: "+12%",
      description: "From all sources",
      icon: DollarSign,
      color: "text-emerald-600",
      gradient: "from-emerald-500/10 to-emerald-500/5",
      border: "border-emerald-500/20"
    },
    {
      title: "Pending Tasks",
      value: "8",
      change: "+2",
      description: "Require attention",
      icon: Clock,
      color: "text-amber-600",
      gradient: "from-amber-500/10 to-amber-500/5",
      border: "border-amber-500/20"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "document",
      title: "Lease agreement signed",
      property: "Oakwood Estate",
      time: "2 hours ago",
      status: "completed",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      id: 2,
      type: "financial",
      title: "Timber sale payment received",
      property: "Pine Ridge",
      time: "1 day ago",
      status: "completed",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      id: 3,
      type: "task",
      title: "Soil test required",
      property: "Riverbend Farm",
      time: "2 days ago",
      status: "pending",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20"
    },
    {
      id: 4,
      type: "alert",
      title: "Permit renewal due soon",
      property: "All properties",
      time: "3 days ago",
      status: "warning",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Property tax payment",
      dueDate: "2024-01-25",
      priority: "high",
      property: "Meadowlands",
      color: "text-red-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    {
      id: 2,
      title: "Forest management plan review",
      dueDate: "2024-02-01",
      priority: "medium",
      property: "Oakwood Estate",
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20"
    },
    {
      id: 3,
      title: "Equipment maintenance",
      dueDate: "2024-02-05",
      priority: "low",
      property: "All properties",
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    }
  ];

  const quickActions = [
    { 
      label: "Add Property", 
      icon: Plus, 
      href: "/land/new",
      gradient: "from-green-500/10 to-emerald-500/5",
      border: "border-green-500/20"
    },
    { 
      label: "Upload Document", 
      icon: FileText, 
      href: "/documents/upload",
      gradient: "from-blue-500/10 to-cyan-500/5",
      border: "border-blue-500/20"
    },
    { 
      label: "Record Transaction", 
      icon: DollarSign, 
      href: "/transactions/new",
      gradient: "from-emerald-500/10 to-green-500/5",
      border: "border-emerald-500/20"
    },
    { 
      label: "Schedule Task", 
      icon: Calendar, 
      href: "/calendar",
      gradient: "from-amber-500/10 to-yellow-500/5",
      border: "border-amber-500/20"
    }
  ];

  return (
    <div className=" bg-linear-to-r from-gray-50 via-white to-green-50/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-40 animate-pulse delay-1000" />
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-blue-100 rounded-full blur-2xl opacity-30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%)'
                  }}
                >
                  <Mountain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
                    Welcome back, John
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Here's what's happening with your properties today
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-gray-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:scale-105 transition-all duration-300 group p-2"
              >
                <Calendar className="w-4 h-4 mr-2 text-gray-600 group-hover:text-green-600 transition-colors" />
                <span className="text-gray-700 group-hover:text-green-800">View Calendar</span>
                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-green-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              <Button 
                className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group p-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
                <Sparkles className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={cn(
                "bg-white/60 backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer",
                stat.border
              )}
              style={{
                boxShadow: '0 8px 40px rgba(5, 150, 105, 0.08)'
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-300 group-hover:scale-110",
                )}>
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="flex items-center pt-1">
                  {stat.change.startsWith('+') ? (
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={cn(
                    "text-xs font-medium",
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  )}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
              {/* Hover gradient effect */}
              <div className={cn(
                "absolute inset-0 rounded-lg bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                stat.gradient
              )} />
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Activity & Tasks */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <Card className="bg-white/60 backdrop-blur-xl border border-gray-200/60 shadow-lg">
              <CardHeader className="border-b border-gray-200/60">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-start space-x-4 p-4 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer bg-white/50 backdrop-blur-sm border-gray-200/60"
                    
                    >
                      <div className={cn(
                        "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
                        activity.bgColor,
                        activity.borderColor
                      )}>
                        <activity.icon className={cn("h-5 w-5", activity.color)} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-green-800 transition-colors">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.property} • {activity.time}
                        </p>
                      </div>
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        activity.status === 'completed' ? 'bg-green-500/10 text-green-700' :
                        activity.status === 'warning' ? 'bg-amber-500/10 text-amber-700' :
                        'bg-blue-500/10 text-blue-700'
                      )}>
                        {activity.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/60 backdrop-blur-xl border border-gray-200/60 shadow-lg">
              <CardHeader className="border-b border-gray-200/60">
                <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={cn(
                        "h-24 flex flex-col gap-3 transition-all duration-300 hover:scale-105 group relative overflow-hidden backdrop-blur-sm",
                        action.border
                      )}
                      asChild
                    >
                      <a href={action.href}>
                        <div className={cn(
                          "p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                        )}>
                          <action.icon className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-800 transition-colors">
                          {action.label}
                        </span>
                        {/* Hover gradient */}
                        <div className={cn(
                          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                          action.gradient
                        )} />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Upcoming Tasks */}
          <div className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-xl border border-gray-200/60 shadow-lg">
              <CardHeader className="border-b border-gray-200/60">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="p-4 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer bg-white/50 backdrop-blur-sm border-gray-200/60"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900 group-hover:text-green-800 transition-colors">
                          {task.title}
                        </h4>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-bold",
                          task.bgColor,
                          task.color
                        )}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.property}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                        <Zap className="h-3 w-3 text-amber-500 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financial Overview Mini */}
            <Card className="bg-white/60 backdrop-blur-xl border border-gray-200/60 shadow-lg">
              <CardHeader className="border-b border-gray-200/60">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  Financial Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-sm font-bold text-emerald-600">+$12,450</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                    <span className="text-sm text-gray-600">YTD Revenue</span>
                    <span className="text-sm font-bold text-green-600">$148,200</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <span className="text-sm text-gray-600">Pending Invoices</span>
                    <span className="text-sm font-bold text-amber-600">$8,750</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}