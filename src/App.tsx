import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Categories } from './features/Categories/Categories';
import { Home } from './features/Home/Home';
import { NewTransaction } from './features/NewTransaction/NewTransaction';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Home />}>
          <Route path={'/add'} element={<NewTransaction />} />
        </Route>
        <Route path={'/categories'} element={<Categories />} />
      </Routes>
    </Layout>
  );
};
