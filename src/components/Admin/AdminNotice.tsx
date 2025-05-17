import { Badge, Button, Card,  Group, Input, SimpleGrid, Text } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"

const AdminNotice = () => {
  return (
    <div className="flex flex-col w-full">
        <div className="m-5">
        <div className="flex w-full justify-center mt-2">
            <Input w={450} radius="xl" placeholder=" search"></Input>
        </div>
        
        <div>
            <Button>ADD NOTICE</Button>
        </div>
        <div className="mt-5">
             <SimpleGrid cols={4} spacing="lg">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Title : about notice</Text>
                <Button color="gray"><IconEdit /> Edit</Button>
                </Group>

                <Group justify="space-between">
                <Text size="sm" c="dimmed">
                 20-02-2025
                </Text>
                </Group>
            </Card>
             </SimpleGrid>
        </div>

        </div>
    </div>
  )
}

export default AdminNotice