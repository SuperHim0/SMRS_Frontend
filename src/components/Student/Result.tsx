import { Button, Divider, Table, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import {getResult} from '../../Service/StudentService';
import { useState } from 'react';


const Result = () => {
 
   const [studentInfo, setStudentInfo] = useState({
  message:'Result Not Found',
  name: '',
  class: '',
  rollNumber: '',
  dob: '',
  email: '',
  phone: '',
  subjects: [] as { name: string; marks: number; grade: string }[],
});
  
  
 const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      rollNumber: "",
    },
    validate: {
      rollNumber: (value) =>
        value.startsWith('R') ? null : 'Invalid Roll Number',
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    
    getResult(values.rollNumber).then((data : any) =>{
        if(data.length === 0){
            return;
        }
        console.log(data);
        
        const student = data[0].student;
        
        setStudentInfo({
        message:'Resule Found',
        name: student.name,
        class: student.classEntity.name,
        rollNumber: student.rollId,
        dob: student.dob,
        email: student.email,
        phone: student.phone,
        subjects: data.map((entry: any) => ({
          name: entry.subject.name,
          marks: entry.marks,
          grade: entry.grade,
        })),
        
        });
        console.log(studentInfo);
        
    }).catch((error : any)=>{
        console.log("error getting result "+error);
    });
    
  }
  return (
    <>
      <h1 className="flex justify-center items-center text-red-300 font-bold ">Result</h1>
      <div className="h-full flex item-center justify-center mt-10">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput 
            className='focus:'
            name='rollNumber'
            placeholder="Enter your roll number"
            {...form.getInputProps('rollNumber')}
          />
          <div className='flex items-center justify-center'>
          <Button className='mt-5' color='red' type="submit">Submit</Button>

          </div>
        </form>
      </div>
      <div className='m-30'>

        {studentInfo.name ? (
          <div className='mt-6 flex flex-col gap-5 items-center border-solid border-4' >
            <h1 className='font-bold text-2xl'>Result found </h1>
             <Table withRowBorders={false}>
                <Table.Thead>
                <Table.Tr>
                <Table.Th>Information</Table.Th>
                <Table.Th>details</Table.Th>
                </Table.Tr>
               
                
                </Table.Thead>
                <Table.Tbody>
                <Table.Tr>
                <Table.Td>Name</Table.Td>
                <Table.Td>{studentInfo.name}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                <Table.Td>Class</Table.Td>
                <Table.Td>{studentInfo.class}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                <Table.Td>Roll Number</Table.Td>
                <Table.Td>{studentInfo.rollNumber}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                <Table.Td>Date of Birth</Table.Td>
                <Table.Td>{studentInfo.dob}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                <Table.Td>Email</Table.Td>
                <Table.Td>{studentInfo.email}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                <Table.Td>Phone Number</Table.Td>
                <Table.Td>{studentInfo.phone}</Table.Td>
                </Table.Tr>

                </Table.Tbody>
            </Table>
            <div>

            <Divider my="Xl" size={10} color='red'/>
            </div>
            <Table striped highlightOnHover>
                <Table.Thead>
                <Table.Tr>
                <Table.Th>Subject</Table.Th>
                <Table.Th>Marks </Table.Th>
                <Table.Th>Gread</Table.Th>
                </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                {studentInfo.subjects.map((subj, index) => (
                    <Table.Tr key={index}>
                    <Table.Td>{subj.name}</Table.Td>
                    <Table.Td>{subj.marks}</Table.Td>
                    <Table.Td>{subj.grade}</Table.Td>
                    </Table.Tr>
                ))}
                <Table.Td className=''>Total</Table.Td>
                </Table.Tbody>
            </Table>
        </div>
        ):(
          <div></div>
        )}
        </div>
    </>
  );
}

export default Result;
