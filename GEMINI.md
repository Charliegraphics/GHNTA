# Záväzné pravidlá projektu (Gnotheia / Knotea)

Tieto pravidlá sú **absolútne záväzné** pre všetkých AI agentov pracujúcich na tomto projekte v Google Antigravity.

---

## 1. ZÁKAZ INICIATÍVNYCH A NEVYŽIADANÝCH ZMIEN (Strict Scope & Zero Unintended Edits)
- **Princíp**: Rob VÝHRADNE a PRESNE tie zmeny, ktoré používateľ výslovne požaduje.
- **Žiadne domýšľanie**: Keď sa upravuje menu, pridáva nová funkcionalita alebo mení konkrétna sekcia, NIKDY sa nesmie meniť nič iné na danej stránke ani v iných súboroch.
- **Nedotknuteľnosť dát a textov**: Nemeniť názvy polí, texty, dáta, čísla poistných zmlúv, mená, statusy, ani rozloženie iných sekcií.
- **Zachovanie 1:1 parity**: Ak používateľ nepožiada o zmenu vizuálu či štruktúry danej sekcie, musí zostať 100% identická s originálom.
- **Zákaz zlúčenia / nahrádzania blokov vlastnými nápadmi**: Nikdy nenahrádzať viacero kariet jednou kartou, nerozbíjať existujúci layout na vlastné vymyslené komponenty a nemeniť poradie prvkov.

---

## 2. DÔSLEDNÉ POUŽÍVANIE ROVNAKÝCH TRIED NA VŠETKO ROVNAKÉHO CHARAKTERU (Shared Global Classes)
- **Princíp**: Všetky prvky rovnakého charakteru MUSIA mať vždy rovnakú CSS triedu naprieč celým projektom.
- **Globálna upraviteľnosť**: Cieľom je, aby používateľ pri zmene jedinej CSS triedy (v `gnotheia.webflow.css` alebo `responsive.css`) zmenil vzhľad daného prvku automaticky a jednotne na všetkých stránkach a vo všetkých sekciách.
- **Zákaz ad-hoc a unikátnych tried**: Nevytvárať jednorazové triedy ani inline štýly pre prvky, ktoré už majú v projekte existujúci ekvivalent.
- **Konzistencia komponentov**:
  - **Karty / boxy**: Používať jednotné triedy (napr. `.object-box`, `.object-box-copy`, `.div-block-83`).
  - **Kľúč-hodnota riadky**: Používať jednotný grid `.div-block-81` (label vľavo `.red-only`, hodnota vpravo `.red-only.data` alebo `.text-block-6`).
  - **Tlačidlá**: Používať striktne jednotné triedy z Design Systemu (`styleguide.html`):
    - `.button_gn` (Primárna hlavná akcia – gradientný background, napr. Evaluate, Save, Submit)
    - `.button_gn_sec` (Sekundárne / Cancel / Close – hover `#5b5185`, napr. ľavé tlačidlo v pätičke modálov)
    - `.button_gn_sec.dark` (Tmavé utility tlačidlo s orámovaním – napr. Save as, Copy as JSON, aktívny tab)
    - `.button_gn_sec.tertiary` (Outline tlačidlo – napr. Explain)
    - `.button_gn_sec.clear` (Ghost prepínač v menu – napr. Rules Management v toggle_menu)
    - `.btn-toggle-audit` (Plnošírkový audit toggle s rotujúcou šípkou)
    - **Pravidlo pätičiek modálov**: Cancel/Close VŽDY VĽAVO (`.button_gn_sec.btn-close-modal`), hlavná/funkčná akcia VŽDY VPRAVO.
  - **Štítky a odznaky**: Používať jednotné triedy (`.status-badge`, `.company-tag`, `.v`, `.mini-tag`, `.badge-label`).
  - **Tabuľky**: Používať jednotné triedy tabuliek a ich vnútorných obalov (`.table_dash_wrap-copy`, `.table-history`, `.table-head_wrap`, `.table_rules`, `.table_codes`).

---

## 3. SÉMANTICKÉ TABUĽKY SO ZACHOVANÍM VZHĽADU (Semantic Tables)
- Tabuľky v HTML musia byť vždy skutočné `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
- Každá tabuľka musí byť obalená v `<div class="table-responsive">` pre plynulý dotykový posun na malých displejoch.
- Vizuál tabuľky (10px zaoblenie na hlavičke `#28243a`, orámovanie buniek `#49416a`, zarovnania a šírky stĺpcov) musí byť na pixel identický s pôvodným Webflow dizajnom.

---

## 4. OCHRANA PÔVODNÝCH SÚBOROV (Untouched Source of Truth)
- Koreňový priečinok `d:\AI_PROJECTS\GHNOTHEIA\` (pôvodné súbory z Webflow) zostáva 100% nedotknutý ako referenčný originál.
- Všetky vývojové a responzívne úpravy sa vykonávajú výhradne v priečinku `gnotheia-responsive/`.

---

## 5. ZÁKAZ AUTONÓMNEHO TESTOVANIA CEZ MCP / PREHLIADAČ (No Unsolicited MCP Testing)
- **Princíp**: Netestovať stránky autonómne cez MCP servery (Chrome DevTools, screenshoty, resize_page, evaluate_script atď.), pokiaľ o to používateľ výslovne nepožiada.
- **Šetrenie tokenov**: Autonómne spúšťanie testov a načítavanie obrázkov/screenshotov cez MCP míňa obrovské množstvo tokenov a je nežiaduce.
- **Pravidlo**: Agent vykoná požadované zmeny priamo v súboroch a testovanie a kontrolu si robí používateľ sám. Kým používateľ výslovne nepovie *"otestuj to"*, agent žiadne MCP testy nespúšťa.
