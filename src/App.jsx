import './App.css'
import Permission from './Components/PermissionsTable'
import { Typography } from '@material-ui/core';


function App() {

  return (
    <>
      <Typography variant="h2" component="h2" gutterBottom>
        N5 Challenge
      </Typography>
      <Permission />
    </>
  )
}

export default App
