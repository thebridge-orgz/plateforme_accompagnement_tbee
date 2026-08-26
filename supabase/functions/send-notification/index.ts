import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
// Temporaire : domaine de test Resend (remplacer par noreply@tbee.fr après vérification DNS)
const FROM_EMAIL = 'TBEE <onboarding@resend.dev>';

interface NotificationPayload {
  type: 'module_completed' | 'new_module' | 'weekly_report' | 'cv_reviewed';
  userId: string;
  data?: Record<string, any>;
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

function templateModuleCompleted(firstName: string, moduleTitle: string): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px">
      <h2 style="color:#1E1548">Félicitations ${firstName} ! 🎉</h2>
      <p>Tu as terminé le module <strong>${moduleTitle}</strong>.</p>
      <p>Continue sur ta lancée — le prochain module t'attend !</p>
      <a href="https://tbee.fr/modules" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#FFD600;color:#1E1548;border-radius:8px;text-decoration:none;font-weight:600">
        Voir mon parcours
      </a>
      <hr style="margin:32px 0;border:none;border-top:1px solid #eee"/>
      <p style="color:#9CA3AF;font-size:12px">TBEE — Plateforme d'accompagnement alternance</p>
    </div>`;
}

function templateNewModule(firstName: string, moduleTitle: string, moduleDesc: string): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px">
      <h2 style="color:#1E1548">Nouveau module disponible !</h2>
      <p>Bonjour ${firstName},</p>
      <p>Un nouveau module vient d'être publié sur TBEE :</p>
      <div style="background:#F3F4F6;border-radius:12px;padding:16px;margin:16px 0">
        <strong style="color:#1E1548">${moduleTitle}</strong>
        <p style="color:#6B7280;margin:8px 0 0">${moduleDesc}</p>
      </div>
      <a href="https://tbee.fr/modules" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#FFD600;color:#1E1548;border-radius:8px;text-decoration:none;font-weight:600">
        Accéder au module
      </a>
      <hr style="margin:32px 0;border:none;border-top:1px solid #eee"/>
      <p style="color:#9CA3AF;font-size:12px">TBEE — Tu reçois cet email car tu as activé les notifications de mises à jour. <a href="https://tbee.fr/profil">Gérer mes préférences</a></p>
    </div>`;
}

function templateWeeklyReport(firstName: string, completedCount: number, totalCount: number, globalProgress: number): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px">
      <h2 style="color:#1E1548">Ton rapport de la semaine 📊</h2>
      <p>Bonjour ${firstName}, voici où tu en es :</p>
      <div style="background:#F3F4F6;border-radius:12px;padding:24px;margin:16px 0;text-align:center">
        <div style="font-size:48px;font-weight:700;color:#1E1548">${globalProgress}%</div>
        <div style="color:#6B7280">de progression globale</div>
        <div style="margin-top:12px;color:#1E1548">${completedCount} / ${totalCount} modules terminés</div>
      </div>
      <a href="https://tbee.fr/modules" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#FFD600;color:#1E1548;border-radius:8px;text-decoration:none;font-weight:600">
        Continuer mon parcours
      </a>
      <hr style="margin:32px 0;border:none;border-top:1px solid #eee"/>
      <p style="color:#9CA3AF;font-size:12px">TBEE — <a href="https://tbee.fr/profil">Gérer mes préférences</a></p>
    </div>`;
}

function templateCvReviewed(firstName: string, status: string, feedback: string): string {
  const statusLabel = status === 'approved' ? '✅ Validé' : status === 'needs_revision' ? '⚠️ À améliorer' : status;
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px">
      <h2 style="color:#1E1548">Ton CV a été analysé !</h2>
      <p>Bonjour ${firstName},</p>
      <p>L'équipe TBEE vient d'analyser ton CV.</p>
      <div style="background:#F3F4F6;border-radius:12px;padding:16px;margin:16px 0">
        <div style="font-weight:600;color:#1E1548">${statusLabel}</div>
        ${feedback ? `<p style="color:#6B7280;margin:8px 0 0">${feedback}</p>` : ''}
      </div>
      <a href="https://tbee.fr/cv" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#FFD600;color:#1E1548;border-radius:8px;text-decoration:none;font-weight:600">
        Voir le retour complet
      </a>
      <hr style="margin:32px 0;border:none;border-top:1px solid #eee"/>
      <p style="color:#9CA3AF;font-size:12px">TBEE — <a href="https://tbee.fr/profil">Gérer mes préférences</a></p>
    </div>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const payload: NotificationPayload = await req.json();
    const { type, userId, data } = payload;

    // Récupérer le profil + préférences de l'utilisateur
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('first_name, email, notification_email, notification_module_updates, notification_progress_reports, notification_tips')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Respecter le switch global "Notifications par email"
    if (!profile.notification_email) {
      return new Response(JSON.stringify({ skipped: 'email notifications disabled' }), { status: 200 });
    }

    const firstName = profile.first_name || 'Étudiant';
    const email = profile.email;

    switch (type) {
      case 'module_completed': {
        await sendEmail(
          email,
          `Module terminé : ${data?.moduleTitle}`,
          templateModuleCompleted(firstName, data?.moduleTitle ?? 'Module')
        );
        break;
      }
      case 'new_module': {
        if (!profile.notification_module_updates) break;
        await sendEmail(
          email,
          `Nouveau module disponible : ${data?.moduleTitle}`,
          templateNewModule(firstName, data?.moduleTitle ?? '', data?.moduleDesc ?? '')
        );
        break;
      }
      case 'weekly_report': {
        if (!profile.notification_progress_reports) break;
        await sendEmail(
          email,
          'Ton rapport de progression hebdomadaire',
          templateWeeklyReport(firstName, data?.completedCount ?? 0, data?.totalCount ?? 0, data?.globalProgress ?? 0)
        );
        break;
      }
      case 'cv_reviewed': {
        await sendEmail(
          email,
          'Ton CV a été analysé par l\'équipe TBEE',
          templateCvReviewed(firstName, data?.status ?? '', data?.feedback ?? '')
        );
        break;
      }
      default:
        return new Response(JSON.stringify({ error: 'Unknown notification type' }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
