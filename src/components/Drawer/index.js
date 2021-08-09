import styles from './Drawer.module.scss';


//  style={{ display: 'none' }}
function Drawer({onClose, onRemove, items = [], opened}) {
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img 
            onClick={onClose}
            className="removeBtn" 
            width={32} height={32} 
            src="/img/btn-remove.svg" 
            alt="Close" 
          />
        </h2>

        {
          items.length > 0 ? (
            <div>
              <div className="d-flex flex-column flex">
                <div className="items flex">
                  {items.map((obj) => (
                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                      <div
                        style={{ backgroundImage: `url(${obj.imageUrl})` }}
                        className="cartItemImg">
                      </div>

                      <div className="mr-20 flex">
                        <p className="mb-5">{obj.title}</p>
                        <b>{obj.price} руб.</b>
                      </div>
                      <img
                        onClick={() => onRemove(obj.id)}
                        className="removeBtn"
                        src="img/btn-remove.svg"
                        alt="Remove"
                      />
                    </div>
                  ))}
                </div>
                <div className="cartTotalBlock">
                  <ul>
                    <li>
                      <span>Итого:</span>
                      <div></div>
                      <b> руб. </b>
                    </li>
                    <li>
                      <span>Налог 5%:</span>
                      <div></div>
                      <b> руб. </b>
                    </li>
                  </ul>
                  <button  className="greenButton">
                    Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
                  </button>
                </div>
              </div>

              <div  className="cartTotalBlock">
                <ul>
                  <li className="d-flex">
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 руб.</b>
                  </li>
                  <li className="d-flex">
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб.</b>
                  </li>
                </ul>
                <button className="greenButton" >
                  Оформить заказ
                  <img src="/img/arrow.svg" alt="Arrow"/>
                </button>
              </div>
            </div>
          

        
          ) : (
            <div className="d-flex align-center justify-center flex-column flex">
              <img 
                // onClick={() => setSearchValue('')}
                className="mb-20" 
                width={120} height={120} 
                src="/img/empty-remove.jpg" 
                alt="Clear" 
              />
              <h2>Корзина пустая</h2>
              <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
              <button onClick={onClose} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" />
                Вернуться назад
              </button>
            </div>
          )
        }


    </div>
  </div>      
  )
}

export default Drawer;