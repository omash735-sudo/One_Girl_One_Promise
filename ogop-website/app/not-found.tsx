export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F8F9FA',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '120px',
          fontWeight: 'bold',
          color: '#003A99',
          margin: '0'
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1A1A1A',
          marginTop: '16px',
          marginBottom: '16px'
        }}>
          Page Not Found
        </h2>
        
        <p style={{
          fontSize: '18px',
          color: '#4A4F59',
          marginBottom: '16px'
        }}>
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        <div style={{
          backgroundColor: '#003A99',
          color: 'white',
          padding: '16px',
          marginBottom: '32px'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>
            Our team is working on it. Please wait patiently while we get everything in order.
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <a
            href="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#003A99',
              color: 'white',
              padding: '12px 24px',
              fontWeight: '600',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Back to Home
          </a>
          
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-block',
              backgroundColor: 'transparent',
              color: '#003A99',
              padding: '12px 24px',
              fontWeight: '600',
              border: '2px solid #003A99',
              cursor: 'pointer'
            }}
          >
            Go Back
          </button>
        </div>
        
        <div style={{
          marginTop: '32px',
          paddingTop: '32px',
          borderTop: '1px solid #E0E2E6'
        }}>
          <p style={{ fontSize: '14px', color: '#6C727D' }}>
            Looking for something specific?{' '}
            <a href="/" style={{ color: '#003A99', fontWeight: '600', textDecoration: 'underline' }}>
              Visit our homepage
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
