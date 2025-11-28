import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Users, FileText, MapPin } from 'lucide-react';

export default function FinancesPage() {
  const financialData = {
    revenue: "$124,580",
    expenses: "$45,230",
    netIncome: "$79,350",
    ytdGrowth: "+15.2%"
  };

  // Mock data for charts
  const expenseCategories = [
    { name: 'Labor', value: 35, color: '#3b82f6' },
    { name: 'Equipment', value: 25, color: '#ef4444' },
    { name: 'Materials', value: 20, color: '#10b981' },
    { name: 'Maintenance', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#8b5cf6' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 85000, expenses: 32000 },
    { month: 'Feb', revenue: 92000, expenses: 35000 },
    { month: 'Mar', revenue: 78000, expenses: 31000 },
    { month: 'Apr', revenue: 105000, expenses: 42000 },
    { month: 'May', revenue: 124000, expenses: 45000 },
    { month: 'Jun', revenue: 118000, expenses: 43000 }
  ];

  // Calculate total for donut chart
  const totalExpenses = expenseCategories.reduce((sum, category) => sum + category.value, 0);

  // Calculate cumulative percentages for donut chart
  let cumulativePercentage = 0;
  const expenseSegments = expenseCategories.map(category => {
    const percentage = (category.value / totalExpenses) * 100;
    const segment = {
      ...category,
      percentage,
      start: cumulativePercentage,
      end: cumulativePercentage + percentage
    };
    cumulativePercentage += percentage;
    return segment;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-6 space-y-8 px-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
          Financial Overview
        </h1>
        <p className="text-lg text-gray-600">Track revenue, expenses, and financial performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border border-gray-200/60 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{financialData.revenue}</div>
            <p className="text-sm text-gray-500 mt-2">Year to Date</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-gray-200/60 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Expenses</CardTitle>
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{financialData.expenses}</div>
            <p className="text-sm text-gray-500 mt-2">Operating costs</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-gray-200/60 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net Income</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{financialData.netIncome}</div>
            <p className="text-sm text-gray-500 mt-2">After expenses</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-gray-200/60 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">YTD Growth</CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Calendar className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{financialData.ytdGrowth}</div>
            <p className="text-sm text-gray-500 mt-2">vs previous year</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
   {/* Revenue Trend Line Chart */}
<Card className="border border-gray-200/60 bg-white/50 backdrop-blur-sm">
  <CardHeader>
    <CardTitle className="flex items-center text-lg">
      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
      Revenue Trend
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="h-80 relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
        <span>$140k</span>
        <span>$100k</span>
        <span>$60k</span>
        <span>$20k</span>
        <span>$0</span>
      </div>
      
      {/* Chart area */}
      <div className="ml-12 h-full flex flex-col">
        {/* Grid lines */}
        <div className="flex-1 relative">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="absolute left-0 right-0 h-px bg-gray-200" 
                 style={{ top: `${i * 25}%` }} />
          ))}
          
          {/* Chart container */}
          <div className="absolute inset-0 flex items-end justify-between px-4">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Revenue line path */}
              <path
                d={revenueData.map((data, index) => {
                  const x = 10 + (index * (80 / (revenueData.length - 1)));
                  const y = 90 - (data.revenue / 140000) * 80;
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="0.3"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              
              {/* Expenses line path */}
              <path
                d={revenueData.map((data, index) => {
                  const x = 10 + (index * (80 / (revenueData.length - 1)));
                  const y = 90 - (data.expenses / 140000) * 80;
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#ef4444"
                strokeWidth="0.5"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              
              {/* Revenue dots */}
              {revenueData.map((data, index) => {
                const x = 10 + (index * (80 / (revenueData.length - 1)));
                const y = 90 - (data.revenue / 140000) * 80;
                return (
                  <circle
                    key={`revenue-${index}`}
                    cx={x}
                    cy={y}
                    r="1"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="1"
                    className="transition-all duration-300 hover:r-3 cursor-pointer"
                  >
                    <title>{`${data.month}: $${data.revenue.toLocaleString()} Revenue`}</title>
                  </circle>
                );
              })}
              
              {/* Expenses dots */}
              {revenueData.map((data, index) => {
                const x = 10 + (index * (80 / (revenueData.length - 1)));
                const y = 90 - (data.expenses / 140000) * 80;
                return (
                  <circle
                    key={`expenses-${index}`}
                    cx={x}
                    cy={y}
                    r="1"
                    fill="#ef4444"
                    stroke="#ffffff"
                    strokeWidth="1"
                    className="transition-all duration-300 hover:r-3 cursor-pointer"
                  >
                    <title>{`${data.month}: $${data.expenses.toLocaleString()} Expenses`}</title>
                  </circle>
                );
              })}
            </svg>
            
            {/* Month labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
              {revenueData.map((data, index) => (
                <div 
                  key={data.month} 
                  className="text-xs text-gray-600 font-medium"
                  style={{ width: `${100 / revenueData.length}%`, textAlign: 'center' }}
                >
                  {data.month}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
        </div>
      </div>
    </div>
  </CardContent>
</Card>
        {/* Expense Breakdown Donut Chart */}
        <Card className="border border-gray-200/60 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col lg:flex-row items-center justify-between">
              {/* Donut Chart */}
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                  
                  {/* Segments */}
                  {expenseSegments.map((segment, index) => (
                    <circle
                      key={segment.name}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="20"
                      strokeDasharray={`${segment.percentage} ${100 - segment.percentage}`}
                      strokeDashoffset={-segment.start}
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                    />
                  ))}
                  
                  {/* Center text */}
                  <text x="50" y="50" textAnchor="middle" dy="0.3em" className="text-sm font-bold fill-gray-700">
                    {financialData.expenses.replace('$', '')}
                  </text>
                  <text x="50" y="60" textAnchor="middle" dy="0.3em" className="text-[8px] fill-gray-500">
                    Total Expenses
                  </text>
                </svg>
              </div>

              {/* Legend */}
              <div className="flex-1 lg:ml-8 space-y-3">
                {expenseCategories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        {category.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{category.value}%</div>
                      <div className="text-xs text-gray-500">
                        ${((category.value / 100) * parseInt(financialData.expenses.replace('$', '').replace(',', ''))).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200/60 bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
            <MapPin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">Generating revenue</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200/60 bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contracts</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">Active agreements</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200/60 bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">Managing operations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}