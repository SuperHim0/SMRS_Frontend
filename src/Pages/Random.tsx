import { Button, Group, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';

export const Random = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      name: '',
      rollId: '',
      phone: '',
      className: '',
      dob: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      name: (value) => (value.trim() ? null : 'Name is required'),
      rollId: (value) => (value.trim() ? null : 'Roll Number is required'),
      phone: (value) => (/^\d{10}$/.test(value) ? null : 'Phone number must be 10 digits'),
      className: (value) => (value ? null : 'Please select a class'),
      dob: (value) => (value ? null : 'Please select a date of birth'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        {...form.getInputProps('email')}
      />
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Enter Student Name"
        {...form.getInputProps('name')}
      />
      <TextInput
        withAsterisk
        label="Roll Number"
        placeholder="Enter Roll number"
        {...form.getInputProps('rollId')}
      />
      <TextInput
        withAsterisk
        label="Phone Number"
        placeholder="Enter Phone Number"
        {...form.getInputProps('phone')}
      />
      <Select
        label="Select Class"
        placeholder="Select Student class"
        data={['Class-1', 'Class-2', 'Class-3', 'Class-4', 'Class-5', 'Class-6']}
        withAsterisk
        {...form.getInputProps('className')}
      />
      <DatePicker
/>
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};










