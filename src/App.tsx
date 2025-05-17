
import './App.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import AppRoutes from './Routes/AppRoutes';
import { Notifications } from '@mantine/notifications';

function App() {

  return (
  //  <Provider store={Store}>
    <MantineProvider>
      <Notifications position='top-center'/>
        <AppRoutes/>
    </MantineProvider>
  // </Provider>
    
  );
}

export default App
