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
  const [stories, setStories] = useState<Story[]>([
    { id: 1, name: 'Grace', age: 18, story: 'After completing our program, I returned to school and am now in Form Four. I have hope for my future and my child\'s future.', achievement: 'Returned to School', image: '' },
    { id: 2, name: 'Chifundo', age: 17, story: 'The counselling and support I received helped me heal and believe in myself again. I am now running my own small business.', achievement: 'Small Business Owner', image: '' },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setStories(data)
      })
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
    <section className="py-16 md:py-20 bg-[#F8F9FA]" id="stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Success <span className="text-[#003A99]">Stories</span>
          </h2>
          <div className="w-16 h-1 bg-[#003A99] mx-auto mt-4 mb-4" />
          <p className="text-[#4A4F59] max-w-2xl mx-auto">Real lives transformed through OGOP</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="border border-[#E0E2E6] p-8 md:p-12 bg-white relative">
            <div className="text-6xl text-[#003A99] opacity-20 absolute top-4 left-6 font-serif">"</div>
            <p className="text-lg md:text-xl text-[#1A1A1A] leading-relaxed mb-8 italic pl-4">
              {story.story}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#003A99] flex items-center justify-center text-white text-2xl font-bold">
                {story.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A]">{story.name}, {story.age}</h4>
                <p className="text-[#1A7F00] font-medium text-sm">{story.achievement}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevStory}
              className="bg-[#1A7F00] text-white px-4 py-2 hover:bg-[#136000] transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={nextStory}
              className="bg-[#1A7F00] text-white px-4 py-2 hover:bg-[#136000] transition-colors"
            >
              Next →
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {stories.map((_, index) => (
              <button
                key={index}
                className={`h-1 transition-all ${
                  index === currentIndex ? 'w-8 bg-[#FFEB00]' : 'w-3 bg-[#E0E2E6]'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
