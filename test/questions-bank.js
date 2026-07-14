/* eslint-disable */
(function () {
  'use strict';

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalizeStem(stem) {
    return String(stem || '')
      .toLowerCase()
      .replace(/\d+/g, '#')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function stemTemplate(stem) {
    return normalizeStem(stem)
      .replace(/\b(the|a|an|in|on|at|to|for|and|or|but|with|from|by|before|after|during|this|that|which|who|what|when|where|how|why|however|therefore|nevertheless|consequently|meanwhile|instead|rather|similarly|addition|contrast|result|example|practice|set|case|study|ward|district|text|notes|draft|chapter|version|variant)\b/g, '')
      .replace(/\b[a-z]{4,}\b/g, 'w')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 72);
  }

  function rwFamily(q) {
    const id = String(q.id || '');
    if (id.startsWith('4t-r-')) return `4tests-rw-${Number(id.split('-')[2]) % 10}`;
    if (id.startsWith('4t-m-')) return `4tests-math-${Number(id.split('-')[2]) % 10}`;
    if (id.startsWith('sqb-')) return `sqb-rw-${Number(id.split('-')[1]) % 20}`;
    if (id.startsWith('gen2-')) {
      const parts = id.split('-');
      if (parts.length >= 4) return `gen2-${parts[2]}-${parts[3]}`;
      return 'gen2-possessive';
    }
    if (id.startsWith('gen-')) {
      const parts = id.split('-');
      if (parts.length >= 3) return `${parts[0]}-${parts[1]}-${parts[2]}`;
      if (parts.length >= 2) return `${parts[0]}-${parts[1]}`;
    }
    const base = id.match(/^([a-z]+)/);
    if (base) return base[1];

    const stem = String(q.stem || '').toLowerCase();
    if (stem.includes('main idea')) return 'reading-main-idea';
    if (stem.includes('best supported')) return 'reading-inference';
    if (stem.includes('notes')) return 'reading-notes';
    if (stem.includes('text 1')) return 'reading-dual';
    if (stem.includes('punctuation')) return 'punctuation';
    if (stem.includes('transition') || stem.includes('however') || stem.includes('therefore')) return 'transitions';
    if (q.passage) return `passage-${stemTemplate(q.stem)}`;
    return stemTemplate(q.stem);
  }

  function mathSkillFamily(q) {
    return `${q.domain || 'Math'}::${q.skill || 'general'}`;
  }

  function mathFamily(q) {
    const tpl = stemTemplate(q.stem || '');
    return `${mathSkillFamily(q)}::${tpl.slice(0, 40)}`;
  }

  function bucketPool(pool, familyFn) {
    const buckets = {};
    for (const q of pool) {
      const key = familyFn(q);
      if (!buckets[key]) buckets[key] = [];
      buckets[key].push(q);
    }
    for (const key of Object.keys(buckets)) buckets[key] = shuffle(buckets[key]);
    return buckets;
  }

  function pickRoundRobin(buckets, n) {
    const keys = shuffle(Object.keys(buckets));
    const picked = [];
    const used = new Set();

    while (picked.length < n && keys.length) {
      let added = false;
      for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        const bucket = buckets[key];
        while (bucket.length) {
          const q = bucket.shift();
          const uid = q.id || normalizeStem(q.stem);
          if (used.has(uid)) continue;
          used.add(uid);
          picked.push(q);
          added = true;
          break;
        }
        if (!bucket.length) keys.splice(i, 1);
        if (picked.length >= n) break;
      }
      if (!added) break;
    }
    return picked;
  }

  function spreadOrder(items, familyFn) {
    if (items.length <= 1) return items.slice();

    const remaining = shuffle(items.slice());
    const placed = [];

    while (remaining.length) {
      let bestIdx = 0;
      let bestScore = -Infinity;

      for (let i = 0; i < remaining.length; i++) {
        const key = familyFn(remaining[i]);
        let dist = placed.length;
        for (let j = placed.length - 1; j >= 0; j--) {
          if (familyFn(placed[j]) === key) {
            dist = placed.length - 1 - j;
            break;
          }
        }
        const score = dist + Math.random() * 0.35;
        if (score > bestScore) {
          bestScore = score;
          bestIdx = i;
        }
      }

      placed.push(remaining.splice(bestIdx, 1)[0]);
    }

    for (let pass = 0; pass < 3; pass++) {
      for (let i = 1; i < placed.length; i++) {
        if (familyFn(placed[i]) === familyFn(placed[i - 1])) {
          let swapIdx = -1;
          for (let j = i + 1; j < placed.length; j++) {
            if (familyFn(placed[j]) !== familyFn(placed[i - 1])
              && (j === placed.length - 1 || familyFn(placed[j]) !== familyFn(placed[i + 1]))) {
              swapIdx = j;
              break;
            }
          }
          if (swapIdx > -1) {
            [placed[i], placed[swapIdx]] = [placed[swapIdx], placed[i]];
          }
        }
      }
    }

    return placed;
  }

  function pickDiversified(pool, n, familyFn) {
    if (!pool.length) return [];
    const count = Math.min(n, pool.length);
    const buckets = bucketPool(pool, familyFn);
    const picked = pickRoundRobin(buckets, count);

    if (picked.length < count) {
      const used = new Set(picked.map((q) => q.id || normalizeStem(q.stem)));
      for (const q of shuffle(pool)) {
        if (picked.length >= count) break;
        const uid = q.id || normalizeStem(q.stem);
        if (used.has(uid)) continue;
        used.add(uid);
        picked.push(q);
      }
    }

    return spreadOrder(picked, familyFn);
  }

  function loadUniqueRW() {
    const parts = [];
    if (Array.isArray(window.RW_QUESTIONS_DATA)) parts.push(...window.RW_QUESTIONS_DATA);
    if (Array.isArray(window.RW_EXPAND_DATA)) parts.push(...window.RW_EXPAND_DATA);
    if (window.FOURTESTS_IMPORT_DATA?.rw) parts.push(...window.FOURTESTS_IMPORT_DATA.rw);
    if (window.SQB_IMPORT_DATA?.rw) parts.push(...window.SQB_IMPORT_DATA.rw);

    if (parts.length === 0) {
      console.error('RW question data missing — load rw-questions-data.js and rw-expand-data.js first.');
      return [];
    }

    const seen = new Set();
    const unique = [];
    for (const q of parts) {
      const key = normalizeStem(q.stem);
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(q);
    }
    return shuffle(unique);
  }

  const POOL_SIZE = 1000;

  const rw = loadUniqueRW();
  const mathRaw = typeof window.buildSATMathBank === 'function'
    ? window.buildSATMathBank(POOL_SIZE)
    : [];
  const mathImport4t = Array.isArray(window.FOURTESTS_IMPORT_DATA?.math)
    ? window.FOURTESTS_IMPORT_DATA.math
    : [];
  const mathImportSqb = Array.isArray(window.SQB_IMPORT_DATA?.math)
    ? window.SQB_IMPORT_DATA.math
    : [];
  const math = shuffle([...mathRaw, ...mathImport4t, ...mathImportSqb]);

  window.SAT_QUESTION_BANK = {
    rw,
    math,
    poolSize: POOL_SIZE,
    pickUniqueRW(n) {
      return pickDiversified(rw, n, rwFamily);
    },
    pickUniqueMath(n) {
      return pickDiversified(math, n, mathFamily);
    },
    pickBalancedMath(n) {
      return pickDiversified(math, n, mathSkillFamily);
    }
  };

  window.SAT_QUESTION_BANK.pickUniqueMath = window.SAT_QUESTION_BANK.pickBalancedMath;
})();
