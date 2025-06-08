import { Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { getStudent } from "../../Service/AdminService";
import { useEffect, useState } from "react";

interface SelectItems {
  value: string; // Combobox requires value to be a string
  label: string;
}

const AddResult = () => {
  const [selectStudent, setSelectStudent] = useState<SelectItems[]>([]);

  const fetchAllStudentDetails = () => {
    getStudent().then((data) => {
      const mappedStudents: SelectItems[] = data.map((student: any) => ({
        value: String(student.id), // value must be string
        label: student.name + " - " + student.rollId
      }));
      setSelectStudent(mappedStudents);
    });
  };

  useEffect(() => {
    fetchAllStudentDetails();
  }, []);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className="flex flex-col w-full">
      <div className="m-5">
        <h1>ADD RESULT</h1>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Select
            checkIconPosition="left"
            onChange={(value) => console.log(value)}
            data={selectStudent}
            searchable
            nothingFoundMessage="Nothing found..."
            label="Select Student"
            placeholder="Select the Student"
          />
            <Select
            checkIconPosition="left"
            onChange={(value) => console.log(value)}
            data={selectStudent}
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

        </form>
      </div>
    </div>
  );
};

export default AddResult;
