import React from 'react';
import axios from 'axios';

import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    // fetch('https://610d093166dd8f0017b76fab.mockapi.io/items')
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(json => setItems(json));

    axios.get('https://610d093166dd8f0017b76fab.mockapi.io/items').then((res) => {
      setItems(res.data)
    });
  }, []);

  const onAddToCard = (obj) => {
    axios.post('https://610d093166dd8f0017b76fab.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj]);
  };

  const onAddToFavorite = (obj) => {
    axios.post('https://610d093166dd8f0017b76fab.mockapi.io/favorites', obj);
    setFavorites(prev => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://610d093166dd8f0017b76fab.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && 
        <Drawer 
          onClose={() => setCartOpened(false)} 
          onRemove={onRemoveItem}
          items={cartItems}
        /> 
      }
      <Header 
        onClickCart={() => setCartOpened(true)}
      />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && <img 
              onClick={() => setSearchValue('')}
              className="removeBtn clear cu-p" 
              width={32} height={32} 
              src="/img/btn-remove.svg" 
              alt="Clear" 
            />}
            <input 
              onChange={onChangeSearchInput}
              value={searchValue} 
              placeholder="Поиск..." 
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map(item => (
              <Card 
                key={item.title}
                title = {item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={obj => onAddToFavorite(obj)}
                onPlus={obj => onAddToCard(obj)}
              />
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default App;
