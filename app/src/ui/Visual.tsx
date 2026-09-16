/**
 * Schémas pédagogiques.
 *
 * Aucun schéma décoratif : chaque visuel remplace ou complète une explication.
 * Tous sont accessibles, avec un texte de remplacement décrivant ce qu'ils
 * montrent, et lisibles sur un écran de 360 px.
 */

import type { Visual as V } from '@/content/types'
import './visual.css'

function clock(min: number): string {
  const h = Math.floor(min / 60) % 24
  const m = min % 60
  return `${h} h ${String(m).padStart(2, '0')}`
}

export function Visual({ visual }: { visual: V }) {
  switch (visual.type) {
    case 'fraction':
      return (
        <figure className="vis">
          <div
            className="frac"
            role="img"
            aria-label={`Bande coupée en ${visual.parts} parts égales, dont ${visual.filled} sont colorées.`}
          >
            {Array.from({ length: visual.parts }, (_, i) => (
              <span key={i} className={`frac__part${i < visual.filled ? ' frac__part--on' : ''}`} />
            ))}
          </div>
          {visual.label && <p className="vis__label">{visual.label}</p>}
          {visual.caption && <figcaption className="vis__cap">{visual.caption}</figcaption>}
        </figure>
      )

    case 'fraction-compare':
      return (
        <figure className="vis">
          {visual.bars.map((b, i) => (
            <div key={i} className="frac-row">
              <span className="frac-row__label">{b.label}</span>
              <div
                className="frac"
                role="img"
                aria-label={`${b.label} : ${b.filled} part sur ${b.parts}.`}
              >
                {Array.from({ length: b.parts }, (_, j) => (
                  <span key={j} className={`frac__part${j < b.filled ? ' frac__part--on' : ''}`} />
                ))}
              </div>
            </div>
          ))}
          {visual.caption && <figcaption className="vis__cap">{visual.caption}</figcaption>}
        </figure>
      )

    case 'conversion': {
      const label = visual.units
        .map((u, i) => `${u} : ${visual.digits[i] ?? '—'}`)
        .join(', ')
      return (
        <figure className="vis">
          <div className="conv-scroll">
            <table className="conv" role="img" aria-label={`Tableau de conversion. ${label}.`}>
              <thead>
                <tr>
                  {visual.units.map((u, i) => (
                    <th key={u} className={i === visual.commaAfter ? 'conv__unit conv__unit--here' : 'conv__unit'}>
                      {u}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {visual.digits.map((d, i) => (
                    <td key={i} className={i === visual.commaAfter ? 'conv__cell conv__cell--comma' : 'conv__cell'}>
                      {d ?? ''}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          {visual.caption && <figcaption className="vis__cap">{visual.caption}</figcaption>}
        </figure>
      )
    }

    case 'timeline': {
      const span = Math.max(1, visual.to - visual.from)
      const pos = (at: number) => ((at - visual.from) / span) * 100
      return (
        <figure className="vis">
          <div
            className="tl"
            role="img"
            aria-label={`Ligne de temps de ${clock(visual.from)} à ${clock(visual.to)}. ${visual.spans
              .map((s) => `${clock(s.from)} à ${clock(s.to)} : ${s.label}`)
              .join('. ')}`}
          >
            <div className="tl__axis" />
            {visual.spans.map((s, i) => (
              <div
                key={i}
                className="tl__span"
                style={{ left: `${pos(s.from)}%`, width: `${Math.max(2, pos(s.to) - pos(s.from))}%` }}
              >
                <span className="tl__span-label">{s.label}</span>
              </div>
            ))}
            {visual.marks.map((mk, i) => (
              // Les repères alternent sur deux lignes : sur un écran étroit,
              // deux horaires proches se chevaucheraient sinon.
              <div
                key={i}
                className={i % 2 === 0 ? 'tl__mark' : 'tl__mark tl__mark--low'}
                style={{ left: `${pos(mk.at)}%` }}
              >
                <span className={mk.strong ? 'tl__tick tl__tick--strong' : 'tl__tick'} />
                <span className="tl__mark-label">{mk.label}</span>
              </div>
            ))}
          </div>
          {visual.caption && <figcaption className="vis__cap">{visual.caption}</figcaption>}
        </figure>
      )
    }

    case 'table':
      return (
        <figure className="vis">
          <div className="tbl-scroll">
            <table className="tbl">
              <thead>
                <tr>
                  {visual.headers.map((h, i) => (
                    <th key={i} style={{ textAlign: visual.align?.[i] ?? 'left' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visual.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => (
                      <td key={j} style={{ textAlign: visual.align?.[j] ?? 'left' }}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visual.caption && <figcaption className="vis__cap">{visual.caption}</figcaption>}
        </figure>
      )

    case 'proportion':
      return (
        <figure className="vis">
          <div className="tbl-scroll">
            <table className="tbl prop">
              <tbody>
                <tr>
                  <th scope="row">{visual.topLabel}</th>
                  {visual.columns.map((c, i) => (
                    <td key={i} className={c.highlight ? 'prop__hl' : undefined}>
                      {c.top}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">{visual.bottomLabel}</th>
                  {visual.columns.map((c, i) => (
                    <td key={i} className={c.highlight ? 'prop__hl' : undefined}>
                      {c.bottom}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          {visual.caption && <figcaption className="vis__cap">{visual.caption}</figcaption>}
        </figure>
      )

    case 'calc-steps':
      return (
        <figure className="vis">
          <ol className="steps">
            {visual.steps.map((s, i) => (
              <li key={i} className="steps__item">
                <code className="steps__calc">{s.calc}</code>
                {s.why && <span className="steps__why">{s.why}</span>}
              </li>
            ))}
          </ol>
          {visual.caption && <figcaption className="vis__cap">{visual.caption}</figcaption>}
        </figure>
      )

    case 'numberline': {
      const span = Math.max(1, visual.to - visual.from)
      return (
        <figure className="vis">
          <div className="nl" role="img" aria-label={visual.caption ?? 'Droite graduée'}>
            <div className="nl__axis" />
            {visual.marks.map((mk, i) => (
              <div key={i} className="nl__mark" style={{ left: `${((mk.at - visual.from) / span) * 100}%` }}>
                <span className="nl__tick" />
                <span className="nl__label">{mk.label}</span>
              </div>
            ))}
          </div>
          {visual.caption && <figcaption className="vis__cap">{visual.caption}</figcaption>}
        </figure>
      )
    }

    case 'bars': {
      const max = Math.max(...visual.items.map((i) => i.value), 1)
      return (
        <figure className="vis">
          <div
            className="bars"
            role="img"
            aria-label={`${visual.label}. ${visual.items.map((i) => `${i.name} : ${i.value}`).join(', ')}.`}
          >
            {visual.items.map((it, i) => (
              <div key={i} className="bars__col">
                <span className="bars__value">{it.value}</span>
                <div className="bars__bar" style={{ height: `${(it.value / max) * 100}%` }} />
                <span className="bars__name">{it.name}</span>
              </div>
            ))}
          </div>
          {visual.caption && <figcaption className="vis__cap">{visual.caption}</figcaption>}
        </figure>
      )
    }
  }
}
