import { supabase } from '../../config/supabaseClient';

export type ProofType = 'quiz_result' | 'exercise_submission' | 'attendance' | 'document';

export interface PedagogicalProof {
  id: string;
  userId: string;
  moduleId: string | null;
  stepId: string | null;
  proofType: ProofType;
  data: Record<string, unknown>;
  validatedBy: string | null;
  validatedAt: string | null;
  createdAt: string;
}

export interface CreateProofPayload {
  userId: string;
  moduleId?: string;
  stepId?: string;
  proofType: ProofType;
  data?: Record<string, unknown>;
}

class ProofsService {
  private mapFromDB(raw: any): PedagogicalProof {
    return {
      id: raw.id,
      userId: raw.user_id,
      moduleId: raw.module_id,
      stepId: raw.step_id,
      proofType: raw.proof_type,
      data: raw.data ?? {},
      validatedBy: raw.validated_by,
      validatedAt: raw.validated_at,
      createdAt: raw.generated_at,
    };
  }

  async createProof(payload: CreateProofPayload): Promise<PedagogicalProof> {
    const { data, error } = await supabase
      .from('pedagogical_proofs')
      .insert({
        user_id: payload.userId,
        module_id: payload.moduleId ?? null,
        step_id: payload.stepId ?? null,
        proof_type: payload.proofType,
        data: payload.data ?? {},
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapFromDB(data);
  }

  async getStudentProofs(userId: string): Promise<PedagogicalProof[]> {
    const { data, error } = await supabase
      .from('pedagogical_proofs')
      .select('*')
      .eq('user_id', userId)
      .order('generated_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(this.mapFromDB.bind(this));
  }

  async getModuleProofs(userId: string, moduleId: string): Promise<PedagogicalProof[]> {
    const { data, error } = await supabase
      .from('pedagogical_proofs')
      .select('*')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .order('generated_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(this.mapFromDB.bind(this));
  }

  async getAllProofs(): Promise<PedagogicalProof[]> {
    const { data, error } = await supabase
      .from('pedagogical_proofs')
      .select('*')
      .order('generated_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(this.mapFromDB.bind(this));
  }

  async validateProof(proofId: string, adminId: string): Promise<PedagogicalProof> {
    const { data, error } = await supabase
      .from('pedagogical_proofs')
      .update({
        validated_by: adminId,
        validated_at: new Date().toISOString(),
      })
      .eq('id', proofId)
      .select()
      .single();

    if (error) throw error;
    return this.mapFromDB(data);
  }

  async getPendingProofsCount(): Promise<number> {
    const { count, error } = await supabase
      .from('pedagogical_proofs')
      .select('*', { count: 'exact', head: true })
      .is('validated_at', null);

    if (error) throw error;
    return count ?? 0;
  }

  async hasProofForStep(userId: string, moduleId: string, stepId: string): Promise<boolean> {
    const { count, error } = await supabase
      .from('pedagogical_proofs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .eq('step_id', stepId);

    if (error) return false;
    return (count ?? 0) > 0;
  }
}

export const proofsService = new ProofsService();
