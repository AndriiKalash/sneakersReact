export const CartItemsBlock = ({imageUrl, title, id, price, onRemove}) => (

    <div  className="cartItem d-flex align-center mb-20">
     <div style={{ backgroundImage: `url(${imageUrl})` }} className="cartItemImg"></div>
        <div className="mr-20 flex">
          <p className="mb-5">{title}</p>
          <b>{price}usd.</b>
        </div>
        <img onClick={() => onRemove(id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
    </div>
);

