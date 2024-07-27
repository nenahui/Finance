import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Categories } from './features/Categories/Categories';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={'/categories'} element={<Categories />} />
      </Routes>
    </Layout>
  );
};
