'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Home, 
  Info, 
  BookOpen, 
  Star, 
  ChartLine, 
  Envelope, 
  LogOut,
  HeartHandshake,
  Package,
  Megaphone,
  GraduationCap,
  Eye,
  Target,
  Users,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

interface Tab {
  id: string
  label: string
  icon: React.ReactNode
}

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
  
  // Support data states
  const [donations, setDonations] = useState([])
  const [supplies, setSupplies] = useState([])
  const [fundraisers, setFundraisers] = useState([])
  const [sponsorships, setSponsorships] = useState([])
  
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

  const tabs: Tab[] = [
    { id: 'hero', label: 'Hero', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'programs', label: 'Programs', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'stories', label: 'Stories', icon: <Star className="w-4 h-4" /> },
    { id: 'stats', label: 'Impact Stats', icon: <ChartLine className="w-4 h-4" /> },
    { id: 'messages', label: 'Messages', icon: <Envelope className="w-4 h-4" /> },
    { id: 'support', label: 'Support', icon: <HeartHandshake className="w-4 h-4" /> },
  ]

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
      
      // Load support data
      const supportRes = await fetch('/api/admin/support?type=all', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const supportData = await supportRes.json()
      if (supportData.success) {
        setDonations(supportData.donations || [])
        setSupplies(supportData.supplies || [])
        setFundraisers(supportData.fundraisers || [])
        setSponsorships(supportData.sponsorships || [])
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Load error:', error)
      setLoading(false)
    }
  }

  const updateSupportStatus = async (id: string, type: string, status: string) => {
    try {
      const token = localStorage.getItem('ogop_admin_token')
      await fetch(`/api/admin/support?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type, status })
      })
      loadAllData()
    } catch (error) {
      console.error('Update error:', error)
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

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-[#FFEB00] text-[#1A1A1A]',
      reviewed: 'bg-[#003A99] text-white',
      contacted: 'bg-[#1A7F00] text-white',
      completed: 'bg-[#1A7F00] text-white',
      cancelled: 'bg-[#E31E24] text-white'
    }
    return styles[status] || 'bg-[#E0E2E6] text-[#1A1A1A]'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F9FA]">
        <div className="text-[#003A99] text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1A1A1A] text-white fixed h-full overflow-y-auto">
        <div className="p-6 border-b border-[#33373F]">
          <h3 className="text-xl font-bold text-[#FFEB00]">OGOP Admin</h3>
          <p className="text-xs text-gray-400 mt-1">One Girl One Promise</p>
        </div>
        
        <nav className="p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#003A99] text-white'
                  : 'text-gray-300 hover:bg-[#33373F] hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'messages' && messages.length > 0 && (
                <span className="ml-auto bg-[#E31E24] text-white text-xs px-2 py-0.5">
                  {messages.length}
                </span>
              )}
              {tab.id === 'support' && (donations.length + supplies.length + fundraisers.length + sponsorships.length) > 0 && (
                <span className="ml-auto bg-[#FFEB00] text-[#1A1A1A] text-xs px-2 py-0.5">
                  {donations.length + supplies.length + fundraisers.length + sponsorships.length}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#33373F]">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-[#33373F] hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Hero Tab */}
        {activeTab === 'hero' && (
          <div className="bg-white border border-[#E0E2E6] p-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Title</label>
                <input 
                  type="text" 
                  value={heroContent.title} 
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Subtitle</label>
                <textarea 
                  rows={3}
                  value={heroContent.subtitle} 
                  onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Button 1 Text</label>
                  <input 
                    type="text" 
                    value={heroContent.button1Text} 
                    onChange={(e) => setHeroContent({...heroContent, button1Text: e.target.value})}
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Button 1 Link</label>
                  <input 
                    type="text" 
                    value={heroContent.button1Link} 
                    onChange={(e) => setHeroContent({...heroContent, button1Link: e.target.value})}
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Button 2 Text</label>
                  <input 
                    type="text" 
                    value={heroContent.button2Text} 
                    onChange={(e) => setHeroContent({...heroContent, button2Text: e.target.value})}
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Button 2 Link</label>
                  <input 
                    type="text" 
                    value={heroContent.button2Link} 
                    onChange={(e) => setHeroContent({...heroContent, button2Link: e.target.value})}
                    className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Background Image URL</label>
                <input 
                  type="text" 
                  value={heroContent.backgroundImage} 
                  onChange={(e) => setHeroContent({...heroContent, backgroundImage: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
              </div>
              <button onClick={saveHero} disabled={saving} className="bg-[#1A7F00] text-white px-6 py-2 font-bold hover:bg-[#136000] transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="bg-white border border-[#E0E2E6] p-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">About Page</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Scripture</label>
                <textarea 
                  rows={3}
                  value={aboutContent.scripture} 
                  onChange={(e) => setAboutContent({...aboutContent, scripture: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Description</label>
                <textarea 
                  rows={5}
                  value={aboutContent.description} 
                  onChange={(e) => setAboutContent({...aboutContent, description: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Vision</label>
                <textarea 
                  rows={3}
                  value={aboutContent.vision} 
                  onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Mission</label>
                <textarea 
                  rows={3}
                  value={aboutContent.mission} 
                  onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
              </div>
              <button onClick={saveAbout} disabled={saving} className="bg-[#1A7F00] text-white px-6 py-2 font-bold hover:bg-[#136000] transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="bg-white border border-[#E0E2E6] p-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Programs</h2>
            
            <div className="bg-[#F8F9FA] p-4 border border-[#E0E2E6] mb-6">
              <h3 className="font-bold text-[#1A1A1A] mb-4">Add New Program</h3>
              <div className="space-y-3">
                <input 
                  placeholder="Icon (e.g., fa-book-open)"
                  value={newProgram.icon}
                  onChange={(e) => setNewProgram({...newProgram, icon: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
                <input 
                  placeholder="Title"
                  value={newProgram.title}
                  onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
                <textarea 
                  placeholder="Short Description"
                  rows={2}
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
                <textarea 
                  placeholder="Long Description"
                  rows={3}
                  value={newProgram.longDescription}
                  onChange={(e) => setNewProgram({...newProgram, longDescription: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
                <button onClick={addProgram} className="bg-[#003A99] text-white px-6 py-2 font-bold hover:bg-[#002A70] transition-colors">
                  Add Program
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[#1A1A1A] mb-4">Existing Programs</h3>
              <div className="space-y-2">
                {programs.map((program: any) => (
                  <div key={program.id} className="flex items-center justify-between border border-[#E0E2E6] p-4 bg-white">
                    <div>
                      <strong className="text-[#1A1A1A]">{program.title}</strong>
                      <p className="text-sm text-[#4A4F59]">{program.description}</p>
                    </div>
                    <button onClick={() => deleteProgram(program.id)} className="bg-[#E31E24] text-white px-3 py-1 text-sm hover:bg-[#C41A1E] transition-colors">
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div className="bg-white border border-[#E0E2E6] p-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Success Stories</h2>
            
            <div className="bg-[#F8F9FA] p-4 border border-[#E0E2E6] mb-6">
              <h3 className="font-bold text-[#1A1A1A] mb-4">Add New Story</h3>
              <div className="space-y-3">
                <input 
                  placeholder="Name"
                  value={newStory.name}
                  onChange={(e) => setNewStory({...newStory, name: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
                <input 
                  type="number"
                  placeholder="Age"
                  value={newStory.age}
                  onChange={(e) => setNewStory({...newStory, age: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
                <textarea 
                  placeholder="Their Story"
                  rows={3}
                  value={newStory.story}
                  onChange={(e) => setNewStory({...newStory, story: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
                <input 
                  placeholder="Achievement"
                  value={newStory.achievement}
                  onChange={(e) => setNewStory({...newStory, achievement: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E0E2E6] focus:outline-none focus:border-[#003A99]"
                />
                <button onClick={addStory} className="bg-[#003A99] text-white px-6 py-2 font-bold hover:bg-[#002A70] transition-colors">
                  Add Story
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[#1A1A1A] mb-4">Existing Stories</h3>
              <div className="space-y-2">
                {stories.map((story: any) => (
                  <div key={story.id} className="border border-[#E0E2E6] p-4 bg-white">
                    <strong className="text-[#1A1A1A]">{story.name}, {story.age}</strong>
                    <p className="text-sm text-[#4A4F59] mt-1">{story.story.substring(0, 150)}...</p>
                    <span className="text-xs text-[#1A7F00] font-medium">Achievement: {story.achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="bg-white border border-[#E0E2E6] p-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Impact Stats</h2>
            <p className="text-[#4A4F59] mb-4">Stats are managed in the database. Contact your developer to update.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {stats.map((stat: any) => (
                <div key={stat.id} className="border border-[#E0E2E6] p-4 bg-[#F8F9FA]">
                  <div className="text-2xl font-bold text-[#003A99]">{stat.number}{stat.suffix}</div>
                  <div className="text-sm text-[#4A4F59]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white border border-[#E0E2E6] p-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Contact Messages</h2>
            {messages.length === 0 ? (
              <p className="text-[#4A4F59]">No messages yet</p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg: any) => (
                  <div key={msg.id} className="border border-[#E0E2E6] p-4 bg-[#F8F9FA]">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-[#1A1A1A]">{msg.name}</strong>
                        <span className="text-sm text-[#4A4F59] ml-2">{msg.email}</span>
                      </div>
                      <span className="text-xs text-[#4A4F59]">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="font-medium text-[#1A1A1A] mt-2">{msg.subject}</div>
                    <div className="text-sm text-[#4A4F59] mt-1">{msg.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="bg-white border border-[#E0E2E6] p-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Support Submissions</h2>
            
            {/* Donations */}
            {donations.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-[#003A99] mb-4 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5" /> Donations ({donations.length})
                </h3>
                <div className="space-y-3">
                  {donations.map((donation: any) => (
                    <div key={donation.id} className="border border-[#E0E2E6] p-4 bg-[#F8F9FA]">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-[#1A1A1A]">{donation.donor_name}</strong>
                          <span className="text-sm text-[#4A4F59] ml-2">{donation.donor_email}</span>
                        </div>
                        <span className="font-bold text-[#1A7F00]">${donation.amount}</span>
                      </div>
                      <div className="text-sm text-[#4A4F59] mt-1">
                        {donation.frequency} · {donation.payment_method || 'Not specified'}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs px-2 py-0.5 font-medium ${getStatusBadge(donation.status)}`}>
                          {donation.status}
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => updateSupportStatus(donation.id, 'donation', 'reviewed')} className="text-xs text-[#003A99] hover:underline">Review</button>
                          <button onClick={() => updateSupportStatus(donation.id, 'donation', 'contacted')} className="text-xs text-[#1A7F00] hover:underline">Contact</button>
                          <button onClick={() => updateSupportStatus(donation.id, 'donation', 'completed')} className="text-xs text-[#1A7F00] hover:underline">Complete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Supplies */}
            {supplies.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-[#003A99] mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" /> Supplies Donations ({supplies.length})
                </h3>
                <div className="space-y-3">
                  {supplies.map((supply: any) => (
                    <div key={supply.id} className="border border-[#E0E2E6] p-4 bg-[#F8F9FA]">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-[#1A1A1A]">{supply.donor_name}</strong>
                          <span className="text-sm text-[#4A4F59] ml-2">{supply.donor_email}</span>
                        </div>
                        <span className="text-sm font-medium text-[#003A99]">{supply.item_type}</span>
                      </div>
                      <div className="text-sm text-[#4A4F59] mt-1">
                        Quantity: {supply.quantity} · Condition: {supply.item_condition}
                      </div>
                      {supply.notes && <div className="text-sm text-[#4A4F59] mt-1">{supply.notes}</div>}
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs px-2 py-0.5 font-medium ${getStatusBadge(supply.status)}`}>
                          {supply.status}
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => updateSupportStatus(supply.id, 'supply', 'reviewed')} className="text-xs text-[#003A99] hover:underline">Review</button>
                          <button onClick={() => updateSupportStatus(supply.id, 'supply', 'contacted')} className="text-xs text-[#1A7F00] hover:underline">Contact</button>
                          <button onClick={() => updateSupportStatus(supply.id, 'supply', 'completed')} className="text-xs text-[#1A7F00] hover:underline">Complete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fundraisers */}
            {fundraisers.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-[#003A99] mb-4 flex items-center gap-2">
                  <Megaphone className="w-5 h-5" /> Fundraiser Requests ({fundraisers.length})
                </h3>
                <div className="space-y-3">
                  {fundraisers.map((fundraiser: any) => (
                    <div key={fundraiser.id} className="border border-[#E0E2E6] p-4 bg-[#F8F9FA]">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-[#1A1A1A]">{fundraiser.name}</strong>
                          <span className="text-sm text-[#4A4F59] ml-2">{fundraiser.email}</span>
                        </div>
                        <span className="text-sm font-medium text-[#003A99]">{fundraiser.fundraiser_type}</span>
                      </div>
                      <div className="text-sm text-[#4A4F59] mt-1">
                        Goal: ${fundraiser.goal} · Date: {fundraiser.event_date ? new Date(fundraiser.event_date).toLocaleDateString() : 'TBD'}
                      </div>
                      {fundraiser.description && <div className="text-sm text-[#4A4F59] mt-1">{fundraiser.description}</div>}
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs px-2 py-0.5 font-medium ${getStatusBadge(fundraiser.status)}`}>
                          {fundraiser.status}
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => updateSupportStatus(fundraiser.id, 'fundraiser', 'reviewed')} className="text-xs text-[#003A99] hover:underline">Review</button>
                          <button onClick={() => updateSupportStatus(fundraiser.id, 'fundraiser', 'contacted')} className="text-xs text-[#1A7F00] hover:underline">Contact</button>
                          <button onClick={() => updateSupportStatus(fundraiser.id, 'fundraiser', 'completed')} className="text-xs text-[#1A7F00] hover:underline">Complete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sponsorships */}
            {sponsorships.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-[#003A99] mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" /> Sponsorship Inquiries ({sponsorships.length})
                </h3>
                <div className="space-y-3">
                  {sponsorships.map((sponsorship: any) => (
                    <div key={sponsorship.id} className="border border-[#E0E2E6] p-4 bg-[#F8F9FA]">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-[#1A1A1A]">{sponsorship.name}</strong>
                          <span className="text-sm text-[#4A4F59] ml-2">{sponsorship.email}</span>
                        </div>
                        <span className="text-sm font-medium text-[#1A7F00]">{sponsorship.sponsorship_tier}</span>
                      </div>
                      {sponsorship.message && <div className="text-sm text-[#4A4F59] mt-1">{sponsorship.message}</div>}
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs px-2 py-0.5 font-medium ${getStatusBadge(sponsorship.status)}`}>
                          {sponsorship.status}
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => updateSupportStatus(sponsorship.id, 'sponsorship', 'reviewed')} className="text-xs text-[#003A99] hover:underline">Review</button>
                          <button onClick={() => updateSupportStatus(sponsorship.id, 'sponsorship', 'contacted')} className="text-xs text-[#1A7F00] hover:underline">Contact</button>
                          <button onClick={() => updateSupportStatus(sponsorship.id, 'sponsorship', 'completed')} className="text-xs text-[#1A7F00] hover:underline">Complete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {donations.length === 0 && supplies.length === 0 && fundraisers.length === 0 && sponsorships.length === 0 && (
              <p className="text-[#4A4F59]">No support submissions yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
