/* eslint-disable jsx-a11y/alt-text */

function Header() {
  return (
    <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" />
          <div>
            <h3>REACT SNEAKERS</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="d-flex">
          <li className="mr-30 d-flex align-center">
            <img src="/img/cart.svg" alt="Cart" />
            <span>1205 руб.</span>
          </li>
          <li>
            <img src="/img/user.svg" alt="User" />
          </li>
        </ul>
    </header>
  )
}

export default Header;