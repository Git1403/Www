export interface ProjectItem {
  id: number; // ردیف
  depName: string; // نام معاونت (دقیقاً بر اساس اکسل)
  projectTitle: string; // عنوان اقدام/پروژه
  upstreamRequirement: string; // الزام بالادستی/نیازمندی درونسازمانی
  currentActionDesc: string; // شرح اقدام در حال اجرا
  progress: string; // درصد پیشرفت فیزیکی
  status: string; // وضعیت پیشبرد (متوقف، در حال انجام، در حال اجرا)
  beneficiary: string; // بهره‌بردار
  deliverable: string; // خروجی
  desiredState: string; // وضعیت مطلوب پس از اجرا
  organizationalBenefits: string; // منافع سازمانی یا آثار
  deliveryDeadline: string; // موعد تحویل قطعی
  obstacleDesc: string; // شرح دقیق مانع و گلوگاه
  obstacleNature: string; // جنس مانع
  obstacleEntity: string; // نهاد مرتبط موانع
  obstacleImpact: string; // تاثیر مانع بر اقدام/پروژه
}

export interface DepartmentControlRow {
  departmentName: string;
  rowCount: number;
  stoppedCount: number;
  inProgressCount: number;
  withObstacleCount: number;
}

export interface ObstacleStat {
  category: string;
  count: number;
  percentage: number;
  departmentBreakdown: {
    [depName: string]: { count: number; percentage: number };
  };
}
