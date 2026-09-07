import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { calculateObstacleNatureStats, calculateEntityStats } from '../utils/analytics';
import { GENERAL_OBSTACLE_NOTE } from '../data/projectsData';
import { 
  AlertTriangle, 
  TrendingUp, 
  Building2, 
  ShieldAlert, 
  PieChart, 
  CheckCircle2, 
  Eye, 
  Layers,
  FileSpreadsheet
} from 'lucide-react';

interface Props {
  projects: ProjectItem[];
  onSelectProject: (p: ProjectItem) => void;
}

export const ObstaclesAnalysis: React.FC<Props> = ({ projects, onSelectProject }) => {
  const [activeSubTab, setActiveSubTab] = useState<'NATURE' | 'ENTITIES' | 'MATRIX'>('NATURE');

  const natureStats = calculateObstacleNatureStats(projects);
  const entityStats = calculateEntityStats(projects);

  const totalProjects = projects.length;
  const projectsWithObstacles = projects.filter(p => p.obstacleNature !== 'ندارد').length;
  const obstaclePercentage = Math.round((projectsWithObstacles / totalProjects) * 100);

  return (
    <div className="space-y-6">
      {/* Header Stat Callout */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100 flex-shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 mb-2">
                تحلیل جامع گلوگاه‌ها و موانع اجرایی
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                تحلیل موانع از پرتکرارترین با درصد در کل معاونت‌ها و به تفکیک
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                بررسی آماری جنس موانع، نهادهای ایجادکننده گلوگاه و سهم هر دسته بر اساس داده‌های ستون‌های مربوطه در اکسل
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 shrink-0">
            <div className="text-center">
              <span className="text-xs text-slate-500 block font-medium">پروژه‌های درگیر مانع</span>
              <span className="text-2xl font-bold text-amber-600 font-mono">
                {projectsWithObstacles} <span className="text-xs font-normal text-slate-400">از {totalProjects}</span>
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="text-center">
              <span className="text-xs text-slate-500 block font-medium">نرخ موانع کلی</span>
              <span className="text-2xl font-bold text-slate-900 font-mono">
                {obstaclePercentage}٪
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* General Bottleneck Banner */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <strong className="font-semibold">نکته کلان در فایل اکسل:</strong> {GENERAL_OBSTACLE_NOTE}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveSubTab('NATURE')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
            activeSubTab === 'NATURE'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>تحلیل بر اساس «جنس مانع» (پرتکرارترین با درصد)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ENTITIES')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
            activeSubTab === 'ENTITIES'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>تحلیل بر اساس «نهاد مرتبط با مانع»</span>
        </button>

        <button
          onClick={() => setActiveSubTab('MATRIX')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
            activeSubTab === 'MATRIX'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>ماتریس تجمیعی موانع به تفکیک تمام اقدامات</span>
        </button>
      </div>

      {/* SUBTAB 1: NATURE OF OBSTACLES */}
      {activeSubTab === 'NATURE' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {natureStats.map((item, idx) => {
              const isNoObstacle = item.name.includes("ندارد");
              const barColor = isNoObstacle ? 'bg-emerald-500' : 'bg-blue-600';

              return (
                <div key={item.name} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-mono font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-medium">
                        تکرار: <strong className="text-slate-800 font-mono">{item.count}</strong> از {totalProjects} اقدام
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold font-mono ${
                        isNoObstacle ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {item.percentage}٪
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>

                  {/* Breakdown by Department */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs gap-2">
                    <span className="text-slate-400 font-medium">توزیع به تفکیک معاونت‌ها:</span>
                    <div className="flex items-center gap-4">
                      {/* Government */}
                      <span className="text-slate-600">
                        دولت هوشمند:{' '}
                        <strong className="text-slate-900 font-mono">
                          {item.departments["دولت هوشمند"] || 0} مورد
                        </strong>{' '}
                        ({Math.round(((item.departments["دولت هوشمند"] || 0) / 3) * 100)}٪ کل این معاونت)
                      </span>

                      <span className="text-slate-200">|</span>

                      {/* Policy & Planning */}
                      <span className="text-slate-600">
                        معاونت سیاستگذاری فاوا:{' '}
                        <strong className="text-slate-900 font-mono">
                          {item.departments["معاونت سیاستگذاری، برنامهریزی و نظارت بر فاوا"] || 0} مورد
                        </strong>{' '}
                        ({Math.round(((item.departments["معاونت سیاستگذاری، برنامهریزی و نظارت بر فاوا"] || 0) / 8) * 100)}٪ کل این معاونت)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Takeaways */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2 text-xs leading-relaxed text-slate-600">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>یافته‌های تحلیلی جنس موانع:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 pr-1 text-slate-600">
              <li><strong className="text-slate-800">موانع درون‌سازمانی ({natureStats.find(n => n.name.includes("درون"))?.percentage}٪):</strong> پرتکرارترین گلوگاه در سطح هر دو معاونت بوده که نشان‌دهنده چالش‌های هماهنگی داخلی و همکاری بین شرکت‌های تابعه و ستاد است.</li>
              <li><strong className="text-slate-800">موانع بین‌دستگاهی و برون‌سازمانی ({natureStats.find(n => n.name.includes("بین‌دستگاهی"))?.percentage}٪):</strong> به دلیل فرآیندهای طولانی استعلام، دریافت مصوبات و مجوزها از نهادهای بیرونی است.</li>
              <li><strong className="text-slate-800">موانع زیرساخت فنی ({natureStats.find(n => n.name.includes("زیرساخت"))?.percentage}٪):</strong> منحصراً در حوزه «دولت هوشمند» (ردیف‌های ۲ و ۳) بروز کرده و موجب توقف این دو اقدام مهم گردیده است.</li>
            </ul>
          </div>
        </div>
      )}

      {/* SUBTAB 2: OBSTACLE ENTITIES */}
      {activeSubTab === 'ENTITIES' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entityStats.map((item, idx) => (
              <div key={item.name} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-400">اولویت {idx + 1}</span>
                    <h3 className="font-bold text-slate-800 text-sm">
                      {item.name}
                    </h3>
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-bold text-slate-900 font-mono">{item.percentage}٪</span>
                    <span className="text-xs text-slate-400 block font-mono">{item.count} اقدام</span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-blue-600"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
                  <span>دولت هوشمند: {item.departments["دولت هوشمند"] || 0}</span>
                  <span>معاونت فاوا: {item.departments["معاونت سیاستگذاری، برنامهریزی و نظارت بر فاوا"] || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: DETAILED MATRIX */}
      {activeSubTab === 'MATRIX' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">
              ماتریس دقیق موانع، جنس، نهاد و اثرات بر اساس تمام ردیف‌های اکسل
            </h3>
            <span className="text-xs text-slate-400 font-medium font-mono">۱۱ رکورد استخراج‌شده</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs">
              <thead className="text-slate-400 border-b border-slate-100 uppercase font-medium">
                <tr>
                  <th className="py-3.5 px-3 w-12 text-center font-mono">ردیف</th>
                  <th className="py-3.5 px-3 w-36">معاونت</th>
                  <th className="py-3.5 px-3 w-48">عنوان اقدام</th>
                  <th className="py-3.5 px-3 w-28">جنس مانع</th>
                  <th className="py-3.5 px-3 w-36">نهاد مرتبط</th>
                  <th className="py-3.5 px-3">شرح دقیق مانع و گلوگاه</th>
                  <th className="py-3.5 px-3 w-44">تاثیر مانع</th>
                  <th className="py-3.5 px-3 text-center w-24">جزییات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {projects.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-500">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 font-medium">
                      {item.depName}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-slate-900">
                      {item.projectTitle}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {item.obstacleNature}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {item.obstacleEntity}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 leading-relaxed">
                      {item.obstacleDesc}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 leading-relaxed">
                      {item.obstacleImpact || '—'}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => onSelectProject(item)}
                        className="text-blue-600 hover:text-blue-700 underline font-medium text-xs transition-colors"
                      >
                        مشاهده
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
