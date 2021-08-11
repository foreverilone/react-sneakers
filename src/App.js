import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

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

    axios.get('https://610d093166dd8f0017b76fab.mockapi.io/cart').then((res) => {
      setCartItems(res.data)
    });

    axios.get('https://610d093166dd8f0017b76fab.mockapi.io/favorites').then((res) => {
      setFavorites(res.data)
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://610d093166dd8f0017b76fab.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj]);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)){
      axios.delete(`https://610d093166dd8f0017b76fab.mockapi.io/favorites/${obj.id}`);
      // setCartItems(prev => prev.filter(item => item.id !== obj.id));
      } else {
        const { data } = await axios.post('https://610d093166dd8f0017b76fab.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      };
    } catch (error) {
      alert('Не удалось добавь в фавориты')
    }
    
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
      <Header onClickCart={() => setCartOpened(true)} />

      <Route path="/" exact>
        <Home 
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>

      <Route path="/favorites" exact>
        <Favorites 
          items={favorites}
          // searchValue={searchValue}
          // setSearchValue={setSearchValue}
          // onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          // onAddToCart={onAddToCart}
        />
      </Route>
      
    </div>
  );
}

export default App;
