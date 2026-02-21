import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToAnchor = () => {
    const { hash, pathname } = useLocation();
    const previousPathname = useRef(pathname);

    useEffect(() => {
        // Si on change de page et qu'il n'y a pas de hash, on va en haut
        if (previousPathname.current !== pathname && !hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Si on a un hash, on essaie de défiler vers l'élément
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);

            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }

        previousPathname.current = pathname;
    }, [hash, pathname]);

    return null;
};