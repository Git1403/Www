import React, { useState } from 'react';
import { rawProjectsData, getDepartmentControlData } from './data/projectsData';
import { ProjectItem } from './types';
import { ControlTableView } from './components/ControlTableView';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { DepartmentDashboard } from './components/DepartmentDashboard';
import { ObstaclesAnalysis } from './components/ObstaclesAnalysis';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { 
  ShieldCheck, 
  BarChart3, 
  Building2, 
  AlertOctagon, 
  CheckCircle2, 
  Flame, 
  FileText
} from 'lucide-react';

type TabType = 'CONTROL' | 'EXECUTIVE' | 'DEPARTMENT' | 'OBSTACLES';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('CONTROL');
  const [isControlConfirmed, setIsControlConfirmed] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("دولت هوشمند");

  const controlData = getDepartmentControlData();
  const totalProjects = rawProjectsData.length;

  const handleConfirmControl = () => {
    setIsControlConfirmed(true);
    setActiveTab('EXECUTIVE');
  };

  const handleNavigateToDep = (depName: string) => {
    setSelectedDepartment(depName);
    setActiveTab('DEPARTMENT');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900" dir="rtl">
      {/* Top Header */}
      <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs flex items-center justify-between px-4 sm:px-8 shrink-0">
        <div className="max-w-7xl w-full mx-auto flex flex-col justify-center">
          <div className="flex items-center justify-between">
            {/* Logo / App Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-xs">
                ن
              </div>
              <div className="flex flex-col">
                <h1 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">
                  داشبورد حاکمیتی و پایش اقدامات فاوا
                </h1>
                <p className="text-xs text-slate-500">
                  وزارت نفت - گزارش پایش برنامه‌های سال ۱۴۰۴-۱۴۰۵ (بر اساس داده‌های اکسل)
                </p>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100/80">
                {isControlConfirmed ? 'کنترل داده: تأیید شده (۱۱ رکورد)' : 'وضعیت: آماده ارزیابی'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Subnav Navigation Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5">
          <nav className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              id="tab-control"
              onClick={() => setActiveTab('CONTROL')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'CONTROL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>جدول کنترل داده‌ها</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'CONTROL' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              }`}>
                ۲ معاونت
              </span>
            </button>

            <button
              id="tab-executive"
              onClick={() => setActiveTab('EXECUTIVE')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'EXECUTIVE'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>داشبورد کل و مدیریتی</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'EXECUTIVE' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              }`}>
                {totalProjects} اقدام
              </span>
            </button>

            <button
              id="tab-department"
              onClick={() => setActiveTab('DEPARTMENT')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'DEPARTMENT'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>داشبورد بر اساس نام معاونت</span>
            </button>

            <button
              id="tab-obstacles"
              onClick={() => setActiveTab('OBSTACLES')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'OBSTACLES'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <AlertOctagon className="w-4 h-4 text-amber-500" />
              <span>تحلیل موانع و گلوگاه‌ها (درصدی)</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Viewport Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex-1">
        {activeTab === 'CONTROL' && (
          <ControlTableView
            controlData={controlData}
            onConfirm={handleConfirmControl}
            isConfirmed={isControlConfirmed}
          />
        )}

        {activeTab === 'EXECUTIVE' && (
          <ExecutiveDashboard
            projects={rawProjectsData}
            onSelectProject={(p) => setSelectedProject(p)}
            onNavigateToDep={handleNavigateToDep}
            onNavigateToObstacles={() => setActiveTab('OBSTACLES')}
          />
        )}

        {activeTab === 'DEPARTMENT' && (
          <DepartmentDashboard
            projects={rawProjectsData}
            selectedDepartment={selectedDepartment}
            onSelectDepartment={(dep) => setSelectedDepartment(dep)}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {activeTab === 'OBSTACLES' && (
          <ObstaclesAnalysis
            projects={rawProjectsData}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}
      </main>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          گزارش استخراج‌شده از اکسل پروژه‌ها و اقدامات فاوا | تطبیق ۱۰۰٪ بدون تولید یا حدس داده
        </div>
      </footer>
    </div>
  );
}
