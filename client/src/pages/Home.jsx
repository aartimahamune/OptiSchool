import React from 'react';
import '../Styles/Home.css';

export default function Home() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our School</h1>
          <p>
            A place where academic excellence meets personal growth, preparing students for a bright future.
          </p>
        </div>
      </section>
      <section className="highlights">
        <div className="highlight-card">
          <h2>About Us</h2>
          <p>Dr. Baba Saheb Ambedkar Higher Primary School and Siddharth English Medium Pre-Primary School
             was established in 2012-13 by Bhimrao Mariappa Natekar and Laxmi Bhimrao Natekar. 
             Located in Malgati, Karnataka, the school operates under the Siddharth Education Trust 
             and offers education up to the 8th standard. Bhimrao, driven by his own lack of education, 
             founded the school to ensure all children, especially girls, in his village receive educational 
             opportunities. In small villages, girls often miss out on education, 
             and this school aims to change that, promoting equal opportunities for everyone.</p>
        </div>
      </section>
      <section className="Moments" id="moments">
      <h1 className="heading">Best Of Moments</h1>
      <div className="box-container">
        <div className="box1">
          <img src="img30.jpg" alt="image1" />
          
        </div>
        <div className="box2">
          <img src="img31.jpg" alt="image2" />
  
        </div>
        <div className="box3">
          <img src="32.jpg" alt="image3" />
          
        </div>
        <div className="box4">
          <img src="img34.jpg" alt="image4" />
          
        </div>
        <div className="box5">
          <img src="img35.jpg" alt="image5" />
          
        </div>
        <div className="box6">
          <img src="img33.jpg" alt="image6" />
  
        </div>
        <div className="box7">
          <img src="img36.jpg" alt="image7" />
          
        </div>
        <div className="box8">
          <img src="img12.jpg" alt="image8" />
          
        </div>
        </div>
        </section>
    </div>
  );
}
