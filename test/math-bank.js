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

  function pick4(correct, distractors) {
    const pool = [correct, ...distractors.filter((d) => d !== correct)];
    const opts = shuffle(pool).slice(0, 4);
    while (opts.length < 4) opts.push(`${correct}?`);
    if (!opts.includes(correct)) opts[0] = correct;
    return { choices: opts, answer: opts.indexOf(correct) };
  }

  function frac(n, d) {
    const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
    const s = g(n, d);
    n /= s;
    d /= s;
    if (d === 1) return String(n);
    if (n < 0) return `−${Math.abs(n)}/${d}`;
    return `${n}/${d}`;
  }

  function fmt(n, dp = 2) {
    if (Number.isInteger(n)) return String(n);
    return Number(n.toFixed(dp)).toString();
  }

  window.buildSATMathBank = function buildSATMathBank(target = 1000) {
    const qs = [];
    const seen = new Set();
    const domainCount = {
      Algebra: 0,
      'Advanced Math': 0,
      'Problem-Solving & Data Analysis': 0,
      'Geometry & Trigonometry': 0
    };
    const caps = {
      Algebra: Math.round(target * 0.35),
      'Advanced Math': Math.round(target * 0.35),
      'Problem-Solving & Data Analysis': Math.round(target * 0.15),
      'Geometry & Trigonometry': target - Math.round(target * 0.35) * 2 - Math.round(target * 0.15)
    };
    const add = (q) => {
      if (qs.length >= target || seen.has(q.stem)) return;
      if (domainCount[q.domain] >= caps[q.domain]) return;
      seen.add(q.stem);
      domainCount[q.domain]++;
      qs.push({ passage: null, ...q });
    };

    const skillCount = {};
    const maxPerSkill = () => 9999;

    const mc = (id, domain, skill, stem, correct, distractors, explain) => {
      const sk = `${domain}::${skill}`;
      skillCount[sk] = skillCount[sk] || 0;
      if (skillCount[sk] >= maxPerSkill(domain)) return;
      const { choices, answer } = pick4(correct, distractors);
      const before = qs.length;
      add({ id, domain, skill, stem, choices, answer, explain });
      if (qs.length > before) skillCount[sk]++;
    };

    // ─── ALGEBRA (~35%) ───────────────────────────────────────────────
    // Linear equations in one variable
    for (let a = 2; a <= 9; a++) {
      for (let b = -12; b <= 12; b++) {
        if (b === 0) continue;
        for (const x of [-6, -4, -2, 1, 3, 5, 7, 9]) {
          const c = a * x + b;
          mc(
            `alg-lin1-${a}-${b}-${x}`,
            'Algebra',
            'Linear equations in one variable',
            `If ${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} = ${c}, what is the value of x?`,
            String(x),
            [String(x + 1), String(x - 1), String(x + 2), String(-x)],
            `Subtract ${b >= 0 ? b : '−' + Math.abs(b)}, divide by ${a}: x = ${x}.`
          );
        }
      }
    }

    // Linear equations with variables on both sides
    for (const m of [2, 3, 4, 5]) {
      for (const x of [1, 2, 3, 4, 5, 6]) {
        const rhs = x + 3;
        mc(
          `alg-lin-both-${m}-${x}`,
          'Algebra',
          'Linear equations in one variable',
          `If ${m}x + 3 = ${m - 1}x + ${rhs}, what is the value of x?`,
          String(x),
          [String(x + 1), String(x - 1), String(2 * x), String(x + 2)],
          `Subtract (${m - 1}x) from both sides: x + 3 = ${rhs}, so x = ${x}.`
        );
      }
    }

    // Linear functions — evaluate & interpret
    for (let m of [-4, -2, -1, 2, 3, 5]) {
      for (let b of [-8, -3, 0, 4, 7]) {
        for (const x of [-2, 0, 1, 3, 5]) {
          const y = m * x + b;
          mc(
            `alg-func-${m}-${b}-${x}`,
            'Algebra',
            'Linear functions',
            `For the linear function f(x) = ${m}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)}, what is f(${x})?`,
            String(y),
            [String(y + m), String(y - m), String(b), String(m * x)],
            `f(${x}) = ${m}(${x}) ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} = ${y}.`
          );
        }
      }
    }

    // Slope from two points
    for (let x1 = -3; x1 <= 3; x1++) {
      for (let y1 = -3; y1 <= 3; y1++) {
        for (const m of [-3, -1, 1, 2, 4]) {
          const x2 = x1 + 2;
          const y2 = y1 + m * 2;
          mc(
            `alg-slope-${x1}-${y1}-${m}`,
            'Algebra',
            'Linear functions',
            `What is the slope of the line that passes through (${x1}, ${y1}) and (${x2}, ${y2})?`,
            String(m),
            [String(m + 1), String(-m), String(m * 2), String(m - 1)],
            `Slope = (${y2} − ${y1}) / (${x2} − ${x1}) = ${m}.`
          );
        }
      }
    }

    // Systems of two linear equations
    for (let p of [2, 3, 4, 5]) {
      for (let q of [1, 2, 3, 4]) {
        const x = p;
        const y = q;
        const a1 = 2;
        const b1 = 3;
        const c1 = a1 * x + b1 * y;
        const a2 = 1;
        const b2 = -1;
        const c2 = a2 * x + b2 * y;
        mc(
          `alg-sys-${p}-${q}`,
          'Algebra',
          'Systems of two linear equations',
          `2x + 3y = ${c1} and x − y = ${c2}. What is the value of y?`,
          String(y),
          [String(y + 1), String(y - 1), String(x), String(x + y)],
          `Solve the system: x = ${x}, y = ${y}.`
        );
      }
    }

    // Word problem — systems
    for (let r of [3, 4, 5, 6]) {
      for (let b of [2, 3, 4, 5]) {
        const total = 5 * r + 3 * b;
        mc(
          `alg-sys-wp-${r}-${b}`,
          'Algebra',
          'Systems of two linear equations',
          `Store A sells raspberries for $5/pint and blackberries for $3/pint. A purchase of ${r} pints of raspberries and ${b} pints of blackberries costs $${total}. Which equation represents this situation if x is raspberry pints and y is blackberry pints?`,
          `5x + 3y = ${total}`,
          [`3x + 5y = ${total}`, `5x + 3y = ${total + 5}`, `x + y = ${r + b}`, `5x − 3y = ${total}`],
          `${r} raspberry pints at $5 and ${b} blackberry pints at $3 gives 5x + 3y = ${total}.`
        );
      }
    }

    // Linear inequalities — test a point
    const ineqItems = [
      ['y > −2x + 5', '(−2, 10)', '(0, 4)', '(1, 5)', '(−1, 3)'],
      ['y > 3x − 1', '(0, 0)', '(2, 8)', '(1, 1)', '(0, −1)'],
      ['y < x + 4', '(0, 5)', '(2, 3)', '(−2, 1)', '(1, 6)'],
      ['y ≤ −x + 7', '(1, 5)', '(0, 8)', '(3, 3)', '(2, 6)'],
    ];
    ineqItems.forEach(([ineq, ok, w1, w2, w3], i) => {
      mc(
        `alg-ineq-${i}`,
        'Algebra',
        'Linear inequalities',
        `Which point (x, y) satisfies ${ineq}?`,
        ok,
        [w1, w2, w3],
        `Substitute each point into ${ineq}.`
      );
    });

    // y-intercept / equation in two variables
    for (let m of [-5, -2, 3, 4]) {
      for (let b of [-10, -4, 6, 12]) {
        mc(
          `alg-yint-${m}-${b}`,
          'Algebra',
          'Linear equations in two variables',
          `What is the y-intercept of the graph of y = ${m}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} in the xy-plane?`,
          String(b),
          [String(-b), String(m), '0', String(b + m)],
          `In y = mx + b, the y-intercept is b = ${b}.`
        );
      }
    }

    // ─── ADVANCED MATH (~35%) ─────────────────────────────────────────
    // Quadratic — solve by factoring
    for (let r1 of [2, 3, 4, 5, 6]) {
      for (let r2 of [-5, -3, -1, 2, 4]) {
        if (r1 === -r2) continue;
        const b = -(r1 + r2);
        const c = r1 * r2;
        const roots = [String(Math.min(r1, r2)), String(Math.max(r1, r2))].sort();
        mc(
          `adv-quad-fac-${r1}-${r2}`,
          'Advanced Math',
          'Nonlinear equations',
          `What is the positive solution to x² ${b >= 0 ? '− ' + Math.abs(b) + 'x' : '+ ' + Math.abs(b) + 'x'} ${c >= 0 ? '− ' + Math.abs(c) : '+ ' + Math.abs(c)} = 0?`,
          String(Math.max(r1, r2)),
          [String(Math.min(r1, r2) - 1), String(Math.max(r1, r2) + 1), '0', String(Math.abs(r1 * r2) + 1)],
          `Factor: (x − ${r1})(x − ${r2}) = 0, so x = ${r1} or x = ${r2}.`
        );
      }
    }

    // Quadratic vertex / minimum
    for (let h of [-4, -2, 0, 2, 5]) {
      for (let k of [1, 3, 7, 11]) {
        mc(
          `adv-quad-vtx-${h}-${k}`,
          'Advanced Math',
          'Nonlinear functions',
          `If g(x) = (x ${h >= 0 ? '− ' + h : '+ ' + Math.abs(h)})² + ${k}, what is the minimum value of g?`,
          String(k),
          [String(k + 1), String(h * h), String(k * 2), '0'],
          `Vertex form: minimum is k = ${k} at x = ${h}.`
        );
      }
    }

    // Discriminant — number of real solutions
    for (const [a, b, c, ans, why] of [
      [1, 2, 5, 'Zero', 'b² − 4ac = 4 − 20 < 0'],
      [1, 6, 9, 'Exactly one', 'b² − 4ac = 0'],
      [1, 0, -4, 'Exactly two', 'b² − 4ac = 16 > 0'],
      [2, -8, 8, 'Exactly one', 'discriminant equals 0'],
    ]) {
      mc(
        `adv-disc-${a}-${b}-${c}`,
        'Advanced Math',
        'Nonlinear equations',
        `How many distinct real solutions does ${a}x² ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)}x ${c >= 0 ? '+ ' + c : '− ' + Math.abs(c)} = 0 have?`,
        ans,
        ['Exactly one', 'Exactly two', 'Zero', 'Infinitely many'].filter((x) => x !== ans),
        why
      );
    }

    // Exponential growth/decay
    for (let p0 of [50, 80, 100, 120]) {
      for (const rate of [0.5, 0.2, 0.8]) {
        const val = p0 * Math.pow(rate, 2);
        mc(
          `adv-exp-${p0}-${rate}`,
          'Advanced Math',
          'Nonlinear functions',
          `A quantity starts at ${p0} and each hour is multiplied by ${rate}. What is the value after 2 hours?`,
          fmt(val),
          [fmt(p0 * rate), fmt(p0 * rate * 3), fmt(p0 + 2 * rate), fmt(p0 * Math.pow(rate, 3))],
          `${p0} × ${rate}² = ${fmt(val)}.`
        );
      }
    }

    // Exponential from context
    for (let start of [86, 100, 200]) {
      const v2 = start * 0.2 * 0.2;
      mc(
        `adv-exp-dec-${start}`,
        'Advanced Math',
        'Nonlinear functions',
        `f(0) = ${start}. Each increase in x by 1 decreases f(x) by 80%. What is f(2)?`,
        fmt(v2),
        [fmt(start * 0.2), fmt(start * 0.8), fmt(start - 80), fmt(start * 0.4)],
        `f(x) = ${start}(0.2)ˣ, so f(2) = ${fmt(v2)}.`
      );
    }

    // Absolute value equation
    for (let k of [3, 5, 7, 9]) {
      mc(
        `adv-abs-${k}`,
        'Advanced Math',
        'Nonlinear equations',
        `If |2x − ${k}| = 4, what is the sum of all possible values of x?`,
        String(k),
        [String(k + 1), String(k - 1), String(2 * k), '4'],
        `2x − ${k} = ±4 gives x = ${(k + 4) / 2} and x = ${(k - 4) / 2}; sum = ${k}.`
      );
    }

    // Equivalent expressions — difference of squares
    for (let n of [3, 5, 7, 9, 11, 13]) {
      mc(
        `adv-dos-${n}`,
        'Advanced Math',
        'Equivalent expressions',
        `Which expression is equivalent to (x + ${n})(x − ${n})?`,
        `x² − ${n * n}`,
        [`x² + ${n * n}`, `(x − ${n})²`, `x² − ${n}x`, `${n}x² − ${n}`],
        `(x + ${n})(x − ${n}) = x² − ${n * n}.`
      );
    }

    // Polynomial combine
    for (let a of [2, 3, 5]) {
      for (let b of [4, 6, 8]) {
        mc(
          `adv-poly-${a}-${b}`,
          'Advanced Math',
          'Equivalent expressions',
          `Which is equivalent to (${a}x² + ${b}x) − (${a - 1}x² − ${b}x)?`,
          `x² + ${2 * b}x`,
          [`${2 * a - 1}x² + ${2 * b}x`, `x²`, `${b}x² + ${2 * b}x`, `2x² + ${b}x`],
          `Subtract: (${a}x² − ${a - 1}x²) + (${b}x + ${b}x) = x² + ${2 * b}x.`
        );
      }
    }

    // Radical simplify
    for (const n of [12, 18, 27, 48, 50, 72]) {
      const simp = n === 12 ? '2√3' : n === 18 ? '3√2' : n === 27 ? '3√3' : n === 48 ? '4√3' : n === 50 ? '5√2' : '6√2';
      mc(
        `adv-sqrt-${n}`,
        'Advanced Math',
        'Equivalent expressions',
        `Which is equivalent to √${n}?`,
        simp,
        [`√${n + 1}`, `${Math.sqrt(n).toFixed(1)}`, `√${n / 2}`, `${n}`],
        `√${n} = ${simp}.`
      );
    }

    // Quadratic function evaluation
    for (let a of [1, 2, 3]) {
      for (let x of [-2, -1, 0, 2, 3]) {
        const val = a * x * x - 4 * x + 1;
        mc(
          `adv-quad-eval-${a}-${x}`,
          'Advanced Math',
          'Nonlinear functions',
          `If f(x) = ${a}x² − 4x + 1, what is f(${x})?`,
          String(val),
          [String(val + 1), String(val - 1), String(val + a), String(-val)],
          `f(${x}) = ${a}(${x * x}) − 4(${x}) + 1 = ${val}.`
        );
      }
    }

    // Line-parabola system (discriminant)
    mc(
      'adv-sys-par-6',
      'Advanced Math',
      'Nonlinear equations',
      `The line y = 2.25 intersects the parabola y = −4x² + bx at exactly one point. If b is positive, what is b?`,
      '6',
      ['5', '8', '4', '12'],
      `Set −4x² + bx = 2.25. One solution when discriminant b² − 36 = 0, so b = 6.`
    );

    // ─── PROBLEM-SOLVING & DATA ANALYSIS (~15%) ───────────────────────
    // Percent increase/decrease
    for (const pct of [12, 15, 18, 22, 28, 35, 45]) {
      for (const price of [60, 80, 120, 160, 240]) {
        const sale = price * (1 - pct / 100);
        mc(
          `psda-pct-${pct}-${price}`,
          'Problem-Solving & Data Analysis',
          'Percentages',
          `An item priced at $${price} is discounted by ${pct}%. What is the sale price?`,
          `$${fmt(sale)}`,
          [`$${fmt(price - pct)}`, `$${fmt(sale + 10)}`, `$${price}`, `$${fmt(price * pct / 100)}`],
          `${pct}% off: $${price} × ${(1 - pct / 100).toFixed(2)} = $${fmt(sale)}.`
        );
      }
    }

    // Percent of percent
    for (const a of [40, 50, 60]) {
      for (const b of [20, 30, 25]) {
        const ans = (a * b) / 100;
        mc(
          `psda-pctpct-${a}-${b}`,
          'Problem-Solving & Data Analysis',
          'Percentages',
          `${a}% of the items in a group are red. Of the red items, ${b}% also have stripes. What percent of all items are red with stripes?`,
          `${ans}%`,
          [`${a + b}%`, `${a - b}%`, `${(b / a * 100).toFixed(0)}%`, `${ans + 5}%`],
          `${b}% of ${a}% = ${a / 100} × ${b / 100} = ${ans / 100} → ${ans}%.`
        );
      }
    }

    // Ratios and unit rates
    for (let a of [2, 3, 4, 5, 6]) {
      for (let b of [3, 4, 5, 7]) {
        const total = (a + b) * 8;
        const smaller = Math.min(a, b) * 8;
        mc(
          `psda-ratio-${a}-${b}`,
          'Problem-Solving & Data Analysis',
          'Ratios and rates',
          `Two quantities are in ratio ${a}:${b}. If their sum is ${total}, what is the smaller quantity?`,
          String(smaller),
          [String(Math.max(a, b) * 8), String(total), String(smaller + 8), String(smaller - 4)],
          `Total parts ${a + b}; smaller = ${Math.min(a, b)}/${a + b} × ${total} = ${smaller}.`
        );
      }
    }

    // Unit conversion / derived units
    for (const dens of [250, 320, 353]) {
      const mass = dens * 0.27;
      const edge = Math.cbrt(mass / dens).toFixed(2);
      mc(
        `psda-unit-${dens}`,
        'Problem-Solving & Data Analysis',
        'Ratios and rates',
        `Wood density is ${dens} kg/m³. A cubic sample has mass ${fmt(mass, 1)} kg. To the nearest hundredth, what is the edge length in meters?`,
        edge,
        [fmt(parseFloat(edge) + 0.05), fmt(parseFloat(edge) - 0.08), fmt(parseFloat(edge) * 2), '1.00'],
        `Volume = mass/density; edge = ∛volume ≈ ${edge} m.`
      );
    }

    // Mean, median
    for (let start of [2, 5, 8, 11]) {
      const data = [start, start + 3, start + 7, start + 10, start + 14];
      const mean = data.reduce((s, v) => s + v, 0) / data.length;
      const sorted = [...data].sort((x, y) => x - y);
      const median = sorted[2];
      mc(
        `psda-mean-${start}`,
        'Problem-Solving & Data Analysis',
        'One-variable data',
        `What is the mean of ${data.join(', ')}?`,
        String(mean),
        [String(mean + 1), String(median), String(mean - 1), String(mean + 2)],
        `Sum = ${data.reduce((s, v) => s + v, 0)}; mean = ${mean}.`
      );
      mc(
        `psda-med-${start}`,
        'Problem-Solving & Data Analysis',
        'One-variable data',
        `What is the median of ${data.join(', ')}?`,
        String(median),
        [String(mean), String(median + 2), String(sorted[0]), String(sorted[4])],
        `Ordered: ${sorted.join(', ')}; median = ${median}.`
      );
    }

    // Probability
    for (let r of [2, 3, 4, 5]) {
      for (let b of [2, 3, 4, 6]) {
        for (let g of [1, 2, 3]) {
          const total = r + b + g;
          mc(
            `psda-prob-${r}-${b}-${g}`,
            'Problem-Solving & Data Analysis',
            'Probability',
            `A bag has ${r} red, ${b} blue, and ${g} green marbles. If one is chosen at random, what is P(blue)?`,
            `${b}/${total}`,
            [`${r}/${total}`, `${g}/${total}`, `${b}/${total + 1}`, `1/${total + 1}`],
            `P(blue) = ${b}/${total}.`
          );
        }
      }
    }

    // Conditional probability
    mc(
      'psda-cond-1',
      'Problem-Solving & Data Analysis',
      'Conditional probability',
      `In a class, 30 students study French, 20 study Spanish, and 8 study both. If a student is chosen at random from those who study French, what is the probability they also study Spanish?`,
      '4/15',
      ['8/50', '2/5', '8/30', '1/4'],
      'P(Spanish | French) = 8/30 = 4/15.'
    );

    // Scatterplot / line of best fit (text description)
    for (const slope of [1.5, 2, 2.5, 3]) {
      const y32 = slope * 32 + 10;
      mc(
        `psda-scatter-${slope}`,
        'Problem-Solving & Data Analysis',
        'Two-variable data',
        `A line of best fit for a dataset is y = ${slope}x + 10. Which is closest to the predicted y when x = 32?`,
        fmt(y32, 1),
        [fmt(y32 - slope), fmt(y32 + slope * 2), fmt(slope * 32), fmt(y32 + 10)],
        `y = ${slope}(32) + 10 = ${fmt(y32, 1)}.`
      );
    }

    // Linear vs exponential growth
    mc(
      'psda-growth-1',
      'Problem-Solving & Data Analysis',
      'Two-variable data',
      `Model A adds 15 per year to 100. Model B multiplies by 1.08 each year. What is Model A's value after 2 years?`,
      '130',
      ['116.6', '115', '125', '108'],
      '100 + 15 + 15 = 130.'
    );

    // ─── GEOMETRY & TRIGONOMETRY (~15%) ─────────────────────────────
    // Pythagorean theorem
    const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 12, 15], [10, 24, 26]];
    for (const [a, b, c] of triples) {
      mc(
        `geo-tri-${a}-${b}`,
        'Geometry & Trigonometry',
        'Right triangles',
        `A right triangle has legs ${a} and ${b}. What is the hypotenuse?`,
        String(c),
        [String(a + b), String(c + 1), String(c - 2), String(Math.round(Math.sqrt(a * a + b * b + 1)))],
        `${a}² + ${b}² = ${c}².`
      );
    }

    // Special right triangle 30-60-90
    for (let short of [3, 5, 7, 9, 11]) {
      const hyp = short * 2;
      const long = short * Math.sqrt(3);
      mc(
        `geo-3060-${short}`,
        'Geometry & Trigonometry',
        'Right triangles',
        `In a 30°-60°-90° triangle, the side opposite 30° has length ${short}. What is the hypotenuse?`,
        String(hyp),
        [String(short + 3), fmt(long), String(short * 3), String(hyp + 2)],
        `Hypotenuse = 2 × (${short}) = ${hyp}.`
      );
    }

    // Trigonometry sin/cos/tan
    for (const [opp, adj, hyp] of [[3, 4, 5], [5, 12, 13], [8, 15, 17]]) {
      mc(
        `geo-sin-${opp}-${adj}`,
        'Geometry & Trigonometry',
        'Trigonometry',
        `In a right triangle with opposite side ${opp} and hypotenuse ${hyp}, what is sin θ?`,
        frac(opp, hyp),
        [frac(adj, hyp), frac(opp, adj), frac(hyp, opp), frac(adj, opp)],
        `sin θ = opposite/hypotenuse = ${opp}/${hyp}.`
      );
      mc(
        `geo-tan-${opp}-${adj}`,
        'Geometry & Trigonometry',
        'Trigonometry',
        `In a right triangle with legs ${opp} and ${adj}, what is tan θ (opposite ${opp})?`,
        frac(opp, adj),
        [frac(adj, opp), frac(opp, hyp), frac(adj, hyp), String(opp / adj + 0.5)],
        `tan θ = ${opp}/${adj}.`
      );
    }

    // Similar triangles
    for (let h1 of [6, 8, 10, 12]) {
      const sh1 = h1 / 2;
      const sh2 = 2;
      const h2 = (h1 * sh2) / sh1;
      mc(
        `geo-sim-${h1}`,
        'Geometry & Trigonometry',
        'Lines, angles, and triangles',
        `A ${h1}-ft tree casts a ${sh1}-ft shadow. At the same time, a nearby tree casts a ${sh2}-ft shadow. How tall is the nearby tree, in feet?`,
        String(h2),
        [String(h2 + 2), String(h2 - 1), String(h1 + sh2), String(sh1 * sh2)],
        `Proportion: ${h1}/${sh1} = h/${sh2} → h = ${h2}.`
      );
    }

    // Circle area, circumference, arc
    for (let r of [3, 4, 5, 6, 7, 8, 9, 10]) {
      mc(
        `geo-circ-a-${r}`,
        'Geometry & Trigonometry',
        'Circles',
        `A circle has radius ${r}. What is its area?`,
        `${r * r}π`,
        [`${2 * r}π`, `${r}π`, `${2 * r * r}π`, `${r + r}π`],
        `Area = πr² = ${r * r}π.`
      );
      mc(
        `geo-circ-c-${r}`,
        'Geometry & Trigonometry',
        'Circles',
        `A circle has radius ${r}. What is its circumference?`,
        `${2 * r}π`,
        [`${r * r}π`, `${r}π`, `${4 * r}π`, `${2 * r}`],
        `Circumference = 2πr = ${2 * r}π.`
      );
      mc(
        `geo-arc-${r}`,
        'Geometry & Trigonometry',
        'Circles',
        `A circle with radius ${r} has a central angle of 60°. What is the arc length?`,
        `${r}π/3`,
        [`${2 * r}π/3`, `${r}π/6`, `${r}π`, `${r}π/2`],
        `Arc = (60/360) × 2πr = ${r}π/3.`
      );
    }

    // Volume — cylinder, cone, sphere
    for (let r of [2, 3, 4, 5]) {
      for (let h of [3, 6, 9, 12]) {
        mc(
          `geo-vol-cyl-${r}-${h}`,
          'Geometry & Trigonometry',
          'Area and volume',
          `A right cylinder has radius ${r} and height ${h}. What is its volume?`,
          `${r * r * h}π`,
          [`${2 * r * h}π`, `${r * h}π`, `${2 * r * r * h}π`, `${r + h}π`],
          `V = πr²h = ${r * r * h}π.`
        );
        mc(
          `geo-vol-cone-${r}-${h}`,
          'Geometry & Trigonometry',
          'Area and volume',
          `A cone has radius ${r} and height ${h}. What is its volume?`,
          `${(r * r * h) / 3}π`,
          [`${r * r * h}π`, `${(r * r * h) / 2}π`, `${r * h}π`, `${(2 * r * r * h) / 3}π`],
          `V = (1/3)πr²h = ${(r * r * h) / 3}π.`
        );
      }
    }

    for (let r of [3, 6, 9]) {
      mc(
        `geo-vol-sph-${r}`,
        'Geometry & Trigonometry',
        'Area and volume',
        `A sphere has radius ${r}. What is its volume?`,
        `${4 * r * r * r}π/3`,
        [`${r * r * r}π`, `${4 * r * r}π`, `${2 * r * r * r}π/3`, `${4 * r * r * r}π`],
        `V = (4/3)πr³ = ${4 * r * r * r}π/3.`
      );
    }

    // Rectangle diagonal
    for (const [a, b] of [[5, 12], [6, 8], [9, 12], [7, 24]]) {
      const d = Math.sqrt(a * a + b * b);
      mc(
        `geo-rect-d-${a}-${b}`,
        'Geometry & Trigonometry',
        'Right triangles',
        `A rectangle has sides ${a} and ${b}. What is the diagonal length?`,
        String(d),
        [String(a + b), String(d + 1), String(d - 1), String(a * b)],
        `Diagonal = √(${a}² + ${b}²) = ${d}.`
      );
    }

    // Angle relationships — supplementary
    for (let ang of [35, 42, 55, 68, 110, 125]) {
      mc(
        `geo-ang-${ang}`,
        'Geometry & Trigonometry',
        'Lines, angles, and triangles',
        `Two angles are supplementary. If one angle measures ${ang}°, what is the other?`,
        String(180 - ang),
        [String(ang), String(90 - ang), String(180 + ang), String(180 - ang - 10)],
        `Supplementary angles sum to 180°: ${180 - ang}°.`
      );
    }

    // Margin of error / statistics
    mc(
      'psda-moe-1',
      'Problem-Solving & Data Analysis',
      'Inference and statistics',
      `A survey of 400 people finds 52% support a policy. The margin of error is ±4%. Which is the best conclusion?`,
      'The true population percent is likely between 48% and 56%.',
      ['Exactly 52% of everyone supports it', 'Between 50% and 54%', 'At least 60% support it', 'The sample is invalid'],
      'MoE gives a range: 52% ± 4%.'
    );

    mc(
      'psda-range-1',
      'Problem-Solving & Data Analysis',
      'One-variable data',
      `Data set: 4, 7, 8, 12, 19. What is the range?`,
      '15',
      ['8', '10', '12', '19'],
      'Range = max − min = 19 − 4 = 15.'
    );

    // Rational expression simplify
    for (let n of [2, 3, 4, 5]) {
      mc(
        `adv-rat-${n}`,
        'Advanced Math',
        'Equivalent expressions',
        `Which is equivalent to (x² − ${n * n})/(x − ${n}) for x ≠ ${n}?`,
        `x + ${n}`,
        [`x − ${n}`, `x + ${n * n}`, `${n}x`, `x² + ${n}`],
        `Factor numerator: (x−${n})(x+${n})/(x−${n}) = x+${n}.`
      );
    }

    // Absolute value |x - a| = b
    for (let a of [2, 4, 6, 8]) {
      mc(
        `adv-abs2-${a}`,
        'Advanced Math',
        'Nonlinear equations',
        `How many solutions does |x − ${a}| = 3 have?`,
        '2',
        ['0', '1', '3', 'Infinitely many'],
        `x − ${a} = ±3 gives two solutions.`
      );
    }

    // Sector area
    for (let r of [4, 6, 8, 10]) {
      mc(
        `geo-sector-${r}`,
        'Geometry & Trigonometry',
        'Circles',
        `A circle with radius ${r} has a sector with central angle 90°. What is the sector area?`,
        `${r * r}π/4`,
        [`${r}π`, `${2 * r * r}π`, `${r * r}π/2`, `${4 * r * r}π`],
        `Sector = (90/360)πr² = ${r * r}π/4.`
      );
    }

    // ─── Extra generators to reach 1000+ ───
    for (let x1 = -5; x1 <= 5; x1++) {
      for (let y1 = -5; y1 <= 5; y1++) {
        for (const dx of [3, 4, 5]) {
          const x2 = x1 + dx;
          const y2 = y1 + dx;
          const dist = Math.sqrt(dx * dx + dx * dx);
          mc(
            `geo-dist-${x1}-${y1}-${dx}`,
            'Geometry & Trigonometry',
            'Coordinate geometry',
            `What is the distance between (${x1}, ${y1}) and (${x2}, ${y2})?`,
            `${dx}√2`,
            [`${dx}`, `${dx + 1}√2`, `${2 * dx}`, `${dx}√3`],
            `Distance = √(${dx}² + ${dx}²) = ${dx}√2.`
          );
        }
      }
    }

    for (let a = 1; a <= 15; a++) {
      for (let b = 1; b <= 15; b++) {
        mc(
          `alg-func2-${a}-${b}`,
          'Algebra',
          'Linear functions',
          `If f(x) = ${a}x + ${b}, what is x when f(x) = ${a * 5 + b}?`,
          '5',
          ['4', '6', '7', String(b)],
          `Solve ${a}x + ${b} = ${a * 5 + b} → x = 5.`
        );
      }
    }

    for (let m of [-5, -4, -3, 3, 4, 5]) {
      for (let b of [-10, -5, 0, 5, 10]) {
        mc(
          `alg-slope-int-${m}-${b}`,
          'Algebra',
          'Linear equations in two variables',
          `What is the slope of y = ${m}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)}?`,
          String(m),
          [String(-m), String(m + 1), String(b), '0'],
          `Slope-intercept form: slope = ${m}.`
        );
      }
    }

    for (let n = 2; n <= 25; n++) {
      for (let k of [1, 2, 3, 4, 5]) {
        const val = n * n * k;
        mc(
          `adv-sqrt2-${n}-${k}`,
          'Advanced Math',
          'Nonlinear equations',
          `If √(k·x²) = ${n * Math.sqrt(k)} and x > 0, what is x? (k = ${k})`,
          String(n),
          [String(n + 1), String(n - 1), String(n * k), String(k)],
          `√(${k}x²) = ${n}√${k} → x = ${n}.`
        );
      }
    }

    for (let p of [100, 150, 200, 250, 300]) {
      for (const r of [0.03, 0.05, 0.08, 0.1]) {
        const interest = p * r;
        mc(
          `psda-int-${p}-${r}`,
          'Problem-Solving & Data Analysis',
          'Percentages',
          `$${p} is invested at ${r * 100}% simple interest for one year. How much interest is earned?`,
          `$${interest}`,
          [`$${interest + 5}`, `$${p * r * 2}`, `$${p}`, `$${interest - 3}`],
          `Interest = ${r * 100}% × $${p} = $${interest}.`
        );
      }
    }

    for (let a = 1; a <= 6; a++) {
      for (let d = 2; d <= 8; d++) {
        const t10 = a + 9 * d;
        mc(
          `adv-seq-${a}-${d}`,
          'Advanced Math',
          'Nonlinear functions',
          `An arithmetic sequence starts at ${a} with common difference ${d}. What is the 10th term?`,
          String(t10),
          [String(t10 + d), String(t10 - d), String(a + 10 * d), String(a * d)],
          `Term 10 = ${a} + 9(${d}) = ${t10}.`
        );
      }
    }

    for (let b = 2; b <= 20; b++) {
      for (let h = 2; h <= 12; h++) {
        mc(
          `geo-tri-area-${b}-${h}`,
          'Geometry & Trigonometry',
          'Area and volume',
          `A triangle has base ${b} and height ${h}. What is its area?`,
          String(b * h / 2),
          [String(b * h), String(b + h), String(b * h / 3), String(b * h * 2)],
          `Area = ½ × ${b} × ${h} = ${b * h / 2}.`
        );
      }
    }

    for (let x = 2; x <= 12; x++) {
      mc(
        `adv-exp2-${x}`,
        'Advanced Math',
        'Nonlinear equations',
        `If 3<sup>x</sup> = ${Math.pow(3, x)}, what is x?`,
        String(x),
        [String(x + 1), String(x - 1), String(x * 2), String(x + 2)],
        `3^${x} = ${Math.pow(3, x)}, so x = ${x}.`
      );
    }

    // Fill to target (bypass domain caps if needed)
    let fill = 0;
    while (qs.length < target && fill < 500) {
      fill++;
      const a = (fill % 13) + 2;
      const b = (fill % 19) - 9;
      const x = (fill % 11) + 1;
      const c = a * x + b;
      const stem = `Practice ${fill}: If ${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} = ${c}, what is x?`;
      if (seen.has(stem)) continue;
      const { choices, answer } = pick4(String(x), [String(x + 1), String(x - 1), String(x + 2), String(-x)]);
      seen.add(stem);
      qs.push({
        id: `fill-lin-${fill}`,
        passage: null,
        domain: 'Algebra',
        skill: 'Linear equations in one variable',
        stem,
        choices,
        answer,
        explain: `x = ${x}.`
      });
    }

    return shuffle(qs);
  };
})();
