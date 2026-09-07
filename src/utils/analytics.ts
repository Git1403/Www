import { ProjectItem } from '../types';
import { rawProjectsData } from '../data/projectsData';

export interface ObstacleFrequency {
  name: string;
  count: number;
  percentage: number;
  departments: {
    [dep: string]: number;
  };
}

export function calculateObstacleNatureStats(data: ProjectItem[] = rawProjectsData) {
  const totalProjects = data.length;
  // Key categories extracted directly from the records
  const categoryCounts: Record<string, { count: number; deps: Record<string, number> }> = {
    "درون‌سازمانی": { count: 0, deps: {} },
    "بین‌دستگاهی / برون‌سازمانی": { count: 0, deps: {} },
    "زیرساخت فنی": { count: 0, deps: {} },
    "فاقد مانع (ندارد)": { count: 0, deps: {} }
  };

  for (const item of data) {
    const nature = item.obstacleNature;
    const dep = item.depName;

    if (nature === 'ندارد') {
      categoryCounts["فاقد مانع (ندارد)"].count++;
      categoryCounts["فاقد مانع (ندارد)"].deps[dep] = (categoryCounts["فاقد مانع (ندارد)"].deps[dep] || 0) + 1;
      continue;
    }

    if (nature.includes("درونسازمانی") || nature.includes("درون سازمانی")) {
      categoryCounts["درون‌سازمانی"].count++;
      categoryCounts["درون‌سازمانی"].deps[dep] = (categoryCounts["درون‌سازمانی"].deps[dep] || 0) + 1;
    }
    if (nature.includes("بین‌دستگاهی") || nature.includes("بیندستگاهی") || nature.includes("بین دستگاهی") || nature.includes("برون سازمانی")) {
      categoryCounts["بین‌دستگاهی / برون‌سازمانی"].count++;
      categoryCounts["بین‌دستگاهی / برون‌سازمانی"].deps[dep] = (categoryCounts["بین‌دستگاهی / برون‌سازمانی"].deps[dep] || 0) + 1;
    }
    if (nature.includes("زیرساخت فنی")) {
      categoryCounts["زیرساخت فنی"].count++;
      categoryCounts["زیرساخت فنی"].deps[dep] = (categoryCounts["زیرساخت فنی"].deps[dep] || 0) + 1;
    }
  }

  const result: ObstacleFrequency[] = Object.entries(categoryCounts)
    .map(([name, val]) => ({
      name,
      count: val.count,
      percentage: totalProjects > 0 ? Math.round((val.count / totalProjects) * 100) : 0,
      departments: val.deps
    }))
    .sort((a, b) => b.count - a.count);

  return result;
}

export function calculateEntityStats(data: ProjectItem[] = rawProjectsData) {
  const totalProjects = data.length;
  const entityMap: Record<string, { count: number; deps: Record<string, number> }> = {};

  const knownEntities = [
    { key: "چهار شرکت اصلی / شرکت ملی نفت", matches: ["شرکت ملی نفت", "چهار شرکت اصلی"] },
    { key: "کارگروه تعامل‌پذیری", matches: ["کارگروه تعاملپذیری", "کارگروه تعامل‌پذیری"] },
    { key: "پیمانکاران اجرایی", matches: ["پیمانکار"] },
    { key: "سرویس‌دهندگان برون‌سازمانی / وزارت ICT", matches: ["سرویسدهنده", "سرویس‌دهنده", "وزارت ICT"] },
    { key: "سازمان اداری و استخدامی کشور", matches: ["سازمان اداری و استخدامی کشور"] },
    { key: "واحدهای ستادی و اداره‌کل‌های زیرمجموعه", matches: ["درون سازمانی", "اداره کل سیاستگذاری"] },
    { key: "فاقد نهاد مرتبط (ندارد)", matches: ["ندارد"] }
  ];

  for (const entityDef of knownEntities) {
    entityMap[entityDef.key] = { count: 0, deps: {} };
  }

  for (const item of data) {
    const rawEntity = item.obstacleEntity;
    const dep = item.depName;

    for (const entityDef of knownEntities) {
      const isMatched = entityDef.matches.some(m => rawEntity.includes(m));
      if (isMatched) {
        entityMap[entityDef.key].count++;
        entityMap[entityDef.key].deps[dep] = (entityMap[entityDef.key].deps[dep] || 0) + 1;
      }
    }
  }

  return Object.entries(entityMap)
    .map(([name, val]) => ({
      name,
      count: val.count,
      percentage: totalProjects > 0 ? Math.round((val.count / totalProjects) * 100) : 0,
      departments: val.deps
    }))
    .sort((a, b) => b.count - a.count);
}
