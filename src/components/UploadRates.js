import {useForm, Controller} from "react-hook-form";
import {Widget as UploadcareWidget} from "@uploadcare/react-widget";
import {Form, Input, Button, message} from "antd";
import {useNavigate} from "react-router-dom";
import {uploadUserRates} from "../services/bencmarkingServices";

const uploadcarePublicKey = process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY
export default function UploadRates() {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors, isSubmitting}
    } = useForm();
    const handleFileUpload = (fileInfo) => {
        if (fileInfo) {
            setValue('file', fileInfo.cdnUrl)
            message.info('File uploaded')
        }
    };
    const onSubmit = async (data) => {
        try {
            await uploadUserRates(data.file)
            navigate('/');
        } catch (error) {
            message.error(error.response?.data?.message || 'Something went wrong with the upload');
        }
    }
    return <div className="text-center pt-5">
        <h2>Upload Market Rates</h2>
        <Form
            layout="vertical"
            className="upload-rates-form pt-3"
            onFinish={handleSubmit(onSubmit)}
        >
            <Form.Item>
                <UploadcareWidget
                    publicKey={uploadcarePublicKey}
                    onChange={handleFileUpload}
                    clearable
                />
            </Form.Item>
            <Form.Item>
                <Controller
                    name="file"
                    control={control}
                    rules={{required: "File is required"}}
                    render={({field}) => (
                        <Input type="hidden" {...field} />
                    )}
                />
                {errors.file && (
                    <p style={{color: 'red'}}>{errors.file.message}</p>
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Upload
                </Button>
            </Form.Item>
        </Form>
    </div>
}