// Create a TestComponent.jsx
export default function TestComponent() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'lightblue',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1>If you see this, React is rendering</h1>
      <p>Check CSS/container issues next</p>
    </div>
  );
}