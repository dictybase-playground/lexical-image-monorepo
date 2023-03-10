import { useEffect } from "react"
import SaveButton from "./SaveButton"
import useLocalStorage from "./useLocalStorage"

const LocalPersistencePlugin = () => {
  const { retrieveLocalStorage, saveLocalStorage } = useLocalStorage()

  useEffect(() => {
    retrieveLocalStorage()
  }, [retrieveLocalStorage])

  return <SaveButton handleSave={saveLocalStorage} />
}

export default LocalPersistencePlugin
