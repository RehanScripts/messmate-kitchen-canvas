import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Download, FileText, TrendingUp, Users, DollarSign } from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";

interface ReportData {
  totalUsers: number;
  activeUsers: number;
  totalMeals: number;
  totalRevenue: number;
  mealBreakdown: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
  topUsers: Array<{
    name: string;
    email: string;
    totalOrders: number;
    totalSpent: number;
  }>;
  dailyStats: Array<{
    date: string;
    meals: number;
    revenue: number;
  }>;
}

const GenerateReports = () => {
  const { toast } = useToast();
  
  const [reportType, setReportType] = useState<string>("summary");
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  });
  const [reportFormat, setReportFormat] = useState<string>("csv");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "user-activity",
    "meal-data",
    "revenue"
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock report data
  const mockReportData: ReportData = {
    totalUsers: 2847,
    activeUsers: 2156,
    totalMeals: 8942,
    totalRevenue: 423580,
    mealBreakdown: {
      breakfast: 2845,
      lunch: 3245,
      dinner: 2852
    },
    topUsers: [
      { name: "John Doe", email: "john@example.com", totalOrders: 45, totalSpent: 3600 },
      { name: "Jane Smith", email: "jane@example.com", totalOrders: 38, totalSpent: 3040 },
      { name: "Bob Johnson", email: "bob@example.com", totalOrders: 42, totalSpent: 3360 },
      { name: "Alice Brown", email: "alice@example.com", totalOrders: 35, totalSpent: 2800 },
      { name: "Mike Wilson", email: "mike@example.com", totalOrders: 40, totalSpent: 3200 }
    ],
    dailyStats: [
      { date: "2024-12-26", meals: 285, revenue: 22800 },
      { date: "2024-12-27", meals: 292, revenue: 23360 },
      { date: "2024-12-28", meals: 278, revenue: 22240 },
      { date: "2024-12-29", meals: 301, revenue: 24080 },
      { date: "2024-12-30", meals: 295, revenue: 23600 }
    ]
  };

  const reportTypes = [
    { value: "summary", label: "Summary Report" },
    { value: "detailed", label: "Detailed Report" },
    { value: "user-activity", label: "User Activity Report" },
    { value: "meal-analytics", label: "Meal Analytics Report" },
    { value: "revenue", label: "Revenue Report" },
    { value: "custom", label: "Custom Report" }
  ];

  const metrics = [
    { id: "user-activity", label: "User Activity & Engagement" },
    { id: "meal-data", label: "Meal Data & Statistics" },
    { id: "revenue", label: "Revenue & Financial Data" },
    { id: "booking-trends", label: "Booking Trends" },
    { id: "popular-items", label: "Popular Menu Items" },
    { id: "peak-hours", label: "Peak Hours Analysis" }
  ];

  const quickDateRanges = [
    { label: "Today", getValue: () => ({ from: new Date(), to: new Date() }) },
    { label: "Last 7 Days", getValue: () => ({ from: subDays(new Date(), 7), to: new Date() }) },
    { label: "Last 30 Days", getValue: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
    { label: "This Month", getValue: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
    { label: "Last Month", getValue: () => {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
    }}
  ];

  const handleMetricChange = (metricId: string, checked: boolean) => {
    if (checked) {
      setSelectedMetrics([...selectedMetrics, metricId]);
    } else {
      setSelectedMetrics(selectedMetrics.filter(id => id !== metricId));
    }
  };

  const generateCSV = (data: ReportData) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Summary data
    csvContent += "Report Summary\n";
    csvContent += "Metric,Value\n";
    csvContent += `Total Users,${data.totalUsers}\n`;
    csvContent += `Active Users,${data.activeUsers}\n`;
    csvContent += `Total Meals,${data.totalMeals}\n`;
    csvContent += `Total Revenue,₹${data.totalRevenue}\n\n`;
    
    // Meal breakdown
    csvContent += "Meal Type Breakdown\n";
    csvContent += "Meal Type,Count\n";
    csvContent += `Breakfast,${data.mealBreakdown.breakfast}\n`;
    csvContent += `Lunch,${data.mealBreakdown.lunch}\n`;
    csvContent += `Dinner,${data.mealBreakdown.dinner}\n\n`;
    
    // Top users
    csvContent += "Top Users\n";
    csvContent += "Name,Email,Total Orders,Total Spent\n";
    data.topUsers.forEach(user => {
      csvContent += `${user.name},${user.email},${user.totalOrders},₹${user.totalSpent}\n`;
    });
    
    return csvContent;
  };

  const generatePDF = (data: ReportData) => {
    // In a real application, you would use a library like jsPDF
    // For this demo, we'll create a simple text representation
    let content = `MessMate Analytics Report\n`;
    content += `Generated on: ${new Date().toLocaleDateString()}\n`;
    content += `Date Range: ${dateRange.from ? format(dateRange.from, "PP") : "N/A"} - ${dateRange.to ? format(dateRange.to, "PP") : "N/A"}\n\n`;
    
    content += `SUMMARY\n`;
    content += `Total Users: ${data.totalUsers}\n`;
    content += `Active Users: ${data.activeUsers}\n`;
    content += `Total Meals: ${data.totalMeals}\n`;
    content += `Total Revenue: ₹${data.totalRevenue}\n\n`;
    
    content += `MEAL BREAKDOWN\n`;
    content += `Breakfast: ${data.mealBreakdown.breakfast}\n`;
    content += `Lunch: ${data.mealBreakdown.lunch}\n`;
    content += `Dinner: ${data.mealBreakdown.dinner}\n`;
    
    return content;
  };

  const downloadReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation delay
    setTimeout(() => {
      const reportData = mockReportData;
      
      if (reportFormat === "csv") {
        const csvContent = generateCSV(reportData);
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `messmate-report-${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (reportFormat === "pdf") {
        const pdfContent = generatePDF(reportData);
        const blob = new Blob([pdfContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `messmate-report-${Date.now()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      
      setIsGenerating(false);
      toast({
        title: "Report Generated",
        description: `${reportFormat.toUpperCase()} report has been downloaded successfully.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generate Reports</h1>
          <p className="text-gray-600 mt-1">Create and download comprehensive analytics reports</p>
        </div>
        <Button onClick={downloadReport} disabled={isGenerating}>
          <Download className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating..." : "Download Report"}
        </Button>
      </div>

      {/* Report Preview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{mockReportData.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{mockReportData.activeUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Meals</p>
                <p className="text-2xl font-bold text-gray-900">{mockReportData.totalMeals.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{mockReportData.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>
              Configure your report settings and parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Report Type */}
            <div>
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div>
              <Label>Date Range</Label>
              <div className="flex gap-2 mb-3">
                {quickDateRanges.map((range) => (
                  <Button
                    key={range.label}
                    variant="outline"
                    size="sm"
                    onClick={() => setDateRange(range.getValue())}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange({...dateRange, from: date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange({...dateRange, to: date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Report Format */}
            <div>
              <Label>Report Format</Label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Excel Compatible)</SelectItem>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Include Metrics</CardTitle>
            <CardDescription>
              Select which metrics to include in your report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric.id}
                    checked={selectedMetrics.includes(metric.id)}
                    onCheckedChange={(checked) => handleMetricChange(metric.id, checked as boolean)}
                  />
                  <Label htmlFor={metric.id} className="text-sm font-medium">
                    {metric.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
          <CardDescription>
            Preview of the data that will be included in your report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meal Breakdown */}
            <div>
              <h4 className="font-semibold mb-3">Meal Type Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Breakfast</span>
                  <span className="font-medium">{mockReportData.mealBreakdown.breakfast}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lunch</span>
                  <span className="font-medium">{mockReportData.mealBreakdown.lunch}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dinner</span>
                  <span className="font-medium">{mockReportData.mealBreakdown.dinner}</span>
                </div>
              </div>
            </div>

            {/* Top Users */}
            <div>
              <h4 className="font-semibold mb-3">Top 5 Users</h4>
              <div className="space-y-2">
                {mockReportData.topUsers.slice(0, 5).map((user, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{user.name}</span>
                    <span className="font-medium">₹{user.totalSpent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateReports;