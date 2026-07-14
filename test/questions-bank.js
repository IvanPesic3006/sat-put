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
    const raw = window.RW_QUESTIONS_DATA;
    if (!Array.isArray(raw) || raw.length === 0) {
      console.error('RW_QUESTIONS_DATA missing — load rw-questions-data.js first.');
      return [];
    }

    const seen = new Set();
    const unique = [];
    for (const q of raw) {
      const key = normalizeStem(q.stem);
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(q);
    }
    return unique;
  }

  const rw = loadUniqueRW();
  const math = typeof window.buildSATMathBank === 'function'
    ? window.buildSATMathBank(320)
    : [];

  window.SAT_QUESTION_BANK = {
    rw,
    math,
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
      const order = Object.keys(buckets);
      for (const dom of order) {
        picked.push(...shuffle(buckets[dom]).slice(0, perDomain));
      }
      const rest = shuffle(math.filter((q) => !picked.includes(q)));
      while (picked.length < n && rest.length) picked.push(rest.pop());
      return shuffle(picked).slice(0, n);
    }
  };

  // Use balanced pick for tests (mirrors official ~35/35/15/15 mix)
  window.SAT_QUESTION_BANK.pickUniqueMath = window.SAT_QUESTION_BANK.pickBalancedMath;
})();
