const FACILITIES = [
  { bit: 1, label: "WiFi" },
  { bit: 2, label: "Library" },
  { bit: 4, label: "Cafe" },
  { bit: 8, label: "Study Area" },
  { bit: 16, label: "Printer" },
  { bit: 32, label: "Computers" },
  { bit: 64, label: "Parking" },
  { bit: 128, label: "Gym" },
  { bit: 256, label: "Student Support" },
];

export default function FacilitySelector({ selected, setSelected }) {
  return (
    <select 
      value={selected ?? ""} 
      onChange={(e) => setSelected(e.target.value === "" ? null : Number(e.target.value))}
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px'
      }}
    >
      <option value="">All Facilities</option>
      {FACILITIES.map((f) => (
        <option key={f.bit} value={f.bit}>
          {f.label}
        </option>
      ))}
    </select>
  );
}