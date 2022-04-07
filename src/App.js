import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import './styles.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPhotos = async () => {
      const photosFromServer = await fetchData()
      setPhotos(photosFromServer)
    }
    getPhotos()
  }, [])

  const fetchData = async () => {
    const count = 30
    const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek'
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
    // const count = 30
    // const apiKey = 'z4aAs26Wk-1breeyh_RrAzGV1Q_TAIbdVNX9ka95pIw'
    // const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

    try {
      const res = await fetch(apiUrl)
      const data = await res.json()
      if (data.length === count) {
        setIsLoading(false)
      }
      return data
    } catch (error) {
      console.log('ERROR GETTING PHOTOS')
    }
  }

  const fetchNewDataOnScroll = async () => {
    const photosFromServer = await fetchData()
    setPhotos([...photos, ...photosFromServer])
  }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={photos.length}
          next={fetchNewDataOnScroll}
          hasMore={true}
        >
          <h1 className="title">Infinite Scroll</h1>
          <div>
            {photos.map((photo, index) => {
              return (
                <div className="image-container" key={index}>
                  <a href={photo.links.html} target="_blank" rel="noreferrer">
                    <img
                      src={photo.urls.regular}
                      alt={photo.alt_description}
                      title={photo.alt_description}
                    />
                  </a>
                </div>
              )
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  )
}

export default App
