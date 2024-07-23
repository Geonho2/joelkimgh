import './Notch.css';
import Clock from 'react-live-clock';
import { ReactComponent as Wifi } from '../images/wifi.svg';
import { ReactComponent as Battery } from '../images/battery.svg';

function Notch({theme}) {
  if (theme === 'light') {
    return (
      <div className="container" style={{background: "#77D6B4"}}>
        <p className='time' style={{color: "black"}}>
          <Clock format={'HH:mm'} ticking={true} timezone={"Asia/Seoul"} />
        </p>
        <div className='camera'></div>
        <div className='icon'>
          <Wifi width='19' height='19' fill='black'></Wifi>
          <Battery width='35' height='25' fill='black'></Battery>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container" style={{background: "#000A13"}}>
      <p className='time' style={{color: "white"}}>
        <Clock format={'HH:mm'} ticking={true} timezone={"Asia/Seoul"} />
      </p>
      <div className='camera'></div>
      <div className='icon'>
        <Wifi width='19' height='19' fill='white'></Wifi>
        <Battery width='35' height='25' fill='white'></Battery>
      </div>
    </div>
  );
}

export default Notch//;
