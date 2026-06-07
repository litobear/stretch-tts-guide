const HISTORY_KEY = 'zenstretch_workout_history';

// 取得所有未刪除的運動紀錄 (依照日期由新到舊排序)
export function getAllRecords() {
  const json = localStorage.getItem(HISTORY_KEY);
  if (!json) return [];
  try {
    let records = JSON.parse(json);
    
    const TTL_MS = 180 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    let needsCleanup = false;
    const validRecords = [];

    records.forEach((r) => {
      if (r.isDeleted) {
        if (now - (r.updatedAt || 0) > TTL_MS) {
          needsCleanup = true;
        } else {
          validRecords.push(r);
        }
      } else {
        validRecords.push(r);
      }
    });

    if (needsCleanup) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(validRecords));
    }

    return validRecords.filter((r) => !r.isDeleted).sort((a, b) => b.date - a.date);
  } catch (e) {
    console.error('Error parsing workout history:', e);
    return [];
  }
}

// 儲存一筆新的運動紀錄
export function saveRecord(routineId, routineName, duration) {
  let records = [];
  const json = localStorage.getItem(HISTORY_KEY);
  if (json) {
    try {
      records = JSON.parse(json);
    } catch (e) {
      console.error('Error parsing history:', e);
    }
  }

  const newRecord = {
    id: `history-${Date.now()}`,
    routineId,
    routineName,
    duration,
    date: Date.now(),
    updatedAt: Date.now(),
    isDeleted: false,
  };

  records.push(newRecord);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(records));

  // 觸發同步
  import('./firebase.js').then((module) => module.syncToCloud());

  return newRecord;
}

// 軟刪除一筆運動紀錄
export function deleteRecord(id) {
  let records = [];
  const json = localStorage.getItem(HISTORY_KEY);
  if (json) {
    try {
      records = JSON.parse(json);
    } catch (e) {
      console.error('Error parsing history:', e);
    }
  }

  const idx = records.findIndex((r) => r.id === id);
  if (idx >= 0) {
    // 瘦身墓碑：只保留 id, isDeleted, updatedAt
    records[idx] = {
      id: records[idx].id,
      isDeleted: true,
      updatedAt: Date.now()
    };
    localStorage.setItem(HISTORY_KEY, JSON.stringify(records));

    // 觸發同步
    import('./firebase.js').then((module) => module.syncToCloud());
  }
}
