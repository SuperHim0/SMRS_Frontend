import { Card, Modal, Paper, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getNotices } from '../../Service/StudentService';
import { useDisclosure } from '@mantine/hooks';

type Notice = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

const Notice = () => {
  const [noticeInfo, setNoticeInfo] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const getAllNotices = () => {
    getNotices().then((data: Notice[]) => {
      setNoticeInfo(data);
    });
  };

  useEffect(() => {
    getAllNotices();
  }, []);

  const handleOpenNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    open();
  };

  return (
    <div className="flex justify-center">
      <div className="w-[40%]">
        <h1 className="flex justify-center text-red-400 font-bold mb-5 text-3xl">📝 Notice Board</h1>

        {[...noticeInfo].reverse().map((notice) => (
          <Paper
            key={notice.id}
            onClick={() => handleOpenNotice(notice)}
            shadow="xl"
            radius="lg"
            withBorder
            p="xl"
            className="cursor-pointer mb-4"
          >
            <Text className='flex justify-between items-end gap-0.5'>
              <span>
              <span className="font-semibold">Title: </span>
              <span>{notice.title.substring(0, 25)}...</span>
              </span>
              <span>{notice.createdAt.substring(0,10)}</span>
            </Text>
          </Paper>
        ))}

        {/* 🧠 Only one Modal here */}
        <Modal
          opened={opened}
          onClose={close}
          title={<span className="text-red-500 font-semibold">Notice</span>}
          overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
          classNames={{ content: 'rounded-md' }}
          size="md"
          centered
        >
          {selectedNotice && (
            <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white">
              <Title order={3} className="text-red-500 mb-2">
                📢 {selectedNotice.title}
              </Title>
              <div className="mb-2 mt-2">
                <Text size="sm" className="text-gray-500 text-right">
                  {new Date(selectedNotice.createdAt).toLocaleString()}
                </Text>
              </div>
              <Text className="mb-2">{selectedNotice.description}</Text>
            </Card>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Notice;
