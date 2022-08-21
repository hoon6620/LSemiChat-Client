import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState, MouseEvent, ChangeEvent, SyntheticEvent } from 'react'
import Link from 'next/link'
import { API_ROOT_URL, DEFAULT_IMAGE_PATH } from '../../constants/constant'
import { getRequest } from '../../services/common'

// TODO: 仮置き
interface RoomProps {
  id: string,
  image: string,
  name: string,
  user: string,
  summary: string,
}

// TODO: propsの設定
export default function SideBar() {
  const [rooms, setRooms] = useState(new Array<RoomProps>())
  const [keyword, setKeyword] = useState("")
  const [reload, setReload] = useState(true);

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault()
    const _keyword = keyword
    setKeyword("")

  }
  
  if(reload) {
    getRequest("/account/threads")
    .then((r: Response) => {
      //console.log(r)
      if(!r.threads) return;
      let rooms = new Array<RoomProps>()
      for(let i = 0; i < (r.threads).length; i++) {
        let thread = r.threads[i];
        rooms.push({
          id: thread.id,
          image: API_ROOT_URL + "/threads/" + thread.id + "/icon",
          name: thread.name,
          user: thread.author.name,
          summary: thread.description
        })
      }
      setRooms(rooms)
      setReload(false)
    })
  }
    
  return (
    <div className="sidebar-wrapper">
      <div className="search">
        <form method="GET" className="search-form">
          <input type="text" name="key" autoComplete="off" value={keyword} onChange={(evt: ChangeEvent<HTMLInputElement>) => setKeyword(evt.target.value)} />
          <button type="submit" onClick={handleSubmit}><FontAwesomeIcon icon={faSearch} /></button>
        </form>
      </div>
      {/* END search */}
      <div className="sidebar">
        <ul className="room-list">
          {
            rooms.map(room => (
              <li className="room-item" key={room.id}>
                <Link href={`/rooms/${room.id}`}>
                  <a className="room-link">
                    <div>
                      <img src={room.image} className="avatar avatar-32 round border" onError={(evt: SyntheticEvent<HTMLImageElement, Event>) => evt.target.src = DEFAULT_IMAGE_PATH} />
                      <h2 className="h3 room-name">{room.name}</h2>
                    </div>
                    <div>
                      <label>{room.user} &gt; {room.summary}</label>
                    </div>
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
        {/* END roomlist */}
      </div>
      {/* END sidebar */}
    </div>
  )
}