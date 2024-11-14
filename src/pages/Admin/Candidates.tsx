"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Trash2, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import AddCandidate from "@/components/candidate/AddCandidate";
import {
  useDeleteCandidateMutation,
  useGetCandidatesQuery,
} from "@/hooks/candidate.hooks";
import PageLoader from "@/components/common/PageLoader";
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
import toast from "react-hot-toast";
import EditCandidate from "@/components/candidate/EditCandidate";

type TCandidate = {
  _id: string;
  fullname: string;
  age: string;
  party: string;
  pic: any;
};

export default function Candidates() {
  //get all candidates
  const { data: allCandidates, isLoading, error } = useGetCandidatesQuery();

  //DELETE CANDIDATE
  const { mutateAsync } = useDeleteCandidateMutation();

  //TO BE EDITED CANDIDATE
  console.log("candidatesssss:", allCandidates);
  console.log("Errors:", error);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  console.log("locationL:", location);

  async function deleteCandidate({
    id,
    publicId,
  }: {
    id: string;
    publicId: string;
  }) {
    console.log("PUBLIC ID HAI:", publicId);

    mutateAsync({ id, publicId })
      .then((res) => {
        console.log("Delete res:", res);
        toast.success("Deleted Successfully!");
      })
      .catch((err) => {
        console.log("Err:", err);
        toast.error(err.message);
      });
  }

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Candidate Management Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Candidates</h2>
            <AddCandidate />
          </div>

          <Table className=" max-w-4xl  w-full">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCandidates?.data.data.map((candidate: TCandidate) => (
                <TableRow key={candidate._id}>
                  <TableCell>
                    <img
                      src={candidate.pic.secureUrl}
                      width={100}
                      height={100}
                      className=" h-16 w-16 rounded-full object-cover "
                    />
                  </TableCell>
                  <TableCell>{candidate.fullname}</TableCell>
                  <TableCell>{candidate.party}</TableCell>
                  <TableCell>{candidate.age}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditCandidate candidate={candidate} />
                      {/* DELETE BUTTON DIALOG */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size={"sm"}
                            variant="outline"
                            className=" bg-red-200 hover:bg-red-400"
                          >
                            <Trash2 className="h-4 w-4" size={20} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteCandidate({
                                  id: candidate._id,
                                  publicId: candidate.pic.publicId,
                                })
                              }
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
}
