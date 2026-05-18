import React, { useState, useCallback } from 'react';
import {
  ArrowLeft, FileText, Plus, X, Pencil, Trash2,
  Calendar, Target, CheckSquare, Play, Upload,
  FileImage, ClipboardList, ChevronDown, ChevronUp, Loader2, Link2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';
import { useAdminData } from '../../hooks/useAdminData';
import { moduleService } from '../../services/supabase/module.service';
import {
  Module, ModuleResource, ResourceType,
  QuizQuestion, QuizOption, FormField,
} from '../../types/index';

// ── Utilities ──────────────────────────────────────────────────────────────────

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function toVideoEmbed(url: string): string {
  try {
    const u = new URL(url);
    // YouTube
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
    } else if (u.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    // Vimeo
    if (u.hostname.includes('vimeo.com')) {
      // Formats : vimeo.com/123456789  ou  vimeo.com/channels/xxx/123456789
      const segments = u.pathname.split('/').filter(Boolean);
      const videoId = segments[segments.length - 1];
      if (videoId && /^\d+$/.test(videoId)) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }
  } catch { /* keep as-is */ }
  return url;
}

const RESOURCE_TYPES: { type: ResourceType; label: string; icon: React.ReactNode }[] = [
  { type: 'pdf',   label: 'Document PDF', icon: <FileText      className="w-4 h-4" /> },
  { type: 'image', label: 'Image',        icon: <FileImage     className="w-4 h-4" /> },
  { type: 'video', label: 'Vidéo',        icon: <Play          className="w-4 h-4" /> },
  { type: 'link',  label: 'Lien externe', icon: <Link2         className="w-4 h-4" /> },
  { type: 'form',  label: 'Formulaire',   icon: <ClipboardList className="w-4 h-4" /> },
  { type: 'quiz',  label: 'Quiz QCM',     icon: <CheckSquare   className="w-4 h-4" /> },
];

const RESOURCE_EMOJI: Record<ResourceType, string> = {
  pdf: '📄', image: '🖼️', video: '🎥', link: '🔗', form: '📝', quiz: '✅',
};

// ── Shared styles (constants — not components) ─────────────────────────────────

const S = {
  input:    'w-full h-11 px-4 border-2 border-[rgba(30,21,72,0.10)] rounded-[10px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD600] transition-colors bg-white',
  textarea: 'w-full px-4 py-3 border-2 border-[rgba(30,21,72,0.10)] rounded-[10px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD600] transition-colors resize-y bg-white',
  label:    'block text-[13px] font-semibold text-[#1E1548] mb-1.5',
  smInput:  'h-8 px-3 border border-[rgba(30,21,72,0.12)] rounded-[6px] text-[13px] text-[#1E1548] bg-white focus:outline-none focus:border-[#FFD600]',
};

// ── Types ──────────────────────────────────────────────────────────────────────

type ModuleInfoForm = {
  title: string;
  description: string;
  weekNumber: number;
  orderIndex: number;
  isPublished: boolean;
};

const EMPTY_INFO: ModuleInfoForm = {
  title: '', description: '', weekNumber: 1, orderIndex: 1, isPublished: false,
};

// ── InfoTab — defined OUTSIDE to keep stable identity ─────────────────────────

interface InfoTabProps {
  form: ModuleInfoForm;
  onChange: (field: keyof ModuleInfoForm, value: string | number | boolean) => void;
}

function InfoTab({ form, onChange }: InfoTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className={S.label}>Nom du module <span className="text-red-500">*</span></label>
        <input
          className={S.input}
          placeholder="Ex : Rédiger son CV"
          value={form.title}
          onChange={e => onChange('title', e.target.value)}
        />
      </div>

      <div>
        <label className={S.label}>Description <span className="text-red-500">*</span></label>
        <textarea
          className={S.textarea}
          rows={3}
          placeholder="Objectifs et contenu du module…"
          value={form.description}
          onChange={e => onChange('description', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={S.label}>Semaine</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
            <select
              className={S.input + ' pl-10 appearance-none cursor-pointer'}
              value={form.weekNumber}
              onChange={e => onChange('weekNumber', parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map(w => (
                <option key={w} value={w}>Semaine {w}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
        <div>
          <label className={S.label}>Position dans la semaine</label>
          <input
            type="number"
            min={1}
            className={S.input}
            value={form.orderIndex}
            onChange={e => onChange('orderIndex', parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      <div>
        <label className={S.label}>Statut de publication</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onChange('isPublished', false)}
            className={`flex-1 h-11 rounded-[10px] text-[14px] font-semibold border-2 transition-all ${
              !form.isPublished
                ? 'border-[#B45309] bg-[#FFF4CC] text-[#B45309]'
                : 'border-[rgba(30,21,72,0.08)] bg-white text-[#6B7280] hover:border-[#B45309]/40'
            }`}
          >
            📝 Brouillon
          </button>
          <button
            type="button"
            onClick={() => onChange('isPublished', true)}
            className={`flex-1 h-11 rounded-[10px] text-[14px] font-semibold border-2 transition-all ${
              form.isPublished
                ? 'border-[#10B981] bg-[#F0FDF4] text-[#10B981]'
                : 'border-[rgba(30,21,72,0.08)] bg-white text-[#6B7280] hover:border-[#10B981]/40'
            }`}
          >
            ✅ Publié
          </button>
        </div>
        <p className="text-[12px] text-[#6B7280] mt-1">Les brouillons ne sont pas visibles par les étudiants.</p>
      </div>
    </div>
  );
}

// ── FileDropZone — defined OUTSIDE ────────────────────────────────────────────

interface FileDropZoneProps {
  accept: string;
  hint: string;
  fileName?: string;
  uploading: boolean;
  onFile: (file: File) => void;
  onClear: () => void;
}

function FileDropZone({ accept, hint, fileName, uploading, onFile, onClear }: FileDropZoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  if (uploading) {
    return (
      <div className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-[rgba(30,21,72,0.15)] rounded-[10px] gap-2">
        <Loader2 className="w-6 h-6 text-[#FFD600] animate-spin" />
        <span className="text-[13px] text-[#6B7280]">Téléversement en cours…</span>
      </div>
    );
  }

  if (fileName) {
    return (
      <div className="flex items-center justify-between gap-3 p-3 bg-[#F0FDF4] border border-[#10B981]/30 rounded-[10px]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[#10B981]">✅</span>
          <span className="text-[14px] font-medium text-[#1E1548] truncate">{fileName}</span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-[12px] text-[#6B7280] hover:text-red-500 whitespace-nowrap flex-shrink-0"
        >
          Changer
        </button>
      </div>
    );
  }

  return (
    <label
      className={`relative flex flex-col items-center justify-center h-28 border-2 border-dashed rounded-[10px] cursor-pointer transition-all ${
        dragging
          ? 'border-[#FFD600] bg-[#FFFDF0]'
          : 'border-[rgba(30,21,72,0.15)] hover:border-[#FFD600]/60 hover:bg-[#FFFDF0]/50'
      }`}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        className="sr-only"
        onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ''; }}
      />
      <Upload className="w-7 h-7 text-[#6B7280] mb-1.5" />
      <span className="text-[13px] font-medium text-[#1E1548]">Glisser-déposer ou cliquer pour parcourir</span>
      <span className="text-[12px] text-[#9CA3AF] mt-0.5">{hint}</span>
    </label>
  );
}

// ── AddResourcePanel — defined OUTSIDE, owns its own state ────────────────────

interface AddResourcePanelProps {
  onAdd: (resource: ModuleResource) => void;
  onCancel: () => void;
  onFileUpload: (file: File) => Promise<string>;
  uploading: boolean;
  initialResource?: ModuleResource;
}

function AddResourcePanel({ onAdd, onCancel, onFileUpload, uploading, initialResource }: AddResourcePanelProps) {
  const isEditing = !!initialResource;
  const [type, setType]               = useState<ResourceType>(initialResource?.type ?? 'pdf');
  const [title, setTitle]             = useState(initialResource?.title ?? '');
  const [url, setUrl]                 = useState(initialResource?.url ?? '');
  const [uploadedName, setUploadedName] = useState('');
  const [formFields, setFormFields]   = useState<FormField[]>(initialResource?.formFields ?? []);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(initialResource?.quizQuestions ?? []);

  const reset = () => {
    setTitle('');
    setUrl('');
    setUploadedName('');
    setFormFields([]);
    setQuizQuestions([]);
  };

  const handleTypeChange = (t: ResourceType) => {
    setType(t);
    reset();
  };

  const handleFile = async (file: File) => {
    try {
      const publicUrl = await onFileUpload(file);
      setUrl(publicUrl);
      setUploadedName(file.name);
    } catch {
      alert('Erreur lors du téléversement du fichier. Vérifiez que le bucket "module-resources" existe dans Supabase.');
    }
  };

  const handleAdd = () => {
    if (!title.trim()) return;
    const resource: ModuleResource = {
      id: initialResource?.id ?? uid(),
      type,
      title: title.trim(),
      ...(type === 'pdf' || type === 'image' || type === 'link'
        ? { url }
        : type === 'video'
        ? { url: toVideoEmbed(url) }
        : type === 'form'
        ? { formFields }
        : { quizQuestions }),
    };
    onAdd(resource);
    if (!isEditing) { reset(); setType('pdf'); }
  };

  // ── Quiz helpers (local state) ─────────────────────────────────────────────
  const addQuestion = () =>
    setQuizQuestions(prev => [...prev, {
      id: uid(), question: '',
      options: [
        { id: uid(), text: '', isCorrect: false },
        { id: uid(), text: '', isCorrect: false },
      ],
    }]);

  const removeQuestion = (qId: string) =>
    setQuizQuestions(prev => prev.filter(q => q.id !== qId));

  const updateQuestion = (qId: string, text: string) =>
    setQuizQuestions(prev => prev.map(q => q.id === qId ? { ...q, question: text } : q));

  const addOption = (qId: string) =>
    setQuizQuestions(prev => prev.map(q =>
      q.id === qId ? { ...q, options: [...q.options, { id: uid(), text: '', isCorrect: false }] } : q
    ));

  const removeOption = (qId: string, oId: string) =>
    setQuizQuestions(prev => prev.map(q =>
      q.id === qId ? { ...q, options: q.options.filter(o => o.id !== oId) } : q
    ));

  const updateOption = (qId: string, oId: string, field: keyof QuizOption, value: string | boolean) =>
    setQuizQuestions(prev => prev.map(q =>
      q.id === qId
        ? { ...q, options: q.options.map(o => o.id === oId ? { ...o, [field]: value } : o) }
        : q
    ));

  // ── Form field helpers (local state) ──────────────────────────────────────
  const addField = () =>
    setFormFields(prev => [...prev, { id: uid(), label: '', type: 'text', required: false }]);

  const removeField = (fId: string) =>
    setFormFields(prev => prev.filter(f => f.id !== fId));

  const updateField = (fId: string, updates: Partial<FormField>) =>
    setFormFields(prev => prev.map(f => f.id === fId ? { ...f, ...updates } : f));

  const addFieldOption = (fId: string) =>
    setFormFields(prev => prev.map(f =>
      f.id === fId ? { ...f, options: [...(f.options ?? []), ''] } : f
    ));

  const updateFieldOption = (fId: string, idx: number, val: string) =>
    setFormFields(prev => prev.map(f =>
      f.id === fId
        ? { ...f, options: (f.options ?? []).map((o, i) => i === idx ? val : o) }
        : f
    ));

  return (
    <div className="border-2 border-[#FFD600]/50 rounded-[12px] p-4 space-y-4 bg-[#FFFDF0]">
      {/* Type selector */}
      <div>
        <p className={S.label}>Type de ressource</p>
        <div className="flex flex-wrap gap-2">
          {RESOURCE_TYPES.map(rt => (
            <button
              key={rt.type}
              type="button"
              onClick={() => handleTypeChange(rt.type)}
              className={`flex items-center gap-1.5 h-9 px-3 rounded-[8px] text-[13px] font-medium border-2 transition-all ${
                type === rt.type
                  ? 'border-[#FFD600] bg-[#FFF4CC] text-[#1E1548]'
                  : 'border-[rgba(30,21,72,0.08)] bg-white text-[#6B7280] hover:border-[#FFD600]/60'
              }`}
            >
              {rt.icon} {rt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className={S.label}>Titre <span className="text-red-500">*</span></label>
        <input
          className={S.input}
          placeholder="Titre de la ressource"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      {/* PDF */}
      {type === 'pdf' && (
        <div>
          <label className={S.label}>Fichier PDF</label>
          <FileDropZone
            accept=".pdf"
            hint="PDF jusqu'à 20 Mo"
            fileName={uploadedName}
            uploading={uploading}
            onFile={handleFile}
            onClear={() => { setUrl(''); setUploadedName(''); }}
          />
        </div>
      )}

      {/* Image */}
      {type === 'image' && (
        <div>
          <label className={S.label}>Fichier image</label>
          <FileDropZone
            accept="image/*"
            hint="JPG, PNG, GIF, WebP…"
            fileName={uploadedName}
            uploading={uploading}
            onFile={handleFile}
            onClear={() => { setUrl(''); setUploadedName(''); }}
          />
        </div>
      )}

      {/* Video */}
      {type === 'video' && (
        <div>
          <label className={S.label}>URL de la vidéo</label>
          <input
            className={S.input}
            placeholder="https://vimeo.com/123456789  ou  https://www.youtube.com/watch?v=…"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <p className="text-[12px] text-[#6B7280] mt-1">
            Vimeo et YouTube sont automatiquement convertis en lecteur intégré.
          </p>
        </div>
      )}

      {/* Link */}
      {type === 'link' && (
        <div>
          <label className={S.label}>URL du lien</label>
          <input
            className={S.input}
            placeholder="https://www.linkedin.com/in/…  ou  https://monportfolio.fr"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <p className="text-[12px] text-[#6B7280] mt-1">
            Portfolio, LinkedIn, GitHub, site web…
          </p>
        </div>
      )}

      {/* Form builder */}
      {type === 'form' && (
        <div className="space-y-3">
          <p className={S.label}>Champs du formulaire</p>
          {formFields.map((field, fi) => (
            <div key={field.id} className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[10px] p-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-[#9CA3AF] w-5 flex-shrink-0">{fi + 1}.</span>
                <input
                  className={S.input + ' flex-1'}
                  placeholder="Label du champ"
                  value={field.label}
                  onChange={e => updateField(field.id, { label: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => removeField(field.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-red-400 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3 pl-7">
                <select
                  className={S.smInput}
                  value={field.type}
                  onChange={e => updateField(field.id, { type: e.target.value as FormField['type'], options: [] })}
                >
                  <option value="text">Texte court</option>
                  <option value="textarea">Texte long</option>
                  <option value="radio">Choix unique</option>
                  <option value="checkbox">Choix multiple</option>
                </select>
                <label className="flex items-center gap-1.5 text-[13px] text-[#6B7280] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={e => updateField(field.id, { required: e.target.checked })}
                    className="accent-[#FFD600]"
                  />
                  Obligatoire
                </label>
              </div>
              {(field.type === 'radio' || field.type === 'checkbox') && (
                <div className="pl-7 space-y-1.5">
                  {(field.options ?? []).map((opt, oi) => (
                    <input
                      key={oi}
                      className={S.smInput + ' w-full'}
                      placeholder={`Option ${oi + 1}`}
                      value={opt}
                      onChange={e => updateFieldOption(field.id, oi, e.target.value)}
                    />
                  ))}
                  <button type="button" onClick={() => addFieldOption(field.id)}
                    className="text-[12px] text-[#1E1548] font-medium hover:underline">
                    + Ajouter une option
                  </button>
                </div>
              )}
            </div>
          ))}
          <button type="button" onClick={addField}
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#1E1548] hover:underline">
            <Plus className="w-4 h-4" /> Ajouter un champ
          </button>
        </div>
      )}

      {/* Quiz builder */}
      {type === 'quiz' && (
        <div className="space-y-3">
          <p className={S.label}>Questions</p>
          {quizQuestions.map((q, qi) => (
            <div key={q.id} className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[10px] p-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-[#9CA3AF] w-5 flex-shrink-0">{qi + 1}.</span>
                <input
                  className={S.input + ' flex-1'}
                  placeholder="Intitulé de la question"
                  value={q.question}
                  onChange={e => updateQuestion(q.id, e.target.value)}
                />
                <button type="button" onClick={() => removeQuestion(q.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-red-400 flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="pl-7 space-y-1.5">
                {q.options.map(opt => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={opt.isCorrect}
                      onChange={e => updateOption(q.id, opt.id, 'isCorrect', e.target.checked)}
                      className="accent-[#10B981] w-4 h-4 flex-shrink-0"
                      title="Bonne réponse"
                    />
                    <input
                      className={S.smInput + ' flex-1'}
                      placeholder="Réponse…"
                      value={opt.text}
                      onChange={e => updateOption(q.id, opt.id, 'text', e.target.value)}
                    />
                    {q.options.length > 2 && (
                      <button type="button" onClick={() => removeOption(q.id, opt.id)}
                        className="w-6 h-6 flex items-center justify-center text-red-400 hover:bg-red-50 rounded flex-shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-3 mt-1">
                  <button type="button" onClick={() => addOption(q.id)}
                    className="text-[12px] text-[#1E1548] font-medium hover:underline">
                    + Option
                  </button>
                  <span className="text-[11px] text-[#9CA3AF]">☑ = bonne réponse</span>
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addQuestion}
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#1E1548] hover:underline">
            <Plus className="w-4 h-4" /> Ajouter une question
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 justify-end pt-1 border-t border-[rgba(30,21,72,0.06)]">
        <button
          type="button"
          onClick={onCancel}
          className="h-9 px-4 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-[8px] text-[13px] font-semibold hover:bg-[#F8F9FD] transition-colors"
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!title.trim()}
          className="h-9 px-4 bg-[#FFD600] text-[#1E1548] rounded-[8px] text-[13px] font-semibold hover:bg-[#FDC700] transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEditing ? <><Pencil className="w-4 h-4" /> Modifier</> : <><Plus className="w-4 h-4" /> Ajouter</>}
        </button>
      </div>
    </div>
  );
}

// ── ResourcesTab — defined OUTSIDE ────────────────────────────────────────────

interface ResourcesTabProps {
  resources: ModuleResource[];
  uploading: boolean;
  onRemove: (id: string) => void;
  onAddResource: (resource: ModuleResource) => void;
  onUpdateResource: (id: string, resource: ModuleResource) => void;
  onMoveResource: (id: string, direction: 'up' | 'down') => void;
  onFileUpload: (file: File) => Promise<string>;
}

function ResourcesTab({
  resources, uploading,
  onRemove, onAddResource, onUpdateResource, onMoveResource, onFileUpload,
}: ResourcesTabProps) {
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);

  const openEdit = (id: string) => { setEditingResourceId(id); setShowAddPanel(false); };
  const closeEdit = () => setEditingResourceId(null);
  const toggleAdd = () => { setShowAddPanel(prev => !prev); setEditingResourceId(null); };

  return (
    <div className="space-y-3">
      {resources.length === 0 && !showAddPanel && !editingResourceId && (
        <div className="text-center py-8 text-[#6B7280]">
          <div className="text-4xl mb-2 opacity-30">📦</div>
          <p className="text-[14px]">Aucune ressource pour ce module.</p>
          <p className="text-[13px] text-[#9CA3AF] mt-1">Ajoutez des documents, vidéos ou quiz.</p>
        </div>
      )}

      {resources.map((r, index) =>
        editingResourceId === r.id ? (
          <AddResourcePanel
            key={r.id}
            initialResource={r}
            onAdd={updated => { onUpdateResource(r.id, updated); closeEdit(); }}
            onCancel={closeEdit}
            onFileUpload={onFileUpload}
            uploading={uploading}
          />
        ) : (
          <div
            key={r.id}
            className="flex items-center justify-between gap-3 p-3 bg-[#F8F9FD] border border-[rgba(30,21,72,0.08)] rounded-[10px]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl flex-shrink-0">{RESOURCE_EMOJI[r.type]}</span>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#1E1548] truncate">{r.title}</p>
                <p className="text-[12px] text-[#6B7280]">
                  {RESOURCE_TYPES.find(rt => rt.type === r.type)?.label}
                  {r.type === 'quiz' && r.quizQuestions ? ` · ${r.quizQuestions.length} question(s)` : ''}
                  {r.type === 'form' && r.formFields ? ` · ${r.formFields.length} champ(s)` : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => onMoveResource(r.id, 'up')}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0F0F8] text-[#6B7280]"
                  title="Monter"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              )}
              {index < resources.length - 1 && (
                <button
                  type="button"
                  onClick={() => onMoveResource(r.id, 'down')}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0F0F8] text-[#6B7280]"
                  title="Descendre"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => openEdit(r.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E8ECFF] text-[#1E1548]"
                title="Modifier"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onRemove(r.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-red-400"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      )}

      {!editingResourceId && (showAddPanel ? (
        <AddResourcePanel
          onAdd={resource => { onAddResource(resource); setShowAddPanel(false); }}
          onCancel={toggleAdd}
          onFileUpload={onFileUpload}
          uploading={uploading}
        />
      ) : (
        <button
          type="button"
          onClick={toggleAdd}
          className="w-full h-11 border-2 border-dashed border-[rgba(30,21,72,0.15)] rounded-[10px] text-[14px] font-medium text-[#6B7280] hover:border-[#FFD600] hover:text-[#1E1548] transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Ajouter une ressource
        </button>
      ))}
    </div>
  );
}

// ── ModuleCard — defined OUTSIDE ───────────────────────────────────────────────

interface ModuleCardProps {
  module: Module;
  onEdit: (module: Module) => void;
  onTogglePublish: (module: Module) => void;
  onDelete: (module: Module) => void;
}

function ModuleCard({ module, onEdit, onTogglePublish, onDelete }: ModuleCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)] hover:shadow-[0_4px_12px_rgba(30,21,72,0.08)] transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <FileText className="w-5 h-5 text-[#FFD600] flex-shrink-0" />
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548]">{module.title}</h3>
            <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-semibold ${
              module.isPublished
                ? 'bg-[#F0FDF4] text-[#10B981]'
                : 'bg-[#FFF4CC] text-[#B45309]'
            }`}>
              {module.isPublished ? 'Publié' : 'Brouillon'}
            </span>
          </div>

          {module.description && (
            <p className="text-[14px] text-[#6B7280] mb-3 leading-relaxed">{module.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-[13px] text-[#6B7280]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Semaine {module.weekNumber}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>Position {module.orderIndex}</span>
            </div>
            {Array.isArray(module.resources) && module.resources.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span>📦</span>
                <span>{module.resources.length} ressource{module.resources.length > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          {confirmDelete ? (
            <>
              <span className="text-[13px] text-red-500 font-medium">Supprimer définitivement ?</span>
              <button
                onClick={() => setConfirmDelete(false)}
                className="h-9 px-3 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-[8px] text-[13px] font-semibold hover:bg-[#F8F9FD] transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => onDelete(module)}
                className="h-9 px-3 bg-red-500 text-white rounded-[8px] text-[13px] font-semibold hover:bg-red-600 transition-colors"
              >
                Confirmer
              </button>
            </>
          ) : (
            <>
              {module.isPublished ? (
                <button
                  onClick={() => onTogglePublish(module)}
                  className="h-9 px-4 bg-white border-2 border-[rgba(30,21,72,0.12)] text-[#6B7280] rounded-[8px] text-[13px] font-semibold hover:border-[#B45309] hover:text-[#B45309] hover:bg-[#FFF4CC] transition-all"
                >
                  Mettre en brouillon
                </button>
              ) : (
                <button
                  onClick={() => onTogglePublish(module)}
                  className="h-9 px-4 bg-[#F0FDF4] border-2 border-[#10B981] text-[#10B981] rounded-[8px] text-[13px] font-semibold hover:bg-[#DCFCE7] transition-all"
                >
                  Publier
                </button>
              )}
              <button
                onClick={() => onEdit(module)}
                className="h-9 px-4 bg-[#1E1548] text-white rounded-[8px] text-[13px] font-semibold hover:bg-[#2D2166] transition-colors flex items-center gap-1.5"
              >
                <Pencil className="w-3.5 h-3.5" /> Modifier
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="h-9 w-9 flex items-center justify-center bg-white border-2 border-[rgba(30,21,72,0.12)] text-[#6B7280] rounded-[8px] hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Supprimer le module"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── AdminModulesPage ───────────────────────────────────────────────────────────

export function AdminModulesPage() {
  const { modules, loading, createModule, updateModule, togglePublish, deleteModule } = useAdminData();

  // Modal state
  const [activeModal, setActiveModal] = useState<'create' | 'edit' | null>(null);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'infos' | 'resources'>('infos');

  // Form state (shared between create and edit)
  const [formInfo, setFormInfo] = useState<ModuleInfoForm>(EMPTY_INFO);
  const [resources, setResources] = useState<ModuleResource[]>([]);

  // UI
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // ── Open/close ─────────────────────────────────────────────────────────────

  const openCreate = useCallback(() => {
    setFormInfo(EMPTY_INFO);
    setResources([]);
    setActiveTab('infos');
    setEditingModuleId(null);
    setFormError(null);
    setActiveModal('create');
  }, []);

  const openEdit = useCallback((mod: Module) => {
    setFormInfo({
      title: mod.title,
      description: mod.description ?? '',
      weekNumber: mod.weekNumber,
      orderIndex: mod.orderIndex,
      isPublished: mod.isPublished,
    });
    setResources(Array.isArray(mod.resources) ? (mod.resources as ModuleResource[]) : []);
    setActiveTab('infos');
    setEditingModuleId(mod.id);
    setFormError(null);
    setActiveModal('edit');
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setEditingModuleId(null);
    setFormError(null);
  }, []);

  // ── Info field change ──────────────────────────────────────────────────────

  const handleInfoChange = useCallback((
    field: keyof ModuleInfoForm,
    value: string | number | boolean,
  ) => {
    setFormInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  // ── Resource actions ───────────────────────────────────────────────────────

  const handleAddResource = useCallback((resource: ModuleResource) => {
    setResources(prev => [...prev, resource]);
  }, []);

  const handleRemoveResource = useCallback((id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  }, []);

  const handleUpdateResource = useCallback((id: string, resource: ModuleResource) => {
    setResources(prev => prev.map(r => r.id === id ? resource : r));
  }, []);

  const handleMoveResource = useCallback((id: string, direction: 'up' | 'down') => {
    setResources(prev => {
      const index = prev.findIndex(r => r.id === id);
      if (index === -1) return prev;
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  }, []);

  const handleDeleteModule = useCallback(async (mod: Module) => {
    await deleteModule(mod.id);
  }, [deleteModule]);

  // ── File upload ────────────────────────────────────────────────────────────

  const handleFileUpload = useCallback(async (file: File): Promise<string> => {
    setUploading(true);
    try {
      return await moduleService.uploadModuleResource(file);
    } finally {
      setUploading(false);
    }
  }, []);

  // ── Save ───────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!formInfo.title.trim() || !formInfo.description.trim()) {
      setFormError('Le nom et la description sont obligatoires.');
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      if (activeModal === 'create') {
        await createModule({
          ...formInfo,
          resources: resources.length > 0 ? resources : undefined,
        });
      } else if (editingModuleId) {
        await updateModule(editingModuleId, {
          ...formInfo,
          resources: resources.length > 0 ? resources : null,
        });
      }
      closeModal();
    } catch {
      setFormError('Erreur lors de la sauvegarde. Veuillez réessayer.');
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle publish ─────────────────────────────────────────────────────────

  const handleTogglePublish = useCallback(async (mod: Module) => {
    await togglePublish(mod.id, !mod.isPublished);
  }, [togglePublish]);

  // ── Modal header title ─────────────────────────────────────────────────────

  const modalTitle = activeModal === 'create'
    ? 'Créer un nouveau module'
    : `Modifier : ${formInfo.title || '…'}`;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <Link to={routes.AdminDashboard.path}>
              <button
                className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Retour"
              >
                <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
              </button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1">
                Gestion des modules
              </h1>
              <p className="text-[14px] sm:text-[16px] text-[#6B7280]">
                Créez et gérez les modules de formation TBEE
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8">
        {/* Create button */}
        <div className="mb-6">
          <button
            onClick={openCreate}
            className="h-10 px-5 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Créer un nouveau module
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#FFD600] animate-spin" />
          </div>
        )}

        {/* Module list */}
        {!loading && (
          <div className="space-y-4">
            {modules.map(mod => (
              <ModuleCard
                key={mod.id}
                module={mod}
                onEdit={openEdit}
                onTogglePublish={handleTogglePublish}
                onDelete={handleDeleteModule}
              />
            ))}

            {modules.length === 0 && (
              <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-12 text-center">
                <FileText className="w-14 h-14 text-[#E8ECFF] mx-auto mb-4" />
                <h3 className="text-[18px] font-bold text-[#1E1548] mb-2">Aucun module pour le moment</h3>
                <p className="text-[14px] text-[#6B7280] mb-6">Commencez par créer votre premier module de formation</p>
                <button
                  onClick={openCreate}
                  className="h-10 px-5 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-colors flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" /> Créer un module
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Create / Edit modal ───────────────────────────────────────────────── */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center p-4 py-8">
            <div className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(30,21,72,0.14)] w-full max-w-[740px]">

              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(30,21,72,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFD600] flex items-center justify-center flex-shrink-0">
                    {activeModal === 'create'
                      ? <Plus className="w-5 h-5 text-[#1E1548]" />
                      : <Pencil className="w-4 h-4 text-[#1E1548]" />}
                  </div>
                  <h2 className="text-[17px] sm:text-[20px] font-bold text-[#1E1548] truncate max-w-[380px]">
                    {modalTitle}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-[#1E1548]" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[rgba(30,21,72,0.08)]">
                {(['infos', 'resources'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-[14px] font-semibold border-b-2 transition-all ${
                      activeTab === tab
                        ? 'border-[#FFD600] text-[#1E1548]'
                        : 'border-transparent text-[#6B7280] hover:text-[#1E1548]'
                    }`}
                  >
                    {tab === 'infos' ? 'Informations' : (
                      <>
                        Ressources
                        {resources.length > 0 && (
                          <span className="ml-1.5 bg-[#FFD600] text-[#1E1548] text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                            {resources.length}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-6">
                {activeTab === 'infos' ? (
                  <InfoTab form={formInfo} onChange={handleInfoChange} />
                ) : (
                  <ResourcesTab
                    resources={resources}
                    uploading={uploading}
                    onRemove={handleRemoveResource}
                    onAddResource={handleAddResource}
                    onUpdateResource={handleUpdateResource}
                    onMoveResource={handleMoveResource}
                    onFileUpload={handleFileUpload}
                  />
                )}
              </div>

              {/* Error */}
              {formError && (
                <div className="mx-6 mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-[8px] text-[13px] text-red-600">
                  {formError}
                </div>
              )}

              {/* Footer */}
              <div className="flex gap-3 justify-end px-6 py-4 border-t border-[rgba(30,21,72,0.08)]">
                <button
                  onClick={closeModal}
                  className="h-10 px-5 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-[10px] text-[14px] font-semibold hover:bg-[#F8F9FD] transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="h-10 px-5 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement…</>
                    : activeModal === 'create' ? <><Plus className="w-4 h-4" /> Créer le module</> : 'Enregistrer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
