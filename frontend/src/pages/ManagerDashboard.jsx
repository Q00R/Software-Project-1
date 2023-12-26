import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, XAxis, YAxis, Pie, Cell, Tooltip, Legend } from 'recharts';

const backend_url = 'http://localhost:3000/manager/generateAnalytics/ticket';

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState({
    allData_TicketUserAgent: [],
    Analytics: [],
  });

  const [formattedData, setFormattedData] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(backend_url);
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  useEffect(() => {
    // Fetch analytics when the component mounts
    fetchAnalytics();
  }, []);

  useEffect(() => {
    // Ensure data is available before processing
    if (analyticsData.Analytics.length > 0) {
      const mainIssueCounts = analyticsData.Analytics[0].mainIssueCounts;

      // Transform data into the required format
      setFormattedData(
        mainIssueCounts.map((issueCount) => ({
          mainIssues: issueCount.mainIssue,
          counts: issueCount.count,
        }))
      );

      // Log the formatted data
      console.log('Formatted Data:', formattedData);
    }
  }, [analyticsData]);

  return (
    <div>
      <div className="p-2">
        {/* Bar Chart */}
        {analyticsData.Analytics[0] && analyticsData.Analytics[0].mainIssueCounts && (
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Main Issue Counts</h2>
            <div className="bg-white shadow-md p-4">
              <BarChart width={600} height={300} data={formattedData}>
                <Bar dataKey="counts" fill="#8884d8" label={{ position: 'top' }} />
                <XAxis dataKey="mainIssues" />
                <YAxis dataKey="counts" />
                <Tooltip />
                <Legend />
              </BarChart>
            </div>
          </div>
        )}

        {/* Pie Chart */}
        {analyticsData.Analytics[0] && analyticsData.Analytics[0].subIssueCounts && (
          <div>
            <h2 className="text-lg font-bold mb-2">Most Frequent Sub-Issues</h2>
            <div className="bg-white shadow-md p-4">
              <PieChart width={400} height={400}>
                <Pie
                  data={analyticsData.Analytics[0].subIssueCounts}
                  dataKey="count"
                  nameKey="subIssue"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {analyticsData.Analytics[0].subIssueCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#${index + 9}${index + 2}${index + 7}`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto p-2">
      <table className="table-auto w-full border-collapse border bg-white shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2 text-center">Issuer User Name</th>
                        <th className="border p-2 text-center">Issuer Email</th>
                        <th className="border p-2 text-center">Ticket Main Issue</th>
                        <th className="border p-2 text-center">Ticket Sub Issue</th>
                        <th className="border p-2 text-center">Ticket Title</th>
                        <th className="border p-2 text-center">Ticket Status</th>
                        <th className="border p-2 text-center">Ticket Creation Date</th>
                        <th className="border p-2 text-center">Ticket Resolution Date</th>
                        <th className="border p-2 text-center">Ticket Resolution Time</th>
                        <th className="border p-2 text-center">Ticket Rating</th>
                        <th className="border p-2 text-center">Agent Rating</th>
                        <th className="border p-2 text-center">Agent User Name</th>
                        <th className="border p-2 text-center">Agent Email</th>
                        <th className="border p-2 text-center">Agent Main Role</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(analyticsData.allData_TicketUserAgent) &&
                        analyticsData.allData_TicketUserAgent.map((item) => (
                            <tr className="hover:bg-gray-100 border-b" key={item.id}>
                                <td className="p-2 text-center">{item.issuerUsername}</td>
                                <td className="p-2 text-center">{item.userEmail}</td>
                                <td className="p-2 text-center">{item.ticketMainIssue}</td>
                                <td className="p-2 text-center">{item.ticketSubIssue}</td>
                                <td className="p-2 text-center">{item.tickettitle}</td>
                                <td className="p-2 text-center">{item.ticketStatus}</td>
                                <td className="p-2 text-center">{item.ticketCreationDate}</td>
                                <td className="p-2 text-center">{item.ticketResolutionDate}</td>
                                <td className="p-2 text-center">{item.resolutionTime}</td>
                                <td className="p-2 text-center">{item.ticketRating}</td>
                                <td className="p-2 text-center">{item.agentRating}</td>
                                <td className="p-2 text-center">{item.agentUserName}</td>
                                <td className="p-2 text-center">{item.agentEmail}</td>
                                <td className="p-2 text-center">{item.agentMainRole}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            
      </div>
    </div>
  );
};

export default AnalyticsPage;
