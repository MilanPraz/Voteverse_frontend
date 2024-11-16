"use client";

import PageLoader from "@/components/common/PageLoader";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCandidatesQuery } from "@/hooks/candidate.hooks";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Admin() {
  const { data: allCandidates, isLoading } = useGetCandidatesQuery();

  if (isLoading) {
    return <PageLoader />;
  }
  // const location = useLocation();
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
                  <BarChart data={allCandidates?.data.data}>
                    <XAxis dataKey="fullname" tick={{ fill: "white" }} />
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
