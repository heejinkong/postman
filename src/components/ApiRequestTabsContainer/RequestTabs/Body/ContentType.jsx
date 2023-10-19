import { useEffect, useRef, useState } from 'react';

import '../../../../style/contenttype.scss';

export default function ContentType() {
  const ref = useRef(null);
  const [options, setoptions] = useState([
    { key: 1, value: 'Text' },
    { key: 2, value: 'JavaScript' },
    { key: 3, value: 'JSON' },
    { key: 4, value: 'HTML' },
    { key: 5, value: 'XML' },
  ]);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    // No Cleanup function
  }, []);

  return (
    <div
      className="dropdown"
      onBlur={() => {
        setSelectedOption(false);
      }}
    >
      <div ref={ref}>
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <span
            className={`selected-option ${selectedOption ? 'selected' : ''}`}
          >
            {selectedOption || '선택'}
          </span>
        </button>
        {open && (
          <ul className="dropdown-options">
            {options.map((option) => (
              <li
                key={option.key}
                className={'option'}
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
