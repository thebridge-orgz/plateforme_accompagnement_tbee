-- ============================================
-- 🔧 CRÉER UN PROFIL MANQUANT
-- ============================================
-- Utilisez ce script si votre profil n'existe pas dans la table profiles
-- mais que votre compte existe dans auth.users
--
-- AVANT D'EXÉCUTER :
-- 1. Trouvez votre UUID en exécutant la requête ci-dessous
-- 2. Remplacez 'VOTRE-EMAIL-ICI' par votre vrai email
-- 3. Exécutez la section "Étape 1"
-- 4. Copiez l'UUID affiché
-- 5. Remplacez 'VOTRE-UUID-ICI' dans "Étape 2"
-- 6. Remplacez les autres valeurs (prénom, nom, email)
-- 7. Exécutez la section "Étape 2"
-- ============================================

-- ============================================
-- ÉTAPE 1 : TROUVER VOTRE UUID
-- ============================================

SELECT 
  id AS "UUID à copier",
  email,
  created_at AS "Créé le"
FROM auth.users
WHERE email = 'VOTRE-EMAIL-ICI'; -- ← Remplacez par votre email

-- ⬆️ COPIEZ L'UUID AFFICHÉ CI-DESSUS

-- ============================================
-- ÉTAPE 2 : CRÉER LE PROFIL
-- ============================================

-- Remplacez les valeurs ci-dessous
INSERT INTO public.profiles (id, email, first_name, last_name, role)
VALUES (
  'VOTRE-UUID-ICI',           -- ← Collez l'UUID copié à l'étape 1
  'nous-contacter@gmail.com', -- ← Votre email
  'Moussa',                   -- ← Votre prénom
  'THIAM',                    -- ← Votre nom
  'student'                   -- ← 'student' ou 'admin'
)
ON CONFLICT (id) DO UPDATE
SET 
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  updated_at = NOW();

-- ============================================
-- ÉTAPE 3 : VÉRIFICATION
-- ============================================

-- Afficher le profil créé
SELECT 
  id,
  email,
  first_name || ' ' || last_name AS "Nom complet",
  role,
  created_at,
  updated_at
FROM public.profiles
WHERE email = 'VOTRE-EMAIL-ICI'; -- ← Remplacez par votre email

-- ============================================
-- ✅ SI VOUS VOYEZ VOTRE PROFIL
-- ============================================
-- → Retournez sur http://localhost:5173
-- → Déconnectez-vous
-- → Reconnectez-vous
-- → Vous devriez être redirigé vers le dashboard en 1-2 sec !
-- ============================================

-- ============================================
-- 🆘 EXEMPLE COMPLET
-- ============================================
-- Si votre email est nous-contacter@gmail.com et votre UUID est 
-- 2eae3c30-5f75-4765-9f84-c2ce5725abb5
--
-- Exécutez :
--
-- INSERT INTO public.profiles (id, email, first_name, last_name, role)
-- VALUES (
--   '2eae3c30-5f75-4765-9f84-c2ce5725abb5',
--   'nous-contacter@gmail.com',
--   'Moussa',
--   'THIAM',
--   'student'
-- );
-- ============================================
