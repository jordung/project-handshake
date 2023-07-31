import Container from "../components/Container";
import hero from "../assets/landing/Life in a city-pana.svg";
import team from "../assets/landing/Pair.png";
import volunteer from "../assets/logo/logo-white.png";
import footerLogo from "../assets/logo/logo-black.png";
import jordanAvatar from "../assets/landing/jordan-avatar.png";
import jaelynAvatar from "../assets/landing/jaelyn-avatar.png";

function Landing() {
  return (
    <Container>
      {/* Hero Section */}
      <div className="prose prose-h1:font-bold prose-p:font-medium px-4 pt-8 pb-8 bg-base-100 min-w-full flex flex-col md:flex-row-reverse md:justify-center md:items-center">
        <img className="mb-0 md:w-2/3 lg:w-1/3" src={hero} alt="hero" />
        <div className="md:w-1/3">
          <h1 className="mb-0">Join hands. Change the world.</h1>
          <p>
            Handshake is a digital platform for connecting individuals who are
            seeking to change the world with organisations.{" "}
          </p>
          <div className="flex gap-4">
            <button className="btn btn-primary text-white normal-case">
              Join us now
            </button>
            <button className="btn btn-neutral normal-case">Talk to us</button>
          </div>
          <div className="flex justify-center md:justify-start">
            <div>
              <h2 className="mb-0 text-3xl my-4 mx-2 md:ml-0">10K</h2>
              <p className="text-xs w-1/2 mx-2 md:ml-0">Amazing volunteers</p>
            </div>
            <div>
              <h2 className="mb-0 text-3xl my-4 mx-2 md:ml-0">800+</h2>
              <p className="text-xs w-1/2 mx-2 md:ml-0">Successful projects</p>
            </div>
            <div>
              <h2 className="mb-0 text-3xl my-4 mx-2 md:ml-0">200K</h2>
              <p className="text-xs w-1/2 mx-2 md:ml-0">Beneficiaries helped</p>
            </div>
          </div>
        </div>
      </div>
      {/* About Us Section */}
      <div className="mx-4 mt-5 prose prose-p:font-medium flex flex-col md:min-w-full md:mx-0 lg:flex-row md:justify-center md:items-start md:gap-12">
        <img
          className="object-contain md:w-2/3 md:self-center lg:w-1/3"
          src={team}
          alt="about us"
        />
        <div className="lg:w-1/3">
          <p className="uppercase font-bold text-primary text-sm mt-5 mb-0">
            About us
          </p>
          <h2 className="mt-0">Platform For Good</h2>
          <p>
            As active technologists, we seek to make the world a better place
            through what we do best - code. And this is the platform that we
            came up with to connect volunteering opportunities.{" "}
          </p>

          <div className="flex items-start gap-2">
            <img
              className="bg-primary h-10 rounded-full mt-0"
              src={volunteer}
              alt="volunteer icon"
            />
            <div>
              <h6 className="font-bold">Volunteer</h6>
              <p className="text-sm mt-0">
                Providing an integrated platform where organisations can reach
                out to helpful individuals. <br />
                We host a variety of project, from senior citizen support, to
                pet-walking, and even bettering technology for society.
              </p>
            </div>
          </div>
          {/* The Team Section */}
          <h2>The Team</h2>
          <div className="flex items-start">
            <img
              className="h-32 mt-0"
              src={jordanAvatar}
              alt="Jordan's Avatar"
            />
            <div className="ml-2">
              <p className="font-medium my-0">Jordan Ang @jordung</p>
              <p className="my-0 text-sm">
                I've always wanted to be able to contribute to something that's
                bigger to myself - and what better way to do so through a medium
                that I'm familiar with?
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <img
              className="h-32 mt-0"
              src={jaelynAvatar}
              alt="Jordan's Avatar"
            />
            <div className="ml-2">
              <p className="font-medium my-0">Jaelyn Teo @jteohn</p>
              <p className="my-0 text-sm">
                Often, we underestimate the power of the smallest act of
                kindness. This app serves as a reminder that even the tiniest
                gestures of kindness can create a big difference in the lives of
                others.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer p-10 bg-base-100 text-base-content md:flex md:justify-between md:px-32">
        <div>
          <img className="h-32" src={footerLogo} alt="Footer Logo" />
          <p>
            Handshake Team
            <br />
            Connecting people since 2023
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Careers</a>
          <a className="link link-hover">Feedback</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </Container>
  );
}

export default Landing;