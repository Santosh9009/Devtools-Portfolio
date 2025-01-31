import React, { useState, useEffect } from "react";
import { resumeData } from "../utils/resumeData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronDown, 
  Search, 
  Filter,
  XCircle,
  RefreshCw,
  Download,
  ArrowUpDown
} from "lucide-react";

interface RequestTiming {
  queueing: number;
  waiting: number;
  receiving: number;
  total: number;
}

interface NetworkRequest {
  id: string;
  method: string;
  url: string;
  status: number;
  type: string;
  size: string;
  time: RequestTiming;
  startTime: number;
  initiator: string;
  priority: string;
  remoteAddress: string;
  requestHeaders: Record<string, string>;
  responseHeaders: Record<string, string>;
  requestBody?: string;
  responseBody?: string;
}

const NetworkTab = () => {
  const [requests, setRequests] = useState<NetworkRequest[]>([
    {
      id: "1",
      method: "GET",
      url: "/api/profile/contact",
      status: 200,
      type: "fetch",
      size: `${JSON.stringify(resumeData.contact).length} B`,
      time: {
        queueing: 10,
        waiting: 20,
        receiving: 50,
        total: 80
      },
      startTime: 0,
      initiator: "fetch",
      priority: "High",
      remoteAddress: "portfolio-api.vercel.app",
      requestHeaders: {
        "Accept": "application/json",
        "User-Agent": "Chrome/121.0.0.0"
      },
      responseHeaders: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=3600"
      },
      responseBody: JSON.stringify(resumeData.contact, null, 2)
    },
    {
      id: "2",
      method: "GET",
      url: "/api/profile/skills",
      status: 200,
      type: "fetch",
      size: `${JSON.stringify(resumeData.skills).length} B`,
      time: {
        queueing: 5,
        waiting: 30,
        receiving: 85,
        total: 120
      },
      startTime: 100,
      initiator: "fetch",
      priority: "High",
      remoteAddress: "portfolio-api.vercel.app",
      requestHeaders: {
        "Accept": "application/json",
        "User-Agent": "Chrome/121.0.0.0"
      },
      responseHeaders: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=3600"
      },
      responseBody: JSON.stringify(resumeData.skills, null, 2)
    },
    {
      id: "3",
      method: "GET",
      url: "/api/profile/experience",
      status: 200,
      type: "fetch",
      size: `${JSON.stringify(resumeData.workExperience).length} B`,
      time: {
        queueing: 8,
        waiting: 45,
        receiving: 97,
        total: 150
      },
      startTime: 250,
      initiator: "fetch",
      priority: "High",
      remoteAddress: "portfolio-api.vercel.app",
      requestHeaders: {
        "Accept": "application/json",
        "User-Agent": "Chrome/121.0.0.0"
      },
      responseHeaders: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=3600"
      },
      responseBody: JSON.stringify(resumeData.workExperience, null, 2)
    },
    {
      id: "4",
      method: "GET",
      url: "/api/profile/projects",
      status: 200,
      type: "fetch",
      size: `${JSON.stringify(resumeData.projects).length} B`,
      time: {
        queueing: 12,
        waiting: 60,
        receiving: 128,
        total: 200
      },
      startTime: 400,
      initiator: "fetch",
      priority: "High",
      remoteAddress: "portfolio-api.vercel.app",
      requestHeaders: {
        "Accept": "application/json",
        "User-Agent": "Chrome/121.0.0.0"
      },
      responseHeaders: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=3600"
      },
      responseBody: JSON.stringify(resumeData.projects, null, 2)
    },
    {
      id: "5",
      method: "POST",
      url: "/api/profile/contact-form",
      status: 201,
      type: "fetch",
      size: "234 B",
      time: {
        queueing: 5,
        waiting: 180,
        receiving: 15,
        total: 200
      },
      startTime: 600,
      initiator: "fetch",
      priority: "High",
      remoteAddress: "portfolio-api.vercel.app",
      requestHeaders: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Chrome/121.0.0.0"
      },
      responseHeaders: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      requestBody: JSON.stringify({
        email: "visitor@example.com",
        message: "Hi, I'd like to discuss a project opportunity."
      }, null, 2),
      responseBody: JSON.stringify({
        status: "success",
        message: "Thank you for your message. I'll get back to you soon!"
      }, null, 2)
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<NetworkRequest | null>(null);
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof NetworkRequest | 'time.total';
    direction: 'asc' | 'desc';
  } | null>(null);

  const maxTime = Math.max(...requests.map(req => req.startTime + req.time.total));
  const gridLines = Array.from({ length: 10 }, (_, i) => i * (maxTime / 10));

  const filteredRequests = requests.filter(req => 
    req.url.toLowerCase().includes(filter.toLowerCase()) ||
    req.method.toLowerCase().includes(filter.toLowerCase()) ||
    req.type.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const getValue = (req: NetworkRequest) => {
      if (sortConfig.key === 'time.total') {
        return req.time.total;
      }
      return req[sortConfig.key as keyof NetworkRequest];
    };

    const aValue = getValue(a) || 0;
    const bValue = getValue(b) || 0;
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof NetworkRequest | 'time.total') => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-500/20 text-green-500";
    if (status >= 300 && status < 400) return "bg-blue-500/20 text-blue-500";
    if (status >= 400) return "bg-red-500/20 text-red-500";
    return "bg-gray-500/20 text-gray-500";
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#d4d4d4]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-800">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setRequests([])}
        >
          <XCircle className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            className="pl-8 bg-transparent border-gray-700"
            placeholder="Filter URLs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="xhr">XHR</SelectItem>
            <SelectItem value="js">JS</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="img">Img</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 flex">
        {/* Main content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Waterfall */}
          <div className="p-4 border-b border-gray-800">
            <div className="relative h-20 w-full bg-gray-900 rounded overflow-hidden">
              {gridLines.map((time, i) => (
                <div
                  key={i}
                  className="absolute h-full w-px bg-gray-800"
                  style={{ left: `${(i * 10)}%` }}
                />
              ))}
              {requests.map((req, index) => (
                <div 
                  key={req.id}
                  className={`absolute h-6 group cursor-pointer ${
                    selectedRequest?.id === req.id ? 'bg-gray-800' : ''
                  }`}
                  style={{
                    top: `${index * 8}px`,
                  }}
                  onClick={() => setSelectedRequest(req)}
                >
                  <div 
                    className="absolute h-full"
                    style={{
                      left: `${(req.startTime / maxTime) * 100}%`,
                      width: `${(req.time.total / maxTime) * 100}%`,
                      minWidth: '2px'
                    }}
                  >
                    <div className="relative h-full flex">
                      <div 
                        className="bg-gray-600"
                        style={{ width: `${(req.time.queueing / req.time.total) * 100}%` }}
                      />
                      <div 
                        className="bg-orange-600"
                        style={{ width: `${(req.time.waiting / req.time.total) * 100}%` }}
                      />
                      <div 
                        className="bg-green-600"
                        style={{ width: `${(req.time.receiving / req.time.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              {gridLines.map((time, i) => (
                <span key={i}>{time}ms</span>
              ))}
            </div>
          </div>

          {/* Request Table */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSort('method')}
                      className="h-8 flex items-center"
                    >
                      Method
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[200px]">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSort('url')}
                      className="h-8 flex items-center"
                    >
                      URL
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSort('time.total')}
                      className="h-8 flex items-center"
                    >
                      Time
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRequests.map((req) => (
                  <TableRow 
                    key={req.id}
                    className={`cursor-pointer ${
                      selectedRequest?.id === req.id ? 'bg-gray-800' : ''
                    }`}
                    onClick={() => setSelectedRequest(req)}
                  >
                    <TableCell className="text-blue-400">{req.method}</TableCell>
                    <TableCell className="font-mono">{req.url}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(req.status)}>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{req.type}</TableCell>
                    <TableCell>{req.size}</TableCell>
                    <TableCell>{req.time.total}ms</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Request details sidebar */}
        {selectedRequest && (
          <div className="w-96 border-l border-gray-800 overflow-hidden flex flex-col">
            <Tabs defaultValue="headers" className="flex-1">
              <TabsList className="w-full justify-start rounded-none border-b border-gray-800">
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="payload">Payload</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="timing">Timing</TabsTrigger>
              </TabsList>
              <ScrollArea className="flex-1">
                <TabsContent value="headers" className="m-0 p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">General</h3>
                      <div className="space-y-1 text-sm">
                        <div>Request URL: {selectedRequest.url}</div>
                        <div>Request Method: {selectedRequest.method}</div>
                        <div>Status Code: {selectedRequest.status}</div>
                        <div>Remote Address: {selectedRequest.remoteAddress}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Response Headers</h3>
                      <div className="space-y-1 text-sm">
                        {Object.entries(selectedRequest.responseHeaders).map(([key, value]) => (
                          <div key={key}>{key}: {value}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Request Headers</h3>
                      <div className="space-y-1 text-sm">
                        {Object.entries(selectedRequest.requestHeaders).map(([key, value]) => (
                          <div key={key}>{key}: {value}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="payload" className="m-0 p-4">
                  {selectedRequest.requestBody ? (
                    <pre className="text-sm">{selectedRequest.requestBody}</pre>
                  ) : (
                    <div className="text-gray-500">No payload data</div>
                  )}
                </TabsContent>
                <TabsContent value="response" className="m-0 p-4">
                  {selectedRequest.responseBody ? (
                    <pre className="text-sm">{selectedRequest.responseBody}</pre>
                  ) : (
                    <div className="text-gray-500">No response data</div>
                  )}
                </TabsContent>
                <TabsContent value="timing" className="m-0 p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Timing Breakdown</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Queueing</span>
                          <span>{selectedRequest.time.queueing}ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Waiting (TTFB)</span>
                          <span>{selectedRequest.time.waiting}ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Content Download</span>
                          <span>{selectedRequest.time.receiving}ms</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold">
                          <span>Total</span>
                          <span>{selectedRequest.time.total}ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkTab;