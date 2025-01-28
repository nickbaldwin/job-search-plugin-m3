import { RouterProvider } from '@tanstack/react-router';

import { router } from './router.ts';
import './App.css';

const App = (): JSX.Element => {
    return <RouterProvider router={router} />;
};
export default App;
