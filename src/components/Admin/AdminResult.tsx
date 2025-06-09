import { Badge, Button, Card, Group, Input, Modal, SimpleGrid, Text, TextInput } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { getResultsOfAllStudents } from "../../Service/AdminService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminResult = () => {
  const navigate = useNavigate();
  const [allResults, setAllResults] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    findAllStudentResult();
  }, []);

  const findAllStudentResult = () => {
    getResultsOfAllStudents().then((data) => {
      console.log(data);
      setAllResults(data);
    });
  };

  const handleEditClick = (result: any) => {
    setSelectedResult(result);
    setOpened(true);
  };

  const handleSave = () => {
    console.log("Save logic here with updated result:", selectedResult);
    setOpened(false);
  };

  // Group results by student ID
  const groupedByStudent: { [key: number]: any[] } = {};
  allResults.forEach((result) => {
    const studentId = result.student.id;
    if (!groupedByStudent[studentId]) {
      groupedByStudent[studentId] = [];
    }
    groupedByStudent[studentId].push(result);
  });

  return (
    <div className="flex flex-col w-full">
      <div className="m-5">
        <div className="flex w-full justify-center mt-2">
          <Input w={450} radius="xl" placeholder="Search" />
        </div>

        <div className="my-4">
          <Button onClick={() => navigate("/admin/addresult")}>ADD RESULT</Button>
        </div>

        <div className="mt-5">
          <SimpleGrid cols={2} spacing="lg">
            {Object.values(groupedByStudent).map((resultsGroup: any[], index: number) => {
              const student = resultsGroup[0].student;
              return (
                <Card shadow="sm" padding="lg" radius="md" withBorder key={index}>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>Roll No: {student.rollId}</Text>
                    <Badge h={28} color="pink">Class - {student.classEntity.name}</Badge>
                  </Group>
                  <Text size="sm">Name: {student.name}</Text>
                  <Text mt="sm" fw={500}>Subjects & Marks:</Text>
                  {resultsGroup.map((result: any) => (
                    <Group key={result.id} justify="space-between" className="mt-2">
                      <Text size="sm">{result.subject.name}</Text>
                      <Text size="sm">Marks: {result.marks} | Grade: {result.grade}</Text>
                      <Button size="xs" variant="light" color="gray" onClick={() => handleEditClick(result)}>
                        <IconEdit size={16} /> Edit
                      </Button>
                    </Group>
                  ))}
                </Card>
              );
            })}
          </SimpleGrid>
        </div>
      </div>

      {/* Edit Result Modal */}
      <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Result" centered>
        {selectedResult && (
          <div className="flex flex-col gap-4">
            <Text>Name: {selectedResult.student.name}</Text>
            <Text>Subject: {selectedResult.subject.name}</Text>

            <TextInput
              label="Marks"
              value={selectedResult.marks}
              onChange={(e) =>
                setSelectedResult((prev: any) => ({ ...prev, marks: e.target.value }))
              }
            />
            <TextInput
              label="Grade"
              value={selectedResult.grade}
              onChange={(e) =>
                setSelectedResult((prev: any) => ({ ...prev, grade: e.target.value }))
              }
            />
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminResult;
