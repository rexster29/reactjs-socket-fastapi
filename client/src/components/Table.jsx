import React from 'react';
import { motion } from 'framer-motion';

const Table = ({ htmlContent }) => {
  // Function to wrap table with our custom classes
  const wrapTable = (html) => {
    // Create a temporary div to parse the HTML string
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Find the table element
    const table = temp.querySelector('table');
    
    if (!table) {
      return (
        <div className="table-empty-state">
          No table data available
        </div>
      );
    }

    // Add data-label attributes for responsive view
    const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
    const cells = table.querySelectorAll('td');
    cells.forEach((cell, index) => {
      const headerIndex = index % headers.length;
      cell.setAttribute('data-label', headers[headerIndex]);
    });

    return (
      <div className="table-wrapper">
        <div dangerouslySetInnerHTML={{ __html: table.outerHTML }} />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {wrapTable(htmlContent)}
    </motion.div>
  );
};

export default Table;
