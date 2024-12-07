import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { SearchProvider } from './contexts/SearchContext';

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          {/* ホームページルート */}
          <Route path="/" element={<Home />} /> 

          {/* 詳細ページルート */}
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
