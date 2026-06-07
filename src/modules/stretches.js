// 預設伸展流程與動作資料表 (繁體中文版)
export const DEFAULT_ROUTINES = [
  {
    id: 'desk-relief',
    name: '上班族肩頸放鬆',
    theme: 'sage',
    description:
      '針對長時間坐在電腦前的上班族所設計。幫助緩解頸部、肩部和上背部因靜止不動而累積的緊繃與酸痛。',
    durationText: '2.5 分鐘',
    steps: [
      {
        id: 'neck-tilt',
        name: '頸部側向伸展',
        duration: 20,
        description:
          '坐正或站直，雙肩自然放鬆下沉。\n慢慢將右耳向右肩膀靠近。\n停留 10 秒鐘，接著換左側伸展。\n請勿過度拉扯，讓頭部的重量自然垂下即可。',
      },
      {
        id: 'shoulder-roll',
        name: '肩部繞環',
        duration: 20,
        description:
          '吸氣，將雙肩向上抬起移向耳朵。\n吐氣，將雙肩向後向下滾動放鬆。\n保持緩慢且順暢的圓周繞環動作。\n時間過半時換方向繞環。',
      },
      {
        id: 'chest-opener',
        name: '站立擴胸伸展',
        duration: 30,
        description:
          '將雙手置於背後，十指互扣。\n雙臂微微伸直，慢慢向後拉並將胸口提起。\n如果頸部感到舒適，可微微仰頭看向斜上方。\n保持深長呼吸，感覺呼吸擴張您的胸腔。',
      },
      {
        id: 'side-stretch',
        name: '站立體側伸展',
        duration: 30,
        description:
          '將右手臂高舉過頭伸直。\n上半身徐徐向左側傾斜，延展身體右側。\n停留 15 秒後，換左側體側伸展。\n雙腳踩穩地面，重心平均分布在兩腳上。',
      },
      {
        id: 'forward-fold',
        name: '站立前彎伸展',
        duration: 30,
        description:
          '雙腳打開與髖同寬站立，膝蓋微彎保持彈性。\n從髖部開始慢慢向前折疊，讓上半身如瀑布般自然垂下。\n讓頭部與雙臂完全放鬆，沉向地面。\n將呼吸帶到大腿後側以及整個下背部。',
      },
    ],
  },
  {
    id: 'bedtime-yoga',
    name: '睡前放鬆伸展',
    theme: 'lavender',
    description:
      '結合深呼吸與緩慢的肌肉拉伸，引導大腦與身體釋放整天累積的壓力，為 restful 睡眠做好準備。',
    durationText: '2 分鐘',
    steps: [
      {
        id: 'chest-opener',
        name: '溫和開背',
        duration: 30,
        description:
          '採取舒適的坐姿，雙手輕放在膝蓋上。\n吸氣，將胸口向前托出並向上提。\n吐氣，讓背部回歸中立並放鬆。配合呼吸反覆緩慢進行。',
      },
      {
        id: 'forward-fold',
        name: '坐姿前彎伸展',
        duration: 45,
        description:
          '將雙腿舒適盤坐或向前伸直。\n雙手徐徐向前走，讓脊椎自然微微拱起折疊。\n低頭讓下巴靠近胸口，徹底放鬆後頸。\n專注在每一次長且緩慢的呼氣上。',
      },
      {
        id: 'neck-tilt',
        name: '正念頸部拉伸',
        duration: 30,
        description:
          '脊椎挺直，雙肩放鬆下沉。\n頭部向右傾斜，緩慢吸吐 15 秒。\n接著將頭部換向左傾斜 15 秒。',
      },
    ],
  },
];

const LOCAL_STORAGE_KEY = 'zenstretch_custom_routines';

// Helper: Get all routines (default + custom)
export function getAllRoutines() {
  const customRoutinesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  let customRoutines = [];

  if (customRoutinesJSON) {
    try {
      customRoutines = JSON.parse(customRoutinesJSON);
      
      const TTL_MS = 180 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      let needsCleanup = false;
      const validRoutines = [];

      customRoutines.forEach((r) => {
        if (r.isDeleted) {
          if (now - (r.updatedAt || 0) > TTL_MS) {
            needsCleanup = true; // 超過180天，徹底刪除
          } else {
            validRoutines.push(r); // 保留瘦身墓碑供同步
          }
        } else {
          validRoutines.push(r);
        }
      });

      if (needsCleanup) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(validRoutines));
      }

      // 過濾掉被標記為刪除的菜單，只回傳有效資料給 UI
      customRoutines = validRoutines.filter((r) => !r.isDeleted);
    } catch (e) {
      console.error('Error parsing custom routines from localStorage:', e);
    }
  }

  return [...DEFAULT_ROUTINES, ...customRoutines];
}

// Helper: Save a custom routine
export function saveCustomRoutine(routine) {
  const customRoutinesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  let customRoutines = [];

  if (customRoutinesJSON) {
    try {
      customRoutines = JSON.parse(customRoutinesJSON);
    } catch {
      customRoutines = [];
    }
  }

  // Clean routine fields and generate unique ID if needed
  const cleanedRoutine = {
    ...routine,
    id: routine.id || `custom-${Date.now()}`,
    isCustom: true,
    updatedAt: Date.now(), // 加入更新時間戳記，供智慧合併使用
  };

  // Replace if exists, else append
  const existingIdx = customRoutines.findIndex((r) => r.id === cleanedRoutine.id);
  if (existingIdx >= 0) {
    customRoutines[existingIdx] = cleanedRoutine;
  } else {
    customRoutines.push(cleanedRoutine);
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customRoutines));
  import('./firebase.js').then((module) => module.syncToCloud());
  return cleanedRoutine;
}

// Helper: Delete a custom routine
export function deleteCustomRoutine(id) {
  const customRoutinesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!customRoutinesJSON) return;

  try {
    let customRoutines = JSON.parse(customRoutinesJSON);
    // 瘦身墓碑：只保留 id, isDeleted, updatedAt，釋放儲存空間
    const idx = customRoutines.findIndex((r) => r.id === id);
    if (idx >= 0) {
      customRoutines[idx] = {
        id: customRoutines[idx].id,
        isDeleted: true,
        updatedAt: Date.now()
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customRoutines));
      import('./firebase.js').then((module) => module.syncToCloud());
    }
  } catch (e) {
    console.error('Error deleting custom routine:', e);
  }
}

// Helper: Get a stable theme for a routine
export function getRoutineTheme(routine) {
  if (routine && routine.theme) {
    return routine.theme;
  }
  // Assign stable theme based on ID
  const themes = ['sage', 'clay', 'lavender', 'rose', 'gold', 'ocean'];
  const idStr = (routine && routine.id) || '';
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % themes.length;
  return themes[index];
}
