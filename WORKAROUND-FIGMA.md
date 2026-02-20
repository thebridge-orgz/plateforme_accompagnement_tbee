# ⚡ WORKAROUND : Tester dans Figma Make (temporaire)

## 🎯 Objectif

Activer temporairement le vrai client Supabase dans Figma Make pour tester l'authentification **sans télécharger le code**.

**⚠️ ATTENTION : Cette solution est TEMPORAIRE et DOIT être annulée avant le déploiement !**

---

## 🔧 ÉTAPE 1 : Modifier le client Supabase

Dans le fichier `/src/lib/supabase.ts`, remplacez temporairement les variables par vos vraies clés :

### ❌ Code actuel (ne fonctionne pas dans Figma Make)

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### ✅ Code temporaire (pour tester dans Figma Make)

```typescript
// ⚠️ TEMPORAIRE : À SUPPRIMER AVANT DÉPLOIEMENT !
const supabaseUrl = "https://votre-projet.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

**🔑 Comment trouver ces valeurs ?**

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet TBEE
3. Cliquez sur **Settings** → **API**
4. Copiez :
   - **Project URL** → remplace `"https://votre-projet.supabase.co"`
   - **anon public** → remplace `"eyJhbGciOi..."`

---

## 🧪 ÉTAPE 2 : Tester l'authentification

1. Rechargez la preview Figma Make
2. Allez sur la page de connexion
3. Entrez vos identifiants
4. Cliquez sur "Se connecter"

**✅ Résultat attendu :**
```
1. "Connexion en cours..." (1-2 sec)
2. → Redirection automatique vers le dashboard
3. → Nom affiché dans la sidebar
```

---

## ⚠️ ÉTAPE 3 : ANNULER LA MODIFICATION AVANT DÉPLOIEMENT

**🚨 IMPORTANT : Cette modification doit être annulée avant de déployer sur Vercel !**

### ❌ Code temporaire (À SUPPRIMER)

```typescript
// ⚠️ TEMPORAIRE : À SUPPRIMER AVANT DÉPLOIEMENT !
const supabaseUrl = "https://votre-projet.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

### ✅ Code de production (À REMETTRE)

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

**Pourquoi ?**
- ❌ Les clés en dur dans le code sont visibles par tout le monde
- ❌ Risque de sécurité : quelqu'un peut voler vos clés
- ❌ Mauvaise pratique de développement

---

## 📋 CHECKLIST

**Avant de tester dans Figma Make :**
- [ ] J'ai remplacé les variables par mes vraies clés Supabase
- [ ] J'ai vérifié que les clés sont correctes (copié depuis Supabase)
- [ ] J'ai rechargé la preview Figma Make

**Avant de déployer sur Vercel :**
- [ ] J'ai annulé la modification temporaire
- [ ] J'ai remis le code avec `import.meta.env.VITE_SUPABASE_URL`
- [ ] J'ai ajouté les variables d'environnement dans Vercel
- [ ] Je n'ai PAS committé les clés dans Git

---

## 🎯 SOLUTION RECOMMANDÉE

**Au lieu d'utiliser ce workaround, nous recommandons de :**

1. **Télécharger le code** depuis Figma Make
2. **Tester en local** avec `.env.local`
3. **Déployer sur Vercel** avec les variables d'environnement

👉 Consultez [`TESTER-EN-LOCAL.md`](./TESTER-EN-LOCAL.md)

---

## 🔒 SÉCURITÉ

**❌ NE JAMAIS :**
- Committer les clés Supabase dans Git
- Partager les clés publiquement
- Laisser les clés en dur dans le code de production

**✅ TOUJOURS :**
- Utiliser les variables d'environnement
- Ajouter `.env.local` dans `.gitignore`
- Tester en local ou sur Vercel

---

**Version : 2.1.0**  
**⚠️ Workaround temporaire uniquement pour tests dans Figma Make**  
**🚀 Solution recommandée : Tester en local avec .env.local**
