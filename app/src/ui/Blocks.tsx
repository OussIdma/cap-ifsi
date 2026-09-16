/**
 * Rendu des blocs de contenu.
 *
 * Aucun HTML n'est interprété : tous les textes des contenus sont affichés
 * comme du texte, ce qui interdit l'injection de balises depuis un import.
 */

import type { Block } from '@/content/types'
import { Visual } from './Visual'

export function Blocks({ blocks, reading = false }: { blocks: readonly Block[]; reading?: boolean }) {
  return (
    <div className={reading ? 'blocks reading' : 'blocks'}>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>
    case 'lead':
      return <p className="lead">{block.text}</p>
    case 'heading':
      return <h3>{block.text}</h3>
    case 'list':
      return block.ordered ? (
        <ol>
          {block.items.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {block.items.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )
    case 'key':
      return (
        <div className="note note--accent">
          <p className="note__title">
            <span aria-hidden="true">◆</span> {block.title ?? 'À retenir'}
          </p>
          <p>{block.text}</p>
        </div>
      )
    case 'warn':
      return (
        <div className="note note--warn">
          <p className="note__title">
            <span aria-hidden="true">▲</span> {block.title ?? 'Piège fréquent'}
          </p>
          <p>{block.text}</p>
        </div>
      )
    case 'vocab':
      return (
        <dl className="vocab">
          {block.items.map((v, i) => (
            <div key={i} className="vocab__row">
              <dt>{v.term}</dt>
              <dd>{v.def}</dd>
            </div>
          ))}
        </dl>
      )
    case 'quote':
      return (
        <blockquote className="quote">
          <p>{block.text}</p>
          {block.source && <cite>{block.source}</cite>}
        </blockquote>
      )
    case 'visual':
      return <Visual visual={block.visual} />
  }
}
