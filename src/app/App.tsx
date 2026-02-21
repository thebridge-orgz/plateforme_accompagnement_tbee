import { Routes, Route, useLocation } from 'react-router-dom';
import { routes } from './routes';
import { ScrollToAnchor } from './components/ScrollToAnchor';
import { useEffect } from 'react';


function App() {
  const location = useLocation();

  useEffect(() => {
    // Trouver la route correspondant au chemin actuel
    const currentRoute = routes.find(route => {
      // Pour la route 404 (path: '*'), on ne veut pas qu'elle corresponde à toutes les URLs
      // On vérifie donc si le chemin actuel correspond à une route existante
      if (route.path === '*') {
        return false; // On ne sélectionne pas la route 404 ici
      }
      return route.path === location.pathname;
    });

    if (currentRoute) {
      // Route normale trouvée
      document.title = `${currentRoute.label} | TBEE`;
    } else {
      // Page 404 - on cherche la route avec path: '*'
      const notFoundRoute = routes.find(route => route.path === '*');
      if (notFoundRoute) {
        document.title = `${notFoundRoute.label} | TBEE`;
      }
    }

  }, [location]);

  return (
    <>
      <ScrollToAnchor />
      <Routes>
        {routes.map((route) => (
          <Route key={route.name} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </>
  );
}

export default App;