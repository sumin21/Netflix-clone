import { Link, Route } from "react-router-dom";

import About from "./About";
import Home from "./routes/Home";

const Router: React.FC = () => {
  return (
    <div>
      {/* <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul> */}
      <Home />;
    </div>
  );
};

export default Router;
