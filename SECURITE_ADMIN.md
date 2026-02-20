# 🔐 Sécurité des comptes administrateurs TBEE

## Présentation

La plateforme TBEE utilise un système de code secret pour sécuriser la création des comptes administrateurs et empêcher tout accès non autorisé à l'interface d'administration.

## Système de sécurité

### 1. Code secret admin

**Code actuel :** `TBEE2026`

⚠️ **Important :** Ce code doit être :
- Changé régulièrement (recommandé : tous les 3-6 mois)
- Partagé uniquement avec les personnes autorisées
- Gardé strictement confidentiel

### 2. Comment changer le code

Le code secret est défini dans le fichier `/src/app/components/SignupPage.tsx` :

```typescript
const ADMIN_SECRET_CODE = "TBEE2026";
```

Pour le modifier :
1. Ouvrez le fichier `/src/app/components/SignupPage.tsx`
2. Changez la valeur de `ADMIN_SECRET_CODE` à la ligne 10
3. Communiquez le nouveau code uniquement aux personnes autorisées

### 3. Fonctionnement

#### Inscription admin
1. L'utilisateur sélectionne l'onglet "Admin" sur la page d'inscription
2. Un champ "Code d'accès admin" apparaît (obligatoire)
3. Le code est validé lors de la soumission du formulaire
4. Si le code est incorrect, un message d'erreur s'affiche :
   - "Code d'accès admin incorrect. Veuillez contacter l'équipe TBEE."
5. L'inscription n'est pas possible sans le bon code

#### Connexion admin
- Un message de sécurité apparaît pour informer que les comptes admin sont protégés
- Seuls les utilisateurs ayant créé un compte avec le bon code peuvent se connecter

## Recommandations de sécurité

### Pour les administrateurs TBEE

1. **Changez le code régulièrement**
   - Minimum tous les 6 mois
   - Immédiatement si vous suspectez une fuite

2. **Partage du code**
   - Communiquez le code uniquement en personne ou via un canal sécurisé
   - Ne partagez jamais le code par email non chiffré ou messagerie publique
   - Tenez un registre des personnes ayant accès au code

3. **Gestion des comptes**
   - Vérifiez régulièrement les comptes admin existants
   - Désactivez les comptes admin non utilisés
   - Documentez chaque création de compte admin

4. **En cas de problème**
   - Si un accès non autorisé est détecté, changez immédiatement le code
   - Révoquez l'accès des comptes suspects
   - Informez l'équipe technique

## Évolutions futures recommandées

Pour une sécurité renforcée en production, considérez :

1. **Système d'invitation par email**
   - Les admins reçoivent un lien unique d'invitation
   - Lien à usage unique avec expiration

2. **Authentification à deux facteurs (2FA)**
   - Code SMS ou application d'authentification
   - Obligatoire pour tous les comptes admin

3. **Gestion des rôles**
   - Super-admin pouvant créer d'autres admins
   - Différents niveaux d'accès admin

4. **Audit des connexions**
   - Historique des connexions admin
   - Alertes en cas de tentative suspecte

5. **Stockage sécurisé du code**
   - Utiliser des variables d'environnement
   - Ne jamais stocker le code en clair dans le code source

## Contact

Pour toute question sur la sécurité des comptes admin, contactez l'équipe technique TBEE.

---

**Dernière mise à jour :** 22 janvier 2026  
**Code actuel :** TBEE2026
