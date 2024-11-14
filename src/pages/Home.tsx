import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Logout from "@/components/common/Logout";
import axios from "axios";
import { useUserInfo } from "@/store/userDetail";
import { Link } from "react-router-dom";
import {
  useGetCandidatesQuery,
  useVoteCandidateMutation,
} from "@/hooks/candidate.hooks";
import PageLoader from "@/components/common/PageLoader";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;

type TCandidate = {
  _id: string;
  fullname: string;
  age: string;
  party: string;
  pic: any;
};

export default function Home() {
  const { mutateAsync } = useVoteCandidateMutation();
  const userInfo = useUserInfo((state) => state.userInfo);
  console.log("Home ma info::", userInfo);
  const { data: allCandidates, isLoading, error } = useGetCandidatesQuery();

  console.log("CANDIDATES:", allCandidates);

  const handleVote = async (candidateId: string) => {
    console.log(`Voted for candidate ${candidateId}`);
    mutateAsync(candidateId)
      .then((res) => {
        console.log("VOTE RES:", res);
        toast.success("Voted!");
      })
      .catch((err) => {
        console.log("VOTE ERROR:", err);
        toast.error(err.message);
      });
  };

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-400 p-4">
      <div className="max-w-7xl mx-auto space-y-8 relative">
        {/* Header */}

        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Election 2024</h1>
          <p className="text-xl">Cast your vote for the future</p>
        </div>
        <div className="flex gap-4 justify-between">
          <Link
            className="
            btn-gradient  h-10
            "
            to={"/profile"}
          >
            Profile
          </Link>
          <Logout />
        </div>
        {/* <button onClick={() => testing()}>TEst</button> */}

        {/* Candidates Section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allCandidates?.data.data.map((candidate: TCandidate) => (
            <Card
              key={candidate._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
            >
              <CardHeader className="p-4 pb-2">
                <div className="aspect-square bg-gray-200/30 rounded-lg overflow-hidden mb-3">
                  <img
                    alt={candidate.fullname}
                    src={candidate.pic.secureUrl}
                    height={400}
                    width={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg text-white">
                  {candidate.fullname}
                </CardTitle>
                {/* <CardDescription className="text-white/80">
                  {candidate.party}
                </CardDescription> */}
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-3">
                <p className="text-sm text-white/70 line-clamp-2">
                  {candidate.party}
                </p>

                {/* VOTE BUTTON */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full bg-emerald-500/80 hover:bg-emerald-600/90 backdrop-blur-sm">
                      Vote
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleVote(candidate._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Vote Count Section */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Live Voting Results</CardTitle>
            <CardDescription className="text-white/80">
              Real-time vote count for each candidate
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
