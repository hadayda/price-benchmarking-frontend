import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {Card, Select, Spin} from "antd";
import {useState} from "react";

export default function PriceChart({data, loading, error}) {
    const [chartType, setChartType] = useState('line');
    const [percentilePrice, setPercentilePrice] = useState('median_price');
    const [percentileLabel, setPercentileLabel] = useState('50th Percentile Price');
    if (loading) return <Spin loading={loading}/>;
    if (error) return <p className="text-danger">Error fetching data: {error}</p>;
    return <Card
        title={<h2>Prices Chart</h2>}
        extra={
            <>
                <Select
                    className="me-3"
                    defaultValue="line"
                    onChange={(value) => setChartType(value)}
                >
                    <Select.Option value="line">Line</Select.Option>
                    <Select.Option value="bar">Bar</Select.Option>
                </Select>
                <Select
                    defaultValue="50th Percentile Price"
                    onChange={(value, option) => {
                        setPercentilePrice(value)
                        setPercentileLabel(option.children)
                    }}
                >
                    <Select.Option value="percentile_10_price">10th Percentile Price</Select.Option>
                    <Select.Option value="median_price">50th Percentile Price</Select.Option>
                    <Select.Option value="percentile_90_price">90th Percentile Price</Select.Option>
                </Select>
            </>
        }
    >
        <ResponsiveContainer className="w-100 mt-3" height={400}>
            {chartType === "line" ? (
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="route"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="user_price" stroke="#8884d8"
                          name="User Price"/>
                    <Line type="monotone" dataKey={percentilePrice} stroke="#82ca9d"
                          name={percentileLabel}/>
                </LineChart>
            ) : (
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="route"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="user_price" fill="#82ca9d"
                         name="User price"/>
                    <Bar dataKey={percentilePrice} fill="#8884d8"
                         name={percentileLabel}/>
                </BarChart>
            )}
        </ResponsiveContainer>
    </Card>
}