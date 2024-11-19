'use client'

import { Bell, ChartColumnDecreasing, ChevronDown, ListChecks, ListPlus, Search, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import CompletionChart from "../components/CompletionChart"
import { useRouter } from "next/navigation"


export default function AdminHome() {
    const [activeTab, setActiveTab] = useState("pending");
    const router = useRouter()

    interface Assignment {
        _id: string;
        subjectName: string;
        title: string;
        createdAt: string;
        deadline: string;
        semesterName: string;
        totalStudents: number;
        pendingStudentsCount: number;
    }

    const [state, setState] = useState<{
        filteredData: string;
        faculty: { name: string };
        assignmentData: Assignment[];
        subjectData: any;
        pendingStudents: any;
        submitedStudents: any;
        showMore: boolean;
        isModalOpen: boolean;
    }>({
        filteredData: '',
        faculty: { name: "" },
        assignmentData: [],
        subjectData: [],
        pendingStudents: [],
        showMore: false,
        isModalOpen: false,
        submitedStudents: []
    });


    useEffect(() => {
        const facultyId = localStorage.getItem("facultyId")
        // Get Faculty Details
        fetch("http://localhost:5000/faculties/" + facultyId)
            .then((res) => res.json())
            .then((data) => setState((prevState) => ({ ...prevState, faculty: data })))

        // Get Assignment Details of that faculty
        fetch("http://localhost:5000/assignments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ facultyId: facultyId })
        })
            .then((res) => res.json())
            .then((data) => setState((prevState) => ({ ...prevState, assignmentData: data })))

        // Get Subject details of that faculty
        fetch("http://localhost:5000/subjects/getSubjectByFaculty/" + facultyId)
            .then((res) => res.json())
            .then((data) => setState((prevState) => ({ ...prevState, subjectData: data })))

    }, [])

    const setPendingStudents = async (id: any) => {
        const response = await fetch("http://localhost:5000/assignments/pendingStudents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id })
        })
        const data = await response.json()
        setState((prevState) => ({ ...prevState, pendingStudents: data }))

        fetch("http://localhost:5000/assignments/submittedStudents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id })
        })
            .then((res) => res.json())
            .then((data) => setState((prevState) => ({ ...prevState, submitedStudents: data })))
    }

    const handleViewMoreClick = () => {
        setState((prevState) => ({ ...prevState, showMore: true }))
        setState((prevState) => ({ ...prevState, isModalOpen: true }))
    };

    const filteredAssignment = state.assignmentData ? state.assignmentData.filter((data) => data.subjectName.includes(state.filteredData)) : []

    return (
        <>
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
                        <div className="float-end bg-darkblue h-14 rounded-full text-white flex items-center justify-center p-3 ms-3 cursor-pointer" onClick={() => {
                            router.replace('/Admin/Add-Assignment')
                        }}>
                            Add Assignment
                        </div>
                        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center float-end">
                            <Bell color="#05041F" />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500 font-serif text-2xl"> Prof.</p>
                    <h1 className=" font-serif font-bold text-5xl float-start me-3">{state.faculty.name}</h1>
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
                {/* Big Box */}
                <div className="mt-4 w-full h-auto float-start bg-gray-300 rounded-2xl p-4 mb-4">
                    <div className="flex space-x-3 mb-3">
                        <div className="w-3/4 h-auto min-h-96 bg-white rounded-2xl p-4">
                            {/* Box-1 Header Content */}
                            <p className="text-2xl font-serif font-bold mb-3 float-start">Assignmens</p>
                            <div className="flex flex-row justify-end align-middle space-x-2">
                                <div className="relative">
                                    <input
                                        className="bg-slate-200 h-10 rounded-lg ps-3 pe-3 w-full"
                                        type="text"
                                        placeholder="Search by subject"
                                        onChange={(e) => setState((prevState) => ({ ...prevState, filteredData: e.target.value }))}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pb-1">
                                        <Search className="text-gray-500" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <select className="bg-slate-200 h-10 rounded-lg ps-3 pe-10 w-full appearance-none text-gray-700" onChange={(e) => {
                                        setState((prevState) => ({ ...prevState, filteredData: e.target.value }))
                                    }}>
                                        <option value="">Select Subject</option>
                                        {state.subjectData.map((subject: any) => {
                                            return (
                                                <option key={subject._id} value={subject.subjectName} className="text-gray-700">{subject.subjectName}</option>
                                            )
                                        })}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                        <ChevronDown className="text-gray-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Box-1 Content */}
                            <table className="w-full mt-4">
                                <thead className="">
                                    <tr className="text-gray-500">
                                        <th className="text-left font-serif font-bold"></th>
                                        <th className="text-left font-serif font-bold w-2/6">Assignment</th>
                                        <th className="text-left font-serif font-bold">Semester</th>
                                        <th className="text-left font-serif font-bold">Total Studetns</th>
                                        <th className="text-left font-serif font-bold">Pending Students</th>
                                        <th className="text-right font-serif font-bold">View</th>
                                    </tr>
                                </thead>
                                <tbody className="">

                                    {filteredAssignment.map((assignment) => (
                                        <tr key={assignment._id} className="align-middle h-16">
                                            <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                                                {/* Icon or Image */}
                                            </td>
                                            <td>
                                                <p className="font-serif font-bold">{assignment.subjectName}</p>
                                                <p className="font-serif">{assignment.title}</p>
                                            </td>
                                            <td>
                                                <p className="font-serif font-bold">{assignment.semesterName}</p>
                                            </td>
                                            <td>
                                                <p className="font-serif font-bold">{assignment.totalStudents}</p>
                                            </td>
                                            <td>
                                                <p className="font-serif font-bold">{assignment.pendingStudentsCount}</p>
                                            </td>
                                            <td className="text-right">
                                                <div className="bg-blue text-white p-2 rounded-full inline-flex items-center justify-center cursor-pointer" onClick={() => {
                                                    setPendingStudents(assignment._id)
                                                    handleViewMoreClick()
                                                }}>
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
                            {/* {(
                                <div
                                    className="mt-4 text-gray-500 px-4 py-2 rounded w-full text-center cursor-pointer flex justify-center items-center"
                                    onClick={() => { setShowMore(true); setIsModalOpen(true); }}
                                >
                                    View More
                                </div>
                            )} */}
                        </div>
                        <div className="w-1/4 h-96 bg-white rounded-2xl p-4">
                            {/* Box-2 Header */}
                            <div className="">
                                <p className="text-2xl font-serif font-bold mb-3">Graph</p>
                            </div>
                            {/* Box-2 Content */}
                            <CompletionChart
                                pendingStudentsCount={200}
                                totalStudents={373}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Assignments Modal */}
            <div className={`fixed inset-0 bg-gray-600 shadow-2xl shadow-darkblue bg-opacity-50 flex items-center justify-center modal-overlay modal-overlay ${state.isModalOpen ? 'show' : ''}`}>
                <div className={`bg-white p-4 rounded-lg w-3/4 h-3/4 overflow-auto text-black modal-content ${state.isModalOpen ? 'show' : ''}`}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex justify-start space-x-5">
                            <div className={`text-2xl font-serif font-bold cursor-pointer ${activeTab === "pending" ? "border-b-4 border-blue" : ""}`} onClick={() => { setActiveTab("pending") }}>Pending Students</div>
                            <div className={`text-2xl font-serif font-bold cursor-pointer ${activeTab === "submitted" ? "border-b-4 border-blue" : ""}`} onClick={() => { setActiveTab("submitted") }}>Submitted Students</div>
                        </div>
                        <button
                            className="text-darkblue font-bold"
                            onClick={() => setState((prevState) => ({ ...prevState, isModalOpen: false }))}
                        >
                            <X />
                        </button>
                    </div>

                    <table className="w-full mt-4">
                        <thead className="">
                            <tr className="text-gray-500">
                                <th className="text-left font-serif font-bold"></th>
                                <th className="text-left font-serif font-bold ">Name</th>
                                <th className="text-left font-serif font-bold">Submission Date</th>
                                <th className="text-left font-serif font-bold">Grade</th>
                                <th className="text-left font-serif font-bold w-2/6">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {activeTab === "pending" && state.pendingStudents.map((student: any) => (
                                <tr key={student._id} className="align-middle h-16">
                                    <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                                        {/* Icon or Image */}
                                    </td>
                                    <td>
                                        <p className="font-serif font-bold">{student.name}</p>
                                    </td>
                                    <td>
                                        <p className="font-serif font-bold">{new Date(student.assignments[0].submissionDate).toLocaleDateString()}</p>
                                    </td>
                                    <td>
                                        <p className="font-serif font-bold">{student.assignments[0].grade}</p>
                                    </td>
                                    <td className="text-left">
                                        <p className="font-serif font-bold">{student.assignments[0].remarks}</p>
                                    </td>
                                </tr>
                            ))}
                            {activeTab === "submitted" && state.submitedStudents.map((student: any) => (
                                <tr key={student.id} className="align-middle h-16">
                                    <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                                        {/* Icon or Image */}
                                    </td>
                                    <td>
                                        <p className="font-serif font-bold">{student.name}</p>
                                    </td>
                                    <td>
                                        <p className="font-serif font-bold">{new Date(student.assignments.submissionDate).toLocaleDateString()}</p>
                                    </td>
                                    <td>
                                        <p className="font-serif font-bold">{student.assignments.grade}</p>
                                    </td>
                                    <td className="text-right">
                                        <p className="font-serif font-bold">{student.assignments.remarks}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}