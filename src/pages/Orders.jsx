import React from 'react';
import Card from '../components/Card';
import axios from 'axios';


function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://62837a1092a6a5e46224964a.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошиба при запросе заказов');
            }

        })();

    });


    return (
        <div className="content p-40">
            <div className="d-flex justify-between mb-40 align-center">
                <h1 >Мои заказы</h1>

            </div>
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Orders;