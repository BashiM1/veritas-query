import { useEffect, useState } from "react"
import AIChatApp from "./AIChatApp"

type Ksuid = {
  string: string
  timestamp: string
  payload: string
}

type TestData = {
  message: string
  ksuid: Ksuid
}

function App() {
  const [data, setData] = useState<TestData | null>(null)

  useEffect(() => {
    async function fetchTest() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/test`)
        const data = await response.json()
        setData({ ...data })
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchTest()
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <p>Message: {data.message}</p>
        <p>Timestamp: {data.ksuid.timestamp}</p>
        <p>Payload: {data.ksuid.payload}</p>
        <p>KSUID: {data.ksuid.string}</p>
      </div>
      <AIChatApp />
    </>
  )
}

export default App
