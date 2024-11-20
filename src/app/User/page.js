'use client'
import { Bell, ChartColumnDecreasing, ChevronDown, CrossIcon, ListChecks, ListPlus, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
  const [pedningAssignment, setPedningAssignment] = useState([]);
  const [filteredPendingAssignment, setFilteredPendingAssignment] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [submittedAssignment, setSubmittedAssignment] = useState([]);
  const [filteredSubmittedAssignment, setFilteredSubmittedAssignment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [student, setStudent] = useState({});
  const [subject, setSubject] = useState([])

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    // Get student
    fetch("http://localhost:5000/students/" + studentId)
      .then((response) => response.json())
      .then((data) => setStudent(data));
    // Get pendingAssignment
    fetch("http://localhost:5000/students/pendingAssignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: studentId }),
    })
      .then((response) => response.json())
      .then((data) => setPedningAssignment(data));
    // submittedAssignment
    fetch("http://localhost:5000/students/submittedAssignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: '6731b55168ef4fec1c15322b' }),
    })
      .then((response) => response.json())
      .then((data) => setSubmittedAssignment(data));
  }, []);
  // Get subjects
  fetch("http://localhost:5000/semesters/getSemesterById/" + student.semester)
    .then((res) => res.json)
    .then((data) => setSubject(data.students))
  const handleViewMoreClick = () => {
    setShowMore(true);
    setIsModalOpen(true);
  };
  const filteredAssignments = pedningAssignment
    ? pedningAssignment.filter((assign) =>
      assign.subjectName?.toLowerCase().includes(filteredPendingAssignment.toLowerCase())
    ) : [];
  const assignmentsToShow = showMore ? filteredAssignments : filteredAssignments.slice(0, 4);

  const filteredSubmittedAssignments = submittedAssignment
    ? submittedAssignment.filter((assign) =>
      assign.assignmentDetails.subjectName?.toLowerCase().includes((filteredSubmittedAssignment || "").toLowerCase())
    )
    : [];
  const submittedAssignmentsToShow = filteredSubmittedAssignments.slice(0, 4);
  const getBackgroundColorClass = (grade) => {
    if (grade == 'A' || grade == 'A+') {
      return 'bg-green-500';
    } else if (grade == 'B' || grade == 'B+') {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };

  return (
    <div className="ml-28 h-screen w-auto text-black p-4">
      <div className="flex flex-row justify-between mb-9">
        {/* Left Side Section  */}
        <div>
          <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center float-start relative overflow-hidden me-3">
            <Image src="/Profile.jpeg" alt="Profile Image" layout="fill" objectFit="cover" />
          </div>
          <div className="float-start h-14 w-64 bg-white rounded-full p-1 align-middle">
            <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center float-start">
              <ListChecks color="#514DEC" />
            </div>
            <div className="float-start ms-2">
              <p className="font-bold">Pending assignments</p>
              <p className="text-sm">5</p>
            </div>
          </div>
        </div>
        {/* Right side section */}
        <div>
          <div className="float-end bg-darkblue h-14 rounded-full text-white flex items-center justify-center p-3 ms-3">
            Add Assignment
          </div>
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center float-end">
            <Bell color="#05041F" />
          </div>
        </div>
      </div>
      <div>
        <p className="text-gray-500 font-serif text-2xl"> Hello,</p>
        <h1 className=" font-serif font-bold text-5xl float-start me-3">{student.name}</h1>
        <div className="float-start h-14 w-48 bg-white rounded-full p-1 align-middle">
          <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center float-start">
            <ChartColumnDecreasing color="#514DEC" />
          </div>
          <div className="float-start ms-2">
            <p className="font-bold">Statistic</p>
            <p className="text-sm">Last week</p>
          </div>
        </div>
      </div>
      {/* Big box */}
      <div className="mt-4 w-full h-auto float-start bg-gray-300 rounded-2xl p-4 mb-4">
        <div className="flex space-x-3 mb-3">
          <div className="w-3/4 h-auto min-h-96 bg-white rounded-2xl p-4">
            {/* Box-1 Header Content */}
            <div className="flex flex-row justify-between">
              <p className="text-2xl font-serif font-bold mb-3">Pending assignments</p>
              <div className="flex flex-row justify-end align-middle space-x-2">
                <div className="relative">
                  <input
                    className="bg-slate-200 h-10 rounded-full ps-3 pe-3 w-full"
                    type="text"
                    placeholder="Search by subject"
                    onChange={(e) => setFilteredPendingAssignment(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pb-1">
                    <Search className="text-gray-500" />
                  </div>
                </div>
                <div className="relative">
                  <select className="bg-slate-200 h-10 rounded-lg ps-3 pe-10 w-full appearance-none text-gray-700" onChange={(e) => {
                    setFilteredPendingAssignment(e.target.value)
                  }}>
                    <option value="">Select Subject</option>
                    {/* {subject.map((subject) => {
                      return (
                        <option key={subject._id} value={subject.subjectName} className="text-gray-700">{subject.subjectName}</option>
                      )
                    })} */}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            {/* Box-1 Content */}
            <table className="w-full mt-4">
              <thead className="">
                <tr className="text-gray-500">
                  <th className="text-left font-serif font-bold"></th>
                  <th className="text-left font-serif font-bold w-3/6">Assignment</th>
                  <th className="text-left font-serif font-bold">Starting Date</th>
                  <th className="text-left font-serif font-bold">Last Date</th>
                  <th className="text-left font-serif font-bold"></th>
                </tr>
              </thead>
              <tbody className="">
                {assignmentsToShow.map((assignment) => (
                  <tr key={assignment._id} className="align-middle h-16">
                    <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                      {/* Icon or Image */}
                    </td>
                    <td>
                      <p className="font-serif font-bold">{assignment.subjectName}</p>
                      <p className="font-serif">{assignment.title}</p>
                    </td>
                    <td>
                      <p className="font-serif font-bold">{new Date(assignment.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td>
                      <p className="font-serif font-bold">{new Date(assignment.deadline).toLocaleDateString()}</p>
                    </td>
                    <td className="text-right">
                      <div className="bg-blue text-white p-2 rounded-full inline-flex items-center justify-center">
                        <ListPlus />
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="flex justify-center items-center align-middle">

                  </td>
                </tr>
              </tbody>
            </table>
            {pedningAssignment > 4 && (
              <div
                className="mt-4 text-gray-500 px-4 py-2 rounded w-full text-center cursor-pointer flex justify-center items-center"
                onClick={handleViewMoreClick}
              >
                View More
              </div>
            )}
          </div>
          <div className="w-1/4 h-96 bg-white rounded-2xl p-4">
            {/* Box-2 Header */}
            <div className="">
              <p className="text-2xl font-serif font-bold mb-3">Notification</p>
            </div>
            {/* Box-2 Content */}
            <div className="flex space-y-1">
              <div className="h-10 bg-slate-200 w-full rounded-full flex justify-center items-center">
                <p className="text-gray-500">New Assingment of CN uploaded</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <div className="w-3/4 h-96 bg-white rounded-2xl p-4">
            {/* Box-1 Header Content */}
            <div className="flex flex-row justify-between">
              <p className="text-2xl font-serif font-bold mb-3">Submitted assignments</p>
              <div className="relative align-middle">
                <input
                  className="bg-slate-200 h-10 rounded-full ps-3 pe-3 w-full"
                  type="text"
                  placeholder="Search by subject"
                  onChange={(e) => setFilteredSubmittedAssignment(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pb-1">
                  <Search className="text-gray-500" />
                </div>
              </div>
            </div>

            {/* Box-1 Content */}
            <table className="w-full mt-4">
              <thead className="">
                <tr className="text-gray-500">
                  <th className="text-left font-serif font-bold"></th>
                  <th className="text-left font-serif font-bold w-3/6">Assignment</th>
                  <th className="text-left font-serif font-bold">Submission Date</th>
                  <th className="text-left font-serif font-bold">Remarks</th>
                  <th className="text-right font-serif font-bold">Grade</th>
                </tr>
              </thead>
              <tbody className="">
                {submittedAssignmentsToShow.map((assignment) => (
                  <tr key={assignment._id} className="align-middle h-16">
                    <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                      {/* Icon or Image */}
                    </td>
                    <td>
                      <p className="font-serif font-bold">{assignment.assignmentDetails.subjectName}</p>
                      <p className="font-serif">{assignment.assignmentDetails.title}</p>
                    </td>
                    <td>
                      <p className="font-serif font-bold">{new Date(assignment.assignments.submissionDate).toLocaleDateString()}</p>
                    </td>
                    <td>
                      <p className="font-serif font-bold">{assignment.assignments.remarks}</p>
                    </td>
                    <td className="text-right">
                      <div className={`${getBackgroundColorClass(assignment.assignments.grade)}  text-white h-8 w-8 p-2 rounded-full inline-flex items-center justify-center`}>
                        <p className="font-serif font-bol">{assignment.assignments.grade}</p>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
          <div className="w-1/4 h-96 bg-white rounded-2xl p-4 bg-[url('/background.svg')] bg-cover bg-center">
            {/* Box-2 Content */}
          </div>
        </div>
      </div>

      {/* Pending Assignments Modal */}
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center modal-overlay modal-overlay ${isModalOpen ? 'show' : ''}`}>
        <div className={`bg-white p-4 rounded-lg w-3/4 h-3/4 overflow-auto modal-content ${isModalOpen ? 'show' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif font-bold">All Pending Assignments</h2>
            <button
              className="text-darkblue font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              <X />
            </button>
          </div>
          <table className="w-full mt-4">
            <thead className="">
              <tr className="text-gray-500">
                <th className="text-left font-serif font-bold"></th>
                <th className="text-left font-serif font-bold w-3/6">Assignment</th>
                <th className="text-left font-serif font-bold">Starting Date</th>
                <th className="text-left font-serif font-bold">Last Date</th>
                <th className="text-left font-serif font-bold"></th>
              </tr>
            </thead>
            <tbody className="">
              {pedningAssignment.map((assignment) => (
                <tr key={assignment._id} className="align-middle h-16">
                  <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                    {/* Icon or Image */}
                  </td>
                  <td>
                    <p className="font-serif font-bold">{assignment.subjectName}</p>
                    <p className="font-serif">{assignment.title}</p>
                  </td>
                  <td>
                    <p className="font-serif font-bold">{new Date(assignment.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td>
                    <p className="font-serif font-bold">{new Date(assignment.deadline).toLocaleDateString()}</p>
                  </td>
                  <td className="text-right">
                    <div className="bg-blue text-white p-2 rounded-full inline-flex items-center justify-center">
                      <ListPlus />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div >
  );
}
