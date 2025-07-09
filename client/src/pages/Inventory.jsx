// src/pages/Inventory.jsx
export default function Inventory() {
  const inventory = [] // Later replace with fetched data

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Inventory</h1>

      <div className="bg-white p-4 rounded shadow">
        {inventory.length === 0 ? (
          <p>No chickens in inventory.</p>
        ) : (
          <ul>
            {inventory.map((item, index) => (
              <li key={index} className="border-b py-2">
                {item.breed} - {item.quantity} chickens
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
