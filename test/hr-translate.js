/* eslint-disable */
/**
 * Croatian translation helpers for R&W questions.
 * Used by generate-rw-hr.mjs and index.html (runtime fallback).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HR_TRANSLATE = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const WORD_HR = {
    its: 'njegov / njezin (posvojni oblik, bez apostrofa)',
    "it's": 'to jest (skraćenica od it is / it has)',
    their: 'njihov',
    "they're": 'oni su (skraćenica od they are)',
    there: 'tamo',
    they: 'oni',
    them: 'njih / njima',
    we: 'mi',
    us: 'nas / nama',
    our: 'naš',
    ourselves: 'sebe / sami',
    me: 'mene / meni',
    i: 'ja',
    myself: 'sebe',
    mine: 'moj',
    you: 'ti / vi',
    your: 'tvoj / vaš',
    "you're": 'ti si / vi ste',
    yours: 'tvoj / vaš',
    who: 'tko',
    whom: 'koga / kome',
    whose: 'čiji',
    "who's": 'tko je (skraćenica)',
    which: 'koji / koja / koje',
    what: 'što',
    when: 'kada',
    where: 'gdje',
    why: 'zašto',
    how: 'kako',
    however: 'međutim',
    therefore: 'stoga',
    consequently: 'posljedično',
    'as a result': 'kao rezultat',
    nevertheless: 'unatoč tome',
    moreover: 'štoviše',
    similarly: 'slično',
    'for example': 'na primjer',
    'in contrast': 'nasuprot tome',
    instead: 'umjesto toga',
    rather: 'radije',
    'in addition': 'dodatno',
    furthermore: 'nadalje',
    meanwhile: 'u međuvremenu',
    thus: 'dakle',
    hence: 'stoga',
    otherwise: 'inače',
    fewer: 'manje (brojivo)',
    less: 'manje (nebrojivo)',
    few: 'malo',
    among: 'među',
    between: 'između',
    within: 'unutar',
    effect: 'učinak / posljedica (imenica)',
    affect: 'utjecati (glagol)',
    affects: 'utječe',
    is: 'je (jednina)',
    are: 'su (množina)',
    was: 'bio / bila / bilo (prošlo vrijeme)',
    were: 'bili / bile (prošlo vrijeme, množina)',
    has: 'ima (jednina)',
    have: 'imaju (množina)',
    had: 'imao / imala (prošlo vrijeme)',
    show: 'pokazuju',
    shows: 'pokazuje',
    the: 'određeni član (the)',
    when: 'kada',
    and: 'i',
    by: 'od / putem',
    as: 'kao / dok',
    about: 'o / oko',
    morning: 'jutarnji',
    everybody: 'svi',
    him: 'njega (objektna zamjenica)',
    adverse: 'negativan / nepovoljan',
    enjoy: 'uživati',
    good: 'dobar',
    'to go': 'ići',
    afterwards: 'nakon toga',
    'such a': 'toliko / takav',
    'has become': 'postalo je',
    'to find ways': 'pronaći načine',
    'wanted': 'želio / željela',
    'next spring': 'sljedeće proljeće',
    'was awarded': 'nagrađen/a',
    praised: 'hvalio / hvalila',
    'probably seen': 'vjerojatno viđen',
    'most felicitous': 'najsretniji / najpovoljniji',
    carried: 'ponio / donio',
    'went about': 'kretao se / obavljao',
    'absolute shamefaced': 'apsolutno posramljen',
    'only a few': 'samo nekoliko',
    'by tracing': 'prateći / tragajući',
    determined: 'utvrdio / utvrdila',
    generally: 'općenito',
    unexpected: 'neočekivane',
    familiar: 'poznate',
    redundant: 'suvišne',
    naive: 'naivne',
    derelict: 'zanemaren u dužnosti',
    vigilant: 'budan / oprezan',
    irreproachable: 'besprijekoran',
    neglectful: 'nemaran',
    nescience: 'neznanje',
    protocol: 'protokol',
    vapid: 'prazan / beznačajan',
    seriously: 'ozbiljno',
    cicerone: 'vodič',
    sententious: 'sentenciozan / poučan',
    quiddity: 'bit / suština',
    interim: 'privremeni',
    withdrawing: 'povlačenje / odvraćanje',
    thwarting: 'sprječavanje',
    displacing: 'pomjeranje',
    reflecting: 'reflektiranje / odražavanje',
    protean: 'promjenjiv',
    palanquin: 'palankin (nosiljka)',
    ineluctable: 'neizbježan',
    exacerbated: 'pogoršano',
    geniality: 'srdačnost',
    arrogance: 'arogancija',
    'after sentence 5': 'nakon rečenice 5',
    'after sentence 7': 'nakon rečenice 7',
    'after sentence 9': 'nakon rečenice 9',
    'after sentence 12': 'nakon rečenice 12',
    'i see that': 'vidim da',
    'they say that': 'kažu da',
    'others say that': 'drugi kažu da',
    however: 'međutim',
    'she told me,': 'rekla mi je,',
    'she suggested:': 'predložila je:',
    'my mother tells me,': 'moja majka mi kaže,',
    'no change': 'Bez promjene',
    '(as it is now)': 'Kao što sada stoji'
  };

  const STEM_PREFIXES = [
    [/Which choice most effectively uses relevant information from the notes to accomplish this goal\?/gi,
      'Koja opcija najučinkovitije koristi relevantne informacije iz bilješki kako bi postigla ovaj cilj?'],
    [/Which choice most effectively uses relevant information from the notes\?/gi,
      'Koja opcija najučinkovitije koristi relevantne informacije iz bilješki?'],
    [/Which choice best states the main (?:idea|purpose) of the (?:text|passage)\?/gi,
      'Koja opcija najbolje izražava glavnu ideju teksta?'],
    [/Which choice best describes the function of the underlined (?:sentence|portion)[^?]*\?/gi,
      'Koja opcija najbolje opisuje funkciju podcrtanog dijela teksta?'],
    [/Which finding from (?:the )?table[^?]*\?/gi,
      'Koje saznanje iz tablice, ako je istinito, najbolje podržava zaključak?'],
    [/Which quotation from (?:a )?(?:historical|scientific)[^?]*\?/gi,
      'Koji citat najbolje podržava tvrdnju?'],
    [/Based on the text, what can most reasonably be inferred[^?]*\?/gi,
      'Na temelju teksta, što se najrazumnije može zaključiti?'],
    [/What is the main idea of the (?:text|passage)\?/gi,
      'Koja je glavna ideja teksta?'],
    [/Which choice completes the text with the most logical and precise word or phrase\?/gi,
      'Koja opcija najlogičnije i najpreciznije dovršava tekst?'],
    [/Which choice completes the text so that it conforms to the conventions of Standard English\?/gi,
      'Koja opcija dovršava tekst u skladu sa standardnim pravilima engleskog jezika?'],
    [/Which choice completes the text\?/gi, 'Koja opcija dovršava tekst?'],
    [/Which choice best completes the (?:text|sentence)\?/gi, 'Koja opcija najbolje dovršava tekst?'],
    [/Which choice completes the sentence\?/gi, 'Koja opcija dovršava rečenicu?'],
    [/Which choice completes the text to maintain parallel structure\?/gi,
      'Koja opcija dovršava tekst uz paralelnu gramatičku strukturu?'],
    [/Which choice is the most effective revision[^?]*\?/gi,
      'Koja je opcija najučinkovitija revizija?'],
    [/Which choice most logically completes the text\?/gi,
      'Koja opcija najlogičnije dovršava tekst?'],
    [/The student wants to ([^.?]+)\. Which choice/gi,
      'Učenik želi $1. Koja opcija'],
    [/While researching a topic, a student has taken the following notes:/gi,
      'Tijekom istraživanja teme, učenik je zapisao sljedeće bilješke:'],
    [/In context, which is the best version of the underlined portion[^?]*\?/gi,
      'U kontekstu, koja je najbolja verzija podcrtanog dijela?'],
    [/In context, which of the following words are the most logical to insert[^?]*\?/gi,
      'U kontekstu, koje od sljedećih riječi je najlogičnije umetnuti?'],
    [/Which of the following best describes the relationship between[^?]*\?/gi,
      'Koja od sljedećih opcija najbolje opisuje odnos između rečenica?'],
    [/Where is the best place to insert the following sentence\?/gi,
      'Gdje je najbolje umetnuti sljedeću rečenicu?'],
    [/Which choice best describes the reviewers' main concern\?/gi,
      'Koja opcija najbolje opisuje glavnu zabrinutost recenzenata?'],
    [/Which choice best states the main idea of the passage\?/gi,
      'Koja opcija najbolje izražava glavnu ideju odlomka?'],
    [/Based on the texts, which statement is best supported\?/gi,
      'Na temelju tekstova, koja je tvrdnja najbolje podržana?'],
    [/What is the most likely purpose of this technique\?/gi,
      'Koja je najvjerojatnija svrha ove tehnike?'],
    [/Which choice corrects the punctuation error\?/gi,
      'Koja opcija ispravlja interpunkcijsku grešku?'],
    [/Which word best completes the sentence\?/gi, 'Koja riječ najbolje dovršava rečenicu?'],
    [/View Additional Information /gi, '']
  ];

  function stripHtml(s) {
    return String(s || '')
      .replace(/<sup>([^<]*)<\/sup>/gi, '^$1')
      .replace(/<sub>([^<]*)<\/sub>/gi, '_$1')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/p>\s*<p>/gi, ' ')
      .replace(/<li>/gi, '• ')
      .replace(/<\/li>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&mdash;/g, '—')
      .replace(/&rsquo;/g, "'")
      .replace(/&lsquo;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function cleanHtml(s) {
    return String(s || '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&mdash;/g, '—')
      .replace(/&rsquo;/g, "'")
      .replace(/&lsquo;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .trim();
  }

  const MONTHS = {
    January: 'siječnja', February: 'veljače', March: 'ožujka', April: 'travnja',
    May: 'svibnja', June: 'lipnja', July: 'srpnja', August: 'kolovoza',
    September: 'rujna', October: 'listopada', November: 'studenoga', December: 'prosinca'
  };

  function translateNotesPassage(html) {
    let t = cleanHtml(html);
    t = t.replace(/While researching a topic, a student has taken the following notes:/gi,
      'Tijekom istraživanja teme, učenik je zapisao sljedeće bilješke:');
    t = t.replace(/On ([A-Za-z]+) (\d+, \d{4}), ([^<]+?) became the (\d+)(?:st|nd|rd|th) state to join the US\./gi,
      (_, mon, date, place, n) => {
        const hrMon = MONTHS[mon] || mon.toLowerCase();
        const [day, year] = date.split(', ');
        return `Dana ${day}. ${hrMon} ${year}. ${place.trim()} postala je ${n}. savezna država SAD-a.`;
      });
    t = t.replace(/A new 50-star US flag was unveiled the same day\./gi,
      'Istog dana otkrivena je nova američka zastava s 50 zvjezdica.');
    t = t.replace(/Alaska/gi, 'Alaska').replace(/Hawaii/gi, 'Havaji');
    t = t.replace(/<ul>\s*<li>/gi, '\n• ').replace(/<\/li>\s*<li>/gi, '\n• ').replace(/<\/li>\s*<\/ul>/gi, '');
    t = t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return t;
  }

  function translateStemRules(text) {
    let t = cleanHtml(text).replace(/^<p>\s*/i, '').replace(/<\/p>\s*$/i, '');
    for (const [re, rep] of STEM_PREFIXES) t = t.replace(re, rep);
    t = t
      .replace(/\bThe student wants to emphasize the order in which Alaska and Hawaii became US states\.\s*/gi,
        'Učenik želi istaknuti redoslijed kojim su Alaska i Havaji postale američke savezne države. ')
      .replace(/\bThe student wants to ([^.?]+)\.\s*/gi, 'Učenik želi $1. ')
      .replace(/\bThe student wants to\b/gi, 'Učenik želi')
      .replace(/\bemphasize the order in which\b/gi, 'istaknuti redoslijed kojim')
      .replace(/\bbecame US states\b/gi, 'postale američke savezne države')
      .replace(/\bthe student\b/gi, 'učenik')
      .replace(/\bnotes\b/gi, 'bilješke')
      .replace(/\bpassage\b/gi, 'odlomak')
      .replace(/\btext\b/gi, 'tekst')
      .replace(/\bsentence\b/gi, 'rečenica')
      .replace(/\bunderlined portion\b/gi, 'podcrtani dio')
      .replace(/\bAs it is now\b/gi, 'Kao što sada stoji')
      .replace(/\bNo Change\b/gi, 'Bez promjene');
    return t.trim();
  }

  function translateChoiceRules(choice) {
    const key = stripHtml(choice).toLowerCase().replace(/\.$/, '');
    if (WORD_HR[key]) return WORD_HR[key];
    if (key === '(as it is now)') return 'Kao što sada stoji';
    if (key === 'no change') return 'Bez promjene';
    return null;
  }

  const EN_STOP = new Set(['the', 'and', 'which', 'that', 'this', 'with', 'from', 'have', 'has', 'was', 'were', 'wants', 'want', 'to', 'in', 'on', 'at', 'for', 'of', 'is', 'are', 'be', 'became', 'become', 'most', 'effectively', 'student', 'emphasize', 'order', 'states', 'information', 'notes', 'accomplish', 'goal', 'finding', 'quotation', 'based', 'text', 'passage', 'sentence', 'underlined', 'context', 'following', 'relationship', 'insert', 'reproduced', 'below', 'choice']);

  function hasEnglishLeak(text) {
    const words = stripHtml(text).split(/\s+/);
    let enCount = 0;
    for (const w of words) {
      const lw = w.toLowerCase().replace(/[^a-z']/g, '');
      if (EN_STOP.has(lw)) enCount++;
    }
    return enCount >= 2;
  }

  function isApiGarbage(text) {
    return /NEXT AVAILABLE|MYMEMORY|USAGELIMITS|VISIT HTTPS/i.test(String(text || ''));
  }

  function isGoodHr(existing, english) {
    const a = stripHtml(existing || '');
    const b = stripHtml(english || '');
    if (!a || a.length < 3) return false;
    if (isApiGarbage(a)) return false;
    if (a === b) return false;
    if (hasEnglishLeak(a)) return false;
    if (/^[a-z\s'.,!?-]+$/i.test(a) && a.split(' ').length <= 4 && !/[čćžšđ]/i.test(a) && b.split(' ').length <= 4) {
      return WORD_HR[a.toLowerCase()] !== undefined;
    }
    return a !== b;
  }

  function getTaskHr(q, stemHr) {
    if (q.taskHr) return q.taskHr;
    const stem = stripHtml(q.stem).toLowerCase();
    if (/notes/.test(stem) && /student wants/.test(stem)) {
      return 'Pročitaj bilješke i odaberi rečenicu koja najbolje ispunjava učenikov cilj.';
    }
    if (/main idea/.test(stem)) return 'Odaberi opciju koja najbolje sažima glavnu ideju teksta.';
    if (/infer/.test(stem) || /suggest/.test(stem)) return 'Odaberi zaključak koji najbolje slijedi iz teksta.';
    if (/function of/.test(stem)) return 'Odaberi opciju koja najbolje opisuje ulogu podcrtanog dijela.';
    if (/transition|however|therefore|consequently/.test(stem)) return 'Odaberi prijelaz ili poveznicu koja najbolje povezuje ideje.';
    if (/punctuation|conventions of standard english/.test(stem)) return 'Odaberi gramatički i interpunkcijski ispravnu verziju.';
    if (/parallel structure/.test(stem)) return 'Odaberi oblik koji odgovara paralelnoj strukturi u rečenici.';
    if (/relationship between/.test(stem)) return 'Odaberi opciju koja najbolje opisuje odnos između rečenica.';
    if (/insert the following sentence/.test(stem)) return 'Odaberi gdje u tekst najbolje uklopiti zadanu rečenicu.';
    if (stemHr && (stemHr.includes('______') || q.stem.includes('______'))) {
      return 'Odaberi riječ ili frazu koja najbolje nadopunjuje prazninu (______).';
    }
    if (/which choice/.test(stem)) return 'Odaberi najbolju opciju prema tekstu i pitanju.';
    return 'Pažljivo pročitaj tekst i odaberi najbolju opciju.';
  }

  function explainChoiceHr(q, idx, choicesHr) {
    if (q.choiceExplainHr && q.choiceExplainHr[idx]) return q.choiceExplainHr[idx];

    const en = stripHtml(q.choices[idx]);
    const hr = stripHtml(choicesHr[idx] || en);
    const key = en.toLowerCase();

    if (WORD_HR[key]) {
      return `${hr} — engleski oblik "${en}" označava: ${WORD_HR[key]}.`;
    }
    if (TRANSITION_WORD(key)) {
      return `${hr} — prijelazna riječ "${en}": ${WORD_HR[key] || 'povezuje ideje u tekstu'}.`;
    }
    if (en === '(As it is now)' || en === 'No Change') {
      return `${hr} — ostavlja izvorni oblik rečenice bez promjene.`;
    }
    if (/^\([12]\)/.test(en) || /^\(as it is now\)/i.test(en)) {
      return `${hr} — odnosi se na označeni dio rečenice koji treba ispraviti.`;
    }
    if (hr.length > 60) {
      return `${hr} — ova opcija predlaže određenu formulaciju; usporedi je s ciljem pitanja i tekstom.`;
    }
    if (hr !== en) {
      return `${hr} — prijevod opcije "${en}".`;
    }
    return `${en} — provjeri značenje ove opcije u kontekstu cijelog pitanja.`;
  }

  function TRANSITION_WORD(key) {
    return ['however', 'therefore', 'consequently', 'nevertheless', 'moreover', 'thus', 'hence', 'meanwhile', 'instead', 'rather', 'furthermore', 'similarly', 'as a result', 'in contrast', 'in addition', 'for example'].includes(key);
  }

  function buildHrView(q, overlay) {
    const o = overlay?.[q.id] || {};
    let stemHr = (o.stemHr && isGoodHr(o.stemHr, q.stem)) ? o.stemHr
      : (q.stemHr && isGoodHr(q.stemHr, q.stem) ? q.stemHr : null);
    if (!stemHr || !isGoodHr(stemHr, q.stem)) stemHr = translateStemRules(q.stem);
    stemHr = cleanHtml(stemHr);

    const passageHr = (o.passageHr && isGoodHr(o.passageHr, q.passage || '')) ? o.passageHr
      : (q.passageHr && isGoodHr(q.passageHr, q.passage || '') ? q.passageHr
        : (q.passage ? translateNotesPassage(q.passage) : null));

    const choicesHr = (q.choices || []).map((c, i) => {
      const fromOverlay = o.choicesHr?.[i];
      if (fromOverlay && isGoodHr(fromOverlay, c)) return stripHtml(fromOverlay);
      const fromQ = q.choicesHr?.[i];
      if (fromQ && isGoodHr(fromQ, c)) return stripHtml(fromQ);
      const ruled = translateChoiceRules(c);
      if (ruled) return ruled;
      return stripHtml(c);
    });

    const taskHr = o.taskHr || getTaskHr(q, stemHr);
    const choiceNotes = (o.choiceExplainHr && o.choiceExplainHr.length === choicesHr.length)
      ? o.choiceExplainHr
      : choicesHr.map((_, i) => explainChoiceHr({ ...q, choicesHr }, i, choicesHr));

    return { passageHr, stemHr, choicesHr, taskHr, choiceNotes };
  }

  function needsMachineTranslation(q) {
    if (!isGoodHr(q.stemHr, q.stem)) return true;
    return (q.choices || []).some((c, i) => !isGoodHr(q.choicesHr?.[i], c) && !translateChoiceRules(c));
  }

  return {
    stripHtml,
    cleanHtml,
    translateStemRules,
    translateChoiceRules,
    isGoodHr,
    hasEnglishLeak,
    getTaskHr,
    explainChoiceHr,
    buildHrView,
    needsMachineTranslation,
    WORD_HR
  };
}));
