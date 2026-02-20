# ⚡ DÉMARRAGE IMMÉDIAT - 17 MINUTES

## 🎯 OBJECTIF
Faire fonctionner l'authentification TBEE en **17 minutes chrono**.

---

## ✅ ÉTAPE 1 : SUPABASE (5 min)

### Actions :
1. Ouvrir https://supabase.com/dashboard
2. Sélectionner projet **TBEE**
3. **SQL Editor** → **New Query**
4. Copier **TOUT** le fichier `supabase-complete-setup.sql`
5. Coller dans l'éditeur
6. Cliquer **Run**

### Vérification :
```
✅ Table profiles : OK
✅ RLS activé : OK
✅ 4 politiques créées
✅ Trigger créé : OK
🎉 Configuration terminée !
```

**✅ SI TOUT EST BON → Passez à l'étape 2**  
**❌ SI ERREUR → Consultez GUIDE-REPARATION-COMPLET.md**

---

## ✅ ÉTAPE 2 : .env.local (1 min)

### Actions :
1. Ouvrir le dossier du projet
2. Créer fichier `.env.local` à la **RACINE** (niveau `package.json`)
3. Coller ce contenu :

```bash
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Où trouver les clés ?
Supabase Dashboard → **Settings** → **API**
- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** → `VITE_SUPABASE_ANON_KEY`

### Vérification :
```bash
cat .env.local
# Doit afficher 2 lignes
```

**✅ SI LES 2 LIGNES SONT LÀ → Passez à l'étape 3**  
**❌ SI FICHIER VIDE → Relisez cette étape**

---

## ✅ ÉTAPE 3 : INSTALLATION (2 min)

### Actions :
```bash
npm install
npm run dev
```

### Vérification :
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

**✅ SI LE SERVEUR DÉMARRE → Passez à l'étape 4**  
**❌ SI ERREUR → Consultez AIDE-MEMOIRE.md**

---

## ✅ ÉTAPE 4 : DIAGNOSTIC (5 min)

### Actions :
1. Ouvrir navigateur
2. Aller sur `http://localhost:5173/diagnostic-supabase.html`
3. Ouvrir console (**F12**)
4. Regarder les tests automatiques

### Vérification :
```
✅ VITE_SUPABASE_URL trouvé
✅ VITE_SUPABASE_ANON_KEY trouvé
✅ Client Supabase créé avec succès
✅ Connexion réseau OK
✅ Table "profiles" accessible
```

**✅ SI TOUT EST VERT → Passez à l'étape 5**  
**❌ SI ROUGE → La page vous dit quoi faire**

---

## ✅ ÉTAPE 5 : TEST INSCRIPTION (2 min)

### Actions (sur la page de diagnostic) :
1. Section **Test 2 : Inscription**
2. Email : `test@example.com`
3. Password : `password123`
4. Prénom : `Jean`
5. Nom : `Dupont`
6. Cliquer **Créer un compte**

### Vérification :
```
✅ COMPTE CRÉÉ !
✅ PROFIL TROUVÉ !
```

**✅ SI COMPTE CRÉÉ → Passez à l'étape 6**  
**❌ SI ERREUR → Consultez GUIDE-REPARATION-COMPLET.md**

---

## ✅ ÉTAPE 6 : TEST CONNEXION (2 min)

### Actions :
1. Aller sur `http://localhost:5173`
2. Cliquer **Connexion**
3. Email : `test@example.com`
4. Password : `password123`
5. Cliquer **Connexion en cours...**

### Vérification :
```
✅ Redirection vers dashboard
✅ Menu de gauche visible
✅ "Candidat" affiché en haut
✅ Modules visibles
```

**✅ SI ÇA FONCTIONNE → 🎉 BRAVO ! C'EST BON !**  
**❌ SI ERREUR → Consultez GUIDE-REPARATION-COMPLET.md**

---

## 🎉 SUCCÈS !

Si vous êtes arrivé ici, **l'authentification fonctionne** !

