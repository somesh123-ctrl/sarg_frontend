import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

const Spreadsheet = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [copiedData, setCopiedData] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://sarg-backend-7woz.onrender.com/data');
      const fetchedData = response.data.map(row => {
        return Object.fromEntries(Object.entries(row).map(([key, value]) => [key, value || null]));
      });
      setData(fetchedData);
      setOriginalData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateData = (rowIndex, columnId, value) => {
    const oldData = [...data];
    const newData = oldData.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...oldData[rowIndex],
          [columnId]: value.trim() === '' ? null : value,
        };
      }
      return row;
    });
    setData(newData);
    setHistory([...history, oldData]);
    setRedoStack([]);
  };

  const saveData = async () => {
    try {
      await axios.put('https://sarg-backend-7woz.onrender.com/data', data);
      setOriginalData(data);
      setPopupMessage('Data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
      setPopupMessage('Error saving data. Please try again.');
    }
  };

  const handleCreate = async () => {
    try {
      const newRow = {
        DischargePort: '',
        SevenIslandsTotal: null,
        SevenIslandsIFO: null,
        SevenIslandsSECA: null,
        BaltimoreTotal: null,
        BaltimoreIFO: null,
        BaltimoreSECA: null,
        PortCartierTotal: null,
        PortCartierIFO: null,
        PortCartierSECA: null,
        TubaraoTotal: null,
        TubaraoIFO: null,
        TubaraoSECA: null,
        PDMTotal: null,
        PDMIFO: null,
        PDMSECA: null,
        MurmanskTotal: null,
        MurmanskIFO: null,
        MurmanskSECA: null,
      };
      await axios.post('https://sarg-backend-7woz.onrender.com/data', newRow);
      fetchData();
      setPopupMessage('Row created successfully.');
    } catch (error) {
      console.error('Error creating row:', error);
      setPopupMessage('Error creating row. Please try again.');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`https://sarg-backend-7woz.onrender.com/data/${id}`, updatedData);
      fetchData();
      setPopupMessage('Row updated successfully.');
    } catch (error) {
      console.error('Error updating row:', error);
      setPopupMessage('Error updating row. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sarg-backend-7woz.onrender.com/data/${id}`);
      fetchData();
      setPopupMessage('Row deleted successfully.');
    } catch (error) {
      console.error('Error deleting row:', error);
      setPopupMessage('Error deleting row. Please try again.');
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey && e.key === 'z') {
      undo();
    } else if (e.ctrlKey && e.key === 'y') {
      redo();
    } else if (e.ctrlKey && e.key === 'c') {
      copy();
    } else if (e.ctrlKey && e.key === 'v') {
      paste();
    } else if (e.key === 'Delete') {
      deleteContent();
    }
  }, [selectedCell, copiedData, history, redoStack]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const undo = () => {
    if (history.length === 0) return;
    const prevData = history.pop();
    setRedoStack([...redoStack, data]);
    setData(prevData);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextData = redoStack.pop();
    setHistory([...history, data]);
    setData(nextData);
  };

  const copy = () => {
    if (selectedCell) {
      setCopiedData(selectedCell);
      setPopupMessage('Cell data copied.');
    }
  };

  const paste = () => {
    if (copiedData && selectedCell) {
      updateData(selectedCell.rowIndex, selectedCell.columnId, copiedData.value);
      setPopupMessage('Cell data pasted.');
    }
  };

  const deleteContent = () => {
    if (selectedCell) {
      updateData(selectedCell.rowIndex, selectedCell.columnId, '');
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'DischargePort', accessor: 'DischargePort' },
      { Header: 'SevenIslandsTotal', accessor: 'SevenIslandsTotal' },
      { Header: 'SevenIslandsIFO', accessor: 'SevenIslandsIFO' },
      { Header: 'SevenIslandsSECA', accessor: 'SevenIslandsSECA' },
      { Header: 'BaltimoreTotal', accessor: 'BaltimoreTotal' },
      { Header: 'BaltimoreIFO', accessor: 'BaltimoreIFO' },
      { Header: 'BaltimoreSECA', accessor: 'BaltimoreSECA' },
      { Header: 'PortCartierTotal', accessor: 'PortCartierTotal' },
      { Header: 'PortCartierIFO', accessor: 'PortCartierIFO' },
      { Header: 'PortCartierSECA', accessor: 'PortCartierSECA' },
      { Header: 'TubaraoTotal', accessor: 'TubaraoTotal' },
      { Header: 'TubaraoIFO', accessor: 'TubaraoIFO' },
      { Header: 'TubaraoSECA', accessor: 'TubaraoSECA' },
      { Header: 'PDMTotal', accessor: 'PDMTotal' },
      { Header: 'PDMIFO', accessor: 'PDMIFO' },
      { Header: 'PDMSECA', accessor: 'PDMSECA' },
      { Header: 'MurmanskTotal', accessor: 'MurmanskTotal' },
      { Header: 'MurmanskIFO', accessor: 'MurmanskIFO' },
      { Header: 'MurmanskSECA', accessor: 'MurmanskSECA' },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value, row }) => (
          <>
            <button onClick={() => handleUpdate(value, row.original)}>Update</button>
            <button onClick={() => handleDelete(value)}>Delete</button>
          </>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupMessage('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [popupMessage]);

  return (
    <div className="container mx-auto px-4 max-w-screen-lg">
      <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateData(i, cell.column.id, e.target.innerText)}
                    onFocus={() => setSelectedCell({ rowIndex: i, columnId: cell.column.id, value: cell.value })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleUpdate(row.original.id, row.original)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(row.original.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    {popupMessage && (
      <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-white p-4 rounded shadow-lg z-50">
        <p>{popupMessage}</p>
      </div>
    )}
    <div className="flex justify-between mt-4">
      <button
        onClick={saveData}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
      <button
        onClick={handleCreate}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create Row
      </button>
    </div>
  </div>
);
};

export default Spreadsheet;

