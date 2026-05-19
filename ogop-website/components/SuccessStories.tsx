'use client'

import { useEffect, useState } from 'react'

interface Story {
  id: number
  name: string
  age: number
  story: string
  achievement: string
  image: string
}

export default function SuccessStories() {
  const [stories, setStories] = useState<Story[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(console.error)
  }, [])

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length)
  }

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }

  if (stories.length === 0) return null

  const story = stories[currentIndex]

  return (
    <section className="stories">
      <div className="container">
        <div className="section-header">
          <h2>Success <span className="highlight">Stories</span></h2>
          <div className="underline"></div>
          <p className="section-subtitle">Real lives transformed through OGOP</p>
        </div>

        <div className="testimonial-slider">
          <button onClick={prevStory} className="slider-btn prev">
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">{story.story}</p>
            <div className="author-info">
              <img 
                src={story.image || '/assets/default-avatar.png'} 
                alt={story.name}
                onError={(e) => e.currentTarget.src = '/assets/default-avatar.png'}
              />
              <div>
                <h4>{story.name}, {story.age}</h4>
                <p className="achievement">{story.achievement}</p>
              </div>
            </div>
          </div>

          <button onClick={nextStory} className="slider-btn next">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="dots">
          {stories.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .stories {
          padding: 80px 0;
          background: linear-gradient(135deg, #f9f9f9, #fff);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .section-header h2 {
          font-size: 2.5rem;
          color: #333;
        }
        .highlight {
          color: #E91E63;
        }
        .underline {
          width: 60px;
          height: 3px;
          background: #E91E63;
          margin: 15px auto;
        }
        .section-subtitle {
          color: #666;
          font-size: 1.1rem;
        }
        .testimonial-slider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          position: relative;
        }
        .slider-btn {
          background: #E91E63;
          color: white;
          border: none;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
        }
        .slider-btn:hover {
          background: #C2185B;
          transform: scale(1.05);
        }
        .testimonial-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          max-width: 700px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          position: relative;
        }
        .quote-icon {
          font-size: 5rem;
          color: #E91E63;
          opacity: 0.3;
          position: absolute;
          top: 20px;
          left: 30px;
          font-family: serif;
        }
        .testimonial-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #555;
          margin: 30px 0;
          font-style: italic;
        }
        .author-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }
        .author-info img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }
        .author-info h4 {
          color: #333;
          margin-bottom: 5px;
        }
        .achievement {
          color: #E91E63;
          font-weight: 500;
          font-size: 0.9rem;
        }
        .dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .dot.active {
          background: #E91E63;
          width: 30
