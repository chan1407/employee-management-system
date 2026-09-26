export default function SearchBar({ value, onChange, placeholder = 'Search by name or ID...' }) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{ minWidth: '220px', flex: 1 }}
    />
  )
}
