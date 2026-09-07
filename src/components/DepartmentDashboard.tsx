import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  PauseCircle, 
  PlayCircle, 
  Calendar, 
  ChevronLeft, 
  Eye, 
  Sparkles,
  Layers
} from 'lucide-react';

interface Props {
  projects: ProjectItem[];
  selectedDepartment: string;
  onSelectDepartment: (dep: string) => void;
  onSelectProject: (p: ProjectItem) => void;
}

export const DepartmentDashboard: React.FC<Props> = ({
  projects,
  selectedDepartment,
  onSelectDepartment,
  onSelectProject
}) => {
  // Unique departments in exact naming
  const departments = Array.from(new Set(projects.map(p => p.depName)));

  const currentDepartment = selectedDepartment || departments[0];
  const depProjects = projects.filter(p => p.depName === currentDepartment);

  const stoppedCount = depProjects.filter(p => p.status === 'متوقف').length;
  const runningCount = depProjects.filter(p => p.status !== 'متوقف').length;
  const withObstacleCount = depProjects.filter(p => p.obstacleNature !== 'ندارد').length;

  return (
    <div className="space-y-6">
      {/* Department Selection Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-1 text-xs font-medium text-slate-500">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>معاونت‌های سازمانی:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {departments.map((dep) => {
              const count = projects.filter(p => p.depName === dep).length;
              const isActive = dep === currentDepartment;

              return (
                <button
                  key={dep}
                  onClick={() => onSelectDepartment(dep)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{dep}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count} اقدام
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Department Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
              معاونت تخصصی
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {currentDepartment}
            </h2>
            <p className="text-xs text-slate-500">
              گزارش پایش پیشبرد اقدامات، وضعیت تحقق و گلوگاه‌های اجرایی این حوزه
            </p>
          </div>

          {/* Quick Metrics for this Department */}
          <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center min-w-[110px]">
              <div className="text-xs text-slate-500 font-medium">کل اقدامات</div>
              <div className="text-2xl font-bold text-slate-900 font-mono mt-1">{depProjects.length}</div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center min-w-[110px]">
              <div className="text-xs text-slate-500 font-medium">در حال اجرا</div>
              <div className="text-2xl font-bold text-emerald-600 font-mono mt-1">{runningCount}</div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center min-w-[110px]">
              <div className="text-xs text-slate-500 font-medium">متوقف شده</div>
              <div className={`text-2xl font-bold font-mono mt-1 ${stoppedCount > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
                {stoppedCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Cards List for this Department */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" />
            <span>اقدامات و پروژه‌های ثبت‌شده در {currentDepartment}</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            تعداد {depProjects.length} رکورد
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {depProjects.map((project) => {
            const isStopped = project.status === 'متوقف';
            const hasObstacle = project.obstacleNature !== 'ندارد';

            return (
              <div 
                key={project.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs transition-all hover:border-slate-300"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-600">
                        ردیف {project.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                        isStopped 
                          ? 'bg-rose-50 text-rose-600' 
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        موعد: {project.deliveryDeadline}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      {project.projectTitle}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-slate-400 block">پیشرفت فیزیکی</span>
                      <span className="text-sm font-bold text-slate-800 font-mono">{project.progress}</span>
                    </div>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-blue-600 hover:text-blue-700 underline font-medium text-xs transition-colors flex items-center gap-1 flex-shrink-0"
                    >
                      مشاهده جزئیات
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">شرح اقدام:</span>
                    <p className="text-slate-500 line-clamp-2" title={project.currentActionDesc}>
                      {project.currentActionDesc}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-1">الزام بالادستی:</span>
                    <p className="text-slate-500 line-clamp-2" title={project.upstreamRequirement}>
                      {project.upstreamRequirement}
                    </p>
                  </div>
                </div>

                {/* Obstacle Box */}
                <div className={`mt-3 p-4 rounded-2xl border text-xs ${
                  hasObstacle 
                    ? 'bg-amber-50 rounded-2xl border-amber-100 text-amber-900' 
                    : 'bg-slate-50 border-slate-100 text-slate-700'
                }`}>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex-shrink-0">
                      {hasObstacle ? (
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-medium text-slate-800">
                        <span>جنس مانع: {project.obstacleNature}</span>
                        {project.obstacleEntity !== 'ندارد' && (
                          <span className="text-slate-500">نهاد مرتبط: {project.obstacleEntity}</span>
                        )}
                      </div>
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">
                        {project.obstacleDesc}
                      </p>
                      {project.obstacleImpact && project.obstacleImpact !== 'ندارد' && (
                        <p className="text-slate-500 text-[11px] pt-1 border-t border-amber-200/50">
                          <strong className="text-amber-800">تاثیر مانع:</strong> {project.obstacleImpact}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
