import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  FileText, 
  Download, 
  Eye, 
  MoreVertical, 
  Calendar,
  FileType,
  Shield,
  Zap,
  Crown,
  Sparkles,
  Mountain,
  Filter,
  Search
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function DocumentsPage() {
  const documents = [
    {
      id: 1,
      name: "Property Deed - Oakwood Estate",
      type: "Legal",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      category: "Ownership",
      status: "verified",
      priority: "high"
    },
    {
      id: 2,
      name: "Timber Harvest Plan 2024",
      type: "Permit",
      size: "5.1 MB",
      uploadDate: "2024-01-10",
      category: "Operations",
      status: "pending",
      priority: "medium"
    },
    {
      id: 3,
      name: "Environmental Compliance Report",
      type: "Report",
      size: "3.7 MB",
      uploadDate: "2024-01-08",
      category: "Compliance",
      status: "verified",
      priority: "high"
    }
  ];

  const stats = [
    { value: '47', label: 'Total Documents', color: 'green', change: '+12%' },
    { value: '23', label: 'Verified', color: 'blue', change: '+5%' },
    { value: '8', label: 'Pending Review', color: 'amber', change: '-2%' },
    { value: '15', label: 'Legal Files', color: 'purple', change: '+8%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-700 border-red-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
      default: return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 p-6 space-y-8 py-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-50 rounded-full blur-2xl" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#16a34a 1px, transparent 1px),
                             linear-gradient(90deg, #16a34a 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Header Section */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/20 relative overflow-hidden group"
                  style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%)' }}
                >
                  <FileText className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
                </div>
               
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
                  Documents
                </h1>
                <p className="text-md text-muted-foreground mt-2 flex items-center">
                  Manage contracts, permits, and legal documents
                  <Sparkles className="h-4 w-4 text-amber-500 ml-2" />
                </p>
              </div>
            </div>
          </div>
          
          <Button className="relative overflow-hidden group transition-all duration-500 hover:scale-105 shadow-xl border-0  p-3">
            <div 
              className="absolute inset-0 opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-12 transition-transform duration-1000" />
            <Plus className="w-4 h-4 mr-2 relative z-10 text-white" />
            <span className="font-semibold relative z-10 text-white">Upload Document</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm border border-gray-200/60 bg-white/50 hover:scale-105 transition-all duration-500 group cursor-pointer"
            >
              {/* Hover gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)'
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                    <FileText className={`h-5 w-5 text-${stat.color}-600`} />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`bg-${stat.color}-500/20 text-${stat.color}-700 border-${stat.color}-500/30 text-xs font-semibold`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground font-semibold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200/60 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/40 transition-all duration-300"
              />
            </div>
            <Button variant="outline" className="rounded-2xl border-gray-200/60 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="relative z-10 space-y-4">
        {documents.map((doc) => (
          <Card 
            key={doc.id} 
            className="relative overflow-hidden border border-gray-200/60 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer"
          >
            {/* Animated background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)'
              }}
            />
            
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(22, 163, 74, 0.1) 0%, transparent 70%)'
              }}
            />

            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    {doc.status === 'verified' && (
                      <Shield className="absolute -top-1 -right-1 h-5 w-5 text-green-600 bg-white rounded-full p-0.5" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-foreground text-lg group-hover:text-green-800 transition-colors duration-300 truncate">
                        {doc.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                     
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <FileType className="h-4 w-4" />
                        <span className="font-semibold">{doc.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <span>{doc.size}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <Calendar className="h-4 w-4" />
                        <span>{doc.uploadDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <span className="font-semibold text-foreground">{doc.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="rounded-xl hover:bg-green-500/10 hover:text-green-600 transition-all duration-300 hover:scale-110 group/btn"
                  >
                    <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="rounded-xl hover:bg-blue-500/10 hover:text-blue-600 transition-all duration-300 hover:scale-110 group/btn"
                  >
                    <Download className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="rounded-xl hover:bg-gray-500/10 hover:text-gray-600 transition-all duration-300 hover:scale-110"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl backdrop-blur-sm border border-gray-200/60 bg-white/90">
                      <DropdownMenuItem className="rounded-xl focus:bg-green-500/10 focus:text-green-600 transition-colors duration-300">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl focus:bg-blue-500/10 focus:text-blue-600 transition-colors duration-300">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl focus:bg-amber-500/10 focus:text-amber-600 transition-colors duration-300">
                        <Shield className="h-4 w-4 mr-2" />
                        Verify
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (commented out but available) */}
      {/* <div className="text-center py-12">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No documents yet</h3>
        <p className="text-muted-foreground mb-6">Get started by uploading your first document</p>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div> */}
    </div>
  );
}