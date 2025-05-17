import { ActionIcon, Card, Container, Grid, Image, SimpleGrid, Skeleton, Text } from '@mantine/core'
import { IconBook, IconBuildingFortress, IconClipboard, IconCreditCard, IconLayoutGrid, IconUser } from '@tabler/icons-react'


const Dashboard = () => {

    const totalStudent = 50;
    const totalClasses = 10;
    const totalSubject = 40;
    const totalNotification = 50;
    const totalTeacher = 20;
    const totalStaff = 40;
    const totalBus = 10;

const studentDetails = [
  { title: 'Total Students', icon:<IconUser size={20} className="text-black" stroke={2.5} />, total:totalClasses},
  { title: 'Total class', icon:<IconBuildingFortress size={20} className="text-black" stroke={2.5} />,  total:totalStudent},
  { title: 'Total subject', icon: <IconBook size={20} className="text-black" stroke={2.5} />, total:totalSubject},
  { title: 'Toal Notification', icon:<IconClipboard size={20} className="text-black" stroke={2.5} /> , total:totalNotification}
]

const schoolDetails = [
    {title : 'Teachers', icon:<IconUser size={20} className='text-black' stroke={2.5} />, total:totalTeacher},
    {title : 'Staff', icon:<IconUser size={20} className='text-black' stroke={2.5} />, total:totalStaff},
    {title : 'Teachers', icon:<IconUser size={20} className='text-black' stroke={2.5} />, total:totalTeacher},
    {title : 'Buses', icon:<IconUser size={20} className='text-black' stroke={2.5} />, total:totalTeacher},

]


    return (

        <div className='bg-gray-50'>

    <div className='m-5'>
        <div className='w-full'>
        <Image 
            radius="md"
            h={240}
            w={1240}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
            />
        </div>
        <div className='mt-5'>
             <SimpleGrid cols={4} spacing="lg">
                {studentDetails.map((details) => (
                
                <Card shadow="md"  radius="md" key={details.title} >
                <ActionIcon variant="light" size="xl" radius="xl" color="blue" mb="sm">
                {details.icon}
                </ActionIcon>
                <div className='flex justify-between'>
                <Text fw={500} size="lg">{details.title}</Text>
                <Text fw={500}>{details.total}</Text>
                </div>
                </Card>
            ))}
        </SimpleGrid>

        </div>
        <div className='mt-5'>
             <SimpleGrid cols={4} spacing="lg">
                {schoolDetails.map((details) => (
                    <Card shadow="md"  radius="md" key={details.title} >
                <ActionIcon variant="light" size="xl" radius="xl" color="blue" mb="sm">
                {details.icon}
                </ActionIcon>
                <div className='flex justify-between'>
                <Text fw={500} size="lg">{details.title}</Text>
                <Text fw={500}>{details.total}</Text>
                </div>
                </Card>
            ))}
        </SimpleGrid>

        </div>
        </div>
    </div>
  )
}

export default Dashboard