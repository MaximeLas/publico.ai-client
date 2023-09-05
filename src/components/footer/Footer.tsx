import "./Footer.css";

const Footer = () => {
  return (
    <footer className="my-footer">
      <p className="m-auto">Publico.ai © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
