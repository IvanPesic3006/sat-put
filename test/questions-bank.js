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

  function loadUniqueRW() {
    const parts = [];
    if (Array.isArray(window.RW_QUESTIONS_DATA)) parts.push(...window.RW_QUESTIONS_DATA);
    if (Array.isArray(window.RW_EXPAND_DATA)) parts.push(...window.RW_EXPAND_DATA);

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
    return unique;
  }

  const POOL_SIZE = 1000;

  const rw = loadUniqueRW();
  const math = typeof window.buildSATMathBank === 'function'
    ? window.buildSATMathBank(POOL_SIZE)
    : [];

  window.SAT_QUESTION_BANK = {
    rw,
    math,
    poolSize: POOL_SIZE,
    pickUniqueRW(n) {
      return shuffle(rw).slice(0, Math.min(n, rw.length));
    },
    pickUniqueMath(n) {
      return shuffle(math).slice(0, Math.min(n, math.length));
    },
    pickBalancedMath(n) {
      const buckets = {
        Algebra: [],
        'Advanced Math': [],
        'Problem-Solving & Data Analysis': [],
        'Geometry & Trigonometry': []
      };
      for (const q of math) {
        if (buckets[q.domain]) buckets[q.domain].push(q);
      }
      const perDomain = Math.max(1, Math.floor(n / 4));
      const picked = [];
      for (const dom of Object.keys(buckets)) {
        picked.push(...shuffle(buckets[dom]).slice(0, perDomain));
      }
      const rest = shuffle(math.filter((q) => !picked.includes(q)));
      while (picked.length < n && rest.length) picked.push(rest.pop());
      return shuffle(picked).slice(0, n);
    }
  };

  window.SAT_QUESTION_BANK.pickUniqueMath = window.SAT_QUESTION_BANK.pickBalancedMath;
})();
