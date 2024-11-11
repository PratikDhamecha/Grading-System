// 'use client'

// import { Bell, ChartColumnDecreasing, ListChecks, ListPlus, Search } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [data, setData] = useState(null);
//   const [filteredData, setFilteredData] = useState("");
//   const [showMore, setShowMore] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/students/pendingAssignments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id: '66fe2951239d19f6ae91abf6' }),
//     })
//       .then((response) => response.json())
//       .then((data) => setData(data));
//   }, []);

//   const filteredAssignments = data
//     ? data.filter((assign) =>
//       assign.subject.toLowerCase().includes((filteredData || "").toLowerCase()))
//     : [];

//   const assignmentsToShow = showMore ? filteredAssignments : filteredAssignments.slice(0, 4);

//   return (
//     <div className="ml-28 h-screen w-auto text-black p-4">

//       <div className="flex flex-row justify-between mb-9">
//         {/* Left Side Section  */}
//         <div>
//           <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center float-start relative overflow-hidden me-3">
//             <Image src="/Profile.jpeg" alt="Profile Image" layout="fill" objectFit="cover" />
//           </div>
//           <div className="float-start h-14 w-64 bg-white rounded-full p-1 align-middle">
//             <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center float-start">
//               <ListChecks color="#514DEC" />
//             </div>
//             <div className="float-start ms-2">
//               <p className="font-bold">Pending assignments</p>
//               <p className="text-sm">5</p>
//             </div>
//           </div>

//         </div>

//         {/* Right side section */}
//         <div>
//           <div className="float-end bg-darkblue h-14 rounded-full text-white flex items-center justify-center p-3 ms-3">
//             Add Assignment
//           </div>
//           <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center float-end">
//             <Bell color="#05041F" />
//           </div>
//         </div>

//       </div>

//       <div>
//         <p className="text-gray-500 font-serif text-2xl"> Hello,</p>
//         <h1 className=" font-serif font-bold text-5xl float-start me-3">John Deo</h1>
//         <div className="float-start h-14 w-48 bg-white rounded-full p-1 align-middle">
//           <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center float-start">
//             <ChartColumnDecreasing color="#514DEC" />
//           </div>
//           <div className="float-start ms-2">
//             <p className="font-bold">Statistic</p>
//             <p className="text-sm">Last week</p>
//           </div>
//         </div>
//       </div>

//       {/* Big box */}
//       <div className="mt-4 w-full h-auto float-start bg-gray-300 rounded-2xl p-4 mb-4">
//         <div className="flex space-x-3 mb-3">
//           <div className="w-3/4 h-auto min-h-96 bg-white rounded-2xl p-4">
//             {/* Box-1 Header Content */}
//             <div className="flex flex-row justify-between">
//               <p className="text-2xl font-serif font-bold mb-3">Pending assignments</p>
//               <div className="relative align-middle">
//                 <input
//                   className="bg-slate-200 h-10 rounded-full ps-3 pe-3 w-full"
//                   type="text"
//                   placeholder="Search by subject"
//                   onChange={(e) => setFilteredData(e.target.value)}
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-4 pb-1">
//                   <Search className="text-gray-500" />
//                 </div>
//               </div>
//             </div>

//             {/* Box-1 Content */}
//             <table className="w-full mt-4">
//               <thead className="">
//                 <tr className="text-gray-500">
//                   <th className="text-left font-serif font-bold"></th>
//                   <th className="text-left font-serif font-bold w-3/5">Assignment</th>
//                   <th className="text-left font-serif font-bold">Last Date</th>
//                   <th className="text-left font-serif font-bold"></th>
//                 </tr>
//               </thead>
//               <tbody className="">
//                 {assignmentsToShow.map((assignment) => (
//                   <tr key={assignment.id} className="align-middle mb-3">
//                     <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
//                       {/* Icon or Image */}
//                     </td>
//                     <td>
//                       <p className="font-serif font-bold">{assignment.subject}</p>
//                       <p className="font-serif">{assignment.title}</p>
//                     </td>
//                     <td>
//                       <p className="font-serif font-bold">{new Date(assignment.deadline).toLocaleDateString()}</p>
//                     </td>
//                     <td className="text-right">
//                       <div className="bg-blue text-white p-2 rounded-full inline-flex items-center justify-center">
//                         <ListPlus />
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td colSpan={3} className="flex justify-center items-center align-middle">

//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             {!showMore && filteredAssignments.length > 4 && (
//               <button
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={() => setShowMore(true)}
//               >
//                 View More
//               </button>
//             )}
//           </div>
//           <div className="w-1/4 h-96 bg-white rounded-2xl p-4">
//             {/* Box-2 Header */}
//             <div className="">
//               <p className="text-2xl font-serif font-bold mb-3">Notification</p>
//             </div>
//             {/* Box-2 Content */}
//             <div className="flex space-y-1">
//               <div className="h-10 bg-slate-200 w-full rounded-full flex justify-center items-center">
//                 <p className="text-gray-500">New Assingment of CN uploaded</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex space-x-3">
//           <div className="w-3/4 h-96 bg-white rounded-2xl p-4">
//             {/* Box-1 Header Content */}
//             <div className="flex flex-row justify-between">
//               <p className="text-2xl font-serif font-bold mb-3">Submitted assignments</p>
//               <div className="relative align-middle">
//                 <input
//                   className="bg-slate-200 h-10 rounded-full ps-3 pe-3 w-full"
//                   type="text"
//                   placeholder="Search by subject"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-4 pb-1">
//                   <Search className="text-gray-500" />
//                 </div>
//               </div>
//             </div>

//             {/* Box-1 Content */}
//             <table className="w-full mt-4">
//               <thead className="">
//                 <tr className="text-gray-500">
//                   <th className="text-left font-serif font-bold"></th>
//                   <th className="text-left font-serif font-bold w-3/5">Assignment</th>
//                   <th className="text-left font-serif font-bold">Last Date</th>
//                   <th className="text-left font-serif font-bold"></th>
//                 </tr>
//               </thead>
//               <tbody className="">
//                 <tr className="align-middle">
//                   <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
//                     {/* Icon or Image */}
//                   </td>
//                   <td>
//                     <p className="font-serif font-bold">Computer Networks</p>
//                     <p className="font-serif">Assignment - 6</p>
//                   </td>
//                   <td>
//                     <p className="font-serif font-bold">12/3/2024</p>
//                   </td>
//                   <td className="text-right">
//                     <div className="bg-blue text-white p-2 rounded-full inline-flex items-center justify-center">
//                       <ListPlus />
//                     </div>
//                   </td>
//                 </tr>
//                 <tr className="align-middle">
//                   <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
//                     {/* Icon or Image */}
//                   </td>
//                   <td>
//                     <p className="font-serif font-bold">Data Structures</p>
//                     <p className="font-serif">Assignment - 4</p>
//                   </td>
//                   <td>
//                     <p className="font-serif font-bold">15/3/2024</p>
//                   </td>
//                   <td className="text-right">
//                     <div className="bg-blue text-white p-2 rounded-full inline-flex items-center justify-center">
//                       <ListPlus />
//                     </div>
//                   </td>
//                 </tr>
//                 {/* Add more rows as needed */}
//               </tbody>
//             </table>
//           </div>
//           <div className="w-1/4 h-96 bg-white rounded-2xl p-4 bg-[url('/background.svg')] bg-cover bg-center">
//             {/* Box-2 Content */}
//           </div>
//         </div>
//       </div>


//     </div >
//   );
// }
