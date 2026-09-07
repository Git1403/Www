import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { GENERAL_OBSTACLE_NOTE } from '../data/projectsData';
import { 
  FolderKanban, 
  PlayCircle, 
  PauseCircle, 
  AlertOctagon, 
  CheckCircle2, 
  Search, 
  Eye, 
  Filter, 
  Layers, 
  AlertCircle
} from 'lucide-react';

interface Props {
  projects: ProjectItem[];
  onSelectProject: (p: ProjectItem) => void;
  onNavigateToDep: (depName: string) => void;
  onNavigateToObstacles: () => void;
}

export const ExecutiveDashboard: React.FC<Props> = ({ 
  projects, 
  onSelectProject, 
  onNavigateToDep,
  onNavigateToObstacles 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'STOPPED' | 'RUNNING'>('ALL');
  const [obstacleFilter, setObstacleFilter] = useState<'ALL' | 'WITH_OBSTACLE' | 'WITHOUT_OBSTACLE'>('ALL');

  const totalCount = projects.length;
  const stoppedProjects = projects.filter(p => p.status === 'متوقف');
  const runningProjects = projects.filter(p => p.status !== 'متوقف');
  const withObstacleProjects = projects.filter(p => p.obstacleNature !== 'ندارد');
  const withoutObstacleProjects = projects.filter(p => p.obstacleNature === 'ندارد');

  // Filtered rows
  const filteredProjects = projects.filter(item => {
    const matchesSearch = 
      item.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.depName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.obstacleDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.obstacleEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.id).includes(searchTerm);

    const matchesStatus = 
      statusFilter === 'ALL' ? true :
      statusFilter === 'STOPPED' ? item.status === 'متوقف' :
      item.status !== 'متوقف';

    const matchesObstacle = 
      obstacleFilter === 'ALL' ? true :
      obstacleFilter === 'WITH_OBSTACLE' ? item.obstacleNature !== 'ندارد' :
      item.obstacleNature === 'ندارد';

    return matchesSearch && matchesStatus && matchesObstacle;
  });

  return (
    <div className="space-y-6">
      {/* KPI Overview Cards - Clean Minimalism */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-1 font-medium">کل اقدامات / پروژه‌ها</p>
            <p className="text-3xl font-bold text-slate-900 font-mono">{totalCount}</p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
            در ۲ معاونت وزارت نفت
          </div>
        </div>

        {/* Running / In Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-1 font-medium">وضعیت اقدامات (در حال اجرا)</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-emerald-600 font-mono">{runningProjects.length}</p>
              <span className="text-xs text-slate-400 font-mono">({Math.round((runningProjects.length / totalCount) * 100)}٪)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-emerald-600 font-medium">
            پیشبرد فعال و پایش مداوم
          </div>
        </div>

        {/* Stopped Projects */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-1 font-medium">اقدامات متوقف شده</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-rose-600 font-mono">{stoppedProjects.length}</p>
              <span className="text-xs text-slate-400 font-mono">({Math.round((stoppedProjects.length / totalCount) * 100)}٪)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-rose-600 font-medium">
            ردیف‌های ۲ و ۳ (دولت هوشمند)
          </div>
        </div>

        {/* Projects with Obstacles */}
        <div 
          onClick={onNavigateToObstacles}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-400 shadow-xs flex flex-col justify-between cursor-pointer transition-all group"
        >
          <div>
            <p className="text-xs text-slate-500 mb-1 font-medium group-hover:text-slate-800">موانع شناسایی شده</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-amber-600 font-mono">{withObstacleProjects.length}</p>
              <span className="text-xs text-slate-400 font-mono">({Math.round((withObstacleProjects.length / totalCount) * 100)}٪)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-blue-600 font-medium flex items-center justify-between">
            <span>تحلیل آماری موانع</span>
            <span className="group-hover:translate-x-[-2px] transition-transform">←</span>
          </div>
        </div>
      </section>

      {/* Featured Dark Showcase Section (Clean Minimalism Signature) */}
      <section className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              پایش راهبردی فاوا
            </span>
            <h3 className="text-base font-bold text-white">
              برنامه تحول دیجیتال و هوشمندسازی وزارت نفت
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">کل اقدامات</span>
              <span className="text-sm font-semibold text-slate-200 font-mono">۱۱ ردیف مصوب</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">جنس اصلی موانع</span>
              <span className="text-sm font-semibold text-slate-200">درون‌سازمانی و بین‌دستگاهی</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">نهاد کلیدی مرتبط</span>
              <span className="text-sm font-semibold text-slate-200">شرکت ملی نفت / ICT</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider text-amber-400">مانع کلان سازمانی</span>
              <span className="text-xs text-slate-300 line-clamp-1">کمبود نیروی متخصص و هماهنگی</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 hidden md:block w-px h-16 bg-slate-800"></div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToObstacles}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium transition-colors"
          >
            مشاهده گزارش تحلیلی موانع
          </button>
        </div>
      </section>

      {/* Critical Executive Alert */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-amber-100 rounded-lg text-amber-800 flex-shrink-0 mt-0.5">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-800 mb-0.5">مانع کلان سازمانی ثبت‌شده در گزارش:</h4>
            <p className="text-xs text-amber-700 leading-relaxed">
              {GENERAL_OBSTACLE_NOTE}
            </p>
          </div>
        </div>
      </div>

      {/* Department Quick Filter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => onNavigateToDep("دولت هوشمند")}
          className="bg-white border border-slate-200 hover:border-slate-300 p-5 rounded-2xl cursor-pointer transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">معاونت ۱</span>
              <h4 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                دولت هوشمند
              </h4>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-slate-900 font-mono">۳ اقدام</div>
              <div className="text-xs text-rose-600 font-medium mt-0.5">۲ متوقف | ۱ در حال انجام</div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span className="line-clamp-1">موانع: زیرساخت فنی، تعامل‌پذیری، پیمانکار</span>
            <span className="text-blue-600 font-medium group-hover:underline">ورود به داشبورد ←</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigateToDep("معاونت سیاستگذاری، برنامهریزی و نظارت بر فاوا")}
          className="bg-white border border-slate-200 hover:border-slate-300 p-5 rounded-2xl cursor-pointer transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">معاونت ۲</span>
              <h4 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                معاونت سیاستگذاری، برنامهریزی و نظارت بر فاوا
              </h4>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-slate-900 font-mono">۸ اقدام</div>
              <div className="text-xs text-emerald-600 font-medium mt-0.5">۸ در حال اجرا (۱۰۰٪)</div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span className="line-clamp-1">موانع: عدم همکاری شرکت‌ها، استعلامات</span>
            <span className="text-blue-600 font-medium group-hover:underline">ورود به داشبورد ←</span>
          </div>
        </div>
      </div>

      {/* Main Table Section - Clean Minimalism */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        {/* Table Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              لیست اقدامات و پروژه‌های اولویت‌دار
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
              {filteredProjects.length} از {totalCount}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در عنوان، شرح، مانع..."
                className="w-full pl-3 pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                  statusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                همه
              </button>
              <button
                onClick={() => setStatusFilter('RUNNING')}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                  statusFilter === 'RUNNING' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                در حال اجرا ({runningProjects.length})
              </button>
              <button
                onClick={() => setStatusFilter('STOPPED')}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                  statusFilter === 'STOPPED' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                متوقف ({stoppedProjects.length})
              </button>
            </div>

            {/* Obstacle Filter Buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setObstacleFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                  obstacleFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                کل موانع
              </button>
              <button
                onClick={() => setObstacleFilter('WITH_OBSTACLE')}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                  obstacleFilter === 'WITH_OBSTACLE' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                دارای مانع ({withObstacleProjects.length})
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Minimalist Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead className="text-slate-400 border-b border-slate-100 uppercase font-medium">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center font-mono">ردیف</th>
                <th className="py-3.5 px-4 w-44">معاونت</th>
                <th className="py-3.5 px-4">عنوان پروژه / اقدام</th>
                <th className="py-3.5 px-4 w-28 text-center">پیشرفت</th>
                <th className="py-3.5 px-4 w-24 text-center">وضعیت</th>
                <th className="py-3.5 px-4 w-36">جنس مانع</th>
                <th className="py-3.5 px-4 w-36">نهاد مرتبط</th>
                <th className="py-3.5 px-4 text-center w-28">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    هیچ موردی با فیلترهای انتخابی یافت نشد.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((item) => {
                  const isStopped = item.status === 'متوقف';
                  const hasObstacle = item.obstacleNature !== 'ندارد';
                  const progressVal = parseInt(item.progress.replace('%', '').trim()) || 0;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-500">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        <span className="line-clamp-1" title={item.depName}>
                          {item.depName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900 line-clamp-1" title={item.projectTitle}>
                          {item.projectTitle}
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5" title={item.currentActionDesc}>
                          {item.currentActionDesc}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-slate-600 font-medium">{item.progress}</span>
                          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${isStopped ? 'bg-rose-400' : progressVal >= 80 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                              style={{ width: `${Math.min(progressVal, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${
                          isStopped 
                            ? 'bg-rose-50 text-rose-600' 
                            : 'bg-blue-50 text-blue-600'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-xs ${
                          hasObstacle 
                            ? 'bg-amber-50 text-amber-800' 
                            : 'text-slate-400'
                        }`}>
                          {item.obstacleNature}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs">
                        <span className="line-clamp-1" title={item.obstacleEntity}>
                          {item.obstacleEntity}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          id={`view-detail-btn-${item.id}`}
                          onClick={() => onSelectProject(item)}
                          className="text-blue-600 hover:text-blue-700 underline font-medium text-xs transition-colors"
                        >
                          مشاهده جزئیات
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
