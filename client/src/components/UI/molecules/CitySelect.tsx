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
`;

const SearchInput = styled.input`
  padding: 10px 12px;
  min-width: 280px;
`;

const List = styled.ul`
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
  max-width: 420px;
  border: 1px solid #ccc;
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
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
      />

      {selectedName && <div>Selected: {selectedName}</div>}

      {filtered.length > 0 && (
        <List>
          {filtered.map((p) => (
            <Item
              key={p.code}
              onClick={() => {
                onSelectPlaceCode(p.code);
                setQuery(p.name); // keep it simple: show selected in input
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