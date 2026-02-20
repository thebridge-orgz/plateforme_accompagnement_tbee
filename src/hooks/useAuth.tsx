// Re-export depuis le contexte partagé (singleton)
// Tous les composants qui appellent useAuth() partagent le MÊME état auth.
export { useAuth } from '../context/AuthContext';
