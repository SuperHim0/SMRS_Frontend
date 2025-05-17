import { Button, Card, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";


const AdminLogin = () => {
const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  return (
    <>
    <div className="flex w-full h-screen justify-center items-center bg-gray-200">
      <div className="w-120 h-140 bg-white shadow-2xl flex justify-center items-center">

      
      <div className="w-[60%]">
        <h1 className="flex justify-center font-bold text-2xl">Admin Login</h1>
        <TextInput
        mt="md"
        placeholder="Enter your email"
        key={form.key('email')}
        {...form.getInputProps('email')}
        />
      <PasswordInput
        mt="md"
        placeholder="Password"
        key={form.key('password')}
        {...form.getInputProps('password')}
        />

      <Group justify="center" mt="xl">
        <Button
        color="black"
        >
          Login
        </Button>
      </Group>
      </div>
    </div>
    </div>
    </> 
  );
}

export default AdminLogin;