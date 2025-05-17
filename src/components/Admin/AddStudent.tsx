import { useForm } from '@mantine/form';

import { DateInput,  } from '@mantine/dates';
import { errorNotification, successNotification } from "../../utility/Notification";
import { Button, Group, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import { CreateStudent } from '../../Service/AdminService';

type AddStudent = {
        name: string,
        rollId: string,
        classEntity: {
            id: number,
        },
        dob: string,
        email: string,
        phone: string
}


const AddStudent = () => {
    const [date , setDate] = useState<string | null>(null);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          name: '',
          phone:'',
          dob:'',
          rollId:'',
          class:'',
          termsOfService: false,
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          name:(value) => ( (value.length) >= 4 ? null : 'name greater then 4'),
          rollId:(value) => (  (value.startsWith("R"))?( (parseInt(value.substring(1,value.length))< 90000) ? null : "should enter the number after R") :"Entr the first latter R"),
          phone: (value) => ( ((value.length) == 10 )?( (parseInt(value) > 600000000 ) ? null:"enter the valid number" ) :"number should be 10 digits"),
        },
      });

       const handleRegisterForm =(studentInfo : any)=>{
              console.log(studentInfo);
              
      
              const classId = parseInt(studentInfo.class.split('-')[1]);
      
              const student : AddStudent ={
                    name: studentInfo.name,
                    rollId: studentInfo.rollId,
                    email: studentInfo.email,
                    phone: studentInfo.phone,
                    dob: studentInfo.dob, // From useState
                    classEntity: {
                    id: classId,
                  },
              };
              
              try{
                  CreateStudent(student).then((response:any)=>{
                      if(response){
                          console.log(response);
                          successNotification("student added success");
                      }else{
                        errorNotification("something went Wrong");
                      }
                  })
              }catch(err){
                    errorNotification("something went Wrong");
                  console.log("error "+err);
              }
      
              console.log(student);
              
          }

  return (
        <div className='flex w-full justify-center items-center bg-gray-100'>
            <div className='flex w-140 h-140 flex-col shadow-md rounded-b-md bg-white items-center justify-center'>

            <h1 className="flex justify-center text-xl font-bold">ADD STUDENT</h1>
            <form className='gap-5' onSubmit={form.onSubmit((values) => handleRegisterForm(values))}>
                <TextInput
                w={500}
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                key={form.key('email')}
                {...form.getInputProps('email')}
                />
                <TextInput
                mt={4}
                withAsterisk
                label="Name"
                placeholder="Enter Student Name"
                key={form.key('name')}
                {...form.getInputProps('name')}
                />
                <TextInput
                mt={4}
                withAsterisk
                label="Roll Number"
                placeholder="Enter Roll number"
                key={form.key('rollId')}
                {...form.getInputProps('rollId')}
                />
                <TextInput
                mt={4}
                withAsterisk
                label="Phone Number"
                placeholder="Enter Phone Number"
                key={form.key('phone')}
                {...form.getInputProps('phone')}
                />
                <Select
                mt={4}
                      label="Select Class"
                      placeholder="Select Student Class"
                      key={form.key('class')} // Registers field under 'class'
                      data={[
                        { value: 'Class-3', label: 'Class-3' },
                        { value: 'Class-4', label: 'Class-4' },
                        { value: 'Class-5', label: 'Class-5' },
                        { value: 'Class-6', label: 'Class-6' },
                        { value: 'Class-7', label: 'Class-7' },
                        { value: 'Class-8', label: 'Class-8' },
                        { value: 'Class-9', label: 'Class-9' },
                        { value: 'Class-10', label: 'Class-10' },
                    ]}
                    withAsterisk
                    {...form.getInputProps('class')}
                    />
                <DateInput
                mt={4}
                value={date}
                onChange={setDate}
                label="Date input"
                placeholder="Date input"
                />

                 <Group justify="center" w={500} mt="md">
                   <Button w={500} color='gray' type="submit">ADD NEW STUDENT</Button>
                 </Group>
            </form>
            </div>
        </div>
  )
}

export default AddStudent