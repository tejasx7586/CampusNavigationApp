import FacilitySelector from "./FacilitySelector";

export default function ControlPanel({
  buildings,
  from,
  to,
  setFrom,
  setTo,
  facility,
  setFacility,
  onNavigate,
}) {
  return (
    <aside className="control-panel">
      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '20px',
        color: '#1a1a1a'
      }}>
        Campus Navigation
      </h1>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '5px', 
          fontWeight: '500',
          color: '#333'
        }}>
          From:
        </label>
        <select 
          value={from ?? ""} 
          onChange={(e) => setFrom(e.target.value === "" ? null : Number(e.target.value))}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
        >
          <option value="">Select start building</option>
          {buildings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '5px', 
          fontWeight: '500',
          color: '#333'
        }}>
          To:
        </label>
        <select 
          value={to ?? ""} 
          onChange={(e) => setTo(e.target.value === "" ? null : Number(e.target.value))}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
        >
          <option value="">Select destination</option>
          {buildings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '5px', 
          fontWeight: '500',
          color: '#333'
        }}>
          Filter by Facility:
        </label>
        <FacilitySelector selected={facility} setSelected={setFacility} />
      </div>

      <button 
        onClick={onNavigate}
        disabled={from === null || to === null}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: (from === null || to === null) ? '#ccc' : '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: (from === null || to === null) ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => {
          if (from !== null && to !== null) {
            e.target.style.backgroundColor = '#3367d6';
          }
        }}
        onMouseOut={(e) => {
          if (from !== null && to !== null) {
            e.target.style.backgroundColor = '#4285F4';
          }
        }}
      >
        Get Directions
      </button>

      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666'
      }}>
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>Total Buildings:</strong> {buildings.length}
        </p>
        {from !== null && to !== null && (
          <p style={{ margin: 0 }}>
            <strong>Route:</strong> {buildings.find(b => b.id === from)?.name.split(':')[0]} → {buildings.find(b => b.id === to)?.name.split(':')[0]}
          </p>
        )}
      </div>
    </aside>
  );
}