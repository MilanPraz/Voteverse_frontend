"use client";

import { useLocation } from "react-router-dom";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const candidates = [
  {
    id: 1,
    name: "Jane Smith",
    party: "Progressive Party",
    description: "Education reform advocate with 15 years experience.",
    voteCount: 1234,
  },
  {
    id: 2,
    name: "John Doe",
    party: "Citizens Alliance",
    description: "Local business leader focused on economic growth.",
    voteCount: 1122,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    party: "Unity Coalition",
    description: "Healthcare policy expert and community organizer.",
    voteCount: 897,
  },
  {
    id: 4,
    name: "Michael Chen",
    party: "Future Forward",
    description: "Tech innovator championing digital transformation.",
    voteCount: 756,
  },
  {
    id: 5,
    name: "Emma Wilson",
    party: "Green Alliance",
    description: "Environmental scientist and sustainability advocate.",
    voteCount: 689,
  },
  {
    id: 6,
    name: "Robert Taylor",
    party: "Community First",
    description: "Urban planning expert and social justice advocate.",
    voteCount: 542,
  },
  {
    id: 7,
    name: "Maria Garcia",
    party: "People's Voice",
    description: "Civil rights attorney and education reformer.",
    voteCount: 478,
  },
  {
    id: 8,
    name: "David Park",
    party: "Innovation League",
    description: "Research scientist and technology policy expert.",
    voteCount: 365,
  },
];

export default function Admin() {
  const location = useLocation();
  return (
    <div className="">
      {/* Main Content */}
      <main className="">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Candidate Management Section */}
        <section className="bg-white w-full p-6 rounded-lg shadow">
          {/* Live Vote Count Section */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="">Live Voting Results</CardTitle>
              <CardDescription className="">
                Real-time vote count for each candidate
              </CardDescription>
            </CardHeader>
            <div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={candidates}>
                    <XAxis dataKey="name" tick={{ fill: "white" }} />
                    <YAxis tick={{ fill: "white" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(8px)",
                      }}
                    />
                    <Bar
                      dataKey="voteCount"
                      fill="rgba(16, 185, 129, 0.8)"
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
