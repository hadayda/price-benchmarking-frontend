import {useContext, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, Spin} from "antd";
import {AuthContext} from "../AuthContext";

export default function Login() {
    const { login , isAuthenticated } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    if (isAuthenticated) {
        navigate('/');
    }
    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm();

    const handleLogin = async (data) => {
        setLoading(true);
        await login(data.email, data.password)
        setLoading(false)
        navigate('/');
    }
    return <div className="container pt-5">
        <h2>Login</h2>
        <Form
            layout="vertical"
            className="login-form"
            onFinish={handleSubmit(handleLogin)}
        >
            <Form.Item
                label="Email"
                validateStatus={errors.email ? "error" : ""}
                help={errors.email && errors.email.message}
            >
                <Controller
                    name="email"
                    control={control}
                    rules={{required: "Email is required"}}
                    render={({field}) => (
                        <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                        />
                    )}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                validateStatus={errors.password ? "error" : ""}
                help={errors.password && errors.password.message}
            >
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Password is required",
                        minLength: {value: 4, message: "Password must be at least 6 characters"}
                    }}
                    render={({field}) => (
                        <Input.Password {...field} placeholder="Enter your password" />
                    )}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading || isSubmitting}
                    block
                >
                    {loading ? <Spin/> : "Login"}
                </Button>
            </Form.Item>
        </Form>
    </div>
}