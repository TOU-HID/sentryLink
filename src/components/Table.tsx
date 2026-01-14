import type { TableProps } from '../types';

export const Table = <T extends { id: number }>({
  columns,
  data,
  onRowClick,
  selected = [],
  onSelect,
}: TableProps<T>) => {
  return (
    <div className='overflow-x-auto border rounded-lg border-red-400'>
      <table className='min-w-full divide-y divide-red-200'>
        <thead className='bg-red-50'>
          <tr>
            {onSelect && (
              <th className='px-4 py-3 w-12'>
                <input
                  type='checkbox'
                  className='rounded border-red-300'
                  checked={selected.length === data.length && data.length > 0}
                  onChange={(e) =>
                    onSelect(e.target.checked ? data.map((d) => d.id) : [])
                  }
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key as string}
                className='px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider'
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-red-200'>
          {data.map((row) => (
            <tr key={row.id} className='hover:bg-red-50 cursor-pointer'>
              {onSelect && (
                <td className='px-4 py-4'>
                  <input
                    type='checkbox'
                    className='rounded border-red-300'
                    checked={selected.includes(row.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSelect(
                        e.target.checked
                          ? [...selected, row.id]
                          : selected.filter((id) => id !== row.id)
                      );
                    }}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className='px-6 py-4 whitespace-nowrap text-sm text-red-900'
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {col.render
                    ? col.render(
                        col.key === 'actions' ? null : row[col.key as keyof T],
                        row
                      )
                    : (row[col.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
