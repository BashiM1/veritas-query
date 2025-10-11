import { useEffect, useState } from "react"
import AIChatApp from "./AIChatApp"

const API_URL = import.meta.env.VITE_API_URL
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
  const [testData, setTestData] = useState<TestData | null>(null)
  const [prompt, setPrompt] = useState<string>("")
  const [promptResponse, setPromptResponse] = useState<string>("")

  useEffect(() => {
    async function fetchTest() {
      try {
        const response = await fetch(`${API_URL}/test`)
        const data = await response.json()
        setTestData({ ...data })
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchTest()
  }, [])

  if (!testData) {
    return <div>Loading...</div>
  }

  const handlePostPrompt = async () => {
    try {
      const response = await fetch(`${API_URL}/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })
      const data = await response.json()
      setPromptResponse(data)
    } catch (error) {
      console.error("Error posting prompt: ", error)
    }
    setPrompt("")
  }
  return (
    <>
      <div className="flex justify-center">
        <div>
          <div>
            <p>Message: {testData.message}</p>
            <p>Timestamp: {testData.ksuid.timestamp}</p>
            <p>Payload: {testData.ksuid.payload}</p>
            <p>KSUID: {testData.ksuid.string}</p>
          </div>
          <div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt"
            />
          </div>
          <div>
            <button onClick={handlePostPrompt}>Post Prompt</button>
          </div>
          <div>
            <p>Prompt Response: {promptResponse}</p>
          </div>
        </div>
        <AIChatApp />
      </div>
    </>
  )
}

export default App
