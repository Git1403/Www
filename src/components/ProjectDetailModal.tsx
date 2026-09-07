import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import { X, AlertTriangle, Building2, Calendar, Target, CheckCircle2, Copy, Check } from 'lucide-react';

interface Props {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<Props> = ({ project, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopy = () => {
    const text = `ردیف: ${project.id}
معاونت: ${project.depName}
عنوان اقدام: ${project.projectTitle}
وضعیت: ${project.status} (پیشرفت: ${project.progress})
شرح مانع: ${project.obstacleDesc}
جنس مانع: ${project.obstacleNature}
نهاد مرتبط: ${project.obstacleEntity}
تاثیر مانع: ${project.obstacleImpact}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isStopped = project.status === 'متوقف';
  const hasObstacle = project.obstacleNature !== 'ندارد';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between bg-white sticky top-0 z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-600">
                ردیف {project.id} در اکسل
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                {project.depName}
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${
                isStopped 
                  ? 'bg-rose-50 text-rose-600' 
                  : 'bg-blue-50 text-blue-600'
              }`}>
                وضعیت: {project.status}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-0.5">
              {project.projectTitle}
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              title="کپی خلاصه اطلاعات"
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 leading-relaxed">
          {/* Progress & Deadline Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">درصد پیشرفت فیزیکی</span>
              <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">{project.progress}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">موعد تحویل قطعی</span>
              <span className="text-xs font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {project.deliveryDeadline}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">بهره‌بردار</span>
              <span className="text-xs font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {project.beneficiary}
              </span>
            </div>
          </div>

          {/* Action Description */}
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">شرح اقدام در حال اجرا</h4>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 whitespace-pre-line leading-relaxed">
              {project.currentActionDesc}
            </div>
          </div>

          {/* Upstream Requirement */}
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">الزام بالادستی / نیازمندی درون‌سازمانی</h4>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 leading-relaxed">
              {project.upstreamRequirement}
            </div>
          </div>

          {/* Deliverable & Desired State & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">خروجی مصوب</h4>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 leading-relaxed">
                {project.deliverable}
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">وضعیت مطلوب پس از اجرا</h4>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 leading-relaxed">
                {project.desiredState}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">منافع سازمانی یا آثار</h4>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 whitespace-pre-line leading-relaxed">
              {project.organizationalBenefits}
            </div>
          </div>

          {/* OBSTACLES SECTION */}
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${hasObstacle ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                {hasObstacle ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                گزارش موانع، گلوگاه‌ها و نهادهای ذی‌ربط
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50">
                <span className="text-[11px] text-slate-400 block font-medium">جنس مانع</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {project.obstacleNature || '—'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50">
                <span className="text-[11px] text-slate-400 block font-medium">نهاد مرتبط موانع</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {project.obstacleEntity || '—'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50">
                <span className="text-[11px] text-slate-400 block font-medium">وضعیت مانع</span>
                <span className={`inline-flex items-center gap-1 font-semibold mt-0.5 ${hasObstacle ? 'text-amber-700' : 'text-emerald-700'}`}>
                  {hasObstacle ? 'دارای مانع اجرایی' : 'فاقد مانع ثبت شده'}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">شرح دقیق مانع و گلوگاه</span>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-900 whitespace-pre-line leading-relaxed">
                {project.obstacleDesc || 'موردی ثبت نشده است.'}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">تاثیر مانع بر اقدام / پروژه</span>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700 whitespace-pre-line leading-relaxed">
                {project.obstacleImpact ? project.obstacleImpact : 'تاثیر خاصی در ستون مربوطه ثبت نشده است.'}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium transition-colors"
          >
            بستن پنجره
          </button>
        </div>
      </div>
    </div>
  );
};
