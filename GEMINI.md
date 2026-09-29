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
  - **Tlačidlá**: Používať jednotné triedy (`.button_gn`, `.button_gn_sec`, `.btn_popup`, `.button_back`, `.paging_btn`).
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
