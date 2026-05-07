import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import { useAuth } from '../../../hooks/useAuth';
import { routes } from '../../router/routes';

export function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation simple
        if (!email) {
            setError('Veuillez entrer votre adresse email');
            setIsLoading(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Veuillez entrer une adresse email valide');
            setIsLoading(false);
            return;
        }

        try {
            await resetPassword(email);
            setIsSubmitted(true);
        } catch (err: any) {
            console.error('Erreur réinitialisation:', err);
            setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#1E1548] mb-3">
                        Email envoyé !
                    </h1>
                    <p className="text-[#6B7280] mb-6">
                        Nous avons envoyé un lien de réinitialisation à l'adresse :<br />
                        <span className="font-semibold text-[#1E1548]">{email}</span>
                    </p>
                    <p className="text-sm text-[#6B7280] mb-8">
                        Cliquez sur le lien dans l'email pour réinitialiser votre mot de passe.
                        Le lien expirera dans 1 heure.
                    </p>
                    <Link to={routes.SignIn.path}>
                        <Button className="w-full">
                            Retour à la connexion
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
                        Mot de passe oublié ?
                    </h1>
                    <p className="text-[#6B7280]">
                        Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                        label="Adresse email"
                        type="email"
                        placeholder="jean.dupont@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<Mail className="w-4 h-4" />}
                        required
                    />

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
                                Envoi en cours...
                            </div>
                        ) : (
                            'Envoyer le lien de réinitialisation'
                        )}
                    </Button>

                    <div className="text-center">
                        <Link
                            to={routes.SignIn.path}
                            className="text-sm text-black hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour à la connexion
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;