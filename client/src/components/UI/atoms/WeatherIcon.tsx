import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';

import type { WeatherIconProps } from '../../../types';

const WeatherIcon = ({ name, className }: WeatherIconProps) => {
  const commonProps = {
    className,
    fontSize: 'inherit' as const,
  };

  switch (name) {
    case 'wind':
      return <AirOutlinedIcon {...commonProps} />;
    case 'sun':
      return <WbSunnyOutlinedIcon {...commonProps} />;
    case 'rain':
      return <GrainOutlinedIcon {...commonProps} />;
    case 'snow':
      return <AcUnitOutlinedIcon {...commonProps} />;
    case 'cloud':
    default:
      return <CloudQueueOutlinedIcon {...commonProps} />;
  }
};

export default WeatherIcon;