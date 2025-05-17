import { Badge, Button, Card, Group, Input, SimpleGrid, Text } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"

const AdminResult = () => {
  return (
    <div className="flex flex-col w-full">
        <div className="m-5">
        <div className="flex w-full justify-center mt-2">
            <Input w={450} radius="xl" placeholder=" search"></Input>
        </div>
        
        <div>
            <Button>ADD RESULT</Button>
        </div>
        <div className="mt-5">
             <SimpleGrid cols={4} spacing="lg">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Roll No: R12345</Text>
                <Button color="gray"><IconEdit /> Edit</Button>
                </Group>

                <Group justify="space-between">
                <Text size="sm" c="dimmed">
                Name : Himanshu
                </Text>
                 <Badge h={28} color="pink">Class - 8</Badge>
                </Group>
            </Card>
             </SimpleGrid>
        </div>

        </div>
    </div>
  )
}

export default AdminResult