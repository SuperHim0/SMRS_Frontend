import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import AdminLoginService from "../Service/AdminLoginService";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleForm = async (userInfo: { username: string; password: string }) => {
    console.log("Login attempt:", userInfo);

    try {
      const response = await AdminLoginService(userInfo);
      console.log("Login successful:", response);

      // Save to localStorage (if needed for auth)
      localStorage.setItem("username", response.username);
      localStorage.setItem("role", response.role);

      // Navigate to dashboard (optional)
      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      // Show error message to user
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-200">
      <div className="w-[400px] p-6 bg-white shadow-2xl rounded-xl">
        <h1 className="text-center font-bold text-2xl mb-6">Admin Login</h1>

        <form onSubmit={form.onSubmit(handleForm)}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            required
            {...form.getInputProps('username')}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />

          <Group justify="center" mt="xl">
            <Button type="submit" color="black">
              Login
            </Button>
          </Group>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
