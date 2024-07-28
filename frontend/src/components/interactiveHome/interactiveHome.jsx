import React, { useState } from 'react';
import './interactiveHome.css';
import Quiz from './Quiz';

const categories = [
  { id: 9, name: 'General Knowledge', description: 'Test your overall knowledge with a variety of questions spanning different topics and fields.' },
  { id: 10, name: 'Entertainment: Books', description: 'Dive into the world of literature with questions about famous books, authors, and literary characters.' },
  { id: 11, name: 'Entertainment: Film', description: 'Explore the realm of movies, directors, actors, and iconic film moments.' },
  { id: 12, name: 'Entertainment: Music', description: 'Challenge yourself with questions about different music genres, artists, albums, and songs.' },
  { id: 13, name: 'Entertainment: Musicals & Theatres', description: 'Discover the magic of stage productions with questions about popular musicals, playwrights, and theatre history.' },
  { id: 14, name: 'Entertainment: Television', description: 'Test your TV trivia knowledge with questions about famous shows, characters, and TV history.' },
  { id: 15, name: 'Entertainment: Video Games', description: 'Engage with questions about classic and modern video games, game developers, and popular gaming characters.' },
  { id: 16, name: 'Entertainment: Board Games', description: 'Dive into the world of board games with questions about game rules, history, and strategies.' },
  { id: 17, name: 'Science & Nature', description: 'Explore the wonders of the natural world and scientific discoveries with this broad category.' },
  { id: 18, name: 'Science: Computers', description: 'Test your knowledge of computer science, programming languages, and technological advancements.' },
  { id: 19, name: 'Science: Mathematics', description: 'Challenge your mathematical skills with questions on algebra, geometry, calculus, and more.' },
  { id: 20, name: 'Mythology', description: 'Delve into ancient myths and legends from various cultures around the world.' },
  { id: 21, name: 'Sports', description: 'Test your sports knowledge with questions about athletes, sports history, and major sporting events.' },
  { id: 22, name: 'Geography', description: 'Explore the world with questions about countries, cities, landmarks, and geographical features.' },
  { id: 23, name: 'History', description: 'Journey through time with questions about significant historical events, figures, and eras.' },
  { id: 24, name: 'Politics', description: 'Test your understanding of political systems, key political figures, and historical political events.' },
  { id: 25, name: 'Art', description: 'Discover the world of art with questions about famous paintings, artists, and art movements.' },
  { id: 26, name: 'Celebrities', description: 'Test your knowledge of famous personalities from the worlds of entertainment, sports, and beyond.' },
  { id: 27, name: 'Animals', description: 'Explore the animal kingdom with questions about different species, habitats, and animal behavior.' },
  { id: 28, name: 'Vehicles', description: 'Engage with questions about different types of vehicles, their history, and their technological advancements.' },
  { id: 29, name: 'Entertainment: Comics', description: 'Dive into the world of comics with questions about superheroes, comic book series, and their creators.' },
  { id: 30, name: 'Science: Gadgets', description: 'Test your knowledge of various gadgets, their functionalities, and their impact on our lives.' },
  { id: 31, name: 'Entertainment: Japanese Anime & Manga', description: 'Explore the vibrant world of Japanese animation and manga with questions about popular series, characters, and creators.' },
  { id: 32, name: 'Entertainment: Cartoon & Animations', description: 'Discover the magic of animated shows and movies with questions about famous characters, studios, and animation history.' }
];

function CourseCard() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category, setCategory] = useState('');

  const handleStartQuiz = (category,what) => {
    setSelectedCategory(category);
    setCategory(what)
    setStartQuiz(true);
  };

  const handleReturnToCards = () => {
    setStartQuiz(false);
    setCategory('');
    setSelectedCategory('');
  };

  if (startQuiz) {
    return <Quiz category={selectedCategory} what = {category} onReturnToCards={handleReturnToCards} />;
  }

  return (
    <div className="course-container">
      <header>
        <h1>Interactive Content</h1>
        <p>Engaging multimedia content to enhance learning.</p>
      </header>
      <div className="course-list">
        {categories.map(category => (
          <div key={category.id} className="course-card">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button onClick={() => handleStartQuiz(category.id,category.name)}>Start Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseCard;
