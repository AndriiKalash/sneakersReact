import {CartItemsBlock} from "../../components";


export const FullCart = ({status, cartItems, itemRemove,totalPrice,sendOrder }) => (

    <div className=" d-flex flex flex-column">
                        <div className="items">
                         {cartItems.map((obj) => <CartItemsBlock
                                                    key={obj.id}
                                                    onRemove={itemRemove} 
                                                    {...obj} /> )}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li className="d-flex">
                                    <span>Total</span>
                                    <div></div>
                                    <p>{totalPrice} usd.</p>
                                </li>
                                <li className="d-flex">
                                    <span>tax 5%</span>
                                    <div></div>
                                    <p> {Math.round((totalPrice / 100) * 5)}</p>
                                </li>
                            </ul>
                            <button
                            disabled={status==='loading'} 
                            onClick={sendOrder}
                            className="greenButton">Make an order <img src="img/arrow.svg" alt="arrow" /></button>
                        </div>
                    </div>
);

