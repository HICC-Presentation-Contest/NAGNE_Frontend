import { Text } from 'react-native';
import styled from 'styled-components';
import Maps from '../components/Maps';

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

const MapContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  padding: 9px;
  background-color: white;
`;

const Map = styled.View`
  width: 170px;
  height: 176px;
  margin-left: 10px;
  margin-bottom: 16px;
  border: 1px;
  border-radius: 5px;
`;

export default function Storage() {
  return (
    <MapContainer>
      <Map>
        <Maps />
      </Map>
    </MapContainer>
  );
}
