export default function BuildingSelector({
  buildings,
  from,
  to,
  setFrom,
  setTo,
}) {
  return (
    <div className="selector-group">
      <select value={from ?? ""} onChange={e => setFrom(Number(e.target.value))}>
        <option value="">From building</option>
        {buildings.map(b => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <select value={to ?? ""} onChange={e => setTo(Number(e.target.value))}>
        <option value="">To building</option>
        {buildings.map(b => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
    </div>
  );
}
