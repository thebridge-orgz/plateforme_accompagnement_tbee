import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import { routes } from '../../router/routes';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isValidSession, setIsValidSession] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();
    const { updatePassword, hasValidResetSession } = useAuth();

    useEffect(() => {
        // Vérifier si l'utilisateur a une session valide (via le token dans l'URL)
        const checkSession = async () => {
            try {
                // Attendre un peu que Supabase traite le token
                await new Promise(resolve => setTimeout(resolve, 1000));

                const hasSession = await hasValidResetSession();
                setIsValidSession(hasSession);

                if (!hasSession) {
                    console.log('Pas de session valide trouvée');
                }
            } catch (err) {
                console.error('Erreur lors de la vérification:', err);
                setIsValidSession(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkSession();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validations
        if (!newPassword || !confirmPassword) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        if (newPassword.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setIsLoading(true);

        try {
            // Mettre à jour le mot de passe - Supabase utilise automatiquement le token de l'URL
            await updatePassword(newPassword);

            setIsSubmitted(true);

            // Rediriger vers la connexion après 3 secondes
            setTimeout(() => {
                navigate(routes.SignIn.path);
            }, 3000);
        } catch (err: any) {
            console.error('Erreur mise à jour mot de passe:', err);
            setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    // Affichage pendant la vérification
    if (isChecking) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#1E1548] mb-3">
                        Vérification en cours...
                    </h1>
                    <p className="text-[#6B7280]">
                        Nous vérifions votre lien de réinitialisation.
                    </p>
                </div>
            </div>
        );
    }

    // Si la session n'est pas valide
    if (!isValidSession) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#1E1548] mb-3">
                        Lien invalide ou expiré
                    </h1>
                    <p className="text-[#6B7280] mb-6">
                        Ce lien de réinitialisation est invalide ou a expiré. Veuillez faire une nouvelle demande.
                    </p>
                    <Link to={routes.ForgotPassword.path}>
                        <Button className="w-full">
                            Demander un nouveau lien
                        </Button>
                    </Link>
                    <div className="text-center mt-4">
                        <Link
                            to={routes.SignIn.path}
                            className="text-sm text-black hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour à la connexion
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#1E1548] mb-3">
                        Mot de passe mis à jour !
                    </h1>
                    <p className="text-[#6B7280] mb-6">
                        Votre mot de passe a été modifié avec succès.
                    </p>
                    <p className="text-sm text-[#6B7280] mb-8">
                        Vous allez être redirigé vers la page de connexion dans quelques secondes...
                    </p>
                    <Link to={routes.SignIn.path}>
                        <Button className="w-full">
                            Se connecter maintenant
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[#1E1548] mb-2">
                        Nouveau mot de passe
                    </h1>
                    <p className="text-[#6B7280]">
                        Veuillez choisir un nouveau mot de passe sécurisé.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                        label="Nouveau mot de passe"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        icon={<Lock className="w-4 h-4" />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        }
                        required
                    />

                    <FormInput
                        label="Confirmer le mot de passe"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        icon={<Lock className="w-4 h-4" />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="focus:outline-none"
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        }
                        required
                    />

                    {/* Indicateur de force du mot de passe */}
                    {newPassword && (
                        <div className="space-y-2">
                            <div className="flex gap-1">
                                <div className={`h-1 flex-1 rounded-full transition-all ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`} />
                                <div className={`h-1 flex-1 rounded-full transition-all ${/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-200'}`} />
                                <div className={`h-1 flex-1 rounded-full transition-all ${/[0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-200'}`} />
                                <div className={`h-1 flex-1 rounded-full transition-all ${/[^A-Za-z0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-200'}`} />
                            </div>
                            <p className="text-xs text-[#6B7280]">
                                Minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Mise à jour en cours...
                            </div>
                        ) : (
                            'Mettre à jour le mot de passe'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;