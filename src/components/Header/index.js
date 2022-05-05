import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <ul className="nav-header">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </li>
        <ul className="nav-item-list">
          <Link to="/" className="link-item">
            <li className="nav-item">Home</li>
          </Link>

          <Link to="/jobs" className="link-item">
            <li className="nav-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout" onClick={onClickLogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
