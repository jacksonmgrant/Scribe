import Logo from "../components/Assets/logo-fullcolor.png";

export default function Header() {
  return (
    <header>
      {<div style={{ display: 'flex', alignItems: 'center' }}>
        <img className="logo" alt="Scribe Logo" src={Logo}></img>
        <h1>Scribe</h1>
       </div>}
    </header>
  );
};
