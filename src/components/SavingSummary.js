import {Card, Row, Typography, Col, Statistic} from "antd";
import {DollarCircleOutlined} from "@ant-design/icons"

const {Title, Text} = Typography


export default function SavingSummary({data}) {
    return <Card
        bordered
        title={<Title level={3}>Potential Saving Summary for {data.route} Route</Title>}
        className="mb-3"
    >
        <Row gutter={20} title="asdasd">
            <Col span={3}>
                <Statistic
                    title="User Price"
                    value={data.user_price}
                    prefix={<DollarCircleOutlined/>}
                />
            </Col>
            <Col span={4}>
                <Statistic
                    title="Max Price Potential Saving"
                    value={data.potential_savings_max_price}
                    prefix={<DollarCircleOutlined/>}
                />
            </Col>
            <Col span={4}>
                <Statistic
                    title="Min Price Potential Saving"
                    value={data.potential_savings_min_price}
                    prefix={<DollarCircleOutlined/>}
                />
            </Col>
            <Col span={4}>
                <Statistic
                    title="50th Percentile Price Potential Saving"
                    value={data.potential_savings_median_price}
                    prefix={<DollarCircleOutlined/>}
                />
            </Col>
            <Col span={4}>
                <Statistic
                    title="90th Percentile Price Potential Saving"
                    value={data.potential_savings_percentile_90_price}
                    prefix={<DollarCircleOutlined/>}
                />
            </Col>
            <Col span={4}>
                <Statistic
                    title="10th Percentile Price Potential Saving"
                    value={data.potential_savings_percentile_10_price}
                    prefix={<DollarCircleOutlined/>}
                />
            </Col>
        </Row>
    </Card>
}