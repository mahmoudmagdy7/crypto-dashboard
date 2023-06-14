import { FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo, TwitterLogo, YoutubeLogo } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <>
      <main id="not-found" className="d-flex align-items-center justify-content-center vh-100 container  ">
        <div className="text-center">
          <h1 id="error-code">404</h1>
          <p className="fs-1 oops">OOPS! NOTHING WAS FOUND</p>
          <p className="">
            The page you are looking for might have been removed had its name changed or is temporarily unavailable.
            <Link to="/">Return to homepage</Link>
          </p>
          <div className="social-icons d-flex justify-content-center gap-2">
            <Link className="d-flex align-items-center justify-content-center" target="_blank" to="https://www.linkedin.com/company/web3pros">
              <LinkedinLogo size={20} weight="bold" />
            </Link>

            <Link className="d-flex align-items-center justify-content-center" target="_blank" to="https://www.facebook.com/web3pros">
              <FacebookLogo size={20} weight="bold" />
            </Link>

            <Link className="d-flex align-items-center justify-content-center" target="_blank" to="https://twitter.com/web3pros">
              <TwitterLogo size={20} weight="bold" />
            </Link>
            <Link className="d-flex align-items-center justify-content-center" target="_blank" a to="https://www.instagram.com/web3pros.dev">
              <InstagramLogo size={20} weight="bold" />
            </Link>
            <Link className="d-flex align-items-center justify-content-center" target="_blank" to="https://www.github.com/web3pros">
              <GithubLogo size={20} weight="bold" />
            </Link>

            <Link className="d-flex align-items-center justify-content-center" target="_blank" to="https://www.youtube.com/@web3pros">
              <YoutubeLogo size={20} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Notfound;
