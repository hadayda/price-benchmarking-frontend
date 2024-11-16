import {useState, useEffect} from "react";
import {getUserPotentialSavings} from '../services/bencmarkingServices'
import PriceChart from "./charts/PriceChart";
import SavingSummary from "./SavingSummary";


export default function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        getUserPotentialSavings().then(response => {
            let data = response.data.map(item => ({
                ...item,
                route: `${item.origin} - ${item.destination}`,
            }));
            setData(data)
            setLoading(false);
            console.log(response.data);
        }).catch(error => {
            setError(error.message);
        })
    }, [])

    return <div className="text-center">
        <PriceChart
            title=""
            compareKey="user_price"
            data={data}
            loading={loading}
            error={error}
        />
        <div className="mt-3">
            {data.map((item) => (
                <SavingSummary data={item}/>
            ))}
        </div>
    </div>
}