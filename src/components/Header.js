function Header() {
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img width={40} height={40} src="/img/logo.png" alt="Logo" />
                <div className="headreInfo">
                    <h3 className="text-uppercase">REACT SNEAKERS</h3>
                    <p className="opasity-5">Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="d-flex">
                <li className="mr-30"><img width={18} height={18} src="/img/cart.svg" alt="" /><span>1205 руб.</span></li>
                <li><img width={18} height={18} src="/img/user.svg" alt="" /></li>
            </ul>
        </header>
    );
}

export default Header;