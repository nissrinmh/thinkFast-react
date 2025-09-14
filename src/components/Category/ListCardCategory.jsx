import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardCategory from './CardCategory';
import Footer from '../Layouts/Footer';

const ListCardCategory = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Développement',
      imgSrc: '/images/programme.jpg',
      description: 'Testez vos compétences en programmation, technologies web, applications et tout ce qui touche au développement logiciel.',
      onClick: () => navigate('/quiz') 
    },
    {
      title: 'Arts',
      imgSrc: '/images/art.jpg',
      description: 'Découvrez des questions captivantes sur la peinture, la sculpture, la musique, le théâtre et l’histoire de l’art.'
    },
    {
      title: 'Voyages',
      imgSrc: '/images/voyage.jpg',
      description: 'Explorez le monde à travers des quiz sur les destinations touristiques, les cultures et les traditions du globe.'
    },
    {
      title: 'Sports',
      imgSrc: '/images/sports.jpg',
      description: 'Évaluez vos connaissances sur les différents sports, leurs règles, leurs histoires et les exploits de grands champions.'
    },
    {
      title: 'Langues',
      imgSrc: '/images/langues.jpg',
      description: 'Apprenez tout en jouant avec des quiz sur les langues, les expressions idiomatiques et les alphabets du monde entier.'
    },
    {
      title: 'Cinéma',
      imgSrc: '/images/films.jpg',
      description: 'Plongez dans l’univers du cinéma avec des questions sur les films cultes, les réalisateurs célèbres et les anecdotes de tournage.'
    },
    {
      title: 'Cuisine',
      imgSrc: '/images/chefcuis.jpg',
      description: 'Faites voyager vos papilles avec des quiz sur les recettes, les cuisines du monde et les saveurs uniques.'
    },
    {
      title: 'Santé',
      imgSrc: '/images/santes.jpg',
      description: 'Enrichissez vos connaissances sur la santé, le bien-être, les modes de vie sains et les pratiques médicales.'
    }
  ];

  return (
    <>
      <div className="row d-flex justify-content-center mt-5 " style={{ padding: '20px' }}>
        {categories.map((category, index) => (
          <CardCategory
            key={index}
            title={category.title}
            imgSrc={category.imgSrc}
            description={category.description}
            onClick={category.onClick} 
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ListCardCategory;