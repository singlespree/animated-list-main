import React, {useEffect, useState} from 'react';
import {User} from "../ts/mok_interfaces.ts";
import Card from "./Card.tsx";
import './CardList.scss'

interface CardListProps {
  items: User[];
}

const CardList: React.FC<CardListProps> = ({items}) => {

  const batchSize = 20;
  const scrollThreshold = 20;
  const [displayedItems, setDisplayedItems] = useState<User[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setDisplayedItems(items.slice(0, batchSize));
    setLoaded(batchSize);
  }, [items]);

  const loadMoreItems = () => {
    const nextItems = items.slice(loaded, loaded + batchSize);
    setDisplayedItems([...displayedItems, ...nextItems]);
    setLoaded(loaded + nextItems.length);
    setShowButton(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const reachedBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - scrollThreshold;
      console.log(reachedBottom)

      if (reachedBottom) {
        if (loaded === batchSize) {
          setShowButton(true);
        } else if (!showButton) {
          loadMoreItems();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loaded, showButton, displayedItems.length, items]);

  return (
    <ul className='list'>
      {displayedItems.map((item, index) => (
        <Card key={index} name={item.name} surname={item.surname}/>
      ))}
      {showButton && loaded < items.length && (
        <button
          type='button'
          className='list__button'
          onClick={loadMoreItems}>
          Показать еще
        </button>
      )}
    </ul>
  );
}

export default CardList;
