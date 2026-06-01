export default function Table({ columns, data, onRow, empty = "No data available." }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-coffee-100">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-coffee-50 border-b border-coffee-100">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-xs font-semibold text-coffee-500 uppercase tracking-wider">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-coffee-50">
          {data.map((row, i) => (
            <tr
              key={row.id ?? i}
              onClick={() => onRow?.(row)}
              className={`bg-white transition-colors ${onRow ? "cursor-pointer hover:bg-coffee-50" : ""}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-coffee-800">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-coffee-400">{empty}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
