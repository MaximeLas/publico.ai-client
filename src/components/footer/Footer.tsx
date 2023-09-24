import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="my-footer">
      <p className="m-auto">Publico.ai © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
