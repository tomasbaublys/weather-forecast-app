import { useMemo, useState } from 'react';
import styled from 'styled-components';
import type { Place } from '../../../api/weatherApi';

type CitySelectProps = {
  places: Place[];
  selectedPlaceCode: string | null;
  onSelectPlaceCode: (placeCode: string) => void;
};

const Wrapper = styled.div`
  margin: 12px 0;
  max-width: 520px;
`;

const SearchInput = styled.input`
  padding: 10px 12px;
  width: 100%;
`;

const List = styled.ul`
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ccc;
  max-height: 280px;
  overflow: auto;
`;

const Item = styled.li`
  padding: 10px 12px;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const CitySelect = ({ places, selectedPlaceCode, onSelectPlaceCode }: CitySelectProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return places.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 10);
  }, [places, query]);

  const selectedName = useMemo(() => {
    if (!selectedPlaceCode) return '';
    return places.find((p) => p.code === selectedPlaceCode)?.name ?? '';
  }, [places, selectedPlaceCode]);

  return (
    <Wrapper>
      <SearchInput
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (query.trim()) setIsOpen(true);
        }}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 120);
        }}
        placeholder="Search city..."
      />

      {selectedName && <div>Selected: {selectedName}</div>}

      {isOpen && filtered.length > 0 && (
        <List>
          {filtered.map((p) => (
            <Item
              key={p.code}
              onMouseDown={() => {
                onSelectPlaceCode(p.code);
                setQuery(p.name);
                setIsOpen(false);
              }}
            >
              {p.name}
            </Item>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

export default CitySelect;