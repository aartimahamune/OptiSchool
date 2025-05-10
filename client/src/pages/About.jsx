import React from 'react'
import '../styles/About.css'

export default function About() {
  return (
    <section className="about container">
      <h1 className="about__title">About Us</h1>
      <div className="about__content">
        <div className="about__image">
          <img src="img1.jpg" alt="About Our School" />
        </div>
        <div className="about__info">
          <p className="about__paragraph">
            Dr. Baba Saheb Ambedkar Higher Primary School and Siddharth English Medium 
            Pre-Primary School was founded in 2012-13 by Bhimrao Mariappa Natekar and Laxmi 
            Bhimrao Natekar, and managed under the Siddharth Education Trust. Situated in the small 
            village of Malgati in Karnataka, the school currently offers education up to the 8th 
            standard.
          </p>
          <p className="about__paragraph">
            The purpose behind establishing this school is deeply personal for Bhimrao Mariappa 
            Natekar, who, being uneducated himself, was driven by the desire to ensure that all 
            children in his village, especially girls, receive the opportunity to be educated. In small 
            villages, girls often do not get the chance to pursue education, and this school aims to 
            change that, promoting equal opportunities for all.
          </p>
        </div>
        <div className="about__president">
        <div className="about__president-info">
          <h3 className="about__president-title">School Founder</h3>
          <p className="about__president-paragraph">
          Bhimrao Mariappa Natekar, the esteemed founder and president of Dr. Baba Saheb Ambedkar Higher Primary School, has been a driving force behind the school’s success since its establishment in 2012-13. Despite his own struggles with illiteracy, Bhimrao's vision for the future of children in his village of Malgati, Karnataka, was clear: to provide every child, especially girls, with the opportunity to receive an education. His personal commitment and dedication to improving the lives of others have laid the foundation for a school that serves as a beacon of hope for the community.
          </p>
          <p className="about__president-paragraph">
          Under Bhimrao’s leadership, the school has flourished, not just academically, but in creating an inclusive and supportive environment where students are encouraged to dream big. His passion for education goes beyond teaching; it extends to fostering a culture of equality and empowerment for all. Through his tireless work, Bhimrao has set an example of what it means to lead with purpose and has left a lasting impact on the educational landscape of Malgati.
          </p>
        </div>
        <div className="about__president-image">
          <img src="Founder.jpg" alt="School President" />
        </div>
      </div>
      </div>
    </section>
  );
};
