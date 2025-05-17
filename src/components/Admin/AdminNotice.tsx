import {  Button, Card,  Group, Input, Modal, SimpleGrid, Text, Textarea, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form";
import { IconClipboard, IconEdit } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import { getNotices } from "../../Service/StudentService";
import { addNotice, updateNotice } from "../../Service/AdminService";
import { errorNotification, successNotification } from "../../utility/Notification";
import { useDisclosure } from "@mantine/hooks";

type Notice ={
  id : number,
  title : string,
  description : string,
  createdAt : string
}

const AdminNotice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [noticeDetails,setNoticeDetails] = useState<Notice[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  
  const [selectNotice, setselectNotice] = useState<Notice | null>(null);

  const filteredNotice = noticeDetails.filter((notice) => 
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(()=>{
      getAllNotice();
    
    },[])

    const getAllNotice=()=>{
      getNotices().then((data : Notice[])=>{
        setNoticeDetails(data);  

      });
    };


  const form = useForm({
          mode: 'uncontrolled',
          initialValues: {
            title: '',
            description: '',
            termsOfService: false,
          },
      
          validate: {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            // name:(value) => ( (value.length) >= 4 ? null : 'name greater then 4'),
          },
        });
        const handleAddNoticeForm =(noticeInfo : any)=>{
            try{

            addNotice(noticeInfo).then((data)=>{
              successNotification("Notice added");
              console.log(data);
            })
          }catch(error){
            console.log(error);
          }
            
        }
        const handleOpenNoticeInfo=(noticeData : any)=>{
          setselectNotice(noticeData);
          setTitle(noticeData.title);
          setDescription(noticeData.description);
          open();
        }

        const handleUpdateNoticeForm=(oldNotice : any)=>{
          
          if(!oldNotice){
            console.log("no notice selected");
            return;
          }
          
          const notice : Notice = {
            id:oldNotice.id,
            title:title,
            description:description,
            createdAt:oldNotice.createdAt
          }
          console.log(notice)
          try {
              updateNotice(notice).then((data)=>{
                console.log(data);
                successNotification("Student updated..");
              });

            } catch (error) {
              errorNotification("something went Wrong not updated !")
            }
                console.log(notice);
          }

  return (
    <div className="flex flex-col w-full">
        <div className="m-5">
        <div className="flex w-full justify-center mt-2">
            <Input w={450} radius="xl" placeholder=" search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            ></Input>
        </div>
        
        
       {/* add notice */}
        <div className="flex items-center">
          <form className='gap-5' onSubmit={form.onSubmit((values) => handleAddNoticeForm(values))}>
                          <TextInput
                          w={500}
                          withAsterisk
                          label="Title"
                          placeholder="Enter the title"
                          key={form.key('title')}
                          {...form.getInputProps('title')}
                          />
                          <Textarea
                          w={500}
                          mt={5}
                          withAsterisk
                          resize="vertical"
                          label="Description"
                          placeholder="Enter the Description"
                          key={form.key('description')}
                          {...form.getInputProps('description')}
                          />
                          <Group mt={10}>
                             <Button color="gray" type="submit">ADD NOTICE</Button>
                          </Group>
          </form>
        </div>

        <div className="mt-5 flex flex-col items-center">
          <h1 className="flex font-bold items-center text-xl mb-5"><IconClipboard /> NOTICE</h1>
             <SimpleGrid cols={4} spacing="lg">
              {
                filteredNotice.map((notice)=>(

                
                
                <Card shadow="sm" padding="lg" radius="md" withBorder key={notice.id} 
                                
                                >
                                <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={500}>TITLE : {notice.title} </Text>
                                </Group>
                
                                <Group justify="space-between">
                                <Text size="sm" c="dimmed">
                                Date : {notice.createdAt.substring(0,10)}
                                </Text>
                                <Button color="gray" onClick={()=> handleOpenNoticeInfo(notice)} ><IconEdit /> Edit</Button>
                                </Group>
                                </Card>
            ))
              }

               <Modal
          opened={opened}
          onClose={close}
          title={<span className="text-red-500 font-semibold flex gap-2 items-center text-xl "><IconClipboard/> NOTICE DETAILS</span>}
          overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
          classNames={{ content: 'rounded-md' }}
          size="xl"

          centered
        >
          {selectNotice && (

            <div className="flex justify-center items-center ">
              <form onSubmit={(e)=>{e.preventDefault(); handleUpdateNoticeForm(selectNotice) }}>
               {/* <TextInput
                w={500}
                withAsterisk
                label="Title"
                value={noticeDetails}
                mt={5}
                placeholder="Update Title Name"
                onChange={(event) =>  setTitle(event.currentTarget.value)}
                // key={form.key('email')}
                // {...form.getInputProps('email')} */}
                {/* /> */}
              

                 <TextInput
                w={500}
                withAsterisk
                label="Title"
                value={title}
                mt={5}
                placeholder="Update Title Name"
                onChange={(event) =>  setTitle(event.currentTarget.value)}
                // key={form.key('email')}
                // {...form.getInputProps('email')}
                />
                <Textarea
                resize="vertical"
                w={500}
                withAsterisk
                label="Description"
                value={description}
                mt={5}
                placeholder="Update student Phone number"
                onChange={(event) =>  setDescription(event.currentTarget.value)}
                // key={form.key('email')}
                // {...form.getInputProps('email')}
                />
                
                <Group mt={15} w={500}>

                <Button w={242} color="gray" type="submit" >UPDATE</Button>
                <Button w={242} color="red" onClick={()=>{errorNotification("Not Working..")}} >DELETE</Button>
                </Group>
              </form>
            </div>
          )} 
        </Modal>

             </SimpleGrid>
        </div>

        </div>
    </div>
  )
}

export default AdminNotice