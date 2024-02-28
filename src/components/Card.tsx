import React, { useEffect, useRef, useState } from "react";
import "./Card.scss";
import { User } from "../ts/mok_interfaces.ts";

const Card: React.FC<User> = ({ name, surname }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);
  return (
    <li ref={cardRef} className={`card ${isVisible ? 'card-animation' : ''}`}>
      <h2 className="card__name"><span className='title'>name:</span> {name}</h2>
      <p className="card__surname"><span className='title'>surname:</span> {surname}</p>
    </li>
  );
};

export default Card;
