'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Calendar,
  MapPin,
  FileText,
  Users,
  Plus,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Clock,
  Home,
  Gift,
  Shield,
  PiggyBank,
  Eye,
  Download,
  MoreVertical,
  Sparkles,
  TreePine,
  Leaf
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function TransactionsPage() {
  // Enhanced stats with working Tailwind colors
  const stats = [
    { 
      value: '83', 
      label: 'Total Transactions', 
      description: 'All time transactions',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-600'
    },
    { 
      value: '₦24.5M', 
      label: 'Monthly Volume', 
      description: 'This month\'s total',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      iconColor: 'text-green-600',
      textColor: 'text-green-600'
    },
    { 
      value: '47', 
      label: 'Customary Land', 
      description: 'Traditional land deals',
      change: '+5',
      trend: 'up',
      icon: TreePine,
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-600'
    },
    { 
      value: '12', 
      label: 'Pending', 
      description: 'Awaiting processing',
      change: '-3',
      trend: 'down',
      icon: Clock,
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-600'
    },
    { 
      value: '28', 
      label: 'Council Land', 
      description: 'Government allocations',
      change: '+4',
      trend: 'up',
      icon: MapPin,
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20',
      iconColor: 'text-teal-600',
      textColor: 'text-teal-600'
    },
    { 
      value: '₦148M', 
      label: 'YTD Volume', 
      description: 'Year to date total',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-600'
    }
  ];

  // Enhanced transaction categories with explicit colors
  const transactionCategories = [
    {
      id: 'acquisition',
      name: 'Land Acquisition',
      count: 42,
      value: '₦89.2M',
      transactions: ['Purchase', 'Allocation', 'Gift', 'Inheritance'],
      icon: Home,
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-600'
    },
    {
      id: 'usage',
      name: 'Land Usage',
      count: 28,
      value: '₦18.7M',
      transactions: ['Lease', 'Rental', 'Development Agreements'],
      icon: Calendar,
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      iconColor: 'text-green-600',
      textColor: 'text-green-600'
    },
    {
      id: 'financial',
      name: 'Financial',
      count: 8,
      value: '₦12.3M',
      transactions: ['Pledge', 'Mortgage'],
      icon: DollarSign,
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-600'
    },
    {
      id: 'administrative',
      name: 'Administrative',
      count: 5,
      value: '₦2.8M',
      transactions: ['Regularization', 'Partition', 'Exchange', 'Dispute Settlement'],
      icon: FileText,
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-600'
    }
  ];

  // Enhanced recent transactions
  const recentTransactions = [
    {
      id: 1,
      type: 'Purchase',
      category: 'acquisition',
      property: 'Molyko Residential Plot',
      parties: 'Family Njie → John Mbua',
      amount: '₦8,500,000',
      date: '2024-01-15',
      status: 'completed',
      landType: 'Customary Land',
      location: 'Molyko, Buea',
      requirements: ['Family Head Signature', 'Chief Attestation', 'Witnesses'],
      progress: 100,
      icon: Home,
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      iconColor: 'text-emerald-600'
    },
    {
      id: 2,
      type: 'Lease',
      category: 'usage',
      property: 'Muea Farmland',
      parties: 'Chief\'s Land → Agro Business Ltd',
      amount: '₦1,200,000/yr',
      date: '2024-01-12',
      status: 'active',
      landType: 'Traditional Land',
      location: 'Muea, Buea',
      requirements: ['Lease Agreement', 'Council Permit'],
      progress: 100,
      icon: Calendar,
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      iconColor: 'text-green-600'
    },
    {
      id: 3,
      type: 'Allocation',
      category: 'acquisition',
      property: 'Buea Town Plot',
      parties: 'Buea Council → Sarah Tabe',
      amount: 'Allocated',
      date: '2024-01-10',
      status: 'processing',
      landType: 'Council Land',
      location: 'Buea Town',
      requirements: ['Application', 'Development Fees', 'Allocation Letter'],
      progress: 65,
      icon: MapPin,
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20',
      iconColor: 'text-teal-600'
    },
    {
      id: 4,
      type: 'Regularization',
      category: 'administrative',
      property: 'Customary to Certificate',
      parties: 'Family Land → Land Certificate',
      amount: '₦450,000',
      date: '2024-01-08',
      status: 'pending',
      landType: 'Customary Land',
      location: 'Mile 16, Buea',
      requirements: ['Survey Plan', 'Council Fees', 'Demarcation'],
      progress: 30,
      icon: Shield,
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      iconColor: 'text-orange-600'
    },
    {
      id: 5,
      type: 'Pledge',
      category: 'financial',
      property: 'Family Land - Bokwango',
      parties: 'Family Mbua → Community Njangi',
      amount: '₦2,000,000',
      date: '2024-01-05',
      status: 'active',
      landType: 'Customary Land',
      location: 'Bokwango, Buea',
      requirements: ['Pledge Agreement', 'Witnesses', 'Customary Guarantee'],
      progress: 100,
      icon: PiggyBank,
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      iconColor: 'text-amber-600'
    }
  ];

  // Land systems breakdown with explicit colors
  const landSystems = [
    { 
      name: 'Customary Land', 
      count: 47, 
      percentage: 65, 
      barColor: 'bg-emerald-500', 
      value: '₦92.1M',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-700'
    },
    { 
      name: 'Council Land', 
      count: 28, 
      percentage: 30, 
      barColor: 'bg-green-500', 
      value: '₦48.3M',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-700'
    },
    { 
      name: 'Private Land', 
      count: 8, 
      percentage: 5, 
      barColor: 'bg-amber-500', 
      value: '₦7.6M',
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-700'
    }
  ];

  // Quick actions with explicit colors
  const quickActions = [
    { 
      label: "Record Purchase", 
      icon: Home, 
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      iconColor: 'text-emerald-600'
    },
    { 
      label: "Create Lease", 
      icon: Calendar, 
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      iconColor: 'text-green-600'
    },
    { 
      label: "Land Allocation", 
      icon: MapPin, 
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20',
      iconColor: 'text-teal-600'
    },
    { 
      label: "Process Inheritance", 
      icon: Users, 
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      iconColor: 'text-amber-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30';
      case 'active': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'processing': return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
      case 'pending': return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
      default: return 'bg-stone-500/20 text-stone-700 border-stone-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/20 to-emerald-50/20 p-6 space-y-8">
      {/* Subtle Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-teal-100/20 rounded-full blur-2xl" />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 bg-gradient-to-br from-emerald-500 to-emerald-600">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-900 to-emerald-800 bg-clip-text text-transparent">
                  Land Transactions
                </h1>
                <p className="text-md text-stone-600 mt-2 flex items-center">
                  Managing land transactions across Buea's traditional and council systems
                  <Sparkles className="h-4 w-4 text-amber-500 ml-2" />
                </p>
              </div>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-white p-3 border-0">
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </Button>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="border border-stone-200/60 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-200/60">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.borderColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-amber-500" />
                    )}
                    <span className={`text-xs font-semibold ${stat.textColor}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-stone-900">{stat.value}</h3>
                  <p className="text-sm font-semibold text-stone-800">{stat.label}</p>
                  <p className="text-xs text-stone-600">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search transactions, properties, or parties..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200/60 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all duration-300 text-stone-900 placeholder-stone-400"
              />
            </div>
            <Button variant="outline" className="rounded-xl border-stone-200/60 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:border-emerald-200/60 transition-all duration-300 text-stone-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-8">
          {/* Transaction Categories */}
          <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-stone-900">
                <span>Transaction Categories</span>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
                  Total: ₦123M
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {transactionCategories.map((category) => (
                  <div key={category.id} className="p-4 rounded-xl border border-stone-200/60 hover:shadow-lg transition-all duration-300 hover:border-emerald-200/60 bg-white/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${category.bgColor} ${category.borderColor}`}>
                          <category.icon className={`h-5 w-5 ${category.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-stone-900">{category.name}</h3>
                          <p className="text-sm text-stone-600">{category.value}</p>
                        </div>
                      </div>
                      <Badge className={`${category.bgColor} ${category.textColor} ${category.borderColor}`}>
                        {category.count}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.transactions.map((transaction) => (
                        <Badge key={transaction} variant="outline" className={`${category.bgColor} ${category.textColor} ${category.borderColor} text-xs`}>
                          {transaction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-stone-900">Recent Transactions</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="border-stone-200/60 bg-white/60 text-stone-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-stone-200/60 bg-white/60 text-stone-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 rounded-xl border border-stone-200/60 hover:shadow-lg transition-all duration-300 hover:border-emerald-200/60 bg-white/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${transaction.bgColor} ${transaction.borderColor}`}>
                          <transaction.icon className={`h-5 w-5 ${transaction.iconColor}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-900">{transaction.property}</h4>
                          <p className="text-sm text-stone-600">{transaction.parties}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-stone-900">{transaction.amount}</div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className={`${transaction.bgColor} ${transaction.iconColor} ${transaction.borderColor}`}>
                          {transaction.type}
                        </Badge>
                        <span className="text-stone-600">{transaction.landType}</span>
                        <span className="text-stone-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {transaction.location}
                        </span>
                      </div>
                      <span className="text-stone-600">{transaction.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {transaction.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-stone-500/10 text-stone-600 border-stone-500/20">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Land Systems Breakdown */}
          <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-stone-900">Land Systems Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {landSystems.map((system) => (
                  <div key={system.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-stone-800">{system.name}</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-stone-900">{system.count} lands</div>
                        <div className="text-xs text-stone-600">{system.value}</div>
                      </div>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${system.barColor} transition-all duration-500`}
                        style={{ width: `${system.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-stone-500 text-right">
                      {system.percentage}% of total
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-stone-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="w-full justify-start hover:scale-105 transition-all duration-300 p-4 border border-stone-200/60 bg-white/50 text-stone-700 hover:border-emerald-200/60"
                  >
                    <div className={`p-1 rounded mr-3 ${action.bgColor} ${action.borderColor}`}>
                      <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                    </div>
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Summary */}
          <Card className="border border-stone-200/60 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-stone-900">System Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Active Transactions</span>
                  <span className="font-semibold text-stone-900">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Completed This Month</span>
                  <span className="font-semibold text-stone-900">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Avg. Processing Time</span>
                  <span className="font-semibold text-stone-900">7 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Success Rate</span>
                  <span className="font-semibold text-emerald-600">94%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}