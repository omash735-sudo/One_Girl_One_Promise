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
                  onChange={(e) => setNewProgram({...newProgram, longDescription: e.target.value})}
                />
              </div>
              <button onClick={addProgram} className="add-btn">Add Program</button>
            </div>

            <div className="items-list">
              <h3>Existing Programs</h3>
              {programs.map((program: any) => (
                <div key={program.id} className="list-item">
                  <div>
                    <strong>{program.title}</strong>
                    <p>{program.description}</p>
                  </div>
                  <button onClick={() => deleteProgram(program.id)} className="delete-btn">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div className="admin-section">
            <h2>Success Stories</h2>
            
            <div className="add-form">
              <h3>Add New Story</h3>
              <div className="form-group">
                <input 
                  placeholder="Name"
                  value={newStory.name}
                  onChange={(e) => setNewStory({...newStory, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input 
                  type="number"
                  placeholder="Age"
                  value={newStory.age}
                  onChange={(e) => setNewStory({...newStory, age: e.target.value})}
                />
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Their Story"
                  rows={3}
                  value={newStory.story}
                  onChange={(e) => setNewStory({...newStory, story: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input 
                  placeholder="Achievement"
                  value={newStory.achievement}
                  onChange={(e) => setNewStory({...newStory, achievement: e.target.value})}
                />
              </div>
              <button onClick={addStory} className="add-btn">Add Story</button>
            </div>

            <div className="items-list">
              <h3>Existing Stories</h3>
              {stories.map((story: any) => (
                <div key={story.id} className="list-item">
                  <div>
                    <strong>{story.name}, {story.age}</strong>
                    <p>{story.story.substring(0, 100)}...</p>
                    <small>Achievement: {story.achievement}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="admin-section">
            <h2>Contact Messages</h2>
            {messages.length === 0 ? (
              <p>No messages yet</p>
            ) : (
              messages.map((msg: any) => (
                <div key={msg.id} className="message-card">
                  <div className="message-header">
                    <strong>{msg.name}</strong> ({msg.email})
                    <small>{new Date(msg.created_at).toLocaleDateString()}</small>
                  </div>
                  <div className="message-subject">{msg.subject}</div>
                  <div className="message-body">{msg.message}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-dashboard {
          display: flex;
          min-height: 100vh;
        }
        .admin-sidebar {
          width: 280px;
          background: #2C3E50;
          color: white;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }
        .admin-logo {
          padding: 20px;
          border-bottom: 1px solid #34495e;
          text-align: center;
        }
        .admin-sidebar nav button {
          width: 100%;
          padding: 15px 20px;
          background: none;
          border: none;
          color: white;
          text-align: left;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s;
        }
        .admin-sidebar nav button:hover,
        .admin-sidebar nav button.active {
          background: #E91E63;
        }
        .logout-btn {
          position: absolute;
          bottom: 20px;
          width: calc(100% - 40px);
          margin: 0 20px;
          padding: 12px;
          background: #c0392b;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .admin-content {
          margin-left: 280px;
          padding: 30px;
          width: calc(100% - 280px);
        }
        .admin-section {
          background: white;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .save-btn, .add-btn {
          background: #E91E63;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .add-form {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 30px;
        }
        .items-list {
          margin-top: 20px;
        }
        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #eee;
        }
        .delete-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        .message-card {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        .message-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .message-subject {
          font-weight: bold;
          margin-bottom: 10px;
        }
        .admin-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 18px;
        }
      `}</style>
    </div>
  )
}
