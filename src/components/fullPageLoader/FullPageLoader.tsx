import { Spinner } from 'react-bootstrap';
import { TypeAnimation } from 'react-type-animation';

function FullPageLoader() {
  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
      <Spinner
        animation="grow"
        variant="primary-dark"
        style={{ transform: "scale(3)" }}
      />
      <p className="mt-5">
        Loading{" "}
        <TypeAnimation
          repeat={Infinity}
          omitDeletionAnimation
          cursor={false}
          sequence={[".", 500, "..", 500, "...", 1000]}
        />
      </p>
    </div>
  );
}

export default FullPageLoader;