### Vous pouvez maintenant :
- ✅ Créer des comptes candidats
- ✅ Se connecter/déconnecter
- ✅ Tester le parcours complet
- ✅ Créer un compte admin (voir CREER-COMPTE-ADMIN.md)
- ✅ Déployer sur Vercel (voir GUIDE-SUPABASE.md)

---

## ❌ PROBLÈME ?

### Si vous êtes bloqué à une étape :

**ÉTAPE 1 (Supabase) :**  
→ Vérifiez que vous êtes bien sur **votre projet TBEE**  
→ Vérifiez que vous avez **copié TOUT le fichier SQL**  
→ Consultez GUIDE-REPARATION-COMPLET.md section "ÉTAPE 1.2"

**ÉTAPE 2 (.env.local) :**  
→ Vérifiez que le fichier est à la **RACINE** (pas dans /src/)  
→ Vérifiez qu'il n'y a **pas d'espace** autour du `=`  
→ Consultez GUIDE-REPARATION-COMPLET.md section "ÉTAPE 2.2"

**ÉTAPE 3 (Installation) :**  
→ Vérifiez que vous êtes dans le **bon dossier**  
→ Essayez `npm cache clean --force` puis `npm install`  
→ Consultez AIDE-MEMOIRE.md section "COMMANDES"

**ÉTAPE 4 (Diagnostic) :**  
→ Si erreur variables → **Redémarrez** le serveur (Ctrl+C puis npm run dev)  
→ Si erreur table → **Réexécutez** le script SQL (ÉTAPE 1)  
→ Consultez GUIDE-REPARATION-COMPLET.md section "ÉTAPE 3"

**ÉTAPE 5 (Inscription) :**  
→ Si profil non créé → Vérifiez le **trigger** dans Supabase  
→ Si erreur RLS → Réexécutez le script SQL  
→ Consultez GUIDE-REPARATION-COMPLET.md section "ÉTAPE 4"

**ÉTAPE 6 (Connexion) :**  
→ Si boucle infinie → **Rechargez** la page (Ctrl+Shift+R)  
→ Si erreur → Consultez la **console** (F12)  
→ Consultez GUIDE-REPARATION-COMPLET.md section "ÉTAPE 5"

---

## 📚 DOCUMENTATION COMPLÈTE

| Fichier | Quand le consulter ? |
|---------|----------------------|
| **MOUSSA-LISEZ-CECI.md** | Pour comprendre le problème |
| **GUIDE-REPARATION-COMPLET.md** | Pour un guide détaillé (15 min) |
| **AIDE-MEMOIRE.md** | Pour les commandes rapides |
| **GUIDE-VISUEL.md** | Pour des schémas visuels |
| **RECAPITULATIF.md** | Pour une vue d'ensemble |
| **diagnostic-supabase.html** | Pour tester automatiquement |

---

## ⏱️ RÉCAPITULATIF DES TEMPS

| Étape | Temps |
|-------|-------|
| 1. Supabase | 5 min |
| 2. .env.local | 1 min |
| 3. Installation | 2 min |
| 4. Diagnostic | 5 min |
| 5. Test inscription | 2 min |
| 6. Test connexion | 2 min |
| **TOTAL** | **17 min** |

---

## ✅ CHECKLIST ULTRA-RAPIDE

```
□ Script SQL exécuté (message "🎉 Configuration terminée !")
□ Fichier .env.local créé (2 lignes)
□ npm run dev lancé (serveur démarre)
□ Page diagnostic affiche tout en vert ✅
□ Test inscription réussi (compte + profil créés)
□ Test connexion réussi (redirection dashboard)
```

**Si TOUTES les cases sont cochées → 🎉 C'EST BON !**

---

## 🚀 PROCHAINE ÉTAPE

**👉 COMMENCEZ PAR L'ÉTAPE 1 CI-DESSUS**

**Chronomètre en main, c'est parti ! ⏱️**

---

**Bon courage ! Vous êtes à 17 minutes de la solution ! 💪**
