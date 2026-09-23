import { useLayoutEffect } from 'react'

/* Blocos desenhados na medida do mock (fios em SVG + cartoes em px) so ficam
   alinhados na largura original. Este hook grava em `--k` a razao entre a
   largura disponivel e a do desenho (no maximo 1); o CSS escala o bloco
   inteiro por igual com ela. Sem isso, qualquer janela abaixo de 1440px de
   conteudo (inclusive 1440 com barra de rolagem) esticava so o SVG e os fios
   deixavam de encostar nos cartoes. */
export default function useEscala(ref, larguraBase) {
  useLayoutEffect(() => {
    const el = ref.current
    const pai = el?.parentElement
    if (!pai || typeof ResizeObserver === 'undefined') return undefined

    const medir = () => {
      const k = Math.min(1, pai.clientWidth / larguraBase)
      el.style.setProperty('--k', String(k))
    }
    medir()
    const obs = new ResizeObserver(medir)
    obs.observe(pai)
    return () => obs.disconnect()
  }, [ref, larguraBase])
}
