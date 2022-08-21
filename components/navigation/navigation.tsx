import { faCog, faComments, faHome, faPhone, faSearch, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { SyntheticEvent, MouseEvent } from 'react'
import { API_ROOT_URL, DEFAULT_IMAGE_PATH } from '../../constants/constant'
import { AuthService } from '../../services/auth'

interface NavigationProps {
  // TODO: 仮置きなので、別の場所で再定義
  user: any,
  isAuth: boolean
}

export default function Navigation(props: NavigationProps) {
  return (
    <div className="nav-wrapper">
      <div className="nav">
        <ul className="nav-list">
          {
            props.isAuth
              ? authNavigation(props.user)
              : unauthNavigation()
          }
        </ul>
      </div>
    </div>
  )
}

function unauthNavigation(): React.ReactNode {
  return (
    <>
      <li className="nav-item">
        <Link href="/signup">
          <a className="nav-link"><FontAwesomeIcon icon={faUserPlus} /></a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/login">
          <a className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /></a>
        </Link>
      </li>
    </>
  )
}

// TODO: anyとな
function authNavigation(user: any): React.ReactNode {
  const router = useRouter()
  const handleLogout = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault()
    const res = AuthService.getInstance().logout()
    res.then(data => {
      if (data.status !== 204) {
        // TODO: logout失敗の通知
        return
      }
      router.push("/")
    })
  }
  return (
    <>
      <li className="nav-item">
        <Link href="/dashboard">
          <a className="nav-link"><FontAwesomeIcon icon={faHome} /></a>
        </Link>
      </li>
      {
        Object.keys(user).length > 0
          ? <li className="nav-item">
            <Link href={`/account/profile`}>
              <a className="nav-link">
                <img src={`${API_ROOT_URL}/users/${user.userId}/icon`} className="avatar avatar-36 round"/>
              </a>
            </Link>
          </li>
          : <></>
      }
      <li className="nav-item">
        <Link href="/rooms">
          <a className="nav-link"><FontAwesomeIcon icon={faComments} /></a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/phone">
          <a className="nav-link"><FontAwesomeIcon icon={faPhone} /></a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/rooms/search">
          <a className="nav-link"><FontAwesomeIcon icon={faSearch} /></a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/account/setting">
          <a className="nav-link"><FontAwesomeIcon icon={faCog} /></a>
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /></a>
      </li>
    </>
  )
}