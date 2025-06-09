// import { Button, Select, TextInput } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { getStudent, getSubjectsDetailsWithClass } from "../../Service/AdminService";
// import { useEffect, useState } from "react";
// import axios from "axios"; // Add axios for POST request

// interface SelectItems {
//   value: string;
//   label: string;
// }

// interface StudentInfo {
//   id: number;
//   rollId: string;
//   className: string;
//   ClassValue: number;
// }

// interface ClassSubject {
//   value: string;
//   label: string;
//   classId: number;
//   className: string;
// }

// const AddResult = () => {
//   const [selectStudent, setSelectStudent] = useState<SelectItems[]>([]);
//   const [StudentDetails, setStudnetDetails] = useState<StudentInfo[]>([]);
//   const [selectSubject, setSelectSubject] = useState<ClassSubject[]>([]);
//   const [filteredSubjects, setFilteredSubjects] = useState<ClassSubject[]>([]);
//   const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

//   const fetchAllStudentDetails = () => {
//     getStudent().then((data) => {
//       const mappedStudents: SelectItems[] = data.map((student: any) => ({
//         value: String(student.id),
//         label: `${student.name} - ${student.rollId}`,
//       }));

//       const MappedStudentInfo: StudentInfo[] = data.map((student: any) => ({
//         id: student.id,
//         rollId: student.rollId,
//         className: student.classEntity.name,
//         ClassValue: student.classEntity.id,
//       }));

//       setSelectStudent(mappedStudents);
//       setStudnetDetails(MappedStudentInfo);
//     });

//     getSubjectsDetailsWithClass().then((data) => {
//       const mappedSubjects: ClassSubject[] = data.map((item: any) => ({
//         value: String(item.subject.id),
//         label: item.subject.name,
//         classId: item.classEntity.id,
//         className: item.classEntity.name,
//       }));
//       setSelectSubject(mappedSubjects);
//     });
//   };

//   useEffect(() => {
//     fetchAllStudentDetails();
//   }, []);

//   const form = useForm({
//     mode: "uncontrolled",
//     initialValues: {
//       studentId: "",
//       subjectId: "",
//       marks: "",
//       grade: "",
//     },
//     validate: {
//       marks: (value) => (value && !isNaN(Number(value)) ? null : "Enter valid marks"),
//       grade: (value) => (value ? null : "Grade is required"),
//     },
//   });

//   const handleStudentChange = (studentId: string | null) => {
//     setSelectedStudentId(studentId);
//     form.setFieldValue("studentId", studentId || "");

//     if (studentId) {
//       const student = StudentDetails.find((s) => s.id === parseInt(studentId));
//       if (student) {
//         const filtered = selectSubject.filter(
//           (subj) => subj.classId === student.ClassValue
//         );
//         setFilteredSubjects(filtered);
//       } else {
//         setFilteredSubjects([]);
//       }
//     } else {
//       setFilteredSubjects([]);
//     }
//   };

//   const handleSubmit = async (values: typeof form.values) => {
//     if (!values.studentId || !values.subjectId || !values.marks || !values.grade) {
//       alert("Please fill all fields");
//       return;
//     }

//     const url = `http://localhost:8888/admin/results/${values.studentId}`;

//     const payload = {
//       student: { id: Number(values.studentId) },
//       subject: { id: Number(values.subjectId) },
//       marks: parseFloat(values.marks),
//       grade: values.grade,
//     };

//     try {
//       const response = await axios.post(url, payload);
//       alert("Result added successfully");
//       console.log("Response:", response.data);
//       form.reset();
//     } catch (error) {
//       alert("Failed to submit result");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full">
//       <div className="m-5">
//         <h1 className="text-xl font-bold mb-4">ADD RESULT</h1>
//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <Select
//             label="Select Student"
//             placeholder="Select the Student"
//             data={selectStudent}
//             searchable
//             onChange={handleStudentChange}
//             value={form.values.studentId}
//           />

//           <Select
//             label="Select Subject"
//             placeholder="Select the Subject"
//             data={filteredSubjects}
//             searchable
//             onChange={(value) => form.setFieldValue("subjectId", value || "")}
//             value={form.values.subjectId}
//           />

//           <TextInput
//             label="Marks"
//             placeholder="Enter the marks"
//             {...form.getInputProps("marks")}
//           />

//           <TextInput
//             label="Grade"
//             placeholder="Enter the grade (e.g. A, B, C)"
//             {...form.getInputProps("grade")}
//           />

//           <Button type="submit" color="black" fullWidth mt="md">
//             Submit Result
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddResult;
