import Logo from "../components/Assets/logo-fullcolor.png";

export default function Header() {
  return (
    <header>
      {<div style={{ display: 'flex', alignItems: 'center' }}>
        <img alt="Scribe Logo" src={Logo} style={{ height: '5rem', marginRight: '1.25rem', paddingTop: '10px' }}></img>
        <h1>Scribe</h1>
       </div>}
    </header>
  );
};
