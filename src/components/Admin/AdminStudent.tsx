import { Badge, Button, Card, Group, Input, Modal, SimpleGrid, Text, TextInput } from "@mantine/core"
import { IconClipboard, IconEdit } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import {  getStudent, updateStudent } from "../../Service/AdminService";
import { useDisclosure } from "@mantine/hooks";
import {  useNavigate } from "react-router-dom";
import { errorNotification, successNotification } from "../../utility/Notification";
// import getStudent from "../../Service/AdminService/";

type Student = {
        id: number,
        name: string,
        rollId: string,
        classEntity: {
            id: number,
            name: string
        },
        dob: string,
        email: string,
        phone: string
}



export const AdminStudent = () => {


  const [name , setName] = useState("");
  const [email ,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");


  const navigate = useNavigate();
  const [studentDetails,setStudentDetails] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
    gettingAllStudent();
}, [])
// fetching the data from the backend
    const gettingAllStudent=()=>{
        getStudent().then((data : Student[])=>{
            setStudentDetails(data);
        });
    };
    // opening and closing mode when click on edit
    const handleOpenStudentInfo = (student : Student)=>{
        setSelectedStudent(student);
        setEmail(student.email);
        setDateOfBirth(student.dob);
        setName(student.name);
        setPhone(student.phone);

        open();
    };
    // searching the student on the basis of there roll number and name
    const filteredStudents = studentDetails.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddStudent =() =>{
        navigate("/admin/addstudent");
    }
  const handleUpdateStudentForm = (oldStudentInfo : any) => {

    if (!oldStudentInfo) {
      console.error("No student selected");
      return;
    }

    const student : Student ={
        id: oldStudentInfo.id,
        name: name,
        rollId: oldStudentInfo.rollId,
        classEntity: {
            id: oldStudentInfo.classEntity.id,
            name: oldStudentInfo.classEntity.name
        },
        dob: dateOfBirth,
        email: email,
        phone: phone
    }

    try {
      updateStudent(student).then((data)=>{
        console.log(data);
        // navigate("/admin/student");
        successNotification("Student updated..");
      });
      
    } catch (error) {
      errorNotification("something went Wrong not updated !")
    }

    // successNotification("update success")
    console.log(student);
    
  }

  return (
    <div className="flex flex-col w-full">
        <div className="m-5">
            {/* //searching module */}
        <div className="flex w-full justify-center mt-2">
            <Input w={450} radius="xl" placeholder=" search by name or RollNumber"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
            ></Input>
        </div>
        {/* //adding student */}
         
        <div>
            <Button color="pink" onClick={(handleAddStudent)}>ADD STUDENT</Button>
        </div>

        
        <div className="mt-5">
            <SimpleGrid cols={4} spacing="lg">
        {
            filteredStudents.map((student) => (
                <Card shadow="sm" padding="lg" radius="md" withBorder key={student.id} 
                
                >
                <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Roll No: {student.rollId} </Text>
                <Button color="gray" onClick={()=> handleOpenStudentInfo(student)} ><IconEdit /> Edit</Button>
                </Group>

                <Group justify="space-between">
                <Text size="sm" c="dimmed">
                Name : {student.name}
                </Text>
                 <Badge h={28} color="pink">{student.classEntity.name}</Badge>
                </Group>
                </Card>
            ))
        }
         <Modal
          opened={opened}
          onClose={close}
          title={<span className="text-red-500 font-semibold flex gap-2 items-center text-xl "><IconClipboard/> STUDENT DETAILS</span>}
          overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
          classNames={{ content: 'rounded-md' }}
          size="xl"

          centered
        >
          {selectedStudent && (

            <div className="flex justify-center items-center ">
              <form onSubmit={(e)=>{e.preventDefault(); handleUpdateStudentForm(selectedStudent) }}>
                <TextInput
                w={500}
                withAsterisk
                label="Roll Number"
                mt={5}
                value={selectedStudent.rollId}
                disabled
                // key={form.key('email')}
                // {...form.getInputProps('email')}
                />
                 <TextInput
                w={500}
                withAsterisk
                label="Name"
                value={name}
                mt={5}
                placeholder="Update Student Name"
                onChange={(event) =>  setName(event.currentTarget.value)}
                // key={form.key('email')}
                // {...form.getInputProps('email')}
                />
                <TextInput
                w={500}
                withAsterisk
                label="Phone"
                value={phone}
                mt={5}
                placeholder="Update student Phone number"
                onChange={(event) =>  setPhone(event.currentTarget.value)}
                // key={form.key('email')}
                // {...form.getInputProps('email')}
                />
                <TextInput
                w={500}
                withAsterisk
                label="Dob"
                value={dateOfBirth}
                placeholder="update DOB"
                disabled
                mt={5}
                onChange={(event) =>  setDateOfBirth(event.currentTarget.value)}
                // key={form.key('email')}
                // {...form.getInputProps('email')}
                />
                <TextInput
                w={500}
                withAsterisk
                label="Email"
                value={email}
                placeholder="your@email.com"
                mt={5}
                onChange={(event) =>  setEmail(event.currentTarget.value)}
                // key={form.key('email')}
                // {...form.getInputProps('email')}
                />
                
                <Group mt={15} w={500}>

                <Button w={242} color="gray" type="submit" >UPDATE</Button>
                <Button w={242} color="red" onClick={()=>{errorNotification("Not Working..")}} >DELETE</Button>
                </Group>
              </form>
            </div>
            // <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white">
            //   <Title order={3} className="text-red-500 mb-2">
            //     📢 {selectedStudent.rollId}
            //   </Title>
            //    <TextInput
            //     w={500}
            //     withAsterisk
            //     label="Email"
            //     value={name}
            //     placeholder="your@email.com"
            //     onChange={(event) =>  setName(event.currentTarget.value)}
            //     // key={form.key('email')}
            //     // {...form.getInputProps('email')}
            //     />
            //   <div className="mb-2 mt-2">
            //     <Text size="sm" className="text-gray-500 text-right">
            //       {new Date(selectedStudent.dob).toLocaleString()}
            //     </Text>
            //   </div>
            //   <Text className="mb-2">{selectedStudent.name}</Text>
            // </Card>
          )} 
        </Modal>
            
        </SimpleGrid>
        </div>

        </div>
    </div>
  )
}
