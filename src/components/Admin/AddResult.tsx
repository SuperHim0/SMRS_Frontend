import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { addResultOfStudentSubjectwise, getStudent, getSubjectsDetailsWithClass } from "../../Service/AdminService";
import { useEffect, useState } from "react";
import { successNotification } from "../../utility/Notification";

interface SelectItems {
  value: string; // Combobox requires value to be a string
  label: string;
  // className:string;
  // classValue:number;
}
interface StudentInfo {
    id:number;
    rollId:string;
    className:String;
    ClassValue:number;
}

interface ClassSubject {
  value: string;
  label: string;
  classId: number;
  className: string,
}


const AddResult = () => {
  const [selectStudent, setSelectStudent] = useState<SelectItems[]>([]);
  const [StudentDetails, setStudnetDetails] = useState<StudentInfo[]>([]);
  const [selectSubject, setSelectSubject] = useState<ClassSubject[]>([]);
   const [filteredSubjects, setFilteredSubjects] = useState<ClassSubject[]>([]);
  // const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);


  const fetchAllStudentDetails = () => {
    getStudent().then((data) => {
      console.log(data);
      
      const mappedStudents: SelectItems[] = data.map((student: any) => ({
        value: String(student.id), // value must be string
        label: student.name + " - " + student.rollId ,

      }));
      const MappedStudentInfo: StudentInfo[] = data.map((student : any)=>({
          id: student.id,
          rollId:student.rollId,
          className:student.classEntity.name,
          ClassValue:(student.classEntity.id)
      }))
      setSelectStudent(mappedStudents);
      setStudnetDetails(MappedStudentInfo);

    });

    getSubjectsDetailsWithClass().then((data) =>{
      console.log(data);
        
      const mappedSubjects: ClassSubject[] = data.map((item: any) => ({
            value: String(item.subject.id),
            label: item.subject.name,
            classId: item.classEntity.id,
            className: item.classEntity.name,
      }));
      setSelectSubject(mappedSubjects);
    })

  };



  useEffect(() => {
    fetchAllStudentDetails();
  }, []);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
     studentId: "",
      subjectId: "",
      marks: "",
      grade: "",
    },
    validate: {
      marks: (value) => (value && !isNaN(Number(value)) ? null : "Enter valid marks"),
      grade: (value) => (value ? null : "Grade is required"),
    },
  });

   const handleStudentChange = (studentId: string | null) => {
    console.log(studentId);
    
    // setSelectedStudentId(studentId);
    form.setFieldValue("studentId", studentId || "");

    if (studentId) {
      const student = StudentDetails.find((s) => s.id === parseInt(studentId));
      if (student) {
        const filtered = selectSubject.filter(
          (subj) => subj.classId === student.ClassValue
        );
        setFilteredSubjects(filtered);
      } else {
        setFilteredSubjects([]);
      }
    } else {
      setFilteredSubjects([]);
    }
  };

   const handleSubmit = async (values: typeof form.values) => {
    console.log(values);
    
    if (!values.studentId || !values.subjectId || !values.marks || !values.grade) {
      alert("Please fill all fields");
      return;
    }
    const payload = {
      student: { id: Number(values.studentId) },
      subject: { id: Number(values.subjectId) },
      marks: parseFloat(values.marks),
      grade: values.grade,
    };

    addResultOfStudentSubjectwise(payload).then((data)=>{
      console.log(data);
      form.reset();
      successNotification("result updated");
      
    })

  }

  return (
    <div className="flex flex-col w-full">
      <div className="m-5">
        <h1 className="text-xl font-bold mb-4">ADD RESULT</h1>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Select
            checkIconPosition="left"
            onChange={(value) => handleStudentChange(value)}
            data={selectStudent}
            searchable
            nothingFoundMessage="Nothing found..."
            label="Select Student"
            placeholder="Select the Student"
          />
            <Select
            checkIconPosition="left"
            onChange={(value) => form.setFieldValue("subjectId", value || "")}
            data={filteredSubjects}
            searchable
            nothingFoundMessage="Nothing found..."
            label="Select subject"
            placeholder="Select the subject"
          />
          <TextInput
            label="Marks"
            placeholder="Enter the marks"
            {...form.getInputProps("marks")}
            />
            <TextInput
            label="Grade"
            placeholder="Enter the grade (e.g. A, B, C)"
            {...form.getInputProps("grade")}
          />
          <Button type="submit" color="black" fullWidth mt="md">
                      Submit Result
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddResult;
