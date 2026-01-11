import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MousePointerClick, Users, Calendar } from 'lucide-react';
import { getAnalyticsData } from '@/actions/analytics';
import { useAuth } from '@/context/AuthContext';
import { format, subDays, startOfDay } from 'date-fns';

export function Analytics() {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [summary, setSummary] = useState({ views: 0, clicks: 0, leads: 0 });

  useEffect(() => {
    if (user?.username) {
        loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user?.username) return;

    // Fetch last 7 days data
    const endDate = new Date();
    const startDate = subDays(endDate, 7);
    
    const events = await getAnalyticsData(user.username, startDate, endDate);
    
    // Process data for charts
    const chartData = [];
    let totalViews = 0;
    let totalClicks = 0;
    let totalLeads = 0;

    for (let i = 6; i >= 0; i--) {
        const date = subDays(endDate, i);
        const dayStr = format(date, 'EEE'); // Mon, Tue, etc.
        const dayEvents = events.filter(e => {
            const eventDate = new Date(e.timestamp);
            return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth();
        });

        const views = dayEvents.filter(e => e.type === 'view').length;
        const clicks = dayEvents.filter(e => e.type === 'click').length;
        const leads = dayEvents.filter(e => e.type === 'lead').length;

        totalViews += views;
        totalClicks += clicks;
        totalLeads += leads;

        chartData.push({
            name: dayStr,
            views,
            clicks,
            leads
        });
    }

    setData(chartData);
    setSummary({ views: totalViews, clicks: totalClicks, leads: totalLeads });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views (7d)</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{summary.views}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks (7d)</CardTitle>
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{summary.clicks}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads (7d)</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{summary.leads}</div>
            </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Area type="monotone" dataKey="views" stroke="#8884d8" fillOpacity={1} fill="url(#colorViews)" />
                        <Area type="monotone" dataKey="clicks" stroke="#82ca9d" fillOpacity={1} fill="url(#colorClicks)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Leads by Day</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="h-[200px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Bar dataKey="leads" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
