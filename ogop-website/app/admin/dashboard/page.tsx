'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('hero')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  
  // Content states
  const [heroContent, setHeroContent] = useState({
    title: '',
    subtitle: '',
    button1Text: '',
    button1Link: '',
    button2Text: '',
    button2Link: '',
    backgroundImage: ''
  })
  
  const [aboutContent, setAboutContent] = useState({
    scripture: '',
    description: '',
    vision: '',
    mission: ''
  })
  
  const [coreValues, setCoreValues] = useState([])
  const [programs, setPrograms] = useState([])
  const [stats, setStats] = useState([])
  const [stories, setStories] = useState([])
  const [messages, setMessages] = useState([])
  
  const [newProgram, setNewProgram] = useState({
    icon: 'fa-book-open',
    title: '',
    description: '',
    longDescription: ''
  })
  
  const [newStory, setNewStory] = useState({
    name: '',
    age: '',
    story: '',
    achievement: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('ogop_admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    loadAllData()
  }, [])

  const loadAllData = async () => {
    try {
      const token = localStorage.getItem('ogop_admin_token')
      
      // Load hero
      const heroRes = await fetch('/api/content?type=hero')
      const heroData = await heroRes.json()
      setHeroContent(heroData)
      
      // Load about
      const aboutRes = await fetch('/api/content?type=about')
      const aboutData = await aboutRes.json()
      setAboutContent(aboutData.about || {})
      setCoreValues(aboutData.values || [])
      
      // Load programs
      const programsRes = await fetch('/api/programs')
      const programsData = await programsRes.json()
      setPrograms(programsData)
      
      // Load stats
      const statsRes = await fetch('/api/content?type=stats')
      const statsData = await statsRes.json()
      setStats(statsData)
      
      // Load stories
      const storiesRes = await fetch('/api/stories')
      const storiesData = await storiesRes.json()
      setStories(storiesData)
      
      // Load messages
      const messagesRes = await fetch('/api/contact', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const messagesData = await messagesRes.json()
      setMessages(messagesData)
      
      setLoading(false)
    } catch (error) {
      console.error('Load error:', error)
      setLoading(false)
    }
  }

  const saveHero = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('ogop_admin_token')
      await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type: 'hero', data: heroContent })
      })
      alert('Hero content saved!')
    } catch (error) {
      alert('Error saving')
    } finally {
      setSaving(false)
    }
  }

  const saveAbout = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('ogop_admin_token')
      await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type: 'about', data: aboutContent })
      })
      alert('About content saved!')
    } catch (error) {
      alert('Error saving')
    } finally {
      setSaving(false)
    }
  }

  const addProgram = async () => {
    const token = localStorage.getItem('ogop_admin_token')
    const res = await fetch('/api/programs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...newProgram, displayOrder: programs.length })
    })
    
    if (res.ok) {
      alert('Program added!')
      setNewProgram({ icon: 'fa-book-open', title: '', description: '', longDescription: '' })
      loadAllData()
    }
  }

  const deleteProgram = async (id: number) => {
    if (!confirm('Delete this program?')) return
    
    const token = localStorage.getItem('ogop_admin_token')
    await fetch(`/api/programs?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    loadAllData()
  }

  const addStory = async () => {
    const token = localStorage.getItem('ogop_admin_token')
    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...newStory, age: parseInt(newStory.age), isFeatured: false, displayOrder: stories.length })
    })
    
    if (res.ok) {
      alert('Story added!')
      setNewStory({ name: '', age: '', story: '', achievement: '' })
      loadAllData()
    }
  }

  const logout = () => {
    localStorage.removeItem('ogop_admin_token')
    localStorage.removeItem('ogop_admin_user')
    router.push('/admin/login')
  }

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h3>OGOP Admin</h3>
        </div>
        <nav>
          <button onClick={() => setActiveTab('hero')} className={activeTab === 'hero' ? 'active' : ''}>
            <i className="fas fa-home"></i> Hero Section
          </button>
          <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>
            <i className="fas fa-info-circle"></i> About Page
          </button>
          <button onClick={() => setActiveTab('programs')} className={activeTab === 'programs' ? 'active' : ''}>
            <i className="fas fa-book"></i> Programs
          </button>
          <button onClick={() => setActiveTab('stories')} className={activeTab === 'stories' ? 'active' : ''}>
            <i className="fas fa-star"></i> Success Stories
          </button>
          <button onClick={() => setActiveTab('stats')} className={activeTab === 'stats' ? 'active' : ''}>
            <i className="fas fa-chart-line"></i> Impact Stats
          </button>
          <button onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'active' : ''}>
            <i className="fas fa-envelope"></i> Messages ({messages.length})
          </button>
        </nav>
        <button onClick={logout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      <div className="admin-content">
        {/* Hero Tab */}
        {activeTab === 'hero' && (
          <div className="admin-section">
            <h2>Hero Section</h2>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                value={heroContent.title} 
                onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <textarea 
                value={heroContent.subtitle} 
                onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Button 1 Text</label>
                <input 
                  type="text" 
                  value={heroContent.button1Text} 
                  onChange={(e) => setHeroContent({...heroContent, button1Text: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Button 1 Link</label>
                <input 
                  type="text" 
                  value={heroContent.button1Link} 
                  onChange={(e) => setHeroContent({...heroContent, button1Link: e.target.value})}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Button 2 Text</label>
                <input 
                  type="text" 
                  value={heroContent.button2Text} 
                  onChange={(e) => setHeroContent({...heroContent, button2Text: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Button 2 Link</label>
                <input 
                  type="text" 
                  value={heroContent.button2Link} 
                  onChange={(e) => setHeroContent({...heroContent, button2Link: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Background Image URL</label>
              <input 
                type="text" 
                value={heroContent.backgroundImage} 
                onChange={(e) => setHeroContent({...heroContent, backgroundImage: e.target.value})}
              />
            </div>
            <button onClick={saveHero} disabled={saving} className="save-btn">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="admin-section">
            <h2>About Page</h2>
            <div className="form-group">
              <label>Scripture</label>
              <textarea 
                value={aboutContent.scripture} 
                onChange={(e) => setAboutContent({...aboutContent, scripture: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                rows={5}
                value={aboutContent.description} 
                onChange={(e) => setAboutContent({...aboutContent, description: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Vision</label>
              <textarea 
                rows={3}
                value={aboutContent.vision} 
                onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Mission</label>
              <textarea 
                rows={3}
                value={aboutContent.mission} 
                onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
              />
            </div>
            <button onClick={saveAbout} disabled={saving} className="save-btn">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="admin-section">
            <h2>Programs</h2>
            
            <div className="add-form">
              <h3>Add New Program</h3>
              <div className="form-group">
                <input 
                  placeholder="Icon (e.g., fa-book-open)"
                  value={newProgram.icon}
                  onChange={(e) => setNewProgram({...newProgram, icon: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input 
                  placeholder="Title"
                  value={newProgram.title}
                  onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                />
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Short Description"
                  rows={2}
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Long Description"
                  rows={3}
                  value={newProgram.longDescription}
                  onChange={(e) => setNewProgram({...
