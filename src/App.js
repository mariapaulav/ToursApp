import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true)
  //state for loading 
  const [tours, setTours] = useState([])

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const fetchTours = async () => {
    //function to fetch the tours from api
    setLoading(true)
    try {
      const response = await fetch(url)
      // save the response
      const tours = await response.json()
      //save the tours 
      setLoading(false)
      // set loading in false
      setTours(tours)
      //setTours with the tour const
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {

    fetchTours()
  }, [])


  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>No tours left</h2>
          <button className='btn' onClick={() => fetchTours()}>
            Refresh
          </button>
        </div>
      </main>
    )
  }



  return(
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
    )
}

export default App
